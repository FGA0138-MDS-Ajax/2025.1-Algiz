import { useState } from "react";
import PropTypes from "prop-types";

import InputField from "./form/InputField";
import FormFooterButtons from "./form/FormFooterButtons";
import EstadoDropdown from "./EstadoDropdown";

export default function ModalCadastroEmpresa({ onClose, onSave, erro }) {
  const [formData, setFormData] = useState({
    nome: "",
    razaoSocial: "",
    cnpj: "",
    email: "",
    telefone: "",
    endereco: "",
    estado: "",
    areaAtuacao: "",
  });

  const [erroLocal, setErroLocal] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErroLocal("");

    const dadosParaBackend = {
      nomeComercial: formData.nome,
      razaoSocial: formData.razaoSocial,
      cnpjJuridico: formData.cnpj,
      email: formData.email,
      telefoneJuridico: formData.telefone,
      enderecoJuridico: formData.endereco,
      estadoJuridico: formData.estado,
      areaAtuacao: formData.areaAtuacao,
    };

    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch("http://localhost:3001/api/empresa/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dadosParaBackend),
      });
      const data = await res.json();
      if (res.ok) {
        onSave?.(data.empresa);
        onClose();
      } else {
        setErroLocal(data.erro || "Erro ao cadastrar empresa.");
      }
    } catch (err) {
      console.error("Erro ao cadastrar empresa:", err);
      setErroLocal("Erro ao conectar com o servidor.");
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
              id="nome"
              label="Nome Comercial"
              name="nome"
              value={formData.nome}
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
              id="cnpj"
              label="CNPJ"
              name="cnpj"
              value={formData.cnpj}
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
              id="telefone"
              label="Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="ex: 61 912345678"
              required
            />
            <InputField
              id="endereco"
              label="Endereço"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="ex: Qr ## Cnj ###"
              required
            />
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Estado</label>
              <EstadoDropdown
                value={formData.estado}
                onChange={(value) => setFormData((prev) => ({ ...prev, estado: value }))}
              />
            </div>
            <InputField
              id="segmento"
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
          <FormFooterButtons onClose={onClose} onSave={handleSubmit} />
        </form>
      </div>
    </div>
  );
}

ModalCadastroEmpresa.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  erro: PropTypes.string,
};
