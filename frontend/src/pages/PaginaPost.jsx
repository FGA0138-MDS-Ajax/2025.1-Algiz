import { useState, useEffect } from "react";
import Post from "../components/Post";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import EmpresasModal from "../components/EmpresasModal";
import SidebarIntro from "../components/SidebarIntro";
import SidebarUsuario from "../components/SidebarUsuario";
import Footer from "../components/Footer";

// fake empresas
const sugestoesEmpresas = [
  { id: "1", nome: "Cacau Show", logo: "/cacau.png" },
  { id: "2", nome: "Nestle", logo: "/nestle.png" },
  { id: "3", nome: "Lacta", logo: "/lacta.png" },
  { id: "4", nome: "Coca Cola", logo: "/coca.png" },
  { id: "5", nome: "Terra verde", logo: "/empresa9.png" },
  { id: "6", nome: "Kactus", logo: "/empresa10.png" },
];

// fake comentarios
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
  // Se quiser buscar o post pelo id via rota, descomente:
  // const { idPost } = useParams();

  // Estado para modal
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("recomendadas");

  // Usuário completo do backend
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function fetchUsuarioCompleto() {
      const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
      if (usuarioLogado?.id) {
        try {
          const token = sessionStorage.getItem("authToken");
          const res = await fetch(
            `http://localhost:3001/api/usuario/${usuarioLogado.id}`,
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
    }
    fetchUsuarioCompleto();
  }, []);

  // Mock de post
  const post = {
    empresaNome: "Relog",
    empresaLogo: "/empresa1.png",
    titulo: "Uso massivo de aparelhos eletrônicos",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a libero urna. Vivamus sagittis ligula et euismod malesuada. Integer ullamcorper sem id lacus scelerisque eleifend. Curabitur faucibus ex tempus auctor posuere. Integer commodo sed sem sed ultricies. Ut pharetra posuere massa eget dignissim. Mauris tempor magna eu elementum faucibus. In hac habitasse platea dictumst. Aenean ac malesuada odio. Morbi maximus libero sit amet fermentum sagittis. Aenean ut nulla in erat feugiat egestas ut sed ligula. Cras semper egestas tempus. Proin tincidunt, eros sit amet tincidunt dictum, tortor risus egestas felis, in ullamcorper felis dolor quis justo. Maecenas pharetra accumsan velit id blandit. Phasellus at mauris condimentum, sollicitudin nisi nec, accumsan magna. Aliquam ut tortor a dui facilisis pulvinar ac quis magna. Nam et bibendum quam, eu vehicula mi. Nam pulvinar congue libero, eu fermentum magna pretium vel. Cras eleifend turpis in feugiat luctus. Integer vel iaculis ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent dignissim tristique libero eu interdum. Aenean pharetra interdum quam, id dapibus ligula eleifend consequat. Fusce tempus tortor vel nibh tempor interdum. Donec pretium suscipit mollis. Ut pellentesque velit eget leo ullamcorper laoreet. Etiam at magna lectus. Aliquam massa arcu, convallis eu augue vel, semper rutrum tortor. Nulla interdum ut justo et lobortis. Sed feugiat quam libero, sit amet eleifend felis molestie in. Proin tempor dapibus neque sit amet vehicula. Quisque vitae mi augue. ",
    imagem: "/post.png",
    tags: ["Doação", "Sustentabilidade"],
  };

  // empresas para o modal 
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

        {/* Menu de sugestões */}
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
      {/* Footer */}
      <Footer />
    </div>
  );
}