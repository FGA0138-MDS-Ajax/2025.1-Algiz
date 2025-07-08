import React from "react";
import { useNavigate } from "react-router-dom";

export default function MenuPerfilEmpresa({ empresa }) {
  const navigate = useNavigate();

  const handleCriarPostagem = () => {
    navigate("/empresa/criar-postagem");
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="space-y-2">
        <div className="w-full text-left p-2 rounded-lg flex items-center gap-3">
          <img
            src={empresa.fotoEmpresa || "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png"}
            alt="Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm text-gray-800">
            {empresa.nomeComercial}
          </span>
        </div>
        
        <button 
          className="w-full text-left p-2 rounded-lg hover:bg-green-50 transition text-sm text-gray-600 hover:text-green-700"
          onClick={handleCriarPostagem}
        >
          Criar postagem
        </button>
        
        <button className="w-full text-left p-2 rounded-lg hover:bg-green-50 transition text-sm text-gray-600 hover:text-green-700">
          Contratos
        </button>
        
        <button className="w-full text-left p-2 rounded-lg hover:bg-green-50 transition text-sm text-gray-600 hover:text-green-700">
          Configurações
        </button>
      </div>
    </div>
  );
}