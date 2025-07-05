import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import EmpresasModal from "../components/EmpresasModal";
import SidebarIntro from "../components/SidebarIntro";
import SidebarUsuario from "../components/SidebarUsuario";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NavbarLogado from "../components/Navbar_logado";

export default function HomePublica() {
  const [modalAberto, setModalAberto] = useState(false);
  const [tab, setTab] = useState("recomendadas");
  const [usuario, setUsuario] = useState(null);
  const [carregandoUsuario, setCarregandoUsuario] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsuarioCompleto() {
      const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
      if (usuarioLogado?.id) {
        try {
          const token = sessionStorage.getItem("authToken");
          const res = await fetch(
            `http://localhost:3001/api/users/${usuarioLogado.id}/profile`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );
          if (res.ok) {
            const data = await res.json();
            setUsuario(data);
          } else {
            setUsuario(null);
          }
        } catch {
          setUsuario(null);
        }
      } else {
        setUsuario(null);
      }
      setCarregandoUsuario(false); // Done loading
    }
    fetchUsuarioCompleto();
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

  if (carregandoUsuario) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <p className="text-gray-600 text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <>
      {/* Conditionally render Navbar based on login status */}
      {usuario ? <NavbarLogado usuario={usuario} /> : <Navbar />}

      <div className="min-h-screen bg-green-50 flex flex-col pt-16">
        <div className="container mx-auto px-20 py-6 flex flex-col md:flex-row gap-2 flex-1">
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

          {/* Menu de sugestões */}
          <div className="order-2 md:order-3 w-80 flex-shrink-0 md:block">
            <SugestoesEmpresas
              sugestoes={sugestoesEmpresas}
              onVerTodas={() => setModalAberto(true)}
            />
          </div>

          {/* Feed central */}
          <main className="order-3 md:order-2 flex-1 flex flex-col items-center gap-6">
            {[1, 2].map((i) => (
              <button
                key={i}
                type="button"
                className="bg-white p-4 rounded-xl shadow-md cursor-pointer transition hover:shadow-lg w-full max-w-[520px] text-left"
                onClick={() => navigate("/post")}
                title="Ver post completo"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src="/empresa1.png"
                    className="h-10 w-10 rounded-full"
                    alt="Logo empresa"
                  />
                  <div>
                    <p className="font-semibold text-sm">Relog</p>
                    <p className="text-xs text-gray-500">Promovido</p>
                  </div>
                </div>

                <h3 className="font-semibold text-base mb-2">
                  Uso massivo de aparelhos eletrônicos
                </h3>

                <img
                  src="/post.png"
                  className="w-full rounded-xl object-cover mb-3"
                  alt="Imagem do post"
                />

                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  Com o uso massivo de aparelhos eletrônicos...
                </p>

                <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded mb-3">
                  Doação
                </span>

                <div className="flex items-center justify-between mt-4 text-gray-600">
                  <div className="flex items-center gap-4 text-xl">
                    <button title="Curtir">
                      <Heart className="w-5 h-5 cursor-pointer hover:text-green-700" />
                    </button>
                    <button title="Comentar">
                      <MessageSquare className="w-5 h-5 cursor-pointer hover:text-green-700" />
                    </button>
                    <button title="Compartilhar">
                      <Share2 className="w-5 h-5 cursor-pointer hover:text-green-700" />
                    </button>
                  </div>

                  <button title="Salvar">
                    <Bookmark className="w-5 h-5 cursor-pointer hover:text-green-700" />
                  </button>
                </div>
              </button>
            ))}
          </main>
        </div>

        <EmpresasModal
          open={modalAberto}
          onClose={() => setModalAberto(false)}
          tab={tab}
          setTab={setTab}
          empresasRecomendadas={empresasRecomendadas}
        />

        <Footer />
      </div>
    </>
  );
}
