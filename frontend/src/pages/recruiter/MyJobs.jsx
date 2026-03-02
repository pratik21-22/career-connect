import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import toast from 'react-hot-toast';
import { HiPencil, HiTrash, HiEye, HiLocationMarker, HiPlus } from 'react-icons/hi';

export default function MyJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchJobs(); }, []);

    const fetchJobs = async () => {
        try {
            const { data } = await API.get('/api/jobs/my');
            setJobs(data.jobs);
        } catch {
            toast.error('Failed to load jobs');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this job? This action cannot be undone.')) return;
        try {
            await API.delete(`/api/jobs/${id}`);
            setJobs(jobs.filter((j) => j._id !== id));
            toast.success('Job deleted');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Delete failed');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-surface-900 dark:text-white">My Job Listings</h1>
                    <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">{jobs.length} job(s) posted</p>
                </div>
                <Link to="/post-job" className="btn-primary py-2.5 px-5 text-sm">
                    <HiPlus size={16} /> Post New Job
                </Link>
            </div>

            {jobs.length === 0 ? (
                <EmptyState title="No jobs yet" message="Create your first job posting!" />
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
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Link to={`/applicants/${job._id}`}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 rounded-lg text-sm hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all font-medium">
                                    <HiEye size={16} /> Applicants
                                </Link>
                                <Link to={`/edit-job/${job._id}`}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 rounded-lg text-sm hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all font-medium">
                                    <HiPencil size={16} /> Edit
                                </Link>
                                <button onClick={() => handleDelete(job._id)}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 rounded-lg text-sm hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all font-medium">
                                    <HiTrash size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
