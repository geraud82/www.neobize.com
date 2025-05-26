const { Project } = require('../models');
const { Op } = require('sequelize');

// Créer un nouveau projet
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      status,
      client,
      startDate,
      endDate,
      budget,
      technologies,
      images,
      featured,
      published
    } = req.body;

    // Validation des données
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Le titre, la description et la catégorie sont obligatoires'
      });
    }

    const project = await Project.create({
      title,
      description,
      category,
      status,
      client,
      startDate,
      endDate,
      budget,
      technologies,
      images,
      featured,
      published
    });

    res.status(201).json({
      success: true,
      message: 'Projet créé avec succès',
      data: project
    });

  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Récupérer tous les projets
const getAllProjects = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status,
      featured,
      published = true
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = { published: published === 'true' };

    if (category) whereClause.category = category;
    if (status) whereClause.status = status;
    if (featured !== undefined) whereClause.featured = featured === 'true';

    const projects = await Project.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: projects.rows,
      pagination: {
        total: projects.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(projects.count / limit)
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Récupérer un projet par ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }

    res.json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Récupérer les projets en vedette
const getFeaturedProjects = async (req, res) => {
  try {
    const { limit = 6 } = req.query;

    const projects = await Project.findAll({
      where: {
        featured: true,
        published: true
      },
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: projects
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des projets en vedette:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Mettre à jour un projet
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }

    await project.update(updateData);

    res.json({
      success: true,
      message: 'Projet mis à jour avec succès',
      data: project
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Supprimer un projet
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Projet non trouvé'
      });
    }

    await project.destroy();

    res.json({
      success: true,
      message: 'Projet supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Rechercher des projets
const searchProjects = async (req, res) => {
  try {
    const { q, category, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Le terme de recherche est requis'
      });
    }

    const whereClause = {
      published: true,
      [Op.or]: [
        { title: { [Op.iLike]: `%${q}%` } },
        { description: { [Op.iLike]: `%${q}%` } },
        { client: { [Op.iLike]: `%${q}%` } }
      ]
    };

    if (category) {
      whereClause.category = category;
    }

    const projects = await Project.findAll({
      where: whereClause,
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: projects,
      count: projects.length
    });

  } catch (error) {
    console.error('Erreur lors de la recherche de projets:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  getFeaturedProjects,
  updateProject,
  deleteProject,
  searchProjects
};
