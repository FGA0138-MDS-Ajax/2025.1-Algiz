import models from '../../../models/index.model.js';
const { Post, Empresa } = models;

async function createPost(postData) {
  const { titulo, conteudo, empresaId } = postData;

  // 1. Validação de campos obrigatórios
  if (!titulo?.trim()) {
    const error = new Error('O título da postagem não pode estar vazio.');
    error.name = 'ValidationError';
    throw error;
  }

  if (!conteudo?.trim()) {
    const error = new Error('O conteúdo da postagem não pode estar vazio.');
    error.name = 'ValidationError';
    throw error;
  }

  if (!empresaId) {
    const error = new Error('É necessário especificar a empresa autora da postagem.');
    error.name = 'ValidationError';
    throw error;
  }

  // 2. Validação de existência da empresa
  const empresaExiste = await Empresa.findByPk(empresaId);
  if (!empresaExiste) {
    const error = new Error('A empresa autora não foi encontrada.');
    error.name = 'NotFoundError';
    throw error;
  }

  // 3. Criação da postagem no banco
  const novaPostagem = await Post.create({
    titulo,
    conteudo,
    empresaId,
  });

  return novaPostagem;
}

export {
  createPost,
};