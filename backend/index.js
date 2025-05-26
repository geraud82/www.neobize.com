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

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
// Configure CORS for different environments
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://neobize.vercel.app'] 
    : 'http://localhost:3000',
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

// Stockage temporaire des catégories (à remplacer par une base de données en production)
let categories = [
  { id: 'web-dev', name: 'Développement Web' },
  { id: 'transport', name: 'Transport & Logistique' },
  { id: 'construction', name: 'Construction & BTP' }
];

// Stockage temporaire des articles (à remplacer par une base de données en production)
let blogPosts = [
  {
    id: 1,
    title: 'Les tendances du développement web en 2025',
    excerpt: 'Découvrez les dernières tendances et technologies qui façonnent le développement web cette année.',
    content: `
      <h2>Les tendances du développement web en 2025</h2>
      <p>Le monde du développement web évolue constamment, avec de nouvelles technologies et approches qui émergent chaque année. En 2025, plusieurs tendances majeures façonnent la façon dont les développeurs créent des sites web et des applications.</p>
      <h3>1. L'essor des applications progressives (PWA)</h3>
      <p>Les Progressive Web Apps continuent de gagner en popularité, offrant une expérience utilisateur similaire à celle des applications natives tout en fonctionnant dans un navigateur web.</p>
      <h3>2. L'adoption généralisée de WebAssembly</h3>
      <p>WebAssembly permet d'exécuter du code à des vitesses proches du natif dans le navigateur, ouvrant la porte à des applications web plus performantes et complexes.</p>
      <h3>3. Le développement sans tête (Headless)</h3>
      <p>Les CMS headless séparent le backend du frontend, offrant plus de flexibilité aux développeurs pour créer des expériences personnalisées.</p>
    `,
    category: 'web-dev',
    author: 'Marie Laurent',
    date: '15 avril 2025',
    readTime: '5 min',
    image: 'https://placehold.co/800x500/1E40AF/FFFFFF?text=Web+Dev+Trends',
    tags: ['Développement Web', 'Tendances', 'Technologies'],
    published: true
  },
  {
    id: 2,
    title: 'Comment optimiser votre chaîne logistique',
    excerpt: 'Apprenez les meilleures pratiques pour optimiser votre chaîne logistique et réduire les coûts de transport.',
    content: `
      <h2>Comment optimiser votre chaîne logistique</h2>
      <p>Une chaîne logistique efficace est essentielle pour toute entreprise qui souhaite rester compétitive sur le marché actuel. Voici quelques stratégies pour optimiser vos opérations logistiques.</p>
      <h3>1. Automatisation des processus</h3>
      <p>L'automatisation des tâches répétitives peut considérablement améliorer l'efficacité et réduire les erreurs humaines dans votre chaîne logistique.</p>
      <h3>2. Analyse des données en temps réel</h3>
      <p>Utiliser des outils d'analyse de données pour surveiller les performances de votre chaîne logistique en temps réel vous permet de prendre des décisions éclairées rapidement.</p>
      <h3>3. Collaboration avec les fournisseurs</h3>
      <p>Une communication transparente et une collaboration étroite avec vos fournisseurs peuvent aider à réduire les délais et à améliorer la qualité des produits.</p>
    `,
    category: 'transport',
    author: 'Pierre Martin',
    date: '28 mars 2025',
    readTime: '7 min',
    image: 'https://placehold.co/800x500/1E40AF/FFFFFF?text=Logistics',
    tags: ['Logistique', 'Transport', 'Optimisation'],
    published: true
  }
];

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

// Routes pour les articles de blog
app.get('/api/blog/posts', async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: blogPosts.filter(post => post.published)
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la récupération des articles'
    });
  }
});

// Routes pour les catégories
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

app.post('/api/admin/categories', authenticateToken, async (req, res) => {
  try {
    const { id, name } = req.body;
    
    if (!id || !name) {
      return res.status(400).json({
        success: false,
        message: 'L\'identifiant et le nom sont requis'
      });
    }
    
    if (categories.some(cat => cat.id === id)) {
      return res.status(400).json({
        success: false,
        message: 'Une catégorie avec cet identifiant existe déjà'
      });
    }
    
    const newCategory = { id, name };
    categories.push(newCategory);
    
    res.status(201).json({
      success: true,
      message: 'Catégorie créée avec succès',
      data: newCategory
    });
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la création de la catégorie'
    });
  }
});

app.delete('/api/admin/categories/:id', authenticateToken, async (req, res) => {
  try {
    const categoryId = req.params.id;
    const initialLength = categories.length;
    
    if (categories.length <= 1) {
      return res.status(400).json({
        success: false,
        message: 'Vous devez conserver au moins une catégorie'
      });
    }
    
    categories = categories.filter(cat => cat.id !== categoryId);
    
    if (categories.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Catégorie non trouvée'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Catégorie supprimée avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la suppression de la catégorie'
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

// Routes protégées pour l'administration des articles
app.get('/api/admin/posts', authenticateToken, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: blogPosts
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la récupération des articles'
    });
  }
});

app.post('/api/admin/posts', authenticateToken, async (req, res) => {
  try {
    const newPost = {
      id: Date.now(),
      ...req.body,
      date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    
    blogPosts.unshift(newPost);
    
    res.status(201).json({
      success: true,
      message: 'Article créé avec succès',
      data: newPost
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la création de l\'article'
    });
  }
});

app.put('/api/admin/posts/:id', authenticateToken, async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const postIndex = blogPosts.findIndex(post => post.id === postId);
    
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }
    
    const updatedPost = {
      ...blogPosts[postIndex],
      ...req.body
    };
    
    blogPosts[postIndex] = updatedPost;
    
    res.status(200).json({
      success: true,
      message: 'Article mis à jour avec succès',
      data: updatedPost
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la mise à jour de l\'article'
    });
  }
});

app.delete('/api/admin/posts/:id', authenticateToken, async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const initialLength = blogPosts.length;
    
    blogPosts = blogPosts.filter(post => post.id !== postId);
    
    if (blogPosts.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Article supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    res.status(500).json({
      success: false,
      message: 'Une erreur est survenue lors de la suppression de l\'article'
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
