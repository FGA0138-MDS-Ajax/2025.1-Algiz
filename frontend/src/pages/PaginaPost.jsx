import { useState, useContext } from "react";
import Post from "../components/Post";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import EmpresasModal from "../components/EmpresasModal";
import SidebarIntro from "../components/SidebarIntro";
import SidebarUsuario from "../components/SidebarUsuario";
import { AuthContext } from "../context/AuthContext"; // ✅ NEW

const sugestoesEmpresas = [
  { id: "1", nome: "Cacau Show", logo: "/cacau.png" },
  { id: "2", nome: "Nestle", logo: "/nestle.png" },
  { id: "3", nome: "Lacta", logo: "/lacta.png" },
  { id: "4", nome: "Coca Cola", logo: "/coca.png" },
  { id: "5", nome: "Terra verde", logo: "/empresa9.png" },
  { id: "6", nome: "Kactus", logo: "/empresa10.png" },
];

const comentariosMock = [
  {
    id: 1,
    nome: "Isaac Newton",
    avatar: "/user/foto-perfil-padrao-1.png",
    texto: "Muito importante esse tema! Parabéns pela iniciativa.",
  },
  {
    id: 2,
    nome: "Ada Lovelace",
    avatar: "/user/foto-perfil-padrao-2.png",
    texto: "Precisamos de mais ações como essa no Brasil.",
  },
  {
    id: 3,
    nome: "Nikola Tesla",
    avatar: "/user/foto-perfil-padrao-2.png",
    texto: "Excelente conteúdo, obrigado por compartilhar!",
  },
];

export default function PaginaPost() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("recomendadas");

  const { usuario } = useContext(AuthContext); // ✅ use context instead of custom hook

  const post = {
    empresaNome: "Relog",
    empresaLogo: "/empresa1.png",
    titulo: "Uso massivo de aparelhos eletrônicos",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a libero urna...",
    imagem: "/post.png",
    tags: ["Doação", "Sustentabilidade"],
  };

  const empresasRecomendadas = sugestoesEmpresas.map((e) => ({
    img: e.logo,
    nome: e.nome,
    desc: "Empresa recomendada para você",
  }));

  return (
    <div className="bg-green-50 min-h-screen pt-16">
      <div className="container mx-auto px-20 py-6 flex flex-col md:flex-row gap-1 flex-1">
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
          <Post post={post} completo comentarios={comentariosMock} />
        </section>

        {/* Sugestões de empresas */}
        <aside className="order-2 md:order-3 w-80 flex-shrink-0 md:block">
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
