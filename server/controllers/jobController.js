const Job = require('../models/Job');
const Application = require('../models/Application');

// Create a Job
exports.createJob = async (req, res) => {
    try {
        const { title, company, location, description, salary, type } = req.body;

        const newJob = new Job({
            title,
            company,
            location,
            description,
            salary,
            type,
            postedBy: req.user.id
        });

        const job = await newJob.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
    try {
        const { search, type } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        if (type) {
            query.type = type;
        }

        const jobs = await Job.find(query).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update Job
exports.updateJob = async (req, res) => {
    try {
        const { title, company, location, description, salary, type } = req.body;

        let job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // Make sure user owns the job
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        job = await Job.findByIdAndUpdate(
            req.params.id,
            { $set: { title, company, location, description, salary, type } },
            { new: true }
        );

        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete Job
exports.deleteJob = async (req, res) => {
    try {
        let job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // Make sure user owns the job
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Apply for Job
exports.applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // Check if already applied
        const existingApplication = await Application.findOne({
            job: req.params.id,
            applicant: req.user.id
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'Already applied for this job' });
        }

        const resume = req.file ? `uploads/${req.file.filename}` : '';

        const newApplication = new Application({
            job: req.params.id,
            applicant: req.user.id,
            resume
        });

        await newApplication.save();
        res.json(newApplication);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update Application Status
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        // Check valid status
        if (!['applied', 'reviewed', 'accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const application = await Application.findById(req.params.id).populate('job');
        if (!application) return res.status(404).json({ message: 'Application not found' });

        // Verify Employer owns the job
        if (application.job.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        application.status = status;
        await application.save();

        res.json(application);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get Job Applicants
exports.getJobApplicants = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // Make sure user owns the job
        if (job.postedBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const applicants = await Application.find({ job: req.params.id })
            .populate('applicant', 'name email profilePhoto')
            .sort({ appliedAt: -1 });

        res.json(applicants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
