import React, { useState, useEffect } from "react";
import { getEstadoCompleto } from "../utils/opcoes_form";
import FormEditarUsuario from "./FormEditarUsuario";
import ModalCropImagem from "./ModalCropImagem";
import ModalFotoPerfil from "./ModalFotoPerfil";
import axios from "axios";

export default function PerfilUsuario({
  usuario,
  isUsuarioLogado,
  visualizandoPublico = false,
  onToggleVisualizacaoPublica,
}) {
  // Estados
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: usuario.nome,
    sobrenome: usuario.sobrenome,
    telefone: usuario.telefone,
    estado: usuario.estado,
    sexo: usuario.sexo,
    dataNascimento: usuario.data_nascimento,
    email: usuario.email,
  });
  const [erro, setErro] = useState("");
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropModalType, setCropModalType] = useState("foto");
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalFotoOpen, setModalFotoOpen] = useState(false);
  const [modalBannerOpen, setModalBannerOpen] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(usuario.fotoPerfil || "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png");
  const [banner, setBanner] = useState(usuario.bannerPerfil || "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png");
  const defaultProfileURL = "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png";
  const defaultBannerURL = "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png";

  // Atualiza campos do formulário de edição
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErro("");
  };

  // Formata a data para o formato YYYY-MM-DD
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    return dateStr.split("T")[0];
  };

  // ✅ CORREÇÃO: Usar PUT em vez de POST e rota correta
  const handleSave = async () => {
    if (!formData.nome.trim() || !formData.sobrenome.trim()) {
      setErro("Nome e sobrenome são obrigatórios.");
      return;
    }
    try {
      const token = sessionStorage.getItem("authToken");
      await axios.put(
        `http://localhost:3001/api/users/${usuario.id}/profile`, 
        {
          nome: formData.nome,
          sobrenome: formData.sobrenome,
          telefone: formData.telefone,
          estado: formData.estado,
          sexo: formData.sexo,
          dataNascimento: formatDate(formData.dataNascimento),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      setErro(
        err.response?.data?.erro ||
        err.response?.data?.message ||
        "Erro ao atualizar usuário."
      );
    }
  };

  // Trocar foto
  const handleTrocarFoto = (file) => {
    setModalFotoOpen(false);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setCropModalType("foto");
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
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

  // ✅ CORREÇÃO: Usar PUT e rota correta
  const handleRemoverFoto = async () => {
    setModalFotoOpen(false);
    try {
      const token = sessionStorage.getItem("authToken");
      await axios.put(
        `http://localhost:3001/api/users/${usuario.id}/photo/default`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUsuario = { ...usuario, fotoPerfil: defaultProfileURL };
      sessionStorage.setItem("usuarioLogado", JSON.stringify(updatedUsuario));
      setFotoPerfil(defaultProfileURL);
    } catch (err) {
      console.error("Erro ao remover foto de perfil:", err);
      setErro("Erro ao remover foto de perfil.");
    }
  };

  // ✅ CORREÇÃO: Usar PUT e rota correta
  const handleRemoverBanner = async () => {
    setModalBannerOpen(false);
    try {
      const token = sessionStorage.getItem("authToken");
      await axios.put(
        `http://localhost:3001/api/users/${usuario.id}/banner/default`, 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUsuario = { ...usuario, bannerPerfil: defaultBannerURL };
      sessionStorage.setItem("usuarioLogado", JSON.stringify(updatedUsuario));
      setBanner(defaultBannerURL);
    } catch (err) {
      console.error("Erro ao remover banner:", err);
      setErro("Erro ao remover banner.");
    }
  };

  // Exibe telefone mascarado
  const telefoneFormatado = usuario.telefone
    ? usuario.telefone.replace(/(\d{2})\d{5}(\d{4})/, "($1) 9 ####-$2")
    : "";

  useEffect(() => {
    setFormData({
      nome: usuario.nome || "",
      sobrenome: usuario.sobrenome || "",
      telefone: usuario.telefone || "",
      estado: usuario.estado || "",
      sexo: usuario.sexo || "",
      dataNascimento: usuario.data_nascimento || "",
      email: usuario.email || "",
    });
    setBanner(usuario.bannerPerfil || "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png");
    setFotoPerfil(usuario.fotoPerfil || "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png");
  }, [usuario]);

  return (
    <div className="bg-white rounded-xl shadow p-0 overflow-hidden mb-6 relative w-full">
      {/* Banner */}
      <div className="relative group w-full">
        <img
          src={banner}
          alt="Banner do perfil"
          className="w-full h-40 object-cover"
        />
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
              src={fotoPerfil}
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

         {/* Dados do usuário logado */}        
         {isUsuarioLogado && 
        (
         
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 break-words">{usuario.nome} {usuario.sobrenome}</h2>
          <p className="text-gray-600 break-words">{getEstadoCompleto(usuario.estado)}</p>
          <p className="text-gray-600 break-words">Email: {usuario.email}</p>
          <p className="text-gray-600 break-words">Contato: {telefoneFormatado}</p>
        </div>
        )}
        {/* Dados do usuário não logado */}
         {!isUsuarioLogado && 
        (
         
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 break-words">{usuario.nome} {usuario.sobrenome}</h2>
          
        </div>
        )}
        

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
        aspect={cropModalType === "foto" ? 1 : 3.5}
        cropShape={cropModalType === "foto" ? "round" : "rect"}
        outputWidth={cropModalType === "foto" ? 160 : 1050}
        outputHeight={cropModalType === "foto" ? 160 : 300}
        label="Salvar"
        tipo={cropModalType}
        usuarioId={usuario.id}
        onCropSave={(url) => {
          if (cropModalType === "foto") {
            setFotoPerfil(url);
          } else {
            setBanner(url);
          }
        }}
      />

      {/* Modal para trocar/remover foto de perfil */}
      <ModalFotoPerfil
        open={modalFotoOpen}
        onClose={() => setModalFotoOpen(false)}
        onTrocar={handleTrocarFoto}
        onRemover={handleRemoverFoto}
        fotoAtual={fotoPerfil}
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

import PropTypes from "prop-types";

PerfilUsuario.propTypes = {
  usuario: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string,
    sobrenome: PropTypes.string,
    telefone: PropTypes.string,
    estado: PropTypes.string,
    sexo: PropTypes.string,
    data_nascimento: PropTypes.string,
    email: PropTypes.string,
    fotoPerfil: PropTypes.string,
    bannerPerfil: PropTypes.string,
  }).isRequired,
  isUsuarioLogado: PropTypes.bool.isRequired,
  visualizandoPublico: PropTypes.bool,
  onToggleVisualizacaoPublica: PropTypes.func,
};