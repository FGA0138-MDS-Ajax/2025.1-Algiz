import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Comentario = sequelize.define('Comentario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      field: 'idComentario'
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'USUARIO',
        key: 'idUsuario'
      },
      field: 'idUsuario'
    },
    idPost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'POSTAGENS',
        key: 'idPost'
      },
      field: 'idPost'
    },
    texto: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'texto'
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      field: 'criado_em'
    }
  }, {
    tableName: 'COMENTARIO',
    timestamps: false
  });

  Comentario.associate = (models) => {
    Comentario.belongsTo(models.Usuario, {
      foreignKey: 'idUsuario',
      as: 'usuario'
    });
    
    Comentario.belongsTo(models.Post, {
      foreignKey: 'idPost',
      as: 'post'
    });
  };

  return Comentario;
};