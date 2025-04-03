import admin from '../config/firebase.js';

const verifyFirebaseToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    try {
        // Verify the token with Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Add user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default verifyFirebaseToken
