import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SidebarIntro from "../components/SidebarIntro";
import SidebarUsuario from "../components/SidebarUsuario";
import SugestoesEmpresas from "../components/SugestoesEmpresas";
import { AuthContext } from "../context/AuthContext";
import { createPost } from "../services/postService";

const sugestoesEmpresas = [
  { id: "1", nome: "Cacau Show", logo: "/cacau.png" },
  { id: "2", nome: "Nestle", logo: "/nestle.png" },
  { id: "3", nome: "Lacta", logo: "/lacta.png" },
  { id: "4", nome: "Coca Cola", logo: "/coca.png" },
  { id: "5", nome: "Terra verde", logo: "/empresa9.png" },
  { id: "6", nome: "Kactus", logo: "/empresa10.png" },
];

const tiposPost = [
  { valor: "oferta", nome: "Oferta" },
  { valor: "demanda", nome: "Demanda" },
  { valor: "doacao", nome: "Doação" }
];

const tags = ["Sustentabilidade", "Reciclagem", "Economia Circular", "Meio Ambiente", "Resíduos"];

export default function CriarPostagem() {
  const { usuario } = useContext(AuthContext);
  const [empresaUsuario, setEmpresaUsuario] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [tipo, setTipo] = useState("oferta");
  const [selectedTags, setSelectedTags] = useState([]);
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" }); // Para feedback

  const navigate = useNavigate();

  // Buscar empresa do usuário ao carregar o componente
  useEffect(() => {
    async function buscarEmpresaUsuario() {
      if (usuario?.id) {
        try {
          const token = localStorage.getItem("authToken");
          const response = await fetch(`http://localhost:3001/api/users/${usuario.id}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          const data = await response.json();
          if (data.empresa_associada) {
            setEmpresaUsuario(data.empresa_associada);
          }
        } catch (error) {
          console.error("Erro ao buscar empresa do usuário:", error);
        }
      }
    }
    
    buscarEmpresaUsuario();
  }, [usuario]);
  
  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setImagem(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setMensagem({ 
        texto: "Somente arquivos .jpg, .jpeg, .png, .webp são permitidos", 
        tipo: "erro" 
      });
    }
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Limpar mensagens anteriores
    setMensagem({ texto: "", tipo: "" });
    
    if (!titulo || !conteudo || !imagem || !tipo) {
      setMensagem({ texto: "Preencha todos os campos obrigatórios", tipo: "erro" });
      return;
    }
    
    if (!empresaUsuario?.cnpj) {
      setMensagem({ texto: "Você não está associado a uma empresa", tipo: "erro" });
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('conteudo', conteudo);
      formData.append('tipo', tipo);
      selectedTags.forEach(tag => formData.append('tags[]', tag));
      formData.append('imagem', imagem);
      formData.append('cnpjJuridico', empresaUsuario.cnpj); // Garantir que o CNPJ está sendo enviado
      
      console.log('CNPJ sendo enviado:', empresaUsuario.cnpj); // Log para depuração
      
      const result = await createPost(formData);
      
      setMensagem({ texto: "Postagem criada com sucesso!", tipo: "sucesso" });
      
      // Redirecionar após um breve delay para mostrar a mensagem de sucesso
      setTimeout(() => {
        navigate(`/post/${result.id}`);
      }, 1500);
    } catch (error) {
      console.error("Erro ao criar postagem:", error);
      const errorMessage = error.response?.data?.erro || "Erro ao criar postagem. Tente novamente.";
      console.log("Mensagem de erro:", errorMessage); // Log para depuração
      setMensagem({ texto: errorMessage, tipo: "erro" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const podePostar = titulo && conteudo && imagem && tipo && !isSubmitting;

  // Exibir mensagem se o usuário não tem empresa associada
  if (usuario && !empresaUsuario) {
    return (
      <div className="min-h-screen bg-green-50 pt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-xl font-semibold mb-4">Criar Postagem</h1>
            <p className="text-red-600 mb-4">
              Você precisa estar associado a uma empresa para criar postagens.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Voltar para o início
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-green-50 pt-16">
      <div className="container mx-auto px-4 md:px-20 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar composta */}
        <div className="w-full md:w-1/5 flex flex-col gap-4">
          <div className="sticky top-20">
            {usuario ? <SidebarUsuario usuario={usuario} /> : <SidebarIntro />}
            <div className="mt-4">
              <SugestoesEmpresas sugestoes={sugestoesEmpresas} />
            </div>
          </div>
        </div>

        {/* Feed de criação */}
        <main className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-[620px] bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-xl font-semibold mb-4">Criar Postagem</h1>
            
            {/* Mensagem de feedback */}
            {mensagem.texto && (
              <div className={`mb-4 p-3 rounded-lg ${
                mensagem.tipo === 'erro' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {mensagem.texto}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="titulo" className="block mb-1 font-semibold">
                  Título do post:
                </label>
                <input
                  id="titulo"
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  placeholder="Título do post"
                  maxLength={255}
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="tipo" className="block mb-1 font-semibold">
                  Tipo de post:
                </label>
                <select
                  id="tipo"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
                >
                  {tiposPost.map(option => (
                    <option key={option.valor} value={option.valor}>
                      {option.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="upload-imagem" className="block mb-1 font-semibold">
                  Upload da imagem
                </label>
                <div className="bg-gray-200 rounded-xl h-48 flex justify-center items-center relative overflow-hidden">
                  <input
                    id="upload-imagem"
                    type="file"
                    accept="image/*"
                    onChange={handleImagemChange}
                    className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  {preview ? (
                    <img src={preview} alt="Preview" className="object-contain h-full" />
                  ) : (
                    <div className="text-center z-0">
                      <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded shadow">
                        Upload da imagem
                      </button>
                      <p className="text-sm text-gray-700 mt-1">
                        ou arraste um arquivo pra cá
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="conteudo" className="block mb-1 font-semibold">
                  Descrição do post:
                </label>
                <textarea
                  id="conteudo"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  rows={4}
                  placeholder="Descreva sua postagem..."
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block mb-2 font-semibold">Tags:</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!podePostar}
                  className={`px-6 py-2 rounded-xl text-white font-semibold transition-colors duration-200
                    ${podePostar ? "bg-green-600 hover:bg-green-700" : "bg-green-300 cursor-not-allowed"}`}
                >
                  {isSubmitting ? "Publicando..." : "Publicar"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}