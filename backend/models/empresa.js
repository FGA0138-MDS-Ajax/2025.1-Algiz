import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import Usuario from './usuario.js';

const Empresa = sequelize.define('JURIDICO', {
  cnpjJuridico: {
    type: DataTypes.STRING(18),
    primaryKey: true
  },
  razaoSocial: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nomeComercial: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  areaAtuacao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'idUsuario'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'JURIDICO',
  timestamps: false
});

Empresa.belongsTo(Usuario, { foreignKey: 'idUsuario' });

export default Empresa;
