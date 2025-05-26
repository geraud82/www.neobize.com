const { sequelize } = require('../config/database');
const Contact = require('./Contact');
const Project = require('./Project');

// Définir les associations entre les modèles si nécessaire
// Exemple : Project.belongsTo(User, { foreignKey: 'userId' });

// Synchroniser les modèles avec la base de données
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Modèles synchronisés avec la base de données.');
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
  }
};

module.exports = {
  sequelize,
  Contact,
  Project,
  syncDatabase
};
