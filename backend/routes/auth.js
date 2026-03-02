const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/authController');
const protect = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
router.post(
    '/register',
    [
        body('name', 'Name is required').notEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        body('role', 'Role must be student, recruiter, or admin').isIn(['student', 'recruiter', 'admin']),
    ],
    register
);

// @route   POST /api/auth/login
router.post(
    '/login',
    [
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Password is required').notEmpty(),
    ],
    login
);

// @route   GET /api/auth/me
router.get('/me', protect, getMe);

module.exports = router;
