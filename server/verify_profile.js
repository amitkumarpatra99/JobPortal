const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

async function verifyProfile() {
    const timestamp = Date.now();
    const user = {
        name: 'Profile Tester',
        email: `profile_${timestamp}@test.com`,
        password: 'password123',
        role: 'seeker'
    };

    try {
        // 1. Register
        console.log('1. Registering User...');
        const regRes = await axios.post('http://localhost:5001/api/auth/register', user);
        const token = regRes.data.token;
        console.log('   Success! Token received.');

        // 2. Create a dummy image
        const imagePath = path.join(__dirname, 'test_image.png');
        // Create a 1x1 pixel PNG (base64)
        const base64Image = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==';
        fs.writeFileSync(imagePath, Buffer.from(base64Image, 'base64'));

        // 3. Upload Profile Photo
        console.log('2. Uploading Profile Photo...');
        const formData = new FormData();
        formData.append('name', 'Updated Name');
        formData.append('email', user.email);
        formData.append('profilePhoto', fs.createReadStream(imagePath));

        const config = {
            headers: {
                'x-auth-token': token,
                ...formData.getHeaders()
            }
        };

        const updateRes = await axios.put('http://localhost:5001/api/users/profile', formData, config);
        console.log('   Upload Response:', updateRes.data);

        if (updateRes.data.profilePhoto && updateRes.data.profilePhoto.startsWith('uploads/')) {
            console.log('   Success! Profile photo updated.');
            console.log('VERIFICATION PASSED');
        } else {
            console.error('   FAILED: Profile photo URL missing or incorrect.');
        }

        // Cleanup
        fs.unlinkSync(imagePath);

    } catch (err) {
        console.error('VERIFICATION FAILED:', err.response ? err.response.data : err.message);
    }
}

verifyProfile();
