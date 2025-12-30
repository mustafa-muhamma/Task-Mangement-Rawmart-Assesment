import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = () => {
    const { token } = useAuth();

    // If user is authenticated, redirect to Dashboard
    if (token) {
        return <Navigate to="/" replace />;
    }

    // Otherwise, allow access to the public page (Login/Register)
    return <Outlet />;
};

export default PublicRoute;
