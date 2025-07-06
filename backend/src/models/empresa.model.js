import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Juridico = sequelize.define('Juridico', {
    cnpjJuridico: {
      type: DataTypes.STRING(14),
      primaryKey: true,
      allowNull: false
    },
    razaoSocial: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nomeComercial: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    telefoneJuridico: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    estadoJuridico: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    enderecoJuridico: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    areaAtuacao: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'idUsuario'
      }
    }
  }, {
    tableName: 'JURIDICO',
    timestamps: false
  });

  Juridico.associate = (models) => {
    Juridico.belongsTo(models.Usuario, { foreignKey: 'idUsuario', as: 'usuario' });
  };

  return Juridico;
};