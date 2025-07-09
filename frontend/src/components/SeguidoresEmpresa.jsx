import React, { useEffect, useState } from "react"; // Adicione o useState aqui
import PropTypes from "prop-types";
import axios from "axios";

export default function SeguidoresEmpresa({ isOwner, seguindo, setSeguindo, empresa, onVerTodos }) {
  // Estado local para armazenar os seguidores da API
  const [seguidoresAPI, setSeguidoresAPI] = useState([]);
  const [totalSeguidores, setTotalSeguidores] = useState(0);
  const [carregando, setCarregando] = useState(true);

  // Função para buscar os seguidores da empresa
  const buscarSeguidores = async () => {
    if (!empresa?.idEmpresa && !empresa?.id) return;
    
    try {
      setCarregando(true);
      const empresaId = empresa?.idEmpresa || empresa?.id;
      const response = await axios.get(
        `http://localhost:3001/api/company/${empresaId}/followers?limit=5`
      );
      
      setSeguidoresAPI(response.data.followers || []);
      setTotalSeguidores(response.data.total || 0);
    } catch (error) {
      console.error("Erro ao buscar seguidores:", error);
    } finally {
      setCarregando(false);
    }
  };

  // Buscar seguidores quando o componente carregar e quando o status de seguidor mudar
  useEffect(() => {
    buscarSeguidores();
  }, [empresa, seguindo]);

  // Handler para alternar seguir/deixar de seguir
  const handleToggleFollow = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        // Redirecionar para login se não estiver autenticado
        window.location.href = "/login";
        return;
      }
      
      const empresaId = empresa?.idEmpresa || empresa?.id;
      const method = seguindo ? "DELETE" : "POST";
      
      await axios({
        method,
        url: `http://localhost:3001/api/company/${empresaId}/follow`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Atualiza o estado no componente pai
      setSeguindo(!seguindo);
      // A lista de seguidores será atualizada pelo useEffect quando o status mudar
    } catch (error) {
      console.error("Erro ao alterar status de seguidor:", error);
      alert("Ocorreu um erro ao " + (seguindo ? "deixar de seguir" : "seguir") + " a empresa.");
    }
  };
  
  // Verificar status de seguidor ao carregar o componente
  useEffect(() => {
    const checkFollowStatus = async () => {
      if (isOwner || !empresa?.idEmpresa) return;
      
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;
        
        const empresaId = empresa?.idEmpresa || empresa?.id;
        const response = await axios.get(
          `http://localhost:3001/api/company/${empresaId}/follow/status`, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        // Atualiza o estado no componente pai
        setSeguindo(response.data.follows);
      } catch (error) {
        console.error("Erro ao verificar status de seguidor:", error);
      }
    };
    
    checkFollowStatus();
  }, [empresa, isOwner, setSeguindo]);

  // Use os seguidores da API ou caia para a propriedade do componente
  const seguidores = seguidoresAPI.length > 0 ? seguidoresAPI : (empresa?.seguidores || []);

  if (isOwner) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg">Meus seguidores</h3>
            <p className="text-gray-600 text-sm">Usuários que estão me seguindo</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {carregando ? (
              <p>Carregando seguidores...</p>
            ) : totalSeguidores > 0 ? (
              <>
                {seguidores.slice(0, 3).map((seguidor, index) => (
                  <img
                    key={seguidor.id || index}
                    src={seguidor.fotoPerfil || `https://randomuser.me/api/portraits/${seguidor.genero || 'men'}/${seguidor.id || index + 30}.jpg`}
                    alt={`Seguidor ${seguidor.nome || 'Anônimo'}`}
                    className={`w-12 h-12 rounded-full border-2 border-white object-cover ${index > 0 ? '-ml-3' : ''}`}
                    title={seguidor.nome}
                  />
                ))}
                <span className="font-semibold text-gray-700 ml-2">
                  {totalSeguidores > 3 ? `${totalSeguidores - 3}+` : totalSeguidores}
                </span>
                <button
                  onClick={onVerTodos}
                  className="text-blue-600 text-sm ml-2 underline hover:text-blue-800 transition"
                >
                  Ver todos
                </button>
              </>
            ) : (
              <p className="text-gray-500 text-sm italic">
                Essa empresa não tem seguidores no momento
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-4">
      <div className="bg-green-50 rounded-xl p-4 flex flex-col shadow w-full">
        <div className="font-bold text-lg">Seguidores</div>
        <div className="text-gray-600 text-sm mb-2">
          Usuários que estão seguindo esta empresa
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {carregando ? (
            <p>Carregando seguidores...</p>
          ) : totalSeguidores > 0 ? (
            <>
              {seguidores.slice(0, 2).map((seguidor, index) => (
                <img
                  key={seguidor.id || index}
                  src={seguidor.fotoPerfil || `https://randomuser.me/api/portraits/${seguidor.genero || 'men'}/${seguidor.id || index + 30}.jpg`}
                  alt={`Seguidor ${seguidor.nome || 'Anônimo'}`}
                  className={`w-12 h-12 rounded-full border-2 border-white object-cover ${index > 0 ? '-ml-3' : ''}`}
                  title={seguidor.nome}
                />
              ))}
              <span className="font-semibold text-gray-700 ml-2">
                {totalSeguidores > 2 ? `${totalSeguidores - 2}+` : totalSeguidores}
              </span>
              <button
                onClick={onVerTodos}
                className="text-blue-600 text-xs ml-2 underline cursor-pointer bg-transparent border-none p-0 hover:text-blue-800 transition"
              >
                Ver todos
              </button>
            </>
          ) : (
            <p className="text-gray-500 text-sm italic">
              Essa empresa não tem seguidores no momento
            </p>
          )}
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-4 flex flex-col justify-between shadow w-full lg:w-auto">
        <div>
          <div className="font-bold text-lg">Seguir</div>
          <div className="text-gray-600 text-sm">
            Siga essa empresa e fique por dentro de todas as postagens
          </div>
        </div>
        <button
          className={`mt-4 px-6 py-2 rounded-full font-medium text-white text-lg transition-colors ${
            seguindo ? "bg-green-600 hover:bg-green-700" : "bg-green-400 hover:bg-green-500"
          }`}
          onClick={handleToggleFollow}
        >
          {seguindo ? "Deixar de seguir" : "Seguir"} {seguindo ? "✓" : "+"}
        </button>
      </div>
    </div>
  );
}

SeguidoresEmpresa.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  seguindo: PropTypes.bool.isRequired,
  setSeguindo: PropTypes.func.isRequired,
  empresa: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    idEmpresa: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    seguidores: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        nome: PropTypes.string,
        fotoPerfil: PropTypes.string,
        genero: PropTypes.string,
      })
    ),
  }),
  onVerTodos: PropTypes.func.isRequired,
};
