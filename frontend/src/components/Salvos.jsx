import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Post from "./Post";
import axios from "axios";
import { getUserSavedPosts } from "../services/postService";

export default function Salvos({ usuario, empresa }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [isUsuarioLogado, setIsUsuarioLogado] = useState(false);
  const [visivel, setVisivel] = useState(true);

  // Determinar o contexto: perfil de empresa ou perfil de usuário
  const isEmpresaContext = !!empresa;
  const isUsuarioContext = !!usuario && !empresa;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setErro(null);
      
      try {
        let data = [];
        
        // ✅ CONTEXTO DE USUÁRIO: mostrar posts salvos pelo usuário
        if (isUsuarioContext && usuario?.id) {
          console.log("📚 Carregando posts salvos pelo usuário:", usuario.id);
          
          try {
            // Usar o método de serviço atualizado
            let postsData = await getUserSavedPosts(usuario.id);
            console.log(`✅ Posts salvos encontrados: ${postsData.length}`, postsData);
            
            // ✅ REMOVER DUPLICATAS - Usar um Map para garantir posts únicos
            // Identificar pelo ID do post ou combinação de propriedades únicas
            const uniquePosts = Array.from(
              new Map(postsData.map(post => [post.idPost || post.id, post])).values()
            );
            
            console.log(`✅ Posts após remover duplicatas: ${uniquePosts.length}`, uniquePosts);
            data = uniquePosts;
          } catch (err) {
            console.error("❌ Erro ao buscar posts salvos:", err);
            setErro("Erro ao carregar posts salvos");
          }
        } 
        // ✅ CONTEXTO DE EMPRESA: mostrar posts criados pela empresa
        else if (isEmpresaContext) {
          console.log("📊 Carregando posts criados pela empresa");
          const empresaId = empresa.idEmpresa || empresa.id;
          const response = await axios.get(`http://localhost:3001/api/company/${empresaId}/postagens`);
          
          // ✅ CORRIGIDO: Extrair corretamente as postagens do objeto retornado
          if (response.data && response.data.postagens) {
            data = response.data.postagens;
            console.log(`✅ Encontradas ${data.length} postagens da empresa:`, data);
          } else {
            console.log("⚠️ Não foram encontradas postagens na resposta da API:", response.data);
            data = [];
          }
          
          // Verificamos se o usuário está logado e é o dono da empresa
          const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
          setIsUsuarioLogado(usuarioLogado && (empresa.idUsuario === usuarioLogado.id));
          setVisivel(true); // Posts da empresa são sempre visíveis
        }
        
        setPosts(data);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
        setErro("Não foi possível carregar os posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    
    // Adicionar um timer para recarregar periodicamente
    const intervalId = setInterval(fetchPosts, 30000); // A cada 30 segundos
    
    return () => clearInterval(intervalId); // Limpar o intervalo ao desmontar
  }, [empresa, usuario, isEmpresaContext, isUsuarioContext]);

  // Grid Alternado (código existente)
  function renderMosaic(posts) {
    const rows = [];
    for (let i = 0; i < posts.length; i += 3) {
      const rowPosts = posts.slice(i, i + 3);
      const isEven = Math.floor(i / 3) % 2 === 1;

      if (!isEven) {
        // Linha ímpar: grande à esquerda, dois pequenos à direita
        rows.push(
          <div key={i} className="grid grid-cols-2 grid-rows-4 gap-x-8 gap-y-5 mb-8">
            <div className="row-span-4">
              {rowPosts[0] && <Post post={rowPosts[0]} big />}
            </div>
            <div className="row-span-2">
              {rowPosts[1] && <Post post={rowPosts[1]} small />}
            </div>
            <div className="row-span-2">
              {rowPosts[2] && <Post post={rowPosts[2]} small />}
            </div>
          </div>
        );
      } else {
        // Linha par: dois pequenos à esquerda, grande à direita
        rows.push(
          <div key={i} className="grid grid-cols-2 grid-rows-4 gap-x-8 gap-y-8 mb-8">
            <div className="row-span-2">
              {rowPosts[0] && <Post post={rowPosts[0]} small />}
            </div>
            <div className="row-span-4">
              {rowPosts[2] && <Post post={rowPosts[2]} big />}
            </div>
            <div className="row-span-2">
              {rowPosts[1] && <Post post={rowPosts[1]} small />}
            </div>
          </div>
        );
      }
    }
    return rows;
  }

  const podeVerPosts = visivel || isUsuarioLogado;

  let postsContent;
  
  if (loading) {
    postsContent = (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  } else if (erro) {
    postsContent = (
      <div className="text-center text-red-500 py-12">
        {erro}
      </div>
    );
  } else if (podeVerPosts) {
    if (posts.length > 0) {
      postsContent = <>{renderMosaic(posts)}</>;
    } else {
      postsContent = (
        <div className="text-center text-gray-400 py-12 italic">
          {isEmpresaContext 
            ? "Esta empresa ainda não possui postagens." 
            : "Não há nenhum post salvo no momento."}
        </div>
      );
    }
  } else {
    postsContent = (
      <div className="text-center text-gray-500 py-12">
        Este usuário limita a visibilidade de seus posts salvos.
      </div>
    );
  }

  // ✅ DISTINÇÃO DE TÍTULO E ÍCONE BASEADA NO CONTEXTO
  const titulo = isEmpresaContext ? "Postagens da Empresa" : "Meus Salvos";
  const icone = isEmpresaContext ? (
    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  ) : (
    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z" />
    </svg>
  );

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-2">
        {icone}
        <div className="font-bold text-lg text-gray-700">{titulo}</div>
      </div>
      <hr className="border-gray-300 mb-6" />
      <div>
        {postsContent}
      </div>
    </div>
  );
}

Salvos.propTypes = {
  usuario: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  empresa: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    idEmpresa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    idUsuario: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
