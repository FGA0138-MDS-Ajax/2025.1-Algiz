import React, { useState } from "react";

export default function ModalCadastroEmpresa({ onClose, onSave, erro }) {
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    endereco: "",
    segmento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-lg mx-4 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-green-50 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-green-900">
            Cadastrar empresa
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-green-700 text-2xl font-bold focus:outline-none"
            title="Fechar"
          >
            ×
          </button>
        </div>
        {/* Form */}
        <form className="px-8 py-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Nome da empresa
              </label>
              <input
                type="text"
                name="nome"
                placeholder="Nome fantasia"
                value={formData.nome}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                CNPJ
              </label>
              <input
                type="text"
                name="cnpj"
                placeholder="00.000.000/0000-00"
                value={formData.cnpj}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="empresa@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Telefone
              </label>
              <input
                type="text"
                name="telefone"
                placeholder="ex: 61 912345678"
                value={formData.telefone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Endereço
              </label>
              <input
                type="text"
                name="endereco"
                placeholder="ex: Qr ## Cnj ###"
                value={formData.endereco}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Segmento
              </label>
              <input
                type="text"
                name="segmento"
                placeholder="ex: Tecnologia"
                value={formData.segmento}
                onChange={handleChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
            </div>
          </div>
          {erro && <div className="text-red-500 text-sm mb-4">{erro}</div>}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition shadow text-lg"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}