const express = require('express');
const {
    applyForJob,
    getMyApplications,
    getJobApplicants,
    updateApplicationStatus,
} = require('../controllers/applicationController');
const protect = require('../middleware/auth');
const authorize = require('../middleware/role');

const router = express.Router();

// @route   POST /api/applications/:jobId   — student: apply
router.post('/:jobId', protect, authorize('student'), applyForJob);

// @route   GET  /api/applications/my       — student: own applications
router.get('/my', protect, authorize('student'), getMyApplications);

// @route   GET  /api/applications/job/:jobId — recruiter: applicants for a job
router.get('/job/:jobId', protect, authorize('recruiter'), getJobApplicants);

// @route   PUT  /api/applications/:id      — recruiter: update status
router.put('/:id', protect, authorize('recruiter'), updateApplicationStatus);

module.exports = router;
