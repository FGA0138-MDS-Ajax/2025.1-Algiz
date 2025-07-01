import React from "react";
import { useNavigate } from "react-router-dom";

function MiniCardEmpresa({ empresa }) {
  const navigate = useNavigate();

  const handleFotoClick = () => {
    navigate(`/empresa/${empresa.cnpjJuridico}`);
  };

  return (
    <div className="bg-white rounded-xl shadow flex items-center gap-3 p-3 mb-2 min-w-[220px] max-w-[320px]">
      <button
        onClick={handleFotoClick}
        className="focus:outline-none"
        style={{ border: "none", background: "none", padding: 0 }}
        title={`Ver perfil da empresa ${empresa.nomeComercial}`}
      >
        <img
          src={empresa.logo || "/empresa-default.png"}
          alt={empresa.nomeComercial}
          className="w-12 h-12 rounded-full object-cover"
        />
      </button>
      <div className="flex-1">
        <div className="font-semibold text-gray-800">{empresa.nomeComercial}</div>
        {/* <div className="text-xs text-gray-500">{empresa.dataVinculo || "23/06/2025 - Presente"}</div> */}
        <button className="mt-1 px-3 py-1 border border-green-400 text-green-700 rounded-full text-xs hover:bg-green-50 transition">
          Perfil empresa
        </button>
      </div>
    </div>
  );
}

export default function EmpresasVinculadas({ empresas }) {
  return (
    <div className="bg-gray-50 rounded-2xl border border-green-100 p-4 mt-4">
      <div className="font-bold text-gray-700 mb-2">Empresas vinculadas</div>
      <div>
        {empresas && empresas.length > 0 ? (
          empresas.map((empresa) => (
            <MiniCardEmpresa key={empresa.id || empresa.cnpjJuridico} empresa={empresa} />
          ))
        ) : (
          <div className="text-gray-400 text-sm">Nenhuma empresa vinculada.</div>
        )}
      </div>
    </div>
  );
}