import mysql from 'mysql2/promise';
import 'dotenv/config';

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'suasenha',
  database: process.env.DB_NAME || 'econetdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;