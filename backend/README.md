# NEOBIZE Backend API

Backend API pour le site web NEOBIZE avec base de données PostgreSQL.

## 🚀 Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Base de données relationnelle
- **Sequelize** - ORM pour PostgreSQL
- **JWT** - Authentification
- **Nodemailer** - Envoi d'emails
- **Multer** - Upload de fichiers

## 📋 Prérequis

- Node.js (version 16 ou supérieure)
- PostgreSQL (version 12 ou supérieure)
- npm ou yarn

## 🛠️ Installation

### 1. Installer PostgreSQL

#### Sur Windows :
1. Télécharger PostgreSQL depuis [postgresql.org](https://www.postgresql.org/download/windows/)
2. Installer avec les paramètres par défaut
3. Noter le mot de passe du superutilisateur `postgres`

#### Sur macOS :
```bash
# Avec Homebrew
brew install postgresql
brew services start postgresql
```

#### Sur Ubuntu/Debian :
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Créer la base de données

```bash
# Se connecter à PostgreSQL
psql -U postgres

# Créer la base de données
CREATE DATABASE neobize_db;

# Créer un utilisateur (optionnel)
CREATE USER neobize_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE neobize_db TO neobize_user;

# Quitter psql
\q
```

### 3. Configurer les variables d'environnement

Copier le fichier `.env.example` vers `.env` et modifier les valeurs :

```bash
cp .env.example .env
```

Modifier le fichier `.env` :
```env
# Configuration du serveur
PORT=5000

# Configuration de l'email
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-app
EMAIL_RECIPIENT=contact@neobize.com

# Configuration PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=neobize_db
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe

# JWT Secret
JWT_SECRET=votre_clé_secrète_jwt_très_sécurisée
```

### 4. Installer les dépendances

```bash
npm install
```

### 5. Initialiser la base de données

```bash
# Créer les tables et ajouter des données d'exemple
npm run seed
```

## 🚀 Démarrage

### Mode développement
```bash
npm run dev
```

### Mode production
```bash
npm start
```

Le serveur sera accessible sur `http://localhost:5000`

## 📚 API Endpoints

### Routes publiques

#### Contacts
- `POST /api/contacts` - Créer un nouveau contact
- `GET /api/contacts` - Récupérer tous les contacts (admin)
- `PATCH /api/contacts/:id/status` - Mettre à jour le statut d'un contact (admin)

#### Projets
- `GET /api/projects` - Récupérer tous les projets
- `GET /api/projects/featured` - Récupérer les projets en vedette
- `GET /api/projects/search` - Rechercher des projets
- `GET /api/projects/:id` - Récupérer un projet par ID
- `POST /api/projects` - Créer un nouveau projet (admin)
- `PUT /api/projects/:id` - Mettre à jour un projet (admin)
- `DELETE /api/projects/:id` - Supprimer un projet (admin)

#### Autres
- `GET /` - Page d'accueil de l'API
- `GET /api/hello` - Route de test
- `POST /api/auth/login` - Authentification admin
- `GET /api/blog/posts` - Récupérer les articles de blog
- `GET /api/categories` - Récupérer les catégories

### Routes admin (authentification requise)

Toutes les routes admin nécessitent un token JWT dans l'en-tête :
```
Authorization: Bearer <token>
```

## 🗄️ Structure de la base de données

### Table `contacts`
- `id` - Identifiant unique
- `name` - Nom du contact
- `email` - Email du contact
- `phone` - Téléphone (optionnel)
- `subject` - Sujet du message
- `message` - Contenu du message
- `status` - Statut (nouveau, lu, traite, archive)
- `createdAt` - Date de création
- `updatedAt` - Date de modification

### Table `projects`
- `id` - Identifiant unique
- `title` - Titre du projet
- `description` - Description détaillée
- `category` - Catégorie (web-dev, transport, construction)
- `status` - Statut (en-cours, termine, suspendu)
- `client` - Nom du client
- `startDate` - Date de début
- `endDate` - Date de fin
- `budget` - Budget du projet
- `technologies` - Technologies utilisées (JSON)
- `images` - Images du projet (JSON)
- `featured` - Projet en vedette (boolean)
- `published` - Projet publié (boolean)
- `createdAt` - Date de création
- `updatedAt` - Date de modification

## 🔧 Scripts disponibles

- `npm start` - Démarrer le serveur en mode production
- `npm run dev` - Démarrer le serveur en mode développement avec nodemon
- `npm run seed` - Initialiser la base de données avec des données d'exemple
- `npm run db:init` - Alias pour `npm run seed`

## 🛡️ Sécurité

- Authentification JWT pour les routes admin
- Validation des données d'entrée
- Protection CORS configurée
- Limitation de taille des fichiers uploadés
- Variables d'environnement pour les informations sensibles

## 📝 Logs

Le serveur affiche des logs détaillés pour :
- Connexion à la base de données
- Synchronisation des modèles
- Erreurs et succès des opérations
- Démarrage du serveur

## 🐛 Dépannage

### Erreur de connexion PostgreSQL
1. Vérifier que PostgreSQL est démarré
2. Vérifier les paramètres de connexion dans `.env`
3. Vérifier que la base de données existe
4. Vérifier les permissions utilisateur

### Erreur de synchronisation des modèles
1. Vérifier la structure des modèles
2. Supprimer et recréer la base de données si nécessaire
3. Relancer `npm run seed`

### Port déjà utilisé
1. Changer le port dans `.env`
2. Ou arrêter le processus utilisant le port 5000

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement NEOBIZE.
