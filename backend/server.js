// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.get('/ping-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1');
    res.json({ success: true, result: rows });
  } catch (err) {
    console.error('DB Ping failed:', err);
    res.status(500).json({ error: 'DB ping failed' });
  }
});

(async () => {
  try {
    app.get('/users', async (req, res) => {
      try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
      } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
