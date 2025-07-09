import React from "react";
import PropTypes from "prop-types";

export default function SeguidoresEmpresa({ isOwner, seguindo, setSeguindo, empresa, onVerTodos }) {
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
          <div className="flex items-center gap-2 flex-wrap justify-end">
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
          onClick={() => setSeguindo((prev) => !prev)}
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
