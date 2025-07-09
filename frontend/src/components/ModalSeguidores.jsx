import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function ModalSeguidores({ isOpen, onClose, empresa }) {
  const [seguidores, setSeguidores] = useState([]);
  const [totalSeguidores, setTotalSeguidores] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [limitePorPagina] = useState(10);
  const [totalPaginas, setTotalPaginas] = useState(1);

  // Reset página quando o modal abrir
  useEffect(() => {
    if (isOpen) {
      setPagina(1);
    }
  }, [isOpen]);

  // Função para buscar os seguidores da empresa com paginação
  const buscarSeguidores = async () => {
    if (!empresa?.idEmpresa && !empresa?.id) return;
    
    try {
      setCarregando(true);
      const offset = (pagina - 1) * limitePorPagina;
      const empresaId = empresa?.idEmpresa || empresa?.id;
      
      const response = await axios.get(
        `http://localhost:3001/api/company/${empresaId}/followers?limit=${limitePorPagina}&offset=${offset}`
      );
      
      setSeguidores(response.data.followers || []);
      setTotalSeguidores(response.data.total || 0);
      setTotalPaginas(Math.ceil((response.data.total || 0) / limitePorPagina));
    } catch (error) {
      console.error("Erro ao buscar seguidores:", error);
    } finally {
      setCarregando(false);
    }
  };

  // Buscar seguidores quando o modal abrir ou quando mudar de página
  useEffect(() => {
    if (isOpen) {
      buscarSeguidores();
    }
  }, [isOpen, pagina, empresa]);

  // Se o modal não estiver aberto, não renderize nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl flex flex-col relative shadow-lg max-h-[90vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Seguidores de {empresa?.nomeComercial}</h2>
          <button
            onClick={onClose}
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
          ) : seguidores.length > 0 ? (
            <ul className="space-y-4">
              {seguidores.map((seguidor) => (
                <li
                  key={seguidor.id}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                >
                  <img
                    src={seguidor.fotoPerfil || `/user/foto-perfil-padrao-1.png`}
                    alt={`${seguidor.nome || 'Usuário'}`}
                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <p className="font-medium">{seguidor.nome} {seguidor.sobrenome}</p>
                    <p className="text-sm text-gray-500">
                      Seguindo desde {new Date(seguidor.dataInicio).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-8">
              Esta empresa não tem seguidores no momento.
            </p>
          )}
        </div>

        {/* Paginação */}
        {totalSeguidores > limitePorPagina && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setPagina(Math.max(1, pagina - 1))}
              disabled={pagina === 1}
              className={`px-3 py-1 rounded ${
                pagina === 1 ? "bg-gray-200 text-gray-500" : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
            >
              &lt; Anterior
            </button>
            
            <span className="mx-2">
              Página {pagina} de {totalPaginas}
            </span>
            
            <button
              onClick={() => setPagina(Math.min(totalPaginas, pagina + 1))}
              disabled={pagina === totalPaginas}
              className={`px-3 py-1 rounded ${
                pagina === totalPaginas ? "bg-gray-200 text-gray-500" : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
            >
              Próxima &gt;
            </button>
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-4">
          {totalSeguidores} {totalSeguidores === 1 ? "seguidor" : "seguidores"} no total
        </p>
      </div>
    </div>
  );
}

ModalSeguidores.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  empresa: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    idEmpresa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nomeComercial: PropTypes.string,
  }),
};