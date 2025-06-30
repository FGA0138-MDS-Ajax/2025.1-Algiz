import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [verNovaSenha, setVerNovaSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const code = location.state?.code;

  useEffect(() => {
    if (!email || !code) {
      navigate("/login");
    }
  }, [email, code, navigate]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/usuarios/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          code,
          newPassword: novaSenha
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao redefinir senha.");
      }

      navigate("/login");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="absolute inset-0 bg-green-700/5 z-0"></div>
      <form
        onSubmit={handleSubmit}
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

        <h2 className="text-xl font-bold text-white mb-8 text-center">Redefinir senha</h2>

        {erro && <p className="text-red-500 mb-4 text-sm">{erro}</p>}

        <div className="relative w-full mb-6">
        <label htmlFor="nova-senha" className="block mb-1 text-white font-medium">Nova senha:</label>
            <input
                id="nova-senha"
                type={verNovaSenha ? "text" : "password"}
                className="input w-full"
                placeholder="insira o código"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
            />
    {novaSenha && (
    <button
        type="button"
        className="absolute right-2 top-[38px] cursor-pointer text-gree-600 hover:text-gree-200"
        onClick={() => setVerNovaSenha(!verNovaSenha)}
    >
        {verNovaSenha ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
    )}
    </div>

    <div className="relative w-full mb-6">
    <label htmlFor="confirmar-senha" className="block mb-1 text-white font-medium">Repita a nova senha:</label>
    <input
        id="confirmar-senha"
        type={verConfirmarSenha ? "text" : "password"}
        className="input w-full"
        placeholder="insira o código"
        value={confirmarSenha}
        onChange={(e) => setConfirmarSenha(e.target.value)}
        required
    />
    {confirmarSenha && (
    <button
        type="button"
        className="absolute right-2 top-[38px] cursor-pointer text-gree-400 hover:text-gree-100"
        onClick={() => setVerConfirmarSenha(!verConfirmarSenha)}
    >
        {verConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
    )}
    </div>

        <button
          type="submit"
          className="w-full bg-green-600 cursor-pointer text-white py-2 rounded hover:bg-green-700 transition"
        >
          Redefinir
        </button>
      </form>
    </div>
  );
}

export default RedefinirSenha;
