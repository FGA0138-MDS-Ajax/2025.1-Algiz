import * as postService from './post.service.js';
import models from '../../../models/index.model.js';
const { Post } = models; // Adicionar esta linha

/**
 * Cria uma nova postagem
 */
async function create(req, res) {
  try {
    const { titulo, conteudo, tipo } = req.body;
    const imagem = req.file;
    
    // ✅ ALTERADO: Buscar empresa do usuário logado pelo ID
    const userId = req.user.id;
    const empresa = await models.Empresa.findOne({
      where: { idUsuario: userId }
    });

    if (!empresa) {
      return res.status(404).json({ 
        erro: "Você não possui empresa cadastrada." 
      });
    }

    // Processar tags
    let tags = [];
    if (req.body['tags[]']) {
      tags = Array.isArray(req.body['tags[]']) ? req.body['tags[]'] : [req.body['tags[]']];
    } else if (req.body.tags) {
      try {
        tags = JSON.parse(req.body.tags);
      } catch {
        tags = Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags];
      }
    }

    console.log('Tags recebidas:', tags);
    console.log('Empresa encontrada - ID:', empresa.idEmpresa);   // ✅ ALTERADO

    // ✅ ALTERADO: Usar idEmpresa ao invés de cnpjJuridico
    const newPost = await postService.createPost({
      titulo,
      conteudo,
      tipo,
      idEmpresa: empresa.idEmpresa,                    // ✅ ALTERADO
      tags,
      imagem: imagem ? imagem.buffer : null
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

/**
 * Lista todas as postagens
 */
async function list(req, res) {
  try {
    const userId = req.user?.id; // Pegar o ID do usuário se estiver logado
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    
    const { posts, meta } = await postService.listPosts({ page, limit });
    
    // Se temos um usuário logado, verificar quais posts ele curtiu
    if (userId) {
      // Para cada post, verificar se o usuário o curtiu
      for (const post of posts) {
        // Verificar se o usuário curtiu este post
        const [curtidaResult] = await Post.sequelize.query(`
          SELECT COUNT(*) as count 
          FROM CURTE 
          WHERE idUsuario = ? AND idPost = ?
        `, {
          replacements: [userId, post.id],
          type: Post.sequelize.QueryTypes.SELECT
        });
        
        // Adicionar flag "curtido" diretamente no post
        post.curtido = curtidaResult.count > 0;
        
        // Contar número total de curtidas
        const [likeCountResult] = await Post.sequelize.query(`
          SELECT COUNT(*) as count 
          FROM CURTE 
          WHERE idPost = ?
        `, {
          replacements: [post.id],
          type: Post.sequelize.QueryTypes.SELECT
        });
        
        // Adicionar contagem total como propriedade numérica
        post.totalCurtidas = parseInt(likeCountResult.count);
      }
    }
    
    return res.status(200).json({ posts, meta });
  } catch (error) {
    console.error("Erro ao listar posts:", error);
    return res.status(500).json({ erro: "Erro ao listar posts" });
  }
}

/**
 * Obtém uma postagem específica pelo ID
 */
async function getById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user?.id; // ID do usuário logado, se disponível
    
    // Buscar o post pelo ID
    let post = await postService.getPostById(id);
    
    // Adicionar informações de curtidas quando há um usuário logado
    if (userId) {
      // Verificar se o usuário curtiu este post
      const [curtidaResult] = await Post.sequelize.query(`
        SELECT COUNT(*) as count 
        FROM CURTE 
        WHERE idUsuario = ? AND idPost = ?
      `, {
        replacements: [userId, id],
        type: Post.sequelize.QueryTypes.SELECT
      });
      
      // Adicionar campo para indicar se o usuário curtiu o post
      post = {
        ...post.get({ plain: true }),
        curtido: curtidaResult.count > 0
      };
    }
    
    // Contar número total de curtidas
    const [likeCountResult] = await Post.sequelize.query(`
      SELECT COUNT(*) as count 
      FROM CURTE 
      WHERE idPost = ?
    `, {
      replacements: [id],
      type: Post.sequelize.QueryTypes.SELECT
    });
    
    // Adicionar o total de curtidas ao post
    post.totalCurtidas = parseInt(likeCountResult.count);
    
    return res.status(200).json(post);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ erro: error.message });
    }
    console.error("Erro ao obter postagem:", error);
    return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
  }
}

