const { Article } = require('../models');
const { Op } = require('sequelize');

// Obtenir tous les articles publiés avec pagination et filtres
const getPublishedArticles = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      featured,
      sortBy = 'publishedAt',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {
      status: 'published',
      publishedAt: {
        [Op.lte]: new Date()
      }
    };

    // Filtrer par catégorie
    if (category && category !== 'all') {
      whereClause.category = category;
    }

    // Filtrer par articles en vedette
    if (featured === 'true') {
      whereClause.featured = true;
    }

    // Recherche dans le titre, excerpt et contenu
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { excerpt: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows: articles } = await Article.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: {
        exclude: ['content'] // Exclure le contenu complet pour la liste
      }
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: {
        articles,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit),
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des articles',
      error: error.message
    });
  }
};

// Obtenir un article par son slug
const getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const article = await Article.findOne({
      where: {
        slug,
        status: 'published',
        publishedAt: {
          [Op.lte]: new Date()
        }
      }
    });

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    // Incrémenter le nombre de vues
    await article.incrementViews();

    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'article',
      error: error.message
    });
  }
};

// Obtenir les articles en vedette
const getFeaturedArticles = async (req, res) => {
  try {
    const { limit = 3 } = req.query;

    const articles = await Article.getFeatured(parseInt(limit));

    res.json({
      success: true,
      data: articles
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles en vedette:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des articles en vedette',
      error: error.message
    });
  }
};

// Obtenir les articles récents
const getRecentArticles = async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    const articles = await Article.getPublished({
      limit: parseInt(limit),
      attributes: ['id', 'title', 'slug', 'excerpt', 'featuredImage', 'publishedAt', 'readTime']
    });

    res.json({
      success: true,
      data: articles
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles récents:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des articles récents',
      error: error.message
    });
  }
};

// Obtenir les articles par catégorie
const getArticlesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;

    const { count, rows: articles } = await Article.findAndCountAll({
      where: {
        status: 'published',
        category,
        publishedAt: {
          [Op.lte]: new Date()
        }
      },
      order: [['publishedAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: {
        exclude: ['content']
      }
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: {
        articles,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit),
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles par catégorie:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des articles par catégorie',
      error: error.message
    });
  }
};

// Rechercher des articles
const searchArticles = async (req, res) => {
  try {
    const { q: query, page = 1, limit = 10 } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'La requête de recherche doit contenir au moins 2 caractères'
      });
    }

    const offset = (page - 1) * limit;

    const { count, rows: articles } = await Article.findAndCountAll({
      where: {
        status: 'published',
        publishedAt: {
          [Op.lte]: new Date()
        },
        [Op.or]: [
          { title: { [Op.like]: `%${query}%` } },
          { excerpt: { [Op.like]: `%${query}%` } },
          { content: { [Op.like]: `%${query}%` } }
        ]
      },
      order: [['publishedAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
      attributes: {
        exclude: ['content']
      }
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: {
        articles,
        query,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: count,
          itemsPerPage: parseInt(limit),
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Erreur lors de la recherche d\'articles:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la recherche d\'articles',
      error: error.message
    });
  }
};

// Obtenir les statistiques des articles
const getArticleStats = async (req, res) => {
  try {
    const totalArticles = await Article.count({
      where: {
        status: 'published',
        publishedAt: {
          [Op.lte]: new Date()
        }
      }
    });

    const totalViews = await Article.sum('views', {
      where: {
        status: 'published',
        publishedAt: {
          [Op.lte]: new Date()
        }
      }
    });

    const categoriesStats = await Article.findAll({
      attributes: [
        'category',
        [Article.sequelize.fn('COUNT', Article.sequelize.col('id')), 'count']
      ],
      where: {
        status: 'published',
        publishedAt: {
          [Op.lte]: new Date()
        }
      },
      group: ['category']
    });

    const featuredCount = await Article.count({
      where: {
        status: 'published',
        featured: true,
        publishedAt: {
          [Op.lte]: new Date()
        }
      }
    });

    res.json({
      success: true,
      data: {
        totalArticles,
        totalViews: totalViews || 0,
        featuredCount,
        categoriesStats
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques',
      error: error.message
    });
  }
};

// CRUD Operations pour l'administration

// Créer un nouvel article
const createArticle = async (req, res) => {
  try {
    const articleData = req.body;

    // Validation des données requises
    if (!articleData.title || !articleData.excerpt || !articleData.content || !articleData.author) {
      return res.status(400).json({
        success: false,
        message: 'Les champs titre, extrait, contenu et auteur sont requis'
      });
    }

    const article = await Article.create(articleData);

    res.status(201).json({
      success: true,
      message: 'Article créé avec succès',
      data: article
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'article',
      error: error.message
    });
  }
};

// Mettre à jour un article
const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    await article.update(updateData);

    res.json({
      success: true,
      message: 'Article mis à jour avec succès',
      data: article
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de l\'article',
      error: error.message
    });
  }
};

// Supprimer un article
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    await article.destroy();

    res.json({
      success: true,
      message: 'Article supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'article',
      error: error.message
    });
  }
};

// Publier un article
const publishArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    await article.update({
      status: 'published',
      publishedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Article publié avec succès',
      data: article
    });
  } catch (error) {
    console.error('Erreur lors de la publication de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la publication de l\'article',
      error: error.message
    });
  }
};

// Dépublier un article
const unpublishArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    await article.update({
      status: 'draft',
      publishedAt: null
    });

    res.json({
      success: true,
      message: 'Article dépublié avec succès',
      data: article
    });
  } catch (error) {
    console.error('Erreur lors de la dépublication de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la dépublication de l\'article',
      error: error.message
    });
  }
};

module.exports = {
  getPublishedArticles,
  getArticleBySlug,
  getFeaturedArticles,
  getRecentArticles,
  getArticlesByCategory,
  searchArticles,
  getArticleStats,
  createArticle,
  updateArticle,
  deleteArticle,
  publishArticle,
  unpublishArticle
};
