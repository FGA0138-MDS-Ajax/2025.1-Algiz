import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Senha:', senha);
  };

  return (
    <div className="flex items-center justify-center min-hscreen bg-gray-100 pt-14">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2x1 font-bold mb-6 text-center text-green-600">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Senha</label>
          <input
            type="password"
            className="w-full border-gray-300 rounded px-3 py-2"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <div className="text-right">
          <Link to="/esqueci-senha" className="text-sm text-blue-600 hover:underline">
            Esqueci minha senha
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Não tem uma conta{' '}
        <Link to="/cadastro" className="text-blue-600 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  </div>
  );
}

export default Login;