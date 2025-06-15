import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThumbsUp, MessageSquare, Share2, Bookmark } from 'lucide-react';

export default function HomePublica() {
  const [modalAberto, setModalAberto] = useState(false);
  const navigate = useNavigate();

  const empresas = [
    { nome: 'Cacau Show', descricao: 'É uma marca de chocolates nacional, fundada em 1988.', logo: '/cacau.png' },
    { nome: 'Nestle', descricao: 'É uma empresa transnacional suíça do setor de alimentos e bebidas.', logo: '/nestle.png' },
    { nome: 'Lacta', descricao: 'É uma empresa brasileira fabricante de chocolates fundada em 1912.', logo: '/lacta.png' },
    { nome: 'CocaCola', descricao: 'A marca é reconhecida mundialmente pela sua bebida icônica', logo: '/coca.png' },
  ];

  return (
    <div className="min-h-screen bg-green-50 flex flex-col pt-16">
      <div className="container mx-auto px-4 py-6 flex gap-6 flex-1">
        {/* Lateral esquerda */}
        <aside className="w-1/4 space-y-4">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <h2 className="text-xl font-semibold leading-snug">Desde 2025<br />Conectando empresas<br />com soluções sustentáveis<br />de forma simples e eficiente</h2>
            <Link to="/cadastro" className="inline-block mt-4 bg-green-600 text-white py-2 px-6 rounded-xl hover:bg-green-700">Cadastrar-se →</Link>
          </div>
        </aside>

        {/* Conteúdo central */}
        <main className="flex-1 space-y-6">
          <div
            className="bg-white p-4 rounded-xl shadow-xl border borde-gray-200 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate("/post")}
            title="Ver post completo"
          >
            <div className="flex items-center gap-2">
              <img src="/empresa1.png" className="h-10 w-10 rounded-full" />
              <div>
                <p className="font-semibold">Relog</p>
                <p className="text-sm text-gray-500">Promovido</p>
              </div>
            </div>
            <h3 className="font-bold mt-2">Uso massivo de aparelhos eletrônicos</h3>
            <img src="/post.png" className="w-full rounded-lg my-4" />
            <p className="text-sm text-gray-700">Com o uso massivo de aparelhos eletrônicos...</p>
            <span className="inline-block mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Doação</span>
            <div className="flex justify-around mt-4 text-gray-700">
              <button><ThumbsUp className="w-5 h-5 hover:text-green-900" /></button>
              <button><MessageSquare className="w-5 h-5 hover:text-green-900" /></button>
              <button><Share2 className="w-5 h-5 hover:text-green-900" /></button>
              <button><Bookmark className="w-5 h-5 hover:text-green-900" /></button>
            </div>
          </div>

          <div
            className="bg-white p-4 rounded-xl shadow-xl borde borde-gray-200 cursor-pointer hover:shadow-lg transition"
            onClick={() => navigate("/post")}
            title="Ver post completo"
          >
            <div className="flex items-center gap-2">
              <img src="/empresa1.png" className="h-10 w-10 rounded-full" />
              <div>
                <p className="font-semibold">Relog</p>
                <p className="text-sm text-gray-500">Promovido</p>
              </div>
            </div>
            <h3 className="font-bold mt-2">Uso massivo de aparelhos eletrônicos</h3>
            <p className="text-sm text-gray-700">Com o uso massivo de aparelhos eletrônicos...</p>
            <div className="flex justify-around mt-4 text-gray-700">
              <button><ThumbsUp className="w-5 h-5 hover:text-green-900" /></button>
              <button><MessageSquare className="w-5 h-5 hover:text-green-900" /></button>
              <button><Share2 className="w-5 h-5 hover:text-green-900" /></button>
              <button><Bookmark className="w-5 h-5 hover:text-green-900" /></button>
            </div>
          </div>
        </main>

        {/* Sidebar direita */}
        <aside className="w-1/4 space-y-4">
          <div className="bg-white rounded-xl shadow p-4">
            <h3 className="font-semibold mb-4">Empresas que talvez você conheça</h3>
            {empresas.map(e => (
              <div key={e.nome} className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <img src={e.logo} alt={e.nome} className="h-6 w-6 rounded-full" />
                  <span className="text-sm capitalize">{e.nome}</span>
                </div>
                <button className="text-sm text-blue-600 border border-blue-600 px-2 py-0.5 rounded-full hover:bg-blue-50">Seguir</button>
              </div>
            ))}
            <button
              onClick={() => setModalAberto(true)}
              className="text-sm text-blue-600 mt-4 hover:underline block text-center w-full"
            >Ver todas</button>
          </div>
        </aside>
      </div>

       {/* Modal */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Empresas que talvez você conheça</h2>
              <button onClick={() => setModalAberto(false)}>✕</button>
            </div>
            <h3 className="text-green-700 font-semibold mb-4">As mais recomendadas</h3>
            {empresas.map(e => (
              <div key={e.nome} className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <img src={e.logo} className="h-8 w-8 rounded-full" />
                  <div>
                    <p className="font-medium">{e.nome}</p>
                    <p className="text-sm text-gray-600">{e.descricao}</p>
                  </div>
                </div>
                <button className="text-sm text-green-700 border border-green-700 px-3 py-1 rounded-full hover:bg-green-50">Seguir</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rodapé */}
      <footer className="text-center text-sm text-gray-600 py-4 mt-auto bg-white border-t">
        ©2025 EcoNet. Todos os direitos reservados.
      </footer>
    </div>
  );
}
