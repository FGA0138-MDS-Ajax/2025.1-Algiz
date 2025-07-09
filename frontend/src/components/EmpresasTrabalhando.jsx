import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function EmpresasTrabalhando({ usuario }) {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpresasVinculadas = async () => {
      if (!usuario?.id) return;

      try {
        setLoading(true);
        console.log(`🔍 EmpresasTrabalhando - Buscando empresas para usuário ID: ${usuario.id}`);

        // Usar a rota pública que não requer autenticação
        const url = `http://localhost:3001/api/users/${usuario.id}/empresas-publicas`;
        console.log(`🔍 EmpresasTrabalhando - Usando URL pública: ${url}`);

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'omit'  // Não enviar credenciais para rotas públicas
        });

        console.log(`🔍 EmpresasTrabalhando - Status da resposta: ${response.status}`);

        if (!response.ok) {
          throw new Error(`Erro ao buscar empresas: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Dados recebidos:", data);

        if (!Array.isArray(data)) {
          console.log("⚠️ Resposta não é um array, usando array vazio");
          setEmpresas([]);
          return;
        }

        // Transformar formato da API para o formato esperado pelo componente
        const empresasFormatadas = data.map(empresa => ({
          id: empresa.id || empresa.idEmpresa,
          logo: empresa.fotoEmpresa || "/empresa-default.png",
          nome: empresa.nomeComercial,
          dataVinculo: empresa.dataVinculo ? new Date(empresa.dataVinculo).toLocaleDateString('pt-BR') : null
        }));

        setEmpresas(empresasFormatadas);
      } catch (err) {
        console.error("❌ Erro ao buscar empresas vinculadas:", err);
        setError(err.message);
        setEmpresas([]);  // Garantir que empresas seja array vazio em caso de erro
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresasVinculadas();
  }, [usuario]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h3 className="font-bold text-xl mb-4">Empresas vinculadas</h3>
        <div className="text-gray-500">Carregando empresas...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 mt-6">
      <h3 className="font-bold text-xl mb-3">Empresas vinculadas</h3>
      {empresas.length === 0 ? (
        <div className="text-gray-500 italic">
          Este usuário não possui nenhuma empresa vinculada.
        </div>
      ) : (
        <div className="flex flex-row flex-wrap gap-4">
          {empresas.map((empresa) => (
            <div
              key={empresa.id}
              className="flex items-center bg-white rounded-lg shadow-md px-4 py-3 min-w-[240px] max-w-[280px]"
            >
              <img
                src={empresa.logo}
                alt={empresa.nome}
                className="w-12 h-12 rounded-full mr-3 object-cover"
              />
              <div>
                <div className="font-bold text-base">{empresa.nome}</div>
                <a
                  href={`/empresa/${empresa.id}`}
                  className="mt-1 inline-block border border-green-600 text-green-700 font-medium text-sm px-4 py-1 rounded-full hover:bg-green-50 transition-colors"
                >
                  Perfil empresa
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

EmpresasTrabalhando.propTypes = {
  usuario: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};