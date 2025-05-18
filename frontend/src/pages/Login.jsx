import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="text-center pt-16">
      <h1 className="text-4xl font-bold text-blue-600">Bem-vindo à Página Login!</h1>
      <p className="mt-4 text-gray-600">Este é o conteúdo do login.</p>
      <Link
        to="/cadastro"
        className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Ir para Cadastro
      </Link>
      
    </div>
    
  );
}

export default Login;