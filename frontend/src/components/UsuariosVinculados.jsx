import React from "react";

export default function UsuariosVinculados({ empresa, isOwner }) {
  // Mock de dados de usuários vinculados (posteriormente será substituído por dados reais da API)
  const usuariosVinculados = empresa?.usuariosVinculados || [];

  // Se não há usuários vinculados, não renderizar o componente
  if (usuariosVinculados.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h3 className="font-bold text-lg mb-4">Usuários vinculados</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usuariosVinculados.map((usuario, index) => (
          <div key={usuario.id || index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={usuario.fotoPerfil || `https://randomuser.me/api/portraits/${usuario.genero || 'men'}/${usuario.id || index + 10}.jpg`}
                alt={`${usuario.nome || 'Usuário'}`}
                className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {usuario.nome || 'Nome do usuário'}
                </h4>
                <p className="text-sm text-gray-600 truncate">
                  {usuario.cargo || 'Cargo/função'}
                </p>
                <p className="text-xs text-gray-500">
                  {usuario.dataVinculacao || '25/09/2023'} - {usuario.status || 'Presente'}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 transition">
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