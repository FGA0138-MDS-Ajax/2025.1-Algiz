import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RedefinirSenha() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    // Em breve: lógica para enviar nova senha ao backend

    console.log("Nova senha definida:", novaSenha);
    navigate("/login"); // Redireciona após redefinir
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
        <img
          src={isHovered ? "/logo-4.png" : "/logo.png"}
          alt="Logo"
          className="w-24 mx-auto mb-6 cursor-pointer transition-transform transform hover:scale-110"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />

        <h2 className="text-xl font-bold text-white mb-8 text-center">Redefinir senha</h2>

        {erro && <p className="text-red-400 mb-4 text-sm">{erro}</p>}

        <div className="w-full mb-6">
          <label className="block mb-1 text-white font-medium">Nova senha:</label>
          <input
            type="password"
            className="input w-full"
            placeholder="insira o código"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            required
          />
        </div>

        <div className="w-full mb-6">
          <label className="block mb-1 text-white font-medium">Repita a nova senha:</label>
          <input
            type="password"
            className="input w-full"
            placeholder="insira o código"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
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
