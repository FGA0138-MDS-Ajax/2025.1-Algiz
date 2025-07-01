import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import NavbarLogado from "./Navbar_logado";
import { useEffect, useState } from "react";

function Layout({ children }) {
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

  const noNavbarRoutes = ["/Login", "/cadastro", "/login", "/esqueci-senha", "/codigo-autenticacao", "/redefinir-senha"];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    async function fetchUsuarioCompleto() {
      try {
        const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
        if (!usuarioLogado?.id) return setUsuario(null);

        const token = sessionStorage.getItem("authToken");
        const res = await fetch(
          `http://localhost:3001/api/usuario/${usuarioLogado.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
        } else {
          setUsuario(null);
        }
      } catch {
        setUsuario(null);
      }
    }
    fetchUsuarioCompleto();
  }, []);

  return (
    <>
      {!hideNavbar && (usuario ? <NavbarLogado usuario={usuario} /> : <Navbar />)}
      <div className="min-h-screen">{children}</div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;