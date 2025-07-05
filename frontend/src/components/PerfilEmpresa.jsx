import React, { useState } from "react";
import FormEditarEmpresa from "./FormEditarEmpresa";

export default function PerfilEmpresa({ empresa, isOwner, visualizandoPublico, onToggleVisualizacaoPublica }) {
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [formData, setFormData] = useState({
    nomeComercial: empresa?.nomeComercial || "",
    razaoSocial: empresa?.razaoSocial || "",
    cnpjJuridico: empresa?.cnpjJuridico || "",
    telefone: empresa?.telefoneJuridico || "",
    email: empresa?.email || "",
    endereco: empresa?.enderecoJuridico || "",
    estado: empresa?.estado || "",
    setor: empresa?.setor || "",
  });
  const [erro, setErro] = useState("");

  const handleAbrirModal = () => {
    setFormData({
      nomeComercial: empresa?.nomeComercial || "",
      razaoSocial: empresa?.razaoSocial || "",
      cnpjJuridico: empresa?.cnpjJuridico || "",
      telefone: empresa?.telefoneJuridico || "",
      email: empresa?.email || "",
      endereco: empresa?.enderecoJuridico || "",
      estado: empresa?.estado || "",
      setor: empresa?.setor || "",
    });
    setModalEditarAberto(true);
  };

  const handleFecharModal = () => {
    setModalEditarAberto(false);
    setErro("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSalvar = async () => {
    try {
      setErro("");
      
      // TODO: Implementar endpoint no backend para atualizar dados da empresa
      /*
      const cnpjFormatado = empresa.cnpjJuridico.replace(/\D/g, '').replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        '$1.$2.$3/$4-$5'
      );
      
      const response = await fetch(`http://localhost:3001/api/empresa/${cnpjFormatado}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Atualizar o objeto empresa localmente
        Object.assign(empresa, formData);
        setModalEditarAberto(false);
        console.log('Dados da empresa atualizados com sucesso!');
      } else {
        throw new Error('Erro ao salvar dados da empresa');
      }
      */
      
      // Simulação temporária - atualizar localmente
      Object.assign(empresa, formData);
      setModalEditarAberto(false);
      console.log('Dados da empresa atualizados localmente (temporário):', formData);
      
    } catch (error) {
      console.error('Erro ao salvar dados da empresa:', error);
      setErro('Erro ao salvar dados da empresa. Tente novamente.');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-0 overflow-hidden relative w-full">
      {/* Banner */}
      <div className="relative group w-full">
        <img
          src={empresa.bannerUrl || "/user/banner-padrao-1.png"}
          alt="Banner da empresa"
          className="w-full h-40 object-cover"
        />
        {isOwner && (
          <button
            className="absolute top-2 right-2 rounded-full p-2 cursor-pointer hover:bg-black transition opacity-100 sm:opacity-0 sm:group-hover:opacity-100 z-30 pointer-events-auto"
            title="Alterar banner"
            style={{ zIndex: 30 }}
          >
            <img src="/icone-camera.png" alt="Alterar banner" className="w-6 h-6" />
          </button>
        )}
        {/* Logo da empresa */}
        <div className="absolute left-1/2 sm:left-8 -bottom-16 z-20 transform -translate-x-1/2 sm:translate-x-0">
          <div className="relative">
            <img
              src={empresa.logoUrl || "/user/foto-perfil-padrao-empresa.png"}
              alt="Logo Empresa"
              className="w-28 h-28 sm:w-40 sm:h-40 rounded-full shadow bg-white object-cover border-4 border-white"
            />
            {isOwner && (
              <button
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                style={{ width: "100%", height: "100%" }}
                title="Alterar logo"
                aria-label="Editar logo da empresa"
              >
                <img src="/icone-camera.png" alt="Alterar logo" className="w-8 h-8" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Card de dados da empresa */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pt-24 sm:pt-20 pb-6 px-4 sm:px-6 relative gap-4 w-full">
        
        {/* Botão de editar empresa - no canto superior direito do card branco */}
        {isOwner && (
          <button
            onClick={handleAbrirModal}
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
            {empresa.nomeComercial}
          </h2>
          {isOwner ? (
            <>
              <p className="text-gray-600 text-sm break-words">
                Email: {empresa.email || "emaildousuario@econet.com"}
              </p>
              <p className="text-gray-600 text-sm break-words">
                Contato: {empresa.telefoneJuridico || "(85) 9 ########"}
              </p>
              <p className="text-gray-500 text-sm break-words">
                {empresa.enderecoJuridico || "Brasília, Distrito Federal"}
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-600 break-words">
                Contato: {empresa.telefoneJuridico || "(85) 9 ########"}
              </p>
              <p className="text-gray-500 break-words">
                {empresa.enderecoJuridico || "Brasília, Distrito Federal"}
              </p>
            </>
          )}
        </div>

        {/* Botão Perfil público - posicionado como no PerfilUsuario */}
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

      {/* Modal de edição */}
      {modalEditarAberto && (
        <FormEditarEmpresa
          formData={formData}
          erro={erro}
          onChange={handleChange}
          onSave={handleSalvar}
          onClose={handleFecharModal}
        />
      )}
    </div>
  );
}