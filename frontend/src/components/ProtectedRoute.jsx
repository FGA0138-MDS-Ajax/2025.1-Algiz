// frontend/src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, requireAuth = true }) {
  const { usuario, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (requireAuth && !usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && usuario) {
    return <Navigate to="/" replace />;
  }

  return children;
}