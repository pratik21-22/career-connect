import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    HiBriefcase,
    HiDocumentText,
    HiUserCircle,
    HiPlus,
    HiClipboardList,
    HiUsers,
    HiChartBar,
    HiX,
    HiCog,
    HiBookmark,
} from 'react-icons/hi';

/**
 * Sidebar navigation — clean professional design with role-based links.
 */
export default function Sidebar({ isOpen, onClose }) {
    const { user } = useAuth();

    const navItems = [];

    if (user?.role === 'student') {
        navItems.push(
            { to: '/jobs', label: 'Browse Jobs', icon: <HiBriefcase /> },
            { to: '/my-applications', label: 'My Applications', icon: <HiDocumentText /> },
            { to: '/profile', label: 'My Profile', icon: <HiUserCircle /> },
        );
    }

    if (user?.role === 'recruiter') {
        navItems.push(
            { to: '/post-job', label: 'Post a Job', icon: <HiPlus /> },
            { to: '/my-jobs', label: 'My Jobs', icon: <HiBriefcase /> },
            { to: '/profile', label: 'My Profile', icon: <HiUserCircle /> },
        );
    }

    if (user?.role === 'admin') {
        navItems.push(
            { to: '/admin/dashboard', label: 'Dashboard', icon: <HiChartBar /> },
            { to: '/admin/users', label: 'Manage Users', icon: <HiUsers /> },
            { to: '/admin/jobs', label: 'Manage Jobs', icon: <HiClipboardList /> },
        );
    }

    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
            ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 font-semibold shadow-sm'
            : 'text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800'
        }`;

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed top-16 left-0 bottom-0 z-40 w-64 bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-700/50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                {/* Close button (mobile only) */}
                <div className="flex justify-end p-3 md:hidden">
                    <button onClick={onClose} className="text-surface-400 hover:text-surface-700 dark:hover:text-white transition-colors">
                        <HiX size={20} />
                    </button>
                </div>

                <nav className="px-3 py-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={linkClasses}
                            onClick={onClose}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Role badge at bottom */}
                <div className="absolute bottom-6 left-3 right-3">
                    <div className="px-4 py-3 bg-surface-50 dark:bg-surface-800/60 rounded-xl border border-surface-200 dark:border-surface-700/50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-xs">
                                {user?.profileImage ? (
                                    <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    user?.name?.charAt(0).toUpperCase()
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-surface-800 dark:text-surface-200 truncate">{user?.name}</p>
                                <p className="text-xs text-primary-600 dark:text-primary-400 capitalize font-medium">{user?.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
