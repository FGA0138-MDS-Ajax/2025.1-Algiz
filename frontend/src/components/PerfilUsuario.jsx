import React, { useState } from "react";
import { estados, getEstadoCompleto } from "../utils/opcoes_form";
import FormEditarUsuario from "./FormEditarUsuario";
import { Form } from "react-admin";

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
  const [banner, setBanner] = useState(usuario.banner || "/default-banner.jpg");

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
    <div className="relative w-full max-w-7xl mx-auto rounded-lg shadow-lg overflow-hidden">
      {/* Banner */}
      <div className="relative h-60 bg-gray-200 group">
        <img
          src={banner}
          alt="Banner do perfil"
          className="w-full h-full object-cover"
        />
        {isUsuarioLogado && (
          <label
            htmlFor="upload-banner"
            className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded cursor-pointer hover:bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
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

      {/* Parte inferior cinza */}
      <div className="bg-gray-100 p-6 flex flex-col items-start relative">
        {/* Ícone de edição */}
        {isUsuarioLogado && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2"
            title="Editar informações"
          >
            <img
              src="/icone-pincel.png"
              alt="Editar informações"
              className="w-6 h-6 hover:opacity-80"
            />
          </button>
        )}

        {/* Foto de perfil */}
        <div className="relative -mt-16 mr-6">
          <img
            src={usuario.foto || "/default-profile.png"}
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
          {isUsuarioLogado && (
            <label
              htmlFor="upload-photo"
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
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

        {/* Informações do usuário */}
        <div className="flex-1">
          <div className="text-left mt-4">
            <h2 className="text-2xl font-bold">{usuario.nome}</h2>
            <div className="text-gray-700 mt-2 text-sm">
              <div>• Contato: {usuario.telefone}</div>
              <div>• Email: {usuario.email}</div>
              <div className="text-center">({getEstadoCompleto(usuario.endereco)})</div>
            </div>
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