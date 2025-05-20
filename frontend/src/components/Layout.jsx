import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // ajuste o caminho se a Navbar estiver em outro lugar

function Layout({ children }) {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
    </>
  );
}

export default Layout;
