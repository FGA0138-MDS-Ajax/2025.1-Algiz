import React from "react";

export default function Post({ post, big, small }) {
  // As partes comentadas sao dados mutaveis, enquanto que por enquanto estamos usando dados estaticos
  const titulo = "Uso massivo de eletronicos";
  const descricao =
    "Com o uso massivo de aparelhos eletrônicoss simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a... ";
  const imagem = "/post.png";

  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-5 flex flex-col
        ${big ? "min-h-[500px]" : "min-h-[241px]"}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        {/* <img
          src={post.empresaLogo}
          alt={post.empresaNome}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="font-semibold text-sm">{post.empresaNome}</div>
          <div className="text-xs text-green-700 font-semibold">Promovido</div>
        </div> */}
        <img
          src={post?.empresaLogo || "/coca.png"}
          alt={post?.empresaNome || "Empresa"}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <div className="font-semibold text-sm">{post?.empresaNome || "Relog"}</div>
          <div className="text-xs text-green-700 font-semibold">Promovido</div>
        </div>
      </div>
      {/* Título */}
      {/* <div className="font-bold mb-2">{post.titulo}</div> */}
      <div className="font-bold mb-2">{titulo}</div>
      {/* Imagem do post (apenas para big) */}
      {/* {big && post.imagem && (
        <img
          src={post.imagem}
          alt="Imagem do post"
          className="rounded-xl w-full object-cover mb-3 max-h-48"
        />
      )} */}
      {big && (
        <img
          src={imagem}
          alt="Imagem do post"
          className="rounded-xl w-full object-cover mb-3 max-h-72" 
          style={{ minHeight: "220px" }} 
        />
      )}
      {/* Texto sempre na parte de baixo */}
      <div className="text-gray-700 text-sm mb-4 mt-auto line-clamp-3">
        {descricao}
      </div>
      {/* Barra de ações */}
      <div className="flex items-center gap-5 mt-auto">
        <button className="text-green-700 hover:text-green-900">
          {/* Coração */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
        </button>
        <button className="text-green-700 hover:text-green-900">
          {/* Comentário */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.39-1.02L3 21l1.02-4.39A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        <button className="text-green-700 hover:text-green-900">
          {/* Compartilhar */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10.5l18-7-7 18-2.5-7L3 10.5z" />
          </svg>
        </button>
        <button className="ml-auto text-green-700 hover:text-green-900">
          {/* Ícone de bookmark SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}