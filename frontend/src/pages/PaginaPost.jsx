import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "../components/Post";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import EmpresasModal from "../components/EmpresasModal";

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

  // etado para modal
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("recomendadas");

  // empresas para o modal 
  const empresasRecomendadas = sugestoesEmpresas.map((e) => ({
    img: e.logo,
    nome: e.nome,
    desc: "Empresa recomendada para você",
  }));

  return (
    <div className="bg-green-50 min-h-screen py-2">
      <div className="h-12" />
      <main className="flex gap-6 max-w-6xl mx-auto mt-8">
        {/* Sidebar esquerda */}
        <aside className="w-1/4">
          <div className="bg-white rounded-xl shadow p-4 pt-3 pb-6 text-left border border-gray-200">
            <div className="text-[23px] leading-snug mb-6 break-words font-semibold">
              Desde 2025
              <br />
              Conectando empresas
              <br />
              com soluções sustentáveis
              <br />
              de forma simples e eficiente
            </div>
            <Link
              to="/cadastro"
              className="block w-full bg-green-600 text-white py-2 rounded-md text-center font-medium hover:bg-green-700 transition"
            >
              Cadastrar-se →
            </Link>
          </div>
        </aside>

        {/* Conteúdo principal */}
        <section className="flex-1 flex flex-col gap-6">
          <Post post={post} completo comentarios={comentariosMock} />
        </section>

        {/* Sidebar direita */}
        <aside className="w-1/4 space-y-4">
          <SugestoesEmpresas
            sugestoes={sugestoesEmpresas}
            onVerTodas={() => setModalOpen(true)}
          />
        </aside>
      </main>
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