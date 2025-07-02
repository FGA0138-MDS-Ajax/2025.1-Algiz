import VinculoEmpresaFisico from "../../../models/vinculoEmpresaFisico.model.js";
import { CARGOS } from '../../utils/cargos.js'

export async function solicitarVinculo(req, res) {
  const { cnpjJuridico } = req.body;
  const cpf = req.user?.cpf;

  try {
    const jaExiste = await VinculoEmpresaFisico.findOne({
      where: { cpfFisico: cpf, cnpjJuridico }
    });

    if (jaExiste) {
      return res.status(400).json({ erro: 'Você já possui vínculo com essa empresa.' });
    }

    await VinculoEmpresaFisico.create({
      cpfFisico: cpf,
      cnpjJuridico,
      cargo: CARGOS.CONTRATADO,
      status: 'pendente'
    });

    res.status(201).json({ mensagem: 'Solicitação enviada para aprovação.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao solicitar vínculo.' });
  }
}

export async function aprovarSolicitacaoVinculo(req, res) {
  const { idSolicitacao } = req.params;
  const cpfDono = req.user?.cpf;   

  try {
    const solicitacao = await VinculoEmpresaFisico.findByPk(idSolicitacao);

    if (!solicitacao || solicitacao.status !== 'pendente') {
      return res.status(404).json({ erro: 'Solicitação inválida ou já tratada.' });
    }

    // Verificar se quem aprovando é Dono da empresa
    const ehDono = await VinculoEmpresaFisico.findOne({
      where: {
        cpfFisico: cpfDono,
        cnpjJuridico: solicitacao.cnpjJuridico,
        cargo: CARGOS.DONO,
        status: 'aprovado'
      }
    });

    if (!ehDono) {
      return res.status(403).json({ erro: 'Apenas o Dono da empresa pode aprovar vínculos.' });
    }

    solicitacao.status = 'aprovado';
    await solicitacao.save();

    res.json({ mensagem: 'Solicitação aprovada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao aprovar solicitação.' });
  }
}


export default{
    solicitarVinculo,
    aprovarSolicitacaoVinculo
}