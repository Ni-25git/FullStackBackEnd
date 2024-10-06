const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extract Bearer token

        if (!token) {
            return res.status(401).json({ msg: 'Please provide a token first' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decoded || !decoded.user || !decoded.user._id) {
            return res.status(402).json({ msg: 'Token not verified' });
        }

        const user = await UserModel.findById(decoded.user._id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        req.user = { id: user._id, role: user.role };
        console.log('Authenticated User:', user.role);
        next();
    } catch (error) {
        res.status(501).json({ msg: error.message });
    }
};

module.exports = authMiddleware;
