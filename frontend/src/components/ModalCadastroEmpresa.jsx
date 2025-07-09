import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import InputField from "./form/InputField";
import FormFooterButtons from "./form/FormFooterButtons";
import EstadoDropdown from "./EstadoDropdown";

export default function ModalCadastroEmpresa({ onClose, onSave, erro }) {
  const [formData, setFormData] = useState({
    nomeComercial: "",
    razaoSocial: "",
    cnpjJuridico: "",
    email: "",
    telefoneJuridico: "",
    enderecoJuridico: "",
    estadoJuridico: "",
    areaAtuacao: "",
  });

  const [erroLocal, setErroLocal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroLocal("");
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:3001/api/company/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        onSave?.(response.data.empresa);
        onClose();
        window.location.reload(); // <-- Adicione esta linha para atualizar a página
      }
    } catch (err) {
      console.error("Erro ao cadastrar empresa:", err);
      setErroLocal(
        err.response?.data?.erro ||
        "Erro ao cadastrar empresa. Verifique os dados e tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-4xl mx-4 border border-gray-100">
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-green-50 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-green-900">Cadastrar empresa</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-green-700 text-2xl font-bold focus:outline-none"
            title="Fechar"
          >
            ×
          </button>
        </div>
        <form className="px-8 py-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <InputField
              id="nomeComercial"
              label="Nome Comercial"
              name="nomeComercial"
              value={formData.nomeComercial}
              onChange={handleChange}
              placeholder="Nome fantasia"
              required
            />
            <InputField
              id="razaoSocial"
              label="Razão Social"
              name="razaoSocial"
              value={formData.razaoSocial}
              onChange={handleChange}
              placeholder="Razão social"
              required
            />
            <InputField
              id="cnpjJuridico"
              label="CNPJ"
              name="cnpjJuridico"
              value={formData.cnpjJuridico}
              onChange={handleChange}
              placeholder="00.000.000/0000-00"
              required
            />
            <InputField
              id="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="empresa@email.com"
              required
            />
            <InputField
              id="telefoneJuridico"
              label="Telefone"
              name="telefoneJuridico"
              value={formData.telefoneJuridico}
              onChange={handleChange}
              placeholder="ex: 61 912345678"
              required
            />
            <InputField
              id="enderecoJuridico"
              label="Endereço"
              name="enderecoJuridico"
              value={formData.enderecoJuridico}
              onChange={handleChange}
              placeholder="ex: Qr ## Cnj ###"
              required
            />
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Estado</label>
              <EstadoDropdown
                value={formData.estadoJuridico}
                onChange={(value) => 
                  setFormData((prev) => ({ ...prev, estadoJuridico: value }))
                }
              />
            </div>
            <InputField
              id="areaAtuacao"
              label="Área de Atuação"
              name="areaAtuacao"
              value={formData.areaAtuacao}
              onChange={handleChange}
              placeholder="ex: Tecnologia"
              required
            />
          </div>
          {(erroLocal || erro) && (
            <div className="text-red-500 text-sm mb-4">{erroLocal || erro}</div>
          )}
          <FormFooterButtons 
            onClose={onClose} 
            onSave={handleSubmit} 
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}

ModalCadastroEmpresa.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  erro: PropTypes.string,
};