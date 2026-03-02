import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import {
    HiSearch,
    HiLocationMarker,
    HiCode,
    HiTrendingUp,
    HiCurrencyDollar,
    HiHeart,
    HiAcademicCap,
    HiDesktopComputer,
    HiColorSwatch,
    HiStar,
    HiArrowRight,
    HiMail,
    HiChevronRight,
} from 'react-icons/hi';
import {
    FaFacebook,
    FaTwitter,
    FaLinkedin,
    FaInstagram,
} from 'react-icons/fa';

const featuredJobs = [
    { id: 1, title: 'Senior Frontend Developer', company: 'Google', location: 'Bangalore, India', salary: '₹25,00,000/yr', initial: 'G', color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'Product Manager', company: 'Microsoft', location: 'Hyderabad, India', salary: '₹30,00,000/yr', initial: 'M', color: 'from-green-500 to-emerald-500' },
    { id: 3, title: 'Data Scientist', company: 'Amazon', location: 'Mumbai, India', salary: '₹22,00,000/yr', initial: 'A', color: 'from-orange-500 to-amber-500' },
    { id: 4, title: 'UI/UX Designer', company: 'Adobe', location: 'Noida, India', salary: '₹18,00,000/yr', initial: 'A', color: 'from-red-500 to-pink-500' },
    { id: 5, title: 'Backend Engineer', company: 'Flipkart', location: 'Bangalore, India', salary: '₹20,00,000/yr', initial: 'F', color: 'from-yellow-500 to-orange-500' },
    { id: 6, title: 'DevOps Engineer', company: 'Netflix', location: 'Remote', salary: '₹28,00,000/yr', initial: 'N', color: 'from-red-600 to-red-400' },
];

