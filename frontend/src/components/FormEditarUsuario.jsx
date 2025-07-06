import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import EstadoDropdown from "./EstadoDropdown";
import GeneroDropdown from "./GeneroDropdown";
import ModalWrapper from "./form/ModalWrapper";
import InputField from "./form/InputField";
import FormFooterButtons from "./form/FormFooterButtons";

export default function FormEditarUsuario({
  formData,
  erro,
  onChange,
  onSave,
  onClose,
  onEditEmail,
}) {
  return (
    <ModalWrapper title="Editar dados do perfil:" onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <InputField
          id="nome"
          name="nome"
          label="Nome"
          placeholder="Primeiro nome"
          value={formData.nome}
          onChange={onChange}
        />
        <InputField
          id="sobrenome"
          name="sobrenome"
          label="Sobrenome"
          placeholder="Sobrenome"
          value={formData.sobrenome}
          onChange={onChange}
        />
        <InputField
          id="telefone"
          name="telefone"
          label="Contato"
          placeholder="ex: 61 912345678"
          value={formData.telefone}
          onChange={onChange}
        />
        <div>
          <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-1">
            Email
          </label>
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
          <div className="flex justify-end mt-1">
            <Link
              to="/configuracoesusuario#seguranca"
              className="text-blue-600 text-xs underline hover:text-blue-800 cursor-pointer"
              tabIndex={-1}
            >
              Editar email
            </Link>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Estado</label>
          <EstadoDropdown value={formData.estado} onChange={(value) => onChange({ target: { name: "estado", value } })} />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Gênero</label>
          <GeneroDropdown value={formData.genero} onChange={(value) => onChange({ target: { name: "genero", value } })} />
        </div>
      </div>

      {erro && <div className="text-red-500 text-sm mb-4">{erro}</div>}

      <FormFooterButtons onClose={onClose} onSave={onSave} />
    </ModalWrapper>
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