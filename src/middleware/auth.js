const jwt = require('jsonwebtoken')
const secretKey =process.env.TOKEN_KEY

function authenticateToken(req, res, next) {
    console.log(req.header('Authorization'),'req, res, next')
    // Get the token from the request headers
    const token =  !!req?.header('Authorization') ? req.header('Authorization').split(' ')[1] : null;

    // Check if the token is missing
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        // Attach the decoded user information to the request object for later use
        req.user = decoded;

        // Continue with the next middleware or route handler
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Authentication token is invalid' });
    }
}

module.exports = authenticateToken;
