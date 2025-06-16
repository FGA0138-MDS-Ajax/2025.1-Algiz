// backend/server.js
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';

// Importa a instância do sequelize e os modelos do arquivo models/index.js
import models, { sequelize } from './models/index.js';
import { admin, adminRouter } from './admin.js';

// Importa as rotas de usuário
import userRoutes from './src/api/routes/user.routes.js'; // ✅ IMPORTAÇÃO ADICIONADA

console.log('--- LENDO ARQUIVO server.js (VERSÃO COM ROTAS MODULARES) ---');

const { Usuario } = models;

dotenv.config();

const app = express();
const PORT = 3001;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o MySQL estabelecida com sucesso.');

    await sequelize.sync();
    console.log('✅ Todas as tabelas foram criadas com sucesso.');

    const SequelizeStore = connectSessionSequelize(session.Store);
    const sessionStore = new SequelizeStore({
      db: sequelize,
    });

  const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ];

  app.use(cors({
    origin: true, // Allows all origins
    credentials: true //mudar isso futuramente para usar as urls específicas
  }));

  app.use(express.json());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'uma-chave-secreta-muito-forte',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
       httpOnly: true,
       secure: process.env.NODE_ENV === 'production',
      },
   })
  );
  await sessionStore.sync();

  // ✅ Usa as rotas definidas no user.routes.js
  app.use('/api/usuarios', userRoutes);

  // AdminJS
  app.use(admin.options.rootPath, adminRouter);

  // Teste básico
  app.get('/', (req, res) => {
  res.send('Backend da EcoNet no ar!');
  });

  // ✅ Remove rota duplicada /api/usuarios (já tratada em user.routes.js)
  // Garante usuário admin
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  const [adminUser, created] = await Usuario.findOrCreate({
  where: { emailUsuario: process.env.ADMIN_EMAIL || 'admin@example.com' },
    defaults: {
      senha: hashedPassword,
      telefoneUsuario: '0000000000',
      estado: 'DF',
    },
  });

  if (created) {
    console.log('✅ Usuário administrador criado.');
  } else {
    console.log('✅ Usuário administrador já existe.');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🔑 Painel AdminJS em http://localhost:${PORT}${admin.options.rootPath}`);
  });

  } catch (err) {
    console.error('❌ Não foi possível iniciar o servidor:', err);
    process.exit(1);
  }
}

startServer();
