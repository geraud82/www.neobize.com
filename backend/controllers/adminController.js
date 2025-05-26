const { Article } = require('../models');
const { Op } = require('sequelize');

// Fonction utilitaire pour générer un slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

// Obtenir tous les articles (admin) - incluant les brouillons
const getAllArticles = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      search,
      status,
      sortBy = 'createdAt',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {};

    // Filtrer par catégorie
    if (category && category !== 'all') {
      whereClause.category = category;
    }

    // Filtrer par statut
    if (status && status !== 'all') {
      whereClause.status = status;
    }

    // Recherche dans le titre, excerpt et contenu
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { excerpt: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
        { author: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows: articles } = await Article.findAndCountAll({
      where: whereClause,
      order: [[sortBy, sortOrder.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset)
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
    console.error('Erreur lors de la récupération des articles (admin):', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des articles',
      error: error.message
    });
  }
};

// Obtenir un article par ID (admin)
const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

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

    // Générer le slug automatiquement si non fourni
    if (!articleData.slug) {
      articleData.slug = generateSlug(articleData.title);
    }

    // Vérifier l'unicité du slug
    let baseSlug = articleData.slug;
    let counter = 1;
    let existingArticle = await Article.findOne({ where: { slug: articleData.slug } });
    
    while (existingArticle) {
      articleData.slug = `${baseSlug}-${counter}`;
      existingArticle = await Article.findOne({ where: { slug: articleData.slug } });
      counter++;
    }

    // Valeurs par défaut
    const finalArticleData = {
      ...articleData,
      status: articleData.status || 'draft',
      featured: articleData.featured || false,
      views: 0,
      tags: articleData.tags || [],
      category: articleData.category || 'general',
      gallery: articleData.gallery || []
    };

    // Gérer l'image à la une - permettre null ou URL valide uniquement
    if (articleData.featuredImage) {
      if (typeof articleData.featuredImage === 'string' && articleData.featuredImage.trim() !== '') {
        if (articleData.featuredImage.startsWith('http://') || articleData.featuredImage.startsWith('https://')) {
          finalArticleData.featuredImage = articleData.featuredImage;
        } else {
          finalArticleData.featuredImage = null;
        }
      } else {
        finalArticleData.featuredImage = null;
      }
    } else {
      finalArticleData.featuredImage = null;
    }

    const article = await Article.create(finalArticleData);

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

    // Si le titre change, régénérer le slug
    if (updateData.title && updateData.title !== article.title) {
      if (!updateData.slug) {
        updateData.slug = generateSlug(updateData.title);
      }
      
      // Vérifier l'unicité du slug (sauf pour l'article actuel)
      let baseSlug = updateData.slug;
      let counter = 1;
      let existingArticle = await Article.findOne({ 
        where: { 
          slug: updateData.slug,
          id: { [Op.ne]: id }
        } 
      });
      
      while (existingArticle) {
        updateData.slug = `${baseSlug}-${counter}`;
        existingArticle = await Article.findOne({ 
          where: { 
            slug: updateData.slug,
            id: { [Op.ne]: id }
          } 
        });
        counter++;
      }
    }

    // Gérer l'image à la une pour la mise à jour
    if (updateData.hasOwnProperty('featuredImage')) {
      if (updateData.featuredImage) {
        if (typeof updateData.featuredImage === 'string' && updateData.featuredImage.trim() !== '') {
          if (updateData.featuredImage.startsWith('http://') || updateData.featuredImage.startsWith('https://')) {
            // URL valide, on la garde
          } else {
            updateData.featuredImage = null;
          }
        } else {
          updateData.featuredImage = null;
        }
      } else {
        updateData.featuredImage = null;
      }
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

// Obtenir les statistiques des articles
const getArticleStats = async (req, res) => {
  try {
    const totalArticles = await Article.count();
    
    const publishedArticles = await Article.count({
      where: {
        status: 'published',
        publishedAt: {
          [Op.lte]: new Date()
        }
      }
    });

    const draftArticles = await Article.count({
      where: {
        status: 'draft'
      }
    });

    const totalViews = await Article.sum('views') || 0;

    const categoriesStats = await Article.findAll({
      attributes: [
        'category',
        [Article.sequelize.fn('COUNT', Article.sequelize.col('id')), 'count']
      ],
      group: ['category']
    });

    const featuredCount = await Article.count({
      where: {
        featured: true
      }
    });

    res.json({
      success: true,
      data: {
        totalArticles,
        publishedArticles,
        draftArticles,
        totalViews,
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

// Upload d'image (placeholder - à implémenter selon vos besoins)
const uploadImage = async (req, res) => {
  try {
    // Cette fonction devrait gérer l'upload d'images
    // Pour l'instant, on retourne une URL fictive
    const imageUrl = 'https://placehold.co/800x500/1E40AF/FFFFFF?text=Article+Image';
    
    res.json({
      success: true,
      message: 'Image téléchargée avec succès',
      data: imageUrl
    });
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du téléchargement de l\'image',
      error: error.message
    });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  publishArticle,
  unpublishArticle,
  getArticleStats,
  uploadImage
};
