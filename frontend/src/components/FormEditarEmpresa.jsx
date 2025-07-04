import { estados } from "../utils/opcoes_form";
import PropTypes from "prop-types";

export default function FormEditarEmpresa({
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
          <h2 className="text-2xl font-bold text-green-900">
            Editar dados da empresa:
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
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="md:col-span-2">
              <label htmlFor="nomeComercial" className="block text-gray-700 font-semibold mb-1">
                Nome Comercial
              </label>
              <input
                id="nomeComercial"
                type="text"
                name="nomeComercial"
                placeholder="Nome comercial da empresa"
                value={formData.nomeComercial}
                onChange={onChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="razaoSocial" className="block text-gray-700 font-semibold mb-1">
                Razão Social
              </label>
              <input
                id="razaoSocial"
                type="text"
                name="razaoSocial"
                placeholder="Razão social da empresa"
                value={formData.razaoSocial}
                onChange={onChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-1">
                CNPJ
                {/* Cadeado SVG preto padrão */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline-block ml-1"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#222"
                    d="M17 10V8a5 5 0 10-10 0v2H5a1 1 0 00-1 1v9a2 2 0 002 2h12a2 2 0 002-2v-9a1 1 0 00-1-1h-1zm-8-2a3 3 0 116 0v2h-6V8zm10 12a1 1 0 01-1 1H6a1 1 0 01-1-1v-9h14v9z"
                  />
                </svg>
              </label>
              <input
                type="text"
                name="cnpjJuridico"
                placeholder="00.000.000/0000-00"
                value={formData.cnpjJuridico}
                onChange={onChange}
                className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-400 font-light focus:ring-2 focus:ring-green-200 focus:outline-none transition"
                disabled
              />
            </div>
            <div>
              <label htmlFor="telefone" className="block text-gray-700 font-semibold mb-1">
                Telefone
              </label>
              <input
                id="telefone"
                type="text"
                name="telefone"
                placeholder="ex: 61 912345678"
                value={formData.telefone}
                onChange={onChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="empresa@exemplo.com"
                value={formData.email}
                onChange={onChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="estado" className="block text-gray-700 font-semibold mb-1">
                Estado
              </label>
              <select
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={onChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              >
                <option value="">Selecione o estado</option>
                {estados.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="endereco" className="block text-gray-700 font-semibold mb-1">
                Endereço
              </label>
              <input
                id="endereco"
                type="text"
                name="endereco"
                placeholder="Endereço completo da empresa"
                value={formData.endereco}
                onChange={onChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="setor" className="block text-gray-700 font-semibold mb-1">
                Setor de Atuação
              </label>
              <input
                id="setor"
                type="text"
                name="setor"
                placeholder="ex: Tecnologia, Varejo, Serviços"
                value={formData.setor}
                onChange={onChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
            </div>
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
              className="px-8 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition shadow text-lg"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

FormEditarEmpresa.propTypes = {
  formData: PropTypes.shape({
    nomeComercial: PropTypes.string,
    razaoSocial: PropTypes.string,
    cnpjJuridico: PropTypes.string,
    telefone: PropTypes.string,
    email: PropTypes.string,
    endereco: PropTypes.string,
    estado: PropTypes.string,
    setor: PropTypes.string,
  }).isRequired,
  erro: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};