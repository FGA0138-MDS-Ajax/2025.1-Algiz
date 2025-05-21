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
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg.png)] bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/bg.png')"}}>
      <div className="absolute inset-0 bg-green-950/80 z-0"></div>
      <form onSubmit={handleLogin} className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl p-8 w-[400px] flex flex-col items-center">

        <Link to="/">
          <img src="/logo.png" alt="Logo" className="w-24 mx-auto mb-4 cursor-pointer" />
        </Link>
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>

        <div className="w-full mb-6">
          <label className="block mb-1 text-white font-medium">Email</label>
          <input
            type="email"
            className="input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="w-full mb-6">
          <label className="block mb-1 text-white font-medium">Senha</label>
          <input
            type="password"
            className="input w-full"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="w-full text-right mb-4">
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

      
      <p className="text-center text-sm text-white">
        Não tem uma conta{' '}
        <Link to="/cadastro" className="text-blue-300 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </form>
  </div>
  );
}

export default Login;