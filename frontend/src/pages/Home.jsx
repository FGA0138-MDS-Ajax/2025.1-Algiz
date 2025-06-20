import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import EmpresasModal from "../components/EmpresasModal";
import SidebarIntro from "../components/SidebarIntro";
import Post from "../components/Post";

export default function HomePublica() {
  const [modalAberto, setModalAberto] = useState(false);
  const [tab, setTab] = useState("recomendadas");
  const navigate = useNavigate();

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
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6 flex-1">
        {/* Sidebar esquerda */}
        <div className="order-1 md:order-1 w-full md:w-1/4 flex-shrink-0">
          <div className="sticky top-20">
            <SidebarIntro />
          </div>
        </div>

        {/* Menu de sugestões */}
        <div className="order-2 md:order-3 w-full md:w-1/4 flex-shrink-0 md:block">
          <SugestoesEmpresas
            sugestoes={sugestoesEmpresas}
            onVerTodas={() => setModalAberto(true)}
          />
        </div>
        {/* Feed central */}
        <main className="order-3 md:order-2 flex-1 flex flex-col items-center gap-6">
          {[1, 2].map((i) => (
            <Post
              key={i}
              big={true} // Tamanho do post Big 
              post={{
                titulo: "Uso massivo de aparelhos eletrônicos",
                descricao: "Com o uso massivo de aparelhos eletrônicos...",
                imagem: "/post.png",
                empresaLogo: "/empresa1.png",
                empresaNome: "Relog",
                tags: ["Doação"],
              }}
            />
          ))}
        </main>
      </div>

      {/* Modal */}
      <EmpresasModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        tab={tab}
        setTab={setTab}
        empresasRecomendadas={empresasRecomendadas}
      />

      {/* Rodapé */}
      <footer className="text-center text-sm text-gray-600 py-4 mt-auto bg-white border-t">
        ©2025 EcoNet. Todos os direitos reservados.
      </footer>
    </div>
  );
}
