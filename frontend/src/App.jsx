import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sobrenos from './pages/Sobrenos';
import Blog from './pages/Blog';
import Empresas from './pages/Empresas';
import Login from './pages/Login';
import Layout from './components/Layout'; 

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobrenos" element={<Sobrenos />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
