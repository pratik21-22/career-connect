import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import StatusBadge from '../../components/StatusBadge';
import toast from 'react-hot-toast';
import { HiArrowLeft, HiMail, HiDocumentText } from 'react-icons/hi';

export default function Applicants() {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchApplicants(); /* eslint-disable-next-line */ }, [jobId]);

    const fetchApplicants = async () => {
        try {
            const { data } = await API.get(`/api/applications/job/${jobId}`);
            setApplications(data.applications);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to load applicants');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (appId, status) => {
        try {
            await API.put(`/api/applications/${appId}`, { status });
            setApplications((prev) =>
                prev.map((a) => (a._id === appId ? { ...a, status } : a))
            );
            toast.success(`Application ${status}`);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="animate-fadeIn">
            <button onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-surface-500 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors font-medium text-sm">
                <HiArrowLeft size={18} /> Back to My Jobs
            </button>

            <div className="mb-8">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Applicants</h1>
                <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">{applications.length} application(s) received</p>
            </div>

            {applications.length === 0 ? (
                <EmptyState title="No applicants yet" message="Share your job posting to attract candidates" />
            ) : (
                <div className="space-y-3">
                    {applications.map((app) => (
                        <div key={app._id} className="glass-card p-5 animate-slideIn">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                {/* Applicant info */}
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md">
                                        {app.studentId?.name?.charAt(0).toUpperCase() || '?'}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-surface-900 dark:text-surface-100">{app.studentId?.name}</h3>
                                        <p className="text-sm text-surface-500 dark:text-surface-400 flex items-center gap-1">
                                            <HiMail size={14} /> {app.studentId?.email}
                                        </p>
                                        {app.studentId?.skills?.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-2">
                                                {app.studentId.skills.slice(0, 5).map((s, i) => (
                                                    <span key={i} className="px-2.5 py-0.5 bg-surface-100 dark:bg-surface-700/50 rounded-md text-xs text-surface-600 dark:text-surface-300 font-medium">{s}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3">
                                    {app.studentId?.resumeLink && (
                                        <a href={app.studentId.resumeLink} target="_blank" rel="noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-2 bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 rounded-lg text-sm hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all font-medium">
                                            <HiDocumentText size={16} /> Resume
                                        </a>
                                    )}
                                    <StatusBadge status={app.status} />
                                    <select
                                        value={app.status}
                                        onChange={(e) => updateStatus(app._id, e.target.value)}
                                        className="input-field py-2 px-3 text-sm w-auto"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accept</option>
                                        <option value="rejected">Reject</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
