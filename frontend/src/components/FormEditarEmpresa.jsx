import PropTypes from "prop-types";
import InputField from "./form/InputField";
import FormFooterButtons from "./form/FormFooterButtons";
import ModalWrapper from "./form/ModalWrapper";
import EstadoDropdown from "./EstadoDropdown";

export default function FormEditarEmpresa({ formData, erro, onChange, onSave, onClose }) {
  return (
    <ModalWrapper title="Editar dados da empresa:" onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div className="md:col-span-2">
          <InputField
            id="nomeComercial"
            label="Nome Comercial"
            name="nomeComercial"
            value={formData.nomeComercial}
            onChange={onChange}
          />
        </div>
        <div className="md:col-span-2">
          <InputField
            id="razaoSocial"
            label="Razão Social"
            name="razaoSocial"
            value={formData.razaoSocial}
            onChange={onChange}
          />
        </div>
        <div>
          <InputField
            id="cnpjJuridico"
            label="CNPJ"
            name="cnpjJuridico"
            value={formData.cnpjJuridico}
            onChange={onChange}
            disabled
          />
        </div>
        <div>
          <InputField
            id="telefoneJuridico"
            label="Telefone"
            name="telefoneJuridico"
            value={formData.telefoneJuridico}
            onChange={onChange}
          />
        </div>
        <div>
          <InputField
            id="areaAtuacao"
            label="Área de Atuação"
            name="areaAtuacao"
            value={formData.areaAtuacao}
            onChange={onChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Estado</label>
          <EstadoDropdown
            value={formData.estadoJuridico}
            onChange={(value) =>
              onChange({ target: { name: "estadoJuridico", value } })
            }
          />
        </div>
        <div className="md:col-span-2">
          <InputField
            id="enderecoJuridico"
            label="Endereço"
            name="enderecoJuridico"
            value={formData.enderecoJuridico}
            onChange={onChange}
          />
        </div>
      </div>

      {erro && <div className="text-red-500 text-sm mb-4">{erro}</div>}

      <FormFooterButtons onClose={onClose} onSave={onSave} />
    </ModalWrapper>
  );
}