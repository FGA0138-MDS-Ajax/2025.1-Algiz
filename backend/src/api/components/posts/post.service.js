import models from '../../../models/index.model.js';
import cloudinary from '../../utils/cloudinary.util.js';

const { Post, Empresa, Tag, Usuario } = models;

function uploadImageToCloudinary(imageBuffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "posts",
        resource_type: "image",
        quality: "auto",
        fetch_format: "auto"
      },
      (error, result) => {
        if (error) {
          console.error('Erro no upload do Cloudinary:', error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    
    uploadStream.end(imageBuffer);
  });
}

async function createPost(postData) {
  const { titulo, conteudo, tipo, idEmpresa, tags = [], imagem } = postData; // ✅ ALTERADO

  // Validações básicas
  if (!titulo || !conteudo || !tipo || !idEmpresa) {                        // ✅ ALTERADO
    const error = new Error('Título, conteúdo, tipo e ID da empresa são obrigatórios.');
    error.name = 'ValidationError';
    throw error;
  }

  // ✅ ALTERADO: Verificar se a empresa existe por ID
  const empresaExiste = await Empresa.findByPk(idEmpresa);
  if (!empresaExiste) {
    const error = new Error('A empresa autora não foi encontrada.');
    error.name = 'NotFoundError';
    throw error;
  }

  let imagemURL = null;
  
  if (imagem) {
    try {
      console.log('Iniciando upload da imagem para Cloudinary...');
      const result = await uploadImageToCloudinary(imagem);
      imagemURL = result.secure_url;
      console.log('Upload concluído. URL:', imagemURL);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw new Error('Não foi possível fazer o upload da imagem.');
    }
  }

  // ✅ ALTERADO: Criar postagem com idEmpresa
  const novaPostagem = await Post.create({
    titulo,
    conteudo,
    idEmpresa,                                      // ✅ ALTERADO
    imagemURL,
    tipo: tipo || 'oferta',
    criado_em: new Date()
  });

  console.log('Postagem criada com ID:', novaPostagem.id);

  // Associar tags
  if (tags && tags.length > 0) {
    console.log('Processando tags:', tags);
    for (const tagNome of tags) {
      if (tagNome && tagNome.trim()) {
        try {
          const [tag] = await Tag.findOrCreate({
            where: { nome: tagNome.trim() },
            defaults: { nome: tagNome.trim() }
          });
          
          await novaPostagem.addTag(tag);
          console.log('Tag associada:', tagNome.trim());
        } catch (tagError) {
          console.error('Erro ao processar tag:', tagNome, tagError);
        }
      }
    }
  }

  // Retornar postagem completa
  const postCompleto = await Post.findByPk(novaPostagem.id, {
    include: [
      { model: Tag, as: 'tags', through: { attributes: [] } },
      { 
        model: Empresa, 
        as: 'empresa',
        attributes: ['idEmpresa', 'nomeComercial', 'cnpjJuridico', 'telefoneJuridico', 'areaAtuacao'] // ✅ INCLUIR idEmpresa
      }
    ]
  });

  return postCompleto;
}

async function listPosts(options = {}) {
  const { page = 1, limit = 10, empresaId, tipo, tagId } = options;

  const where = {};
  
  // ✅ ALTERADO: Filtrar por idEmpresa
  if (empresaId) {
    where.idEmpresa = empresaId;                    // ✅ ALTERADO
  }
  
  if (tipo) {
    where.tipo = tipo;
  }

  const offset = (page - 1) * limit;
  
  const include = [
    { 
      model: Empresa, 
      as: 'empresa',
      attributes: ['idEmpresa', 'nomeComercial', 'cnpjJuridico', 'telefoneJuridico'] // ✅ INCLUIR idEmpresa
    },
    { 
      model: Tag, 
      as: 'tags',
      through: { attributes: [] }
    }
  ];

  if (tagId) {
    include[1].where = { idTag: tagId };            // ✅ CORRIGIR
  }

  const { rows: posts, count: total } = await Post.findAndCountAll({
    where,
    include,
    order: [['criado_em', 'DESC']],
    offset,
    limit: parseInt(limit, 10),
    distinct: true
  });

  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    posts,
    meta: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage,
      hasPrevPage
    }
  };
}

async function getPostById(id) {
  const post = await Post.findByPk(id, {
    include: [
      { 
        model: Empresa, 
        as: 'empresa',
        attributes: ['idEmpresa', 'nomeComercial', 'cnpjJuridico', 'telefoneJuridico', 'areaAtuacao'] // ✅ INCLUIR idEmpresa
      },
      { 
        model: Tag, 
        as: 'tags',
        through: { attributes: [] }
      },
      {
        model: Usuario,
        as: 'curtidas',
        through: { attributes: ['curtido_em'] },
        attributes: ['idUsuario']
      }
    ]
  });

  if (!post) {
    const error = new Error('Postagem não encontrada.');
    error.name = 'NotFoundError';
    throw error;
  }

  return post;
}

