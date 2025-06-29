import { useRef } from "react";
import PropTypes from "prop-types";

export default function ModalFotoPerfil({ open, onClose, onTrocar, onRemover, fotoAtual, tipo = "foto" }) {
  const fileInputRef = useRef();

  const handleTrocarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onTrocar(e.target.files[0]);
    }
    
    ModalFotoPerfil.propTypes = {
      open: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      onTrocar: PropTypes.func.isRequired,
      onRemover: PropTypes.func.isRequired,
      fotoAtual: PropTypes.string,
      tipo: PropTypes.oneOf(["foto", "banner"])
    };
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl p-6 w-full max-w-xs flex flex-col items-center relative shadow-lg">
        <button
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-black"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          {tipo === "banner" ? "Banner do perfil" : "Foto de perfil"}
        </h2>
        {tipo === "banner" ? (
          <img
            src={fotoAtual}
            alt="Banner do perfil"
            className="w-72 h-24 rounded-xl object-cover mb-6 border-4 border-green-200"
            style={{ maxWidth: 320, maxHeight: 90 }}
          />
        ) : (
          <img
            src={fotoAtual}
            alt="Foto de perfil"
            className="w-36 h-36 rounded-full object-cover mb-6 border-4 border-green-200"
          />
        )}
        <div className="flex gap-4 w-full justify-center">
          <button
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-full transition flex items-center justify-center"
            onClick={handleTrocarClick}
          >
            Trocar
          </button>
          <button
            className="flex-1 bg-green-100 hover:bg-green-200 text-green-900 font-semibold py-2 rounded-full transition flex items-center justify-center"
            onClick={onRemover}
          >
            Remover
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}