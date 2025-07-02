import React from "react";
import PropTypes from "prop-types";

export default function Tag({ nome }) {
  return (
    <span className="inline-block mb-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded self-start">
      {nome}
    </span>
  );
}

Tag.propTypes = {
  nome: PropTypes.string.isRequired,
};