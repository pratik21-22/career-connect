const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema
 * Supports three roles: student, recruiter, admin.
 * Password is automatically hashed before saving.
 */
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: 100,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
            select: false, // never return password by default
        },
        role: {
            type: String,
            enum: ['student', 'recruiter', 'admin'],
            default: 'student',
        },
        skills: {
            type: [String],
            default: [],
        },
        bio: {
            type: String,
            default: '',
            maxlength: 500,
        },
        resumeLink: {
            type: String,
            default: '',
        },
        profileImage: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
