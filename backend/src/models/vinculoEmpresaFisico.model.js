
import { DataTypes } from 'sequelize';

const VinculoEmpresaFisico = (sequelize) => sequelize.define('VinculoEmpresaFisico', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cpfFisico: {
    type: DataTypes.STRING(14)
  },
  cnpjJuridico: {
    type: DataTypes.STRING(18)
  },
  cargo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estado: {
  type: DataTypes.STRING,
  defaultValue: 'pendente'
  }
}, {
  tableName: 'VINCULO_JURIDICO_FISICO',
  timestamps: false
});

export default VinculoEmpresaFisico;
