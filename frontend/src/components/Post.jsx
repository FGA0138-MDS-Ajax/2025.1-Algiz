import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";
import { toggleLike, toggleSave } from "../services/postService";
import Tag from "./Tag";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios from "axios";
import Comments from './Comments';

export default function Post({ post, big, small, completo = false }) {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  
  // Garantir que post.curtidas e post.salvos sempre existam
  const postSeguro = {
    ...post,
    curtidas: post.curtidas || [],
    salvos: post.salvos || []
  };
  
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(postSeguro.curtidas.length);
  const [feedback, setFeedback] = useState({ mensagem: "", visivel: false });
  const [empresaData, setEmpresaData] = useState(null); // Novo estado para dados da empresa
  
  // Verificar curtidas e salvos
  useEffect(() => {
    // Sempre inicializar o contador de likes
    setLikeCount(postSeguro.curtidas.length);
    
    // Verificar se o post está curtido pelo usuário logado
    if (usuario) {
      const isLiked = postSeguro.curtidas.some(u => 
        u.idUsuario === usuario.id || u.id === usuario.id
      );
      setLiked(isLiked);
      console.log("✅ Verificação de curtida:", { 
        curtidas: postSeguro.curtidas, 
        usuarioId: usuario.id, 
        curtido: isLiked 
      });
    }
    
    // Verificar se o post está salvo pelo usuário
    if (usuario) {
      // Primeiro, verificar diretamente a propriedade salvo se existir
      if (postSeguro.salvo !== undefined) {
        setSaved(postSeguro.salvo);
      } 
      // Caso contrário, verificar na lista de salvos
      else if (postSeguro.salvos && Array.isArray(postSeguro.salvos)) {
        const isSaved = postSeguro.salvos.some(u => 
          u.idUsuario === usuario.id || u.id === usuario.id
        );
        setSaved(isSaved);
        console.log("✅ Verificação de salvo:", { 
          salvos: postSeguro.salvos, 
          usuarioId: usuario.id, 
          salvo: isSaved 
        });
      }
    }
  }, [postSeguro, usuario]);
  
  // Carregar dados da empresa
  useEffect(() => {
    const carregarDetalhesEmpresa = async () => {
      // Sempre buscar dados atualizados se tivermos um ID de empresa
      if (post.idEmpresa || (post.empresa?.id) || (post.empresa?.idEmpresa)) {
        try {
          // Obter o ID da empresa considerando as diferentes possibilidades
          const empresaId = post.idEmpresa || post.empresa?.id || post.empresa?.idEmpresa;
          
          console.log("🔍 Buscando detalhes atualizados da empresa:", empresaId);
          const response = await axios.get(`http://localhost:3001/api/company/${empresaId}`);
          
          if (response.data) {
            console.log("✅ Detalhes atualizados da empresa obtidos:", response.data);
            setEmpresaData(response.data);
          }
        } catch (error) {
          console.error("❌ Erro ao buscar detalhes da empresa:", error);
          // Em caso de erro, usar os dados que já temos no post
          if (post.empresa) {
            console.log("⚠️ Usando dados da empresa do post como fallback");
            setEmpresaData(post.empresa);
          }
        }
      } else if (post.empresa) {
        // Se não temos ID mas temos dados da empresa no post
        console.log("⚠️ ID da empresa não disponível, usando dados do post");
        setEmpresaData(post.empresa);
      }
    };
    
    carregarDetalhesEmpresa();
  }, [post]);
  
  // Oculta o feedback após 3 segundos
  useEffect(() => {
    if (feedback.visivel) {
      const timer = setTimeout(() => {
        setFeedback({ mensagem: "", visivel: false });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [feedback.visivel]);

  // Manipuladores de eventos
  const mostrarFeedback = (mensagem) => {
    setFeedback({ mensagem, visivel: true });
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    
    if (!usuario) {
      mostrarFeedback("Faça login para curtir este post");
      return;
    }
    
    try {
      // Atualização otimista da UI
      setLiked(prev => !prev);
      setLikeCount(prev => liked ? prev - 1 : prev + 1);
      
      // Chamada à API
      const response = await toggleLike(postSeguro.id || postSeguro.idPost);
      
      // Atualizar com os dados reais da API
      setLiked(response.liked);
      setLikeCount(response.likeCount);
      
      // Atualizar o objeto postSeguro para que a informação persista
      if (response.liked) {
        // Se curtiu, adicionar usuário à lista de curtidas
        if (!postSeguro.curtidas.some(u => u.idUsuario === usuario.id || u.id === usuario.id)) {
          postSeguro.curtidas.push({ idUsuario: usuario.id });
        }
      } else {
        // Se descurtiu, remover usuário da lista de curtidas
        postSeguro.curtidas = postSeguro.curtidas.filter(u => 
          (u.idUsuario !== usuario.id) && (u.id !== usuario.id)
        );
      }
    } catch (error) {
      // Reverter a atualização otimista em caso de erro
      setLiked(prev => !prev);
      setLikeCount(prev => liked ? prev - 1 : prev + 1);
      console.error("Erro ao curtir/descurtir:", error);
      mostrarFeedback("Não foi possível processar sua solicitação");
    }
  };

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    
    if (!usuario) {
      mostrarFeedback("Faça login para salvar este post");
      return;
    }
    
    try {
      // Atualização otimista da UI
      setSaved(prev => !prev);
      
      // Chamada à API
      const response = await toggleSave(postSeguro.id || postSeguro.idPost);
      
      // Debug adicional
      console.log("✅ Resposta ao salvar/remover:", {
        postId: postSeguro.id || postSeguro.idPost,
        saved: response.saved,
        message: response.message
      });
      
      // Atualizar com os dados reais da API
      setSaved(response.saved);
      
      // Atualizar o objeto postSeguro para que a informação persista
      if (!postSeguro.salvos) {
        postSeguro.salvos = [];
      }
      
      if (response.saved) {
        // Se salvou, adicionar usuário à lista de salvos
        if (!postSeguro.salvos.some(u => u.idUsuario === usuario.id || u.id === usuario.id)) {
          postSeguro.salvos.push({ idUsuario: usuario.id });
        }
      } else {
        // Se removeu, remover usuário da lista de salvos
        postSeguro.salvos = postSeguro.salvos.filter(u => 
          (u.idUsuario !== usuario.id) && (u.id !== usuario.id)
        );
      }
      
      // Feedback visual
      mostrarFeedback(response.saved ? "Post salvo com sucesso" : "Post removido dos salvos");
    } catch (error) {
      // Reverter a atualização otimista em caso de erro
      setSaved(prev => !prev);
      console.error("Erro ao salvar/remover:", error);
      mostrarFeedback("Não foi possível processar sua solicitação");
    }
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/post/${post.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => mostrarFeedback("Link copiado para a área de transferência"))
      .catch(() => mostrarFeedback("Não foi possível copiar o link"));
  };

  const handlePostClick = () => {
    // Obter o ID do post, considerando diferentes formatos
    const postId = post.idPost || post.id;
    
    // Log para depuração
    console.log("Clicou no post:", { 
      post, 
      postId, 
      idPost: post.idPost, 
      id: post.id 
    });
    
    if (postId) {
      navigate(`/post/${postId}`);
    } else {
      console.error("ID do post não encontrado:", post);
      // Mostrar mensagem de erro ao usuário
      alert("Não foi possível abrir este post. ID inválido.");
    }
  };
  
  // ✅ CORREÇÃO: Preferir dados do empresaData sobre post.empresa
  const empresa = empresaData || post.empresa || {};
  
  // Obter imagem da empresa (com fallbacks)
  const empresaImagem = empresa.fotoEmpresa || 
                        empresa.logoURL || 
                        "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png";
  
  // Obter nome da empresa (com fallbacks)
  const empresaNome = empresa.nomeComercial || 
                      empresa.nome || 
                      "Empresa";
  
  // Obter ID da empresa para navegação
  const empresaId = post.idEmpresa || 
                   empresa.idEmpresa || 
                   empresa.id;
  
  // URL da imagem do post
  const imagemPost = post.banner || post.imagemURL;

  // Formato para postagem completa
  if (completo) {
    return (
      <>
        {feedback.visivel && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg z-50 animate-fade-in-out">
            {feedback.mensagem}
          </div>
        )}
        
        <div className="bg-white rounded-2xl shadow-md p-4 pb-3 flex flex-col min-h-[400px] w-full max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2" onClick={() => navigate(`/empresa/${empresaId}`)} style={{ cursor: 'pointer' }}>
              <img
                src={empresaImagem}
                alt={empresaNome}
                className="h-10 w-10 rounded-full object-cover border border-gray-200"
              />
              <div>
                <div className="font-semibold text-sm">{empresaNome}</div>
                <div className="text-gray-500 text-xs">
                  {formatDistance(new Date(post.criado_em), new Date(), { locale: ptBR, addSuffix: true })}
                </div>
              </div>
            </div>
            <button 
              className="bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 font-semibold text-sm"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/empresa/${empresaId}`);
              }}
            >
              Seguir +
            </button>
          </div>
          
          {/* Título */}
          <div className="font-semibold text-lg mb-2">{post.titulo}</div>
          
          {/* Imagem do post */}
          {imagemPost && (
            <img
              src={imagemPost}
              alt={post.titulo}
              className="rounded-xl w-full object-cover mb-4 max-h-[500px]"
            />
          )}
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <Tag key={tag.id} nome={tag.nome} />
              ))}
            </div>
          )}
          
          {/* Descrição completa */}
          <div className="text-gray-800 mb-4 whitespace-pre-line">{post.conteudo}</div>
          
          {/* Barra de ações */}
          <div className="flex items-center gap-5 mt-auto py-3">
            <button 
              className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`} 
              onClick={handleLikeClick}
              title={liked ? "Descurtir" : "Curtir"}
            >
              {liked ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
              )}
              <span>{likeCount > 0 ? likeCount : ""}</span>
            </button>
            
            <button 
              className="text-gray-500 hover:text-blue-500" 
              onClick={handleShareClick}
              title="Compartilhar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            
           <button 
  className={`ml-auto ${saved ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-400'}`} 
  onClick={handleSaveClick}
  title={saved ? "Remover dos salvos" : "Salvar post"}
>
  {saved ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z" />
    </svg>
  )}
</button>
          </div>
          
          {/* Seção de comentários quando o post estiver em modo completo */}
          {completo && <Comments postId={post.id || post.idPost} />}
        </div>
      </>
    );
  }

  // Formato para preview (card) em feeds
  return (
    <>
      {feedback.visivel && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg z-50">
          {feedback.mensagem}
        </div>
      )}
      
      <div
        className={`bg-white rounded-2xl shadow-md p-4 flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200
          ${big ? "min-h-[400px]" : small ? "min-h-[200px]" : "min-h-[280px]"}
        `}
        onClick={handlePostClick}
        title="Ver post completo"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <img
            src={empresaImagem}
            alt={empresaNome}
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
          <div>
            <div className="font-semibold text-sm">{empresaNome}</div>
            <div className="text-xs text-gray-500">
              {post.criado_em && formatDistance(new Date(post.criado_em), new Date(), { locale: ptBR, addSuffix: true })}
            </div>
          </div>
        </div>
        
        {/* Título */}
        <div className="font-bold mb-2">{post.titulo}</div>
        
        {/* Imagem do post - RESTAURADO: apenas para posts grandes */}
        {big && imagemPost && (
          <img
            src={imagemPost}
            alt={post.titulo}
            className="rounded-xl w-full object-cover mb-3 max-h-[200px]"
          />
        )}
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && !small && (
          <div className="flex flex-wrap gap-1 mb-2">
            {post.tags.slice(0, 2).map((tag) => (
              <Tag key={tag.id} nome={tag.nome} small />
            ))}
            {post.tags.length > 2 && <span className="text-xs text-gray-500">+{post.tags.length - 2}</span>}
          </div>
        )}
        
        {/* Texto sempre na parte de baixo */}
        <div className="text-gray-700 text-sm mb-4 mt-auto line-clamp-3">
          {post.conteudo}
        </div>
        
        {/* Barra de ações */}
        <div className="flex items-center gap-5 mt-auto">
          <button 
            className={`${liked ? 'text-red-500' : 'text-gray-500'} flex items-center gap-1`} 
            onClick={handleLikeClick}
          >
            {liked ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
            )}
            {/* Adicionar o contador de likes */}
            <span className="text-sm">{likeCount > 0 ? likeCount : ""}</span>
          </button>
          
          <button className="text-gray-500" onClick={handleShareClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          
          <button
  className={`ml-auto ${saved ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-400'}`}
  onClick={handleSaveClick}
  title={saved ? 'Remover dos salvos' : 'Salvar post'}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    viewBox="0 0 24 24"
    fill={saved ? 'currentColor' : 'none'}                 // cheio ou vazio
    stroke={saved ? 'none'        : 'currentColor'}        // sem borda no cheio
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z" />
  </svg>
</button>

        </div>
      </div>
    </>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    titulo: PropTypes.string.isRequired,
    conteudo: PropTypes.string.isRequired,
    banner: PropTypes.string,
    imagemURL: PropTypes.string,
    tipo: PropTypes.string,
    criado_em: PropTypes.string,
    idEmpresa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    empresa: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      idEmpresa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      nomeComercial: PropTypes.string,
      cnpjJuridico: PropTypes.string,
      logoURL: PropTypes.string,
      fotoEmpresa: PropTypes.string
    }),
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        nome: PropTypes.string
      })
    ),
    curtidas: PropTypes.array,
    salvos: PropTypes.array
  }).isRequired,
  big: PropTypes.bool,
  small: PropTypes.bool,
  completo: PropTypes.bool
};