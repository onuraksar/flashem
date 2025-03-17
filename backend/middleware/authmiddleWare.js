const admin = require('../config/firebase');

// const verifyFirebaseToken = async (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         const decodedToken = await admin.auth().verifyIdToken(token);
//         req.user = decodedToken; // Attach user info to request
//         next();
//     } catch (error) {
//         return res.status(403).json({ message: 'Invalid or expired token' });
//     }
// };

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


module.exports = verifyFirebaseToken;
