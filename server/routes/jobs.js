const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { createJob, getJobs, updateJob, deleteJob, applyForJob, getJobApplicants, updateApplicationStatus } = require('../controllers/jobController');

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', getJobs);

// @route   POST api/jobs
// @desc    Create a job
// @access  Private (Employer only)
router.post('/', auth, checkRole(['employer']), createJob);

// @route   PUT api/jobs/:id
// @desc    Update a job
// @access  Private (Employer only)
router.put('/:id', auth, checkRole(['employer']), updateJob);

// @route   DELETE api/jobs/:id
// @desc    Delete a job
// @access  Private (Employer only)
router.delete('/:id', auth, checkRole(['employer']), deleteJob);

const upload = require('../middleware/upload');

// @route   POST api/jobs/:id/apply
// @desc    Apply for a job
// @access  Private (Seeker only)
router.post('/:id/apply', auth, checkRole(['seeker']), upload, applyForJob);

// @route   PUT api/jobs/applications/:id/status
// @desc    Update application status
// @access  Private (Employer only)
router.put('/applications/:id/status', auth, checkRole(['employer']), updateApplicationStatus);

// @route   GET api/jobs/:id/applicants
// @desc    Get applicants for a job
// @access  Private (Employer only)
router.get('/:id/applicants', auth, checkRole(['employer']), getJobApplicants);

module.exports = router;
