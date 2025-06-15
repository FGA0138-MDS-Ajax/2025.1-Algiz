import { estados } from "./opcoes_form";

function getRandomEstado() {
  
  const validEstados = estados.slice(1);
  const random = Math.floor(Math.random() * validEstados.length);
  return validEstados[random].value;
}

export function seedFakeUsers() {
  const banners = [
    "/user/banner-padrao-1.png",
    "/user/banner-padrao-2.png",
    "/user/banner-padrao-3.png"
  ];

  const users = [
    {
      id: "1",
      nome: "Isaac Newton",
      email: "isaac@email.com",
      senha: "isaac123",
      telefone: "(61) 90000-0000",
      endereco: getRandomEstado(),
      foto: "/user/foto-perfil-padrao-1.png", 
      banner: banners[0],
      empresasSeguindo: [
        { id: "1", nome: "TechNova", logo: "/empresa1.png" },
        { id: "2", nome: "EcoBuild", logo: "/empresa2.png" },
      ],
      empresasTrabalhando: [
        { id: "3", nome: "HealthPlus", logo: "/empresa3.png" }
      ],
      posts: [1, 2, 3] 
    },
    {
      id: "2",
      nome: "Ada Lovelace",
      email: "ada@email.com",
      senha: "ada123",
      telefone: "(61) 90000-0001",
      endereco: getRandomEstado(),
      foto: "/user/foto-perfil-padrao-2.png", 
      banner: banners[1],
      empresasSeguindo: [
        { id: "4", nome: "AgroFuturo", logo: "/empresa4.png" },
        { id: "5", nome: "EducaMais", logo: "/empresa5.png" },
        { id: "1", nome: "TechNova", logo: "/empresa1.png" }
      ],
      empresasTrabalhando: [
        { id: "5", nome: "EducaMais", logo: "/empresa5.png" }
      ],
      posts: [1] 
    },
    {
      id: "3",
      nome: "Grace Hopper",
      email: "grace@email.com",
      senha: "grace123",
      telefone: "(61) 90000-0002",
      endereco: getRandomEstado(),
      foto: "/user/foto-perfil-padrao-1.png", 
      banner: banners[2],
      empresasSeguindo: [],
      empresasTrabalhando: [],
      posts: [] 
    },
    {
      id: "4",
      nome: "Alan Turing",
      email: "alan@email.com",
      senha: "alan123",
      telefone: "(61) 90000-0003",
      endereco: getRandomEstado(),
      foto: "/user/foto-perfil-padrao-2.png", 
      banner: banners[0],
      empresasSeguindo: [
        { id: "8", nome: "CodeWave", logo: "/empresa8.png" }
      ],
      empresasTrabalhando: [
        { id: "8", nome: "CodeWave", logo: "/empresa8.png" }
      ],
      posts: [] 
    },
    {
      id: "5",
      nome: "Marie Curie",
      email: "marie@email.com",
      senha: "marie123",
      telefone: "(61) 90000-0004",
      endereco: getRandomEstado(),
      foto: "/user/foto-perfil-padrao-1.png", 
      banner: banners[1],
      empresasSeguindo: [
        { id: "9", nome: "BioGen", logo: "/empresa9.png" }
      ],
      empresasTrabalhando: [],
      posts: [] 
    },
    {
      id: "6",
      nome: "Nikola Tesla",
      email: "tesla@email.com",
      senha: "tesla123",
      telefone: "(61) 90000-0005",
      endereco: getRandomEstado(),
      foto: "/user/foto-perfil-padrao-2.png", 
      banner: banners[2],
      empresasSeguindo: [
        { id: "7", nome: "MoveIt", logo: "/empresa7.png" },
        { id: "2", nome: "EcoBuild", logo: "/empresa2.png" }
      ],
      empresasTrabalhando: [
        { id: "7", nome: "MoveIt", logo: "/empresa7.png" }
      ],
      posts: [] 
    },
    {
      id: "7",
      nome: "Katherine Johnson",
      email: "katherine@email.com",
      senha: "katherine123",
      telefone: "(61) 90000-0006",
      endereco: getRandomEstado(),
      foto: "/user/foto-perfil-padrao-1.png", 
      banner: banners[0],
      empresasSeguindo: [],
      empresasTrabalhando: [],
      posts: [] 
    },
    {
      id: "8",
      nome: "Steve Jobs",
      email: "jobs@email.com",
      senha: "jobs123",
      telefone: "(61) 90000-0007",
      endereco: getRandomEstado(),
      foto: "/user/foto-perfil-padrao-2.png", 
      banner: banners[1],
      empresasSeguindo: [
        { id: "10", nome: "Urbanize", logo: "/empresa10.png" },
        { id: "6", nome: "FinanSmart", logo: "/empresa6.png" }
      ],
      empresasTrabalhando: [
        { id: "10", nome: "Urbanize", logo: "/empresa10.png" }
      ],
      posts: [] 
    },
    {
      id: "9",
      nome: "Hedy Lamarr",
      email: "hedy@email.com",
      senha: "hedy123",
      telefone: "(61) 90000-0008",
      endereco: getRandomEstado(),
      foto: "/user/foto-perfil-padrao-2.png", 
      banner: banners[2],
      empresasSeguindo: [
        { id: "3", nome: "HealthPlus", logo: "/empresa3.png" }
      ],
      empresasTrabalhando: [],
      posts: [] 
    },
    {
      id: "10",
      nome: "Tim Berners-Lee",
      email: "tim@email.com",
      senha: "tim123",
      telefone: "(61) 90000-0009",
      endereco: getRandomEstado(),
      foto: "/user/foto-perfil-padrao-1.png", 
      banner: banners[0],
      empresasSeguindo: [
        { id: "1", nome: "TechNova", logo: "/empresa1.png" },
        { id: "8", nome: "CodeWave", logo: "/empresa8.png" }
      ],
      empresasTrabalhando: [
        { id: "1", nome: "TechNova", logo: "/empresa1.png" }
      ],
      posts: [] 
    }
  ];

  sessionStorage.setItem("fakeUsers", JSON.stringify(users));
}