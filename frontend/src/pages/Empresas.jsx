import React, { useState } from "react";

function Empresas() {
  const [showPopup, setShowPopup] = useState(false);

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
              <button className="mt-4 bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 self-start">
                Seguir <span className="text-xl">+</span>
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
                  <button className="border border-green-400 text-green-600 px-3 py-1 rounded-full text-sm hover:bg-green-100">
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
                    <button title="Curtir"><span role="img" aria-label="Curtir">💚</span></button>
                    <button title="Comentar"><span role="img" aria-label="Comentar">💬</span></button>
                    <button title="Compartilhar"><span role="img" aria-label="Compartilhar">🔄</span></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sidebar de empresas sugeridas */}
        <aside className="w-80">
          <div className="bg-white rounded-xl shadow p-4 sticky top-20 z-30">
            <h4 className="font-bold text-lg mb-4">Empresas que talvez você conheça</h4>
            <ul className="space-y-3">
              {empresasRecomendadas.map((empresa, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={empresa.img} alt={empresa.nome} className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="font-semibold">{empresa.nome}</div>
                      <div className="text-xs text-gray-500">{empresa.desc}</div>
                    </div>
                  </div>
                  <button className="border border-blue-400 text-blue-500 px-3 py-1 rounded-full text-sm hover:bg-blue-50">
                    Seguir
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="block text-blue-600 text-sm mt-4 text-right w-full"
              onClick={() => setShowPopup(true)}
            >
              Ver todas
            </button>
          </div>
        </aside>
      </main>

      {/* Popup de empresas sugeridas */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative">
            <button
              className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-gray-700"
              onClick={() => setShowPopup(false)}
              aria-label="Fechar"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Empresas que talvez você conheça</h2>
            <ul className="space-y-6">
              {empresasRecomendadas.map((empresa, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <img src={empresa.img} alt={empresa.nome} className="w-14 h-14 rounded-full bg-white border" />
                  <div className="flex-1">
                    <div className="font-bold">{empresa.nome}</div>
                    <div className="text-gray-600 text-sm">{empresa.desc}</div>
                  </div>
                  <button className="border border-green-400 text-green-700 px-4 py-1 rounded-full text-sm font-semibold hover:bg-green-50">
                    Conectar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Empresas;