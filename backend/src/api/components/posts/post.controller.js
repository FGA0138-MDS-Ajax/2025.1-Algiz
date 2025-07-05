import * as postService from './post.service.js';

async function create(req, res) {
  try {
    const { titulo, conteudo } = req.body;
    const empresaId = req.user?.empresaId;
    
    const newPost = await postService.createPost({
      titulo,
      conteudo,
      empresaId,
    });

    return res.status(201).json(newPost);
  } catch (error) {
    // Trata os erros de validação (400) ou de não encontrado (404) vindos do serviço
    if (error.name === 'ValidationError' || error.name === 'NotFoundError') {
      return res.status(400).json({ erro: error.message });
    }
    // Trata erros de autorização
    if (error.name === 'AuthorizationError') {
        return res.status(403).json({ erro: error.message });
    }

    console.error("Erro no controller ao criar postagem:", error);
    return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
  }
}

export {
  create,
};