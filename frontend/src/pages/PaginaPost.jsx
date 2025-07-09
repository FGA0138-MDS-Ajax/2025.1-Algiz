import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import EmpresasModal from "../components/EmpresasModal";
import SidebarIntro from "../components/SidebarIntro";
import SidebarUsuario from "../components/SidebarUsuario";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const sugestoesEmpresas = [
  { id: "1", nome: "Cacau Show", logo: "/cacau.png" },
  { id: "2", nome: "Nestle", logo: "/nestle.png" },
  { id: "3", nome: "Lacta", logo: "/lacta.png" },
  { id: "4", nome: "Coca Cola", logo: "/coca.png" },
  { id: "5", nome: "Terra verde", logo: "/empresa9.png" },
  { id: "6", nome: "Kactus", logo: "/empresa10.png" },
];

export default function PaginaPost() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("recomendadas");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comentarios, setComentarios] = useState([]);

  const { usuario } = useContext(AuthContext);
  const { id } = useParams(); // Capturar o ID do post da URL
  const navigate = useNavigate();

  // Carregar o post baseado no ID
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError("ID do post não fornecido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/api/posts/${id}`);

        if (response.data) {
          setPost(response.data);
          console.log("✅ Post carregado:", response.data);

          // Carregar comentários se disponíveis
          if (response.data.comentarios) {
            setComentarios(response.data.comentarios);
          }
        } else {
          setError("Post não encontrado");
        }
      } catch (error) {
        console.error("Erro ao carregar o post:", error);
        setError("Erro ao carregar o post. Verifique se o ID é válido.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const empresasRecomendadas = sugestoesEmpresas.map((e) => ({
    img: e.logo,
    nome: e.nome,
    desc: "Empresa recomendada para você",
  }));

  // Renderizar mensagem de carregamento
  if (loading) {
    return (
      <div className="bg-green-50 min-h-screen pt-16 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Carregando post..." />
      </div>
    );
  }

  // Renderizar mensagem de erro
  if (error) {
    return (
      <div className="bg-green-50 min-h-screen pt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              {error}
            </h2>
            <p className="mb-6">
              O post que você está procurando pode ter sido removido ou não existe.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Voltar para a página inicial
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 min-h-screen pt-16">
      <div className="container mx-auto px-4 md:px-20 py-6 flex flex-col md:flex-row gap-1 flex-1">
        {/* Sidebar esquerda */}
        <div className="order-1 md:order-1 w-full md:w-1/5 flex-shrink-0">
          <div className="sticky top-20">
            {usuario ? (
              <SidebarUsuario usuario={usuario} />
            ) : (
              <SidebarIntro />
            )}
          </div>
        </div>

        {/* Conteúdo principal */}
        <section className="order-3 md:order-2 flex-1 flex flex-col max-w-[520px] mx-auto items-center gap-30">
          {post && <Post post={post} completo comentarios={comentarios} />}
        </section>

        {/* Sugestões de empresas */}
        <aside className="order-2 md:order-3 w-full md:w-80 flex-shrink-0 md:block">
          <SugestoesEmpresas
            sugestoes={sugestoesEmpresas}
            onVerTodas={() => setModalOpen(true)}
          />
        </aside>
      </div>

      <EmpresasModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tab={tab}
        setTab={setTab}
        empresasRecomendadas={empresasRecomendadas}
      />
    </div>
  );
}
