import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function CodigoAutenticacao() {
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email;
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newCodigo = [...codigo];
    newCodigo[index] = value;
    setCodigo(newCodigo);

    if (value && index < 5) {
      const nextInput = document.getElementById(`codigo-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (codigo[index] === "") {
        const prevInput = document.getElementById(`codigo-${index - 1}`);
        if (prevInput) prevInput.focus();
      } else {
        const newCodigo = [...codigo];
        newCodigo[index] = "";
        setCodigo(newCodigo);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newCodigo = [...codigo];
    for (let i = 0; i < pasted.length; i++) {
      newCodigo[i] = pasted[i];
    }
    setCodigo(newCodigo);

    const nextIndex = Math.min(pasted.length, 5);
    const nextInput = document.getElementById(`codigo-${nextIndex}`);
    if (nextInput) nextInput.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const codigoCompleto = codigo.join("");

    try {
      const response = await fetch("http://localhost:3001/api/usuarios/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, code: codigoCompleto })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Código inválido.");
      }

      // Código válido: redireciona para redefinir senha com email e código
      navigate("/redefinir-senha", { state: { email, code: codigoCompleto } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-green-700/5 z-0"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-green/5 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl p-8 w-[400px] min-h-[550px] flex flex-col items-center"
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

        <h2 className="text-xl font-bold text-white text-center mt-8">Código de autenticação</h2>
        <p className="text-white text-sm text-center mb-10 mt-2 mb-5">
          Insira o código de autenticação que enviamos para seu email.
        </p>

        {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}

        <div className="w-full mb-5 mt-auto">
          <label htmlFor="codigo-0" className="block mb-1 text-white font-medium">Código de verificação:</label>
          <div className="flex justify-between gap-2 w-full" onPaste={handlePaste}>
            {codigo.map((valor, index) => (
              <input
                key={`codigo-input-${email || "user"}-${index}`}
                id={`codigo-${index}`}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={valor}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                required
                className="input w-full text-center rounded bg-white text-black font-bold "
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 cursor-pointer text-white py-2 rounded hover:bg-green-700 transition mb-3"
        >
          Redefinir senha
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

export default CodigoAutenticacao;