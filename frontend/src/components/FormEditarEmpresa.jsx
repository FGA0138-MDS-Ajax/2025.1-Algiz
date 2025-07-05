import PropTypes from "prop-types";
import EstadoDropdown from "./EstadoDropdown";
import ModalWrapper from "./form/ModalWrapper";
import InputField from "./form/InputField";
import FormFooterButtons from "./form/FormFooterButtons";

export default function FormEditarEmpresa({ formData, erro, onChange, onSave, onClose }) {
  return (
    <ModalWrapper title="Editar dados da empresa:" onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <InputField
          id="nomeComercial"
          name="nomeComercial"
          label="Nome Comercial"
          placeholder="Nome comercial da empresa"
          value={formData.nomeComercial}
          onChange={onChange}
        />
        <InputField
          id="razaoSocial"
          name="razaoSocial"
          label="Razão Social"
          placeholder="Razão social da empresa"
          value={formData.razaoSocial}
          onChange={onChange}
        />
        <InputField
          id="cnpjJuridico"
          name="cnpjJuridico"
          label="CNPJ"
          placeholder="00.000.000/0000-00"
          value={formData.cnpjJuridico}
          onChange={onChange}
          disabled
          className="bg-gray-100 text-gray-400"
        />
        <InputField
          id="telefone"
          name="telefone"
          label="Telefone"
          placeholder="ex: 61 912345678"
          value={formData.telefone}
          onChange={onChange}
        />
        <InputField
          id="email"
          name="email"
          label="Email"
          placeholder="empresa@exemplo.com"
          type="email"
          value={formData.email}
          onChange={onChange}
        />
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Estado</label>
          <EstadoDropdown value={formData.estado} onChange={(value) => onChange({ target: { name: "estado", value } })} />
        </div>
        <InputField
          id="endereco"
          name="endereco"
          label="Endereço"
          placeholder="Endereço completo da empresa"
          value={formData.endereco}
          onChange={onChange}
          className="md:col-span-2"
        />
        <InputField
          id="setor"
          name="setor"
          label="Setor de Atuação"
          placeholder="ex: Tecnologia, Varejo, Serviços"
          value={formData.setor}
          onChange={onChange}
          className="md:col-span-2"
        />
      </div>

      {erro && <div className="text-red-500 text-sm mb-4">{erro}</div>}

      <FormFooterButtons onClose={onClose} onSave={onSave} />
    </ModalWrapper>
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
