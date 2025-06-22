import React, { useState } from "react";
import { getEstadoCompleto } from "../utils/opcoes_form";
import FormEditarUsuario from "./FormEditarUsuario";
import ModalCropImagem from "./ModalCropImagem";
import ModalFotoPerfil from "./ModalFotoPerfil";

export default function PerfilUsuario({
  usuario,
  isUsuarioLogado,
  visualizandoPublico = false,
  onToggleVisualizacaoPublica,
}) {
  // Verifica se é o usuário logado
  //const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  //const isUsuarioLogado = usuarioLogado?.id === usuario.id;

  // Estados para edição de dados do usuário
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: usuario.nome,
    telefone: usuario.telefone,
    email: usuario.email,
    endereco: usuario.endereco,
  });
  const [erro, setErro] = useState("");
  const [banner, setBanner] = useState(usuario.banner || "/user/banner-padrao-1.png");
  const [perfilPublico, setPerfilPublico] = useState(true);

  // Estados para crop de imagem (delegados ao ModalCropImagem)
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropModalType, setCropModalType] = useState("foto"); // "foto" ou "banner"
  const [selectedImage, setSelectedImage] = useState(null);

  // Estado para modal de foto de perfil
  const [modalFotoOpen, setModalFotoOpen] = useState(false);
  // Estado para modal de banner
  const [modalBannerOpen, setModalBannerOpen] = useState(false);

  // Atualiza campos do formulário de edição
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErro("");
  };

  // Salva dados editados do usuário
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
    setIsEditing(false);
    window.location.reload();
  };

  // Ao selecionar nova foto de perfil, abre o modal de crop
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setCropModalType("foto");
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Ao selecionar novo banner, abre o modal de crop
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setCropModalType("banner");
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Salva imagem cortada (foto ou banner) recebida do ModalCropImagem
  const handleCropSave = (croppedImg) => {
    if (cropModalType === "foto") {
      // Atualiza foto de perfil
      const updatedUsuario = { ...usuario, foto: croppedImg };
      const usuarios = JSON.parse(sessionStorage.getItem("fakeUsers")) || [];
      const updatedUsuarios = usuarios.map((u) =>
        u.id === updatedUsuario.id ? updatedUsuario : u
      );
      sessionStorage.setItem("fakeUsers", JSON.stringify(updatedUsuarios));
      sessionStorage.setItem("usuarioLogado", JSON.stringify(updatedUsuario));
      setCropModalOpen(false);
      window.location.reload();
    } else if (cropModalType === "banner") {
      // Atualiza banner
      const updatedUsuario = { ...usuario, banner: croppedImg };
      const usuarios = JSON.parse(sessionStorage.getItem("fakeUsers")) || [];
      const updatedUsuarios = usuarios.map((u) =>
        u.id === updatedUsuario.id ? updatedUsuario : u
      );
      sessionStorage.setItem("fakeUsers", JSON.stringify(updatedUsuarios));
      sessionStorage.setItem("usuarioLogado", JSON.stringify(updatedUsuario));
      setBanner(croppedImg);
      setCropModalOpen(false);
      window.location.reload();
    }
  };

  // Trocar foto
  const handleTrocarFoto = (file) => {
    setModalFotoOpen(false);
    // Aqui você pode chamar handlePhotoChange ou lógica de crop
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setCropModalType("foto");
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  // Remover foto
  const handleRemoverFoto = () => {
    setModalFotoOpen(false);
    // Atualize para a foto padrão
    const updatedUsuario = { ...usuario, foto: "/user/foto-perfil-padrao-1.png" };
    const usuarios = JSON.parse(sessionStorage.getItem("fakeUsers")) || [];
    const updatedUsuarios = usuarios.map((u) =>
      u.id === updatedUsuario.id ? updatedUsuario : u
    );
    sessionStorage.setItem("fakeUsers", JSON.stringify(updatedUsuarios));
    sessionStorage.setItem("usuarioLogado", JSON.stringify(updatedUsuario));
    window.location.reload();
  };

  // Trocar banner
  const handleTrocarBanner = (file) => {
    setModalBannerOpen(false);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setCropModalType("banner");
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  // Remover banner
  const handleRemoverBanner = () => {
    setModalBannerOpen(false);
    const updatedUsuario = { ...usuario, banner: "/user/banner-padrao-1.png" };
    const usuarios = JSON.parse(sessionStorage.getItem("fakeUsers")) || [];
    const updatedUsuarios = usuarios.map((u) =>
      u.id === updatedUsuario.id ? updatedUsuario : u
    );
    sessionStorage.setItem("fakeUsers", JSON.stringify(updatedUsuarios));
    sessionStorage.setItem("usuarioLogado", JSON.stringify(updatedUsuario));
    window.location.reload();
  };

  // Exibe telefone mascarado
  const telefoneFormatado = usuario.telefone
    ? usuario.telefone.replace(/(\d{2})\d{5}(\d{4})/, "($1) 9 ####-$2")
    : "";

  return (
    <div className="bg-white rounded-xl shadow p-0 overflow-hidden mb-6 relative w-full">
      {/* Banner */}
      <div className="relative group w-full">
        <img
          src={banner}
          alt="Banner do perfil"
          className="w-full h-40 object-cover"
        />
        {/* Botão de editar banner, sempre visível em mobile */}
        {isUsuarioLogado && (
          <button
            type="button"
            className="absolute top-2 right-2 rounded-full p-2 cursor-pointer hover:bg-black transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-30 pointer-events-auto"
            title="Alterar banner"
            style={{ zIndex: 30 }}
            onClick={() => setModalBannerOpen(true)}
          >
            <img src="/icone-camera.png" alt="Alterar banner" className="w-6 h-6" />
          </button>
        )}
        {/* Foto de perfil */}
        <div className="absolute left-1/2 sm:left-8 -bottom-16 z-20 transform -translate-x-1/2 sm:translate-x-0">
          <div className="relative">
            <img
              src={usuario.foto || "/user/foto-perfil-padrao-1.png"}
              alt="Foto de perfil"
              className="w-28 h-28 sm:w-40 sm:h-40 rounded-full shadow bg-white object-cover"
            />
            {isUsuarioLogado && (
              <button
                type="button"
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                style={{ width: "100%", height: "100%" }}
                onClick={() => setModalFotoOpen(true)}
                aria-label="Editar foto de perfil"
              >
                <img src="/icone-camera.png" alt="Alterar foto" className="w-8 h-8" />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Card de dados do usuário */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pt-24 sm:pt-20 pb-6 px-4 sm:px-6 relative gap-4 w-full">
        {/* Botão de editar perfil */}
        {isUsuarioLogado && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 group"
            title="Editar informações"
            style={{ zIndex: 30 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-green-600 group-hover:text-black transition"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 break-words">{usuario.nome}</h2>
          <p className="text-gray-600 break-words">{getEstadoCompleto(usuario.estado)}</p>
          <p className="text-gray-600 break-words">Email: {usuario.email}</p>
          <p className="text-gray-600 break-words">Contato: {telefoneFormatado}</p>
        </div>
        {/* Botão Visualizar como público */}
        {isUsuarioLogado && !visualizandoPublico && (
          <button
            className="flex items-center gap-2 bg-green-200 hover:bg-green-300 text-green-900 font-semibold px-4 sm:px-6 py-2 rounded-lg shadow transition w-auto"
            style={{ minWidth: 0, maxWidth: "100%" }}
            onClick={onToggleVisualizacaoPublica}
            title="Visualizar como público"
          >
            <img
              src="/eye.png"
              alt="Visualizar como público"
              className="w-5 h-5"
            />
            <span className="truncate">Perfil público</span>
          </button>
        )}
      </div>
      {/* Modal de edição de dados */}
      {isEditing && (
        <FormEditarUsuario
          formData={formData}
          erro={erro}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}
      {/* Modal de crop para foto e banner */}
      <ModalCropImagem
        open={cropModalOpen}
        image={selectedImage}
        onClose={() => setCropModalOpen(false)}
        onCropSave={handleCropSave}
        aspect={cropModalType === "foto" ? 1 : 3.5}
        cropShape={cropModalType === "foto" ? "round" : "rect"}
        outputWidth={cropModalType === "foto" ? 160 : 1050}
        outputHeight={cropModalType === "foto" ? 160 : 300}
        label="Salvar"
      />
      {/* Modal para trocar/remover foto de perfil */}
      <ModalFotoPerfil
        open={modalFotoOpen}
        onClose={() => setModalFotoOpen(false)}
        onTrocar={handleTrocarFoto}
        onRemover={handleRemoverFoto}
        fotoAtual={usuario.foto || "/user/foto-perfil-padrao-1.png"}
        tipo="foto"
      />
      {/* Modal para trocar/remover banner */}
      <ModalFotoPerfil
        open={modalBannerOpen}
        onClose={() => setModalBannerOpen(false)}
        onTrocar={handleTrocarBanner}
        onRemover={handleRemoverBanner}
        fotoAtual={banner}
        tipo="banner"
      />
    </div>
  );
}