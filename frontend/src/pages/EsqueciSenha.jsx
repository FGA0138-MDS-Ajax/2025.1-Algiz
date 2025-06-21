import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:3001/api/usuarios/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || "Erro ao enviar o código.");
      }

      setSuccessMessage("Um código foi enviado para o seu email.");
      
    } catch (err) {
      setError(err.message);
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
        className="relative z-10 bg-green/5 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 w-[400px] min-h-[550px] flex flex-col"
      >
        <Link
          to="/"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="transition-transform transform hover:scale-110 self-center"
        >
          <img
            src={isHovered ? "/logo-4.png" : "/logo.png"}
            alt="Logo"
            className="w-24 mb-6 cursor-pointer"
          />
        </Link>

        <h2 className="text-xl font-bold text-white text-center mt-8">
          Problemas para entrar?
        </h2>

        <p className="text-white text-sm text-center mt-2 mb-5">
          Insira o seu email e te enviaremos um código para você redefinir sua senha e voltar a acessar a sua conta.
        </p>

        {successMessage && <p className="text-green-400 mb-4 text-sm">{successMessage}</p>}
        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

        <div className="w-full mb-5 mt-auto">
          <label className="block mb-1 text-white font-medium">Qual é o seu email?</label>
          <input
            type="email"
            className="input w-full"
            placeholder="username@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 cursor-pointer text-white py-2 rounded hover:bg-green-700 transition mb-3"
        >
          Enviar código para o email
        </button>

        <div className="w-full mt-4 flex justify-end">
          <Link to="/login" className="text-sm text-blue-300 hover:underline">
            Voltar ao login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EsqueciSenha;
