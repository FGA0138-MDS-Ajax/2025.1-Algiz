import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import Usuario from './usuario.js';
import Empresa from './empresa.js';
import VinculoEmpresaFisico from './vinculoEmpresaFisico.js';

const Fisico = sequelize.define('Fisico', {
  cpfFisico: {
    type: DataTypes.STRING(14),
    primaryKey: true
  },
  nomeFisico: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  sobrenomeFisico: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  sexo: {
    type: DataTypes.STRING(17),
    allowNull: false
  },
  dtNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'idUsuario'
    }
  }
}, {
  tableName: 'FISICO',
  freezeTableName: true,
  timestamps: false
});

// Definir associação Fisico -> Usuario (1:1)
Fisico.belongsTo(Usuario, { foreignKey: 'idUsuario' , as: 'usuario'});

// Relação ( 1 : Many ) -- Funcionario para Empresas
Fisico.belongsToMany(Empresa, {
  through: VinculoEmpresaFisico,
  foreignKey: 'cpfFisico',
  otherKey: 'cnpjJuridico',
  as: 'empresas'
});

export default Fisico;