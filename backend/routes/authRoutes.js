// Routes for login/signup

const express = require('express');
const { register, login } = require('../controllers/authController');
const { createProject, getProjects } = require('../controllers/projectController');
const authenticate = require('../middleware/authMiddleware');
const roleAuthorization = require('../middleware/roleMiddleware');

const router = express.Router();

// Authentication Routes
router.post('/register', register); // User registration route
router.post('/login', login);       // User login route

// Project Routes
router.post('/projects', authenticate, roleAuthorization(['User', 'Admin']), createProject); // Create a project (requires authentication and specific roles)
router.get('/projects', authenticate, getProjects);                                         // Fetch all projects (requires authentication)

module.exports = router;
