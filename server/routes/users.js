const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getProfile, updateProfile } = require('../controllers/userController');

// @route   GET api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, getProfile);

// @route   PUT api/users/profile
// @desc    Update profile & Upload Photo
// @access  Private
router.put('/profile', auth, upload, updateProfile);

module.exports = router;
