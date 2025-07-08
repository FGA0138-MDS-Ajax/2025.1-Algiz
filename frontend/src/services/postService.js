import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

/**
 * Configura o cabeçalho de autorização
 */
const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Lista todas as postagens com opções de filtragem
 */
export const getPosts = async (options = {}) => {
  const { page = 1, limit = 10, empresa, tipo, tag } = options;
  
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      params: { page, limit, empresa, tipo, tag }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
};

/**
 * Obtém uma postagem específica pelo ID
 */
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar post ${id}:`, error);
    throw error;
  }
};

/**
 * Cria uma nova postagem
 */
export const createPost = async (postData) => {
  try {
    const formData = new FormData();
    
    // Adicionar campos ao FormData
    formData.append('titulo', postData.get('titulo'));
    formData.append('conteudo', postData.get('conteudo'));
    
    if (postData.get('tipo')) {
      formData.append('tipo', postData.get('tipo'));
    }
    
    // Adicionar o cnpjJuridico se estiver presente
    if (postData.get('cnpjJuridico')) {
      formData.append('cnpjJuridico', postData.get('cnpjJuridico'));
    }
    
    if (postData.getAll('tags[]')) {
      postData.getAll('tags[]').forEach(tag => {
        formData.append('tags[]', tag);
      });
    }
    
    if (postData.get('imagem')) {
      formData.append('imagem', postData.get('imagem'));
    }
    
    const response = await axios.post(`${API_URL}/posts`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro ao criar post:', error);
    throw error;
  }
};

/**
 * Curtir ou descurtir uma publicação
 * @param {number} postId - ID do post
 * @returns {Promise} - Resposta da API
 */
export const toggleLike = async (postId) => {
  try {
    const response = await axios.post(
      `${API_URL}/posts/${postId}/like`,
      {},
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao curtir/descurtir post ${postId}:`, error);
    throw error;
  }
};

/**
 * Salva ou remove um post dos salvos
 * @param {number} postId - ID do post
 * @returns {Promise} - Resposta da API
 */
export const toggleSave = async (postId) => {
  try {
    // Obter o token do localStorage
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      throw new Error('Usuário não autenticado');
    }
    
    const response = await axios.post(
      `http://localhost:3001/api/posts/${postId}/save`,
      {}, // corpo vazio
      { 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        } 
      }
    );
    
    return response.data;
  } catch (error) {
    console.error(`Erro ao salvar/remover post ${postId}:`, error);
    throw error;
  }
};

/**
 * Obter posts salvos pelo usuário
 */
export const getSavedPosts = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_URL}/users/me/saved-posts`,
      {
        params: { page, limit },
        headers: getAuthHeader()
      }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar posts salvos:', error);
    throw error;
  }
};

/**
 * Obter posts salvos de um usuário específico
 * @param {string|number} userId - ID do usuário
 * @returns {Promise} - Resposta da API com posts salvos
 */
export const getUserSavedPosts = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/users/${userId}/salvos`);
    
    // Normalizar os dados para garantir que todos os posts tenham um ID acessível
    const normalizedPosts = response.data.map(post => {
      // Garantir que o post tenha uma propriedade id consistente
      return {
        ...post,
        // Se não houver id, usar idPost
        id: post.id || post.idPost
      };
    });
    
    return normalizedPosts;
  } catch (error) {
    console.error(`Erro ao buscar posts salvos do usuário ${userId}:`, error);
    throw error;
  }
};

/**
 * Adicionar comentário a uma postagem
 */
export const addComment = async (postId, commentText) => {
  try {
    const response = await axios.post(
      `${API_URL}/posts/${postId}/comentarios`,
      { texto: commentText },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao adicionar comentário ao post ${postId}:`, error);
    throw error;
  }
};

/**
 * Obter comentários de uma postagem
 */
export const getComments = async (postId, page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${API_URL}/posts/${postId}/comentarios`, // Corrigido para "comentarios"
      {
        params: { page, limit }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar comentários do post ${postId}:`, error);
    throw error;
  }
};

/**
 * Excluir um comentário
 */
export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/comentarios/${commentId}`, // Corrigido para "comentarios"
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao excluir comentário ${commentId}:`, error);
    throw error;
  }
};