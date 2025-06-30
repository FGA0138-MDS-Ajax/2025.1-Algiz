import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import NavbarLogado from "./Navbar_logado";

function Layout({ children }) {
  const location = useLocation();

  
  const noNavbarRoutes = ["/Login", "/cadastro", "/login", "/esqueci-senha", "/codigo-autenticacao", "/redefinir-senha"];

  
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  
  const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));

  return (
    <>
      {!hideNavbar && (usuarioLogado ? <NavbarLogado usuario={usuarioLogado} /> : <Navbar />)}
      <div className="min-h-screen">{children}</div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;