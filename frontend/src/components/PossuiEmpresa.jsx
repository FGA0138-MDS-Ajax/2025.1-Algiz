import { useState } from "react";
import PropTypes from "prop-types";
import ModalCadastroEmpresa from "./ModalCadastroEmpresa";

export default function PossuiEmpresa({ cardClass = "" }) {
  const [showModal, setShowModal] = useState(false);

  const handleCadastroEmpresa = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSaveEmpresa = (dados) => {
    // Aqui você pode fazer o POST para o backend
    // Exemplo: await axios.post("/api/empresas", dados);
    setShowModal(false);
  };

  return (
    <div
      className={`rounded-xl bg-white border border-gray-200 shadow flex flex-col h-full justify-center items-start px-4 py-4 ${cardClass} min-w-0`}
      style={{ maxWidth: "100%" }}
    >
      <div className="font-bold text-lg mb-1 text-left break-words w-full">
        Você possui uma empresa?
      </div>
      <div className="text-gray-700 mb-3 text-sm text-left break-words w-full">
        Faça o cadastro da sua empresa no <br />nosso sistema.
      </div>
      <button
        className="bg-green-600 text-white font-bold rounded px-4 py-2 transition hover:bg-green-700 text-base flex justify-center items-center w-full sm:w-auto"
        onClick={handleCadastroEmpresa}
        style={{
          minWidth: 0,
          maxWidth: "100%",
          whiteSpace: "normal",
        }}
      >
        Cadastrar empresa
      </button>
      {showModal && (
        <ModalCadastroEmpresa
          onClose={handleCloseModal}
          onSave={handleSaveEmpresa}
        />
      )}
    </div>
  );
}

PossuiEmpresa.propTypes = {
  cardClass: PropTypes.string,
};