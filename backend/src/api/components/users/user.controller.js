import userService from "./user.service.js"; // Serviço relacionado ao usuário
import * as hashUtil from "../../utils/hash.util.js"; // Utilitário para hash de senhas
import axios from "axios"; // Biblioteca para requisições HTTP
import { sendCodeEmail, isEmailServiceEnabled } from "../../utils/email.util.js"; // Utilitários para envio de email
import cloudinary from "../../utils/cloudinary.util.js"; // Serviço de upload de imagens
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.util.js";

// Variáveis de configuração
const isDevRecoveryMode = process.env.DEV_RECOVERY_MODE === "true"; // Modo de recuperação em desenvolvimento
const recaptchaEnabled = !!process.env.RECAPTCHA_SECRET_KEY; // Verifica se o reCAPTCHA está habilitado

// Função para registrar um novo usuário
async function registerUser(req, res) {
    try {
        const userData = req.body; // Dados enviados pelo cliente
        const newUser = await userService.createUser(userData); // Cria o usuário no banco de dados
        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!", // Mensagem de sucesso
            usuarioId: newUser.id // Retorna o ID do novo usuário
        });
    } catch (error) {
        // Tratamento de erros específicos
        if (error.message === 'Email já cadastrado') { 
            return res.status(409).json({ erro: error.message }); // Email já registrado
        }
        if (error.name === 'ValidationError') { 
            return res.status(400).json({ erro: "Erro de validação", detalhes: error.details }); // Erro de validação
        }
        // Tratamento de erros gerais
        console.error("Erro no controller ao registrar usuário:", error);
        return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
    }
}

// Função para autenticar o usuário (login)
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Reutiliza seu serviço atual que retorna user e token (modificaremos ele também)
    const user = await userService.authenticateUser(email, password);

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    // Envia o refresh token em um cookie seguro
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Em prod use HTTPS
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    });

    // Envia apenas o access token + user para o frontend
    return res.json({ token: accessToken, user });

  } catch (error) {
    if (error.name === "AuthenticationError") {
      console.error("Erro de autenticação:", error);
      return res.status(401).json({ erro: error.message });
    }
    console.error("Erro interno:", error);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
}

export function refreshToken(req, res) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ erro: "Sem token de atualização" });

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ erro: "Refresh token inválido" });

    const newAccessToken = generateAccessToken({ id: user.id });
    return res.json({ token: newAccessToken });
  });
}

export function logout(req, res) {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logout realizado com sucesso." });
}

// Função para buscar o perfil do usuário autenticado
async function getUserProfile(req, res) {
  try {
    const requestedUserId = req.params.id; // ID do usuário solicitado
    const authenticatedUserId = req.user.id; // ID do usuário autenticado

    // Verifica se o usuário está acessando seu próprio perfil
    if (parseInt(requestedUserId) !== authenticatedUserId) {
      return res
        .status(403)
        .json({ erro: "Você não tem permissão para acessar este perfil." });
    }

    const userProfile = await userService.findUserProfileById(requestedUserId); // Busca o perfil no banco de dados

    if (!userProfile) {
      return res.status(404).json({ erro: "Usuário não encontrado." }); // Usuário não encontrado
    }

    res.json(userProfile); // Retorna os dados do perfil
  } catch (error) {
    console.error("Erro ao buscar perfil de usuário:", error);
    res.status(500).json({ erro: "Ocorreu um erro interno no servidor." }); // Erro interno
  }
}

