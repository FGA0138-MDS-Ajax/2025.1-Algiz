import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Tag = sequelize.define('Tag', {
    idTag: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idTag'
    },
    nome: {                                  // ✅ CORRIGIDO: era 'nomeTag'
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      field: 'nome'
    },
    cor: {                                   // ✅ CORRIGIDO: era 'corFundo'
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: '#3B82F6',
      field: 'cor'
    }
  }, {
    tableName: 'TAGS',
    timestamps: false,
    freezeTableName: true
  });

  // Definir associações
  Tag.associate = (models) => {
    // Tag tem muitos posts
    Tag.belongsToMany(models.Post, {
      through: 'POSTAGEM_TAG',
      foreignKey: 'idTag',
      otherKey: 'idPost',
      as: 'posts'
    });
  };

  return Tag;
};