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
  const { usuario: usuarioLogado } = useContext(AuthContext);

  const [empresa, setEmpresa] = useState(null);
  const [seguindo, setSeguindo] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("recomendadas");
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [visualizandoPublico, setVisualizandoPublico] = useState(false);

  useEffect(() => {
    async function fetchEmpresa() {
      setLoading(true);
      try {
        const idEmpresaLimpo = idEmpresa.replace(/[.\-/]/g, "");
        const res = await fetch(`http://localhost:3001/api/empresa/${idEmpresaLimpo}`);
        if (!res.ok) throw new Error("Empresa não encontrada");
        const data = await res.json();

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
    if (idEmpresa) fetchEmpresa();
  }, [idEmpresa, usuarioLogado]);

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
    <div className="bg-green-50 min-h-screen py-2 relative">
      <div className="h-12" />
      <main className="flex gap-6 max-w-6xl mx-auto mt-8">
        <section className="flex-1">
          <PerfilEmpresa
            empresa={empresa}
            isOwner={isOwnerAtual}
            visualizandoPublico={visualizandoPublico}
            onToggleVisualizacaoPublica={handleToggleVisualizacaoPublica}
          />
          <SeguidoresEmpresa
            isOwner={isOwnerAtual}
            seguindo={seguindo}
            setSeguindo={setSeguindo}
            empresa={empresa}
          />
          <SobreEmpresa empresa={empresa} isOwner={isOwnerAtual} />
          <UsuariosVinculados empresa={empresa} isOwner={isOwnerAtual} />
          <Salvos />
        </section>

        <aside className="w-80">
          <Link to={`/configuracoesusuario`} className="flex items-center rounded-xl px-6 py-4 gap-2 mb-8 shadow font-medium text-gray-700 bg-white gap-2 px-6 py-4 hover:bg-green-50 transition font-medium text-gray-700">
            <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.538 2C12.1864 1.99971 12.8073 2.28061 13.2592 2.77871C13.7112 3.27681 13.9557 3.94968 13.936 4.57766L13.9438 4.72535C13.9595 4.87079 14.0037 5.01116 14.0754 5.14054C14.215 5.39567 14.4437 5.58081 14.7109 5.65514C14.978 5.72947 15.2619 5.68688 15.5306 5.51839L15.6805 5.4355C16.8052 4.86897 18.1542 5.31918 18.7781 6.47928L19.3388 7.52174C19.3536 7.54922 19.3667 7.57762 19.3779 7.60674L19.4299 7.71842C19.9314 8.86519 19.5746 10.2293 18.6218 10.9223L18.3865 11.0807C18.2635 11.1726 18.161 11.2926 18.0839 11.4368C17.9446 11.6929 17.9064 11.998 17.9777 12.2844C18.0489 12.5708 18.2239 12.8149 18.4892 12.9793L18.6419 13.0841C19.1031 13.4297 19.4362 13.9391 19.5815 14.523C19.7455 15.1817 19.6576 15.8833 19.3328 16.4804L18.7296 17.557L18.6387 17.7089C17.9299 18.8008 16.5539 19.1344 15.5037 18.485L15.3793 18.4163C15.2494 18.3541 15.1093 18.3199 14.9818 18.316C14.7044 18.3146 14.4379 18.432 14.2418 18.6422C14.0456 18.8524 13.936 19.1379 13.9367 19.4698L13.9293 19.6414C13.8277 20.9703 12.7894 22 11.5383 22H10.4086C9.08365 22 8.00957 20.8493 8.01091 19.4753L8.00315 19.3277C7.98737 19.1822 7.94316 19.0418 7.86787 18.9057C7.7313 18.65 7.50502 18.4633 7.23933 18.3871C6.97364 18.3109 6.69056 18.3516 6.41655 18.5213L6.25375 18.6084C5.73888 18.8565 5.15813 18.9023 4.61394 18.7366C3.99998 18.5497 3.48086 18.1083 3.17792 17.5224L2.5951 16.4442L2.51753 16.2844C1.98677 15.0841 2.4028 13.6412 3.45869 12.9875L3.55498 12.9228C3.83706 12.7137 4.0062 12.3688 4.0062 12C4.0062 11.599 3.8065 11.2284 3.45716 11.0115L3.31542 10.9141C2.29626 10.1548 1.98487 8.68049 2.61622 7.50696L3.20998 6.46166C3.87032 5.23376 5.33373 4.81017 6.45926 5.50171L6.5811 5.5713C6.70531 5.63238 6.84023 5.6648 6.97014 5.66628C7.54297 5.66634 8.00966 5.17352 8.01834 4.54181L8.02612 4.3478C8.07302 3.74716 8.3163 3.1827 8.71399 2.75457C9.16268 2.27155 9.77253 2 10.4086 2H11.538ZM11.5383 3.44774H10.4086C10.132 3.44774 9.86688 3.56581 9.67179 3.77582C9.49888 3.96196 9.3931 4.20741 9.37454 4.43661L9.36225 4.7415C9.26764 6.07087 8.23091 7.11416 6.96305 7.11398C6.63623 7.11034 6.31404 7.03293 5.98548 6.87026L5.80957 6.77085C5.30835 6.46315 4.66923 6.64815 4.37263 7.19925L3.77887 8.24455C3.50681 8.75044 3.64288 9.39466 4.06415 9.70925L4.30256 9.871C4.95917 10.3467 5.35749 11.1429 5.35749 12C5.35749 12.8446 4.97029 13.634 4.30096 14.1296L4.15848 14.2256C3.68949 14.5163 3.5085 15.144 3.72648 15.6383L3.77795 15.7449L4.35338 16.8084C4.48851 17.0696 4.71522 17.2624 4.98336 17.344C5.22102 17.4164 5.47468 17.3964 5.67257 17.3018L5.77198 17.2497C6.32081 16.9066 6.97483 16.8126 7.58865 16.9886C8.20248 17.1645 8.72526 17.5959 9.03535 18.1768C9.20216 18.478 9.30772 18.8132 9.34858 19.1985L9.36701 19.552C9.4239 20.1145 9.86853 20.5523 10.4086 20.5523H11.5383C12.0845 20.5523 12.5382 20.1023 12.5809 19.5511L12.586 19.4421C12.583 18.7585 12.8351 18.1019 13.2863 17.6185C13.7374 17.1351 14.3503 16.865 15.0032 16.8686C15.3235 16.8778 15.6388 16.9547 15.961 17.11L16.25 17.2682C16.7035 17.4814 17.2414 17.3258 17.5141 16.9067L17.5804 16.7957L18.1697 15.7436C18.3089 15.4875 18.3472 15.1824 18.2759 14.896C18.2127 14.6422 18.0678 14.4207 17.8922 14.2882L17.6432 14.1195C17.1671 13.7748 16.821 13.2563 16.672 12.6574C16.508 11.9987 16.5959 11.2971 16.9138 10.7126C17.0878 10.3872 17.3269 10.1073 17.6387 9.87532L17.7856 9.77613C18.2539 9.4827 18.4347 8.85504 18.2183 8.35884L18.1537 8.22529L18.1421 8.19726L17.6073 7.20208C17.3544 6.73175 16.828 6.52853 16.3814 6.6891L16.2799 6.73265L16.1856 6.78415C15.6385 7.12941 14.9858 7.22736 14.3713 7.05641C13.7567 6.88546 13.2309 6.45965 12.9115 5.87616C12.7447 5.57504 12.6392 5.23984 12.5983 4.85454L12.5863 4.60249C12.5944 4.29923 12.4877 4.00536 12.2903 3.78783C12.0929 3.57029 11.8217 3.44774 11.5383 3.44774ZM10.9776 8.73182C12.6623 8.73182 14.028 10.195 14.028 12C14.028 13.805 12.6623 15.2682 10.9776 15.2682C9.29285 15.2682 7.92711 13.805 7.92711 12C7.92711 10.195 9.29285 8.73182 10.9776 8.73182ZM10.9776 10.1796C10.0391 10.1796 9.2784 10.9946 9.2784 12C9.2784 13.0054 10.0391 13.8204 10.9776 13.8204C11.916 13.8204 12.6767 13.0054 12.6767 12C12.6767 10.9946 11.916 10.1796 10.9776 10.1796Z" fill="#4A5565" />
            </svg>
            <span className="text-base">Meu perfil</span>
          </Link>
          <div className="sticky top-20 space-y-6">
            {isOwnerAtual && <MenuPerfilEmpresa empresa={empresa} />}
            <SugestoesEmpresas
              sugestoes={sugestoesEmpresas}
              onVerTodas={() => setModalOpen(true)}
            />
          </div>
        </aside>
      </main>

      <EmpresasModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tab={tab}
        setTab={setTab}
        empresasRecomendadas={empresasRecomendadas}
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