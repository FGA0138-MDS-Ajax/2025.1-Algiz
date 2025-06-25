import { Mensagem, Usuario } from '../../../models/index.js';
import { Op } from 'sequelize';

async function createMessage(dadosMensagem) {
    const { idRemetente, idDestinatario, conteudo } = dadosMensagem;

    if (!conteudo || conteudo.trim() === '') {
        throw { name: 'ValidationError', message: 'O conteúdo da mensagem não pode estar vazio.' };
    }
    if (!idDestinatario) {
        throw { name: 'ValidationError', message: 'É necessário especificar um destinatário.' };
    }
    const destinatario = await Usuario.findByPk(idDestinatario);
    if (!destinatario) {
        throw { name: 'NotFoundError', message: 'O usuário destinatário não foi encontrado.' };
    }
    const novaMensagem = await Mensagem.create({
        idRemetente,
        idDestinatario,
        conteudo
    });
    return novaMensagem;

}
async function findMessages(idUsuario) {
    const messages = await Mensagem.findAll({
        where: {
            [Op.or]: [
                { idRemetente: idUsuario },
                { idDestinatario: idUsuario }
            ]
        },
        include: [
        {model: Usuario, as: 'remetente', attributes: ['idUsuario', 'nomeCompleto', 'foto_perfil_url']},
        { model: Usuario, as: 'destinatario', attributes: ['idUsuario', 'nomeCompleto', 'foto_perfil_url']}

        ],
        order: [['enviada_em', 'ASC']]
    });

    return mensagens;
}
export default{
    createMessage,
    findMessages
};


        