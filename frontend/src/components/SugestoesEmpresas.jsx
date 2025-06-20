import React, { useState } from "react";

export default function SugestoesEmpresas({ sugestoes, onVerTodas }) {
  const [seguidos, setSeguidos] = useState(Array(sugestoes.length).fill(false));

  const toggleSeguir = (index) => {
    setSeguidos((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sticky top-20 z-30 max-w-xs md:max-w-full mx-auto">
      <h4 className="font-bold text-base mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
        Empresas que talvez você conheça
      </h4>

      <ul className="space-y-3">
        {sugestoes.map((empresa, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between gap-2 w-full"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <img
                src={empresa.logo}
                alt={empresa.nome}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
              <div className="font-semibold text-sm truncate">{empresa.nome}</div>
            </div>
            <button
              onClick={() => toggleSeguir(idx)}
              className={`px-2 md:px-3 py-1 rounded-md cursor-pointer text-xs md:text-sm font-semibold flex-shrink-0 transition-colors
                ${seguidos[idx]
                  ? "bg-green-700 text-white"
                  : "border border-green-400 text-green-700 hover:bg-green-100"}`}
              style={{ minWidth: "auto", width: "auto" }}
            >
              {seguidos[idx] ? "Seguindo" : "Seguir"}
            </button>
          </li>
        ))}
      </ul>

      <button
        className="block cursor-pointer text-green-600 hover:text-green-900 hover:font-bold text-sm mt-9 text-center w-full group hover:bg-green-100 px-4 py-2 rounded-md transition-colors"
        onClick={onVerTodas}
      >
        Ver todas
      </button>
    </div>
  );
}