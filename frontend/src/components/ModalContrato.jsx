import { useState } from "react";
import PropTypes from "prop-types";
import ModalWrapper from "./form/ModalWrapper";
import InputField from "./form/InputField";
import FormFooterButtons from "./form/FormFooterButtons";

export default function ModalContrato({ onClose, onSave, empresa }) {
  const [form, setForm] = useState({
    titulo: "",
    cnpjContratado: "",
    descricao: "",
    arquivos: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setForm((prev) => ({
      ...prev,
      arquivos: [...prev.arquivos, ...newFiles],
    }));
  };

  const handleSubmit = () => {
    // Aqui você pode validar ou enviar o form para a API
    onSave(form);
  };

  return (
    <ModalWrapper title="Adicionar Contrato" onClose={onClose}>
      <div className="space-y-4">
        {/* Título */}
        <InputField
          id="titulo"
          label="Título do contrato"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
        />

        {/* Dados do contratante */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mt-3">Dados do contratante:</p>
          <p className="text-sm text-gray-800 mt-1">Nome: {empresa?.nomeComercial || "Nome da empresa contratante"}</p>
          <p className="text-sm text-gray-800">CNPJ: {empresa?.cnpjJuridico || "CNPJ do Contratante"}</p>
        </div>

        {/* CNPJ do contratado */}
        <InputField
          id="cnpjContratado"
          label="Dados do contratado - CNPJ:"
          name="cnpjContratado"
          placeholder="Digite o CNPJ do contratado"
          value={form.cnpjContratado}
          onChange={handleChange}
        />

        {/* Descrição */}
        <div>
          <label htmlFor="descricao" className="block text-gray-700 font-semibold mb-1">
            Descrição:
          </label>
          <textarea
            id="descricao"
            name="descricao"
            rows="4"
            value={form.descricao}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-200 focus:outline-none transition"
            placeholder="Descrição do contrato (opcional)"
          />
        </div>

        {/* Upload de arquivos */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Arquivos anexados:</label>
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-inner">
            <div className="flex flex-wrap items-center gap-3">
            {form.arquivos.map((file, idx) => (
              <span
                key={idx}
                className="flex items-center gap-2 text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full"
              >
                {file.name}
                <button
                  type="button"
                  onClick={() => {
                    const newFiles = form.arquivos.filter((_, i) => i !== idx);
                    setForm((prev) => ({ ...prev, arquivos: newFiles }));
                  }}
                  className="ml-1 text-red-600 hover:text-red-800 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
              <label className="cursor-pointer w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow flex items-center justify-center text-2xl font-bold">
                +
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <FormFooterButtons onClose={onClose} onSave={handleSubmit} />
      </div>
    </ModalWrapper>
  );
}

ModalContrato.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  empresa: PropTypes.object.isRequired,
};