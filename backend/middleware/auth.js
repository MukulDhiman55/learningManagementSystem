const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate the user

const authenticateUser = async (req, res, next) => {
  // Get token from Authorization header
  const token = req.header('Authorization');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token provided, access denied.' });
  }

  // Remove the 'Bearer ' part of the token if it exists
  const tokenWithoutBearer = token.replace('Bearer ', '');

  try {
    // Verify token
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    
    // Attach the decoded token to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, send an error response
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

// Middleware to check if the user is an admin
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Permission denied, admins only.' });
  }
  next();
};

module.exports = { authenticateUser, authorizeAdmin };

