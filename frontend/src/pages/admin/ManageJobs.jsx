import { useState, useEffect } from 'react';
import API from '../../utils/api';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import toast from 'react-hot-toast';
import { HiTrash, HiLocationMarker } from 'react-icons/hi';

export default function ManageJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchJobs(); }, []);

    const fetchJobs = async () => {
        try {
            const { data } = await API.get('/api/admin/jobs');
            setJobs(data.jobs);
        } catch {
            toast.error('Failed to load jobs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this job and all its applications? This cannot be undone.')) return;
        try {
            await API.delete(`/api/admin/jobs/${id}`);
            setJobs(jobs.filter((j) => j._id !== id));
            toast.success('Job deleted');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Delete failed');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Manage Jobs</h1>
                <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">{jobs.length} job posting(s)</p>
            </div>

            {jobs.length === 0 ? (
                <EmptyState title="No jobs" />
            ) : (
                <div className="space-y-3">
                    {jobs.map((job) => (
                        <div key={job._id}
                            className="glass-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-slideIn">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-500/20 dark:to-primary-700/20 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-sm flex-shrink-0">
                                    {job.company?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-surface-900 dark:text-surface-100">{job.title}</h3>
                                    <div className="flex items-center gap-3 text-sm text-surface-500 dark:text-surface-400 mt-1">
                                        <span>{job.company}</span>
                                        <span className="flex items-center gap-1"><HiLocationMarker size={14} /> {job.location}</span>
                                        <span className="text-surface-400 dark:text-surface-500">by {job.createdBy?.name || 'Unknown'}</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => handleDelete(job._id)}
                                className="flex items-center gap-1.5 px-4 py-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 rounded-xl text-sm hover:bg-red-100 dark:hover:bg-red-500/20 transition-all font-medium">
                                <HiTrash size={16} /> Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
