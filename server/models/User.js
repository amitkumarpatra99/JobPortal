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
    bio: {
        type: String,
        default: '',
    },
    skills: {
        type: [String],
        default: [],
    },
    experience: [{
        title: String,
        company: String,
        from: Date,
        to: Date,
        current: Boolean,
        description: String
    }],
    education: [{
        school: String,
        degree: String,
        fieldOfStudy: String,
        from: Date,
        to: Date,
        current: Boolean
    }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
