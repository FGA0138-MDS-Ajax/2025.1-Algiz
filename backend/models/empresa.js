import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import Usuario from './usuario.js';
import Fisico from './fisico.js';
import VinculoEmpresaFisico from './vinculoEmpresaFisico.js';

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

// Definir associação Empresa -> Usuario (1:1)
Empresa.belongsTo(Usuario, { foreignKey: 'idUsuario', as: 'usuario' });

// Relação 1 : Many -- Empresa para Funcionarios
Empresa.belongsToMany(Fisico, {
  through: VinculoEmpresaFisico,
  foreignKey: 'cnpjJuridico',
  otherKey: 'cpfFisico',
  as: 'funcionarios'
});

export default Empresa;
