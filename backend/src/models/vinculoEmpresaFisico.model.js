import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const VinculoEmpresaFisico = sequelize.define('VinculoEmpresaFisico', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    cpfFisico: {
      type: DataTypes.STRING(14),
      allowNull: false,
      field: 'cpfFisico'
    },
    idEmpresa: {                                    // ✅ ALTERADO: usar idEmpresa
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idEmpresa'
    },
    cargo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'cargo'
    },
    dataVinculo: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'dataVinculo'
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'ativo'
    }
  }, {
    tableName: 'VINCULO_JURIDICO_FISICO',
    timestamps: false,
    freezeTableName: true
  });

  return VinculoEmpresaFisico;
};
