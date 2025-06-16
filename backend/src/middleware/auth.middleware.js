// backend/src/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    // Fix: req.header['authorization'] → req.headers['authorization']
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ erro: 'Acesso negado. Nenhum token fornecido.' });
    }

    try {
        const decodePayload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodePayload;
        next();
    } catch (error) {
        return res.status(403).json({ erro: 'Token inválido ou expirado.' });
    }
}

// ✅ Export as ES Module (default export)
export default verifyToken;