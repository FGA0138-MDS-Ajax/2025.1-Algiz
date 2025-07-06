import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import PerfilUsuario from "../components/PerfilUsuario";
import EmpresasTrabalhando from "../components/EmpresasTrabalhando";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import Salvos from "../components/Salvos";
import EmpresasModal from "../components/EmpresasModal";
import PossuiEmpresa from "../components/PossuiEmpresa";
import MinhasConexoes from "../components/MinhasConexoes";
import { AuthContext } from "../context/AuthContext";

export default function PaginaUsuario() {
  const { idUsuario } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEmpresasModal, setShowEmpresasModal] = useState(false);
  const [tab, setTab] = useState("recomendadas");
  const [visualizandoPublico, setVisualizandoPublico] = useState(false);
  const [empresasVinculadas, setEmpresasVinculadas] = useState([]);

  const { usuario: usuarioLogado } = useContext(AuthContext);

  const isUsuarioLogado = !visualizandoPublico && usuarioLogado?.id === usuario?.id;

  useEffect(() => {
    async function fetchUsuario() {
      setLoading(true);
      setError(null);
      try {
        let url, options;
        if (!usuarioLogado || visualizandoPublico) {
          url = `http://localhost:3001/api/users/${idUsuario}/public`;
          options = { headers: { "Content-Type": "application/json" } };
        } else {
          const token = localStorage.getItem("authToken");
          url = `http://localhost:3001/api/users/${idUsuario}/profile`;
          options = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          };
        }

        const res = await fetch(url, options);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Status ${res.status}: ${errorText}`);
        }

        const data = await res.json();
        setUsuario(data);
      } catch (err) {
        setError(err.message);
        console.error("Erro ao buscar usuário:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsuario();
  }, [idUsuario, visualizandoPublico, usuarioLogado]);

  {/* CODIGO QUE NAO ESTA SENDO UTILIZado NO MOMENTO
  useEffect(() => {
    async function fetchEmpresasVinculadas() {
      if (usuario) {
        try {
          const token = localStorage.getItem("authToken");
          const res = await fetch("http://localhost:3001/api/empresa", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const empresas = await res.json();
          const vinculadas = empresas.filter((e) => e.idUsuario === usuario.id);
          setEmpresasVinculadas(vinculadas);
        } catch {
          setEmpresasVinculadas([]);
        }
      }
    }
    fetchEmpresasVinculadas();
  }, [usuario]);
*/}
  const sugestoes = [
    { id: "1", nome: "Cacau Show", logo: "/cacau.png" },
    { id: "2", nome: "Nestle", logo: "/nestle.png" },
    { id: "3", nome: "Lacta", logo: "/lacta.png" },
    { id: "4", nome: "Coca Cola", logo: "/coca.png" },
    { id: "5", nome: "Terra verde", logo: "/coca.png" },
    { id: "6", nome: "Kactus", logo: "/lacta.png" },
  ];

  const empresasRecomendadas = sugestoes.map((e) => ({
    id: e.id,
    nome: e.nome,
    desc: "Empresa recomendada para você",
    img: e.logo,
  }));

  const handleToggleVisualizacaoPublica = () => {
    setVisualizandoPublico((v) => !v);
  };

  if (loading) {
    return (
      <div className="h-32 flex items-center justify-center pt-16">
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

  return (
    <div className="bg-green-50 min-h-screen py-2 relative pt-16">
      <div className="container mx-auto flex flex-col lg:flex-row gap-6 max-w-6xl mt-8">
        {/* Coluna principal */}
        <section className="flex-1 flex flex-col gap-2">
          <PerfilUsuario
            usuario={usuario}
            isUsuarioLogado={isUsuarioLogado}
            visualizandoPublico={visualizandoPublico}
            onToggleVisualizacaoPublica={handleToggleVisualizacaoPublica}
          />

          {isUsuarioLogado ? (
            <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-center">
              <div className="w-full md:flex-1 min-w-[220px] max-w-[420px] h-[160px]">
                <PossuiEmpresa usuario={usuario} cardClass="h-full" />
              </div>
              <div className="w-full md:flex-1 min-w-[220px] max-w-[420px] h-[160px]">
                <MinhasConexoes usuario={usuario} cardClass="h-full" />
              </div>
            </div>
          ) : (
            <EmpresasTrabalhando usuario={usuario} />
          )}

          {/* <EmpresasVinculadas empresas={empresasVinculadas} /> */}
          <Salvos usuario={usuario} />
        </section>

        {/* Sidebar de sugestões */}
        <aside className="w-full lg:w-80 mt-6 lg:mt-0">
          <SugestoesEmpresas
            sugestoes={sugestoes}
            onVerTodas={() => setShowEmpresasModal(true)}
          />
        </aside>
      </div>

      <EmpresasModal
        open={showEmpresasModal}
        onClose={() => setShowEmpresasModal(false)}
        tab={tab}
        setTab={setTab}
        empresasRecomendadas={empresasRecomendadas}
      />

      {visualizandoPublico && (
        <button
          onClick={handleToggleVisualizacaoPublica}
          className="fixed bottom-6 right-6 z-50 bg-green-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-800 transition"
        >
          Sair do modo de visualização pública
        </button>
      )}
    </div>
  );
}