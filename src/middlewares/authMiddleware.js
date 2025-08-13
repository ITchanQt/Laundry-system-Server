const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    // Check for token in different places
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1] || req.cookies.token;

    console.log('Auth Header:', authHeader); // Debug log
    console.log('Token:', token); // Debug log

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error); // Debug log
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;