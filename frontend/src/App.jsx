import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';

// Public pages
import HomePage from './pages/HomePage';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Student pages
import Jobs from './pages/student/Jobs';
import JobDetail from './pages/student/JobDetail';
import MyApplications from './pages/student/MyApplications';
import Profile from './pages/student/Profile';

// Recruiter pages
import PostJob from './pages/recruiter/PostJob';
import EditJob from './pages/recruiter/EditJob';
import MyJobs from './pages/recruiter/MyJobs';
import Applicants from './pages/recruiter/Applicants';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageJobs from './pages/admin/ManageJobs';

/**
 * Dashboard layout wraps authenticated pages with Navbar + Sidebar.
 */
function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors">
            <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="pt-16 md:pl-64">
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function App() {
    const { user, loading } = useAuth();

    if (loading) return <Loader />;

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    className: '',
                    style: {
                        background: 'var(--bg-card)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '12px',
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                    },
                }}
            />

            <Routes>
                {/* Public homepage */}
                <Route path="/" element={
                    user
                        ? <Navigate to={
                            user.role === 'admin' ? '/admin/dashboard' :
                                user.role === 'recruiter' ? '/my-jobs' : '/jobs'
                        } replace />
                        : <HomePage />
                } />

                {/* Public auth routes */}
                <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />} />

                {/* Student routes */}
                <Route path="/jobs" element={
                    <ProtectedRoute roles={['student']}>
                        <DashboardLayout><Jobs /></DashboardLayout>
                    </ProtectedRoute>
                } />
                <Route path="/jobs/:id" element={
                    <ProtectedRoute roles={['student']}>
                        <DashboardLayout><JobDetail /></DashboardLayout>
                    </ProtectedRoute>
                } />
                <Route path="/my-applications" element={
                    <ProtectedRoute roles={['student']}>
                        <DashboardLayout><MyApplications /></DashboardLayout>
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute roles={['student', 'recruiter']}>
                        <DashboardLayout><Profile /></DashboardLayout>
                    </ProtectedRoute>
                } />

                {/* Recruiter routes */}
                <Route path="/post-job" element={
                    <ProtectedRoute roles={['recruiter']}>
                        <DashboardLayout><PostJob /></DashboardLayout>
                    </ProtectedRoute>
                } />
                <Route path="/edit-job/:id" element={
                    <ProtectedRoute roles={['recruiter']}>
                        <DashboardLayout><EditJob /></DashboardLayout>
                    </ProtectedRoute>
                } />
                <Route path="/my-jobs" element={
                    <ProtectedRoute roles={['recruiter']}>
                        <DashboardLayout><MyJobs /></DashboardLayout>
                    </ProtectedRoute>
                } />
                <Route path="/applicants/:jobId" element={
                    <ProtectedRoute roles={['recruiter']}>
                        <DashboardLayout><Applicants /></DashboardLayout>
                    </ProtectedRoute>
                } />

                {/* Admin routes */}
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute roles={['admin']}>
                        <DashboardLayout><Dashboard /></DashboardLayout>
                    </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                    <ProtectedRoute roles={['admin']}>
                        <DashboardLayout><ManageUsers /></DashboardLayout>
                    </ProtectedRoute>
                } />
                <Route path="/admin/jobs" element={
                    <ProtectedRoute roles={['admin']}>
                        <DashboardLayout><ManageJobs /></DashboardLayout>
                    </ProtectedRoute>
                } />

                {/* Default redirect */}
                <Route path="*" element={
                    user
                        ? <Navigate to={
                            user.role === 'admin' ? '/admin/dashboard' :
                                user.role === 'recruiter' ? '/my-jobs' : '/jobs'
                        } replace />
                        : <Navigate to="/" replace />
                } />
            </Routes>
        </>
    );
}
