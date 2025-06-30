import SidebarUsuarioBase from "./SidebarUsuarioBase";
import PropTypes from "prop-types";

export default function SidebarUsuarioConfiguracoes({ usuario }) {
  const extraLinks = [
    { label: "Privacidade", href: "#privacidade" },
    { label: "Segurança", href: "#seguranca" },
  ];

  return <SidebarUsuarioBase usuario={usuario} extraLinks={extraLinks} />;
}

SidebarUsuarioConfiguracoes.propTypes = {
  usuario: PropTypes.object.isRequired,
};
