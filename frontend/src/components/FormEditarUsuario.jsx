import { generos, estados } from "../utils/opcoes_form";
import PropTypes from "prop-types";

export default function FormEditarUsuario({
  formData,
  erro,
  onChange,
  onSave,
  onClose,
  onEditEmail, // opcional: função para editar email
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-lg mx-4 border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-green-50 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-green-900">
            Editar dados do perfil:
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
            <div>
              <label htmlFor="nome" className="block text-gray-700 font-semibold mb-1">
                Nome
              </label>
              <input
                id="nome"
                type="text"
                name="nome"
                placeholder="Primeiro nome"
                value={formData.nome}
                onChange={onChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="sobrenome" className="block text-gray-700 font-semibold mb-1">
                Sobrenome
              </label>
              <input
                id="sobrenome"
                type="text"
                name="sobrenome"
                placeholder="Sobrenome"
                value={formData.sobrenome}
                onChange={onChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="telefone" className="block text-gray-700 font-semibold mb-1">
                Contato
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
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-1">
                Email
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
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="usuario@gmail.com"
                  value={formData.email}
                  onChange={onChange}
                  className="w-full p-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-400 font-light focus:ring-2 focus:ring-green-200 focus:outline-none transition"
                  required
                  disabled
                />
              </div>
              <div className="flex justify-end mt-1">
                <button
                  type="button"
                  onClick={onEditEmail}
                  className="text-blue-600 text-xs underline hover:text-blue-800"
                  tabIndex={-1}
                >
                  Editar email
                </button>
              </div>
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
            <div>
              <label htmlFor="genero" className="block text-gray-700 font-semibold mb-1">
                Gênero
              </label>
              <select
                id="genero"
                name="genero"
                value={formData.genero}
                onChange={onChange}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
              >
                <option value="">Gênero</option>
                {generos.map((g) => (
                  <option key={g.value} value={g.value}>
                    {g.label}
                  </option>
                ))}
              </select>
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

FormEditarUsuario.propTypes = {
  formData: PropTypes.shape({
    nome: PropTypes.string,
    sobrenome: PropTypes.string,
    telefone: PropTypes.string,
    email: PropTypes.string,
    endereco: PropTypes.string,
    genero: PropTypes.string,
    estado: PropTypes.string,
  }).isRequired,
  erro: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onEditEmail: PropTypes.func,
};