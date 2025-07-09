import * as comentarioService from './comentario.service.js';

/**
 * Adicionar um comentário a um post
 */
export async function addComentario(req, res) {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;
    const { texto } = req.body;
    
    if (!texto || texto.trim() === '') {
      return res.status(400).json({ erro: 'O texto do comentário não pode estar vazio' });
    }
    
    const comentario = await comentarioService.addComentario(postId, userId, texto);
    return res.status(201).json(comentario);
  } catch (error) {
    console.error('Erro ao adicionar comentário:', error);
    
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ erro: error.message });
    }
    
    return res.status(500).json({ erro: 'Ocorreu um erro ao adicionar o comentário' });
  }
}

/**
 * Listar comentários de um post
 */
export async function getComentarios(req, res) {
  try {
    const { id: postId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const result = await comentarioService.getComentarios(
      postId,
      parseInt(page, 10),
      parseInt(limit, 10)
    );
    
    return res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao listar comentários:', error);
    
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ erro: error.message });
    }
    
    return res.status(500).json({ erro: 'Ocorreu um erro ao listar os comentários' });
  }
}

/**
 * Excluir um comentário
 */
export async function deleteComentario(req, res) {
  try {
    const { id: comentarioId } = req.params;
    const userId = req.user.id;
    
    const result = await comentarioService.deleteComentario(comentarioId, userId);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao excluir comentário:', error);
    
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ erro: error.message });
    }
    
    if (error.name === 'AuthorizationError') {
      return res.status(403).json({ erro: error.message });
    }
    
    return res.status(500).json({ erro: 'Ocorreu um erro ao excluir o comentário' });
  }
}