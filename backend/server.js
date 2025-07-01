// backend/server.js
import express from 'express';
import path from 'path';
import cors from 'cors';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';


// Importa a instância do sequelize e os modelos do arquivo models/index.js
import models, { sequelize } from './src/models/index.model.js';
import { admin, adminRouter } from './admin.js';

// Importa as rotas de usuário
import userRoutes from './src/api/routes/user.routes.js'; // ✅ IMPORTAÇÃO ADICIONADA
import empresaRoutes from './src/api/routes/empresa.route.js'; 
import messageRoutes from './src/api/routes/message.route.js';

console.log('--- LENDO ARQUIVO server.js (VERSÃO COM ROTAS MODULARES) ---');

const { Usuario } = models;

dotenv.config();

console.log('🔍 Verificando serviços opcionais:');

if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️  Serviço de email DESATIVADO - RESEND_API_KEY não configurada');
} else{
  console.log('✅ Serviço de email ativado');
}

if (!process.env.RECAPTCHA_SECRET_KEY) {
  console.warn('⚠️  reCAPTCHA DESATIVADO - RECAPTCHA_SECRET_KEY não configurada');
} else{
  console.log('✅ reCAPTCHA ativado');
}

if (process.env.DEV_RECOVERY_MODE === 'true') {
  console.log('📭 [DEV MODE] usando fallback.');
}

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
  
  app.use((req, res, next) => {
  if (req.headers['content-type']?.includes('application/json') && !req.body) {
      let body = '';
      req.on('data', chunk => (body += chunk));
      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          next();
        } catch {
          req.body = {};
          next();
        }
      });
    } else {
      next();
    }
  });

  app.use((req, res, next) => {
    // console.log('📥 Incoming request:', req.method, req.url);
    // console.log('📦 Content-Type:', req.headers['content-type']);
    next();
  });

  // ✅ Usa as rotas definidas no user.routes.js
  app.use('/api', userRoutes);
  app.use('/api', empresaRoutes); 

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

  // AdminJS
  app.use(admin.options.rootPath, adminRouter);

  // Teste básico
  app.get('/', (req, res) => {
  res.send('Backend da EcoNet no ar!');
  });
  
  // Serve arquivos estaticos da pasta public
  app.use('/images', express.static(path.resolve('public/images')));

  // Garante usuário admin
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  const [adminUser, created] = await Usuario.findOrCreate({
  where: { emailUsuario: process.env.ADMIN_EMAIL || 'admin@example.com' },
    defaults: {
      senha: hashedPassword
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
  app.use('/api/mensagens', messageRoutes)
}

startServer();
