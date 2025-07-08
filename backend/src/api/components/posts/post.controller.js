import * as postService from './post.service.js';
import models from '../../../models/index.model.js';

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
    const { page, limit, empresa, tipo, tag } = req.query;
    
    const result = await postService.listPosts({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      empresaId: empresa,
      tipo,
      tagId: tag
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao listar postagens:", error);
    return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
  }
}

/**
 * Obtém uma postagem específica pelo ID
 */
async function getById(req, res) {
  try {
    const { id } = req.params;
    const post = await postService.getPostById(id);
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
 * Curtir/Descurtir uma postagem
 */
async function toggleLike(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const result = await postService.toggleLike(id, userId);
    return res.status(200).json(result);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ erro: error.message });
    }
    console.error("Erro ao curtir/descurtir postagem:", error);
    return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
  }
}

/**
 * Salvar/Dessalvar uma postagem
 */
async function toggleSave(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const result = await postService.toggleSave(id, userId);
    return res.status(200).json(result);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(404).json({ erro: error.message });
    }
    console.error("Erro ao salvar/dessalvar postagem:", error);
    return res.status(500).json({ erro: "Ocorreu um erro interno no servidor." });
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