import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PopupMessage from "../components/PopupMessage";
import { validateCadastro } from "../utils/validacao";
import { estados, generos } from "../utils/opcoes_form";
import { Eye, EyeOff } from "lucide-react";
import axios from 'axios';

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
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    const error = validateCadastro(form, "pessoa");
    if (error) {
      setErro(error);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/api/usuarios/register',
        {
          nome: form.nome,
          sobrenome: form.sobrenome,
          email: form.email,
          senha: form.senha,
          telefone: form.celular,
          estado: form.estado,
          sexo: form.genero,
          dtNascimento: form.dtNascimento,
          cpfCnpj: form.cpfCnpj,
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log('Usuário criado:', response.data);
      setShowPopup(true);
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      console.error('Full error:', err);
      if (err.response?.data?.details) {
        // details pode ser array de objetos { field, message }
        const details = err.response.data.details;
        if (Array.isArray(details)) {
          // Mostra cada mensagem em uma lista
          setErro(details.map(e => e.mensagem || e.message || JSON.stringify(e)));
        } else {
          setErro([details.mensagem || details.message || JSON.stringify(details)]);
        }
      } else if (err.response?.data?.erro) {
        setErro([err.response.data.erro]);
        console.log("Erro backend completo:", err.response?.data);
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
        {/* Logo centralizada */}
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
        {/* Título alinhado à esquerda */}
        <h2 className="text-2xl font-bold mb-4 text-white text-left w-full">
          Cadastramento
        </h2>
        {/* Formulário em duas colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          {/* Coluna 1 */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-white mb-1 text-base" htmlFor="nome">Nome</label>
              <input
                id="nome"
                name="nome"
                placeholder="Primeiro nome"
                value={form.nome}
                onChange={handleChange}
                required
                className="input w-full text-base py-2"
              />
            </div>
            <div>
              <label className="block text-white mb-1 text-base" htmlFor="sobrenome">Sobrenome</label>
              <input
                id="sobrenome"
                name="sobrenome"
                placeholder="Sobrenome"
                value={form.sobrenome}
                onChange={handleChange}
                required
                className="input w-full text-base py-2"
              />
            </div>
            <div>
              <label className="block text-white mb-1" htmlFor="cpfCnpj">CPF*</label>
              <input
                id="cpfCnpj"
                name="cpfCnpj"
                placeholder="Digite seu CPF"
                value={form.cpfCnpj}
                onChange={handleChange}
                required
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-white mb-1 text-base" htmlFor="celular">Celular</label>
              <input
                id="celular"
                name="celular"
                placeholder="ex: 61 912345678"
                value={form.celular}
                onChange={handleChange}
                required
                className="input w-full text-base py-2"
              />
            </div>
            <div>
              <label className="block text-white mb-1 text-base" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                placeholder="username@gmail.com"
                value={form.email}
                onChange={handleChange}
                required
                type="email"
                className="input w-full text-base py-2"
              />
            </div>
          </div>
          {/* Coluna 2 */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-white mb-1 text-base" htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                value={form.estado}
                onChange={handleChange}
                required
                className="input w-full text-base py-2"
              >
                {estados.map((e) => (
                  <option
                    key={e.value}
                    value={e.value}
                    disabled={e.disabled}
                    hidden={e.disabled}
                  >
                    {e.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white mb-1 text-base" htmlFor="genero">Gênero</label>
              <select
                id="genero"
                name="genero"
                value={form.genero}
                onChange={handleChange}
                required
                className="input w-full text-base py-2"
              >
                {generos.map((g) => (
                  <option
                    key={g.value}
                    value={g.value}
                    disabled={g.disabled}
                    hidden={g.disabled}
                  >
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white mb-1 text-base" htmlFor="dtNascimento">Data de Nascimento</label>
              <input
                id="dtNascimento"
                name="dtNascimento"
                type="date"
                value={form.dtNascimento}
                onChange={handleChange}
                required
                className="input w-full text-base py-2"
              />
            </div>
            <div className="relative">
              <label className="block text-white mb-1 text-base" htmlFor="senha">Senha</label>
              <input
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
                value={form.senha}
                onChange={handleChange}
                required
                type={showSenha ? "text" : "password"}
                className="input w-full text-base py-2 pr-10"
              />
              {form.senha && (
                <button
                  type="button"
                  onClick={() => setShowSenha(!showSenha)}
                  className="absolute right-3 top-[37px] cursor-pointer text-gree-600 hover:text-gree-200"
                >
                  {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
            <div className="relative">
              <label className="block text-white mb-1 text-base" htmlFor="repetirSenha">Repetir senha</label>
              <input
                id="repetirSenha"
                name="repetirSenha"
                placeholder="Digite sua senha novamente"
                value={form.repetirSenha}
                onChange={handleChange}
                required
                type={showRepetir ? "text" : "password"}
                className="input w-full text-base py-2 pr-10"
              />
              {form.repetirSenha && (
                <button
                  type="button"
                  onClick={() => setShowRepetir(!showRepetir)}
                  className="absolute right-3 top-[37px] cursor-pointer text-gree-600 hover:text-gree-200"
                >
                  {showRepetir ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Botão cadastrar centralizado e largo */}
        <div className="flex justify-center mt-6 col-span-2">
          <button
            className="bg-green-600 hover:bg-green-800 text-white font-bold cursor-pointer py-3 w-full rounded-lg transition text-lg max-w-xs"
            type="submit"
          >
            Cadastrar
          </button>
        </div>
        {erro && (
          <p className="text-red-400 font-semibold text-sm mt-2 text-center">{erro}</p>
        )}
      </form>
    </div>
  );
}
