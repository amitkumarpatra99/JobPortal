const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['seeker', 'employer'],
        default: 'seeker',
    },
    profilePhoto: {
        type: String, // Path to the image
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
