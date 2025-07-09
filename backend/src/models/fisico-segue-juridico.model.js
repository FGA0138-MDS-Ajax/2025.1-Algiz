import { DataTypes } from 'sequelize';

export default (sequelize, DataTypes) => {
  const FisicoSegueJuridico = sequelize.define('FisicoSegueJuridico', {
    cpfFisico: {
      type: DataTypes.STRING(14),
      allowNull: false,
      primaryKey: true,
      field: 'cpfFisico'
    },
    idEmpresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'idEmpresa'
    },
    dtInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'dtInicio'
    }
  }, {
    tableName: 'FISICO_SEGUE_JURIDICO',
    timestamps: false,
    freezeTableName: true
  });

  return FisicoSegueJuridico;
};