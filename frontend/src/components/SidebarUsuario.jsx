import SidebarUsuarioBase from "./SidebarUsuarioBase";
import PropTypes from "prop-types";

export default function SidebarUsuario({ usuario }) {
  return <SidebarUsuarioBase usuario={usuario} />;
}

SidebarUsuario.propTypes = {
  usuario: PropTypes.object.isRequired,
};