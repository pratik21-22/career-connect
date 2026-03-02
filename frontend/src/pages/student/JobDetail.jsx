import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';
import {
    HiLocationMarker,
    HiCurrencyDollar,
    HiOfficeBuilding,
    HiCalendar,
    HiArrowLeft,
    HiUser,
    HiCheckCircle,
} from 'react-icons/hi';

export default function JobDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [hasApplied, setHasApplied] = useState(false);

    useEffect(() => {
        fetchJob();
        if (user?.role === 'student') checkApplicationStatus();
        // eslint-disable-next-line
    }, [id]);

    const fetchJob = async () => {
        try {
            const { data } = await API.get(`/api/jobs/${id}`);
            setJob(data.job);
        } catch {
            toast.error('Job not found');
            navigate('/jobs');
        } finally {
            setLoading(false);
        }
    };

    const checkApplicationStatus = async () => {
        try {
            const { data } = await API.get('/api/applications/my');
            const applied = data.applications.some((a) => a.jobId?._id === id);
            setHasApplied(applied);
        } catch { }
    };

    const handleApply = async () => {
        setApplying(true);
        try {
            await API.post(`/api/applications/${id}`);
            toast.success('Application submitted!');
            setHasApplied(true);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to apply');
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <Loader />;
    if (!job) return null;

    return (
        <div className="max-w-3xl mx-auto animate-fadeIn">
            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-surface-500 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors font-medium text-sm"
            >
                <HiArrowLeft size={18} /> Back to Jobs
            </button>

            {/* Job header card */}
            <div className="glass-card p-6 md:p-8 mb-6">
                <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-500/20 dark:to-primary-700/20 border border-primary-200 dark:border-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-2xl flex-shrink-0">
                        {job.company?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">{job.title}</h1>
                        <p className="text-surface-500 dark:text-surface-400 flex items-center gap-1.5 mt-1">
                            <HiOfficeBuilding size={16} /> {job.company}
                        </p>
                    </div>
                </div>

                {/* Meta tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <span className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 px-4 py-2 rounded-xl text-sm text-blue-700 dark:text-blue-400 font-medium">
                        <HiLocationMarker size={16} /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-xl text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                        <HiCurrencyDollar size={16} /> {job.salary || 'Not disclosed'}
                    </span>
                    <span className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-500/10 px-4 py-2 rounded-xl text-sm text-purple-700 dark:text-purple-400 font-medium">
                        <HiCalendar size={16} /> {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                    {job.createdBy && (
                        <span className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-500/10 px-4 py-2 rounded-xl text-sm text-amber-700 dark:text-amber-400 font-medium">
                            <HiUser size={16} /> {job.createdBy.name}
                        </span>
                    )}
                </div>

                {/* Apply button (students only) */}
                {user?.role === 'student' && (
                    <button
                        onClick={handleApply}
                        disabled={hasApplied || applying}
                        className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${hasApplied
                                ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 cursor-default'
                                : 'btn-primary'
                            } disabled:opacity-70`}
                    >
                        {hasApplied ? <><HiCheckCircle size={18} /> Already Applied</> : applying ? 'Submitting...' : 'Apply Now'}
                    </button>
                )}
            </div>

            {/* Description */}
            <div className="glass-card p-6 md:p-8">
                <h2 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Job Description</h2>
                <p className="text-surface-600 dark:text-surface-300 leading-relaxed whitespace-pre-line">{job.description}</p>
            </div>
        </div>
    );
}
