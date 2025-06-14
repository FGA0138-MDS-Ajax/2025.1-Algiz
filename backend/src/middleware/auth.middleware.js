const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const authHeader = req.header['authorization '];
    const token = authHeader && authHeader.split(' ')[1];


if(!token){
    return res.status(401).json({erro: 'Acesso negado. Nenhum token fornecido.' });
}
    try {
        const decodePayload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodePayload;

        next();

    } catch (error) {
        return res.status(403).json({ erro: 'Token inválido ou expirado.' });
        
    }
}
module.exports = verifyToken;