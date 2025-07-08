import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function UsuariosVinculados({ empresa, isOwner }) {
  const [usuariosVinculados, setUsuariosVinculados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarUsuariosVinculados = async () => {
      if (!empresa?.idEmpresa) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3001/api/company/${empresa.idEmpresa}/usuarios`);
        
        if (response.data && Array.isArray(response.data)) {
          console.log("✅ Usuários vinculados recebidos:", response.data);
          setUsuariosVinculados(response.data);
        } else {
          console.warn("⚠️ Formato de resposta inesperado:", response.data);
          setUsuariosVinculados([]);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar usuários vinculados:", error);
        setError("Não foi possível carregar os usuários vinculados.");
      } finally {
        setLoading(false);
      }
    };

    buscarUsuariosVinculados();
  }, [empresa?.idEmpresa]);

  // Se está carregando, mostrar spinner
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h3 className="font-bold text-lg mb-4">Usuários vinculados</h3>
        <div className="flex justify-center my-8">
          <LoadingSpinner size="md" message="Carregando usuários..." />
        </div>
      </div>
    );
  }

  // Se houver erro, mostrar mensagem
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h3 className="font-bold text-lg mb-4">Usuários vinculados</h3>
        <p className="text-red-500 text-center py-4">{error}</p>
      </div>
    );
  }

  // Se não há usuários vinculados, não renderizar o componente
  if (!usuariosVinculados || usuariosVinculados.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h3 className="font-bold text-lg mb-4">Usuários vinculados</h3>
        <p className="text-gray-500 text-center py-4">Nenhum usuário vinculado encontrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h3 className="font-bold text-lg mb-4">Usuários vinculados</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usuariosVinculados.map((usuario) => (
          <div key={usuario.id || usuario.idUsuario} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={usuario.fotoPerfil || "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png"}
                alt={`${usuario.nome || usuario.nomeCompleto || 'Usuário'}`}
                className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {usuario.nome || usuario.nomeCompleto || 'Nome do usuário'}
                </h4>
                <p className="text-sm text-gray-600 truncate">
                  {usuario.cargo || 'Colaborador'}
                </p>
                <p className="text-xs text-gray-500">
                  {usuario.dataVinculo && new Date(usuario.dataVinculo).toLocaleDateString('pt-BR')}
                  {usuario.status && ` - ${usuario.status}`}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 transition"
                onClick={() => navigate(`/usuario/${usuario.id || usuario.idUsuario}`)}
              >
                Perfil Usuário
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Botão para ver todos os usuários vinculados */}
      {usuariosVinculados.length > 6 && (
        <div className="text-center mt-6">
          <button className="text-green-600 hover:text-green-800 font-medium underline">
            Ver todos os usuários vinculados ({usuariosVinculados.length})
          </button>
        </div>
      )}
    </div>
  );
}