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
  fotoPerfil: { type: DataTypes.STRING, allowNull: true },
  bannerPerfil: { type: DataTypes.STRING, allowNull: true },
}, {
  tableName: 'USUARIO',
  freezeTableName: true,
  timestamps: false
});

export default Usuario;
