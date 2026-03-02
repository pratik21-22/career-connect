const express = require('express');
const {
    getStats,
    getAllUsers,
    deleteUser,
    getAllJobs,
    deleteJob,
} = require('../controllers/adminController');
const protect = require('../middleware/auth');
const authorize = require('../middleware/role');

const router = express.Router();

// All admin routes require authentication + admin role
router.use(protect, authorize('admin'));

// @route   GET    /api/admin/stats
router.get('/stats', getStats);

// @route   GET    /api/admin/users
router.get('/users', getAllUsers);

// @route   DELETE /api/admin/users/:id
router.delete('/users/:id', deleteUser);

// @route   GET    /api/admin/jobs
router.get('/jobs', getAllJobs);

// @route   DELETE /api/admin/jobs/:id
router.delete('/jobs/:id', deleteJob);

module.exports = router;
