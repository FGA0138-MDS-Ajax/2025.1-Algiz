// backend/src/api/components/users/user.controller.js
import userService from './user.service.js';  // Make sure user.service.js also uses ES Modules

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

// ✅ Use ES Modules export (instead of module.exports)
export default {
    registerUser,
    loginUser,
    getUserProfile
};