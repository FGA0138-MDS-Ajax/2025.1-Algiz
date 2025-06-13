import React, { useState } from "react";
import { getEstadoCompleto } from "../utils/opcoes_form";
import FormEditarUsuario from "./FormEditarUsuario";

export default function PerfilUsuario({ usuario }) {
  const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  const isUsuarioLogado = usuarioLogado?.id === usuario.id;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: usuario.nome,
    telefone: usuario.telefone,
    email: usuario.email,
    endereco: usuario.endereco,
  });
  const [erro, setErro] = useState("");
  const [banner, setBanner] = useState(usuario.banner || "/user/banner-padrao-1.png");

  // Empresas seguidas
  const empresas = usuario.empresasSeguindo || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErro("");
  };

  const handleSave = () => {
    if (!formData.nome.trim()) {
      setErro("O nome é obrigatório.");
      return;
    }
    if (!formData.email.trim()) {
      setErro("O email é obrigatório.");
      return;
    }
    if (!formData.endereco.trim()) {
      setErro("O endereço é obrigatório.");
      return;
    }

    const updatedUsuario = { ...usuario, ...formData };
    const usuarios = JSON.parse(sessionStorage.getItem("fakeUsers")) || [];
    const updatedUsuarios = usuarios.map((u) =>
      u.id === updatedUsuario.id ? updatedUsuario : u
    );

    sessionStorage.setItem("fakeUsers", JSON.stringify(updatedUsuarios));
    sessionStorage.setItem("usuarioLogado", JSON.stringify(updatedUsuario));

    setIsEditing(false);
    window.location.reload();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedUsuario = { ...usuario, foto: reader.result };
        const usuarios = JSON.parse(sessionStorage.getItem("fakeUsers")) || [];
        const updatedUsuarios = usuarios.map((u) =>
          u.id === updatedUsuario.id ? updatedUsuario : u
        );

        sessionStorage.setItem("fakeUsers", JSON.stringify(updatedUsuarios));
        sessionStorage.setItem("usuarioLogado", JSON.stringify(updatedUsuario));
        window.location.reload();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedUsuario = { ...usuario, banner: reader.result };
        const usuarios = JSON.parse(sessionStorage.getItem("fakeUsers")) || [];
        const updatedUsuarios = usuarios.map((u) =>
          u.id === updatedUsuario.id ? updatedUsuario : u
        );

        sessionStorage.setItem("fakeUsers", JSON.stringify(updatedUsuarios));
        sessionStorage.setItem("usuarioLogado", JSON.stringify(updatedUsuario));
        setBanner(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-0 overflow-hidden mb-6">
      {/* Banner */}
      <div className="relative">
        <img
          src={banner}
          alt="Banner do perfil"
          className="w-full h-40 object-cover"
        />
        {/* Foto de perfil  */}
        <div className="absolute left-8 -bottom-16 z-10">
          <img
            src={usuario.foto || "/user/foto-perfil-padrao-1.png"}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full border-4 border-white shadow bg-white object-cover"
          />
          {isUsuarioLogado && (
            <label
              htmlFor="upload-photo"
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              style={{ width: "128px", height: "128px" }}
            >
              <img src="/icone-camera.png" alt="Alterar foto" className="w-8 h-8" />
              <input
                type="file"
                id="upload-photo"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </label>
          )}
        </div>
        {isUsuarioLogado && (
          <label
            htmlFor="upload-banner"
            className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded cursor-pointer hover:bg-black/70 flex items-center justify-center"
            title="Alterar banner"
          >
            <img src="/icone-camera.png" alt="Alterar banner" className="w-8 h-8" />
            <input
              type="file"
              id="upload-banner"
              accept="image/*"
              className="hidden"
              onChange={handleBannerChange}
            />
          </label>
        )}
      </div>
      {/* Card */}
      <div className="flex flex-row justify-between items-end pt-20 pb-6 px-6 relative">
        <div>
          {isUsuarioLogado && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4"
              title="Editar informações"
            >
              <img
                src="/icone-pincel.png"
                alt="Editar informações"
                className="w-6 h-6 hover:opacity-80"
              />
            </button>
          )}
          <h2 className="text-3xl font-bold">{usuario.nome}</h2>
          <p className="text-gray-600">Email: {usuario.email}</p>
          <p className="text-gray-600">
            Contato: {usuario.telefone.replace(/(\d{2})\d{5}(\d{4})/, "($1) 9*****-$2")}
          </p>
          <p className="text-gray-500">{getEstadoCompleto(usuario.endereco)}</p>
        </div>
        {/* Conexões */}
        <div className="flex flex-col items-start justify-end min-w-[220px]">
          <span className="font-bold text-2xl">Conexões</span>
          <span className="text-gray-500 text-sm mt-1">Empresas que estou seguindo</span>
          <div className="flex items-center -space-x-3 mt-3">
            {empresas.slice(0, 3).map((empresa, idx) => (
              <img
                key={empresa.id}
                src={empresa.logo}
                alt={empresa.nome}
                className="w-10 h-10 rounded-full border-2 border-white shadow"
                style={{ zIndex: 10 - idx }}
              />
            ))}
            <span className="ml-4 text-gray-700 font-bold text-lg">
              {empresas.length > 3 ? `${empresas.length}+` : empresas.length}
            </span>
            <a
              href="#"
              className="text-green-700 text-sm font-semibold ml-6 hover:underline"
              style={{ whiteSpace: "nowrap" }}
            >
              Ver todos
            </a>
          </div>
        </div>
      </div>
      {/* Modal de edição */}
      {isEditing && (
        <FormEditarUsuario
          formData={formData}
          erro={erro}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}