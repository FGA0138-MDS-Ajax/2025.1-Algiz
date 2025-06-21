import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import Home from './pages/Home';
import Sobrenos from './pages/Sobrenos';
import Blog from './pages/Blog';
import Empresas from './pages/Empresas';
import Login from './pages/Login';
import Layout from './components/Layout'; 
import Cadastro from './pages/Cadastro';
import PaginaUsuario from './pages/PaginaUsuario';
import { seedFakeUsers } from "./utils/fakeUsers";
import { seedFakeEmpresas } from "./utils/fakeEmpresas";
import PaginaPost from './pages/PaginaPost';
import EsqueciSenha from './pages/EsqueciSenha';
import CodigoAutenticacao from './pages/CodigoAutenticacao';
import RedefinirSenha from './pages/RedefinirSenha';

function App() {
  
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobrenos" element={<Sobrenos />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/empresas" element={<Empresas />} />
          {/* Rota empresa/:id Irei deixar por enquanto a rota empresas/ do jeito que foi feito */ }
          <Route path="/empresa/:idEmpresa" element={<Empresas />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/usuario/:idUsuario" element={<PaginaUsuario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route path="/codigo-autenticacao" element={<CodigoAutenticacao />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/post" element={<PaginaPost />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
