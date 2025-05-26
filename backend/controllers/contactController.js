const { Contact } = require('../models');
const nodemailer = require('nodemailer');

// Configuration du transporteur email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Créer un nouveau contact
const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation des données
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs obligatoires doivent être remplis'
      });
    }

    // Créer le contact dans la base de données
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });

    // Envoyer l'email de notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: `Nouveau message de contact: ${subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Message reçu le ${new Date().toLocaleString('fr-FR')}</small></p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès',
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Erreur lors de la création du contact:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Récupérer tous les contacts (pour l'admin)
const getAllContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = status ? { status } : {};

    const contacts = await Contact.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: contacts.rows,
      pagination: {
        total: contacts.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(contacts.count / limit)
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

// Mettre à jour le statut d'un contact
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact non trouvé'
      });
    }

    await contact.update({ status });

    res.json({
      success: true,
      message: 'Statut mis à jour avec succès',
      data: contact
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du contact:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur'
    });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  updateContactStatus
};