const categories = [
    { name: 'Information Technology', count: '2,400+', icon: <HiCode size={28} />, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10' },
    { name: 'Marketing', count: '1,200+', icon: <HiTrendingUp size={28} />, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-500/10' },
    { name: 'Finance', count: '800+', icon: <HiCurrencyDollar size={28} />, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { name: 'Healthcare', count: '1,500+', icon: <HiHeart size={28} />, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10' },
    { name: 'Education', count: '600+', icon: <HiAcademicCap size={28} />, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { name: 'Engineering', count: '1,800+', icon: <HiDesktopComputer size={28} />, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
    { name: 'Design', count: '900+', icon: <HiColorSwatch size={28} />, color: 'text-pink-600 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-500/10' },
    { name: 'Sales', count: '1,100+', icon: <HiStar size={28} />, color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-500/10' },
];

const testimonials = [
    { name: 'Priya Sharma', role: 'Software Engineer at Google', text: 'CareerConnect helped me land my dream job within 2 weeks. The platform is incredibly intuitive!', avatar: 'PS' },
    { name: 'Rahul Verma', role: 'Product Manager at Flipkart', text: 'The best job portal I\'ve used. Clean interface and quality job listings make all the difference.', avatar: 'RV' },
    { name: 'Ananya Patel', role: 'UX Designer at Adobe', text: 'From applying to getting hired — the whole process was seamless. Highly recommend CareerConnect!', avatar: 'AP' },
];

export default function HomePage() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-white dark:bg-surface-950">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 dark:bg-primary-500/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary-100/40 to-purple-100/40 dark:from-primary-500/5 dark:to-purple-500/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                    <div className="animate-fade-in">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6 border border-primary-200 dark:border-primary-500/20">
                            🚀 #1 Job Portal for Professionals
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-surface-900 dark:text-white leading-tight mt-4 mb-6">
                            Find Your{' '}
                            <span className="gradient-text">Dream Job</span>
                            <br />Today
                        </h1>
                        <p className="text-lg md:text-xl text-surface-500 dark:text-surface-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Connect with top companies and discover opportunities that match your skills.
                            Join thousands of professionals who found their perfect role through CareerConnect.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to={user ? '/jobs' : '/register'} className="btn-primary text-base px-8 py-4 shadow-lg shadow-primary-500/25">
                                Browse Jobs <HiArrowRight size={18} />
                            </Link>
                            <Link to={user ? '/post-job' : '/register'} className="btn-secondary text-base px-8 py-4">
                                Post a Job
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <div>
                            <p className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">10K+</p>
                            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Jobs Posted</p>
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">5K+</p>
                            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Companies</p>
                        </div>
                        <div>
                            <p className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">50K+</p>
                            <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">Hired</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SEARCH BAR SECTION ===== */}
            <section className="relative -mt-8 z-20 px-4 mb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="glass-card p-3 md:p-4 flex flex-col md:flex-row gap-3 shadow-glass-lg">
                        <div className="relative flex-1">
                            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={20} />
                            <input
                                type="text"
                                placeholder="Job title, keyword, or company"
                                className="input-field py-3.5"
                                style={{ paddingLeft: '2.75rem' }}
                            />
                        </div>
                        <div className="relative flex-1">
                            <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" size={20} />
                            <input
                                type="text"
                                placeholder="City, state, or remote"
                                className="input-field py-3.5"
                                style={{ paddingLeft: '2.75rem' }}
                            />
                        </div>
                        <button className="btn-primary px-8 py-3.5 whitespace-nowrap">
                            <HiSearch size={18} /> Search Jobs
                        </button>
                    </div>
                </div>
            </section>

            {/* ===== FEATURED JOBS SECTION ===== */}
            <section className="section-padding bg-surface-50 dark:bg-surface-900/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-3">Featured Jobs</h2>
                        <p className="text-surface-500 dark:text-surface-400 max-w-xl mx-auto">Handpicked opportunities from top companies looking for talents like you</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {featuredJobs.map((job) => (
                            <div key={job.id} className="glass-card hover-lift p-6 group cursor-pointer">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                                        {job.initial}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-surface-900 dark:text-surface-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                            {job.title}
                                        </h3>
                                        <p className="text-sm text-surface-500 dark:text-surface-400">{job.company}</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="text-xs font-medium bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg flex items-center gap-1">
                                        <HiLocationMarker size={12} /> {job.location}
                                    </span>
                                    <span className="text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg">
                                        {job.salary}
                                    </span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-surface-100 dark:border-surface-700/50">
                                    <Link to={user ? '/jobs' : '/login'} className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Apply Now <HiChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link to={user ? '/jobs' : '/register'} className="btn-secondary px-8 py-3">
                            View All Jobs <HiArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== CATEGORIES SECTION ===== */}
            <section className="section-padding">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-3">Browse by Category</h2>
                        <p className="text-surface-500 dark:text-surface-400 max-w-xl mx-auto">Explore opportunities across various industries and find your niche</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map((cat) => (
                            <div key={cat.name} className="glass-card hover-lift p-5 text-center cursor-pointer group">
                                <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110`}>
                                    {cat.icon}
                                </div>
                                <h3 className="font-semibold text-sm text-surface-800 dark:text-surface-200 mb-1">{cat.name}</h3>
                                <p className="text-xs text-surface-400 dark:text-surface-500">{cat.count} jobs</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TESTIMONIALS SECTION ===== */}
            <section className="section-padding bg-surface-50 dark:bg-surface-900/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white mb-3">What People Say</h2>
                        <p className="text-surface-500 dark:text-surface-400 max-w-xl mx-auto">Real stories from professionals who transformed their careers</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div key={i} className="glass-card p-6 hover-lift">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, si) => (
                                        <HiStar key={si} className="text-amber-400" size={18} />
                                    ))}
                                </div>
                                <p className="text-surface-600 dark:text-surface-300 leading-relaxed mb-6 text-sm">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-surface-900 dark:text-surface-100">{t.name}</p>
                                        <p className="text-xs text-surface-500 dark:text-surface-400">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="section-padding">
                <div className="max-w-4xl mx-auto">
                    <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent)]" />
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Take the Next Step?</h2>
                            <p className="text-primary-100 max-w-xl mx-auto mb-8 text-lg">Join CareerConnect today and unlock access to thousands of premium job listings.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-all shadow-lg">
                                    Get Started Free <HiArrowRight size={18} />
                                </Link>
                                <Link to="/login" className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="bg-surface-900 dark:bg-surface-950 text-surface-300 pt-16 pb-8">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <div className="flex items-center gap-2.5 mb-4">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-bold text-sm">CC</div>
                                <span className="text-lg font-bold text-white">CareerConnect</span>
                            </div>
                            <p className="text-sm text-surface-400 leading-relaxed mb-5">Your gateway to top jobs and internships. Connect, apply, and grow your career.</p>
                            <div className="flex items-center gap-3">
                                <a href="#" className="w-9 h-9 rounded-lg bg-surface-800 flex items-center justify-center text-surface-400 hover:text-primary-400 hover:bg-surface-700 transition-all">
                                    <FaFacebook size={16} />
                                </a>
                                <a href="#" className="w-9 h-9 rounded-lg bg-surface-800 flex items-center justify-center text-surface-400 hover:text-primary-400 hover:bg-surface-700 transition-all">
                                    <FaTwitter size={16} />
                                </a>
                                <a href="https://www.linkedin.com/in/pratik-raj-223997280/" className="w-9 h-9 rounded-lg bg-surface-800 flex items-center justify-center text-surface-400 hover:text-primary-400 hover:bg-surface-700 transition-all">
                                    <FaLinkedin size={16} />
                                </a>
                                <a href="#" className="w-9 h-9 rounded-lg bg-surface-800 flex items-center justify-center text-surface-400 hover:text-primary-400 hover:bg-surface-700 transition-all">
                                    <FaInstagram size={16} />
                                </a>
                            </div>
                        </div>

                        {/* For Job Seekers */}
                        <div>
                            <h4 className="font-semibold text-white text-sm mb-4">For Job Seekers</h4>
                            <ul className="space-y-2.5 text-sm">
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Browse Jobs</a></li>
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Companies</a></li>
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Career Advice</a></li>
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Resume Builder</a></li>
                            </ul>
                        </div>

                        {/* For Employers */}
                        <div>
                            <h4 className="font-semibold text-white text-sm mb-4">For Employers</h4>
                            <ul className="space-y-2.5 text-sm">
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Post a Job</a></li>
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Browse Candidates</a></li>
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-primary-400 transition-colors">Hiring Solutions</a></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="font-semibold text-white text-sm mb-4">Stay Updated</h4>
                            <p className="text-sm text-surface-400 mb-3">Get the latest job alerts delivered to your inbox.</p>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" size={16} />
                                    <input
                                        type="email"
                                        placeholder="Your email"
                                        className="w-full pl-9 pr-3 py-2.5 bg-surface-800 border border-surface-700 rounded-lg text-sm text-surface-200 placeholder-surface-500 focus:outline-none focus:border-primary-500 transition"
                                    />
                                </div>
                                <button className="px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm font-medium">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-surface-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-surface-500">© 2026 CareerConnect. All rights reserved.</p>
                        <div className="flex items-center gap-6 text-xs text-surface-500">
                            <a href="#" className="hover:text-surface-300 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-surface-300 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-surface-300 transition-colors">Contact Us</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
