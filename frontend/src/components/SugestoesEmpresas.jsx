import React, { useState } from "react";

export default function SugestoesEmpresas({ sugestoes, onVerTodas }) {
  // State to control which companies are being followed
  const [seguidos, setSeguidos] = useState(Array(sugestoes.length).fill(false));

  const toggleSeguir = (index) => {
    setSeguidos((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sticky top-20 z-30">
      {/* 👇 Smaller title */}
      <h4 className="font-bold text-xm mb-4 whitespace-nowrap">Empresas que talvez você conheça</h4>

      <ul className="space-y-3">
        {sugestoes.map((empresa, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={empresa.logo} alt={empresa.nome} className="w-8 h-8 rounded-full" />
              <div>
                <div className="font-semibold text-sm">{empresa.nome}</div>
              </div>
            </div>
            <button
              onClick={() => toggleSeguir(idx)}
              className={`px-3 py-1 rounded-md cursor-pointer text-sm font-semibold min-w-[90px] transition-colors
                ${seguidos[idx]
                  ? "bg-green-700 text-white"
                  : "border border-green-400 text-green-700 hover:bg-green-100"}`}
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