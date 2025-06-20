import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OpcoesPerfil() {
  const [isOpen, setIsOpen] = useState(false);
  const API_URL = "http://localhost:3001";
  const [fotoPerfil, setFotoPerfil] = useState(`${API_URL}/images/default/foto-perfil-padrao-usuario-1.png`);
  const navigate = useNavigate();

  useEffect(() => {
    
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    if (usuarioLogado && usuarioLogado.foto) {
      setFotoPerfil(usuarioLogado.foto); 
    }
  }, []);

  const handleVerPerfil = () => {
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado")); 
    if (usuarioLogado && usuarioLogado.id) {
      navigate(`/usuario/${usuarioLogado.id}`); 
    }
    setIsOpen(false); 
  };

  const handleLogout = () => {
    sessionStorage.removeItem("usuarioLogado"); 
    navigate("/Login"); 
    setIsOpen(false); 
  };

  return (
    <div className="relative">
      {/* Foto de perfil (botão para abrir o dropdown) */}
      <img
        src={fotoPerfil} 
        alt="Foto de perfil"
        className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <button
            onClick={handleVerPerfil}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Ver Perfil
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}