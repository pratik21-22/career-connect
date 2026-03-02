import { useState, useEffect } from 'react';
import API from '../../utils/api';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import StatusBadge from '../../components/StatusBadge';
import toast from 'react-hot-toast';
import { HiOfficeBuilding, HiLocationMarker } from 'react-icons/hi';

export default function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const { data } = await API.get('/api/applications/my');
            setApplications(data.applications);
        } catch {
            toast.error('Failed to load applications');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">My Applications</h1>
                <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Track the status of your job applications</p>
            </div>

            {applications.length === 0 ? (
                <EmptyState title="No applications yet" message="Browse jobs and start applying!" />
            ) : (
                <div className="space-y-3">
                    {applications.map((app) => (
                        <div
                            key={app._id}
                            className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-slideIn"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-500/20 dark:to-primary-700/20 border border-primary-200 dark:border-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm flex-shrink-0">
                                    {app.jobId?.company?.charAt(0).toUpperCase() || '?'}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-surface-900 dark:text-surface-100">{app.jobId?.title || 'Job Removed'}</h3>
                                    <div className="flex items-center gap-3 text-sm text-surface-500 dark:text-surface-400 mt-1">
                                        <span className="flex items-center gap-1"><HiOfficeBuilding size={14} /> {app.jobId?.company}</span>
                                        <span className="flex items-center gap-1"><HiLocationMarker size={14} /> {app.jobId?.location}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-xs text-surface-400 dark:text-surface-500 font-medium">{new Date(app.createdAt).toLocaleDateString()}</span>
                                <StatusBadge status={app.status} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
