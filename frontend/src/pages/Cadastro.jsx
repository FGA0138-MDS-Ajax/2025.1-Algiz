import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PopupMessage from "../components/PopupMessage";
import EstadoDropdown from "../components/EstadoDropdown";
import GeneroDropdown from "../components/GeneroDropdown";
import InputField from "../components/form/InputField";
import { Eye, EyeOff } from "lucide-react";
import axios from 'axios';
import Swal from "sweetalert2";
import {
  validatePasswordsMatch,
  validarSenhaCompleta,
  validateCadastro
} from "../utils/validacao";

export default function Cadastro() {
  const initialForm = {
    nome: "",
    sobrenome: "",
    genero: "",
    celular: "",
    email: "",
    senha: "",
    repetirSenha: "",
    estado: "",
    dtNascimento: "",
    cpfCnpj: "",
  };

  const [form, setForm] = useState(initialForm);
  const [showSenha, setShowSenha] = useState(false);
  const [showRepetir, setShowRepetir] = useState(false);
  const [erro, setErro] = useState({});
  const [senhaErros, setSenhaErros] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    setErro({});

    if (name === "senha") {
      const erros = validarSenhaCompleta(value);
      setSenhaErros(erros);
    }

    if (name === "repetirSenha" || name === "senha") {
      if (updatedForm.repetirSenha) {
        const erroRepetir = validatePasswordsMatch(updatedForm.senha, updatedForm.repetirSenha);
        if (erroRepetir) {
          setErro((prev) => ({ ...prev, repetirSenha: erroRepetir }));
        } else {
          const { repetirSenha, ...rest } = erro;
          setErro(rest);
        }
      } else {
        const { repetirSenha, ...rest } = erro;
        setErro(rest);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    const error = validateCadastro(form, "pessoa");
    if (error) {
      setErro({ [error.field]: error.message });
      return;
    }
    if (senhaErros.length > 0) {
      setErro({ senha: senhaErros.join(" ") });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/users/register", {
        nome: form.nome,
        sobrenome: form.sobrenome,
        email: form.email,
        senha: form.senha,
        telefone: form.celular,
        estado: form.estado,
        sexo: form.genero,
        dtNascimento: form.dtNascimento,
        cpfCnpj: form.cpfCnpj,
      }, {
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire({
        title: "Cadastro realizado com sucesso!",
        text: "Você será redirecionado para a página de login.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response?.data?.details) {
        const details = err.response.data.details;
        if (Array.isArray(details)) {
          setErro(details.map((e) => e.mensagem || e.message || JSON.stringify(e)));
        } else {
          setErro({ geral: details.mensagem || details.message || JSON.stringify(details) });
        }
      } else if (err.response?.data?.erro) {
        setErro([err.response.data.erro]);
      } else {
        setErro(["Erro ao conectar com o servidor"]);
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat relative">
      {showPopup && (
        <PopupMessage action="Cadastro" onClose={() => setShowPopup(false)} />
      )}
      <div className="absolute inset-0 bg-green-700/5 z-0"></div>
      <form
        className="relative z-10 bg-green/5 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl px-8 py-5 w-full max-w-4xl flex flex-col gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-2">
          <Link
            to="/"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="transition-transform transform hover:scale-110"
          >
            <img
              src={isHovered ? "/logo-4.png" : "/logo.png"}
              alt="Logo"
              className="w-20 mx-auto mb-2 cursor-pointer"
            />
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-white text-left w-full">
          Cadastramento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {/* Coluna 1 */}
          <div className="flex flex-col gap-3">
            <InputField
              id="nome"
              name="nome"
              label="Nome"
              placeholder="Primeiro nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
            <InputField
              id="sobrenome"
              name="sobrenome"
              label="Sobrenome"
              placeholder="Sobrenome"
              value={form.sobrenome}
              onChange={handleChange}
              required
            />
            <InputField
              id="cpfCnpj"
              name="cpfCnpj"
              label="CPF*"
              placeholder="Digite seu CPF"
              value={form.cpfCnpj}
              onChange={handleChange}
              required
            />
            {erro.cpfCnpj && (
              <p className="text-red-400 text-sm mt-2">{erro.cpfCnpj}</p>
            )}
            <InputField
              id="celular"
              name="celular"
              label="Celular"
              placeholder="ex: 61 912345678"
              value={form.celular}
              onChange={handleChange}
              required
            />
            <InputField
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="username@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Coluna 2 */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-white mb-1 text-base" htmlFor="estado">Estado</label>
              <EstadoDropdown
                value={form.estado}
                onChange={(value) => setForm((prev) => ({ ...prev, estado: value }))}
              />
            </div>
            <div>
              <label className="block text-white mb-1 text-base" htmlFor="genero">Gênero</label>
              <GeneroDropdown
                value={form.genero}
                onChange={(value) => setForm((prev) => ({ ...prev, genero: value }))}
              />
            </div>
            <InputField
              id="dtNascimento"
              name="dtNascimento"
              label="Data de Nascimento"
              type="date"
              value={form.dtNascimento}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <InputField
                id="senha"
                name="senha"
                label="Senha"
                type={showSenha ? "text" : "password"}
                placeholder="Digite sua senha"
                value={form.senha}
                onChange={handleChange}
                required
              />
              {form.senha && (
                <button
                  type="button"
                  onClick={() => setShowSenha(!showSenha)}
                  className="absolute right-3 top-[37px] text-gray-600 hover:text-gray-400"
                >
                  {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
              {senhaErros.length > 0 && (
                <ul className="text-red-400 text-sm mt-3 list-inside">
                  {senhaErros.map((err) => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative">
              <InputField
                id="repetirSenha"
                name="repetirSenha"
                label="Repetir senha"
                type={showRepetir ? "text" : "password"}
                placeholder="Digite sua senha novamente"
                value={form.repetirSenha}
                onChange={handleChange}
                required
              />
              {form.repetirSenha && (
                <button
                  type="button"
                  onClick={() => setShowRepetir(!showRepetir)}
                  className="absolute right-3 top-[37px] text-gray-600 hover:text-gray-400"
                >
                  {showRepetir ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
              {erro.repetirSenha && (
                <p className="text-red-400 text-sm mt-2">{erro.repetirSenha}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6 col-span-2">
          <button
            className="bg-green-600 hover:bg-green-800 text-white font-bold cursor-pointer py-3 w-full rounded-lg transition text-lg max-w-xs"
            type="submit"
          >
            Cadastrar
          </button>
        </div>

        {typeof erro === "string" && (
          <p className="text-red-400 font-semibold text-sm mt-2 text-center">{erro}</p>
        )}
        {erro.senha && <p className="text-red-400 text-sm mt-2">{erro.senha}</p>}
        {erro.geral && <p className="text-red-400 text-sm mt-2">{erro.geral}</p>}
      </form>
    </div>
  );
}
