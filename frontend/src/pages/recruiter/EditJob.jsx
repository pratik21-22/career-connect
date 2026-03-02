import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../utils/api';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';
import { HiArrowLeft } from 'react-icons/hi';

export default function EditJob() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '', description: '', company: '', location: '', salary: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchJob();
        // eslint-disable-next-line
    }, [id]);

    const fetchJob = async () => {
        try {
            const { data } = await API.get(`/api/jobs/${id}`);
            const j = data.job;
            setForm({
                title: j.title, description: j.description, company: j.company,
                location: j.location, salary: j.salary || '',
            });
        } catch {
            toast.error('Job not found');
            navigate('/my-jobs');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await API.put(`/api/jobs/${id}`, form);
            toast.success('Job updated!');
            navigate('/my-jobs');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-2xl mx-auto animate-fadeIn">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-surface-500 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors font-medium text-sm">
                <HiArrowLeft size={18} /> Back
            </button>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Edit Job</h1>
                <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Update your job listing details</p>
            </div>

            <div className="glass-card p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Job Title</label>
                        <input type="text" name="title" required value={form.title} onChange={handleChange} className="input-field" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Company</label>
                        <input type="text" name="company" required value={form.company} onChange={handleChange} className="input-field" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Location</label>
                            <input type="text" name="location" required value={form.location} onChange={handleChange} className="input-field" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Salary</label>
                            <input type="text" name="salary" value={form.salary} onChange={handleChange} className="input-field" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Description</label>
                        <textarea name="description" required rows={6} value={form.description} onChange={handleChange}
                            className="input-field resize-none" />
                    </div>
                    <button type="submit" disabled={saving} className="btn-primary w-full py-3">
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
}
