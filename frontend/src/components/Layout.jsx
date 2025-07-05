import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import NavbarLogado from "./Navbar_logado";
import Footer from "./Footer"; // ✅ Add Footer here
import useUsuarioAutenticado from "../hooks/useUsuarioAutenticado";

function Layout({ children }) {
  const location = useLocation();
  const { usuario, carregando } = useUsuarioAutenticado();

  const noNavbarRoutes = [
    "/login",
    "/Login",
    "/cadastro",
    "/esqueci-senha",
    "/codigo-autenticacao",
    "/redefinir-senha",
  ];

  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  if (!hideNavbar && carregando) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 text-lg">Carregando...</p>
      </div>
    );
  }

  return (
    <>
      {!hideNavbar && (usuario ? <NavbarLogado usuario={usuario} /> : <Navbar />)}

      <div className="min-h-screen  flex flex-col">
        <main className="flex-grow">{children}</main>
        {/* ✅ Always show the footer after content */}
        <Footer />
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
