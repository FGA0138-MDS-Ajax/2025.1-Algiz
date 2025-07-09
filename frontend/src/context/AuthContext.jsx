// frontend/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import api from "../utils/axios"; // ✅ Axios with refresh token interceptor

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const fetchUsuario = async () => {
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
        fetchUsuario(); // ✅ don't reload — fetch updated user data
      }
    };

    const handleFocus = () => {
      fetchUsuario(); // ✅ useful when user switches tabs
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const login = async (user, token) => {
    localStorage.setItem("usuarioLogado", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    localStorage.setItem("authEvent", Date.now().toString());
    await fetchUsuario(); // ✅ get full profile (not just ID/email)
  };

  const logout = async () => {
    try {
      await api.post("/users/logout"); // ✅ clears refreshToken on server
    } catch (err) {
      console.warn("Erro ao fazer logout no backend:", err);
    }
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("authToken");
    localStorage.setItem("authEvent", Date.now().toString());
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;