import documentService from './document.service.js';

export async function uploadDocumento(req, res) {
  try {
    // O ficheiro está disponível em req.file graças ao Multer
    if (!req.file) {
      return res.status(400).json({ erro: 'Nenhum ficheiro foi enviado.' });
    }

    const { idParceria } = req.body; // Pega o ID da parceria do corpo da requisição
    const idUsuario = req.user.id; // Pega o ID do utilizador do token

    const documentoSalvo = await documentService.createDocumento(req.file, idParceria, idUsuario);

    res.status(201).json({
      mensagem: 'Documento enviado com sucesso!',
      documento: documentoSalvo,
    });
  } catch (error) {
    console.error("Erro no controller ao fazer upload:", error);
    res.status(500).json({ erro: error.message || 'Ocorreu um erro interno.' });
  }
}
