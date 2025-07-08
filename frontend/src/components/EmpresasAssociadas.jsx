import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EmpresasAssociadas({ usuario, isUsuarioLogado }) {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmpresasAssociadas() {
      if (!usuario?.id) return;

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");
        const headers = {
          "Content-Type": "application/json"
        };

        // Só adiciona token se o usuário estiver logado
        if (token && isUsuarioLogado) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(
          `http://localhost:3001/api/users/${usuario.id}/empresas`,
          { headers }
        );

        if (!res.ok) {
          throw new Error(`Erro ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setEmpresas(data);
      } catch (err) {
        console.error("Erro ao buscar empresas associadas:", err);
        setError(err.message);
        setEmpresas([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEmpresasAssociadas();
  }, [usuario?.id, isUsuarioLogado]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Empresas Associadas
        </h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Empresas Associadas
        </h2>
        <p className="text-red-500 text-sm">Erro ao carregar empresas: {error}</p>
      </div>
    );
  }

  if (empresas.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Empresas Associadas
        </h2>
        <div className="text-center py-8">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p className="text-gray-500">
            {isUsuarioLogado 
              ? "Você ainda não está associado a nenhuma empresa"
              : "Este usuário não está associado a nenhuma empresa"
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Empresas Associadas
        {empresas.length > 0 && (
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({empresas.length})
          </span>
        )}
      </h2>

      <div className="space-y-3">
        {empresas.map((empresa) => (
          <Link
            key={empresa.idEmpresa || empresa.id}
            to={`/empresa/${empresa.idEmpresa || empresa.id}`}
            className="block group"
          >
            <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200">
              {/* Logo da Empresa */}
              <div className="flex-shrink-0 mr-3">
                {empresa.fotoEmpresa ? (
                  <img
                    src={empresa.fotoEmpresa}
                    alt={empresa.nomeComercial}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Informações da Empresa */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                  {empresa.nomeComercial}
                </h3>
                
                <div className="flex items-center gap-3 mt-1">
                  {empresa.areaAtuacao && (
                    <span className="text-xs text-gray-500">
                      {empresa.areaAtuacao}
                    </span>
                  )}
                  
                  {isUsuarioLogado && empresa.cargo && (
                    <>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-blue-600 font-medium">
                        {empresa.cargo}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Ícone de Seta */}
              <div className="flex-shrink-0 ml-3">
                <svg 
                  className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Botão Ver Todas (se houver muitas empresas) */}
      {empresas.length > 3 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-green-600 hover:text-green-700 font-medium">
            Ver todas as empresas ({empresas.length})
          </button>
        </div>
      )}
    </div>
  );
}