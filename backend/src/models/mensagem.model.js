// src/models/mensagem.js
export default (sequelize, DataTypes) => {
  const Mensagem = sequelize.define('Mensagem', {
    idMensagem: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idRemetente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idDestinatario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    enviada_em: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    visualizada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'MENSAGEM',
    timestamps: false
  });

  return Mensagem;
};