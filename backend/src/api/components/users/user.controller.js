// backend/src/api/components/users/user.controller.js
import userService from './user.service.js';  // Make sure user.service.js also uses ES Modules
import * as hashUtil from '../../utils/hash.util.js';
import axios from 'axios';
import { sendCodeEmail } from '../../utils/email.util.js';  // Ensure this path is correct

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
        const { email, password } = req.body;  // Fix typo: 'passoword' → 'password'
        const { token, user } = await userService.authenticateUser(email, password);
        res.json({ token, user });
    } catch (error) {
        if (error.name === 'AuthenticationError') {  // Fix typo: 'AutenticationError' → 'AuthenticationError'
            return res.status(401).json({ erro: error.message });  // Fix typo: 'massage' → 'message'
        }
        res.status(500).json({ erro: 'Ocorreu um erro interno no servidor.' });
    }
}

async function getUserProfile(req, res) {
    try {
        const requestedUserId = req.params.id;  // Fix: 'req.param.id' → 'req.params.id'
        const authenticatedUserId = req.user.id;
        
        if (parseInt(requestedUserId) !== authenticatedUserId) {
            return res.status(403).json({ erro: "Você não tem permissão para acessar este perfil." });
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
    return res.status(400).json({ message: 'Corpo da requisição ausente ou inválido.' });
  }
  const { email, recaptchaToken } = req.body;
  try {
    // 🔒 Verify reCAPTCHA with Google
    const { data } = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptchaToken
      }
    });

    if (!data.success) {
      return res.status(403).json({ message: 'Falha na verificação do reCAPTCHA' });
    }

    const user = await userService.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
    await userService.saveResetCode(user.idUsuario, code);
    await sendCodeEmail(email, code);
    res.status(200).json({ message: "Código enviado com sucesso!" });
  } catch (err) {
    console.error("❌ Erro completo no forgotPassword:", err);
    res.status(500).json({ message: "Erro ao enviar o código", error: err.message });
  }
};

// Verifica se o código enviado corresponde ao código armazenado no usuário
export const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const usuario = await userService.getUserByEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (usuario.reset_code !== code) {
      return res.status(400).json({ message: 'Código inválido.' });
    }

    const now = new Date();
    const expiresAt = new Date(usuario.reset_code_expires_at);
    if (expiresAt < now) {
      return res.status(410).json({ message: 'Código expirado.' });
    }

    return res.status(200).json({ message: 'Código válido.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao verificar o código.', error: error.message });
  }
};

// Atualiza a senha do usuário após validação
export const resetPassword = async (req, res) => {
  const { email, newPassword, code } = req.body;

  try {
    const usuario = await userService.getUserByEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (usuario.reset_code !== code) {
      return res.status(400).json({ message: 'Código inválido.' });
    }

    const hashedPassword = await hashUtil.hashPassword(newPassword);
    await usuario.update({
        senha: hashedPassword,
        reset_code: null,
        reset_code_expires_at: null
    });

    return res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao redefinir senha.', error: error.message });
  }
};



// ✅ Use ES Modules export (instead of module.exports)
export default {
    registerUser,
    loginUser,
    getUserProfile,
    forgotPassword,
    verifyResetCode,
    resetPassword
};