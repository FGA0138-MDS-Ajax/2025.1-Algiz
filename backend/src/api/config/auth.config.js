// backend/src/config/auth.config.js
export const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
export const JWT_SECRET = process.env.JWT_SECRET || 'your-strong-secret-key';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';