import express from 'express';
import cors from 'cors';
import db from './db.js';
import bcrypt from 'bcrypt';
import { admin, adminRouter } from './admin.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';
import models from './models/index.js';
const { Usuario } = models;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// 🔐 Session setup
const SequelizeStore = connectSessionSequelize(session.Store);
const sessionStore = new SequelizeStore({
  db: db,
});
await db.authenticate();
await sessionStore.sync();

app.use(cors());
app.use(express.json());

// 🧠 IMPORTANT: Apply session middleware BEFORE admin router
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
    },
  })
);

// 🛠️ AdminJS
app.use(admin.options.rootPath, adminRouter);

const PORT = 3001;

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

(async () => {
  try {
    // Ensure admin user exists
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
    const existingAdmin = await Usuario.findOne({ where: { emailUsuario: process.env.ADMIN_EMAIL } });
    if (!existingAdmin) {
      await Usuario.create({
        emailUsuario: process.env.ADMIN_EMAIL,
        senha: hashedPassword,
        telefoneUsuario: '0000000000',
        estado: 'DF'
      });
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`AdminJS dashboard at http://localhost:${PORT}${admin.options.rootPath}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
