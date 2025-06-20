import React from "react";
import { useNavigate } from "react-router-dom";
import Tag from "./Tag";

export default function Post({ post, big, small, completo, comentarios = [] }) {
  const navigate = useNavigate();

  // As partes comentadas sao dados mutaveis, enquanto que por enquanto estamos usando dados estaticos
  const titulo = post?.titulo || "Uso massivo de eletronicos";
  const descricao =
    post?.descricao ||
    "Com o uso massivo de aparelhos eletrônicoss simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a... ";
  const imagem = post?.imagem || "/post.png";

  // post completo (para serem usados na pagina de post)
  if (completo) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 pb-4 flex flex-col min-h-[500px] w-full max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
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
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-bold text-lg">{post?.empresaNome || "Relog"}</div>
              <div className="text-gray-500 text-sm">contato@email.com</div>
            </div>
          </div>
          <button className="bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700 font-semibold text-sm">
            Seguir +
          </button>
        </div>
        {/* Título */}
        {/* <div className="font-bold mb-2">{post.titulo}</div> */}
        <div className="font-bold text-2xl mb-2">{titulo}</div>
        {/* Imagem do post */}
        {/* {big && post.imagem && (
          <img
            src={post.imagem}
            alt="Imagem do post"
            className="rounded-xl w-full object-cover mb-3 max-h-48"
          />
        )} */}
        <img
          src={imagem}
          alt="Imagem do post"
          className="rounded-xl w-full object-cover mb-4 max-h-72"
          style={{ minHeight: "220px" }}
        />
        {/* Tags */}
        <div className="flex gap-2 mb-2">
          {(post?.tags || []).map((tag, idx) => (
            <Tag key={idx} nome={tag} />
          ))}
        </div>
        {/* Descrição completa */}
        <div className="text-black-500 text-sm mb-4">{descricao}</div>
        {/* Barra de ações */}
        <div className="flex items-center gap-5 mt-2 mb-6">
          <button className="text-green-700 hover:text-green-900" title="Curtir">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
          </button>
          {/* Removido o botão de comentar */}
          <button className="text-green-700 hover:text-green-900" title="Compartilhar">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10.5l18-7-7 18-2.5-7L3 10.5z" />
            </svg>
          </button>
          <button className="ml-auto text-green-700 hover:text-green-900" title="Salvar">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-5-7 5V5z" />
            </svg>
          </button>
        </div>
        {/* Linha divisória */}
        <hr className="my-4 border-gray-200" />
        {/* Comentários */}
        {comentarios.length > 0 && (
          <div className="mt-2">
            <h3 className="font-bold text-lg mb-4">Comentários</h3>
            <ul className="space-y-6">
              {comentarios.map((comentario) => (
                <li key={comentario.id} className="flex items-start gap-4">
                  <img
                    src={comentario.avatar}
                    alt={comentario.nome}
                    className="w-10 h-10 rounded-full border"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="font-semibold">{comentario.nome}</div>
                      <button
                        className="text-gray-400 hover:text-gray-700 ml-2 p-0"
                        style={{ alignSelf: "flex-start" }}
                        title="Mais opções"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="5" cy="12" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="19" cy="12" r="2" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-gray-700">{comentario.texto}</div>
                    <div className="flex gap-2 mt-2">
                      <button className="text-green-700 hover:text-green-900" title="Curtir comentário">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // preview dos posts (para serem usados nos perfil)
  return (
    <div
      className={`bg-white rounded-2xl shadow-md p-5 flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200
        ${big ? "min-h-[500px]" : "min-h-[241px]"}
      `}
      onClick={() => navigate("/post")}
      title="Ver post completo"
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