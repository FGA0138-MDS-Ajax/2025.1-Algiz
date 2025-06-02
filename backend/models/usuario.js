// backend/models/usuario.js
import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const Usuario = sequelize.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'idUsuario' // Explicitly map to column name
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
  }
}, {
  tableName: 'USUARIO',
  timestamps: false, // Since your table doesn't have createdAt/updatedAt
  freezeTableName: true // Prevent Sequelize from pluralizing the table name
});

export default Usuario;