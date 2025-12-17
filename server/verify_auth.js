const axios = require('axios');

async function testAuth() {
    try {
        const registerResponse = await axios.post('http://localhost:5000/api/auth/register', {
            name: 'Test Verify User',
            email: 'verify' + Date.now() + '@example.com',
            password: 'password123',
            role: 'seeker'
        });
        console.log('Register Success:', registerResponse.data);

        const loginResponse = await axios.post('http://localhost:5000/api/auth/login', {
            email: registerResponse.data.user.email,
            password: 'password123'
        });
        console.log('Login Success:', loginResponse.data);

    } catch (error) {
        if (error.response) {
            console.error('Error Response:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testAuth();
