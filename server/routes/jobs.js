const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createJob, getJobs } = require('../controllers/jobController');

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', getJobs);

// @route   POST api/jobs
// @desc    Create a job
// @access  Private
router.post('/', auth, createJob);

module.exports = router;
