import React from "react";

export default function SugestoesEmpresas({ usuario }) {
  
  const numeroDeSugestoes = Math.floor(Math.random() * 10) + 1;

  
  const idsAleatorios = [];
  while (idsAleatorios.length < numeroDeSugestoes) {
    const id = Math.floor(Math.random() * 10) + 1; 
    if (!idsAleatorios.includes(id)) {
      idsAleatorios.push(id);
    }
  }

  
  const empresas = JSON.parse(sessionStorage.getItem("fakeEmpresas") || "[]");

  
  const sugestoes = empresas.filter((empresa) => idsAleatorios.includes(Number(empresa.id)));

  return (
    <div className="rounded-3xl bg-gray-100 shadow p-6 h-full flex flex-col">
      <div className="font-bold text-lg mb-2">Empresas que você talvez conheça</div>
      <div className="flex flex-col gap-3">
        {sugestoes.map((empresa) => (
          <div key={empresa.id} className="flex items-center gap-2">
            <img src={empresa.logo} alt={empresa.nome} className="w-8 h-8 rounded-full" />
            <span>{empresa.nome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}