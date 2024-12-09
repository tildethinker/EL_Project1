// Handle project creation, management

//Controllers interact with the PostgreSQL database using the pool object from db.js.

const { pool } = require('../config/db');

// Create a new project
const createProject = async (req, res) => {
  const { title, description, skillsRequired, privacy } = req.body;
  const userId = req.user.id; // User ID extracted from authenticated JWT token

  try {
    const result = await pool.query(
      'INSERT INTO projects (title, description, skills_required, privacy, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, skillsRequired, privacy, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating project' });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE privacy = $1 OR user_id = $2', ['public', req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
};

// Get a single project
const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching project' });
  }
};

// Update a project
const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, description, skillsRequired, privacy } = req.body;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'UPDATE projects SET title = $1, description = $2, skills_required = $3, privacy = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
      [title, description, skillsRequired, privacy, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: 'You do not have permission to update this project' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating project' });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query('DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);

    if (result.rows.length === 0) {
      return res.status(403).json({ error: 'You do not have permission to delete this project' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting project' });
  }
};

module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject };

