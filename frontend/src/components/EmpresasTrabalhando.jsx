import React from "react";

export default function EmpresasTrabalhando({ usuario }) {
  return (
    <div className="rounded-3xl bg-gray-100 shadow p-6">
      <div className="font-bold text-lg">Empresas que estou trabalhando</div>
      <div>
        {(usuario.empresasTrabalhando || []).length === 0 ? (
          <span className="text-gray-500 text-sm">Nenhuma empresa cadastrada.</span>
        ) : (
          <ul className="mt-3 space-y-2">
            {usuario.empresasTrabalhando.map((empresa) => (
              <li key={empresa.id} className="flex items-center gap-3">
                <img
                  src={empresa.logo || "/empresa1.png"} // Logo da empresa ou imagem padrão
                  alt={empresa.nome}
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <span className="text-gray-800 font-medium">{empresa.nome}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}