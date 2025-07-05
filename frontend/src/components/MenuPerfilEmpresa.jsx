import React from "react";

export default function MenuPerfilEmpresa({ empresa }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <svg 
          className="w-5 h-5 text-gray-800" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1V3H9V1L3 7V9H21ZM12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8ZM12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"/>
        </svg>
        <span className="font-semibold text-gray-800">Meu perfil</span>
      </div>
      
      <div className="space-y-2">
        <div className="w-full text-left p-2 rounded-lg flex items-center gap-3">
          <img
            src={empresa.logoUrl || "/user/foto-perfil-padrao-empresa.png"}
            alt="Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm text-gray-800">
            {empresa.nomeComercial}
          </span>
        </div>
        
        <button className="w-full text-left p-2 rounded-lg hover:bg-green-50 transition text-sm text-gray-600 hover:text-green-700">
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