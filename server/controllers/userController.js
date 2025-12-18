const User = require('../models/User');

// Get Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update Profile & Photo
exports.updateProfile = async (req, res) => {
    try {
        const { name, email, bio, skills, experience, education } = req.body;
        const profilePhoto = req.file ? `uploads/${req.file.filename}` : undefined;

        const userFields = {};
        if (name) userFields.name = name;
        if (email) userFields.email = email;
        if (bio) userFields.bio = bio;
        if (skills) {
            userFields.skills = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());
        }

        try {
            if (experience) userFields.experience = typeof experience === 'string' ? JSON.parse(experience) : experience;
            if (education) userFields.education = typeof education === 'string' ? JSON.parse(education) : education;
        } catch (e) {
            console.error('JSON Parse Error:', e);
            return res.status(400).json({ message: 'Invalid data format for experience or education' });
        }

        if (profilePhoto) userFields.profilePhoto = profilePhoto;

        let user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: userFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
