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
      <div>
        {podeVerPosts ? (
          posts.length > 0 ? (
            renderMosaic(posts)
          ) : (
            <div className="text-center text-gray-400 py-12 italic">
              Não há nenhum post salvo no momento.
            </div>
          )
        ) : (
          <div className="text-center text-gray-500 py-12">
            Este usuário limita a visibilidade de seus posts salvos.
          </div>
        )}
      </div>
    </div>
  );
}
