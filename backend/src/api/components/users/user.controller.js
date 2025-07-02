// backend/src/api/components/users/user.controller.js
import userService from "./user.service.js";
import * as hashUtil from "../../utils/hash.util.js";
import axios from "axios";
import {  sendCodeEmail,  isEmailServiceEnabled } from "../../utils/email.util.js"; 
import cloudinary from "../../utils/cloudinary.util.js";

const isDevRecoveryMode = process.env.DEV_RECOVERY_MODE === "true";
const recaptchaEnabled = !!process.env.RECAPTCHA_SECRET_KEY;

async function registerUser(req, res) {
    try {
        const userData = req.body;
        const newUser = await userService.createUser(userData);
        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuarioId: newUser.id 
        });
    } catch (error) {
        if (error.message === 'Email já cadastrado') { 
            return res.status(409).json({ erro: error.message });
        }
        if (error.name === 'ValidationError') { 
            return res.status(400).json({ erro: "Erro de validação", detalhes: error.details });
        }
        console.error("Erro no controller ao registrar usuário:", error);
        return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
    }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body; 
    const { token, user } = await userService.authenticateUser(email, password);
    res.json({ token, user });
  } catch (error) {
    if (error.name === "AuthenticationError") {
      console.error("Erro de autenticação:", error);
      return res.status(401).json({ erro: error.message });
    }
    res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
  }
}

async function getUserProfile(req, res) {
  try {
    const requestedUserId = req.params.id; 
    const authenticatedUserId = req.user.id;

    if (parseInt(requestedUserId) !== authenticatedUserId) {
      return res
        .status(403)
        .json({ erro: "Você não tem permissão para acessar este perfil." });
    }

    const userProfile = await userService.findUserProfileById(requestedUserId);

    if (!userProfile) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    res.json(userProfile);
  } catch (error) {
    console.error("Erro ao buscar perfil de usuário:", error);
    res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
  }
}

// Helper to verify reCAPTCHA
async function verifyRecaptcha(recaptchaToken) {
  if (!recaptchaEnabled) {
    if (!isDevRecoveryMode) {
      console.warn("⚠️ reCAPTCHA não verificado (serviço desativado)");
    }
    return true;
  }
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify`,
    null,
    {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      },
    }
  );
  if (!data.success) {
    if (isDevRecoveryMode) {
      console.warn("⚠️ Ignorando falha do reCAPTCHA (modo DEV ativado)");
      return true;
    }
    return false;
  }
  return true;
}

// Helper to handle sending code or dev mode
function handleSendCodeResponse(res, email, code) {
  if (isEmailServiceEnabled()) {
    return sendCodeEmail(email, code).then(() =>
      res.status(200).json({
        message: "Código enviado com sucesso!",
        code: isDevRecoveryMode ? code : undefined,
      })
    );
  } else if (isDevRecoveryMode) {
    console.warn(`⚠️  [DEV MODE] Código de recuperação gerado: ${code}`);
    return res.status(200).json({
      message: "Código gerado em modo desenvolvimento.",
      code: code,
    });
  } else {
    return res.status(503).json({
      message: "Serviço de recuperação de senha temporariamente indisponível",
      serviceUnavailable: true,
    });
  }
}

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
};

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
};

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
};

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

async function editUserProfile(req, res) {
  try {
    const userId = parseInt(req.params.id);

    const authenticatedUserId = req.user.id;

    if (userId !== authenticatedUserId) {
      return res
        .status(403)
        .json({ erro: "Você só pode editar seu próprio perfil." });
    }

    const resultado = await  userService.updateUserProfile(userId, req.body);

    return res.status(200).json(resultado);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ erro: error.message });
    }

    console.error("Erro ao editar perfil:", error);

    return res.status(500).json({ erro: "Erro interno ao editar perfil." });
  }
}

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

export default {
  registerUser,
  loginUser,
  getUserProfile,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  getPublicUserProfile,
  editUserProfile,
  editUserProfilePhoto,
  editUserBanner,
  setUserDefaultProfilePhoto,
  setUserDefaultBanner
};
