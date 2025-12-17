const Job = require('../models/Job');

const fs = require('fs');
const path = require('path');

// Create a Job
exports.createJob = async (req, res) => {
    const logParams = `Body: ${JSON.stringify(req.body)} | User: ${JSON.stringify(req.user)}\n`;
    fs.appendFileSync(path.join(__dirname, '../debug.log'), `[JobController] createJob called\n${logParams}`);

    try {
        const { title, company, location, description, salary, type } = req.body;

        if (!req.user) {
            console.error('Req.user is missing!');
            return res.status(401).json({ message: 'User not authenticated in controller' });
        }

        // Assuming req.user is set by auth middleware
        const newJob = new Job({
            title,
            company,
            location,
            description,
            salary,
            type,
            postedBy: req.user.id
        });

        console.log('Saving job...');
        const job = await newJob.save();
        console.log('Job saved:', job);
        res.json(job);
    } catch (err) {
        console.error('Error in createJob:', err.message);
        res.status(500).send('Server Error');
    }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
