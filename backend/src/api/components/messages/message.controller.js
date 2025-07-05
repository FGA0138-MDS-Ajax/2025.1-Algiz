import messageService from './message.service.js';

async function sendMessage(req, res) {
    try {
        const idRemetente = req.user.id;
        const { idDestinatario, conteudo } = req.body;
        const novaMensagem = await messageService.createMessage(idRemetente, idDestinatario, conteudo);

        res.status(201).json({
            mensagem: "Mensagem enviada com sucesso!",
            dados: novaMensagem
        });
    } catch (error) {
        if (error.name === 'ValidationError' || error.name === 'NotFoundError') {
            return res.status(400).json({ erro: error.message });
        }
        console.error("Erro no controller ao enviar mensagem:", error);
        return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
    }

}
async function getMessagesForUser(req, res) {
    try {
        const idUsuarioLogado = req.user.id;
        const idUsuarioDaRota = parceInt(req.params.idUsuario, 10);

        if (idUsuarioLogado !== idUsuarioDaRota) {
            return res.status(403).json({ erro: "Acesso não autorizado. Você só pode visualizar suas próprias mensagens." });
        }
        const mensagens = await messageService.findMessages(idUsuarioLogado);
        res.status(200).json(mensagens);

    } catch (error) {
        console.error("Erro no controller ao listar mensagens:", error);
        return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
    }

}
export{
    sendMessage,
    getMessagesForUser
};
