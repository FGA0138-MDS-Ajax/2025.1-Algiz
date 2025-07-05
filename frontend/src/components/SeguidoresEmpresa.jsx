import React from "react";

export default function SeguidoresEmpresa({ isOwner, seguindo, setSeguindo, empresa }) {
  // Mock de dados de seguidores (posteriormente será substituído por dados reais da API)
  const seguidores = empresa?.seguidores || [];
  const totalSeguidores = seguidores.length;

  if (isOwner) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg">Meus seguidores</h3>
            <p className="text-gray-600 text-sm">Usuários que estão me seguindo</p>
          </div>
          <div className="flex items-center gap-2">
            {totalSeguidores > 0 ? (
              <>
                {seguidores.slice(0, 3).map((seguidor, index) => (
                  <img 
                    key={seguidor.id || index}
                    src={seguidor.fotoPerfil || `https://randomuser.me/api/portraits/${seguidor.genero || 'men'}/${seguidor.id || index + 30}.jpg`}
                    alt={`Seguidor ${seguidor.nome || 'Anônimo'}`}
                    className={`w-8 h-8 rounded-full border-2 border-white object-cover ${index > 0 ? '-ml-2' : ''}`}
                    title={seguidor.nome}
                  />
                ))}
                {totalSeguidores > 3 && (
                  <span className="font-semibold text-gray-700 ml-2">{totalSeguidores - 3}+</span>
                )}
                {totalSeguidores <= 3 && totalSeguidores > 0 && (
                  <span className="font-semibold text-gray-700 ml-2">{totalSeguidores}</span>
                )}
                <button className="text-blue-600 text-sm ml-2 underline hover:text-blue-800 transition">
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
    <div className="flex gap-4 mt-4">
      <div className="flex-1 bg-green-50 rounded-xl p-4 flex items-center gap-4 shadow sticky top-8 z-20">
        <div>
          <div className="font-bold text-lg">Seguidores</div>
          <div className="text-gray-600 text-sm">Usuários que estão seguindo esta empresa</div>
          <div className="flex items-center gap-2 mt-2">
            {totalSeguidores > 0 ? (
              <>
                {seguidores.slice(0, 2).map((seguidor, index) => (
                  <img 
                    key={seguidor.id || index}
                    src={seguidor.fotoPerfil || `https://randomuser.me/api/portraits/${seguidor.genero || 'men'}/${seguidor.id || index + 30}.jpg`}
                    alt={`Seguidor ${seguidor.nome || 'Anônimo'}`}
                    className={`w-8 h-8 rounded-full border-2 border-white object-cover ${index > 0 ? '-ml-2' : ''}`}
                    title={seguidor.nome}
                  />
                ))}
                <span className="font-semibold text-gray-700 ml-2">
                  {totalSeguidores > 2 ? `${totalSeguidores - 2}+` : totalSeguidores}
                </span>
                <button 
                  type="button" 
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
      </div>
      <div className="flex-1 bg-green-50 rounded-xl p-4 flex flex-col justify-between shadow">
        <div>
          <div className="font-bold text-lg">Seguir</div>
          <div className="text-gray-600 text-sm">
            Siga essa empresa e fique por dentro de todas as postagens
          </div>
        </div>
        <button
          className={`mt-4 px-6 py-2 rounded-full cursor-pointer group font-medium flex items-center gap-2 self-start text-white text-lg transition-colors ${
            seguindo ? "bg-green-600 hover:bg-green-700" : "bg-green-400 hover:bg-green-500"
          }`}
          onClick={() => setSeguindo((prev) => !prev)}
        >
          {seguindo ? "Deixar de seguir" : "Seguir"}{" "}
          <span className="text-xl">{seguindo ? "✓" : "+"}</span>
        </button>
      </div>
    </div>
  );
}