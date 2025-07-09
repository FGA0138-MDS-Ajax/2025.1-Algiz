import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SobreEmpresa({ empresa, isOwner }) {
  const [editando, setEditando] = useState(false);
  const [descricao, setDescricao] = useState(empresa?.descricaoEmpresa || "");
  const [descricaoOriginal, setDescricaoOriginal] = useState(empresa?.descricaoEmpresa || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Melhorar o useEffect para debugging e garantir atualização da descrição
  useEffect(() => {
    const fetchDescricao = async () => {
      try {
        if (empresa?.idEmpresa || empresa?.id) {
          const empresaId = empresa?.idEmpresa || empresa?.id;
          console.log(`Buscando descrição atualizada para empresa ID: ${empresaId}`);
          
          // Usar a rota específica para obter a descrição
          const response = await axios.get(
            `http://localhost:3001/api/company/${empresaId}/descricao`
          );
          
          console.log("Descrição obtida da API:", response.data);
          
          // Atualizar estados com a descrição mais recente
          if (response.data && response.data.descricaoEmpresa !== undefined) {
            setDescricao(response.data.descricaoEmpresa);
            setDescricaoOriginal(response.data.descricaoEmpresa);
          }
        }
      } catch (err) {
        console.error("Erro ao buscar descrição:", err);
      }
    };
    
    // Primeiro atualizamos com o que temos localmente
    if (empresa) {
      console.log("Descrição local da empresa:", empresa.descricaoEmpresa);
      setDescricao(empresa.descricaoEmpresa || "");
      setDescricaoOriginal(empresa.descricaoEmpresa || "");
    }
    
    // Depois buscamos a versão mais atualizada da API
    fetchDescricao();
  }, [empresa]);

  const handleSalvar = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Usuário não autenticado");
      }

      const empresaId = empresa?.idEmpresa || empresa?.id;
      console.log(`Salvando descrição para empresa ID: ${empresaId}`);
      
      const response = await axios.patch(
        `http://localhost:3001/api/company/${empresaId}/descricao`,
        { descricaoEmpresa: descricao },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Resposta da API:", response.data);
      setDescricaoOriginal(descricao);
      setEditando(false);
      
      // Atualizar a página para mostrar os dados atualizados
      // Alternativa mais suave ao refresh completo
      window.location.reload();
    } catch (err) {
      console.error("Erro ao salvar descrição:", err);
      setError("Não foi possível salvar a descrição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setDescricao(descricaoOriginal);
    setEditando(false);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xl">Sobre a Empresa</h3>
        {isOwner && !editando && (
          <button
            onClick={() => setEditando(true)}
            className="text-green-600 hover:text-green-800 transition-colors"
            title="Editar descrição"
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

      <div className="text-gray-700">
        {editando ? (
          <div className="space-y-4">
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-green-200 focus:border-green-500 outline-none transition"
              placeholder="Descreva sua empresa, conte sua história, missão, valores e objetivos..."
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleCancelar}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-1"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Salvando...
                  </>
                ) : (
                  "Salvar"
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="prose max-w-none">
            {descricaoOriginal ? (
              <div className="whitespace-pre-wrap">{descricaoOriginal}</div>
            ) : (
              <div className="text-gray-500 italic">
                {isOwner
                  ? "Adicione uma descrição para sua empresa clicando no ícone de edição acima."
                  : "Esta empresa ainda não possui uma descrição."}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}