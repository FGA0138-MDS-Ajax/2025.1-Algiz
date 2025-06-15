import React from "react";
import { Link } from "react-router-dom";

export default function SidebarIntro() {
  return (
    <aside className="w-1/4">
      <div className="sticky top-20">
        <div className="bg-white rounded-xl shadow p-4 pt-3 pb-6 text-left border border-gray-200">
          <div className="text-[23px] leading-snug mb-6 break-words font-semibold">
            Desde 2025
            <br />
            Conectando empresas
            <br />
            com soluções sustentáveis
            <br />
            de forma simples e eficiente
          </div>
          <Link
            to="/cadastro"
            className="block w-full bg-green-600 text-white py-2 rounded-md text-center font-medium hover:bg-green-700 transition"
          >
            Cadastrar-se →
          </Link>
        </div>
      </div>
    </aside>
  );
}
