// backend/models/usuario.js
import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import Empresa from './empresa.js';
import Fisico from './fisico.js';

const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idUsuario'
  },
  emailUsuario: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    field: 'emailUsuario'
  },
  senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'senha'
  },
  telefoneUsuario: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'telefoneUsuario'
  },
  estado: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'estado'
  },
  fotoPerfil: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bannerPerfil: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  tableName: 'USUARIO',
  timestamps: false, 
  freezeTableName: true 
});

// Associação Usuario para FISICO OU EMPRESA

Usuario.hasOne(Fisico, {
  foreignKey: 'idUsuario',
  as: 'dadosFisicos', // Nome para associar
  onDelete: 'CASCADE'
});

Usuario.hasOne(Empresa, {
  foreignKey: 'idUsuario',
  as: 'dadosJuridicos', // Nome para associar
  onDelete: 'CASCADE'
});

export default Usuario;