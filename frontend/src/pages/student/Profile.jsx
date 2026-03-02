import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import API from '../../utils/api';
import ProfilePhotoUpload from '../../components/ProfilePhotoUpload';
import toast from 'react-hot-toast';
import { HiUpload, HiUser } from 'react-icons/hi';

export default function Profile() {
    const { user, setUser } = useAuth();
    const [form, setForm] = useState({ name: '', bio: '', skills: '', resumeLink: '' });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || '',
                bio: user.bio || '',
                skills: (user.skills || []).join(', '),
                resumeLink: user.resumeLink || '',
            });
        }
    }, [user]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                name: form.name,
                bio: form.bio,
                skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
                resumeLink: form.resumeLink,
            };
            const { data } = await API.put('/api/users/profile', payload);
            setUser(data.user);
            toast.success('Profile updated!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('resume', file);
            const { data } = await API.post('/api/users/resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setForm({ ...form, resumeLink: data.resumeLink });
            setUser((prev) => ({ ...prev, resumeLink: data.resumeLink }));
            toast.success('Resume uploaded!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-fadeIn">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">My Profile</h1>
                <p className="text-surface-500 dark:text-surface-400 text-sm mt-1">Manage your personal information</p>
            </div>

            {/* Profile Header Card with Photo Upload */}
            <div className="glass-card p-8 mb-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Profile photo upload */}
                    <ProfilePhotoUpload />

                    {/* User info */}
                    <div className="text-center sm:text-left">
                        <h2 className="text-lg font-bold text-surface-900 dark:text-white">{user?.name}</h2>
                        <p className="text-sm text-surface-500 dark:text-surface-400">{user?.email}</p>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 mt-2 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 capitalize">
                            <HiUser size={12} /> {user?.role}
                        </span>
                    </div>
                </div>
            </div>

            {/* Profile Form */}
            <div className="glass-card p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Name</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                            className="input-field" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Bio</label>
                        <textarea name="bio" rows={4} value={form.bio} onChange={handleChange}
                            placeholder="Tell us about yourself..."
                            className="input-field resize-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Skills (comma separated)</label>
                        <input type="text" name="skills" value={form.skills} onChange={handleChange}
                            placeholder="React, Node.js, Python"
                            className="input-field" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Resume Link</label>
                        <input type="text" name="resumeLink" value={form.resumeLink} onChange={handleChange}
                            placeholder="https://..."
                            className="input-field" />
                    </div>

                    {/* Resume upload */}
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Or upload resume (PDF)</label>
                        <label className="flex items-center gap-3 px-4 py-3 bg-surface-50 dark:bg-surface-800 border-2 border-dashed border-surface-300 dark:border-surface-600 rounded-xl cursor-pointer hover:border-primary-400 dark:hover:border-primary-500 transition-all group">
                            <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <HiUpload className="text-primary-500" size={20} />
                            </div>
                            <div>
                                <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                                    {uploading ? 'Uploading...' : 'Click to choose file'}
                                </span>
                                <p className="text-xs text-surface-400 dark:text-surface-500">.pdf, .doc, .docx</p>
                            </div>
                            <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload}
                                className="hidden" disabled={uploading} />
                        </label>
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
}
