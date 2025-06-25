import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import expressSession from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import bcrypt from 'bcrypt';

import models from './src/models/index.model.js'; // Importa os modelos do Sequelize
const { Usuario, Fisico, Empresa, VinculoEmpresaFisico, Mensagem } = models;

AdminJS.registerAdapter(AdminJSSequelize);

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const adminOptions = {
  resources: [
    {
      resource: Usuario,
      options: {
        properties: {
          senha: {
            type: 'password',
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false
            }
          },
          estadoFisico: {
            availableValues: estados.map(uf => ({ value: uf, label: uf }))
          }
        },
        listProperties: ['idUsuario', 'emailUsuario'],
        editProperties: ['emailUsuario', 'senha'],
        actions: {
          new: {
            before: async (request) => {
              if (request.payload?.senha) {
                request.payload.senha = await bcrypt.hash(request.payload.senha, 10);
              }
              return request;
            }
          },
          edit: {
            before: async (request) => {
              if (request.payload?.senha) {
                request.payload.senha = await bcrypt.hash(request.payload.senha, 10);
              }
              return request;
            }
          }
        }
      }
    },
    {
      resource: Fisico,
      options: {
        properties: {
          cpfFisico: {
            isRequired: true
          },
          idUsuario: {
            reference: 'USUARIO'
          },
          fotoPerfil: {
            type: 'string',
            isVisible: {
              list: false,
              edit: true,
              show: true,
              filter: false
            }
          }
        },
        listProperties: ['idUsuario', 'nomeFisico', 'sobrenomeFisico', 'telefoneFisico', 'cpfFisico', 'sexo', 'dtNascimento', 'estadoFisico'],
        showProperties: ['idUsuario', 'nomeFisico', 'sobrenomeFisico', 'telefoneFisico', 'cpfFisico', 'sexo', 'dtNascimento', 'estadoFisico'],
        editProperties: ['idUsuario', 'nomeFisico', 'sobrenomeFisico', 'telefoneFisico', 'cpfFisico', 'sexo', 'dtNascimento', 'estadoFisico']
      }
    },
    {
      resource: Empresa,
      options: {
        properties: {
          idUsuario: {
            reference: 'USUARIO'
          },
          fotoPerfil: {
            type: 'string',
            isVisible: {
              list: false,
              edit: true,
              show: true,
              filter: false
            }
          }
        },
        listProperties: ['idUsuario', 'nomeComercial', 'razaoSocial', 'cnpjJuridico', 'telefoneJuridico', 'enderecoJuridico', 'estadoJuridico', 'areaAtuacao'],
        showProperties: ['idUsuario', 'nomeComercial', 'razaoSocial', 'cnpjJuridico', 'telefoneJuridico', 'enderecoJuridico', 'estadoJuridico', 'areaAtuacao'],
        editProperties: ['idUsuario', 'nomeComercial', 'razaoSocial', 'cnpjJuridico', 'telefoneJuridico', 'enderecoJuridico', 'estadoJuridico', 'areaAtuacao']
      }
    },
    {
      resource: VinculoEmpresaFisico,
      options: {
        properties: {
          id: { isVisible: false },
          cpfFisico: {
            reference: 'FISICO',
            isTitle: true
          },
          cnpjJuridico: {
            reference: 'JURIDICO',
            isTitle: true
          },
          cargo: {
            type: 'string'
          }
        },
        listProperties: ['cpfFisico', 'cnpjJuridico', 'cargo'],
        showProperties: ['cpfFisico', 'cnpjJuridico', 'cargo'],
        editProperties: ['cpfFisico', 'cnpjJuridico', 'cargo']
      }
    },
    {
      resource: Mensagem,
      options: {
        properties: {
          idRemetente: {
            reference: 'USUARIO',
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          idDestinatario: {
            reference: 'USUARIO',
            isVisible: { list: true, show: true, edit: true, filter: true }
          },
          conteudo: {
            type: 'textarea'
          },
          enviada_em: {
            isVisible: { list: true, show: true, edit: false }
          },
          visualizada: {
            type: 'boolean'
          }
        },
        listProperties: ['idMensagem', 'idRemetente', 'idDestinatario', 'visualizada', 'enviada_em'],
        showProperties: ['idMensagem', 'idRemetente', 'idDestinatario', 'conteudo', 'visualizada', 'enviada_em'],
        editProperties: ['idRemetente', 'idDestinatario', 'conteudo', 'visualizada']
      }
    }
  ],
  branding: {
    companyName: 'EcoNet Admin',
    logo: false
  }
};

const admin = new AdminJS(adminOptions);

// Initialize MySQL session store
const MySQLStore = MySQLStoreFactory(expressSession);
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'yourpassword',
  database: process.env.DB_NAME || 'EcoNet_DB',
});

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
  }
};

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate: async (email, password) => {
      const user = await Usuario.findOne({ where: { emailUsuario: email } });
      if (user && await bcrypt.compare(password, user.senha)) {
        return {
          email: user.emailUsuario,
          name: 'Admin'
        };
      }
      return null;
    },
    cookiePassword: process.env.ADMINJS_COOKIE_SECRET || 'secret'
  },
  null,
  sessionOptions
);

export { admin, adminRouter };
