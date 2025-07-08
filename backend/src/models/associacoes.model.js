export default function setupAssociations(models) {
  const { Usuario, Fisico, Empresa, VinculoEmpresaFisico, Mensagem, Post, Tag } = models;

  // Associações do usuário
  Usuario.hasOne(Fisico, {
    foreignKey: 'idUsuario',
    as: 'dadosFisicos',
    onDelete: 'CASCADE'
  });

  Usuario.hasOne(Empresa, {
    foreignKey: 'idUsuario',
    as: 'dadosJuridicos',
    onDelete: 'CASCADE'
  });

  Fisico.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
  });

  Empresa.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'usuario'
  });

  // ✅ ALTERADO: Associações Empresa-Fisico usando idEmpresa
  Fisico.belongsToMany(Empresa, {
    through: VinculoEmpresaFisico,
    foreignKey: 'cpfFisico',
    otherKey: 'idEmpresa',                          // ✅ ALTERADO
    sourceKey: 'cpfFisico',
    targetKey: 'idEmpresa',                         // ✅ ALTERADO
    as: 'empresas'
  });

  Empresa.belongsToMany(Fisico, {
    through: VinculoEmpresaFisico,
    foreignKey: 'idEmpresa',                        // ✅ ALTERADO
    otherKey: 'cpfFisico',
    sourceKey: 'idEmpresa',                         // ✅ ALTERADO
    targetKey: 'cpfFisico',
    as: 'funcionarios'
  });

  // ✅ ALTERADO: Associações Post-Empresa usando idEmpresa
  Empresa.hasMany(Post, {
    foreignKey: 'idEmpresa',                        // ✅ ALTERADO
    as: 'postagens'
  });

  Post.belongsTo(Empresa, {
    foreignKey: 'idEmpresa',                        // ✅ ALTERADO
    as: 'empresa'
  });

  // Associações Post-Tag
  Post.belongsToMany(Tag, {
    through: 'POSTAGEM_TAG',
    foreignKey: 'idPost',
    otherKey: 'idTag',
    as: 'tags'
  });

  Tag.belongsToMany(Post, {
    through: 'POSTAGEM_TAG',
    foreignKey: 'idTag',
    otherKey: 'idPost',
    as: 'posts'
  });

  // Associações Post-Usuario (curtidas e salvos)
  Post.belongsToMany(Usuario, {
    through: 'CURTE',
    foreignKey: 'idPost',
    otherKey: 'idUsuario',
    as: 'curtidas'
  });

  Post.belongsToMany(Usuario, {
    through: 'SALVA',
    foreignKey: 'idPost',
    otherKey: 'idUsuario',
    as: 'salvos'
  });

  // Associações de mensagem
  Mensagem.belongsTo(Usuario, {
    foreignKey: 'idRemetente',
    as: 'remetente'
  });

  Mensagem.belongsTo(Usuario, {
    foreignKey: 'idDestinatario',
    as: 'destinatario'
  });

  Usuario.hasMany(Mensagem, {
    foreignKey: 'idRemetente',
    as: 'mensagensEnviadas'
  });

  Usuario.hasMany(Mensagem, {
    foreignKey: 'idDestinatario',
    as: 'mensagensRecebidas'
  });
}
