const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Importer la configuration de la base de données et les modèles
const { testConnection } = require('./config/database');
const { syncDatabase } = require('./models');

// Importer les routes
const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');
const articleRoutes = require('./routes/articleRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
// Configure CORS for different environments
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://neobize.vercel.app'] 
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'http://localhost:3003', 'http://localhost:3004', 'http://localhost:5173', 'http://localhost:4173', 'http://127.0.0.1:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Secret pour JWT
const JWT_SECRET = process.env.JWT_SECRET || 'neobize-secret-key';

// Informations d'authentification (à remplacer par une base de données en production)
let authCredentials = {
  username: 'admin',
  password: 'password'
};

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Accès non autorisé' });
  }
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token invalide ou expiré' });
    }
    
    req.user = user;
    next();
  });
};

// Initialiser la base de données
const initializeDatabase = async () => {
  try {
    await testConnection();
    await syncDatabase();
    console.log('🚀 Base de données PostgreSQL initialisée avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
};

// Routes principales
app.get('/', (req, res) => {
  res.json({
    message: 'API NEOBIZE est en ligne !',
    version: '2.0.0',
    database: 'PostgreSQL',
    timestamp: new Date().toISOString()
  });
});

// Route de test simple
app.get('/api/hello', (req, res) => {
  res.json({
    success: true,
    message: 'Hello from NEOBIZE API!',
    timestamp: new Date().toISOString()
  });
});

// Utiliser les routes
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/admin', adminRoutes);

// Route d'authentification
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  // Vérification des identifiants
  if (username === authCredentials.username && password === authCredentials.password) {
    // Générer un token JWT
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    
    res.status(200).json({
      success: true,
      message: 'Authentification réussie',
      token
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Nom d\'utilisateur ou mot de passe incorrect'
    });
  }
});

// Route de compatibilité pour l'ancien endpoint blog
app.get('/api/blog/posts', async (req, res) => {
  try {
    // Rediriger vers la nouvelle API des articles
    res.redirect('/api/articles');
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la récupération des articles'
    });
  }
});

// Routes pour les catégories (utilisant des catégories statiques pour la compatibilité)
const categories = [
  { id: 'web-dev', name: 'Développement Web' },
  { id: 'transport', name: 'Transport & Logistique' },
  { id: 'construction', name: 'Construction & BTP' }
];

app.get('/api/categories', async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la récupération des catégories'
    });
  }
});

// Routes protégées pour la gestion des catégories
app.get('/api/admin/categories', authenticateToken, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la récupération des catégories'
    });
  }
});

// Route pour mettre à jour les informations d'authentification
app.put('/api/admin/credentials', authenticateToken, async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;
    
    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Le nom d\'utilisateur est requis'
      });
    }
    
    if (currentPassword !== authCredentials.password) {
      return res.status(401).json({
        success: false,
        message: 'Le mot de passe actuel est incorrect'
      });
    }
    
    // Mettre à jour le nom d'utilisateur
    authCredentials.username = username;
    
    // Mettre à jour le mot de passe si un nouveau est fourni
    if (newPassword) {
      authCredentials.password = newPassword;
    }
    
    res.status(200).json({
      success: true,
      message: 'Informations d\'authentification mises à jour avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations d\'authentification:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la mise à jour des informations d\'authentification'
    });
  }
});

// Configuration de multer pour le téléchargement d'images
const uploadDir = path.join(__dirname, 'uploads');

// Créer le répertoire d'uploads s'il n'existe pas
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configurer le stockage pour multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Générer un nom de fichier unique avec timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// Filtrer les types de fichiers acceptés
const fileFilter = (req, file, cb) => {
  // Accepter uniquement les images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Seules les images sont autorisées'), false);
  }
};

// Initialiser multer
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // Limite à 10MB
  }
});

// Servir les fichiers statiques du répertoire uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route pour le téléchargement d'images
app.post('/api/admin/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Aucun fichier n\'a été téléchargé'
      });
    }
    
    // Construire l'URL de l'image
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.status(200).json({
      success: true,
      message: 'Image téléchargée avec succès',
      data: imageUrl
    });
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Une erreur est survenue lors du téléchargement de l\'image'
    });
  }
});

// Gestionnaire d'erreurs global
app.use((error, req, res, next) => {
  console.error('Erreur non gérée:', error);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur'
  });
});

// Démarrer le serveur
const startServer = async () => {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Serveur NEOBIZE en cours d'exécution sur le port ${PORT}`);
      console.log(`📊 Base de données: PostgreSQL`);
      console.log(`🌐 API disponible sur: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();
