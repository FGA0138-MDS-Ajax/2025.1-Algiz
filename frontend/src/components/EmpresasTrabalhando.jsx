import React from "react";
import PropTypes from "prop-types";

export default function EmpresasTrabalhando({ usuario }) {
  const empresas = usuario.empresasTrabalhando || [];
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h3 className="font-bold text-xl mb-4">Empresas vinculadas</h3>
      {empresas.length === 0 ? (
        <div className="text-gray-500 italic">
          Este usuário não possui nenhuma empresa vinculada.
        </div>
      ) : (
        <div className="flex flex-row gap-6">
          {empresas.map((empresa) => (
            <div
              key={empresa.id}
              className="flex items-center bg-white rounded-2xl shadow-md px-6 py-4 min-w-[300px]"
            >
              <img
                src={empresa.logo}
                alt={empresa.nome}
                className="w-14 h-14 rounded-full mr-4"
              />
              <div>
                <div className="font-bold text-lg">{empresa.nome}</div>
                <div className="text-gray-500 text-sm mb-2">
                  {empresa.dataVinculo || "25/05/2025"} - Presente
                </div>
                <a
                  href={`/empresa/${empresa.id}`}
                  className="border border-green-600 text-green-700 font-semibold px-5 py-1 rounded-full hover:bg-green-50 transition-colors"
                >
                  Perfil empresa
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

EmpresasTrabalhando.propTypes = {
  usuario: PropTypes.shape({
    empresasTrabalhando: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        logo: PropTypes.string,
        nome: PropTypes.string,
        dataVinculo: PropTypes.string,
      })
    ),
  }).isRequired,
};