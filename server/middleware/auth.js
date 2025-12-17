const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');
    console.log('--- Auth Middleware ---');
    console.log('Token Header:', token ? 'Found' : 'Missing');

    // Check if not token
    if (!token) {
        console.log('Auth failed: No token');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decoded:', decoded);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Auth error:', err.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};
