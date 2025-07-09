import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

export default function MinhasConexoes({ usuario, cardClass = "" }) {
  const [empresasSeguindo, setEmpresasSeguindo] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Buscar empresas seguidas pelo usuário
  useEffect(() => {
    const buscarEmpresasSeguidas = async () => {
      if (!usuario?.id) return;

      try {
        setCarregando(true);
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const response = await axios.get(
          `http://localhost:3001/api/user/${usuario.id}/following`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Empresas seguidas:", response.data);

        // Ajuste conforme a estrutura de resposta do backend
        const empresas = response.data.companies || [];

        setEmpresasSeguindo(empresas);
      } catch (error) {
        console.error("Erro ao buscar empresas seguidas:", error);
        // Log detalhado para depuração
        if (error.response) {
          console.error("Detalhes do erro:", {
            status: error.response.status,
            data: error.response.data,
          });
        }
      } finally {
        setCarregando(false);
      }
    };

    buscarEmpresasSeguidas();
  }, [usuario]);

  // Definir as empresas a exibir (da API ou fallback para props)
  const empresas =
    empresasSeguindo.length > 0
      ? empresasSeguindo
      : usuario.empresasSeguindo || [];

  return (
    <div
      className={`rounded-xl bg-white border border-gray-200 shadow flex flex-col h-full justify-center items-start px-6 py-4 relative ${cardClass}`}
    >
      <div className="text-xl font-bold mb-1 text-left">Minhas Conexões</div>
      <div className="text-gray-500 text-sm mb-3 text-left">
        Empresas que estou seguindo
      </div>

      <div className="flex items-center gap-2 mb-1">
        {carregando ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-t-transparent border-green-500 rounded-full animate-spin"></div>
            <span className="text-xs text-gray-400">Carregando...</span>
          </div>
        ) : empresas.length === 0 ? (
          <span className="text-xs text-gray-400 ml-2">
            Nenhuma conexão por enquanto.
          </span>
        ) : (
          <>
            <span className="text-2xl font-semibold text-gray-700">
              {empresas.length}+
            </span>
            {empresas.slice(0, 5).map((empresa) => (
              <img
                key={empresa.id || empresa.idEmpresa}
                src={
                  empresa.logo ||
                  empresa.fotoEmpresa ||
                  "/empresa-padrao.png"
                }
                alt={empresa.nome || empresa.nomeComercial}
                className="w-10 h-10 rounded-full border border-gray-200"
              />
            ))}
          </>
        )}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="text-green-600 font-semibold hover:underline text-xs absolute bottom-4 right-6"
        style={{ padding: 0, margin: 0, background: "transparent" }}
      >
        Ver todos
      </button>

      {/* Modal de Empresas Seguidas */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl flex flex-col relative shadow-lg max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                Empresas que estou seguindo
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
                aria-label="Fechar modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto flex-1 mb-4">
              {carregando ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : empresas.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {empresas.map((empresa) => (
                    <li
                      key={empresa.id || empresa.idEmpresa}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <img
                        src={
                          empresa.logo ||
                          empresa.fotoEmpresa ||
                          "/empresa-padrao.png"
                        }
                        alt={empresa.nome || empresa.nomeComercial}
                        className="w-16 h-16 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <p className="font-medium">
                          {empresa.nome || empresa.nomeComercial}
                        </p>
                        <Link
                          to={`/empresas/${empresa.id || empresa.idEmpresa}`}
                          className="text-sm text-green-600 hover:underline"
                        >
                          Ver perfil
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  Você ainda não está seguindo nenhuma empresa.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

MinhasConexoes.propTypes = {
  usuario: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    empresasSeguindo: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        idEmpresa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        logo: PropTypes.string,
        fotoEmpresa: PropTypes.string,
        nome: PropTypes.string,
        nomeComercial: PropTypes.string,
      })
    ),
  }).isRequired,
  cardClass: PropTypes.string,
};