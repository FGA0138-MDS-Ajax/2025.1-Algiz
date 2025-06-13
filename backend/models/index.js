// backend/models/index.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import UsuarioDef from './usuario.js';
import FisicoDef from './fisico.js';
import EmpresaDef from './empresa.js';
import VinculoEmpresaFisicoDef from './vinculoEmpresaFisico.js';
import setupAssociations from './associacoes.js';

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
  Usuario: UsuarioDef(sequelize),
  Fisico: FisicoDef(sequelize),
  Empresa: EmpresaDef(sequelize),
  VinculoEmpresaFisico: VinculoEmpresaFisicoDef(sequelize),
};

// Configura as associações entre os modelos
setupAssociations(models);

// Exporta a instância e os modelos para serem usados em outros arquivos
export { sequelize };
export default models;
