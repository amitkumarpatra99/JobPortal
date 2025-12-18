const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

async function verifyEnhancements() {
    try {
        console.log('1. Registering a test user...');
        const uniqueSuffix = Date.now();
        const userPayload = {
            name: `Test User ${uniqueSuffix}`,
            email: `test${uniqueSuffix}@example.com`,
            password: 'password123',
            role: 'seeker'
        };

        const registerRes = await axios.post(`${API_URL}/auth/register`, userPayload);
        const token = registerRes.data.token;
        console.log('   User registered. Token received.');

        const config = {
            headers: {
                'x-auth-token': token
            }
        };

        console.log('2. Updating Profile with new fields (Bio, Skills, Experience)...');
        const updatePayload = {
            bio: 'I am a passionate developer.',
            skills: ['JavaScript', 'Node.js', 'React'],
            experience: JSON.stringify([{
                title: 'Junior Dev',
                company: 'Tech Corp',
                from: '2022-01-01',
                to: '2023-01-01',
                current: false,
                description: 'Worked on backend'
            }])
        };

        const updateRes = await axios.put(`${API_URL}/users/profile`, updatePayload, config);
        console.log('   Profile updated.');

        console.log('3. Verifying Profile Data...');
        const profileRes = await axios.get(`${API_URL}/users/profile`, config);
        const profile = profileRes.data;

        if (profile.bio === updatePayload.bio &&
            profile.skills.includes('Node.js') &&
            profile.experience[0].title === 'Junior Dev') {
            console.log('   SUCCESS: Profile fields verified correctly.');
        } else {
            console.error('   FAILURE: Profile fields did not match expected values.');
            console.log('   Received:', profile);
        }

        console.log('4. Testing Job Search (requires employer account, skipping creation, searching existing jobs if any)...');
        // Just checking if the search endpoint returns 200/OK and array
        const searchRes = await axios.get(`${API_URL}/jobs?search=dev`, config);
        if (Array.isArray(searchRes.data)) {
            console.log(`   SUCCESS: Job search ran successfully. Found ${searchRes.data.length} jobs matching "dev".`);
        } else {
            console.log('   FAILURE: Job search did not return an array.');
        }

    } catch (error) {
        console.error('VERIFICATION FAILED:', error.response ? error.response.data : error.message);
    }
}

verifyEnhancements();
