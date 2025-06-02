import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PerfilUsuario from "../components/PerfilUsuario";
import PossuiEmpresa from "../components/PossuiEmpresa";
import MinhasConexoes from "../components/MinhasConexoes";
import EmpresasTrabalhando from "../components/EmpresasTrabalhando";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import Salvos from "../components/Salvos";

export default function PaginaUsuario() {
  const { idUsuario } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const users = JSON.parse(sessionStorage.getItem("fakeUsers") || "[]");
    const found = users.find((u) => u.id === idUsuario);
    setUsuario(found);
  }, [idUsuario]);

  const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  const isUsuarioLogado = usuarioLogado?.id === usuario?.id;

  if (!usuario)
    return (
      <div className="h-32 flex items-center justify-center">
        Usuário não encontrado.
      </div>
    );

  return (
    <div className="bg-white px-8 py-6">
      <div className="h-20" />
      <div className="flex gap-6">
        {/* Coluna principal */}
        <div className="flex-1 flex flex-col gap-6 min-h-screen">
          <div className="max-w-7xl ">
            <PerfilUsuario usuario={usuario} />
            <div className="flex gap-6 mt-6">
              {isUsuarioLogado ? (
                <>
                  <div className="w-1/2">
                    <PossuiEmpresa usuario={usuario} />
                  </div>
                  <div className="w-1/2">
                    <MinhasConexoes usuario={usuario} />
                  </div>
                </>
              ) : (
                <div className="w-full">
                  <MinhasConexoes usuario={usuario} />
                </div>
              )}
            </div>
            <div className="mt-6">
              <EmpresasTrabalhando usuario={usuario} />
            </div>
            <div className="mt-6">
              <Salvos usuario={usuario} />
            </div>
          </div>
        </div>
        <div className="w-[320] flex-shrink-0 self-start">
          <SugestoesEmpresas usuario={usuario} />
        </div>
      </div>
    </div>
  );
}