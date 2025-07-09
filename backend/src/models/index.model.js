// backend/models/index.js
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

import UsuarioDef from './usuario.model.js';
import FisicoDef from './fisico.model.js';
import EmpresaDef from './empresa.model.js';
import VinculoEmpresaFisicoDef from './vinculoEmpresaFisico.model.js';
import FisicoSegueJuridicoDef from './fisico-segue-juridico.model.js'; // ADICIONE ESTA IMPORTAÇÃO
import setupAssociations from './associacoes.model.js';
import MensagemDef from './mensagem.model.js';
import PostDef from './post.model.js';
import TagDef from './tag.model.js';
import ComentarioDef from './comentario.model.js';

dotenv.config();

// Apenas cria e configura a instância do Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME || 'econetdb',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD, // A senha virá do seu arquivo .env
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    define: {
      freezeTableName: true,
      timestamps: false
    },
    logging: false // Mude para console.log para ver as queries SQL
  }
);

// Define todos os modelos
const models = {
  Usuario: UsuarioDef(sequelize, DataTypes),
  Fisico: FisicoDef(sequelize, DataTypes),
  Empresa: EmpresaDef(sequelize, DataTypes),
  VinculoEmpresaFisico: VinculoEmpresaFisicoDef(sequelize, DataTypes),
  FisicoSegueJuridico: FisicoSegueJuridicoDef(sequelize, DataTypes), // ADICIONE ESTA LINHA
  Mensagem: MensagemDef(sequelize, DataTypes),
  Post: PostDef(sequelize, DataTypes),
  Tag: TagDef(sequelize, DataTypes),
  Comentario: ComentarioDef(sequelize, DataTypes)
};

// Configura as associações entre os modelos
setupAssociations(models);

// Associações entre Usuário, Físico e Empresa
models.Fisico.belongsTo(models.Usuario, { foreignKey: 'idUsuario' });
models.Usuario.hasOne(models.Fisico, { foreignKey: 'idUsuario' });

// Associação para seguidores
models.FisicoSegueJuridico.belongsTo(models.Empresa, { foreignKey: 'idEmpresa' });
models.Empresa.hasMany(models.FisicoSegueJuridico, { foreignKey: 'idEmpresa' });

models.FisicoSegueJuridico.belongsTo(models.Fisico, { foreignKey: 'cpfFisico' });
models.Fisico.hasMany(models.FisicoSegueJuridico, { foreignKey: 'cpfFisico' });

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export { sequelize };
export default models;
