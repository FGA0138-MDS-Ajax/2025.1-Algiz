import React, { useState } from "react";

export default function SobreEmpresa({ empresa, isOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [descricao, setDescricao] = useState(empresa.descricao || "");
  const [loading, setLoading] = useState(false);

  const handleSaveDescricao = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      // TODO: Implementar endpoint no backend para atualizar descrição da empresa
      /*
      // Formatar o CNPJ para a busca
      const cnpjFormatado = empresa.cnpjJuridico.replace(/\D/g, '').replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
      
      const response = await fetch(`http://localhost:3001/api/empresa/${cnpjFormatado}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ descricao }),
      });

      if (response.ok) {
        // Atualizar o objeto empresa localmente
        empresa.descricao = descricao;
        setIsEditing(false);
        
        // Opcional: Mostrar notificação de sucesso
        console.log('Descrição atualizada com sucesso!');
      } else {
        throw new Error('Erro ao salvar descrição');
      }
      */
      
      // Simulação temporária - atualizar localmente
      empresa.descricao = descricao;
      setIsEditing(false);
      console.log('Descrição atualizada localmente (temporário):', descricao);
      
    } catch (error) {
      console.error('Erro ao salvar descrição:', error);
      // Opcional: Mostrar notificação de erro
      alert('Erro ao salvar descrição. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setDescricao(empresa.descricao || "");
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-xl">Sobre a empresa</h3>
        {isOwner && !isEditing && (
          <button
            className="text-gray-500 hover:text-gray-700 transition"
            title="Editar descrição"
            onClick={handleStartEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva sua empresa, seus valores, missão e o que ela faz..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows={6}
            maxLength={1000}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {descricao.length}/1000 caracteres
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveDescricao}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {empresa.descricao ? (
            <p className="text-gray-700 text-sm whitespace-pre-wrap">
              {empresa.descricao}
            </p>
          ) : (
            <p className="text-gray-500 text-sm italic">
              {isOwner
                ? "Clique no ícone de edição para adicionar uma descrição da sua empresa..."
                : "Essa empresa ainda não cadastrou uma descrição."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}