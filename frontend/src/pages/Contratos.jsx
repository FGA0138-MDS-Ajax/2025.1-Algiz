import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MenuPerfilEmpresa from "../components/MenuPerfilEmpresa";
import { AuthContext } from "../context/AuthContext";
import ModalContrato from "../components/ModalContrato";

const contratosFake = [
  {
    id: 101,
    titulo: "Contrato de Fornecimento",
    empresa: {
      nome: "Nestlé",
      imagem: "/nestle.png",
    },
    data: "01/06/2025",
  },
  {
    id: 102,
    titulo: "Contrato de Parceria",
    empresa: {
      nome: "Cacau Show",
      imagem: "/cacau.png",
    },
    data: "12/05/2025",
  },
];

export default function Contratos() {
  const { usuario } = useContext(AuthContext);
  const [contratos, setContratos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Aqui futuramente você buscaria da API
    setContratos(contratosFake);
  }, []);

    return (
    <div className="bg-green-50 pt-20 pb-10 px-4 flex-1">
        <div className="max-w-6xl mx-auto flex gap-6">
        <aside className="w-80">
          <MenuPerfilEmpresa empresa={{ nomeComercial: "Minha Empresa" }} />
        </aside>

        <main className="flex-1">
          <div className="bg-white rounded-xl shadow p-6 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contratos</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {contratos.map((contrato) => (
                <div
                  key={contrato.id}
                  className="relative bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
                >
                  <span className="absolute top-2 right-3 text-xs text-gray-400">#{contrato.id}</span>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{contrato.titulo}</h3>

                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={contrato.empresa.imagem}
                      alt={contrato.empresa.nome}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-gray-700 font-medium">{contrato.empresa.nome}</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-4">Data: {contrato.data}</p>

                  <div className="text-right">
                    <Link
                      to={`/empresa/contrato/${contrato.id}`}
                      className="text-green-700 hover:underline text-sm font-medium"
                    >
                      Ver mais
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <button
            onClick={() => setModalOpen(true)}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-700 text-xl font-bold flex items-center justify-center transition"
            >
            +
            </button>
          </div>
        </main>
      </div>
      {modalOpen && (
        <ModalContrato
            empresa={{ nomeComercial: "Minha Empresa", cnpjJuridico: "00.000.000/0000-00" }} // mockado por enquanto
            onClose={() => setModalOpen(false)}
            onSave={(dados) => {
            console.log("Contrato salvo:", dados);
            setModalOpen(false);
            }}
        />
      )}
    </div>
  );
}