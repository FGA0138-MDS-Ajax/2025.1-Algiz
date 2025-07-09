// frontend/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../utils/axios"; // ✅ Axios with refresh token interceptor

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isEditandoImagem, setIsEditandoImagem] = useState(false); // Usuário
  const [isEditandoImagemEmpresa, setIsEditandoImagemEmpresa] = useState(false); // NOVO: Empresa

  const fetchUsuario = async () => {
    // Só busca se NÃO estiver editando imagem
    if (isEditandoImagem) return;

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const token = localStorage.getItem("authToken");

    if (usuarioLogado?.id && token) {
      try {
        const res = await api.get(`/users/${usuarioLogado.id}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsuario(res.data);
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
        setUsuario(null);
      }
    } else {
      setUsuario(null);
    }
  };

  useEffect(() => {
    fetchUsuario();

    const handleStorageChange = (event) => {
      if (["authToken", "usuarioLogado", "authEvent"].includes(event.key)) {
        fetchUsuario();
      }
    };

    const handleFocus = () => {
      fetchUsuario();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
    };
    // Adicione isEditandoImagem como dependência
  }, [isEditandoImagem]);

  const login = async (user, token) => {
    localStorage.setItem("usuarioLogado", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    localStorage.setItem("authEvent", Date.now().toString());
    await fetchUsuario();
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
    } catch (err) {
      console.warn("Erro ao fazer logout no backend:", err);
    }
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("authToken");
    localStorage.setItem("authEvent", Date.now().toString());
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{
      usuario, login, logout,
      isEditandoImagem, setIsEditandoImagem,
      isEditandoImagemEmpresa, setIsEditandoImagemEmpresa // NOVO
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;