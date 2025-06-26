// backend/src/api/components/users/user.controller.js
import userService from "./user.service.js"; // Make sure user.service.js also uses ES Modules
import * as hashUtil from "../../utils/hash.util.js";
import axios from "axios";
import {
  sendCodeEmail,
  isEmailServiceEnabled,
} from "../../utils/email.util.js"; // Ensure this path is correct

const recaptchaEnabled = !!process.env.RECAPTCHA_SECRET_KEY;
if (!recaptchaEnabled) {
  console.warn('⚠️ reCAPTCHA desativado - RECAPTCHA_SECRET_KEY não configurada');
}

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
    const { email, password } = req.body; // Fix typo: 'passoword' → 'password'
    const { token, user } = await userService.authenticateUser(email, password);
    res.json({ token, user });
  } catch (error) {
    if (error.name === "AuthenticationError") {
      // Fix typo: 'AutenticationError' → 'AuthenticationError'
      return res.status(401).json({ erro: error.message }); // Fix typo: 'massage' → 'message'
    }
    res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
  }
}

async function getUserProfile(req, res) {
  try {
    const requestedUserId = req.params.id; // Fix: 'req.param.id' → 'req.params.id'
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

export const forgotPassword = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "Corpo da requisição ausente ou inválido." });
  }

  const { email, recaptchaToken } = req.body;

  try {
    // Verificação opcional de reCAPTCHA
    if (recaptchaEnabled) {
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
        return res
          .status(403)
          .json({ message: "Falha na verificação do reCAPTCHA" });
      }
    } else {
      console.warn("⚠️  reCAPTCHA não verificado (serviço desativado)");
    }

    const user = await userService.getUserByEmail(email);
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await userService.saveResetCode(user.idUsuario, code);

    // Verifica se o serviço de email está disponível antes de tentar enviar
    if (isEmailServiceEnabled()) {
      await sendCodeEmail(email, code);
      return res.status(200).json({
        message: "Código enviado com sucesso!",
        code: process.env.NODE_ENV === "development" ? code : undefined, // Só retorna o código em desenvolvimento
      });
    } else {
      // Modo fallback - retorna o código diretamente (apenas para desenvolvimento)
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `⚠️  Serviço de email desativado - Código de recuperação: ${code}`
        );
        return res.status(200).json({
          message:
            "Serviço de email desativado - Código gerado (apenas para desenvolvimento)",
          code: code,
        });
      } else {
        return res.status(503).json({
          message:
            "Serviço de recuperação de senha temporariamente indisponível",
          serviceUnavailable: true, // Flag adicional para identificar esse caso
        });
      }
    }
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

    const authenticatedUserId = req.user.id;

    if (userId !== authenticatedUserId) {
      return res
        .status(403)
        .json({ erro: "Você só pode editar sua própria foto." });
    }

    const { fotoPerfil } = req.body;

    const result = await userService.updateUserProfilePhoto(userId, fotoPerfil);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

export async function editUserBanner(req, res) {
  try {
    const userId = parseInt(req.params.id);

    const authenticatedUserId = req.user.id;

    if (userId !== authenticatedUserId) {
      return res
        .status(403)
        .json({ erro: "Você só pode editar seu próprio banner." });
    }

    const { bannerPerfil } = req.body;

    const result = await userService.updateUserBanner(userId, bannerPerfil);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ erro: error.message });
  }
}

// ✅ Use ES Modules export (instead of module.exports)
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
  editUserBanner
};
