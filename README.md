# NEOBIZE Project

Projet NEOBIZE avec frontend et backend séparés.

## Structure du Projet

```
neobize/
├── backend/         # Serveur Express.js
├── frontend/        # Application React avec Vite
└── package.json     # Scripts pour gérer le projet global
```

## Prérequis

- Node.js (v16+)
- npm ou yarn

## Installation

1. Cloner le dépôt
2. Installer les dépendances pour le projet entier:

```bash
npm run install-all
```

## Développement Local

Pour lancer le frontend et le backend en mode développement:

```bash
npm start
```

Pour lancer uniquement le frontend:

```bash
npm run frontend
```

Pour lancer uniquement le backend:

```bash
npm run backend
```

## Déploiement

### Frontend (Vercel)

1. Créez un compte sur [Vercel](https://vercel.com) si vous n'en avez pas déjà un.
2. Installez l'outil CLI Vercel (optionnel):

```bash
npm install -g vercel
```

3. Configurez les variables d'environnement:
   - Créez un fichier `.env` dans le dossier `frontend` basé sur `.env.example`
   - Définissez `VITE_API_URL` avec l'URL de votre backend déployé sur Render.com

4. Déployez avec Git:
   - Connectez votre dépôt GitHub à Vercel
   - Configurez le projet avec les paramètres suivants:
     - Framework Preset: Vite
     - Root Directory: frontend
     - Build Command: npm run build
     - Output Directory: dist

5. Ou déployez avec CLI:

```bash
cd frontend
vercel
```

### Backend (Render.com)

1. Créez un compte sur [Render.com](https://render.com) si vous n'en avez pas déjà un.
2. Créez un nouveau Web Service:
   - Connectez votre dépôt GitHub
   - Sélectionnez le dossier `backend` comme répertoire racine
   - Sélectionnez Node.js comme environnement
   - Commande de build: `npm install`
   - Commande de démarrage: `npm start`

3. Configurez les variables d'environnement dans Render:
   - `PORT`: 10000 (Render utilise ce port par défaut)
   - `NODE_ENV`: production
   - `JWT_SECRET`: votre clé secrète pour JWT
   - `FRONTEND_URL`: URL de votre frontend déployé sur Vercel
   - `EMAIL_USER`: votre adresse email pour l'envoi de mails
   - `EMAIL_PASS`: votre mot de passe email
   - `EMAIL_RECIPIENT`: adresse email de réception des messages de contact

4. Déployez le service et attendez que le déploiement soit terminé.

5. Une fois déployé, mettez à jour la variable d'environnement `VITE_API_URL` dans votre projet frontend sur Vercel avec l'URL de votre backend Render.

## Licence

ISC
#   w w w . n e o b i z e . c o m  
 