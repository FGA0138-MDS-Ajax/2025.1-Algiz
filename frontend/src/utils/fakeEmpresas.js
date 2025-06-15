export function seedFakeEmpresas() {
  const empresas = [
    { 
      id: "1", 
      nome: "TechNova", 
      logo: "/user/foto-perfil-padrao-empresa.png",
      banner: "/user/banner-padrao-1.png",
      descricao: "Empresa de tecnologia inovadora focada em soluções digitais para o futuro.",
      endereco: "Av. das Nações, 1000 - Brasília, DF"
    },
    { 
      id: "2", 
      nome: "EcoBuild", 
      logo: "/user/foto-perfil-padrao-1.png",
      banner: "/user/banner-padrao-2.png",
      descricao: "Construção sustentável e ecológica para um mundo melhor.",
      endereco: "Rua Verde, 200 - São Paulo, SP"
    },
    { 
      id: "3", 
      nome: "HealthPlus", 
      logo: "/user/foto-perfil-padrao-2.png",
      banner: "/user/banner-padrao-3.png",
      descricao: "Saúde e bem-estar em primeiro lugar, com tecnologia de ponta.",
      endereco: "Av. Saúde, 300 - Belo Horizonte, MG"
    },
    { 
      id: "4", 
      nome: "AgroFuturo", 
      logo: "/user/foto-perfil-padrao-empresa.png",
      banner: "/user/banner-padrao-1.png",
      descricao: "Inovação no agronegócio para alimentar o amanhã.",
      endereco: "Estrada Rural, 400 - Goiânia, GO"
    },
    { 
      id: "5", 
      nome: "EducaMais", 
      logo: "/user/foto-perfil-padrao-1.png",
      banner: "/user/banner-padrao-2.png",
      descricao: "Educação transformadora para todas as idades.",
      endereco: "Rua do Saber, 500 - Recife, PE"
    },
    { 
      id: "6", 
      nome: "FinanSmart", 
      logo: "/user/foto-perfil-padrao-2.png",
      banner: "/user/banner-padrao-3.png",
      descricao: "Soluções financeiras inteligentes para o seu negócio.",
      endereco: "Av. Financeira, 600 - Curitiba, PR"
    },
    { 
      id: "7", 
      nome: "MoveIt", 
      logo: "/user/foto-perfil-padrao-empresa.png",
      banner: "/user/banner-padrao-1.png",
      descricao: "Mobilidade urbana eficiente e sustentável.",
      endereco: "Rua do Transporte, 700 - Porto Alegre, RS"
    },
    { 
      id: "8", 
      nome: "CodeWave", 
      logo: "/user/foto-perfil-padrao-1.png",
      banner: "/user/banner-padrao-2.png",
      descricao: "Desenvolvimento de software sob medida para sua empresa.",
      endereco: "Av. dos Programadores, 800 - Florianópolis, SC"
    },
    { 
      id: "9", 
      nome: "BioGen", 
      logo: "/user/foto-perfil-padrao-2.png",
      banner: "/user/banner-padrao-3.png",
      descricao: "Biotecnologia avançada para a saúde e o meio ambiente.",
      endereco: "Rua da Ciência, 900 - Manaus, AM"
    },
    { 
      id: "10", 
      nome: "Urbanize", 
      logo: "/user/foto-perfil-padrao-empresa.png",
      banner: "/user/banner-padrao-1.png",
      descricao: "Soluções urbanas inteligentes para cidades modernas.",
      endereco: "Av. Central, 1000 - Salvador, BA"
    },
  ];
  sessionStorage.setItem("fakeEmpresas", JSON.stringify(empresas));
}