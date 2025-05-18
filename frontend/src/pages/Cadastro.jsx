import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupMessage from "../components/PopupMessage";
import { validateCadastro } from "../utils/validacao";
import { estados, areasAtuacao } from "../utils/opcoes_form";


export default function Cadastro() {
  const [tipo, setTipo] = useState("pessoa");
  const initialForm = {
    nome: "",
    sobrenome: "",
    genero: "",
    razaoSocial: "",
    cnpj: "",
    celular: "",
    telefone: "",
    email: "",
    senha: "",
    repetirSenha: "",
    area: "",
    estado: "",
  };
  const [form, setForm] = useState(initialForm);
  const [showSenha, setShowSenha] = useState(false);
  const [showRepetir, setShowRepetir] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
  }

  function handleTipoChange(novoTipo) {
    setTipo(novoTipo);
    setForm(initialForm);
    setErro("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    const error = validateCadastro(form, tipo);
    if (error) {
      setErro(error);
      return;
    }
    setShowPopup(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat relative">
      {showPopup && (
        <PopupMessage action="Cadastro" onClose={() => setShowPopup(false)} />
      )}
      <div className="absolute inset-0 bg-green-950/80 z-0"></div>
      <form
        className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-2xl p-8 max-w-3xl w-full min-w-[320px] flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div
          className="mb-6 cursor-pointer"
          onClick={() => window.location.href = "/"}
        >
          <img src="/logo.png" alt="Logo" className="w-24 mx-auto" />
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">
          Cadastro {tipo === "pessoa" ? "de Pessoa" : "de Empresa"}
        </h2>
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            className={`px-6 py-2 rounded-full font-bold transition ${
              tipo === "pessoa"
                ? "bg-green-600 text-white"
                : "bg-white/20 text-white border border-white/30"
            }`}
            onClick={() => handleTipoChange("pessoa")}
          >
            Pessoa
          </button>
          <button
            type="button"
            className={`px-6 py-2 rounded-full font-bold transition ${
              tipo === "empresa"
                ? "bg-green-600 text-white"
                : "bg-white/20 text-white border border-white/30"
            }`}
            onClick={() => handleTipoChange("empresa")}
          >
            Empresa
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
          {/* Coluna ESQUERDA: Dados pessoais */}
          <div className="flex-1 flex flex-col gap-4">
            {tipo === "pessoa" ? (
              <>
                <input
                  name="nome"
                  placeholder="Nome*"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  className="input w-full"
                />
                <input
                  name="sobrenome"
                  placeholder="Sobrenome*"
                  value={form.sobrenome}
                  onChange={handleChange}
                  required
                  className="input w-full"
                />
                <select
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
              </>
            ) : (
              <>
                <input
                  name="razaoSocial"
                  placeholder="Razão Social*"
                  value={form.razaoSocial}
                  onChange={handleChange}
                  required
                  className="input w-full"
                />
                <input
                  name="cnpj"
                  placeholder="CNPJ*"
                  value={form.cnpj}
                  onChange={handleChange}
                  required
                  className="input w-full"
                />
                <input
                  name="area"
                  placeholder="Área de atuação* (ex: alimentação, tecnologia...)"
                  value={form.area}
                  onChange={handleChange}
                  list="areas"
                  required
                  className="input w-full"
                />
                <datalist id="areas">
                  {areasAtuacao.map((a) => (
                    <option key={a} value={a} />
                  ))}
                </datalist>
              </>
            )}
          </div>

          {/* Coluna DIREITA: Contato */}
          <div className="flex-1 flex flex-col gap-4">
            {tipo === "empresa" && (
              <input
                name="telefone"
                placeholder="Telefone fixo*"
                value={form.telefone}
                onChange={handleChange}
                required
                className="input w-full"
              />
            )}
            <input
              name="celular"
              placeholder="Celular*"
              value={form.celular}
              onChange={handleChange}
              required
              className="input w-full"
            />
            <input
              name="email"
              placeholder={tipo === "empresa" ? "Email Corporativo*" : "Email*"}
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              className="input w-full"
            />
            <div className="relative w-full">
              <input
                name="senha"
                placeholder="Senha*"
                value={form.senha}
                onChange={handleChange}
                required
                type={showSenha ? "text" : "password"}
                className="input pr-10 w-full"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-green-900"
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
              <input
                name="repetirSenha"
                placeholder="Repetir Senha*"
                value={form.repetirSenha}
                onChange={handleChange}
                required
                type={showRepetir ? "text" : "password"}
                className="input pr-10 w-full"
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-green-900"
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
            <select
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
                  disabled={e.disabled ? true : false}
                  hidden={e.disabled ? true : false}
                >
                  {e.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {erro && (
          <div className="text-red-400 font-bold mt-2">
            {typeof erro === "string" ? erro : erro.message}
          </div>
        )}
        <button
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-full transition"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

