export function seedFakeEmpresas() {
  const empresas = [
    { id: "1", nome: "TechNova", logo: "/empresa1.png" },
    { id: "2", nome: "EcoBuild", logo: "/empresa2.png" },
    { id: "3", nome: "HealthPlus", logo: "/empresa3.png" },
    { id: "4", nome: "AgroFuturo", logo: "/empresa4.png" },
    { id: "5", nome: "EducaMais", logo: "/empresa5.png" },
    { id: "6", nome: "FinanSmart", logo: "/empresa6.png" },
    { id: "7", nome: "MoveIt", logo: "/empresa7.png" },
    { id: "8", nome: "CodeWave", logo: "/empresa8.png" },
    { id: "9", nome: "BioGen", logo: "/empresa9.png" },
    { id: "10", nome: "Urbanize", logo: "/empresa10.png" },
  ];
  sessionStorage.setItem("fakeEmpresas", JSON.stringify(empresas));
}