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
      <div className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-lg mx-4 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-green-50 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-green-900">Editar Perfil</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-green-700 text-2xl font-bold focus:outline-none"
            title="Fechar"
          >
            ×
          </button>
        </div>
        {/* Form */}
        <div className="px-8 py-6">
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-1">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={onChange}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-1">Telefone</label>
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={onChange}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-1">Endereço</label>
            <select
              name="endereco"
              value={formData.endereco}
              onChange={onChange}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
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
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              onClick={onSave}
              className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}