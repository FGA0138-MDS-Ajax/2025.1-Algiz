import React from "react";

export default function SugestoesEmpresas({ sugestoes, onVerTodas }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sticky top-20 z-30">
      <h4 className="font-bold text-lg mb-4">Empresas que talvez você conheça</h4>
      <ul className="space-y-3">
        {sugestoes.map((empresa, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={empresa.logo} alt={empresa.nome} className="w-8 h-8 rounded-full" />
              <div>
                <div className="font-semibold">{empresa.nome}</div>
              </div>
            </div>
            <button className="border border-green-400 text-green-700 px-3 py-1 rounded-full cursor-pointer group text-sm hover:bg-green-100">
              Seguir
            </button>
          </li>
        ))}
      </ul>
      <button
        className="block text-green-600 text-sm mt-9 text-center w-full cursor-pointer group hover:bg-green-50 px-4 py-2 rounded-full transition-colors"
        onClick={onVerTodas}
      >
        Ver todas
      </button>
    </div>
  );
}