import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import EmpresasModal from "../components/EmpresasModal";
import SidebarIntro from "../components/SidebarIntro";
import SidebarUsuario from "../components/SidebarUsuario";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePublica() {
  const [modalAberto, setModalAberto] = useState(false);
  const [tab, setTab] = useState("recomendadas");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  // Buscar todos os posts quando a página carregar
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/api/posts");
        
        if (response.data) {
          console.log("✅ Resposta da API:", response.data);
          // Correção: extrair o array de posts da resposta
          const postsArray = response.data.posts || [];
          console.log("✅ Posts extraídos:", postsArray);
          setPosts(postsArray);
        }
      } catch (error) {
        console.error("❌ Erro ao carregar posts:", error);
        setError("Não foi possível carregar os posts. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const sugestoesEmpresas = [
    { id: "1", nome: "Cacau Show", logo: "/cacau.png" },
    { id: "2", nome: "Nestle", logo: "/nestle.png" },
    { id: "3", nome: "Lacta", logo: "/lacta.png" },
    { id: "4", nome: "Coca Cola", logo: "/coca.png" },
    { id: "5", nome: "Terra verde", logo: "/empresa9.png" },
    { id: "6", nome: "Kactus", logo: "/empresa10.png" },
  ];

  const empresasRecomendadas = sugestoesEmpresas.map((e) => ({
    nome: e.nome,
    img: e.logo,
    desc: "Empresa recomendada para você",
  }));

  return (
    <div className="min-h-screen bg-green-50 flex flex-col pt-16">
      <div className="container mx-auto px-4 md:px-20 py-6 flex flex-col md:flex-row gap-1 flex-1">
        {/* Sidebar esquerda */}
        <div className="order-1 md:order-1 w-full md:w-1/5 flex-shrink-0">
          <div className="sticky top-20">
            {usuario ? <SidebarUsuario usuario={usuario} /> : <SidebarIntro />}
          </div>
        </div>

        {/* Feed central - Corrigido para posts mais altos e menos largos */}
        <main className="order-3 md:order-2 flex-1 flex flex-col max-w-[450px] mx-auto items-center gap-6">
          {loading ? (
            <LoadingSpinner size="lg" message="Carregando posts..." />
          ) : error ? (
            <div className="bg-white p-6 rounded-xl shadow-md text-center w-full">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Tentar novamente
              </button>
            </div>
          ) : posts.length > 0 ? (
            <div className="flex flex-col w-full gap-8">
              {/* Posts com proporções ajustadas */}
              {posts.map((post, index) => (
                <div 
                  key={post.id || index} 
                  className="min-h-[450px] w-full"
                >
                  <Post 
                    post={post}
                    completo={false}
                    big={true}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-md text-center w-full">
              <p className="text-gray-500">Nenhum post encontrado.</p>
            </div>
          )}
        </main>

        {/* Menu de sugestões */}
        <div className="order-2 md:order-3 w-full md:w-80 flex-shrink-0 md:block">
          <SugestoesEmpresas
            sugestoes={sugestoesEmpresas}
            onVerTodas={() => setModalAberto(true)}
          />
        </div>
      </div>

      <EmpresasModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        tab={tab}
        setTab={setTab}
        empresasRecomendadas={empresasRecomendadas}
      />
    </div>
  );
}