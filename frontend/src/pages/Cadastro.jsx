import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PopupMessage from "../components/PopupMessage";
import { validateCadastro } from "../utils/validacao";
import { estados } from "../utils/opcoes_form";
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
        const errorMessages = err.response.data.details.map(e => e.mensagem).join(', ');
        setErro(`Erros encontrados: ${errorMessages}`);
      } else if (err.response?.data?.erro) {
        setErro(err.response.data.erro);
        console.log("Erro backend completo:", err.response?.data);
      } else {
        setErro("Erro ao conectar com o servidor");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat relative">
      {showPopup && (
        <PopupMessage action="Cadastro" onClose={() => setShowPopup(false)} />
      )}
      <div className="absolute inset-0 bg-green-950/80 z-0"></div>
      <form
        className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl p-8 w-[700px] h-[700px] flex flex-col"
        onSubmit={handleSubmit}
        style={{ minWidth: 700, minHeight: 750, maxWidth: 700, maxHeight: 750 }}
      >
        <div className="mb-2 flex flex-col items-center">
          <Link
            to="/"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="transition-transform transform hover:scale-110"
          >
            <img
              src={isHovered ? "/logo-4.png" : "/logo.png"}
              alt="Logo"
              className="w-24 mx-auto mb-2 cursor-pointer"
            />
          </Link>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-white text-left w-full">
          Cadastro
        </h2>

        <div className="flex w-full gap-12 flex-1">
          {/* Coluna ESQUERDA */}
          <div className="flex-1 flex flex-col gap-8 justify-start">
            <div>
              <label className="block text-white mb-1" htmlFor="nome">Nome*</label>
              <input
                id="nome"
                name="nome"
                placeholder="Digite seu nome"
                value={form.nome}
                onChange={handleChange}
                required
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-white mb-1" htmlFor="sobrenome">Sobrenome*</label>
              <input
                id="sobrenome"
                name="sobrenome"
                placeholder="Digite seu sobrenome"
                value={form.sobrenome}
                onChange={handleChange}
                required
                className="input w-full"
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
              <label className="block text-white mb-1" htmlFor="celular">Celular*</label>
              <input
                id="celular"
                name="celular"
                placeholder="Ex: (61)91234-5678"
                value={form.celular}
                onChange={handleChange}
                required
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-white mb-1" htmlFor="email">Email*</label>
              <input
                id="email"
                name="email"
                placeholder="Ex: usuario@email.com"
                value={form.email}
                onChange={handleChange}
                required
                type="email"
                className="input w-full"
              />
            </div>
          </div>

          {/* Coluna DIREITA */}
          <div className="flex-1 flex flex-col gap-8 justify-start">
            <div>
              <label className="block text-white mb-1" htmlFor="estado">Estado*</label>
              <select
                id="estado"
                name="estado"
                value={form.estado}
                onChange={handleChange}
                required
                className="input w-full"
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
              <label className="block text-white mb-1" htmlFor="genero">Gênero</label>
              <select
                id="genero"
                name="genero"
                value={form.genero}
                onChange={handleChange}
                className="input w-full"
              >
                <option value="">Gênero (opcional)</option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="nao_dizer">Prefiro não dizer</option>
              </select>
            </div>
            <div>
              <label className="block text-white mb-1" htmlFor="dtNascimento">Data de Nascimento*</label>
              <input
                id="dtNascimento"
                name="dtNascimento"
                type="date"
                value={form.dtNascimento}
                onChange={handleChange}
                required
                className="input w-full"
              />
            </div>
            <div className="relative w-full">
              <label className="block text-white mb-1" htmlFor="senha">Senha*</label>
              <input
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
                value={form.senha}
                onChange={handleChange}
                required
                type={showSenha ? "text" : "password"}
                className="input pr-10 w-full"
              />
              <span
                className="absolute right-3 top-7 bottom-0 my-auto cursor-pointer text-green-900 flex items-center h-5"
                onClick={() => setShowSenha((v) => !v)}
                title="Mostrar/ocultar senha"
              >
                {showSenha ? (
                  <img src="/eye-off.png" alt="Ocultar senha" className="w-5 h-5" />
                ) : (
                  <img src="/eye.png" alt="Mostrar senha" className="w-5 h-5" />
                )}
              </span>
            </div>
            <div className="relative w-full">
              <label className="block text-white mb-1" htmlFor="repetirSenha">Repetir Senha*</label>
              <input
                id="repetirSenha"
                name="repetirSenha"
                placeholder="Repita sua senha"
                value={form.repetirSenha}
                onChange={handleChange}
                required
                type={showRepetir ? "text" : "password"}
                className="input pr-10 w-full"
              />
              <span
                className="absolute right-3 top-7 bottom-0 my-auto cursor-pointer text-green-900 flex items-center h-5"
                onClick={() => setShowRepetir((v) => !v)}
                title="Mostrar/ocultar senha"
              >
                {showRepetir ? (
                  <img src="/eye-off.png" alt="Ocultar senha" className="w-5 h-5" />
                ) : (
                  <img src="/eye.png" alt="Mostrar senha" className="w-5 h-5" />
                )}
              </span>
            </div>
            <button
              className="bg-green-600 hover:bg-green-800 text-white font-bold cursor-pointer py-3 w-full rounded-full transition mb-6"
              type="submit"
            >
              Cadastrar
            </button>
          </div>
        </div>
        {erro && (
          <p className="text-red-400 font-semibold text-sm mt-2">{erro}</p>
        )}
      </form>
    </div>
  );
}
