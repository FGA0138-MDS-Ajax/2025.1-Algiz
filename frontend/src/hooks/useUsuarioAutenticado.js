import { useEffect, useState } from "react";

export default function useUsuarioAutenticado() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function fetchUsuario() {
      const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
      if (usuarioLogado?.id) {
        try {
          const token = sessionStorage.getItem("authToken");
          const res = await fetch(
            `http://localhost:3001/api/users/${usuarioLogado.id}/profile`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
            }
          );
          if (res.ok) {
            const data = await res.json();
            setUsuario(data);
          } else {
            setUsuario(null);
          }
        } catch {
          setUsuario(null);
        }
      } else {
        setUsuario(null);
      }
      setCarregando(false);
    }

    fetchUsuario();
  }, []);

  return { usuario, carregando };
}