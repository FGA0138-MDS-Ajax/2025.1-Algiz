import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-green-50">

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Conectando empresas<br />
            com soluções sustentáveis<br />
            de forma simples e<br />
            eficiente
          </h1>
          <p className="text-gray-700 text-lg max-w-xl">
            Nossa missão é ajudar sua empresa a estabelecer conexões mais verde. Faça parcerias com outras organizações e garanta um futuro mais sustentável com base em práticas ESG.
          </p>
          <Link to="/cadastro" className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl text-lg fount-medium hover:bg-green-700 transition">
            Cadastrar-se
          </Link>
        </div>
        <div>
          <img src="/hero_home_image.png" alt="Ilustração Conexão Sustentável" className="w-full max-w-lg mx-auto" />
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="container mx-auto px-6 py-20 bg-green-50">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16">
          Nossas principais Funcionalidades
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-200 rounded-2xl p-8 space-y-4 h-120 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-green-300 cursor-pointer group text-center">
            <div className="text-green-600 text-4xl"></div>
            <img src="/imagem_link.png" alt="Conexão" className="mx-auto h-16" />
            <h3 className="text-xl font-bold text-gray-900">Conectar-se com outras empresas</h3>
            <p className="text-gray-700 text-sm">
              Encontre empresas parceiras com interesses em reaproveitamento de materiais e soluções sustentáveis.
            </p>
          </div>
          <div className="bg-green-200 rounded-2xl p-8 space-y-4 h-120 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-green-300 cursor-pointer group text-center">
            <div className="text-green-600 text-4xl"></div>
            <img src="/imagem_link.png" alt="Parcerias sustentáveis" className="mx-auto h-16" />
            <h3 className="text-xl font-bold text-gray-900">Criar conexões sustentáveis</h3>
            <p className="text-gray-700 text-sm">
              Construa parcerias de forma rápida, segura e alinhada cpm as práticas de responsabilidade ambiental.
            </p>
          </div>
          <div className="bg-green-200 rounded-2xl p-8 space-y-4 h-120 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-green-300 cursor-pointer group text-center">
            <div className="text-green-600 text-4xl"></div>
            <img src="/grafico_pizza.png" alt="Análise de Relatórios" className="mx-auto h-16" />
            <h3 className="text-xl font-bold text-gray-900">Analisar Relatórios</h3>
            <p className="text-gray-700 text-sm">
              Acompanhe os impactos e resultados das suas parcerias sustentáveis com gráficos e insights.
            </p>
          </div>
        </div>
      </section>

      {/* Footer*/}
      <footer className="bg-white py-6 border-gray-200">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          ©2025 EcoNet. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

export default Home;