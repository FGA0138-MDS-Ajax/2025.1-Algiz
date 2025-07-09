import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function MiniCardEmpresa({ empresa }) {
  const navigate = useNavigate();

  const handleFotoClick = () => {
    navigate(`/empresa/${empresa.id || empresa.idEmpresa}`);
  };

  return (
    <div className="bg-white rounded-xl shadow flex items-center gap-3 p-3 mb-2 min-w-[220px] max-w-[320px]">
      <button
        onClick={handleFotoClick}
        className="focus:outline-none"
        style={{ border: "none", background: "none", padding: 0 }}
        title={`Ver perfil da empresa ${empresa.nomeComercial}`}
      >
        <img
          src={empresa.fotoEmpresa || "/empresa-default.png"}
          alt={empresa.nomeComercial}
          className="w-12 h-12 rounded-full object-cover"
        />
      </button>
      <div className="flex-1">
        <div className="font-semibold text-gray-800">{empresa.nomeComercial}</div>
        {empresa.cargo && (
          <div className="text-xs text-gray-500">{empresa.cargo}</div>
        )}
        <button 
          onClick={handleFotoClick}
          className="mt-1 px-3 py-1 border border-green-400 text-green-700 rounded-full text-xs hover:bg-green-50 transition"
        >
          Perfil empresa
        </button>
      </div>
    </div>
  );
}

export default function EmpresasAssociadas({ usuario, isUsuarioLogado }) {
  console.log("🔍 EmpresasAssociadas - Componente renderizado");
  console.log("🔍 EmpresasAssociadas - Props recebidas:", { 
    "usuarioId": usuario?.id, 
    "isUsuarioLogado": isUsuarioLogado 
  });

  const [empresasVinculadas, setEmpresasVinculadas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpresasVinculadas = async () => {
      if (!usuario?.id) {
        console.log("❌ EmpresasAssociadas - Sem ID de usuário, abortando fetch");
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        console.log(`🔄 EmpresasAssociadas - Iniciando fetch para usuário ID: ${usuario.id}`);

        // Usar a rota que já existe no backend
        const url = `http://localhost:3001/api/users/${usuario.id}/empresas`;
        console.log(`🔄 EmpresasAssociadas - URL da requisição: ${url}`);
        
        // Configurar headers com autenticação apenas se o usuário estiver logado
        const headers = {
          "Content-Type": "application/json",
        };
        
        if (isUsuarioLogado) {
          const token = localStorage.getItem("authToken");
          if (token) {
            headers.Authorization = `Bearer ${token}`;
            console.log("🔑 EmpresasAssociadas - Token adicionado ao header");
          } else {
            console.log("⚠️ EmpresasAssociadas - Token não encontrado no localStorage");
          }
        }
        
        console.log("🔄 EmpresasAssociadas - Configuração da requisição:", { 
          headers: { ...headers, Authorization: headers.Authorization ? "Bearer [REDACTED]" : undefined },
          credentials: isUsuarioLogado ? 'include' : 'omit' 
        });
        
        const response = await fetch(url, {
          headers,
          credentials: isUsuarioLogado ? 'include' : 'omit'
        });
        
        console.log(`🔄 EmpresasAssociadas - Status da resposta: ${response.status}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ EmpresasAssociadas - Erro na resposta: ${response.status} - ${errorText}`);
          
          if (response.status === 401 || response.status === 403) {
            console.log("⚠️ EmpresasAssociadas - Erro de autenticação/autorização, mostrando lista vazia");
            setEmpresasVinculadas([]);
            return;
          }
          throw new Error(`Erro ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log("✅ EmpresasAssociadas - Dados recebidos:", data);
        setEmpresasVinculadas(Array.isArray(data) ? data : []);
        
      } catch (err) {
        console.error("❌ EmpresasAssociadas - Erro na requisição:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log("🔄 EmpresasAssociadas - Requisição finalizada");
      }
    };

    fetchEmpresasVinculadas();
  }, [usuario, isUsuarioLogado]);

  console.log("🔍 EmpresasAssociadas - Estado atual:", {
    empresasVinculadas,
    loading,
    error
  });

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-green-100 p-4">
        <div className="font-bold text-gray-700 mb-2">Empresas vinculadas</div>
        <div className="text-gray-400 text-sm">Carregando empresas...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-green-100 p-4">
      <div className="font-bold text-gray-700 mb-2">Empresas vinculadas</div>
      <div>
        {empresasVinculadas && empresasVinculadas.length > 0 ? (
          empresasVinculadas.map((empresa) => (
            <MiniCardEmpresa 
              key={empresa.id || empresa.idEmpresa} 
              empresa={empresa} 
            />
          ))
        ) : (
          <div className="text-gray-400 text-sm">Este usuário não possui nenhuma empresa vinculada.</div>
        )}
      </div>
    </div>
  );
}