import models from '../../../models/index.model.js';

const { Comentario, Usuario, Post } = models;

/**
 * Classe para erro de recurso não encontrado
 */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

/**
 * Adiciona um comentário a um post
 */
export async function addComentario(postId, userId, texto) {
  // Verificar se o post existe
  const post = await Post.findByPk(postId);
  if (!post) {
    throw new NotFoundError('Post não encontrado');
  }

  // Verificar se o usuário existe
  const usuario = await Usuario.findByPk(userId);
  if (!usuario) {
    throw new NotFoundError('Usuário não encontrado');
  }

  // Validar o texto do comentário
  if (!texto || texto.trim() === '') {
    throw new Error('O texto do comentário não pode estar vazio');
  }

  // Criar o comentário
  const comentario = await Comentario.create({
    idPost: postId,
    idUsuario: userId,
    texto: texto.trim(),
    criado_em: new Date()
  });

  // Buscar o comentário com dados do usuário
  return await Comentario.findByPk(comentario.id, {
    include: [
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['idUsuario', 'nome', 'fotoPerfil']
      }
    ]
  });
}

/**
 * Obtém os comentários de um post
 */
export async function getComentarios(postId, page = 1, limit = 10) {
  // Verificar se o post existe
  const post = await Post.findByPk(postId);
  if (!post) {
    throw new NotFoundError('Post não encontrado');
  }

  const offset = (page - 1) * limit;

  // Buscar comentários com informações do usuário
  const { rows: comentarios, count: total } = await Comentario.findAndCountAll({
    where: { idPost: postId },
    include: [
      {
        model: Usuario,
        as: 'usuario',
        attributes: ['idUsuario', 'nome', 'fotoPerfil']
      }
    ],
    order: [['criado_em', 'DESC']],
    offset,
    limit: parseInt(limit, 10)
  });

  // Calcular metadados de paginação
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    comentarios,
    meta: {
      currentPage: parseInt(page, 10),
      totalPages,
      totalItems: total,
      itemsPerPage: parseInt(limit, 10),
      hasNextPage,
      hasPrevPage
    }
  };
}

/**
 * Exclui um comentário
 */
export async function deleteComentario(comentarioId, userId) {
  const comentario = await Comentario.findByPk(comentarioId);
  
  if (!comentario) {
    throw new NotFoundError('Comentário não encontrado');
  }
  
  // Verificar se o usuário é o autor do comentário
  if (comentario.idUsuario !== userId) {
    const error = new Error('Você não tem permissão para excluir este comentário');
    error.name = 'AuthorizationError';
    throw error;
  }

  await comentario.destroy();
  return { message: 'Comentário excluído com sucesso' };
}