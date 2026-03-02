const express = require('express');
const {
    getProfile,
    updateProfile,
    uploadResume,
    uploadProfileImage,
    removeProfileImage,
} = require('../controllers/userController');
const protect = require('../middleware/auth');
const { upload, uploadImage } = require('../config/cloudinary');

const router = express.Router();

// @route   GET  /api/users/profile
router.get('/profile', protect, getProfile);

// @route   PUT  /api/users/profile
router.put('/profile', protect, updateProfile);

// @route   POST /api/users/resume — upload resume to Cloudinary
router.post('/resume', protect, upload.single('resume'), uploadResume);

// @route   POST /api/users/profile-image — upload profile photo
router.post('/profile-image', protect, uploadImage.single('profileImage'), uploadProfileImage);

// @route   DELETE /api/users/profile-image — remove profile photo
router.delete('/profile-image', protect, removeProfileImage);

module.exports = router;
