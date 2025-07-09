import { useParams } from "react-router-dom";
import MenuPerfilEmpresa from "../components/MenuPerfilEmpresa";

export default function VisualizarContrato() {
  const { id } = useParams();

  // Mock data for demonstration
  const contrato = {
    id,
    titulo: "Contrato de Parceria Comercial",
    descricao: `Este contrato estabelece uma parceria entre a empresa contratante e a empresa contratada para fornecimento e logística de resíduos recicláveis. Ambas as partes concordam com os termos aqui descritos.`,
    data: "01/06/2025",
    contratante: {
      nome: "Minha Empresa",
      cnpj: "00.000.000/0000-00",
    },
    contratado: {
      nome: "Empresa RecycleTech",
      cnpj: "99.999.999/9999-99",
    },
    arquivos: [
      { nome: "contrato-assinado.pdf", url: "#" },
      { nome: "documento-suplementar.pdf", url: "#" },
    ],
  };

  return (
    <div className="bg-green-50 pt-20 pb-10 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto flex gap-6">
        {/* Sidebar */}
        <aside className="w-80">
          <MenuPerfilEmpresa empresa={{ nomeComercial: contrato.contratante.nome }} />
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">{contrato.titulo}</h1>
              <p className="text-sm text-gray-500 mt-1">Contrato #{contrato.id}</p>
              <p className="text-sm text-gray-500">Data de criação: {contrato.data}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Descrição</h2>
              <p className="text-gray-800 whitespace-pre-line">{contrato.descricao}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Contratante */}
              <div>
                <h3 className="text-md font-semibold text-gray-700 mb-1">Contratante</h3>
                <p className="text-sm text-gray-800">Nome: {contrato.contratante.nome}</p>
                <p className="text-sm text-gray-800">CNPJ: {contrato.contratante.cnpj}</p>
              </div>

              {/* Contratado */}
              <div>
                <h3 className="text-md font-semibold text-gray-700 mb-1">Contratado</h3>
                <p className="text-sm text-gray-800">Nome: {contrato.contratado.nome}</p>
                <p className="text-sm text-gray-800">CNPJ: {contrato.contratado.cnpj}</p>
              </div>
            </div>

            {/* Arquivos */}
            <div>
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Arquivos Anexados</h2>
              <ul className="list-disc pl-5 space-y-1">
                {contrato.arquivos.map((arquivo, idx) => (
                  <li key={idx}>
                    <a
                      href={arquivo.url}
                      className="text-green-700 hover:underline text-sm"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {arquivo.nome}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}