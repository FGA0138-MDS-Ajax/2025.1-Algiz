import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuthContext } from '../context/AuthContext';
import { getComments, addComment, deleteComment } from '../services/postService';
import LoadingSpinner from './LoadingSpinner';

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  
  const { usuario } = useContext(AuthContext);

  // Carregar comentários quando o componente montar
  useEffect(() => {
    const fetchComments = async () => {
      if (!postId) return;
      
      try {
        setLoading(true);
        const response = await getComments(postId, page);
        
        if (page === 1) {
          setComments(response.comentarios || []);
        } else {
          setComments(prev => [...prev, ...(response.comentarios || [])]);
        }
        
        setHasMore(response.meta?.currentPage < response.meta?.totalPages);
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
        setError('Não foi possível carregar os comentários');
      } finally {
        setLoading(false);
      }
    };
    
    fetchComments();
  }, [postId, page]);

  // Enviar novo comentário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!usuario) {
      setError('Você precisa estar logado para comentar');
      return;
    }
    
    if (!newComment.trim()) {
      setError('O comentário não pode estar vazio');
      return;
    }
    
    try {
      setSubmitting(true);
      const result = await addComment(postId, newComment);
      
      // Adicionar o novo comentário no topo da lista
      setComments(prev => [result, ...prev]);
      setNewComment('');
      setError(null);
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
      setError('Não foi possível adicionar seu comentário. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  // Excluir comentário
  const handleDelete = async (commentId) => {
    if (!usuario) return;
    
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(c => c.idComentario !== commentId));
    } catch (error) {
      console.error('Erro ao excluir comentário:', error);
      alert('Não foi possível excluir o comentário. Tente novamente.');
    }
  };

  // Carregar mais comentários
  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mt-4">
      <h3 className="font-bold text-lg mb-3">Comentários</h3>
      
      {/* Formulário para adicionar comentário */}
      {usuario ? (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-2"
            placeholder="Escreva um comentário..."
            rows="2"
            maxLength={1000} // Limitar o tamanho do comentário
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className={`px-4 py-1 rounded text-white ${
                submitting || !newComment.trim()
                  ? 'bg-green-300'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {submitting ? 'Enviando...' : 'Comentar'}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-gray-50 p-3 rounded-lg mb-4 text-center">
          <p className="text-gray-600">Faça login para deixar um comentário</p>
        </div>
      )}
      
      {/* Lista de comentários */}
      {loading && page === 1 ? (
        <div className="flex justify-center py-4">
          <LoadingSpinner size="md" message="Carregando comentários..." />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map(comment => (
            <div key={comment.idComentario} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex">
                <img 
                  src={comment.usuario?.fotoPerfil || "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png"} 
                  alt="Foto de perfil" 
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png";
                  }}
                />
                <div className="flex-1 min-w-0"> {/* min-width para evitar que o texto saia do container */}
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm truncate max-w-[70%]">
                      {comment.usuario?.nome || comment.usuario?.emailUsuario || "Usuário"}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {comment.criado_em && formatDistance(new Date(comment.criado_em), new Date(), { 
                        addSuffix: true, 
                        locale: ptBR 
                      })}
                    </span>
                  </div>
                  <p className="text-sm mt-1 break-words whitespace-pre-wrap">
                    {comment.texto}
                  </p>
                </div>
                {/*{usuario && comment.idUsuario === usuario.id && (
                  <button
                    onClick={() => handleDelete(comment.idComentario)}
                    className="text-gray-400 hover:text-red-500 ml-2 flex-shrink-0"
                    title="Excluir comentário"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}*/}
              </div>
            </div>
          ))}
          
          {loading && page > 1 && (
            <div className="flex justify-center py-2">
              <LoadingSpinner size="sm" />
            </div>
          )}
          
          {hasMore && !loading && (
            <button
              onClick={loadMore}
              className="w-full py-2 text-sm text-green-600 hover:text-green-800"
            >
              Carregar mais comentários
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          Nenhum comentário ainda. Seja o primeiro a comentar!
        </div>
      )}
    </div>
  );
}

Comments.propTypes = {
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};