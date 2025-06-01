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

function App() {
  useEffect(() => {
    if (!sessionStorage.getItem("fakeUsers")) {
      seedFakeUsers();
    }
    if (!sessionStorage.getItem("fakeEmpresas")) {
      seedFakeEmpresas();
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobrenos" element={<Sobrenos />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/usuario/:idUsuario" element={<PaginaUsuario />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
