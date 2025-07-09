import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Documento = sequelize.define('Documento', {
    idDocumento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // ID público que o Cloudinary usa para identificar o ficheiro
    public_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // URL segura para aceder ao ficheiro
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomeOriginal: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    tableName: 'DOCUMENTOS',
    timestamps: true, // createdAt e updatedAt podem ser úteis aqui
  });

  return Documento;
};