/**
 * Toggle like em um post
 */
async function toggleLike(req, res) {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;
    
    // Verificar se o post existe
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ erro: 'Post não encontrado' });
    }
    
    // Usar o sequelize do modelo Post em vez de models.sequelize
    const [alreadyLikedResult] = await Post.sequelize.query(`
      SELECT COUNT(*) as count 
      FROM CURTE 
      WHERE idUsuario = ? AND idPost = ?
    `, {
      replacements: [userId, postId],
      type: Post.sequelize.QueryTypes.SELECT
    });
    
    let liked = false;
    
    // Se já curtiu, remove a curtida
    if (alreadyLikedResult.count > 0) {
      await Post.sequelize.query(`
        DELETE FROM CURTE 
        WHERE idUsuario = ? AND idPost = ?
      `, {
        replacements: [userId, postId]
      });
    } 
    // Se não curtiu, adiciona a curtida
    else {
      await Post.sequelize.query(`
        INSERT INTO CURTE (idUsuario, idPost) 
        VALUES (?, ?)
      `, {
        replacements: [userId, postId]
      });
      liked = true;
    }
    
    // Contar total de curtidas
    const [likeCountResult] = await Post.sequelize.query(`
      SELECT COUNT(*) as count 
      FROM CURTE 
      WHERE idPost = ?
    `, {
      replacements: [postId],
      type: Post.sequelize.QueryTypes.SELECT
    });
    
    const likeCount = parseInt(likeCountResult.count);
    
    return res.status(200).json({ 
      liked, 
      likeCount,
      message: liked ? 'Post curtido com sucesso' : 'Curtida removida com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao processar curtida:', error);
    return res.status(500).json({ erro: 'Ocorreu um erro ao processar sua solicitação' });
  }
}

/**
 * Toggle save em um post
 */
async function toggleSave(req, res) {
  try {
    const { id: postId } = req.params;
    const userId = req.user.id;
    
    // Verificar se o post existe
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ erro: 'Post não encontrado' });
    }
    
    // Verificar se já está salvo
    const [alreadySavedResult] = await Post.sequelize.query(`
      SELECT COUNT(*) as count 
      FROM SALVA 
      WHERE idUsuario = ? AND idPost = ?
    `, {
      replacements: [userId, postId],
      type: Post.sequelize.QueryTypes.SELECT
    });
    
    let saved = false;
    
    // Se já salvou, remove
    if (parseInt(alreadySavedResult.count) > 0) {
      await Post.sequelize.query(`
        DELETE FROM SALVA 
        WHERE idUsuario = ? AND idPost = ?
      `, {
        replacements: [userId, postId]
      });
    } 
    // Se não salvou, adiciona
    else {
      await Post.sequelize.query(`
        INSERT INTO SALVA (idUsuario, idPost) 
        VALUES (?, ?)
      `, {
        replacements: [userId, postId]
      });
      saved = true;
    }
    
    // Contar total de salvamentos
    const [saveCountResult] = await Post.sequelize.query(`
      SELECT COUNT(*) as count 
      FROM SALVA 
      WHERE idPost = ?
    `, {
      replacements: [postId],
      type: Post.sequelize.QueryTypes.SELECT
    });
    
    const saveCount = parseInt(saveCountResult.count);
    
    return res.status(200).json({ 
      saved, 
      saveCount,
      message: saved ? 'Post salvo com sucesso' : 'Post removido dos salvos com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao salvar/dessalvar postagem:', error);
    return res.status(500).json({ erro: 'Ocorreu um erro ao processar sua solicitação' });
  }
}

/**
 * Lista as postagens salvas pelo usuário
 */
async function getSavedPosts(req, res) {
  try {
    const userId = req.user.id;
    const { page, limit } = req.query;
    
    const result = await postService.getSavedPosts(
      userId,
      parseInt(page) || 1,
      parseInt(limit) || 10
    );
    
    return res.status(200).json(result);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ erro: error.message });
    }
    console.error("Erro ao listar postagens salvas:", error);
    return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
  }
}

export {
  create,
  list,
  getById,
  toggleLike,
  toggleSave,
  getSavedPosts
};