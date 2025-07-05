// backend/models/index.js
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

import UsuarioDef from './usuario.model.js';
import FisicoDef from './fisico.model.js';
import EmpresaDef from './empresa.model.js';
import VinculoEmpresaFisicoDef from './vinculoEmpresaFisico.model.js';
import setupAssociations from './associacoes.model.js';
import MensagemDef from './mensagem.model.js';
import PostDef from './post.model.js';

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
  Mensagem: MensagemDef(sequelize, DataTypes),
  Post: PostDef(sequelize, DataTypes), 
};

// Configura as associações entre os modelos
setupAssociations(models);

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
