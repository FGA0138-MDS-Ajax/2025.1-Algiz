import { createContext, useState, useContext, useCallback } from 'react';
import ModalCadastroEmpresa from '../components/ModalCadastroEmpresa';
import ModalCropImagem from '../components/ModalCropImagem';
import FormEditarEmpresa from '../components/FormEditarEmpresa';
import axios from 'axios';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  // Estados para o modal de cadastro de empresa
  const [showCadastroEmpresaModal, setShowCadastroEmpresaModal] = useState(false);
  
  // Estados para o modal de crop de imagem
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropModalType, setCropModalType] = useState("foto"); 

  const [selectedImage, setSelectedImage] = useState(null);
  const [cropConfig, setCropConfig] = useState({
    aspect: 1,
    cropShape: "round",
    outputWidth: 160,
    outputHeight: 160,
    entityId: null,
    contexto: null  // "usuario" ou "empresa"
  });

  // Estados para o modal de edição de empresa
  const [showEditarEmpresaModal, setShowEditarEmpresaModal] = useState(false);
  const [empresaEditando, setEmpresaEditando] = useState(null);
  const [formDataEmpresa, setFormDataEmpresa] = useState({});
  const [erroEdicaoEmpresa, setErroEdicaoEmpresa] = useState("");

  // Promise handlers for crop modal
  let currentResolve = null;
  let currentReject = null;

  // Handler para salvar empresa
  const handleSaveEmpresa = (dados) => {
    setShowCadastroEmpresaModal(false);
  };

  // Função para abrir modal de crop
  const openCropModal = (imageFile, tipo, entityId, contexto) => {
    console.log(`Abrindo modal para ${contexto} com ID ${entityId} - Tipo: ${tipo}`);
    
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setCropModalType(tipo);
      
      // Configurações baseadas no tipo de imagem
      if (tipo === "foto" || tipo === "logo") {
        setCropConfig({
          aspect: 1,
          cropShape: "round",
          outputWidth: 160,
          outputHeight: 160,
          entityId: entityId,
          contexto: contexto  // "usuario" ou "empresa"
        });
      } else if (tipo === "banner") {
        setCropConfig({
          aspect: 3.5,
          cropShape: "rect", 
          outputWidth: 1050,
          outputHeight: 300,
          entityId: entityId,
          contexto: contexto  // "usuario" ou "empresa"
        });
      }
      
      setCropModalOpen(true);
    };
    reader.readAsDataURL(imageFile);
  };

  // Função para salvar imagem cropada
  const handleCropSave = useCallback(async (croppedBase64) => {
    try {
      const response = await fetch(croppedBase64);
      const croppedBlob = await response.blob();
      const formData = new FormData();
      const token = localStorage.getItem("authToken");
      
      // ✅ DEBUG: Log para verificar o contexto e ID sendo usados
      console.log("📌 SALVANDO IMAGEM - Contexto:", cropConfig.contexto);
      console.log("📌 SALVANDO IMAGEM - EntityID:", cropConfig.entityId);
      console.log("📌 SALVANDO IMAGEM - Tipo:", cropModalType);

      // ROTEAMENTO BASEADO NO CONTEXTO
      if (cropConfig.contexto === "empresa") {
        console.log("🏢 Upload de EMPRESA - ID:", cropConfig.entityId);
        
        const fieldName = cropModalType === "foto" || cropModalType === "logo" ? "foto" : "banner";
        const endpoint = cropModalType === "foto" || cropModalType === "logo" ? "foto" : "banner";
        
        formData.append(fieldName, croppedBlob, "imagem.jpg");
        
        // ✅ CORRIGIR: Usar método PATCH para empresa
        const response = await axios.patch(
          `http://localhost:3001/api/company/${cropConfig.entityId}/${endpoint}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        console.log(`✅ ${endpoint} da empresa atualizada:`, response.data);
        
      } else if (cropConfig.contexto === "usuario") {
        console.log("👤 Upload de USUÁRIO - ID:", cropConfig.entityId);
        
        const fieldName = cropModalType === "foto" ? "fotoPerfil" : "bannerPerfil";
        const endpoint = cropModalType === "foto" ? "photo" : "banner";
        
        formData.append(fieldName, croppedBlob, "imagem.jpg");
        
        // ✅ CORRIGIR: Usar método PUT para usuário
        const response = await axios.put(
          `http://localhost:3001/api/users/${cropConfig.entityId}/${endpoint}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        // Atualizar localStorage para usuários
        const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (cropModalType === "foto") {
          usuarioLogado.fotoPerfil = response.data.fotoPerfil || croppedBase64;
        } else {
          usuarioLogado.bannerPerfil = response.data.bannerPerfil || croppedBase64;
        }
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
        
        console.log(`✅ ${endpoint} do usuário atualizada:`, response.data);

      } else {
        throw new Error("❌ Erro: Contexto não definido (deve ser 'usuario' ou 'empresa')!");
      }
      
      const result = response.data.fotoPerfil || response.data.bannerPerfil || croppedBase64;
      if (currentResolve) {
        currentResolve(result);
        currentResolve = null;
        currentReject = null;
      }
      
      setCropModalOpen(false);
                 window.location.reload();

      return result;
    } catch (err) {
      console.error("❌ Erro ao fazer upload da imagem:", err);

    }
  }, [cropConfig, cropModalType]);

  
  const closeCropModal = useCallback(() => {
    if (currentReject) {
      currentReject(new Error("Modal closed by user"));
      currentResolve = null;
      currentReject = null;
    }
    setCropModalOpen(false);
  }, []);

  // Função para abrir o modal de edição de empresa
  const openEditarEmpresaModal = ((empresa) => {
    console.log("Empresa recebida para edição:", empresa);
    console.log("ID da empresa:", empresa?.idEmpresa || empresa?.id);
    

    setEmpresaEditando(empresa);
    setFormDataEmpresa({
      nomeComercial: empresa?.nomeComercial || "",
      razaoSocial: empresa?.razaoSocial || "",
      cnpjJuridico: empresa?.cnpjJuridico || "",
      telefoneJuridico: empresa?.telefoneJuridico || "",
      enderecoJuridico: empresa?.enderecoJuridico || "",
      estadoJuridico: empresa?.estadoJuridico || "",
      areaAtuacao: empresa?.areaAtuacao || "",
    });
    setErroEdicaoEmpresa("");
    setShowEditarEmpresaModal(true);
  }, []);
  
  // Função para atualizar os campos do formulário de edição
  const handleEditarEmpresaChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormDataEmpresa(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);
  
  // Função para salvar dados da empresa
  const handleSalvarEmpresa = useCallback(async () => {
    try {
      setErroEdicaoEmpresa("");
      
      if (!empresaEditando) {
        throw new Error("Empresa não identificada");
      }
      
      const idEmpresa = empresaEditando.idEmpresa || empresaEditando.id;
      
      if (!idEmpresa) {
        throw new Error("ID da empresa não encontrado");
      }
      

      const token = localStorage.getItem("authToken");
      
      // ✅ MANTER: URL com /edit conforme solicitado
      const response = await fetch(`http://localhost:3001/api/company/${idEmpresa}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(formDataEmpresa),
      });

      if (response.ok) {
        const resultado = await response.json();
        Object.assign(empresaEditando, formDataEmpresa);
        setShowEditarEmpresaModal(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.erro || 'Erro ao salvar dados da empresa');
      }
    } catch (error) {
      console.error('Erro ao salvar dados da empresa:', error);
      setErroEdicaoEmpresa(error.message || 'Erro ao salvar dados da empresa. Tente novamente.');
    }
  }, [empresaEditando, formDataEmpresa]);

  const value = {
    showCadastroEmpresaModal,
    openCadastroEmpresaModal: () => setShowCadastroEmpresaModal(true),
    closeCadastroEmpresaModal: () => setShowCadastroEmpresaModal(false),
    cropModalOpen,
    openCropModal,
    closeCropModal,
    isCropOpen: () => cropModalOpen,
    handleCropSave,
    openEditarEmpresaModal,
    closeEditarEmpresaModal: () => setShowEditarEmpresaModal(false)
  };

  return (
    <ModalContext.Provider 
      value={{
        // Modal de cadastro de empresa
        showCadastroEmpresaModal,
        openCadastroEmpresaModal: () => setShowCadastroEmpresaModal(true),
        closeCadastroEmpresaModal: () => setShowCadastroEmpresaModal(false),
        
        // Modal de crop de imagem
        cropModalOpen,
        openCropModal,  // (file, tipo, entityId, contexto)
        closeCropModal: () => setCropModalOpen(false),
        isCropOpen: () => cropModalOpen,
        
        // Modal de edição de empresa
        openEditarEmpresaModal,
        closeEditarEmpresaModal: () => setShowEditarEmpresaModal(false)
      }}
    >

      {children}
      
      {showCadastroEmpresaModal && (
        <ModalCadastroEmpresa
          onClose={() => setShowCadastroEmpresaModal(false)}
          onSave={handleSaveEmpresa}
        />
      )}
      
      {cropModalOpen && selectedImage && (
        <ModalCropImagem
          open={cropModalOpen}
          image={selectedImage}
          onClose={closeCropModal}
          onCropSave={handleCropSave}
          aspect={cropConfig.aspect}
          cropShape={cropConfig.cropShape}
          outputWidth={cropConfig.outputWidth}
          outputHeight={cropConfig.outputHeight}
          tipo={cropModalType}
          entityId={cropConfig.entityId}
          contexto={cropConfig.contexto}  
          label="Salvar"
        />
      )}
      
      {showEditarEmpresaModal && empresaEditando && (
        <FormEditarEmpresa
          formData={formDataEmpresa}
          erro={erroEdicaoEmpresa}
          onChange={handleEditarEmpresaChange}
          onSave={handleSalvarEmpresa}
          onClose={() => setShowEditarEmpresaModal(false)}
        />
      )}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export { ModalProvider, useModal };