import PropTypes from 'prop-types';

export default function LoadingSpinner({ size, message }) {
  // Determinar tamanho do spinner
  const spinnerSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  const spinnerSize = spinnerSizes[size] || spinnerSizes.md;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`${spinnerSize} border-4 border-green-100 border-t-green-600 rounded-full animate-spin`}></div>
      {message && <p className="mt-3 text-gray-600">{message}</p>}
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  message: PropTypes.string
};

LoadingSpinner.defaultProps = {
  size: 'md',
  message: ''
};