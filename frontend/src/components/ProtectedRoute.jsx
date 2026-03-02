import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

/**
 * ProtectedRoute — redirects unauthenticated users to /login.
 * Optionally restricts access to specific roles.
 *
 * @param {string[]} roles - Allowed roles (e.g. ['student', 'admin'])
 */
export default function ProtectedRoute({ children, roles }) {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    if (!user) return <Navigate to="/login" replace />;

    if (roles && !roles.includes(user.role)) {
        // Redirect to a default page based on role
        if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (user.role === 'recruiter') return <Navigate to="/my-jobs" replace />;
        return <Navigate to="/jobs" replace />;
    }

    return children;
}
