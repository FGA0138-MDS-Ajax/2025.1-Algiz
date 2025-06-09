import { DataTypes } from 'sequelize';
import sequelize from './index.js';

const VinculoEmpresaFisico = sequelize.define('VinculoEmpresaFisico', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cpfFisico: {
    type: DataTypes.STRING(14),
    references: {
      model: 'FISICO',
      key: 'cpfFisico'
    }
  },
  cnpjJuridico: {
    type: DataTypes.STRING(18),
    references: {
      model: 'JURIDICO',
      key: 'cnpjJuridico'
    }
  },
  // Campos para especificar a relacao: Cargo da pessoaFisica, Colocar Data de Admissão?
  cargo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'VINCULO_EMPRESA_FISICO',
  timestamps: false
});

export default VinculoEmpresaFisico;