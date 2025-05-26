const { Article } = require('../models');

const sampleArticles = [
  {
    title: 'Les tendances du développement web en 2025',
    slug: 'les-tendances-du-developpement-web-en-2025',
    excerpt: 'Découvrez les dernières tendances et technologies qui façonnent le développement web cette année.',
    content: `
# Les tendances du développement web en 2025

Le monde du développement web évolue constamment, avec de nouvelles technologies et approches qui émergent chaque année. En 2025, plusieurs tendances majeures façonnent la façon dont les développeurs créent des sites web et des applications.

## 1. L'essor des applications progressives (PWA)

Les Progressive Web Apps continuent de gagner en popularité, offrant une expérience utilisateur similaire à celle des applications natives tout en fonctionnant dans un navigateur web.

### Avantages des PWA :
- Installation directe depuis le navigateur
- Fonctionnement hors ligne
- Notifications push
- Performance optimisée

## 2. L'adoption généralisée de WebAssembly

WebAssembly permet d'exécuter du code à des vitesses proches du natif dans le navigateur, ouvrant la porte à des applications web plus performantes et complexes.

## 3. Le développement sans tête (Headless)

Les CMS headless séparent le backend du frontend, offrant plus de flexibilité aux développeurs pour créer des expériences personnalisées.

## 4. L'intelligence artificielle intégrée

L'IA devient de plus en plus accessible aux développeurs web, avec des API et des outils qui permettent d'intégrer facilement des fonctionnalités intelligentes.

## Conclusion

Ces tendances montrent que le développement web continue d'évoluer vers plus de performance, de flexibilité et d'intelligence. Les développeurs qui s'adaptent à ces changements seront mieux positionnés pour créer les applications de demain.
    `,
    category: 'web-dev',
    author: 'Marie Laurent',
    featuredImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop',
    tags: ['Développement Web', 'Tendances', 'Technologies', 'PWA', 'WebAssembly'],
    status: 'published',
    publishedAt: new Date('2025-01-15'),
    featured: true
  },
  {
    title: 'Comment optimiser votre chaîne logistique',
    slug: 'comment-optimiser-votre-chaine-logistique',
    excerpt: 'Apprenez les meilleures pratiques pour optimiser votre chaîne logistique et réduire les coûts de transport.',
    content: `
# Comment optimiser votre chaîne logistique

Une chaîne logistique efficace est essentielle pour toute entreprise qui souhaite rester compétitive sur le marché actuel. Voici quelques stratégies pour optimiser vos opérations logistiques.

## 1. Automatisation des processus

L'automatisation des tâches répétitives peut considérablement améliorer l'efficacité et réduire les erreurs humaines dans votre chaîne logistique.

### Technologies d'automatisation :
- Systèmes de gestion d'entrepôt (WMS)
- Robots de picking
- Convoyeurs automatisés
- Systèmes de tri automatique

## 2. Analyse des données en temps réel

Utiliser des outils d'analyse de données pour surveiller les performances de votre chaîne logistique en temps réel vous permet de prendre des décisions éclairées rapidement.

## 3. Collaboration avec les fournisseurs

Une communication transparente et une collaboration étroite avec vos fournisseurs peuvent aider à réduire les délais et à améliorer la qualité des produits.

## 4. Optimisation des routes

L'utilisation d'algorithmes d'optimisation des routes peut réduire significativement les coûts de transport et les délais de livraison.

## 5. Gestion des stocks intelligente

Implementer des systèmes de gestion des stocks basés sur l'IA pour prévoir la demande et optimiser les niveaux de stock.

## Conclusion

L'optimisation de la chaîne logistique est un processus continu qui nécessite une approche holistique. En combinant technologie, collaboration et analyse de données, les entreprises peuvent créer des chaînes logistiques plus efficaces et rentables.
    `,
    category: 'transport',
    author: 'Pierre Martin',
    featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop',
    tags: ['Logistique', 'Transport', 'Optimisation', 'Automatisation'],
    status: 'published',
    publishedAt: new Date('2025-01-10'),
    featured: false
  },
  {
    title: 'Les innovations dans le secteur de la construction',
    slug: 'les-innovations-dans-le-secteur-de-la-construction',
    excerpt: 'Explorez les nouvelles technologies qui révolutionnent l\'industrie de la construction et du BTP.',
    content: `
# Les innovations dans le secteur de la construction

L'industrie de la construction connaît une transformation majeure grâce aux nouvelles technologies. Ces innovations promettent d'améliorer l'efficacité, la sécurité et la durabilité des projets de construction.

## 1. La modélisation des informations du bâtiment (BIM)

Le BIM révolutionne la façon dont les projets de construction sont conçus, planifiés et exécutés.

### Avantages du BIM :
- Visualisation 3D complète
- Détection des conflits avant construction
- Collaboration améliorée entre équipes
- Réduction des erreurs et des coûts

## 2. L'impression 3D dans la construction

L'impression 3D permet de créer des structures complexes avec moins de matériaux et de main-d'œuvre.

## 3. Les matériaux intelligents

De nouveaux matériaux auto-réparants et adaptatifs changent la donne en termes de durabilité et de maintenance.

## 4. La robotique sur les chantiers

Les robots commencent à être utilisés pour des tâches dangereuses ou répétitives, améliorant la sécurité des travailleurs.

## 5. L'IoT et les capteurs intelligents

Les capteurs connectés permettent un suivi en temps réel de la progression des travaux et de la qualité de construction.

## Conclusion

Ces innovations transforment l'industrie de la construction, la rendant plus efficace, sûre et durable. Les entreprises qui adoptent ces technologies seront mieux positionnées pour réussir dans le futur.
    `,
    category: 'construction',
    author: 'Sophie Dubois',
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop',
    tags: ['Construction', 'BTP', 'Innovation', 'BIM', 'Technologie'],
    status: 'published',
    publishedAt: new Date('2025-01-05'),
    featured: true
  },
  {
    title: 'Guide complet pour créer une application mobile moderne',
    slug: 'guide-complet-pour-creer-une-application-mobile-moderne',
    excerpt: 'Découvrez les étapes essentielles pour développer une application mobile performante et user-friendly.',
    content: `
# Guide complet pour créer une application mobile moderne

Le développement d'applications mobiles est devenu incontournable pour les entreprises souhaitant atteindre leur audience. Ce guide vous accompagne dans toutes les étapes de création.

## 1. Définition du projet

Avant de commencer le développement, il est crucial de bien définir votre projet.

### Questions essentielles :
- Quel problème votre app résout-elle ?
- Qui est votre public cible ?
- Quelles sont les fonctionnalités principales ?
- Quel est votre budget et timeline ?

## 2. Choix de la technologie

Plusieurs approches sont possibles pour le développement mobile.

### Options disponibles :
- **Natif** : iOS (Swift) et Android (Kotlin)
- **Cross-platform** : React Native, Flutter
- **Hybride** : Ionic, Cordova

## 3. Design et UX/UI

L'expérience utilisateur est cruciale pour le succès de votre application.

### Principes de design mobile :
- Interface intuitive
- Navigation simple
- Temps de chargement optimisés
- Adaptation aux différentes tailles d'écran

## 4. Développement et tests

La phase de développement doit suivre les meilleures pratiques.

### Bonnes pratiques :
- Code propre et documenté
- Tests unitaires et d'intégration
- Optimisation des performances
- Sécurité des données

## 5. Déploiement et maintenance

Le lancement n'est que le début de l'aventure.

### Étapes post-lancement :
- Publication sur les stores
- Monitoring des performances
- Collecte des retours utilisateurs
- Mises à jour régulières

## Conclusion

Créer une application mobile réussie demande une approche méthodique et une attention particulière à l'expérience utilisateur. Avec une bonne planification et les bonnes technologies, votre projet a toutes les chances de réussir.
    `,
    category: 'web-dev',
    author: 'Thomas Leroy',
    featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
    tags: ['Mobile', 'Développement', 'React Native', 'Flutter', 'UX/UI'],
    status: 'draft',
    publishedAt: null,
    featured: false
  },
  {
    title: 'L\'avenir du transport urbain : solutions durables',
    slug: 'lavenir-du-transport-urbain-solutions-durables',
    excerpt: 'Explorez les innovations qui transforment le transport urbain vers plus de durabilité et d\'efficacité.',
    content: `
# L'avenir du transport urbain : solutions durables

Les villes du monde entier font face à des défis croissants en matière de transport. Les solutions durables deviennent essentielles pour créer des environnements urbains plus vivables.

## 1. Électrification des transports

La transition vers l'électrique transforme le paysage du transport urbain.

### Véhicules électriques :
- Buses électriques
- Voitures partagées électriques
- Vélos et trottinettes électriques
- Camions de livraison électriques

## 2. Mobilité partagée

Les services de partage réduisent le nombre de véhicules en circulation.

### Types de mobilité partagée :
- Autopartage
- Covoiturage
- Vélos en libre-service
- Trottinettes partagées

## 3. Transport autonome

Les véhicules autonomes promettent de révolutionner la mobilité urbaine.

### Avantages potentiels :
- Réduction des accidents
- Optimisation du trafic
- Accessibilité améliorée
- Efficacité énergétique

## 4. Infrastructure intelligente

Les villes intelligentes intègrent la technologie pour optimiser les flux de transport.

### Technologies clés :
- Feux de circulation adaptatifs
- Systèmes de gestion du trafic
- Applications de mobilité intégrées
- Capteurs IoT

## 5. Multimodalité

L'intégration de différents modes de transport facilite les déplacements.

### Exemples d'intégration :
- Hubs de transport multimodaux
- Billettique unifiée
- Planificateurs de trajets intégrés
- Parkings relais

## Conclusion

L'avenir du transport urbain sera électrique, partagé et intelligent. Ces innovations contribueront à créer des villes plus durables et plus agréables à vivre.
    `,
    category: 'transport',
    author: 'Marie Dubois',
    featuredImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop',
    tags: ['Transport', 'Durabilité', 'Mobilité', 'Électrique', 'Smart City'],
    status: 'published',
    publishedAt: new Date('2024-12-20'),
    featured: false
  }
];

