import { DataTypes } from 'sequelize';
import sequelize from './index.js';
import Usuario from './usuario.js';

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

// Define association (1:1)
Usuario.hasOne(Fisico, { foreignKey: 'idUsuario', onDelete: 'CASCADE' });
Fisico.belongsTo(Usuario, { foreignKey: 'idUsuario' });

export default Fisico;