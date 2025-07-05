import PropTypes from "prop-types";

export default function SelectField({ id, label, options, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-semibold mb-1">
        {label}
      </label>
      <select
        id={id}
        {...props}
        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:outline-none transition"
      >
        <option value="">Selecione</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })).isRequired,
};