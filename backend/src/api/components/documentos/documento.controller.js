import documentService from './document.service.js';

export async function uploadDocumento(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: 'Nenhum ficheiro foi enviado.' });
    }

    const { idParceria } = req.body;
    const idUsuario = req.user.id;

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

// NOVA FUNÇÃO DE CONTROLLER PARA OBTER DOCUMENTO
export async function getDocumento(req, res) {
  try {
    const { id } = req.params;
    const idUsuario = req.user.id;

    const documento = await documentService.findDocumentoById(id, idUsuario);
    if (!documento) {
      return res.status(404).json({ erro: 'Documento não encontrado ou acesso não permitido.' });
    }

    // Retornamos os metadados, incluindo a URL segura para download
    res.status(200).json(documento);
  } catch (error) {
    console.error("Erro no controller ao obter documento:", error);
    res.status(500).json({ erro: error.message || 'Ocorreu um erro interno.' });
  }
}

// NOVA FUNÇÃO DE CONTROLLER PARA EXCLUIR DOCUMENTO
export async function deleteDocumento(req, res) {
  try {
    const { id } = req.params;
    const idUsuario = req.user.id;

    await documentService.deleteDocumentoById(id, idUsuario);

    // Retorna uma resposta de sucesso sem conteúdo
    res.status(204).send();
  } catch (error) {
    console.error("Erro no controller ao excluir documento:", error);
    // Devolve um erro específico se a permissão for negada ou o ficheiro não for encontrado
    if (error.message.includes('não encontrado') || error.message.includes('não autorizado')) {
      return res.status(404).json({ erro: error.message });
    }
    res.status(500).json({ erro: 'Ocorreu um erro interno.' });
  }
}
