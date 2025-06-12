import { DataTypes } from 'sequelize';

const Fisico = (sequelize) => sequelize.define('Fisico', {
  cpfFisico: {
    type: DataTypes.STRING(14),
    primaryKey: true
  },
  nomeFisico: { type: DataTypes.STRING(255), allowNull: false },
  sobrenomeFisico: { type: DataTypes.STRING(255), allowNull: false },
  sexo: { type: DataTypes.STRING(17), allowNull: false },
  dtNascimento: { type: DataTypes.DATEONLY, allowNull: false },
  telefonePessoa: { type: DataTypes.STRING(20), allowNull: false, field: 'Telefone' },
  estadoPessoa: { type: DataTypes.STRING(255), allowNull: false, field: 'Estado' },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'FISICO',
  freezeTableName: true,
  timestamps: false
});

export default Fisico;
