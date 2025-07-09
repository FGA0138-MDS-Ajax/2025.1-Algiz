import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import EmpresasModal from "../components/EmpresasModal";
import PerfilEmpresa from "../components/PerfilEmpresa";
import SeguidoresEmpresa from "../components/SeguidoresEmpresa";
import SobreEmpresa from "../components/SobreEmpresa";
import UsuariosVinculados from "../components/UsuariosVinculados";
import Salvos from "../components/Salvos";
import MenuPerfilEmpresa from "../components/MenuPerfilEmpresa";
import MensagensCard from "../components/MensagensCard";
import ModalSeguidores from "../components/ModalSeguidores";

const sugestoesEmpresas = [
  { id: "1", nome: "Cacau Show", logo: "/cacau.png" },
  { id: "2", nome: "Nestle", logo: "/nestle.png" },
  { id: "3", nome: "Lacta", logo: "/lacta.png" },
  { id: "4", nome: "Coca Cola", logo: "/coca.png" },
  { id: "5", nome: "Terra verde", logo: "/empresa9.png" },
  { id: "6", nome: "Kactus", logo: "/empresa10.png" },
];

function Empresas() {
  const { idEmpresa } = useParams();
  const { usuario: usuarioLogado, isEditandoImagemEmpresa } = useContext(AuthContext); // NOVO

  const [empresa, setEmpresa] = useState(null);
  const [seguindo, setSeguindo] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("recomendadas");
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [visualizandoPublico, setVisualizandoPublico] = useState(false);
  const [empresasModalOpen, setEmpresasModalOpen] = useState(false);
  const [seguidoresModalOpen, setSeguidoresModalOpen] = useState(false);

  useEffect(() => {
    async function fetchEmpresa() {
      setLoading(true);
      try {
        const idEmpresaLimpo = idEmpresa.replace(/[.\-/]/g, "");
        const res = await fetch(`http://localhost:3001/api/company/${idEmpresaLimpo}`);
        if (!res.ok) throw new Error("Empresa não encontrada");
        const data = await res.json();

        // Configuração de usuários vinculados para exibição
        data.usuariosVinculados = [
          { id: 1, nome: "João Silva", cargo: "Dev", fotoPerfil: "/user/foto-perfil-padrao-1.png", dataVinculacao: "25/09/2023", status: "Presente", genero: "men" },
          { id: 2, nome: "Maria Santos", cargo: "Designer", fotoPerfil: "/user/foto-perfil-padrao-1.png", dataVinculacao: "15/08/2023", status: "Presente", genero: "women" },
          { id: 3, nome: "Pedro Costa", cargo: "Gerente", fotoPerfil: "/user/foto-perfil-padrao-1.png", dataVinculacao: "10/07/2023", status: "Presente", genero: "men" }
        ];

        setEmpresa(data);

        if (usuarioLogado && data.idUsuario === usuarioLogado.id) {
          setIsOwner(true);
        }
      } catch {
        setEmpresa(null);
      } finally {
        setLoading(false);
      }
    }
    // Só busca se NÃO estiver editando imagem da empresa
    if (idEmpresa && !isEditandoImagemEmpresa) fetchEmpresa();
  }, [idEmpresa, usuarioLogado, isEditandoImagemEmpresa]); // NOVO: dependência

  const empresasRecomendadas = sugestoesEmpresas.map((e) => ({
    nome: e.nome,
    img: e.logo,
    desc: "Empresa recomendada para você",
  }));

  const handleToggleVisualizacaoPublica = () => {
    setVisualizandoPublico((v) => !v);
  };

  const isOwnerAtual = !visualizandoPublico && isOwner;

  if (loading) {
    return <div className="h-32 flex items-center justify-center">Carregando empresa...</div>;
  }

  if (!empresa) {
    return <div className="h-32 flex items-center justify-center">Empresa não encontrada.</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 max-w-screen-xl">
      <div className="h-12" />
      <main className="flex gap-6 max-w-6xl mx-auto mt-8">
        <section className="flex-1">
          <PerfilEmpresa
            empresa={empresa}
            isOwner={isOwnerAtual}
            visualizandoPublico={visualizandoPublico}
            onToggleVisualizacaoPublica={handleToggleVisualizacaoPublica}
            onFollowStatusChange={(status) => setSeguindo(status)}
          />
          <SeguidoresEmpresa
            isOwner={isOwnerAtual}
            seguindo={seguindo}
            setSeguindo={setSeguindo}
            empresa={empresa}
            onVerTodos={() => setSeguidoresModalOpen(true)}
          />
          <SobreEmpresa empresa={empresa} isOwner={isOwnerAtual} />
          <UsuariosVinculados empresa={empresa} isOwner={isOwnerAtual} />
          
          {/* ✅ MODIFICADO: Passando a empresa para o componente Salvos */}
          <Salvos empresa={empresa} />
        </section>

        <aside className="w-80">
          <div className="sticky top-20 space-y-6">
            {isOwnerAtual && <MenuPerfilEmpresa empresa={empresa} />}
            <SugestoesEmpresas
              sugestoes={sugestoesEmpresas}
              onVerTodas={() => setEmpresasModalOpen(true)}
            />
          </div>
        </aside>
      </main>

      <EmpresasModal
        open={empresasModalOpen}
        onClose={() => setEmpresasModalOpen(false)}
        tab={tab}
        setTab={setTab}
        empresasRecomendadas={empresasRecomendadas}
      />

      {/* Adicione o modal de seguidores aqui */}
      <ModalSeguidores 
        isOpen={seguidoresModalOpen} 
        onClose={() => setSeguidoresModalOpen(false)} 
        empresa={empresa}
      />

      {isOwnerAtual && (
        <MensagensCard usuario={usuarioLogado} />
      )}

      {visualizandoPublico && isOwner && (
        <button
          onClick={handleToggleVisualizacaoPublica}
          className="fixed bottom-6 left-6 z-50 bg-green-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-800 transition"
        >
          Sair do modo de visualização pública
        </button>
      )}
    </div>
  );
}

export default Empresas;