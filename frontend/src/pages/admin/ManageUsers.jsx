import { useState, useEffect } from 'react';
import API from '../../utils/api';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import toast from 'react-hot-toast';
import { HiTrash, HiMail } from 'react-icons/hi';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await API.get('/api/admin/users');
            setUsers(data.users);
        } catch {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete user "${name}"? This cannot be undone.`)) return;
        try {
            await API.delete(`/api/admin/users/${id}`);
            setUsers(users.filter((u) => u._id !== id));
            toast.success('User deleted');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Delete failed');
        }
    };

    if (loading) return <Loader />;

    const roleColors = {
        student: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
        recruiter: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
        admin: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30',
    };

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Manage Users</h1>
                <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">{users.length} registered user(s)</p>
            </div>

            {users.length === 0 ? (
                <EmptyState title="No users" />
            ) : (
                <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-surface-200 dark:border-surface-700/50 bg-surface-50 dark:bg-surface-800/50">
                                    <th className="text-left px-5 py-4 text-surface-500 dark:text-surface-400 font-semibold text-xs uppercase tracking-wider">User</th>
                                    <th className="text-left px-5 py-4 text-surface-500 dark:text-surface-400 font-semibold text-xs uppercase tracking-wider">Email</th>
                                    <th className="text-left px-5 py-4 text-surface-500 dark:text-surface-400 font-semibold text-xs uppercase tracking-wider">Role</th>
                                    <th className="text-left px-5 py-4 text-surface-500 dark:text-surface-400 font-semibold text-xs uppercase tracking-wider">Joined</th>
                                    <th className="text-right px-5 py-4 text-surface-500 dark:text-surface-400 font-semibold text-xs uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id} className="border-b border-surface-100 dark:border-surface-700/30 last:border-none hover:bg-surface-50 dark:hover:bg-surface-800/30 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                                    {u.name?.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="text-surface-900 dark:text-surface-200 font-medium">{u.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-surface-500 dark:text-surface-400">
                                            <div className="flex items-center gap-1">
                                                <HiMail size={14} /> {u.email}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border capitalize ${roleColors[u.role]}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-surface-500 dark:text-surface-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td className="px-5 py-4 text-right">
                                            <button onClick={() => handleDelete(u._id, u.name)}
                                                className="p-2 text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all" title="Delete user">
                                                <HiTrash size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
