import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sobrenos() {
  const { usuario } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 px-20 pt-20">
      {/* Seção Sobre nós */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">Sobre nós</h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Somos uma plataforma web, onde empresas podem se cadastrar e indicar se atuam como fornecedoras ou demandantes de materiais reaproveitáveis. A plataforma permite que essas organizações estabeleçam conexões, negociem parcerias e formalizem contratos, tudo dentro de um ambiente controlado e seguro.
            </p>
          </div>

          {/* Imagem com pentágono */}
          <div className="relative flex justify-center">
            <div className="absolute -top-14 left-40 z-10">
              <svg width="462" height="433" viewBox="0 0 462 433" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M153.665 16.338C162.942 4.07006 178.431 -1.79217 193.506 1.25945L428.892 48.9089C447.505 52.6766 460.903 69.0113 460.956 88.001L461.558 301.85C461.605 318.52 451.308 333.472 435.717 339.373L196.012 430.094C180.42 435.994 162.804 431.607 151.802 419.083L10.6646 258.421C-1.86837 244.155 -2.64294 223.043 8.81085 207.896L153.665 16.338Z" fill="#B9F8CF" />
              </svg>
            </div>
            <div className="w-130 h-70 bg-purple-100 z-20 rounded-2xl flex items-center justify-center shadow-lg">
              <img src="/empresa_sobrenos.jpg" alt="Imagem da empresa" className="w-130 h-70 rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Seção Missão */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagem */}
          <div className="relative flex justify-center lg:order-1">
            <div className="absolute -top-14 right-40 z-10">
              <svg width="462" height="433" viewBox="0 0 462 433" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M308.064 16.338C298.787 4.07004 283.297 -1.79218 268.222 1.25944L32.8361 48.9089C14.2239 52.6766 0.826014 69.0113 0.77253 88.001L0.170153 301.85C0.123179 318.52 10.4201 333.472 26.0114 339.373L265.717 430.094C281.308 435.994 298.924 431.607 309.927 419.083L451.064 258.421C463.597 244.155 464.371 223.043 452.918 207.896L308.064 16.338Z" fill="#B9F8CF" />
              </svg>
            </div>
            <div className="w-130 h-70 z-20 rounded-2xl flex items-center justify-center shadow-lg">
              <img src="/empresa_sobrenos_2.png" alt="Imagem da empresa" className="w-130 h-70 rounded-2xl shadow-lg" />
            </div>
          </div>

          {/* Texto missão */}
          <div className="space-y-6 lg:order-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Nossa missão: ajudar milhões de organizações a crescerem melhor
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Acreditamos em promover soluções ambientais inovadoras e sustentáveis que contribuam para a preservação, recuperação e valorização dos recursos naturais, fortalecendo o equilíbrio ecológico e o desenvolvimento socioambiental das comunidades onde atuamos.
            </p>
          </div>
        </div>
      </section>

      {/* Seção Valores */}
      <section className="container mx-auto px-6 py-16 pt-50 bg-green-50">
        <div className="space-y-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 max-w-md">
            Vivemos de acordo com nossos valores
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Sustentabilidade como propósito central",
                desc: "Nossa missão é promover o desenvolvimento sustentável...",
              },
              {
                title: "Responsabilidade ambiental",
                desc: "Reconhecemos a importância de minimizar os impactos ambientais...",
              },
              {
                title: "Ética ambiental",
                desc: "Agimos com responsabilidade moral, respeitando leis e princípios...",
              },
            ].map((valor, index) => (
              <div
                key={index}
                className="bg-green-200 rounded-2xl p-8 space-y-4 h-120 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:bg-green-300 cursor-pointer group"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 pt-15">{valor.title}</h3>
                <p className="text-gray-700 leading-relaxed">{valor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sobrenos;