import db from "../../config/db.js";
import { hashPassword } from "../../utils/hash.util.js";
//import { cpf, cnpj } from 'cpf-cnpj-validator';
import jwt from "jsonwebtoken";
import models from "../../../models/index.model.js";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../../config/auth.config.js";
import { comparePassword } from "../../utils/hash.util.js"; // Fixed path
const { Usuario } = models;
async function createUser(userData) {
  const {
    nome,
    sobrenome,
    email,
    senha,
    telefone,
    estado,
    sexo,
    dtNascimento,
    cpfCnpj,
  } = userData;
  const erros = [];

  // 1. Validações de campos obrigatórios e formato
  if (!nome || nome.trim() === "") {
    erros.push({ campo: "nome", mensagem: "Nome é obrigatório." });
  }
  if (!sobrenome || sobrenome.trim() === "") {
    erros.push({ campo: "sobrenome", mensagem: "Sobrenome é obrigatório." });
  }
  if (!email || email.trim() === "") {
    erros.push({ campo: "email", mensagem: "Email é obrigatório." });
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      erros.push({ campo: "email", mensagem: "Formato de e-mail inválido." });
    }
  }
  if (!senha) {
    erros.push({ campo: "senha", mensagem: "Senha é obrigatória." });
  } else {
    // Validações de senha
    if (senha.length < 8) {
      erros.push({
        campo: "senha",
        mensagem: "Senha deve ter no mínimo 8 caracteres.",
      });
    }
    if (!/[A-Z]/.test(senha)) {
      erros.push({
        campo: "senha",
        mensagem: "Senha deve conter pelo menos uma letra maiúscula.",
      });
    }
    if (!/[a-z]/.test(senha)) {
      erros.push({
        campo: "senha",
        mensagem: "Senha deve conter pelo menos uma letra minúscula.",
      });
    }
    if (!/\d/.test(senha)) {
      erros.push({
        campo: "senha",
        mensagem: "Senha deve conter pelo menos um número.",
      });
    }
  }
  if (!telefone || telefone.trim() === "") {
    erros.push({ campo: "telefone", mensagem: "Telefone é obrigatório." });
  }
  if (!estado || estado.trim() === "") {
    erros.push({ campo: "estado", mensagem: "Estado é obrigatório." });
  }
  if (!sexo || sexo.trim() === "") {
    erros.push({ campo: "sexo", mensagem: "Sexo é obrigatório." });
  }
  if (!dtNascimento || dtNascimento.trim() === "") {
    erros.push({
      campo: "dtNascimento",
      mensagem: "Data de nascimento é obrigatória.",
    });
  }

  // Validação CPF/CNPJ
  // Basic validation without cpf-cnpj-validator
  if (!cpfCnpj || cpfCnpj.trim() === "") {
    erros.push({ campo: "cpfCnpj", mensagem: "CPF/CNPJ é obrigatório." });
  } else {
    const valorLimpo = cpfCnpj.replace(/\D/g, "");
    if (valorLimpo.length !== 11 && valorLimpo.length !== 14) {
      erros.push({
        campo: "cpfCnpj",
        mensagem: "CPF/CNPJ deve ter 11 (CPF) ou 14 (CNPJ) dígitos.",
      });
    }
  }

  // 2. Se houver erros de validação, lançar exceção
  if (erros.length > 0) {
    const error = new Error("Erro de validação");
    error.name = "ValidationError";
    error.details = erros;
    throw error;
  }

  const existingUser = await db.query(
    "SELECT * FROM USUARIO WHERE emailUsuario = ?",
    [email]
  );
  if (existingUser[0].length > 0) {
    const error = new Error("Email já cadastrado.");
    error.name = "ConflictError";
    throw error;
  }

  const hashedPassword = await hashPassword(senha);

  // 1. Inserir em USUARIO
  const insertUserSql = `
        INSERT INTO USUARIO (emailUsuario, senha, fotoPerfil, bannerPerfil)
        VALUES (?, ?, ?, ?)
    `;

  const defaultFotoPerfil = "default/foto-perfil-padrao-usuario-1.png";
  const defaultBannerPerfil = "default/banner-padrao-1.png";
  const [userResult] = await db.query(insertUserSql, [
    email,
    hashedPassword,
    defaultFotoPerfil,
    defaultBannerPerfil,
  ]);
  const insertedUserId = userResult.insertId;

  // 2. Inserir em FISICO
  const insertFisicoSql = `
        INSERT INTO FISICO (cpfFisico, nomeFisico, sobrenomeFisico, telefoneFisico, dtNascimento, estadoFisico, sexo, idUsuario)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
  await db.query(insertFisicoSql, [
    cpfCnpj,
    nome,
    sobrenome,
    telefone,
    dtNascimento,
    estado,
    sexo,
    insertedUserId,
  ]);

  return { id: insertedUserId, email, nome, sobrenome };
}
async function findUserProfileById(userId) {
  // Buscar dados do usuário e físicos
  const userQuery = `
        SELECT
            u.idUsuario,
            u.emailUsuario,
            u.fotoPerfil,
            u.bannerPerfil,
            f.cpfFisico,
            f.nomeFisico,
            f.sobrenomeFisico,
            f.telefoneFisico,
            f.estadoFisico,
            f.sexo,
            f.dtNascimento,
            vjf.cargo,
            j.cnpjJuridico,
            j.nomeComercial,
            j.razaoSocial,
            j.telefoneJuridico,
            j.estadoJuridico,
            j.enderecoJuridico,
            j.areaAtuacao
        FROM USUARIO u
        INNER JOIN FISICO f ON u.idUsuario = f.idUsuario
        LEFT JOIN VINCULO_JURIDICO_FISICO vjf ON f.cpfFisico = vjf.cpfFisico
        LEFT JOIN JURIDICO j ON vjf.cnpjJuridico = j.cnpjJuridico
        WHERE u.idUsuario = ?;
    `;

  const [userRows] = await db.query(userQuery, [userId]);

  if (userRows.length === 0) {
    return null;
  }

  const user = userRows[0];

  // Buscar empresas seguidas
  const followedQuery = `
        SELECT
            j.cnpjJuridico,
            j.nomeComercial,
            j.razaoSocial,
            j.telefoneJuridico,
            j.estadoJuridico,
            j.enderecoJuridico,
            j.areaAtuacao
        FROM FISICO_SEGUE_JURIDICO fsj
        INNER JOIN JURIDICO j ON fsj.cnpjJuridico = j.cnpjJuridico
        WHERE fsj.cpfFisico = ?;
    `;
  const [followedRows] = await db.query(followedQuery, [user.cpfFisico]);

  // Montar o objeto final
  const response = {
    id: user.idUsuario,
    email: user.emailUsuario,
    nome: user.nomeFisico,
    sobrenome: user.sobrenomeFisico,
    telefone: user.telefoneFisico,
    estado: user.estadoFisico,
    sexo: user.sexo,
    data_nascimento: user.dtNascimento,
    fotoPerfil: user.fotoPerfil,
    bannerPerfil: user.bannerPerfil,
    cargo: user.cargo || null,
    empresa_associada: user.cnpjJuridico
      ? {
          cnpj: user.cnpjJuridico,
          nomeComercial: user.nomeComercial,
          razaoSocial: user.razaoSocial,
          telefone: user.telefoneJuridico,
          estado: user.estadoJuridico,
          endereco: user.enderecoJuridico,
          areaAtuacao: user.areaAtuacao,
        }
      : null,
    empresas_seguidas: followedRows,
  };

  return response;
}

async function authenticateUser(email, password) {
  try {
    const [userRows] = await db.query(
      "SELECT * FROM USUARIO WHERE emailUsuario = ?",
      [email]
    );

    if (userRows.length === 0) {
      const error = new Error("Usuário não encontrado.");
      error.name = "AuthenticationError";
      throw error;
    }

    const user = userRows[0];

    // Veja o objeto completo do usuário com dados retornados no log do backend
    // console.log('Usuário encontrado:', user);
    // Veja o nome exato das propriedades
    // console.log(Object.keys(user));

    const senhaHash = user.senha;

    const senhaCorreta = await comparePassword(password, senhaHash);
    if (!senhaCorreta) {
      const error = new Error("Senha incorreta.");
      error.name = "AuthenticationError";
      throw error;
    }

    const tokenPayload = {
      id: user.idUsuario,
      email: user.emailUsuario,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return {
      token,
      user: {
        id: user.idUsuario,
        email: user.emailUsuario,
      },
    };
  } catch (err) {
    console.error("Erro no authenticateUser:", err);
    throw err;
  }
}

export const getUserByEmail = async (email) => {
  return await Usuario.findOne({ where: { emailUsuario: email } });
};

export const updateUserPasswordAndClearCode = async (email, hashedPassword) => {
  await Usuario.update(
    { senha: hashedPassword, reset_code: null },
    { where: { emailUsuario: email } }
  );
};

export async function saveResetCode(userId, code) {
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
  await db.query(
    "UPDATE USUARIO SET reset_code = ?, reset_code_expires_at = ? WHERE idUsuario = ?",
    [code, expiresAt, userId]
  );
}

// user.service.js

export async function updateUserProfile(userId, dadosAtualizados) {
  const {
    nome,

    sobrenome,

    telefone,

    estado,

    sexo,

    dataNascimento,
  } = dadosAtualizados;
  console.log("Dados recebidos para atualização:", dadosAtualizados);
  if (!nome || !sobrenome) {
    const error = new Error("Nome e sobrenome são obrigatórios.");

    error.name = "ValidationError";

    throw error;
  }

  const updateUserSql = `


        UPDATE FISICO


        SET nomeFisico = ?, sobrenomeFisico = ?, telefoneFisico = ?, estadoFisico = ?, sexo = ?, dtNascimento = ?


        WHERE idUsuario = ?


    `;

  await db.query(updateUserSql, [
    nome,
    sobrenome,
    telefone,
    estado,
    sexo,
    dataNascimento,
    userId,
  ]);

  return { message: "Dados do perfil atualizados com sucesso." };
}

export async function updateUserProfilePhoto(userId, fotoPerfil) {
  if (!fotoPerfil || typeof fotoPerfil !== "string") {
    const error = new Error("URL da foto de perfil inválida.");

    error.name = "ValidationError";

    throw error;
  }

  await db.query(`UPDATE USUARIO SET fotoPerfil = ? WHERE idUsuario = ?`, [
    fotoPerfil,
    userId,
  ]);

  return { message: "Foto de perfil atualizada com sucesso." };
}

export async function updateUserBanner(userId, bannerPerfil) {
  if (!bannerPerfil || typeof bannerPerfil !== "string") {
    const error = new Error("URL do banner inválida.");

    error.name = "ValidationError";

    throw error;
  }

  await db.query(`UPDATE USUARIO SET bannerPerfil = ? WHERE idUsuario = ?`, [
    bannerPerfil,
    userId,
  ]);

  return { message: "Banner de perfil atualizado com sucesso." };
}

export default {
  createUser,
  findUserProfileById,
  authenticateUser,
  getUserByEmail,
  updateUserPasswordAndClearCode,
  saveResetCode,
  updateUserProfile,
  updateUserProfilePhoto,
  updateUserBanner
};
