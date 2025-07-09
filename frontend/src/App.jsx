// frontend/src/App.jsx
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
import Contratos from './pages/Contratos';
import ProtectedRoute from './components/ProtectedRoute';
import AuthListener from './components/AuthListener';
import { ModalProvider } from './context/ModalContext';
import VisualizarContrato from "./pages/VisualizarContrato";

import AuthProvider from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthListener />
        <ModalProvider>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/sobrenos" element={<Sobrenos />} />
              <Route path="/empresa/:idEmpresa" element={<Empresas />} />
              <Route path="/usuario/:idUsuario" element={<PaginaUsuario />} />
              
              {/* Rota para post específico com ID */}
              <Route path="/post/:id" element={<PaginaPost />} />
              
              {/* Mantida a rota antiga para compatibilidade */}
              <Route path="/post" element={<PaginaPost />} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/esqueci-senha" element={<EsqueciSenha />} />
              <Route path="/codigo-autenticacao" element={<CodigoAutenticacao />} />
              <Route path="/redefinir-senha" element={<RedefinirSenha />} />

              {/* Protected routes */}
              <Route
                path="/configuracoesusuario"
                element={
                  <ProtectedRoute>
                    <ConfiguracoesUsuario />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/empresa/criar-postagem"
                element={
                  <ProtectedRoute>
                    <CriarPostagem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/empresa/contratos"
                element={
                  <ProtectedRoute>
                    <Contratos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/empresa/contrato/:id"
                element={
                  <ProtectedRoute>
                    <VisualizarContrato />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;