import React, { useState, useEffect } from "react";

function Empresas() {
  const [showPopup, setShowPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [tab, setTab] = useState("area");
  const [seguindo, setSeguindo] = useState(false);
  // Estados para animação dos botões de cada post
  const [reacoes, setReacoes] = useState([
    { like: false, comment: false, share: false },
    { like: false, comment: false, share: false },
    { like: false, comment: false, share: false },
  ]);

  const empresasArea = [
    {
      nome: "Cacau Show",
      desc: "É uma marca de chocolates nacional, fundada em 1988.",
      img: "/empresa5.png",
    },
    {
      nome: "Nestle",
      desc: "Nestlé S.A. é uma empresa transnacional suíça do setor de alimentos e bebidas",
      img: "/empresa6.png",
    },
    {
      nome: "Lacta",
      desc: "Lacta é uma empresa brasileira fabricante de chocolates fundada em 1912.",
      img: "/empresa7.png",
    },
    {
      nome: "Coca Cola",
      desc: "A marca é reconhecida mundialmente pela sua bebida icônica",
      img: "/empresa8.png",
    },
    {
      nome: "Lacta",
      desc: "Lacta é uma empresa brasileira fabricante de chocolates fundada em 1912.",
      img: "/empresa7.png",
    },
    {
      nome: "Coca Cola",
      desc: "A marca é reconhecida mundialmente pela sua bebida icônica",
      img: "/empresa8.png",
    },
    {
      nome: "Lacta",
      desc: "Lacta é uma empresa brasileira fabricante de chocolates fundada em 1912.",
      img: "/empresa7.png",
    },
    {
      nome: "Coca Cola",
      desc: "A marca é reconhecida mundialmente pela sua bebida icônica",
      img: "/empresa8.png",
    },
  ];

  const empresasRecomendadas = [
    {
      nome: "Cacau Show",
      desc: "É uma marca de chocolates nacional, fundada em 1988.",
      img: "/empresa5.png",
    },
    {
      nome: "Nestle",
      desc: "Nestlé S.A. é uma empresa transnacional suíça do setor de alimentos e bebidas",
      img: "/empresa6.png",
    },
    {
      nome: "Lacta",
      desc: "Lacta é uma empresa brasileira fabricante de chocolates fundada em 1912.",
      img: "/empresa7.png",
    },
    {
      nome: "Coca Cola",
      desc: "A marca é reconhecida mundialmente pela sua bebida icônica",
      img: "/empresa8.png",
    },
    {
      nome: "Terra verde",
      desc: "Empresa do setor ambiental",
      img: "/empresa9.png",
    },
    {
      nome: "Kactus",
      desc: "Empresa de soluções sustentáveis",
      img: "/empresa10.png",
    },
  ];
  const todasEmpresas = [...empresasArea, ...empresasRecomendadas];

  // Função para alternar o estado dos emojis
  const handleReacao = (idx, tipo) => {
    setReacoes((prev) =>
      prev.map((r, i) =>
        i === idx ? { ...r, [tipo]: !r[tipo] } : r
      )
    );
  };
  const [empresasSeguidas, setEmpresasSeguidas] = useState(Array(empresasRecomendadas.length).fill(false));
  const [empresasConectadas, setEmpresasConectadas] = useState(Array(todasEmpresas.length).fill(false));

  useEffect(() => {
    if (showPopup || showProfilePopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showPopup, showProfilePopup]);
  const empresasLista = tab === "area" ? empresasArea : empresasRecomendadas;
  const offset = tab === "area" ? 0 : empresasArea.length;

  return (
    <div className="bg-green-50 min-h-screen py-2">
      <div className="h-12" />
      <main className="flex gap-6 max-w-6xl mx-auto mt-8">
        {/* Perfil da Empresa */}
        <section className="flex-1">
          <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
            {/* Banner */}
            <div className="relative">
              <img
                src="/user/banner-padrao-1.png"
                alt="Banner da empresa"
                className="w-full h-40 object-cover"
              />
              {/* Avatar sobreposto ao banner */}
              <img
                src="/user/foto-perfil-padrao-empresa.png"
                alt="Logo Empresa"
                className="w-32 h-32 rounded-full border-4 border-white shadow absolute left-8 -bottom-16 bg-white"
                style={{ top: '96px' }}
              />
            </div>
            {/* Informações da empresa */}
            <div className="pt-20 pb-6 px-6">
              <h2 className="text-3xl font-bold">Nome do empresa</h2>
              <p className="text-gray-600">Email: emaildousuario@econet.com</p>
              <p className="text-gray-600">Contato: (85) 9 ########</p>
              <p className="text-gray-500">Endereço do usuário vai aqui, Brasília, Distrito Federal</p>
            </div>
          </div>

          {/* Seguidores e Seguir */}
          <div className="flex gap-4 mt-4">
            {/* Caixa de Seguidores fixa */}
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
                <div className="text-gray-600 text-sm">Siga essa empresa e fique por dentro de todas as postagens</div>
              </div>
              <button
                className={`mt-4 px-6 py-2 rounded-full cursor-pointer group font-medium flex items-center gap-2 self-start text-white text-lg transition-colors
                  ${seguindo ? "bg-green-600" : "bg-green-400 hover:bg-green-500"}`}
                onClick={() => setSeguindo((prev) => !prev)}
              >
                {seguindo ? "Deixar de seguir" : "Seguir"} <span className="text-xl">{seguindo ? "✓" : "+"}</span>
              </button>
            </div>
          </div>

          {/* Sobre a empresa */}
          <div className="bg-white rounded-xl shadow p-6 mt-6">
            <h3 className="font-bold text-xl mb-2">Sobre a empresa</h3>
            <p className="text-gray-700 text-sm">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </p>
          </div>

          {/* Usuários vinculados */}
          <div className="bg-white rounded-xl shadow p-6 mt-6">
            <h3 className="font-bold text-lg mb-4">Usuários vinculados</h3>
            <div className="flex gap-4 flex-wrap">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-green-50 rounded-xl p-4 flex flex-col items-center w-60 shadow">
                  <img src="/user/foto-perfil-padrao-1.png" alt="Usuário" className="w-16 h-16 rounded-full mb-2" />
                  <div className="font-semibold">Nome do usuário</div>
                  <div className="text-gray-500 text-sm">Cargo/função</div>
                  <div className="text-gray-400 text-xs mb-2">25/05/2025 - Presente</div>
                  <button className="border border-green-400 text-green-600 px-3 py-1 cursor-pointer group rounded-full text-sm hover:bg-green-100">
                    Perfil Usuário
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Postagens da empresa */}
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4">Postagens da empresa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img src="https://img.freepik.com/vetores-gratis/arvore-colorida-com-folhas-de-outono_23-2147511406.jpg" alt="Logo" className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="font-semibold text-sm">Relog</div>
                      <div className="text-xs text-gray-400">Promovido</div>
                    </div>
                  </div>
                  <div className="font-bold mb-2">Uso massivo de aparelhos eletrônicos</div>
                  {i === 1 && (
                    <img
                      src="https://img.freepik.com/vetores-gratis/fundo-gradiente-verde_23-2149337535.jpg"
                      alt="Post"
                      className="rounded-xl mb-2"
                    />
                  )}
                  <div className="text-gray-600 text-sm mb-2">
                    Com o uso massivo de aparelhos eletrônicos simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a...
                  </div>
                  <div className="flex gap-4 text-gray-500 text-xl mt-2">
                    <button
                      title="Curtir"
                      onClick={() => handleReacao(i - 1, "like")}
                      className={`transition-all duration-200 cursor-pointer group${reacoes[i - 1]?.like ? "text-green-500 scale-125" : "hover:text-green-400"
                        }`}
                    >
                      <span role="img" aria-label="Curtir">💚</span>
                    </button>
                    <button
                      title="Comentar"
                      onClick={() => handleReacao(i - 1, "comment")}
                      className={`transition-all duration-200 cursor-pointer group${reacoes[i - 1]?.comment ? "text-blue-500 scale-125" : "hover:text-blue-400"
                        }`}
                    >
                      <span role="img" aria-label="Comentar">💬</span>
                    </button>
                    <button
                      title="Compartilhar"
                      onClick={() => handleReacao(i - 1, "share")}
                      className={`transition-all duration-200 cursor-pointer group${reacoes[i - 1]?.share ? "text-yellow-500 scale-125" : "hover:text-yellow-400"
                        }`}
                    >
                      <span role="img" aria-label="Compartilhar">🔄</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar de empresas sugeridas */}
        <aside className="w-80">
          <div className="bg-white rounded-xl shadow-lg p-4 sticky top-20 z-30">
            <h4 className="font-bold text-lg mb-4">Empresas que talvez você conheça</h4>
            <ul className="space-y-3">
              {empresasRecomendadas.map((empresa, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <img src={empresa.img} alt={empresa.nome} className="w-10 h-10 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold">{empresa.nome}</div>
                    <div className="text-xs text-gray-500 line-clamp-2">{empresa.desc}</div>
                  </div>
                  <button
                    className={`ml-1 border px-4 py-1 cursor-pointer group rounded-full text-sm font-semibold transition-colors min-w-[90px] text-center
                      ${empresasSeguidas[idx]
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-blue-400 text-blue-500 hover:bg-blue-100"}
                      `}
                    onClick={() => {
                      setEmpresasSeguidas((prev) =>
                        prev.map((v, i) => (i === idx ? !v : v))
                      );
                    }}
                  >
                    {empresasSeguidas[idx] ? "Seguindo" : "Seguir"}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="block text-blue-600 text-sm mt-9 text-center w-full cursor-pointer group hover:bg-blue-50 px-4 py-2 rounded-full   transition-colors"
              onClick={() => setShowPopup(true)}
            >
              Ver todas
            </button>
          </div>
        </aside>
      </main>

      {/* Popup de empresas sugeridas */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-hidden">
          <div
            className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative"
            style={{ maxHeight: "90vh", minHeight: "90vh", overflow: "hidden" }}
          >
            <button
              className="absolute font-bold top-4 right-6 text-2xl text-gray-400 hover:text-gray-700 cursor-pointer group"
              onClick={() => setShowPopup(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Empresas que talvez você conheça</h2>
            {/* Barra de navegação */}
            <div className="flex gap-8 mb-6 mt-2 border-b-2 border-gray-200">
              <button
                className={`pb-2 font-semibold ${tab === "recomendadas"
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-700 border-b-2 border-transparent hover:border-green-700 hover:text-green-700"
                  } transition-colors cursor-pointer group`}
                onClick={() => setTab("recomendadas")}
              >
                As mais recomendadas
              </button>
              <button
                className={`pb-2 font-semibold ${tab === "area"
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-700 border-b-2 border-transparent hover:border-green-700 hover:text-green-700"
                  } transition-colors cursor-pointer group`}
                onClick={() => setTab("area")}
              >
                Da sua área de interesse...
              </button>
            </div>
            {/* Conteúdo com rolagem apenas na caixa */}
            <div className="overflow-y-auto pr-5" style={{ maxHeight: "71vh" }}>
              <ul className="space-y-6">
                {empresasLista.map((empresa, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <img src={empresa.img} alt={empresa.nome} className="w-14 h-14 rounded-full bg-white border" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold">{empresa.nome}</div>
                      <div className="text-gray-600 text-sm line-clamp-2">{empresa.desc}</div>
                    </div>
                    <button
                      className={`border-2 px-5 py-1 rounded-full text-sm font-semibold transition-colors min-w-[110px] text-center
                        ${empresasConectadas[idx]
                          ? "bg-green-600 border-green-600 text-white"
                          : "border-green-600 text-green-600 hover:bg-green-50"}
                        `}
                      onClick={() => {
                        setEmpresasConectadas((prev) =>
                          prev.map((v, i) => (i === idx + offset ? !v : v))
                        );
                      }}
                    >
                      {empresasConectadas[idx + offset] ? "Conectado" : "Conectar"}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Empresas;