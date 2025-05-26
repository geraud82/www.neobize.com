const express = require('express');
const router = express.Router();
const {
  createContact,
  getAllContacts,
  updateContactStatus
} = require('../controllers/contactController');

// Route publique pour créer un contact
router.post('/', createContact);

// Routes admin (nécessitent une authentification)
router.get('/', getAllContacts);
router.patch('/:id/status', updateContactStatus);

module.exports = router;
