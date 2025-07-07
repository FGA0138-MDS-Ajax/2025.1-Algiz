import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import NavbarLogado from "./Navbar_logado";
import Footer from "./Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Layout({ children }) {
  const location = useLocation();
  const { usuario } = useContext(AuthContext);

  const hiddenLayoutRoutes = [
    "/login",
    "/Login",
    "/cadastro",
    "/esqueci-senha",
    "/codigo-autenticacao",
    "/redefinir-senha",
  ];

  const hideLayout = hiddenLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && (usuario ? <NavbarLogado /> : <Navbar />)}

      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
        {!hideLayout && <Footer />}
      </div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;