import React from "react";
import { Link } from "react-router-dom";

export default function MinhasConexoes({ usuario }) {
  const empresas = usuario.empresasSeguindo || [];
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 mb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Conexões</h3>
        <button className="text-green-600 font-semibold hover:underline">
          Ver todos
        </button>
      </div>
      <div className="flex items-center gap-2 mt-2">
        {empresas.slice(0, 5).map((empresa) => (
          <img
            key={empresa.id}
            src={empresa.logo}
            alt={empresa.nome}
            className="w-10 h-10 rounded-full border"
          />
        ))}
        <span className="ml-2 text-gray-700 font-semibold">
          {empresas.length}+
        </span>
      </div>
      <div className="text-gray-500 text-sm">
        Empresas que estou seguindo
      </div>
    </div>
  );
}