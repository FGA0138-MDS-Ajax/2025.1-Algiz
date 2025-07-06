import PropTypes from "prop-types";

export default function InputField({ id, label, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 font-semibold mb-1">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
      />
    </div>
  );
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
};