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

// --- LOG DE VERIFICAÇÃO ADICIONADO ---
console.log('--- LENDO ARQUIVO server.js (VERSÃO COM ROTA POST) ---');
// ------------------------------------

const { Usuario } = models;

dotenv.config();

const app = express();
const PORT = 3001;

// Função assíncrona para garantir a ordem correta de inicialização
async function startServer() {
  try {
    // 1. Conecta ao banco de dados
    await sequelize.authenticate();
    console.log('✅ Conexão com o MySQL estabelecida com sucesso.');

    // 2. Sincroniza os modelos e cria as tabelas (se não existirem)
    await sequelize.sync();
    console.log('✅ Todas as tabelas foram criadas com sucesso.');

    // 3. Configura o armazenamento de sessão usando o sequelize
    const SequelizeStore = connectSessionSequelize(session.Store);
    const sessionStore = new SequelizeStore({
      db: sequelize, // Usa a instância única e já conectada do sequelize
    });

    // 4. Configura os middlewares do Express
    app.use(cors());
    app.use(express.json());
    app.use(
      session({
        secret: process.env.SESSION_SECRET || 'uma-chave-secreta-muito-forte',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Em produção, usar true com HTTPS
        },
      })
    );
    await sessionStore.sync(); // Garante que a tabela de sessões seja criada

    // 5. Configura as rotas
    app.use(admin.options.rootPath, adminRouter);
    app.get('/', (req, res) => {
      res.send('Backend da EcoNet no ar!');
    });

    // NOVA ROTA PARA CRIAR USUÁRIOS
    app.post('/api/usuarios', async (req, res) => {
      console.log('LOG: Rota POST /api/usuarios foi acessada.');
      console.log('LOG: Corpo da requisição:', req.body);

      try {
        const { emailUsuario, senha } = req.body;
        if (!emailUsuario || !senha) {
          return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const novoUsuario = await Usuario.create({
          emailUsuario,
          senha: hashedPassword
        });

        const { senha: _, ...usuarioSemSenha } = novoUsuario.get({ plain: true });
        res.status(201).json(usuarioSemSenha);

      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Não foi possível criar o usuário.' });
      }
    });


    // 6. Garante que o usuário administrador existe
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
    const [adminUser, created] = await Usuario.findOrCreate({
        where: { emailUsuario: process.env.ADMIN_EMAIL || 'admin@example.com' },
        defaults: {
            senha: hashedPassword,
            telefoneUsuario: '0000000000',
            estado: 'DF'
        }
    });

    if (created) {
        console.log('✅ Usuário administrador criado.');
    } else {
        console.log('✅ Usuário administrador já existe.');
    }

    // 7. Inicia o servidor web APENAS DEPOIS de tudo pronto
    app.listen(PORT, () => {
      // --- LOG DE VERIFICAÇÃO ADICIONADO ---
      console.log(`🚀 VERIFICADO: Servidor rodando na porta ${PORT}`);
      console.log(`🔑 Painel AdminJS em http://localhost:${PORT}${admin.options.rootPath}`);
    });

  } catch (err) {
    console.error('❌ Não foi possível iniciar o servidor:', err);
    process.exit(1);
  }
}

// Chama a função para iniciar o servidor
startServer();
