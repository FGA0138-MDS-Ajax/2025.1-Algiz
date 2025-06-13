import React, { useState, useEffect } from "react";
import Post from "./Post";

export default function Salvos({ usuario }) {
  const usuarioId = usuario?.id;
  const [posts, setPosts] = useState([]);
  const [isUsuarioLogado, setIsUsuarioLogado] = useState(false);
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
    setIsUsuarioLogado(
      usuarioLogado?.id?.toString() === usuarioId?.toString()
    );

    const users = JSON.parse(sessionStorage.getItem("fakeUsers") || "[]");
    const usuarioCompleto = users.find(
      (u) => u.id?.toString() === usuarioId?.toString()
    );
    if (usuarioCompleto) {
      setPosts(usuarioCompleto.posts || []);
      setVisivel(
        usuarioCompleto.hasOwnProperty("visivel") ? usuarioCompleto.visivel : true
      );
    }
  }, [usuario]);

  const handleAddPost = () => {
    const newPostId = posts.length > 0 ? Math.max(...posts) + 1 : 1;
    const updatedPosts = [...posts, newPostId];
    setPosts(updatedPosts);

    const users = JSON.parse(sessionStorage.getItem("fakeUsers") || "[]");
    const usuarioIndex = users.findIndex(
      (u) => u.id?.toString() === usuarioId?.toString()
    );
    if (usuarioIndex !== -1) {
      users[usuarioIndex].posts = updatedPosts;
      sessionStorage.setItem("fakeUsers", JSON.stringify(users));
      const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
      if (usuarioLogado?.id?.toString() === usuarioId?.toString()) {
        sessionStorage.setItem(
          "usuarioLogado",
          JSON.stringify(users[usuarioIndex])
        );
      }
    }
  };

  const handleToggleVisibilidade = () => {
    const newVisivel = !visivel;
    setVisivel(newVisivel);

    const users = JSON.parse(sessionStorage.getItem("fakeUsers") || "[]");
    const usuarioIndex = users.findIndex(
      (u) => u.id?.toString() === usuarioId?.toString()
    );
    if (usuarioIndex !== -1) {
      users[usuarioIndex].visivel = newVisivel;
      sessionStorage.setItem("fakeUsers", JSON.stringify(users));
      const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
      if (usuarioLogado?.id?.toString() === usuarioId?.toString()) {
        sessionStorage.setItem(
          "usuarioLogado",
          JSON.stringify(users[usuarioIndex])
        );
      }
    }
  };

  // Grid Alternado
  function renderMosaic(posts) {
    const rows = [];
    for (let i = 0; i < posts.length; i += 3) {
      const rowPosts = posts.slice(i, i + 3);
      const isEven = Math.floor(i / 3) % 2 === 1;

      if (!isEven) {
        // Linha ímpar: grande à esquerda, dois pequenos à direita
        rows.push(
          <div key={i} className="grid grid-cols-2 grid-rows-4 gap-x-8 gap-y-5 mb-8">
            <div className="row-span-4">
              {rowPosts[0] && <Post post={rowPosts[0]} big />}
            </div>
            <div className="row-span-2">
              {rowPosts[1] && <Post post={rowPosts[1]} small />}
            </div>
            <div className="row-span-2">
              {rowPosts[2] && <Post post={rowPosts[2]} small />}
            </div>
          </div>
        );
      } else {
        // Linha par: dois pequenos à esquerda, grande à direita
        rows.push(
          <div key={i} className="grid grid-cols-2 grid-rows-4 gap-x-8 gap-y-8 mb-8">
            <div className="row-span-2">
              {rowPosts[0] && <Post post={rowPosts[0]} small />}
            </div>
            <div className="row-span-4">
              {rowPosts[2] && <Post post={rowPosts[2]} big />}
            </div>
            <div className="row-span-2">
              {rowPosts[1] && <Post post={rowPosts[1]} small />}
            </div>
          </div>
        );
      }
    }
    return rows;
  }

  const podeVerPosts = visivel || isUsuarioLogado;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z" />
        </svg>
        <div className="font-bold text-lg text-gray-700">Salvos</div>
      </div>
      <hr className="border-gray-300 mb-6" />
      <div className="flex items-center gap-2 mb-6">
        {isUsuarioLogado && (
          <>
            <button
              onClick={handleAddPost}
              className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full shadow hover:bg-green-600"
              title="Adicionar post"
            >
              +
            </button>
            <button
              onClick={handleToggleVisibilidade}
              className={`flex items-center justify-center w-8 h-8 rounded-full shadow ${
                visivel
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-300 text-gray-600 hover:bg-gray-400"
              }`}
              title={
                visivel
                  ? "Posts visíveis para todos"
                  : "Posts visíveis só para você"
              }
            >
              {visivel ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.873 6.872A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.112M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                </svg>
              )}
            </button>
          </>
        )}
      </div>
      <div>
        {podeVerPosts ? (
          renderMosaic(posts)
        ) : (
          <div className="text-center text-gray-500 py-12">
            Este usuário limita a visibilidade de seus posts salvos.
          </div>
        )}
      </div>
    </div>
  );
}
