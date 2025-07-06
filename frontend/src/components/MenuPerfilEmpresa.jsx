import React from "react";

export default function MenuPerfilEmpresa({ empresa }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
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