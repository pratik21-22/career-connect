const Application = require('../models/Application');
const Job = require('../models/Job');

/**
 * @desc    Apply for a job (student only)
 * @route   POST /api/applications/:jobId
 * @access  Private (student)
 */
exports.applyForJob = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        // Verify the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if already applied
        const existingApplication = await Application.findOne({
            jobId,
            studentId: req.user._id,
        });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const application = await Application.create({
            jobId,
            studentId: req.user._id,
        });

        res.status(201).json({ application, message: 'Application submitted successfully' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all applications by the logged-in student
 * @route   GET /api/applications/my
 * @access  Private (student)
 */
exports.getMyApplications = async (req, res, next) => {
    try {
        const applications = await Application.find({ studentId: req.user._id })
            .populate({
                path: 'jobId',
                populate: { path: 'createdBy', select: 'name email' },
            })
            .sort({ createdAt: -1 });

        res.json({ applications });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all applicants for a specific job (recruiter only)
 * @route   GET /api/applications/job/:jobId
 * @access  Private (recruiter)
 */
exports.getJobApplicants = async (req, res, next) => {
    try {
        const { jobId } = req.params;

        // Verify the recruiter owns this job
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view applicants for this job' });
        }

        const applications = await Application.find({ jobId })
            .populate('studentId', 'name email skills bio resumeLink')
            .sort({ createdAt: -1 });

        res.json({ applications });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update application status (recruiter only)
 * @route   PUT /api/applications/:id
 * @access  Private (recruiter)
 */
exports.updateApplicationStatus = async (req, res, next) => {
    try {
        const { status } = req.body;

        if (!['pending', 'accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const application = await Application.findById(req.params.id).populate('jobId');
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Verify the recruiter owns the job this application belongs to
        if (application.jobId.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this application' });
        }

        application.status = status;
        await application.save();

        res.json({ application, message: `Application ${status}` });
    } catch (error) {
        next(error);
    }
};
