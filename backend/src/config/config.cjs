require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'suasenha',
    database: process.env.DB_NAME || 'econetdb',
    host: process.env.DB_HOST || 'backend-db-1', // make sure this matches your actual DB container name
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
  }
};