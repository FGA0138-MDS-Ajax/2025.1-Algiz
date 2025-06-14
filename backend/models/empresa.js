import { DataTypes } from 'sequelize';

const Empresa = (sequelize) => sequelize.define('JURIDICO', {
  cnpjJuridico: {
    type: DataTypes.STRING(18),
    primaryKey: true
  },
  razaoSocial: { type: DataTypes.STRING, allowNull: false },
  nomeComercial: { type: DataTypes.STRING, allowNull: false, unique: true },
  areaAtuacao: { type: DataTypes.STRING, allowNull: false },
  telefoneJuridico: { type: DataTypes.STRING(20), allowNull: false },
  estadoJuridico: { type: DataTypes.STRING(255), allowNull: false },
  enderecoJuridico: { type: DataTypes.STRING(255), allowNull: false },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'JURIDICO',
  timestamps: false
});

export default Empresa;
