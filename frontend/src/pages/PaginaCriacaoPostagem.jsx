import { useState } from "react";
import SidebarIntro from "../components/SidebarIntro";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import Footer from "../components/Footer";

// fake empresas
const sugestoesEmpresas = [
  { id: "1", nome: "Cacau Show", logo: "/cacau.png" },
  { id: "2", nome: "Nestle", logo: "/nestle.png" },
  { id: "3", nome: "Lacta", logo: "/lacta.png" },
  { id: "4", nome: "Coca Cola", logo: "/coca.png" },
  { id: "5", nome: "Terra verde", logo: "/empresa9.png" },
  { id: "6", nome: "Kactus", logo: "/empresa10.png" },
];

const tags = ["Doação", "Compra", "Venda", "Educacional"];

export default function CriarPostagem() {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tag, setTag] = useState("");
    const [imagem, setImagem] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImagemChange = (e) => {
        const file = e.target.files[0];
        if (file && ["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setImagem(file);
            setPreview(URL.createObjectURL(file));
        } else {
            alert("Somente arquivos .jpg, .jpeg, .png, .webp são permitidos");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!titulo || !descricao || !imagem || !tag) {
            alert("Preencha todos os campos obrigatorios");
            return;
        }
        console.log({titulo, descricao, tag, imagem});
        setTitulo("");
        setDescricao("")
        setTag("")
        setImagem(null)
        setPreview(null);
    };

    const podePostar = titulo && descricao && imagem && tag;

  return (
    <div className="min-h-screen bg-green-50 pt-16">
      <div className="container mx-auto px-20 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar composta */}
        <div className="w-full md:w-1/5 flex flex-col gap-4">
          <div className="sticky top-20">
            <SidebarIntro />
            <div className="mt-4">
              <SugestoesEmpresas sugestoes={sugestoesEmpresas} />
            </div>
          </div>
        </div>

        {/* Feed de criação */}
        <main className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-[520px] bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-xl font-semibold mb-4">Título do post:</h1>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4"
              placeholder="Título do post"
              maxLength={255}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Upload da imagem</label>
              <div className="bg-gray-200 rounded-xl h-48 flex justify-center items-center relative overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagemChange}
                  className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                />
                {preview ? (
                  <img src={preview} alt="Preview" className="object-contain h-full" />
                ) : (
                  <div className="text-center z-0">
                    <button className="bg-gray-600 text-white px-4 py-2 rounded shadow">
                      Upload da imagem
                    </button>
                    <p className="text-sm text-gray-700 mt-1">
                      ou arraste um arquivo pra cá
                    </p>
                  </div>
                )}
              </div>
            </div>

            <label className="block mb-1 font-semibold">Descrição do post:</label>
            <textarea
              className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4"
              rows={3}
              placeholder="Descrição do post"
              maxLength={255}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block mb-1 font-semibold">Adicionar tag:</label>
                <select
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                >
                  <option value="">Escolha uma das tags</option>
                  {tags.map((opcao) => (
                    <option key={opcao} value={opcao}>
                      {opcao}
                    </option>
                  ))}
                </select>
              </div>
              <button
                disabled={!podePostar}
                onClick={handleSubmit}
                className={`h-11 px-6 py-2 rounded-xl text-white font-semibold transition-colors duration-200
                  ${podePostar ? "bg-green-600 hover:bg-green-700" : "bg-green-300 cursor-not-allowed"}`}
              >
                Postar
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}