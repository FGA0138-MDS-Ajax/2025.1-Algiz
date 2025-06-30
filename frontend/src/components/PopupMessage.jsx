import React, { useEffect } from "react";
import PropTypes from "prop-types";

export default function PopupMessage({ action = "Cadastro", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-lg font-semibold animate-fade-in">
    </div>
  );
}

PopupMessage.propTypes = {
  action: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}; 