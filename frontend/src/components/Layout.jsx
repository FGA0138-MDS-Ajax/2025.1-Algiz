import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // ajuste o caminho se a Navbar estiver em outro lugar

function Layout({ children }) {
  const location = useLocation();

  const hideNavbarOn = ['/Login'];
  const shouldHideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <div className="p-4">{children}</div>
    </>
  );
}

export default Layout;
