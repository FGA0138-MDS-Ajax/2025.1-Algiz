import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false, // O título da postagem é obrigatório
    },
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: false, // O conteúdo da postagem é obrigatório
    },
  });

  return Post;
};