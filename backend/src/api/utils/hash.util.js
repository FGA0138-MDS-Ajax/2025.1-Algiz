import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/auth.config.js';

/**
 * Hashes a plain text password
 * @param {string} plainPassword - The password to hash
 * @returns {Promise<string>} - The hashed password
 */
export async function hashPassword(plainPassword) {
    try {
        // Ensure SALT_ROUNDS is a number
        const saltRounds = Number(SALT_ROUNDS) || 10;
        console.log(`Using salt rounds: ${saltRounds}`); // Debug logging
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(plainPassword, salt);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
}

/**
 * Compares a plain text password with a hashed password
 * @param {string} plainPassword - The password to verify
 * @param {string} hashedPassword - The stored hashed password
 * @returns {Promise<boolean>} - Whether the passwords match
 */
export async function comparePassword(plainPassword, hashedPassword) {
    try {
        if (!plainPassword || !hashedPassword) {
            console.error('Parâmetros inválidos para comparação de senha:', {
                plainPassword,
                hashedPassword,
            });
            throw new Error('Parâmetros inválidos para bcrypt.compare');
        }

        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Failed to compare passwords');
    }
}
