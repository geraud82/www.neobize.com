const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  publishArticle,
  unpublishArticle,
  getArticleStats,
  uploadImage
} = require('../controllers/adminController');

// Middleware d'authentification pour les routes admin
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Accès non autorisé' });
  }
  
  const JWT_SECRET = process.env.JWT_SECRET || 'neobize-secret-key';
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token invalide ou expiré' });
    }
    
    req.user = user;
    next();
  });
};

// Routes d'administration pour les articles (toutes protégées par authentification)

// GET /api/admin/articles - Obtenir tous les articles (incluant brouillons)
router.get('/articles', authenticateToken, getAllArticles);

// GET /api/admin/articles/stats - Obtenir les statistiques des articles
router.get('/articles/stats', authenticateToken, getArticleStats);

// GET /api/admin/articles/:id - Obtenir un article par ID
router.get('/articles/:id', authenticateToken, getArticleById);

// POST /api/admin/articles - Créer un nouvel article
router.post('/articles', authenticateToken, createArticle);

// PUT /api/admin/articles/:id - Mettre à jour un article
router.put('/articles/:id', authenticateToken, updateArticle);

// DELETE /api/admin/articles/:id - Supprimer un article
router.delete('/articles/:id', authenticateToken, deleteArticle);

// PATCH /api/admin/articles/:id/publish - Publier un article
router.patch('/articles/:id/publish', authenticateToken, publishArticle);

// PATCH /api/admin/articles/:id/unpublish - Dépublier un article
router.patch('/articles/:id/unpublish', authenticateToken, unpublishArticle);

// POST /api/admin/upload - Upload d'image
router.post('/upload', authenticateToken, uploadImage);

module.exports = router;
