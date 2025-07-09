import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Empresa = sequelize.define('Empresa', {
    idEmpresa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idEmpresa'
    },
    cnpjJuridico: {
      type: DataTypes.STRING(18),
      allowNull: false,
      unique: true,
      field: 'cnpjJuridico'
    },
    razaoSocial: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'razaoSocial'
    },
    nomeComercial: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: 'nomeComercial'
    },
    telefoneJuridico: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'telefoneJuridico'
    },
    estadoJuridico: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'estadoJuridico'
    },
    enderecoJuridico: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'enderecoJuridico'
    },
    areaAtuacao: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'areaAtuacao'
    },
    descricaoEmpresa: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'descricaoEmpresa'
    },
    fotoEmpresa: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'fotoEmpresa'
    },
    bannerEmpresa: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'bannerEmpresa'
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idUsuario'
    }
  }, {
    tableName: 'JURIDICO',
    timestamps: false,
    freezeTableName: true
  });

  return Empresa;
};