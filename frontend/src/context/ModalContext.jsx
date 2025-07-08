import { createContext, useState, useContext } from 'react';
import ModalCadastroEmpresa from '../components/ModalCadastroEmpresa';
import ModalCropImagem from '../components/ModalCropImagem';
import FormEditarEmpresa from '../components/FormEditarEmpresa'; // Adicione esta importação
import axios from 'axios';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  // Estados para o modal de cadastro de empresa
  const [showCadastroEmpresaModal, setShowCadastroEmpresaModal] = useState(false);
  
  // Estados para o modal de crop de imagem
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropModalType, setCropModalType] = useState("foto"); // "foto" ou "banner"
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

  // Handler para salvar empresa
  const handleSaveEmpresa = (dados) => {
    // Lógica de salvar empresa
    setShowCadastroEmpresaModal(false);
  };

  // Função para abrir o modal de crop
  const openCropModal = (imageFile, type, userId) => {
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setCropModalType(type);
      
      // Configura os parâmetros do crop com base no tipo
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
    };
    reader.readAsDataURL(imageFile);
  };

  // Função para salvar a imagem cropada
  const handleCropSave = async (croppedBase64) => {
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
      
      // Atualizar localStorage com URL do Cloudinary
      const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
      if (cropModalType === "foto") {
        usuarioLogado.fotoPerfil = response.data.fotoPerfil || croppedBase64;
      } else {
        usuarioLogado.bannerPerfil = response.data.bannerPerfil || croppedBase64;
      }
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
      
      // Fechar o modal e atualizar a página
      setCropModalOpen(false);
      window.location.reload();
      
    } catch (err) {
      console.error("Erro ao fazer upload da imagem:", err);
      // Opção: adicionar estado para erro e exibi-lo
    }
  };

  // Função para abrir o modal de edição de empresa
  const openEditarEmpresaModal = (empresa) => {
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
  };
  
  // Função para atualizar os campos do formulário de edição
  const handleEditarEmpresaChange = (e) => {
    const { name, value } = e.target;
    setFormDataEmpresa(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Função para salvar dados da empresa
  const handleSalvarEmpresa = async () => {
    try {
      setErroEdicaoEmpresa("");
      
      if (!empresaEditando) {
        throw new Error("Empresa não identificada");
      }
      
      // CNPJ limpo (apenas números) para URL
      const cnpjLimpo = empresaEditando.cnpjJuridico.replace(/\D/g, '');
      
      // Obter token de autenticação
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
        
        // Atualizar o objeto empresa localmente
        Object.assign(empresaEditando, formDataEmpresa);
        setShowEditarEmpresaModal(false);
        
        // Atualizar a página para mostrar as alterações
        window.location.reload();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.erro || 'Erro ao salvar dados da empresa');
      }
      
    } catch (error) {
      console.error('Erro ao salvar dados da empresa:', error);
      setErroEdicaoEmpresa(error.message || 'Erro ao salvar dados da empresa. Tente novamente.');
    }
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
        openCropModal,
        closeCropModal: () => setCropModalOpen(false),
        isCropOpen: () => cropModalOpen,
        
        // Modal de edição de empresa
        openEditarEmpresaModal,
        closeEditarEmpresaModal: () => setShowEditarEmpresaModal(false)
      }}
    >
      {children}
      
      {/* Renderiza o modal de cadastro de empresa */}
      {showCadastroEmpresaModal && (
        <ModalCadastroEmpresa
          onClose={() => setShowCadastroEmpresaModal(false)}
          onSave={handleSaveEmpresa}
        />
      )}
      
      {/* Renderiza o modal de crop de imagem */}
      {cropModalOpen && selectedImage && (
        <ModalCropImagem
          open={cropModalOpen}
          image={selectedImage}
          onClose={() => setCropModalOpen(false)}
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
      
      {/* Renderiza o modal de edição de empresa */}
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
}

export function useModal() {
  return useContext(ModalContext);
}