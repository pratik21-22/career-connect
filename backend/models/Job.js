const mongoose = require('mongoose');

/**
 * Job Schema
 * Each job is linked to the recruiter who created it via `createdBy`.
 */
const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Job title is required'],
            trim: true,
            maxlength: 150,
        },
        description: {
            type: String,
            required: [true, 'Job description is required'],
            maxlength: 5000,
        },
        company: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
            maxlength: 150,
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
            maxlength: 150,
        },
        salary: {
            type: String,
            default: 'Not disclosed',
            trim: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

// Text index for search functionality
jobSchema.index({ title: 'text', company: 'text', location: 'text' });

module.exports = mongoose.model('Job', jobSchema);
