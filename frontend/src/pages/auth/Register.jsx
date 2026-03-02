import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { HiArrowRight } from 'react-icons/hi';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await register(form.name, form.email, form.password, form.role);
            toast.success('Account created successfully!');
            if (data.user.role === 'admin') navigate('/admin/dashboard');
            else if (data.user.role === 'recruiter') navigate('/my-jobs');
            else navigate('/jobs');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const roles = [
        { value: 'student', label: '🎓 Student', desc: 'Find & apply for jobs' },
        { value: 'recruiter', label: '🏢 Recruiter', desc: 'Post jobs & hire talent' },
        { value: 'admin', label: '⚙️ Admin', desc: 'Manage the platform' },
    ];

    return (
        <div className="min-h-screen flex bg-white dark:bg-surface-950">
            {/* Left: Brand Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent)]" />

                {/* Floating shapes */}
                <div className="absolute top-32 right-20 w-40 h-40 rounded-full bg-white/10 animate-float" />
                <div className="absolute bottom-32 left-16 w-56 h-56 rounded-full bg-white/5 animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-xl bg-white/10 rotate-12 animate-float" style={{ animationDelay: '4s' }} />

                <div className="relative z-10 flex flex-col justify-center px-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg">CC</div>
                        <span className="text-2xl font-bold text-white">CareerConnect</span>
                    </div>
                    <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                        Start your journey<br />with us today
                    </h2>
                    <p className="text-primary-100 text-lg max-w-md leading-relaxed">
                        Create a free account and unlock access to thousands of job opportunities from top companies.
                    </p>
                    <div className="mt-10 space-y-3 text-primary-200 text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</div>
                            <span>Free to use, no credit card required</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</div>
                            <span>Upload resume & get noticed by recruiters</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">✓</div>
                            <span>Track your applications in real-time</span>
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
                        <h1 className="text-2xl font-bold text-surface-900 dark:text-white">Create Account</h1>
                        <p className="text-surface-500 dark:text-surface-400 text-sm mt-2">Join CareerConnect and start your journey</p>
                    </div>

                    <div className="glass-card p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Full Name</label>
                                <input type="text" name="name" required value={form.name} onChange={handleChange}
                                    placeholder="John Doe" className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email</label>
                                <input type="email" name="email" required value={form.email} onChange={handleChange}
                                    placeholder="you@example.com" className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Password</label>
                                <input type="password" name="password" required minLength={6} value={form.password} onChange={handleChange}
                                    placeholder="Min 6 characters" className="input-field" />
                            </div>

                            {/* Role selection */}
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">I am a</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {roles.map((r) => (
                                        <button
                                            type="button"
                                            key={r.value}
                                            onClick={() => setForm({ ...form, role: r.value })}
                                            className={`p-3 rounded-xl border text-center transition-all duration-200 ${form.role === r.value
                                                    ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-300 dark:border-primary-500/50 text-primary-700 dark:text-primary-400 shadow-sm'
                                                    : 'bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-500 dark:text-surface-400 hover:border-surface-300 dark:hover:border-surface-600'
                                                }`}
                                        >
                                            <span className="text-lg">{r.label.split(' ')[0]}</span>
                                            <p className="text-xs mt-1 font-medium">{r.label.split(' ')[1]}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                                {loading ? 'Creating account...' : 'Create Account'} {!loading && <HiArrowRight size={16} />}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 font-semibold">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
