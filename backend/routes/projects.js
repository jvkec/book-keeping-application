// routes/projects.js, routes/expenses.js, routes/invoices.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Routes for /api/projects
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProject);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

// Get projects by client
router.get('/client/:clientId', projectController.getClientProjects);

module.exports = router;