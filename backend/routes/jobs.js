const express = require('express');
const { body } = require('express-validator');
const {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob,
    getMyJobs,
} = require('../controllers/jobController');
const protect = require('../middleware/auth');
const authorize = require('../middleware/role');

const router = express.Router();

// Validation rules for creating / updating a job
const jobValidation = [
    body('title', 'Title is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('company', 'Company is required').notEmpty(),
    body('location', 'Location is required').notEmpty(),
];

// @route   GET  /api/jobs        — public: browse & search
router.get('/', getJobs);

// @route   GET  /api/jobs/my     — recruiter: own listings (must be BEFORE /:id)
router.get('/my', protect, authorize('recruiter'), getMyJobs);

// @route   GET  /api/jobs/:id    — public: single job detail
router.get('/:id', getJob);

// @route   POST /api/jobs        — recruiter: create
router.post('/', protect, authorize('recruiter'), jobValidation, createJob);

// @route   PUT  /api/jobs/:id    — recruiter: update own job
router.put('/:id', protect, authorize('recruiter'), updateJob);

// @route   DELETE /api/jobs/:id  — recruiter: delete own job
router.delete('/:id', protect, authorize('recruiter'), deleteJob);

module.exports = router;
