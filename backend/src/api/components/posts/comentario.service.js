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
  // Log para diagnóstico
  console.log("Modelos disponíveis:", Object.keys(models));
  
  // Verificar se os modelos existem
  if (!Post) {
    throw new Error("Modelo Post não encontrado");
  }
  
  if (!Usuario) {
    throw new Error("Modelo Usuario não encontrado");
  }
  
  if (!Comentario) {
    throw new Error("Modelo Comentario não encontrado");
  }

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

  try {
    // Usar o Sequelize disponível em qualquer modelo
    const dadosFisicos = await Usuario.sequelize.query(`
      SELECT nomeFisico, sobrenomeFisico 
      FROM FISICO 
      WHERE idUsuario = :userId
    `, {
      replacements: { userId },
      type: Usuario.sequelize.QueryTypes.SELECT
    });

    // Criar o comentário
    const comentario = await Comentario.create({
      idPost: postId,
      idUsuario: userId,
      texto: texto.trim(),
      criado_em: new Date()
    });

    // Buscar apenas os dados do comentário
    const comentarioCriado = await Comentario.findByPk(comentario.id);
    
    // Formatar o nome completo com base nos dados da tabela FISICO
    let nomeUsuario = usuario.emailUsuario || 'Usuário';
    if (dadosFisicos && dadosFisicos.length > 0) {
      const fisico = dadosFisicos[0];
      nomeUsuario = `${fisico.nomeFisico || ''} ${fisico.sobrenomeFisico || ''}`.trim();
    }
    
    // Adicionar manualmente os dados básicos do usuário
    return {
      ...comentarioCriado.get({ plain: true }),
      usuario: {
        idUsuario: usuario.idUsuario,
        nome: nomeUsuario,
        fotoPerfil: usuario.fotoPerfil || null
      }
    };
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    throw error;
  }
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

  try {
    // Buscar apenas os comentários sem usar include
    const { rows: comentariosBrutos, count: total } = await Comentario.findAndCountAll({
      where: { idPost: postId },
      order: [['criado_em', 'DESC']],
      offset,
      limit: parseInt(limit, 10)
    });

    // Buscar os IDs dos usuários dos comentários
    const idsUsuarios = [...new Set(comentariosBrutos.map(c => c.idUsuario))];
    
    // Buscar dados dos usuários na tabela USUARIO - apenas informações básicas
    const usuarios = await Usuario.findAll({
      where: {
        idUsuario: idsUsuarios
      },
      attributes: ['idUsuario', 'fotoPerfil', 'emailUsuario']
    });

    // Mapear usuários por ID para fácil acesso
    const usuariosPorId = {};
    usuarios.forEach(u => {
      usuariosPorId[u.idUsuario] = u;
    });

    // Buscar dados dos nomes na tabela FISICO
    const dadosFisicos = await Usuario.sequelize.query(`
      SELECT f.idUsuario, f.nomeFisico, f.sobrenomeFisico 
      FROM FISICO f 
      JOIN USUARIO u ON f.idUsuario = u.idUsuario
      WHERE u.idUsuario IN (:idsUsuarios)
    `, {
      replacements: { idsUsuarios },
      type: Usuario.sequelize.QueryTypes.SELECT
    });

    // Mapear dados físicos por ID de usuário
    const fisicosPorUserId = {};
    dadosFisicos.forEach(f => {
      fisicosPorUserId[f.idUsuario] = f;
    });

    // Adicionar dados de usuário aos comentários
    const comentarios = comentariosBrutos.map(c => {
      const comentarioPlain = c.get({ plain: true });
      const usuarioDoComentario = usuariosPorId[c.idUsuario];
      const fisicoDoUsuario = fisicosPorUserId[c.idUsuario];
      
      // Nome completo formatado com base nos dados da tabela FISICO
      let nomeUsuario = usuarioDoComentario?.emailUsuario || 'Usuário';
      if (fisicoDoUsuario) {
        nomeUsuario = `${fisicoDoUsuario.nomeFisico || ''} ${fisicoDoUsuario.sobrenomeFisico || ''}`.trim();
      }
      
      return {
        ...comentarioPlain,
        usuario: usuarioDoComentario ? {
          idUsuario: usuarioDoComentario.idUsuario,
          nome: nomeUsuario,
          fotoPerfil: usuarioDoComentario.fotoPerfil
        } : null
      };
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
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
    throw error;
  }
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