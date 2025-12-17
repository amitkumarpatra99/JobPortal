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
        const { name, email } = req.body;
        const profilePhoto = req.file ? `uploads/${req.file.filename}` : undefined;

        const userFields = {};
        if (name) userFields.name = name;
        if (email) userFields.email = email;
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
