const express = require('express');
const router = express.Router();
const {
  createProject,
  getAllProjects,
  getProjectById,
  getFeaturedProjects,
  updateProject,
  deleteProject,
  searchProjects
} = require('../controllers/projectController');

// Routes publiques
router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/search', searchProjects);
router.get('/:id', getProjectById);

// Routes admin (nécessitent une authentification)
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

module.exports = router;
