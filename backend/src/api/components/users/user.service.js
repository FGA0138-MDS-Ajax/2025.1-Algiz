import db from '../../config/db.js';  
import { hashPassword } from '../../utils/hash.util.js';
//import { cpf, cnpj } from 'cpf-cnpj-validator';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../config/auth.config.js';
import { comparePassword } from '../../utils/hash.util.js';  // Fixed path

async function createUser(userData) {
    const { nome, sobrenome, email, senha, telefone, estado, sexo, dtNascimento, cpfCnpj } = userData;
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
            erros.push({ campo: "senha", mensagem: "Senha deve ter no mínimo 8 caracteres." });
        }
        if (!/[A-Z]/.test(senha)) {
            erros.push({ campo: "senha", mensagem: "Senha deve conter pelo menos uma letra maiúscula." });
        }
        if (!/[a-z]/.test(senha)) {
            erros.push({ campo: "senha", mensagem: "Senha deve conter pelo menos uma letra minúscula." });
        }
        if (!/\d/.test(senha)) {
            erros.push({ campo: "senha", mensagem: "Senha deve conter pelo menos um número." });
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
        erros.push({ campo: "dtNascimento", mensagem: "Data de nascimento é obrigatória." });
    }

    // Validação CPF/CNPJ
    // Basic validation without cpf-cnpj-validator
    if (!cpfCnpj || cpfCnpj.trim() === "") {
        erros.push({ campo: "cpfCnpj", mensagem: "CPF/CNPJ é obrigatório." });
    } else {
        const valorLimpo = cpfCnpj.replace(/\D/g, '');
        if (valorLimpo.length !== 11 && valorLimpo.length !== 14) {
            erros.push({ campo: "cpfCnpj", mensagem: "CPF/CNPJ deve ter 11 (CPF) ou 14 (CNPJ) dígitos." });
        }
    }

    // 2. Se houver erros de validação, lançar exceção
    if (erros.length > 0) {
        const error = new Error("Erro de validação");
        error.name = 'ValidationError';
        error.details = erros;
        throw error;
    }

    const existingUser = await db.query('SELECT * FROM USUARIO WHERE emailUsuario = ?', [email]);
    if (existingUser[0].length > 0) {
        const error = new Error('Email já cadastrado.');
        error.name = 'ConflictError';
        throw error;
    }

    const hashedPassword = await hashPassword(senha);

    // 1. Inserir em USUARIO
    const insertUserSql = `
        INSERT INTO USUARIO (emailUsuario, senha)
        VALUES (?, ?)
    `;
    const [userResult] = await db.query(insertUserSql, [email, hashedPassword]);
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
        insertedUserId
    ]);

    return { id: insertedUserId, email, nome, sobrenome };
}
async function findUserProfileById(userId) {
   
    const userQuery = `
        SELECT
            u.id,
            u.name,
            u.email,
            u.telefone, -- Adicione estas colunas 
            u.estado,   -- Adicione estas colunas 
            u.foto_perfil_url, -- Adicione estas colunas
            u.banner_url,      -- Adicione estas colunas
            e.id as empresa_id,
            e.nome as empresa_nome,
            e.descricao as empresa_descricao
        FROM usuarios u
        LEFT JOIN empresas e ON u.empresa_id_associada = e.id -- Supondo que 'usuarios' tem uma FK para 'empresas'
        WHERE u.id = ?;
    `;
    const [userRows] = await db.query(userQuery, [userId]);

    if (userRows.length === 0) {
        return null;
    }
    const userProfile = userRows[0];

    const followedCompaniesQuery = `
        SELECT
            e.id,
            e.nome,
            e.logo_url
        FROM empresas e
        INNER JOIN usuarios_seguem_empresas usf ON e.id = usf.empresa_id
        WHERE usf.usuario_id = ?;
    `;
    const [followedCompaniesRows] = await db.query(followedCompaniesQuery, [userId]);

    const finalResponse = {
        nome: userProfile.name,
        email: userProfile.email,
        telefone: userProfile.telefone,
        estado: userProfile.estado,
        foto_perfil_url: userProfile.foto_perfil_url,
        banner_url: userProfile.banner_url,
        dados_empresa_associada: userProfile.empresa_id ? {
            id: userProfile.empresa_id,
            nome: userProfile.empresa_nome,
            descricao: userProfile.empresa_descricao
        } : null,
        empresas_seguidas: followedCompaniesRows
    };

    return finalResponse;

}

async function authenticateUser(email, password) {
    try {
        const [userRows] = await db.query('SELECT * FROM USUARIO WHERE emailUsuario = ?', [email]);

        if (userRows.length === 0) {
            const error = new Error('Usuário não encontrado.');
            error.name = 'AuthenticationError';
            throw error;
        }

        const user = userRows[0];
        const senhaHash = user.senha;

        const senhaCorreta = await comparePassword(password, senhaHash);
        if (!senhaCorreta) {
            const error = new Error('Senha incorreta.');
            error.name = 'AuthenticationError';
            throw error;
        }

        const tokenPayload = {
            id: user.idUsuario,
            email: user.emailUsuario,
        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return {
            token,
            user: {
                id: user.idUsuario,
                email: user.emailUsuario
            }
        };
    } catch (err) {
        console.error('Erro no authenticateUser:', err);
        throw err;
    }
}

export default {
    createUser,
    findUserProfileById,
    authenticateUser
};