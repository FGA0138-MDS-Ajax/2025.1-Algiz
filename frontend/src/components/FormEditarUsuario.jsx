import React from "react";
import { estados } from "../utils/opcoes_form";

export default function FormEditarUsuario({
  formData,
  erro,
  onChange,
  onSave,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          title="Fechar"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Telefone</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={onChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Endereço</label>
          <select
            name="endereco"
            value={formData.endereco}
            onChange={onChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Selecione um estado</option>
            {estados.map((estado, index) => (
              <option key={index} value={estado.value}>
                {estado.label}
              </option>
            ))}
          </select>
        </div>
        {erro && <div className="text-red-500 text-sm mb-4">{erro}</div>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}