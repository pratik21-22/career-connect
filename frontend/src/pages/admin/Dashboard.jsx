import { useState, useEffect } from 'react';
import API from '../../utils/api';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';
import { HiUsers, HiBriefcase, HiDocumentText, HiTrendingUp } from 'react-icons/hi';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchStats(); }, []);

    const fetchStats = async () => {
        try {
            const { data } = await API.get('/api/admin/stats');
            setStats(data);
        } catch {
            toast.error('Failed to load statistics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    const cards = [
        { label: 'Total Users', value: stats?.totalUsers || 0, icon: <HiUsers size={24} />, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
        { label: 'Total Jobs', value: stats?.totalJobs || 0, icon: <HiBriefcase size={24} />, color: 'from-primary-500 to-violet-500', bg: 'bg-primary-50 dark:bg-primary-500/10', text: 'text-primary-600 dark:text-primary-400' },
        { label: 'Total Applications', value: stats?.totalApplications || 0, icon: <HiDocumentText size={24} />, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
    ];

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Platform overview at a glance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {cards.map((card) => (
                    <div key={card.label}
                        className="glass-card hover-lift p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center ${card.text}`}>
                                {card.icon}
                            </div>
                            <HiTrendingUp className="text-emerald-500" size={20} />
                        </div>
                        <p className="text-3xl font-bold text-surface-900 dark:text-white">{card.value.toLocaleString()}</p>
                        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1 font-medium">{card.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
