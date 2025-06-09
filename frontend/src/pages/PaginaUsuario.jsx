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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const response = await fetch('/api/usuarios/${idUsuario}');
        if (!response.ok) throw new Error("Erro ao buscar usuário");
        const data = await response.json();
        setUsuario(data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar usuário.");
      } finally {
        setLoading(false);
      }
    }
    fetchUsuario();
  }, [idUsuario]);

  if (loading) {
    return (
      <div className="h-32 flex items-ceenter justify-center">
        Carregando informações do usuário...
      </div>
    );
  }

  if (error || !usuario) {
    return (
      <div className="h-32 flex items-center justify-center">
        Usuário não encontrado.
      </div>
    );
  }

  const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
  const isUsuarioLogado = usuarioLogado?.id === usuario?.id;

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