/**
 * Toggle like em um post
 */
async function toggleLike(postId, userId) {
  try {
    // Verificar se o post existe
    const post = await models.Post.findByPk(postId);
    if (!post) {
      throw new Error('Post não encontrado');
    }
    
    // Verificar se já curtiu usando sequelize direto do model
    const [alreadyLiked] = await models.sequelize.query(`
      SELECT COUNT(*) as count 
      FROM CURTE 
      WHERE idUsuario = ? AND idPost = ?
    `, {
      replacements: [userId, postId],
      type: models.sequelize.QueryTypes.SELECT
    });
    
    let liked = false;
    
    // Se já curtiu, remove a curtida
    if (alreadyLiked.count > 0) {
      await models.sequelize.query(`
        DELETE FROM CURTE 
        WHERE idUsuario = ? AND idPost = ?
      `, {
        replacements: [userId, postId]
      });
    } 
    // Se não curtiu, adiciona a curtida
    else {
      await models.sequelize.query(`
        INSERT INTO CURTE (idUsuario, idPost) 
        VALUES (?, ?)
      `, {
        replacements: [userId, postId]
      });
      liked = true;
    }
    
    // Contar total de curtidas
    const [likeCountResult] = await models.sequelize.query(`
      SELECT COUNT(*) as count 
      FROM CURTE 
      WHERE idPost = ?
    `, {
      replacements: [postId],
      type: models.sequelize.QueryTypes.SELECT
    });
    
    const likeCount = likeCountResult.count;
    
    return { 
      liked, 
      likeCount,
      message: liked ? 'Post curtido com sucesso' : 'Curtida removida com sucesso' 
    };
  } catch (error) {
    console.error('Erro ao processar curtida:', error);
    throw error;
  }
}

/**
 * Salvar/Dessalvar uma postagem
 */
async function toggleSave(postId, userId) {
  // Verificar se o post existe
  const post = await Post.findByPk(postId);
  if (!post) {
    const error = new Error('Postagem não encontrada.');
    error.name = 'NotFoundError';
    throw error;
  }

  // Verificar se o usuário existe
  const usuario = await Usuario.findByPk(userId);
  if (!usuario) {
    const error = new Error('Usuário não encontrado.');
    error.name = 'NotFoundError';
    throw error;
  }

  // Verificar se o usuário já salvou o post
  const salvoExistente = await models.sequelize.models.SALVA.findOne({
    where: {
      idUsuario: userId,
      idPost: postId
    }
  });

  // Se já salvou, remove o salvamento
  if (salvoExistente) {
    await salvoExistente.destroy();
    return { saved: false, message: 'Post removido dos salvos.' };
  }

  // Se não salvou, adiciona o salvamento
  await models.sequelize.models.SALVA.create({
    idUsuario: userId,
    idPost: postId,
    salvo_em: new Date()
  });

  return { saved: true, message: 'Post salvo com sucesso.' };
}

/**
 * Listar posts salvos por um usuário
 */
async function getSavedPosts(userId, page = 1, limit = 10) {
  // Verificar se o usuário existe
  const usuario = await Usuario.findByPk(userId);
  if (!usuario) {
    const error = new Error('Usuário não encontrado.');
    error.name = 'NotFoundError';
    throw error;
  }

  const offset = (page - 1) * limit;

  // Buscar posts salvos pelo usuário
  const { rows: posts, count: total } = await Post.findAndCountAll({
    include: [
      { 
        model: Empresa, 
        as: 'empresa',
        attributes: ['nomeComercial', 'cnpjJuridico', 'telefoneJuridico']
      },
      { 
        model: Tag, 
        as: 'tags',
        through: { attributes: [] }
      },
      {
        model: Usuario,
        as: 'salvos',
        where: { id: userId },
        through: { attributes: ['salvo_em'] },
        attributes: []
      }
    ],
    order: [[{ model: Usuario, as: 'salvos' }, 'SALVA', 'salvo_em', 'DESC']],
    offset,
    limit: parseInt(limit, 10),
    distinct: true
  });

  // Calcular metadados de paginação
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    posts,
    meta: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage,
      hasPrevPage
    }
  };
}

export {
  createPost,
  listPosts,
  getPostById,
  toggleSave,
  getSavedPosts
};