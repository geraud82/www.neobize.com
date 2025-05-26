const { Contact, Project, syncDatabase } = require('../models');

// Données d'exemple pour les contacts
const sampleContacts = [
  {
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 1 23 45 67 89',
    subject: 'Demande de devis pour site web',
    message: 'Bonjour, je souhaiterais obtenir un devis pour la création d\'un site web vitrine pour mon entreprise.',
    status: 'nouveau'
  },
  {
    name: 'Marie Martin',
    email: 'marie.martin@example.com',
    phone: '+33 6 12 34 56 78',
    subject: 'Service de transport',
    message: 'Je recherche un service de transport fiable pour mes livraisons quotidiennes.',
    status: 'lu'
  }
];

// Données d'exemple pour les projets
const sampleProjects = [
  {
    title: 'Plateforme E-commerce ModernShop',
    description: 'Développement d\'une plateforme e-commerce complète avec système de paiement intégré, gestion des stocks et interface d\'administration. La plateforme supporte les paiements multiples et offre une expérience utilisateur optimisée.',
    category: 'web-dev',
    status: 'termine',
    client: 'ModernShop SARL',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-06-30'),
    budget: 25000.00,
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    images: ['/images/web-saas.jpg'],
    featured: true,
    published: true
  },
  {
    title: 'Application de Gestion Logistique',
    description: 'Système de gestion logistique pour optimiser les routes de livraison et suivre les colis en temps réel. Inclut un tableau de bord analytique et des notifications automatiques.',
    category: 'transport',
    status: 'termine',
    client: 'LogiTrans Express',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-08-15'),
    budget: 35000.00,
    technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Socket.io', 'Google Maps API'],
    images: ['/images/web-trans.jpg'],
    featured: true,
    published: true
  },
  {
    title: 'Rénovation Centre Commercial',
    description: 'Rénovation complète d\'un centre commercial de 5000m² incluant la modernisation des espaces communs, l\'amélioration de l\'éclairage et la mise aux normes de sécurité.',
    category: 'construction',
    status: 'en-cours',
    client: 'Immobilier Plus',
    startDate: new Date('2024-09-01'),
    endDate: new Date('2025-03-31'),
    budget: 150000.00,
    technologies: [],
    images: ['/images/web-cons.jpg'],
    featured: true,
    published: true
  },
  {
    title: 'Site Web Corporate TechInnovate',
    description: 'Création d\'un site web corporate moderne avec blog intégré, section carrières et portfolio de projets. Design responsive et optimisé pour le SEO.',
    category: 'web-dev',
    status: 'termine',
    client: 'TechInnovate',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-04-30'),
    budget: 12000.00,
    technologies: ['Next.js', 'Tailwind CSS', 'Contentful', 'Vercel'],
    images: ['/images/web-saas.jpg'],
    featured: false,
    published: true
  },
  {
    title: 'Système de Transport Médical',
    description: 'Mise en place d\'un système de transport médical d\'urgence avec véhicules spécialisés et personnel qualifié. Service disponible 24h/24.',
    category: 'transport',
    status: 'termine',
    client: 'MediCare Services',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-05-31'),
    budget: 45000.00,
    technologies: [],
    images: ['/images/web-trans.jpg'],
    featured: false,
    published: true
  },
  {
    title: 'Construction Résidence EcoVert',
    description: 'Construction d\'une résidence écologique de 20 logements avec panneaux solaires, récupération d\'eau de pluie et matériaux durables.',
    category: 'construction',
    status: 'en-cours',
    client: 'EcoConstruct',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2025-12-31'),
    budget: 2500000.00,
    technologies: [],
    images: ['/images/web-cons.jpg'],
    featured: false,
    published: true
  }
];

// Fonction pour initialiser la base de données
const seedDatabase = async () => {
  try {
    console.log('🌱 Début de l\'initialisation de la base de données...');

    // Synchroniser les modèles
    await syncDatabase();

    // Vérifier si des données existent déjà
    const contactCount = await Contact.count();
    const projectCount = await Project.count();

    if (contactCount === 0) {
      console.log('📧 Ajout des contacts d\'exemple...');
      await Contact.bulkCreate(sampleContacts);
      console.log(`✅ ${sampleContacts.length} contacts ajoutés`);
    } else {
      console.log(`ℹ️  ${contactCount} contacts déjà présents dans la base`);
    }

    if (projectCount === 0) {
      console.log('🚀 Ajout des projets d\'exemple...');
      await Project.bulkCreate(sampleProjects);
      console.log(`✅ ${sampleProjects.length} projets ajoutés`);
    } else {
      console.log(`ℹ️  ${projectCount} projets déjà présents dans la base`);
    }

    console.log('🎉 Initialisation de la base de données terminée avec succès !');
    
    // Afficher un résumé
    const finalContactCount = await Contact.count();
    const finalProjectCount = await Project.count();
    
    console.log('\n📊 Résumé de la base de données :');
    console.log(`   - Contacts : ${finalContactCount}`);
    console.log(`   - Projets : ${finalProjectCount}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
    throw error;
  }
};

// Exporter la fonction pour utilisation dans d'autres scripts
module.exports = { seedDatabase };

// Exécuter le script si appelé directement
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✨ Script d\'initialisation terminé');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Erreur fatale:', error);
      process.exit(1);
    });
}
