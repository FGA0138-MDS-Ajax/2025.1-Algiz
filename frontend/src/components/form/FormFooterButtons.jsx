import PropTypes from "prop-types";

export default function FormFooterButtons({ onClose, onSave }) {
  return (
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
  );
}

FormFooterButtons.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};