import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      field: 'idPost'
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'titulo'
    },
    idEmpresa: {                                    // ✅ ALTERADO: usar idEmpresa
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'idEmpresa'
    },
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'conteudo'
    },
    imagemURL: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: 'imagemURL'
    },
    tipo: {
      type: DataTypes.ENUM('doacao', 'oferta', 'demanda'),
      allowNull: false,
      defaultValue: 'oferta',
      field: 'tipo'
    },
    criado_em: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'criado_em'
    }
  }, {
    tableName: 'POSTAGENS',
    timestamps: false,
    freezeTableName: true
  });

  return Post;
};