const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/articleController');

// Routes publiques pour les articles publiés

// GET /api/articles - Obtenir tous les articles publiés avec pagination et filtres
router.get('/', getPublishedArticles);

// GET /api/articles/featured - Obtenir les articles en vedette
router.get('/featured', getFeaturedArticles);

// GET /api/articles/recent - Obtenir les articles récents
router.get('/recent', getRecentArticles);

// GET /api/articles/search - Rechercher des articles
router.get('/search', searchArticles);

// GET /api/articles/stats - Obtenir les statistiques des articles
router.get('/stats', getArticleStats);

// GET /api/articles/category/:category - Obtenir les articles par catégorie
router.get('/category/:category', getArticlesByCategory);

// GET /api/articles/:slug - Obtenir un article par son slug
router.get('/:slug', getArticleBySlug);

// Routes d'administration (nécessitent une authentification dans une vraie application)

// POST /api/articles - Créer un nouvel article
router.post('/', createArticle);

// PUT /api/articles/:id - Mettre à jour un article
router.put('/:id', updateArticle);

// DELETE /api/articles/:id - Supprimer un article
router.delete('/:id', deleteArticle);

// PATCH /api/articles/:id/publish - Publier un article
router.patch('/:id/publish', publishArticle);

// PATCH /api/articles/:id/unpublish - Dépublier un article
router.patch('/:id/unpublish', unpublishArticle);

module.exports = router;
