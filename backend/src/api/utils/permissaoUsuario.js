import VinculoEmpresaFisico from '../../models/vinculoEmpresaFisico.model.js';
import { CARGOS } from './cargos.js';

export async function verificarPermissao(cpf, cnpj, cargosPermitidos = []) {
  const vinculo = await VinculoEmpresaFisico.findOne({
    where: {
      cpfFisico: cpf,
      cnpjJuridico: cnpj
    }
  });

  if (!vinculo) return false;

  return cargosPermitidos.includes(vinculo.cargo);
}

export default{
    verificarPermissao
}