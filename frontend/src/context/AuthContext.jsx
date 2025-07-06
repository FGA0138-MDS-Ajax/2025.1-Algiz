import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const fetchUsuario = async () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const token = localStorage.getItem("authToken");

    if (usuarioLogado?.id && token) {
      try {
        const res = await fetch(
          `http://localhost:3001/api/users/${usuarioLogado.id}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
        } else {
          setUsuario(null);
        }
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
      if (
        event.key === "authToken" ||
        event.key === "usuarioLogado" ||
        event.key === "authEvent"
      ) {
        fetchUsuario();
        window.location.reload();
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
  }, []);

  const login = (user, token) => {
    localStorage.setItem("usuarioLogado", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    localStorage.setItem("authEvent", Date.now().toString());
    setUsuario(user);
  };

  const logout = () => {
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