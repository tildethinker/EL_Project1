// Handle authentication-related requests

//All controllers rely on authenticated user information (req.user) provided by the passport middleware.
// authController generates JWT tokens upon successful login/registration.

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const config = require('../config/config');

// Register user
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    const user = result.rows[0];

    // Generate a JWT
    const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION });

    res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    // Check if user exists and the password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user.id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRATION });

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
};

module.exports = { register, login };
