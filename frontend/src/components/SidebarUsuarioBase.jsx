// components/SidebarUsuarioBase.jsx
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function SidebarUsuarioBase({ usuario, extraLinks }) {
  const telefoneFormatado = usuario.telefone
    ? usuario.telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    : "";

  return (
    <div className="flex flex-col items-center w-full">
      {/* Card do perfil minimizado */}
      <div className="bg-white rounded-xl shadow p-0 mb-4 w-full max-w-xs flex flex-col overflow-hidden">
        <div className="relative w-full h-20 bg-gray-200">
          <img
            src={usuario.bannerPerfil || "/user/banner-padrao-1.png"}
            alt="Banner do perfil"
            className="w-full h-full object-cover"
          />
          <div className="absolute left-4 -bottom-8 z-20">
            <img
              src={usuario.fotoPerfil || "/user/foto-perfil-padrao-1.png"}
              alt="Foto de perfil"
              className="w-16 h-16 rounded-full shadow bg-white object-cover"
            />
          </div>
        </div>
        <div className="flex flex-row items-end gap-3 px-4 pt-2 pb-4 w-full">
          <div className="w-16" />
          <div className="flex flex-col min-w-0">
            <div className="font-bold text-base break-words">
              {usuario.nome} {usuario.sobrenome}
            </div>
            <div className="text-gray-500 text-xs break-words">{usuario.email}</div>
            <div className="text-gray-500 text-xs break-words">{telefoneFormatado}</div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-white rounded-xl shadow p-0 w-full max-w-xs flex flex-col items-center overflow-hidden">
        <nav className="flex flex-col w-full divide-y divide-gray-100">
          <Link to={`/usuario/${usuario.id}`} className="flex items-center gap-2 px-6 py-4 hover:bg-green-50 transition font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span className="text-base">Meu perfil</span>
          </Link>
          <Link to={`/usuario/${usuario.id}?tab=salvos`} className="flex items-center gap-2 px-6 py-4 hover:bg-green-50 transition font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-5-7 5V5z" />
            </svg>
            <span className="text-base">Itens salvos</span>
          </Link>
          <Link to="/configuracoesusuario" className="flex items-center gap-2 px-6 py-4 hover:bg-green-50 transition font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            <span className="text-base">Configurações</span>
          </Link>

          {/* Extra links if passed */}
          {extraLinks?.map((item) => (
            <a key={item.href} href={item.href} className="flex items-center gap-2 px-14 py-4 hover:bg-green-50 transition font-medium text-gray-700">
              <span className="text-base">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

SidebarUsuarioBase.propTypes = {
  usuario: PropTypes.object.isRequired,
  extraLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    })
  ),
};