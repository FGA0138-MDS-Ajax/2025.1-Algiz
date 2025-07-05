import React, { useState } from "react";

export default function MensagensCard({ usuario }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Mock de dados de mensagens (posteriormente será substituído por dados reais da API)
  const mensagensNaoLidas = usuario?.mensagensNaoLidas || [];
  const totalMensagensNaoLidas = mensagensNaoLidas.length;

  return (
    <div className="bg-white rounded-xl shadow p-4 fixed bottom-6 right-6 w-80 z-40">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Mensagens</span>
          {totalMensagensNaoLidas > 0 && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              {totalMensagensNaoLidas}
            </span>
          )}
        </div>
        <button 
          className="text-gray-500 hover:text-gray-700 transition"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div className="text-sm text-gray-600">
        {totalMensagensNaoLidas > 0 ? (
          `Você tem ${totalMensagensNaoLidas} ${totalMensagensNaoLidas === 1 ? 'nova mensagem' : 'novas mensagens'}`
        ) : (
          'Nenhuma nova mensagem'
        )}
      </div>
    </div>
  );
}