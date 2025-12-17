const express = require('express');
const router = express.Router();
console.log('Loading users route file...');

router.use((req, res, next) => {
    console.log('User Router HIT:', req.method, req.url);
    next();
});

const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getProfile, updateProfile } = require('../controllers/userController');

router.get('/test', (req, res) => res.send('User Route Works'));

// @route   GET api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, getProfile);

// @route   PUT api/users/profile
// @desc    Update profile & Upload Photo
// @access  Private
router.put('/profile', auth, upload, updateProfile);

module.exports = router;
