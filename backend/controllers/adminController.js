const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

/**
 * @desc    Get admin dashboard statistics
 * @route   GET /api/admin/stats
 * @access  Private (admin)
 */
exports.getStats = async (req, res, next) => {
    try {
        const [totalUsers, totalJobs, totalApplications] = await Promise.all([
            User.countDocuments(),
            Job.countDocuments(),
            Application.countDocuments(),
        ]);

        res.json({ totalUsers, totalJobs, totalApplications });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private (admin)
 */
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json({ users });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a user
 * @route   DELETE /api/admin/users/:id
 * @access  Private (admin)
 */
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent deleting yourself
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot delete yourself' });
        }

        await user.deleteOne();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all jobs (admin view)
 * @route   GET /api/admin/jobs
 * @access  Private (admin)
 */
exports.getAllJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });
        res.json({ jobs });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a job (admin can delete any job)
 * @route   DELETE /api/admin/jobs/:id
 * @access  Private (admin)
 */
exports.deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Also delete all applications linked to this job
        await Application.deleteMany({ jobId: job._id });
        await job.deleteOne();

        res.json({ message: 'Job and related applications deleted successfully' });
    } catch (error) {
        next(error);
    }
};
