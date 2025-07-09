import { useState, useEffect } from "react";
import { useModal } from "../context/ModalContext";
import ModalFotoPerfil from "./ModalFotoPerfil";
import axios from "axios";

export default function PerfilEmpresa({ empresa, isOwner, visualizandoPublico, onToggleVisualizacaoPublica, onFollowStatusChange }) {
  const { openEditarEmpresaModal, openCropModal } = useModal();
  
  // Estados para controle dos modais
  const [modalFotoOpen, setModalFotoOpen] = useState(false);
  const [modalBannerOpen, setModalBannerOpen] = useState(false);
  const [erro, setErro] = useState("");
  
  // Estado para controlar se o usuário segue a empresa
  const [seguindo, setSeguindo] = useState(false);
  // Estado para indicar loading durante operações de follow/unfollow
  const [loadingFollow, setLoadingFollow] = useState(false);
  
  // Estados das imagens com URLs corretas
  const [logoEmpresa, setLogoEmpresa] = useState(
    empresa?.fotoEmpresa || 
    "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png"
  );
  const [bannerEmpresa, setBannerEmpresa] = useState(
    empresa?.bannerEmpresa || 
    "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png"
  );

  // URLs padrão
  const defaultLogoURL = "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246125/foto-perfil-padrao-usuario-2_f0ghzz.png";
  const defaultBannerURL = "https://res.cloudinary.com/dupalmuyo/image/upload/v1751246166/banner-padrao-1_lbhrjv.png";

  // Verificar se o usuário está seguindo a empresa
  useEffect(() => {
    const checkFollowStatus = async () => {
      // Só verificar status se não for o proprietário e tiver uma empresa carregada
      if (isOwner || !empresa?.idEmpresa) return;
      
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return; // Usuário não está logado
        
        const empresaId = empresa?.idEmpresa || empresa?.id;
        const response = await axios.get(
          `http://localhost:3001/api/company/${empresaId}/follow/status`, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        setSeguindo(response.data.follows);
        // Propaga o status para o componente pai
        if (onFollowStatusChange) {
          onFollowStatusChange(response.data.follows);
        }
      } catch (error) {
        console.error("Erro ao verificar status de seguidor:", error);
      }
    };
    
    checkFollowStatus();
  }, [empresa, isOwner, onFollowStatusChange]);

  // Handler para alternar seguir/deixar de seguir
  const handleToggleFollow = async () => {
    if (!empresa?.idEmpresa || loadingFollow) return;
    
    setLoadingFollow(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        // Redirecionar para login se não estiver autenticado
        window.location.href = "/login";
        return;
      }
      
      const empresaId = empresa?.idEmpresa || empresa?.id;
      const method = seguindo ? "DELETE" : "POST";
      
      await axios({
        method,
        url: `http://localhost:3001/api/company/${empresaId}/follow`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Atualizar estado local
      const novoStatus = !seguindo;
      setSeguindo(novoStatus);
      
      // Propaga o status para o componente pai
      if (onFollowStatusChange) {
        onFollowStatusChange(novoStatus);
      }
    } catch (error) {
      console.error("Erro ao alterar status de seguidor:", error);
      setErro("Ocorreu um erro ao " + (seguindo ? "deixar de seguir" : "seguir") + " a empresa.");
    } finally {
      setLoadingFollow(false);
    }
  };

  // Atualizar estados quando empresa muda
  useEffect(() => {
    setLogoEmpresa(empresa?.fotoEmpresa || defaultLogoURL);
    setBannerEmpresa(empresa?.bannerEmpresa || defaultBannerURL);
  }, [empresa, defaultLogoURL, defaultBannerURL]);

  // Handler para trocar logo da empresa
  const handleTrocarLogo = (file) => {
    setModalFotoOpen(false);
    const empresaId = empresa?.idEmpresa || empresa?.id;
    openCropModal(file, "foto", empresaId, "empresa");
  };

  // Handler para trocar banner da empresa  
  const handleTrocarBanner = (file) => {
    setModalBannerOpen(false);
    const empresaId = empresa?.idEmpresa || empresa?.id;
    openCropModal(file, "banner", empresaId, "empresa");
  };

  // Handler para remover logo da empresa
  const handleRemoverLogo = async () => {
    setModalFotoOpen(false);
    try {
      const token = localStorage.getItem("authToken");
      const empresaId = empresa?.idEmpresa || empresa?.id;
      
      console.log(`🗑️ Removendo logo da empresa ${empresaId}`);
      
      const response = await axios.put(
        `http://localhost:3001/api/company/${empresaId}/foto/default`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("✅ Logo removido com sucesso:", response.data);
      
      // Atualizar o estado local
      setLogoEmpresa(defaultLogoURL);
      
      // Opcional: recarregar a página ou atualizar o estado pai
      // window.location.reload();
    } catch (err) {
      console.error("❌ Erro ao remover logo da empresa:", err);
      console.error("❌ Detalhes do erro:", err.response?.data);
      setErro(err.response?.data?.erro || "Erro ao remover logo da empresa.");
    }
  };

  // Handler para remover banner da empresa
  const handleRemoverBanner = async () => {
    setModalBannerOpen(false);
    try {
      const token = localStorage.getItem("authToken");
      const empresaId = empresa?.idEmpresa || empresa?.id;
      
      console.log(`🗑️ Removendo banner da empresa ${empresaId}`);
      
      const response = await axios.put(
        `http://localhost:3001/api/company/${empresaId}/banner/default`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("✅ Banner removido com sucesso:", response.data);
      
      // Atualizar o estado local
      setBannerEmpresa(defaultBannerURL);
      
      // Opcional: recarregar a página ou atualizar o estado pai
      // window.location.reload();
    } catch (err) {
      console.error("❌ Erro ao remover banner da empresa:", err);
      console.error("❌ Detalhes do erro:", err.response?.data);
      setErro(err.response?.data?.erro || "Erro ao remover banner da empresa.");
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow p-0 overflow-hidden relative w-full">
      {/* Banner */}
      <div className="relative group w-full">
        <img
          src={bannerEmpresa}
          alt="Banner da empresa"
          className="w-full h-40 object-cover"
        />
        {isOwner && (
          <button
            className="absolute top-2 right-2 rounded-full p-2 cursor-pointer hover:bg-black transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-30 pointer-events-auto"
            title="Alterar banner"
            style={{ zIndex: 30 }}
            onClick={() => setModalBannerOpen(true)}
          >
            <img src="/icone-camera.png" alt="Alterar banner" className="w-6 h-6" />
          </button>
        )}
        {/* Logo da empresa */}
        <div className="absolute left-1/2 sm:left-8 -bottom-16 z-20 transform -translate-x-1/2 sm:translate-x-0">
          <div className="relative">
            <img
              src={logoEmpresa}
              alt="Logo Empresa"
              className="w-28 h-28 sm:w-40 sm:h-40 rounded-full shadow bg-white object-cover border-4 border-white"
            />
            {isOwner && (
              <button
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                style={{ width: "100%", height: "100%" }}
                title="Alterar logo"
                aria-label="Editar logo da empresa"
                onClick={() => setModalFotoOpen(true)}
              >
                <img src="/icone-camera.png" alt="Alterar logo" className="w-8 h-8" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card de dados da empresa */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pt-24 sm:pt-20 pb-6 px-4 sm:px-6 relative gap-4 w-full">
        
        {/* Botão de editar empresa */}
        {isOwner && (
          <button
            onClick={() => openEditarEmpresaModal(empresa)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 group"
            title="Editar informações da empresa"
            style={{ zIndex: 30 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-green-600 group-hover:text-black transition"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        )}

        {/* Dados da empresa */}
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 break-words">
            {empresa?.nomeComercial || "Nome da Empresa"}
          </h2>
          <p className="text-gray-600 text-sm break-words">
            Contato: {empresa?.telefoneJuridico || "(85) 9 ########"}
          </p>
          <p className="text-gray-500 text-sm break-words">
            {empresa?.enderecoJuridico || "Brasília, Distrito Federal"}
          </p>
        </div>

        {/* Botão Perfil público (para donos da empresa) */}
        {isOwner && !visualizandoPublico && onToggleVisualizacaoPublica && (
          <button 
            className="flex items-center gap-2 bg-green-200 hover:bg-green-300 text-green-900 font-semibold px-4 sm:px-6 py-2 rounded-lg shadow transition w-auto"
            onClick={onToggleVisualizacaoPublica}
            title="Visualizar como público"
          >
            <img
              src="/eye.png"
              alt="Visualizar como público"
              className="w-5 h-5"
            />
            <span className="truncate">Perfil público</span>
          </button>
        )}
      </div>

      {/* Modais para trocar/remover logo */}
      {modalFotoOpen && (
        <ModalFotoPerfil
          open={modalFotoOpen}
          onClose={() => setModalFotoOpen(false)}
          onTrocar={handleTrocarLogo}
          onRemover={handleRemoverLogo}
          fotoAtual={logoEmpresa}
          tipo="logo"
        />
      )}

      {/* Modal para trocar/remover banner */}
      {modalBannerOpen && (
        <ModalFotoPerfil
          open={modalBannerOpen}
          onClose={() => setModalBannerOpen(false)}
          onTrocar={handleTrocarBanner}
          onRemover={handleRemoverBanner}
          fotoAtual={bannerEmpresa}
          tipo="banner"
        />
      )}

      {/* Exibir erro se houver */}
      {erro && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg z-50">
          {erro}
          <button 
            onClick={() => setErro("")}
            className="ml-2 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}