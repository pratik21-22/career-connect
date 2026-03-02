import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { HiArrowRight } from 'react-icons/hi';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await login(form.email, form.password);
            toast.success('Welcome back!');
            if (data.user.role === 'admin') navigate('/admin/dashboard');
            else if (data.user.role === 'recruiter') navigate('/my-jobs');
            else navigate('/jobs');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-surface-950">
            {/* Left: Brand Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent)]" />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary-900/50 to-transparent" />

                {/* Floating shapes */}
                <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/10 animate-float" />
                <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-white/5 animate-float" style={{ animationDelay: '3s' }} />
                <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-2xl bg-white/10 rotate-45 animate-float" style={{ animationDelay: '1.5s' }} />

                <div className="relative z-10 flex flex-col justify-center px-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg">CC</div>
                        <span className="text-2xl font-bold text-white">CareerConnect</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                        Welcome back to<br />your career hub
                    </h2>
                    <p className="text-primary-100 text-lg max-w-md leading-relaxed">
                        Sign in to access your dashboard, track applications, and discover new opportunities.
                    </p>
                    <div className="mt-10 flex items-center gap-6 text-primary-200 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">✓</div>
                            <span>10,000+ Jobs</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">✓</div>
                            <span>5,000+ Companies</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md animate-fadeIn">
                    {/* Mobile logo */}
                    <div className="text-center mb-8 lg:hidden">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg shadow-primary-500/25">
                            CC
                        </div>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Sign In</h1>
                        <p className="text-surface-500 dark:text-surface-400 text-sm mt-2">Enter your credentials to access your account</p>
                    </div>

                    <div className="glass-card p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="input-field"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="input-field"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full py-3"
                            >
                                {loading ? 'Signing in...' : 'Sign In'} {!loading && <HiArrowRight size={16} />}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
