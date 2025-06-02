import { useNavigate } from "react-router-dom";

export default function PossuiEmpresa() {
  const navigate = useNavigate();

  const handleCadastroEmpresa = () => {
    navigate("/cadastro?tipo=empresa"); 
  };

  return (
    <div className="rounded-3xl bg-gray-100 shadow p-6 flex flex-col gap-3">
      <div className="font-bold text-lg">Você possui uma empresa?</div>
      <div className="text-gray-700">Faça o cadastro da sua empresa no nosso sistema.</div>
      <button
        className="bg-green-600 text-white font-bold rounded-lg px-6 py-2 mt-2 hover:bg-green-700 transition"
        onClick={handleCadastroEmpresa}
      >
        Cadastrar
      </button>
      {/* <div className="text-xs text-gray-500 mt-1">Não possuo uma empresa</div> */}
    </div>
  );
}