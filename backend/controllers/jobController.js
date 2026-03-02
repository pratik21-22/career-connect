const { validationResult } = require('express-validator');
const Job = require('../models/Job');

/**
 * @desc    Create a new job posting
 * @route   POST /api/jobs
 * @access  Private (recruiter)
 */
exports.createJob = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()[0].msg });
        }

        const job = await Job.create({ ...req.body, createdBy: req.user._id });
        res.status(201).json({ job });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all jobs with search, filter & pagination
 * @route   GET /api/jobs
 * @access  Public
 */
exports.getJobs = async (req, res, next) => {
    try {
        const { search, location, company, page = 1, limit = 10 } = req.query;

        const filter = {};

        // Text search across title, company, location
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } },
            ];
        }

        if (location) {
            filter.location = { $regex: location, $options: 'i' };
        }

        if (company) {
            filter.company = { $regex: company, $options: 'i' };
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [jobs, total] = await Promise.all([
            Job.find(filter)
                .populate('createdBy', 'name email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Job.countDocuments(filter),
        ]);

        res.json({
            jobs,
            page: parseInt(page),
            totalPages: Math.ceil(total / parseInt(limit)),
            total,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single job by ID
 * @route   GET /api/jobs/:id
 * @access  Public
 */
exports.getJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id).populate('createdBy', 'name email');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ job });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update a job posting (only the recruiter who created it)
 * @route   PUT /api/jobs/:id
 * @access  Private (recruiter)
 */
exports.updateJob = async (req, res, next) => {
    try {
        let job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Ensure the recruiter owns this job
        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this job' });
        }

        job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.json({ job });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete a job posting (only the recruiter who created it)
 * @route   DELETE /api/jobs/:id
 * @access  Private (recruiter)
 */
exports.deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this job' });
        }

        await job.deleteOne();
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all jobs posted by the logged-in recruiter
 * @route   GET /api/jobs/my
 * @access  Private (recruiter)
 */
exports.getMyJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        res.json({ jobs });
    } catch (error) {
        next(error);
    }
};
