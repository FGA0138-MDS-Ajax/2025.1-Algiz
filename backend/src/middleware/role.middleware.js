import { verificarPermissao } from '../api/utils/permissaoUsuario.js';

export function cargoPermitido(cargosPermitidos = []) {
  return async (req, res, next) => {
    const cpf = req.usuario?.cpf; // ajuste conforme sua autenticação
    const cnpj = req.params?.cnpj || req.body?.cnpjJuridico;

    if (!cpf || !cnpj) {
      return res.status(400).json({ mensagem: 'Informações insuficientes para verificação de cargo.' });
    }

    const permitido = await verificarPermissao(cpf, cnpj, cargosPermitidos);

    if (!permitido) {
      return res.status(403).json({ mensagem: 'Acesso negado: cargo insuficiente.' });
    }

    next();
  };
}

export default{
    cargoPermitido
}