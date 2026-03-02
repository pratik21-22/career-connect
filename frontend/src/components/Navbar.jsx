import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { HiOutlineLogout, HiOutlineMenuAlt3 } from 'react-icons/hi';

/**
 * Top navigation bar — glassmorphism style with theme toggle.
 */
export default function Navbar({ onToggleSidebar }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 glass flex items-center justify-between px-4 md:px-6 shadow-sm">
            {/* Left: hamburger + logo */}
            <div className="flex items-center gap-3">
                {user && (
                    <button
                        onClick={onToggleSidebar}
                        className="md:hidden text-surface-500 hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400 transition-colors"
                    >
                        <HiOutlineMenuAlt3 size={24} />
                    </button>
                )}
                <Link to="/" className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        CC
                    </div>
                    <span className="text-lg font-bold gradient-text hidden sm:inline">
                        CareerConnect
                    </span>
                </Link>
            </div>

            {/* Right: theme toggle + user info / auth links */}
            <div className="flex items-center gap-3">
                <ThemeToggle />

                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-sm font-semibold text-surface-800 dark:text-surface-200">{user.name}</span>
                            <span className="text-xs text-primary-600 dark:text-primary-400 capitalize font-medium">{user.role}</span>
                        </div>
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                            {user.profileImage ? (
                                <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                                user.name?.charAt(0).toUpperCase()
                            )}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-xl text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                            title="Logout"
                        >
                            <HiOutlineLogout size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="btn-secondary text-sm py-2 px-4">Sign In</Link>
                        <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
