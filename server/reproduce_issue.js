const axios = require('axios');
const FormData = require('form-data'); // Need this for Node environment simulation

const API_URL = 'http://localhost:5001/api';

async function reproduceProfileError() {
    try {
        // 1. Login/Register to get token
        const unique = Date.now();
        const user = {
            name: `Debug User ${unique}`,
            email: `debug${unique}@test.com`,
            password: 'password123',
            role: 'seeker'
        };

        console.log('Registering...');
        const regRes = await axios.post(`${API_URL}/auth/register`, user);
        const token = regRes.data.token;
        console.log('Registered. Token received.');

        // 2. Simulate Frontend Update
        const form = new FormData();
        form.append('name', 'Updated Name');
        form.append('email', user.email);
        form.append('bio', 'Updated Bio');

        // Simulating skills array
        const skills = ['React', 'Node'];
        skills.forEach(s => form.append('skills', s));

        // Simulating JSON strings for objects
        const experience = [{
            title: 'Dev',
            company: 'Test Co',
            from: '2023-01-01',
            to: '2024-01-01',
            current: false,
            description: 'Worked here'
        }];
        form.append('experience', JSON.stringify(experience));

        const education = [];
        form.append('education', JSON.stringify(education));

        // Note: Not appending file, acting like user just updated text

        console.log('Sending Update Request with FormData...');
        const config = {
            headers: {
                'x-auth-token': token,
                ...form.getHeaders()
            }
        };

        const updateRes = await axios.put(`${API_URL}/users/profile`, form, config);
        console.log('Update Success!', updateRes.data);

        // 3. Negative Test: Invalid JSON
        console.log('Testing Invalid JSON...');
        const badForm = new FormData();
        badForm.append('experience', '{bad:json}'); // Invalid JSON

        try {
            await axios.put(`${API_URL}/users/profile`, badForm, config);
            console.error('Negative Test Failed: Should have returned error');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                console.log('Negative Test Passed: Received 400 as expected for invalid JSON');
            } else {
                console.error('Negative Test Failed: Unexpected error', err.message);
            }
        }

    } catch (err) {
        console.error('Update Failed!');
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', err.response.data);
        } else {
            console.error(err.message);
        }
    }
}

reproduceProfileError();
