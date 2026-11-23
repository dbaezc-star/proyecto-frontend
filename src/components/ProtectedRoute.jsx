import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { homeForRole } from '../utils/roles';

/** Solo deja pasar si hay sesión y (opcional) el rol es el correcto. */
const ProtectedRoute = ({ role, children }) => {
    const { user, token } = useAuth();

    if (!user || !token) return <Navigate to="/login" replace />;
    if (role && user.role !== role) return <Navigate to={homeForRole(user.role)} replace />;

    return children;
};

export default ProtectedRoute;