const seedArticles = async () => {
  try {
    console.log('🌱 Début du seeding des articles...');
    
    // Supprimer tous les articles existants
    await Article.destroy({ where: {} });
    console.log('🗑️ Articles existants supprimés');
    
    // Créer les nouveaux articles
    const createdArticles = await Article.bulkCreate(sampleArticles);
    console.log(`✅ ${createdArticles.length} articles créés avec succès`);
    
    // Afficher un résumé
    const publishedCount = createdArticles.filter(article => article.status === 'published').length;
    const draftCount = createdArticles.filter(article => article.status === 'draft').length;
    const featuredCount = createdArticles.filter(article => article.featured).length;
    
    console.log(`📊 Résumé :`);
    console.log(`   - Articles publiés : ${publishedCount}`);
    console.log(`   - Brouillons : ${draftCount}`);
    console.log(`   - Articles en vedette : ${featuredCount}`);
    
    return createdArticles;
  } catch (error) {
    console.error('❌ Erreur lors du seeding des articles:', error);
    throw error;
  }
};

// Exporter la fonction pour utilisation dans d'autres scripts
module.exports = { seedArticles, sampleArticles };

// Exécuter le script si appelé directement
if (require.main === module) {
  const { testConnection } = require('../config/database');
  const { syncDatabase } = require('../models');
  
  const runSeed = async () => {
    try {
      await testConnection();
      await syncDatabase();
      await seedArticles();
      console.log('🎉 Seeding terminé avec succès !');
      process.exit(0);
    } catch (error) {
      console.error('💥 Erreur lors du seeding:', error);
      process.exit(1);
    }
  };
  
  runSeed();
}
