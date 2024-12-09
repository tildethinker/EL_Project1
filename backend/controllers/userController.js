// Handle user data, profile management

//projectController ensures that only project owners can update or delete their projects.

const { pool } = require('../config/db');

// Get user profile
const getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, email } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email',
      [username, email, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating user profile' });
  }
};

module.exports = { getUserProfile, updateUserProfile };
