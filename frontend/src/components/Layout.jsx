import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function Layout({ children }) {
  const location = useLocation();

  // Define routes where the navbar should be hidden
  const noNavbarRoutes = ['/Login', '/cadastro'];

  // Check if the current route matches one of those
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="min-h-screen">{children}</div>
    </>
  );
}

export default Layout;