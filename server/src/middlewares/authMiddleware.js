import { verifyToken } from '../services/jwtService.js';

export const authMiddleware = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = verifyToken(token);

        // Attach the user info to the request object for further use
        req.user = decoded;

        next(); // Move on to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};