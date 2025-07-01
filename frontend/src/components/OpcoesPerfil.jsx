import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OpcoesPerfil({ fotoPerfil }) {
  const [isOpen, setIsOpen] = useState(false);
  const API_URL = "http://localhost:3001";
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleLogout = () => {
    sessionStorage.removeItem("usuarioLogado");
    navigate("/Login");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Foto de perfil (botão para abrir o dropdown) */}
      <img
        src={fotoPerfil}
        alt="Foto de perfil"
        className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-fade-in">
          <button
            onClick={handleLogout}
            className="w-full text-left px-6 py-3 text-red-500 hover:bg-red-50 font-medium transition rounded-xl"
          >
            Logout
          </button>
        </div>
      )}
      {/* Animation */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeInDropdown 0.18s ease;
          }
          @keyframes fadeInDropdown {
            from { opacity: 0; transform: translateY(-10px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}