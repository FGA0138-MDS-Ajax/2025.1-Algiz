// frontend/src/components/AuthListener.jsx
import { useEffect, useContext } from 'react'; // Added useContext import
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// List of public paths that don't require authentication
const PUBLIC_PATHS = [
  '/',
  '/sobrenos',
  '/post',
  '/empresa/:idEmpresa',
  '/usuario/:idUsuario',
  '/login',
  '/cadastro',
  '/esqueci-senha',
  '/codigo-autenticacao',
  '/redefinir-senha'
];

export default function AuthListener() {
  const { usuario, loading } = useContext(AuthContext); // Now using the imported useContext
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    const token = localStorage.getItem("authToken");
    const isPublicPath = PUBLIC_PATHS.some(path => {
      // Handle dynamic routes like /empresa/:idEmpresa
      if (path.includes(':')) {
        const basePath = path.split('/:')[0];
        return location.pathname.startsWith(basePath);
      }
      return path === location.pathname;
    });

    // If on a protected route without token, redirect to login
    if (!isPublicPath && !token) {
      navigate('/login', { state: { from: location }, replace: true });
    }

    // If on a guest-only route with token, redirect to home
    const guestOnlyPaths = ['/login', '/cadastro', '/esqueci-senha'];
    if (guestOnlyPaths.includes(location.pathname) && token) {
      navigate('/', { replace: true });
    }
  }, [usuario, loading, navigate, location]);

  return null;
}