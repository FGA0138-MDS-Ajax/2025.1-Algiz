import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sobrenos from './pages/Sobrenos';
import Empresas from './pages/Empresas';
import Login from './pages/Login';
import Layout from './components/Layout'; 
import Cadastro from './pages/Cadastro';
import PaginaUsuario from './pages/PaginaUsuario';
import PaginaPost from './pages/PaginaPost';
import EsqueciSenha from './pages/EsqueciSenha';
import CodigoAutenticacao from './pages/CodigoAutenticacao';
import RedefinirSenha from './pages/RedefinirSenha';
import ConfiguracoesUsuario from './pages/ConfiguracoesUsuario';
import CriarPostagem from './pages/PaginaCriacaoPostagem';

function App() {
  
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobrenos" element={<Sobrenos />} />
          <Route path="/cadastro" element={<Cadastro />} />
          {/* Rota empresa/:id Irei deixar por enquanto a rota empresas/ do jeito que foi feito */ }
          <Route path="/empresa/:idEmpresa" element={<Empresas />} />
          <Route path="/usuario/:idUsuario" element={<PaginaUsuario />} />
          <Route path="/login" element={<Login />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route path="/codigo-autenticacao" element={<CodigoAutenticacao />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          <Route path="/post" element={<PaginaPost />} />
          <Route path="/configuracoesusuario" element={<ConfiguracoesUsuario />} />
          <Route path="/empresa/criar-postagem" element={<CriarPostagem />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
