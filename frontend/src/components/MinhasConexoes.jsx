import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function MinhasConexoes({ usuario, cardClass = "", onVerTodas }) {
  const empresas = usuario.empresasSeguindo || [];
  return (
    <div
      className={`rounded-xl bg-white border border-gray-200 shadow flex flex-col h-full justify-center items-start px-6 py-4 relative ${cardClass}`}
    >
      <div className="text-xl font-bold mb-1 text-left">Minhas Conexões</div>
      <div className="text-gray-500 text-sm mb-3 text-left">
        Empresas que estou seguindo
      </div>
      <div className="flex items-center gap-2 mb-1">
        {empresas.length === 0 ? (
          <span className="text-xs text-gray-400 ml-2">
            Nenhuma conexão por enquanto.
          </span>
        ) : (
          <>
            <span className="text-2xl font-semibold text-gray-700">
              {empresas.length}+
            </span>
            {empresas.slice(0, 5).map((empresa) => (
              <img
                key={empresa.id}
                src={empresa.logo}
                alt={empresa.nome}
                className="w-6 h-6 rounded-full border border-gray-200"
              />
            ))}
          </>
        )}
      </div>
      <button
        onClick={onVerTodas}
        className="text-green-600 font-semibold hover:underline text-xs absolute bottom-4 right-6"
        style={{ padding: 0, margin: 0, background: "transparent" }}
      >
        Ver todas
      </button>
    </div>
  );
}

MinhasConexoes.propTypes = {
  usuario: PropTypes.shape({
    empresasSeguindo: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        logo: PropTypes.string,
        nome: PropTypes.string,
      })
    ),
  }).isRequired,
  cardClass: PropTypes.string,
  onVerTodas: PropTypes.func.isRequired, // Adiciona onVerTodas como prop obrigatória
};