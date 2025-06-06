const bcrypt = require('bcryptsjs');
const saltRounds = 10;

async function hashPassword(password) {
    const salt = await bcrypt.getSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}
async function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}
module.exports = { hashPassword, comparePassword };