// Função auxiliar para verificar o reCAPTCHA
async function verifyRecaptcha(recaptchaToken) {
  if (!recaptchaEnabled) {
    if (!isDevRecoveryMode) {
      console.warn("⚠️ reCAPTCHA não verificado (serviço desativado)");
    }
    return true; // Ignora verificação se o reCAPTCHA está desativado
  }
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify`,
    null,
    {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY, // Chave secreta do reCAPTCHA
        response: recaptchaToken, // Token enviado pelo cliente
      },
    }
  );
  if (!data.success) {
    if (isDevRecoveryMode) {
      console.warn("⚠️ Ignorando falha do reCAPTCHA (modo DEV ativado)");
      return true; // Ignora falha no modo de desenvolvimento
    }
    return false; // Falha na verificação do reCAPTCHA
  }
  return true; // Verificação bem-sucedida
}

// Função auxiliar para enviar código de recuperação ou modo DEV
function handleSendCodeResponse(res, email, code) {
  if (isEmailServiceEnabled()) {
    return sendCodeEmail(email, code).then(() =>
      res.status(200).json({
        message: "Código enviado com sucesso!", // Mensagem de sucesso
        code: isDevRecoveryMode ? code : undefined, // Retorna o código no modo DEV
      })
    );
  } else if (isDevRecoveryMode) {
    console.warn(`⚠️  [DEV MODE] Código de recuperação gerado: ${code}`);
    return res.status(200).json({
      message: "Código gerado em modo desenvolvimento.", // Mensagem no modo DEV
      code: code,
    });
  } else {
    return res.status(503).json({
      message: "Serviço de recuperação de senha temporariamente indisponível", // Serviço indisponível
      serviceUnavailable: true,
    });
  }
}

// Função para enviar código de recuperação de senha
export const forgotPassword = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "Corpo da requisição ausente ou inválido." });
  }

  const { email, recaptchaToken } = req.body;

  try {
    const recaptchaOk = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaOk) {
      return res.status(403).json({ message: "Falha na verificação do reCAPTCHA" });
    }

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await userService.saveResetCode(user.idUsuario, code);

    return handleSendCodeResponse(res, email, code);
  } catch (err) {
    console.error("❌ Erro completo no forgotPassword:", err);
    res
      .status(500)
      .json({ message: "Erro ao processar solicitação", error: err.message });
  }
}

// Verifica se o código enviado corresponde ao código armazenado no usuário
export const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const usuario = await userService.getUserByEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    if (usuario.reset_code !== code) {
      return res.status(400).json({ message: "Código inválido." });
    }

    const now = new Date();
    const expiresAt = new Date(usuario.reset_code_expires_at);
    if (expiresAt < now) {
      return res.status(410).json({ message: "Código expirado." });
    }

    return res.status(200).json({ message: "Código válido." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao verificar o código.", error: error.message });
  }
}

// Atualiza a senha do usuário após validação
export const resetPassword = async (req, res) => {
  const { email, newPassword, code } = req.body;

  try {
    const usuario = await userService.getUserByEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    if (usuario.reset_code !== code) {
      return res.status(400).json({ message: "Código inválido." });
    }

    const hashedPassword = await hashUtil.hashPassword(newPassword);
    await usuario.update({
      senha: hashedPassword,
      reset_code: null,
      reset_code_expires_at: null,
    });

    return res.status(200).json({ message: "Senha redefinida com sucesso." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao redefinir senha.", error: error.message });
  }
}

// Função para atualizar a senha do usuário
async function updatePassword(req, res) {
  try {
    const userId = parseInt(req.params.id);
    const { currentPassword, newPassword, repeatNewPassword } = req.body;

    // Verifica se o usuário está atualizando sua própria senha
    if (userId !== req.user.id) {
      return res.status(403).json({ erro: "Você só pode atualizar sua própria senha." });
    }

    // Valida nova senha e repetição
    if (newPassword !== repeatNewPassword) {
      return res.status(400).json({ erro: "A nova senha e a repetição não coincidem." });
    }

    // Valida a senha atual e atualiza a senha
    const result = await userService.updatePassword(userId, currentPassword, newPassword);

    if (result.success) {
      return res.status(200).json({ mensagem: "Senha atualizada com sucesso. Faça login novamente." });
    } else {
      return res.status(400).json({ erro: result.message });
    }
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    return res.status(500).json({ erro: "Erro interno ao atualizar senha." });
  }
}

// Função para buscar perfil público do usuário
async function getPublicUserProfile(req, res) {
  try {
    const userId = req.params.id;
    const fullProfile = await userService.findUserProfileById(userId);

    if (!fullProfile) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    // Seleciona apenas os campos públicos
    const publicProfile = {
      id: fullProfile.id,
      nome: fullProfile.nome,
      sobrenome: fullProfile.sobrenome,
      fotoPerfil: fullProfile.fotoPerfil,
      bannerPerfil: fullProfile.bannerPerfil,
      cargo: fullProfile.cargo,
      empresa_associada: fullProfile.empresa_associada,
      empresas_seguidas: fullProfile.empresas_seguidas,
    };

    return res.json(publicProfile);
  } catch (error) {
    console.error("Erro ao buscar perfil público:", error);
    res.status(500).json({ erro: "Erro interno ao buscar perfil público." });
  }
}

// Função para editar perfil do usuário
async function editUserProfile(req, res) {
  try {
    const userId = parseInt(req.params.id);

    const authenticatedUserId = req.user.id;

    if (userId !== authenticatedUserId) {
      return res
        .status(403)
        .json({ erro: "Você só pode editar seu próprio perfil." });
    }

    const resultado = await userService.updateUserProfile(userId, req.body);

    return res.status(200).json(resultado);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ erro: error.message });
    }

    console.error("Erro ao editar perfil:", error);

    return res.status(500).json({ erro: "Erro interno ao editar perfil." });
  }
}

// Função para editar foto de perfil do usuário
export async function editUserProfilePhoto(req, res) {
  try {
    const userId = parseInt(req.params.id);
    if (userId !== req.user.id) {
      return res.status(403).json({ erro: "Você só pode editar sua própria foto." });
    }

    if (!req.file) {
      return res.status(400).json({ erro: "Nenhuma imagem enviada." });
    }

    const uploadResult = cloudinary.uploader.upload_stream(
      {
        folder: "fotos_perfil",
        public_id: `perfil_${userId}`,
        overwrite: true,
      },
      async (error, result) => {
        if (error) return res.status(500).json({ erro: "Erro ao enviar imagem para Cloudinary" });

        const fotoPerfil = result.secure_url;
        const updateResult = await userService.updateUserProfilePhoto(userId, fotoPerfil);
        return res.status(200).json({ ...updateResult, fotoPerfil });
      }
    );

    uploadResult.end(req.file.buffer); // envia o buffer
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

// Função para editar banner do usuário
export async function editUserBanner(req, res) {
  try {
    const userId = parseInt(req.params.id);
    if (userId !== req.user.id) {
      return res.status(403).json({ erro: "Você só pode editar seu próprio banner." });
    }

    if (!req.file) {
      return res.status(400).json({ erro: "Nenhuma imagem enviada." });
    }

    const uploadResult = cloudinary.uploader.upload_stream(
      {
        folder: "banners",
        public_id: `banner_${userId}`,
        overwrite: true,
      },
      async (error, result) => {
        if (error) return res.status(500).json({ erro: "Erro ao enviar imagem para Cloudinary" });

        const bannerPerfil = result.secure_url;
        const updateResult = await userService.updateUserBanner(userId, bannerPerfil);
        return res.status(200).json({ ...updateResult, bannerPerfil });
      }
    );

    uploadResult.end(req.file.buffer);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

// Função para definir foto de perfil padrão
export async function setUserDefaultProfilePhoto(req, res) {
  try {
    const userId = parseInt(req.params.id);
    if (userId !== req.user.id) {
      return res.status(403).json({ erro: "Você só pode editar sua própria foto." });
    }

    const DEFAULT_PROFILE_URL = "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png";
    const updateResult = await userService.updateUserProfilePhoto(userId, DEFAULT_PROFILE_URL);

    return res.status(200).json({ ...updateResult, fotoPerfil: DEFAULT_PROFILE_URL });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

// Função para definir banner padrão
export async function setUserDefaultBanner(req, res) {
  try {
    const userId = parseInt(req.params.id);
    if (userId !== req.user.id) {
      return res.status(403).json({ erro: "Você só pode editar seu próprio banner." });
    }

    const DEFAULT_BANNER_URL = "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png";
    const updateResult = await userService.updateUserBanner(userId, DEFAULT_BANNER_URL);

    return res.status(200).json({ ...updateResult, bannerPerfil: DEFAULT_BANNER_URL });
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

// ✅ NOVA FUNÇÃO: Buscar empresas associadas
async function getEmpresasAssociadas(req, res) {
  try {
    const userId = parseInt(req.params.id);
    const authenticatedUserId = req.user.id;

    // Verifica se o usuário está acessando suas próprias empresas ou se é público
    if (userId !== authenticatedUserId) {
      // Para outros usuários, retornar apenas empresas públicas (sem cargo)
      const empresas = await userService.findEmpresasAssociadasByUserId(userId);
      const empresasPublicas = empresas.map(empresa => ({
        id: empresa.idEmpresa,
        nomeComercial: empresa.nomeComercial,
        fotoEmpresa: empresa.fotoEmpresa,
        areaAtuacao: empresa.areaAtuacao
      }));
      return res.json(empresasPublicas);
    }

    // Para o próprio usuário, retornar empresas completas
    const empresas = await userService.findEmpresasAssociadasByUserId(userId);
    res.json(empresas);
  } catch (error) {
    console.error("Erro ao buscar empresas associadas:", error);
    res.status(500).json({ erro: "Erro interno do servidor." });
  }
}

// Buscar empresas que o usuário segue
async function getEmpresasSeguidas(req, res) {
  try {
    const userId = parseInt(req.params.id);
    const result = await userService.findEmpresasSeguidasByUserId(userId);
    
    // Log detalhado para ajudar na depuração
    console.log(`Retornando ${result.total} empresas seguidas para o usuário ${userId}`);
    
    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar empresas seguidas:", error);
    return res.status(500).json({ erro: "Erro interno do servidor." });
  }
}

// Exporta todas as funções do controller
export default {
  registerUser,
  loginUser,
  refreshToken,
  logout,
  getUserProfile,
  forgotPassword,
  updatePassword,
  verifyResetCode,
  resetPassword,
  getPublicUserProfile,
  editUserProfile,
  editUserProfilePhoto,
  editUserBanner,
  setUserDefaultProfilePhoto,
  setUserDefaultBanner,
  getEmpresasAssociadas,  // ✅ ADICIONAR
  getEmpresasSeguidas
};