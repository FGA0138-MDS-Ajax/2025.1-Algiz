import { DataTypes } from 'sequelize';

const Usuario = (sequelize) => sequelize.define('Usuario', {
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
  fotoPerfil: { type: DataTypes.STRING, allowNull: true },
  bannerPerfil: { type: DataTypes.STRING, allowNull: true },
  reset_code: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'reset_code'
  },
  reset_code_expires_at: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'reset_code_expires_at'
  }
}, {
  tableName: 'USUARIO',
  freezeTableName: true,
  timestamps: false
});

export default Usuario;
