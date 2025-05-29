const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Importation de la base de données et des routes
const { testConnection } = require('./config/database');
const { syncDatabase } = require('./models');

const contactRoutes = require('./routes/contactRoutes');
const projectRoutes = require('./routes/projectRoutes');
const articleRoutes = require('./routes/articleRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Configuration environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

// CORS
const whitelist = [
  'https://www.neobize.com',
  'https://neobize.com',
  'https://neobize.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentification
const JWT_SECRET = process.env.JWT_SECRET || 'neobize-secret-key';
let authCredentials = {
  username: 'admin',
  password: 'admin123'
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Accès non autorisé' });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Token invalide ou expiré' });
    req.user = user;
    next();
  });
};

// Initialisation DB
const initializeDatabase = async () => {
  try {
    await testConnection();
    await syncDatabase();
    console.log('✅ Base de données PostgreSQL initialisée');
  } catch (error) {
    console.error('❌ Erreur de base de données:', error);
    process.exit(1);
  }
};

// Routes API de base
app.get('/', (req, res) => {
  res.json({ message: 'API NEOBIZE en ligne', version: '2.0.0', database: 'PostgreSQL', timestamp: new Date().toISOString() });
});

app.get('/api/hello', (req, res) => {
  res.json({ success: true, message: 'Hello from NEOBIZE API!', timestamp: new Date().toISOString() });
});

// Routes principales
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/admin', adminRoutes);

// Authentification login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === authCredentials.username && password === authCredentials.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    return res.status(200).json({ success: true, message: 'Authentification réussie', token });
  }
  res.status(401).json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
});

// Blog vers articles
app.get('/api/blog/posts', (req, res) => res.redirect('/api/articles'));

// Catégories statiques
const categories = [
  { id: 'web-dev', name: 'Développement Web' },
  { id: 'transport', name: 'Transport & Logistique' },
  { id: 'construction', name: 'Construction & BTP' }
];

// Routes publiques
app.get('/api/categories', (req, res) => {
  res.status(200).json({ success: true, data: categories });
});

// Routes protégées admin
app.get('/api/admin/categories', authenticateToken, (req, res) => {
  res.status(200).json({ success: true, data: categories });
});

app.post('/api/admin/categories', authenticateToken, (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return res.status(400).json({ success: false, message: 'Les champs id et name sont requis' });
    }
    const exists = categories.some(cat => cat.id === id);
    if (exists) {
      return res.status(409).json({ success: false, message: 'Une catégorie avec cet ID existe déjà' });
    }
    categories.push({ id, name });
    res.status(201).json({ success: true, message: 'Catégorie créée avec succès', data: { id, name } });
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
  }
});

// Modifier identifiants admin
app.put('/api/admin/credentials', authenticateToken, (req, res) => {
  const { username, currentPassword, newPassword } = req.body;
  if (!username) return res.status(400).json({ success: false, message: 'Le nom d\'utilisateur est requis' });
  if (currentPassword !== authCredentials.password) {
    return res.status(401).json({ success: false, message: 'Mot de passe actuel incorrect' });
  }
  authCredentials.username = username;
  if (newPassword) authCredentials.password = newPassword;
  res.status(200).json({ success: true, message: 'Identifiants mis à jour avec succès' });
});

// Upload image avec multer
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname))
});
const fileFilter = (req, file, cb) => file.mimetype.startsWith('image/') ? cb(null, true) : cb(new Error('Seules les images sont autorisées'), false);
const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

app.use('/uploads', express.static(uploadDir));

app.post('/api/admin/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Aucun fichier téléchargé' });
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ success: true, message: 'Image téléchargée avec succès', data: imageUrl });
  } catch (error) {
    console.error('Erreur upload image:', error);
    res.status(500).json({ success: false, message: error.message || 'Erreur serveur' });
  }
});

// Gestion erreurs globales
app.use((error, req, res, next) => {
  console.error('Erreur non gérée:', error);
  res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
});

// Lancer serveur
const startServer = async () => {
  try {
    await initializeDatabase();
    const server = app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
      console.log(`🌐 API disponible sur http://localhost:${PORT}`);
    });
    server.on('error', error => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} déjà utilisé`);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('❌ Erreur au démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();
