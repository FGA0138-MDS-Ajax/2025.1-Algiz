export default function setupAssociations(models) {
  const { Usuario, Fisico, Empresa, VinculoEmpresaFisico } = models;

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

  Fisico.belongsToMany(Empresa, {
    through: VinculoEmpresaFisico,
    foreignKey: 'cpfFisico',
    otherKey: 'cnpjJuridico',
    as: 'empresas'
  });

  Empresa.belongsToMany(Fisico, {
    through: VinculoEmpresaFisico,
    foreignKey: 'cnpjJuridico',
    otherKey: 'cpfFisico',
    as: 'funcionarios'
  });
}
