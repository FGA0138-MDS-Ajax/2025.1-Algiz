const userService = require('./user.service');


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
    try{
        const{email, passoword} = req.body;
        const { token, user } = await userService.authenticateUser(email, password);
        res.json({ token, user });
    }catch(error){
        if(error.name === 'AutenticationError'){
            return res.status(401).json({erro: error.massage});
        }
        res.status(500).json({ erro: 'Ocorreu um erro interno no servidor.' });
    }
    
}
async function getUserProfile(req, res) {
    try {
        
        const requestedUserId = req.param.id;
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

module.exports = {
    registerUser, loginUser, getUserProfile
};