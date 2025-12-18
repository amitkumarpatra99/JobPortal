const axios = require('axios');

async function verifyJobs() {
    const timestamp = Date.now();
    const employer = {
        name: 'Test Employer',
        email: `employer_${timestamp}@test.com`,
        password: 'password123',
        role: 'employer'
    };

    try {
        // 1. Register
        console.log('1. Registering Employer...');
        const regRes = await axios.post('http://localhost:5001/api/auth/register', employer);
        const token = regRes.data.token;
        console.log('   Success! Token received.');

        // 2. Post a Job
        console.log('2. Posting a Job...');
        const jobData = {
            title: `Software Engineer ${timestamp}`,
            company: 'Tech Corp',
            location: 'Remote',
            description: 'We are looking for a great developer.',
            salary: '$120k',
            type: 'Full-time'
        };

        const jobRes = await axios.post('http://localhost:5001/api/jobs', jobData, {
            headers: { 'x-auth-token': token }
        });
        console.log('   Success! Job ID:', jobRes.data._id);

        // 3. Get Jobs
        console.log('3. Fetching Jobs...');
        const getRes = await axios.get('http://localhost:5001/api/jobs');
        const foundJob = getRes.data.find(j => j._id === jobRes.data._id);

        if (foundJob) {
            console.log('   Success! Job found in list.');
            console.log('VERIFICATION PASSED');
        } else {
            console.error('   FAILED: Job not found in list.');
        }

    } catch (err) {
        console.error('VERIFICATION FAILED:', err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', err.response.data);
        } else if (err.request) {
            console.error('No response received');
        }
    }
}

verifyJobs();
