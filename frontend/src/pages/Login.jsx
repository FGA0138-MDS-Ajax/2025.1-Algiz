import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // ✅ import icons

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false); // ✅ toggle state
  const [erro, setErro] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password: senha })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || "Erro ao fazer login.");
      }

    // Armazena token e usuário no sessionStorage
    sessionStorage.setItem("authToken", data.token);
    sessionStorage.setItem("usuarioLogado", JSON.stringify(data.user));
    navigate("/");
    window.location.reload(); // Força o refresh após navegar
  } catch (err) {
    setErro(err.message);
    throw new Error("Erro inesperado no servidor. Verifique o backend.");
  }
};


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="absolute inset-0 bg-green-700/5 z-0"></div>
      <form
        onSubmit={handleLogin}
        className="relative z-10 bg-green/5 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 w-[400px] min-h-[550px] flex flex-col items-center"
      >
        <Link
          to="/"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="transition-transform transform hover:scale-110"
        >
          <img
            src={isHovered ? "/logo-4.png" : "/logo.png"}
            alt="Logo"
            className="w-24 mx-auto mb-6 cursor-pointer"
          />
        </Link>

        <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>

        {erro && <div className="text-red-500 mb-4">{erro}</div>}

        <div className="w-full mb-6">
          <label htmlFor="email" className="block mb-1 text-white font-medium">Email</label>
          <input
            id="email"
            type="email"
            className="input w-full pr-10 appearance-none bg-white rounded px-3 py-2 focus:outline-none"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Senha + eye icon */}
        <div className="w-full mb-6 relative">
          <label htmlFor="senha" className="block mb-1 text-white font-medium">Senha</label>
          <input
            id="senha"
            type={mostrarSenha ? "text" : "password"}
            className="input w-full pr-10 appearance-none bg-white rounded px-3 py-2 focus:outline-none"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          {senha && (
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-2 top-[38px] cursor-pointer text-gree-600 hover:text-gree-200"
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        <div className="w-full text-right mb-4">
          <Link to="/esqueci-senha" className="text-sm text-blue-300 hover:underline">
            Esqueci minha senha
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 cursor-pointer text-white py-2 rounded hover:bg-green-700 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-white mt-4">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="text-blue-300 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
