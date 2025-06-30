import models from '../../../models/index.model.js';
const { Mensagem, Usuario } = models;
import { Op } from 'sequelize';

async function createMessage(dadosMensagem) {
    const { idRemetente, idDestinatario, conteudo } = dadosMensagem;

    if (!conteudo || conteudo.trim() === '') {
        const error = new Error('O conteúdo da mensagem não pode estar vazio.');
        error.name = 'ValidationError';
        throw error;
    }
    if (!idDestinatario) {
        const error = new Error('É necessário especificar um destinatário.');
        error.name = 'ValidationError';
        throw error;
    }
    const destinatario = await Usuario.findByPk(idDestinatario);
    if (!destinatario) {
        const error = new Error('O usuário destinatário não foi encontrado.');
        error.name = 'NotFoundError';
        throw error;
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
            { model: Usuario, as: 'remetente', attributes: ['idUsuario', 'nomeCompleto', 'foto_perfil_url'] },
            { model: Usuario, as: 'destinatario', attributes: ['idUsuario', 'nomeCompleto', 'foto_perfil_url'] }
        ],
        order: [['enviada_em', 'ASC']]
    });

    return messages;
}

export default {
    createMessage,
    findMessages
};
