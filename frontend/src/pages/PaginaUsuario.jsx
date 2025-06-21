import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PerfilUsuario from "../components/PerfilUsuario";
import EmpresasTrabalhando from "../components/EmpresasTrabalhando";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import Salvos from "../components/Salvos";
import EmpresasModal from "../components/EmpresasModal";

export default function PaginaUsuario() {
  const { idUsuario } = useParams();
  console.log("idUsuario:", idUsuario);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEmpresasModal, setShowEmpresasModal] = useState(false);
  const [tab, setTab] = useState("recomendadas");

  useEffect(() => {
    async function fetchUsuario() {
      setLoading(true);
      setError(null);
      try {
        // Pegue o token do localStorage/sessionStorage/cookie conforme seu login
        const token = sessionStorage.getItem("authToken");
        const res = await fetch(
          `http://localhost:3001/api/usuarios/${idUsuario}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include", // se usar cookies/sessão
          }
        );
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
  }, [idUsuario]);

  if (loading) {
    return (
      <div className="h-32 flex items-center justify-center">
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

  // Dados fakes e estáticos para sugestões e empresas recomendadas
  const sugestoes = [
    { id: "1", nome: "Cacau Show", logo: "/cacau.png" },
    { id: "2", nome: "Nestle", logo: "/nestle.png" },
    { id: "3", nome: "Lacta", logo: "/lacta.png" },
    { id: "4", nome: "Coca Cola", logo: "/coca.png" },
    { id: "5", nome: "Terra verde", logo: "/coca.png" },
    { id: "6", nome: "Kactus", logo: "/lacta.png" },
  ];

  const empresasRecomendadas = [
    { id: "1", nome: "Cacau Show", desc: "É uma marca de chocolates nacional, fundada em 1988.", img: "/cacau.png" },
    { id: "2", nome: "Nestle", desc: "Nestlé S.A. é uma empresa transnacional suíça do setor de alimentos e bebidas", img: "/nestle.png" },
    { id: "3", nome: "Lacta", desc: "Lacta é uma empresa brasileira fabricante de chocolates fundada em 1912.", img: "/lacta.png" },
    { id: "4", nome: "Coca Cola", desc: "A marca é reconhecida mundialmente pela sua bebida icônica", img: "/coca.png" },
    { id: "5", nome: "Terra verde", desc: "Terra Verde é uma empresa de alimentos orgânicos e naturais.", img: "/coca.png" },
    { id: "6", nome: "Kactus", desc: "Kactus é uma startup inovadora focada em produtos sustentáveis.", img: "/lacta.png" },
  ];

  return (
    <div className="bg-green-50 min-h-screen py-2">
      <div className="h-12" />
      <main className="flex gap-6 max-w-6xl mx-auto mt-8">
        {/* Coluna principal */}
        <section className="flex-1 flex flex-col gap-1">
          {/* Header do perfil */}
          <PerfilUsuario usuario={usuario} />

          {/* Empresas vinculadas */}
          <EmpresasTrabalhando usuario={usuario} />

          {/* Salvos */}
          <Salvos usuario={usuario} />
        </section>

        {/* Sidebar de empresas sugeridas */}
        <aside className="w-80">
          <SugestoesEmpresas sugestoes={sugestoes} onVerTodas={() => setShowEmpresasModal(true)} />
        </aside>
      </main>
      <EmpresasModal
        open={showEmpresasModal}
        onClose={() => setShowEmpresasModal(false)}
        tab={tab}
        setTab={setTab}
        empresasRecomendadas={empresasRecomendadas}
      />
    </div>
  );
}