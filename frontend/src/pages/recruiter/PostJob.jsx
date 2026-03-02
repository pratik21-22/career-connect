import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import toast from 'react-hot-toast';
import { HiArrowLeft } from 'react-icons/hi';

export default function PostJob() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: '', description: '', company: '', location: '', salary: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/api/jobs', form);
            toast.success('Job posted successfully!');
            navigate('/my-jobs');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-fadeIn">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-surface-500 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors font-medium text-sm">
                <HiArrowLeft size={18} /> Back
            </button>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Post a New Job</h1>
                <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Fill in the details to create a job listing</p>
            </div>

            <div className="glass-card p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Job Title</label>
                        <input type="text" name="title" required value={form.title} onChange={handleChange}
                            placeholder="e.g. Frontend Developer Intern" className="input-field" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Company</label>
                        <input type="text" name="company" required value={form.company} onChange={handleChange}
                            placeholder="e.g. Google" className="input-field" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Location</label>
                            <input type="text" name="location" required value={form.location} onChange={handleChange}
                                placeholder="e.g. Bangalore, India" className="input-field" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Salary</label>
                            <input type="text" name="salary" value={form.salary} onChange={handleChange}
                                placeholder="e.g. ₹6,00,000/year" className="input-field" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Description</label>
                        <textarea name="description" required rows={6} value={form.description} onChange={handleChange}
                            placeholder="Describe the role, responsibilities, and requirements..."
                            className="input-field resize-none" />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                        {loading ? 'Posting...' : 'Post Job'}
                    </button>
                </form>
            </div>
        </div>
    );
}
