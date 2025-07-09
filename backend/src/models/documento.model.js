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
    },
    // Chave estrangeira para associar o documento a uma parceria/contrato
    idParceria: { // Ou idContrato, ajuste conforme o seu modelo de negócio
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Parcerias', // Nome da tabela de parcerias/contratos
        key: 'id'
      }
    }
  }, {
    tableName: 'DOCUMENTOS',
    timestamps: true, // createdAt e updatedAt podem ser úteis aqui
  });

  return Documento;
};