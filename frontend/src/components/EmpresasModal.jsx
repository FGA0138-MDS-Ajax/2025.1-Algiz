import React from "react";
import PropTypes from "prop-types";

export default function EmpresasModal({ open, onClose, tab, setTab, empresasRecomendadas }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-hidden">
      <div
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full relative"
        style={{ maxHeight: "90vh", minHeight: "90vh", overflow: "hidden" }}
      >
        <button
          className="absolute font-bold top-4 right-6 text-2xl text-gray-400 hover:text-gray-700 cursor-pointer group"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Empresas que talvez você conheça</h2>
        <div className="flex gap-8 mb-6 mt-2 border-b-2 border-gray-200">
          <button
            className={`pb-2 font-semibold ${tab === "recomendadas"
                ? "text-green-700 border-b-2 border-green-700"
                : "text-gray-700 border-b-2 border-transparent hover:border-green-700 hover:text-green-700"
              } transition-colors cursor-pointer group`}
            onClick={() => setTab("recomendadas")}
          >
            As mais recomendadas
          </button>
          <button
            className={`pb-2 font-semibold ${tab === "area"
                ? "text-green-700 border-b-2 border-green-700"
                : "text-gray-700 border-b-2 border-transparent hover:border-green-700 hover:text-green-700"
              } transition-colors cursor-pointer group`}
            onClick={() => setTab("area")}
          >
            Da sua área de interesse
          </button>
        </div>
        <div className="overflow-y-auto pr-5" style={{ maxHeight: "71vh" }}>
          <ul className="space-y-6">
            {(tab === "recomendadas" ? empresasRecomendadas : []).map((empresa) => (
              <li key={empresa.nome} className="flex gap-4 items-start">
                <img
                  src={empresa.img}
                  alt={empresa.nome}
                  className="w-14 h-14 rounded-full bg-white border flex-shrink-0"
                />
                <div className="flex-1 flex flex-col">
                  <div className="font-bold">{empresa.nome}</div>
                  <div className="text-gray-600 text-sm">{empresa.desc}</div>
                  <button className="mt-2 border border-green-400 text-green-700 px-4 py-1 rounded-full text-sm font-semibold hover:bg-green-100 cursor-pointer w-max">
                    Seguir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

EmpresasModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
  empresasRecomendadas: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string,
      nome: PropTypes.string,
      desc: PropTypes.string,
    })
  ).isRequired,
};