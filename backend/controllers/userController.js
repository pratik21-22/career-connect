const User = require('../models/User');
const { cloudinary } = require('../config/cloudinary');

/**
 * @desc    Get own profile
 * @route   GET /api/users/profile
 * @access  Private
 */
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({ user });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update own profile (bio, skills, resumeLink, name)
 * @route   PUT /api/users/profile
 * @access  Private
 */
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, bio, skills, resumeLink } = req.body;

        const updateFields = {};
        if (name !== undefined) updateFields.name = name;
        if (bio !== undefined) updateFields.bio = bio;
        if (skills !== undefined) updateFields.skills = skills;
        if (resumeLink !== undefined) updateFields.resumeLink = resumeLink;

        const user = await User.findByIdAndUpdate(req.user._id, updateFields, {
            new: true,
            runValidators: true,
        });

        res.json({ user });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Upload resume via Cloudinary
 * @route   POST /api/users/resume
 * @access  Private (student)
 */
exports.uploadResume = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { resumeLink: req.file.path },
            { new: true }
        );

        res.json({ resumeLink: user.resumeLink, message: 'Resume uploaded successfully' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Upload profile image via Cloudinary
 * @route   POST /api/users/profile-image
 * @access  Private
 */
exports.uploadProfileImage = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const user = await User.findById(req.user._id);

        // Delete old image from Cloudinary if it exists
        if (user.profileImage) {
            try {
                const parts = user.profileImage.split('/');
                const folderAndFile = parts.slice(-2).join('/'); // e.g. careerconnect_avatars/filename
                const publicId = folderAndFile.split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.error('Failed to delete old avatar:', err.message);
            }
        }

        user.profileImage = req.file.path;
        await user.save();

        res.json({ profileImage: user.profileImage, message: 'Profile image uploaded' });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Remove profile image
 * @route   DELETE /api/users/profile-image
 * @access  Private
 */
exports.removeProfileImage = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user.profileImage) {
            try {
                const parts = user.profileImage.split('/');
                const folderAndFile = parts.slice(-2).join('/');
                const publicId = folderAndFile.split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.error('Failed to delete avatar:', err.message);
            }
        }

        user.profileImage = '';
        await user.save();

        res.json({ message: 'Profile image removed' });
    } catch (error) {
        next(error);
    }
};
