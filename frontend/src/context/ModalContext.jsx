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
    usuarioId: null
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

  // Função para abrir o modal de crop
  const openCropModal = useCallback((imageFile, type, userId) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setCropModalType(type);
        
        if (type === "foto") {
          setCropConfig({
            aspect: 1,
            cropShape: "round",
            outputWidth: 160,
            outputHeight: 160,
            usuarioId: userId
          });
        } else if (type === "banner") {
          setCropConfig({
            aspect: 3.5,
            cropShape: "rect", 
            outputWidth: 1050,
            outputHeight: 300,
            usuarioId: userId
          });
        }
        
        setCropModalOpen(true);
        currentResolve = resolve;
        currentReject = reject;
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(imageFile);
    });
  }, []);

  // Função para salvar a imagem cropada
  const handleCropSave = useCallback(async (croppedBase64) => {
    try {
      if (!cropConfig.usuarioId) throw new Error("ID do usuário não definido");
      
      const croppedBlob = await (await fetch(croppedBase64)).blob();
      const formData = new FormData();
      
      const fieldName = cropModalType === "foto" ? "fotoPerfil" : "bannerPerfil";
      const endpoint = cropModalType === "foto" ? "photo" : "banner";
      
      formData.append(fieldName, croppedBlob, "imagem.jpg");
      
      const token = localStorage.getItem("authToken");
      
      const response = await axios.put(
        `http://localhost:3001/api/users/${cropConfig.usuarioId}/${endpoint}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
      if (cropModalType === "foto") {
        usuarioLogado.fotoPerfil = response.data.fotoPerfil || croppedBase64;
      } else {
        usuarioLogado.bannerPerfil = response.data.bannerPerfil || croppedBase64;
      }
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
      
      const result = response.data.fotoPerfil || response.data.bannerPerfil || croppedBase64;
      if (currentResolve) {
        currentResolve(result);
        currentResolve = null;
        currentReject = null;
      }
      
      setCropModalOpen(false);
      return result;
    } catch (err) {
      console.error("Erro ao fazer upload da imagem:", err);
      if (currentReject) {
        currentReject(err);
        currentResolve = null;
        currentReject = null;
      }
      throw err;
    }
  }, [cropConfig.usuarioId, cropModalType]);

  // Função para fechar o modal de crop
  const closeCropModal = useCallback(() => {
    if (currentReject) {
      currentReject(new Error("Modal closed by user"));
      currentResolve = null;
      currentReject = null;
    }
    setCropModalOpen(false);
  }, []);

  // Função para abrir o modal de edição de empresa
  const openEditarEmpresaModal = useCallback((empresa) => {
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
      
      const cnpjLimpo = empresaEditando.cnpjJuridico.replace(/\D/g, '');
      const token = localStorage.getItem("authToken");
      
      const response = await fetch(`http://localhost:3001/api/company/${cnpjLimpo}`, {
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
    <ModalContext.Provider value={value}>
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
          usuarioId={cropConfig.usuarioId}
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