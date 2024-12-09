// JWT authentication check

/*
    Ensures that all protected routes require a valid JWT.
Attaches the authenticated user (req.user) to the request object for further use.

*/

// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const config = require('../config/config');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Fetch the user from the database
    const result = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [decoded.userId]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    req.user = user; // Attach the user to the request object
    next(); // Proceed to the next middleware or controller
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticate;
