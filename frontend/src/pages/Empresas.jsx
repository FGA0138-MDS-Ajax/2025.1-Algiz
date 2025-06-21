import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import EmpresasModal from "../components/EmpresasModal";

// Lista fake de sugestões
const sugestoesEmpresas = [
  { id: "1", nome: "Cacau Show", logo: "/cacau.png" },
  { id: "2", nome: "Nestle", logo: "/nestle.png" },
  { id: "3", nome: "Lacta", logo: "/lacta.png" },
  { id: "4", nome: "Coca Cola", logo: "/coca.png" },
  { id: "5", nome: "Terra verde", logo: "/empresa9.png" },
  { id: "6", nome: "Kactus", logo: "/empresa10.png" },
];

function Empresas() {
  const navigate = useNavigate();
  const { idEmpresa } = useParams();

  const [empresa, setEmpresa] = useState(null);
  const [seguindo, setSeguindo] = useState(false);
  const [reacoes, setReacoes] = useState([
    { like: false, comment: false, share: false },
    { like: false, comment: false, share: false },
    { like: false, comment: false, share: false },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("recomendadas");

  useEffect(() => {
    if (idEmpresa) {
      try {
        const empresas = JSON.parse(sessionStorage.getItem("fakeEmpresas")) || [];
        const emp = empresas.find((e) => e.id === idEmpresa);
        setEmpresa(emp || null);
      } catch {
        setEmpresa(null);
      }
    }
  }, [idEmpresa]);

  const empresasRecomendadas = sugestoesEmpresas.map((e) => ({
    nome: e.nome,
    img: e.logo,
    desc: "Empresa recomendada para você",
  }));

  return (
    <div className="bg-green-50 min-h-screen py-2">
      <div className="h-12" />
      <main className="flex gap-6 max-w-6xl mx-auto mt-8">
        {/* Perfil da Empresa */}
        <section className="flex-1">
          <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
            <div className="relative">
              <img
                src={empresa?.banner || "/user/banner-padrao-1.png"}
                alt="Banner da empresa"
                className="w-full h-40 object-cover"
              />
              <img
                src={empresa?.logo || "/user/foto-perfil-padrao-empresa.png"}
                alt="Logo Empresa"
                className="w-32 h-32 rounded-full border-4 border-white shadow absolute left-8 -bottom-16 bg-white"
                style={{ top: "96px" }}
              />
            </div>
            <div className="pt-20 pb-6 px-6">
              <h2 className="text-3xl font-bold">
                {idEmpresa && empresa ? empresa.nome : "Nome da empresa"}
              </h2>
              <p className="text-gray-600">
                Email: {empresa?.email || "emaildousuario@econet.com"}
              </p>
              <p className="text-gray-600">
                Contato: {empresa?.contato || "(85) 9 ########"}
              </p>
              <p className="text-gray-500">
                {empresa?.endereco || "Brasília, Distrito Federal"}
              </p>
            </div>
          </div>

          {/* Seguidores e seguir */}
          <div className="flex gap-4 mt-4">
            <div className="flex-1 bg-green-50 rounded-xl p-4 flex items-center gap-4 shadow sticky top-8 z-20">
              <div>
                <div className="font-bold text-lg">Seguidores</div>
                <div className="text-gray-600 text-sm">Usuários que estão me seguindo</div>
                <div className="flex items-center gap-2 mt-2">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Seguidor" className="w-8 h-8 rounded-full border" />
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Seguidor" className="w-8 h-8 rounded-full border -ml-2" />
                  <span className="font-semibold text-gray-700 ml-2">20+</span>
                  <a href="#" className="text-blue-600 text-xs ml-2">Ver todos</a>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-green-50 rounded-xl p-4 flex flex-col justify-between shadow">
              <div>
                <div className="font-bold text-lg">Seguir</div>
                <div className="text-gray-600 text-sm">
                  Siga essa empresa e fique por dentro de todas as postagens
                </div>
              </div>
              <button
                className={`mt-4 px-6 py-2 rounded-full cursor-pointer group font-medium flex items-center gap-2 self-start text-white text-lg transition-colors ${seguindo ? "bg-green-600" : "bg-green-400 hover:bg-green-500"
                  }`}
                onClick={() => setSeguindo((prev) => !prev)}
              >
                {seguindo ? "Deixar de seguir" : "Seguir"}{" "}
                <span className="text-xl">{seguindo ? "✓" : "+"}</span>
              </button>
            </div>
          </div>

          {/* Sobre a empresa */}
          <div className="bg-white rounded-xl shadow p-6 mt-6">
            <h3 className="font-bold text-xl mb-2">Sobre a empresa</h3>
            <p className="text-gray-700 text-sm">
              {empresa?.descricao ||
                "Essa empresa ainda não cadastrou uma descrição."}
            </p>
          </div>

          {/* Postagens da empresa */}
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">Postagens da empresa</h3>
            <hr className="mb-6 border-gray-800" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition"
                  onClick={() => navigate("/post")}
                  title="Ver post completo"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src="/empresa1.png"
                      alt="Logo"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-semibold text-sm">Relog</div>
                      <div className="text-xs text-gray-400">Promovido</div>
                    </div>
                  </div>
                  <div className="font-bold mb-2">Uso massivo de aparelhos eletrônicos</div>
                  {i === 1 && (
                    <img
                      src="/post.png"
                      alt="Post"
                      className="rounded-xl mb-2"
                    />
                  )}
                  <div className="text-gray-600 text-sm mb-2">
                    Com o uso massivo de aparelhos eletrônicos simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a...
                  </div>
                  <div className="flex items-center justify-between mt-4 text-gray-600">
                    {/* Left side icons */}
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

                    {/* Right side: save icon */}
                    <button title="Salvar">
                      <Bookmark className="w-5 h-5 cursor-pointer hover:text-green-700" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar de sugestões */}
        <aside className="w-80">
          <SugestoesEmpresas
            sugestoes={sugestoesEmpresas}
            onVerTodas={() => setModalOpen(true)}
          />
        </aside>
      </main>

      {/* Modal de sugestões */}
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

export default Empresas;
