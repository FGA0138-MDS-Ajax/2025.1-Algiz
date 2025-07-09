import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function MenuPerfilEmpresa({ empresa }) {
  const { usuario } = useContext(AuthContext);

  const itemClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded transition text-sm font-medium w-full ${
      isActive
        ? "bg-green-50 text-green-700"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    }`;

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <div className="flex flex-col divide-y divide-gray-200">
        {/* Meu perfil */}
        {usuario && (
          <NavLink to={`/usuario/${usuario.id}`} className={itemClass}>
            <img
              src={usuario.fotoPerfil || "/user/foto-perfil-padrao-1.png"}
              alt="Perfil"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>Meu perfil</span>
          </NavLink>
        )}

        {/* Empresa */}
        <div className="flex items-center gap-3 px-3 py-2">
          <img
            src={empresa.logoUrl || "/user/foto-perfil-padrao-empresa.png"}
            alt="Logo"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-800">
            {empresa.nomeComercial}
          </span>
        </div>
        <div className="pl-11">
          {/* Criar postagem */}
          <NavLink to="/empresa/criar-postagem" className={itemClass}>
            Criar postagem
          </NavLink>

          {/* Contratos */}
          <NavLink to="/empresa/contratos" className={itemClass}>
            Contratos
          </NavLink>

          {/* Configurações */}
          <NavLink to="/#" className={itemClass}>
            Configurações
          </NavLink>
        </div>
      </div>
    </div>
  );
}