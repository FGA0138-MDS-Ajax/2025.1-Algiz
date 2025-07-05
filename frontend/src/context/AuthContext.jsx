import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Load user on mount
  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const token = localStorage.getItem("authToken");

    async function fetchUsuario() {
      if (usuarioLogado?.id && token) {
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
      }
    }

    fetchUsuario();
  }, []);

  const login = (user, token) => {
    localStorage.setItem("usuarioLogado", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    setUsuario(user);
  };

  const logout = () => {
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("authToken");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
