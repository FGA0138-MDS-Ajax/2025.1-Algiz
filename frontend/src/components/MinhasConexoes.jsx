import React from "react";
import { Link } from "react-router-dom";

export default function MinhasConexoes({ usuario }) {
  
  return (
    <div className="rounded-3xl bg-gray-100 shadow p-6 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-lg">Minhas conexões</div>
          <div className="text-gray-700 text-sm">Empresas que estou seguindo</div>
        </div>
        <a href="/conexoes" className="text-green-700 text-sm font-semibold hover:underline">
          Ver todas
        </a>
      </div>
      <div className="flex mt-2">
        {(usuario.empresasSeguindo || []).map((empresa, idx) => (
          <img
            key={empresa.id || idx}
            src={empresa.logo || "/empresa1.png"}
            alt={empresa.nome}
            className={`w-10 h-10 rounded-full border-2 border-white ${idx > 0 ? "-ml-3" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}