/**
 * Service API pour gérer les appels au backend
 */

// URL de base de l'API (utilise les variables d'environnement)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Récupère le token d'authentification stocké
 * @returns {string|null} - Token d'authentification ou null si non authentifié
 */
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

/**
 * Ajoute le token d'authentification aux en-têtes si disponible
 * @param {Object} headers - En-têtes HTTP de base
 * @returns {Object} - En-têtes HTTP avec token d'authentification si disponible
 */
const addAuthHeader = (headers = {}) => {
  const token = getAuthToken();
  
  if (token) {
    return {
      ...headers,
      'Authorization': `Bearer ${token}`
    };
  }
  
  return headers;
};

/**
 * Authentifie un utilisateur
 * @param {Object} credentials - Identifiants (username, password)
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur d\'authentification');
    }
    
    // Stocker le token dans le localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    throw error;
  }
};

/**
 * Déconnecte l'utilisateur
 */
export const logout = () => {
  localStorage.removeItem('authToken');
};

/**
 * Vérifie si l'utilisateur est authentifié
 * @returns {boolean} - True si l'utilisateur est authentifié, false sinon
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Récupère tous les articles de blog publiés
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const getPublishedPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/blog/posts`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération des articles');
    }
    
    return data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    throw error;
  }
};

/**
 * Récupère tous les articles de blog (admin)
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/posts`, {
      headers: addAuthHeader()
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération des articles');
    }
    
    return data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    throw error;
  }
};

/**
 * Crée un nouvel article de blog
 * @param {Object} postData - Données de l'article
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const createPost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/posts`, {
      method: 'POST',
      headers: addAuthHeader({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(postData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la création de l\'article');
    }
    
    return data.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error);
    throw error;
  }
};

/**
 * Met à jour un article de blog existant
 * @param {number} postId - ID de l'article à mettre à jour
 * @param {Object} postData - Nouvelles données de l'article
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const updatePost = async (postId, postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/posts/${postId}`, {
      method: 'PUT',
      headers: addAuthHeader({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(postData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la mise à jour de l\'article');
    }
    
    return data.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'article:', error);
    throw error;
  }
};

/**
 * Supprime un article de blog
 * @param {number} postId - ID de l'article à supprimer
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/posts/${postId}`, {
      method: 'DELETE',
      headers: addAuthHeader()
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la suppression de l\'article');
    }
    
    return data;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error);
    throw error;
  }
};

/**
 * Récupère toutes les catégories
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération des catégories');
    }
    
    return data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }
};

/**
 * Récupère toutes les catégories (admin)
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const getAllCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/categories`, {
      headers: addAuthHeader()
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la récupération des catégories');
    }
    
    return data.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    throw error;
  }
};

/**
 * Crée une nouvelle catégorie
 * @param {Object} categoryData - Données de la catégorie
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const createCategory = async (categoryData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/categories`, {
      method: 'POST',
      headers: addAuthHeader({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(categoryData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la création de la catégorie');
    }
    
    return data.data;
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    throw error;
  }
};

/**
 * Supprime une catégorie
 * @param {string} categoryId - ID de la catégorie à supprimer
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const deleteCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${categoryId}`, {
      method: 'DELETE',
      headers: addAuthHeader()
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la suppression de la catégorie');
    }
    
    return data;
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    throw error;
  }
};

/**
 * Télécharge une image pour un article
 * @param {File} file - Fichier image à télécharger
 * @returns {Promise} - Promesse contenant la réponse de l'API avec l'URL de l'image
 */
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/admin/upload`, {
      method: 'POST',
      headers: addAuthHeader(),
      body: formData,
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors du téléchargement de l\'image');
    }
    
    return data.data; // Contient l'URL de l'image téléchargée
  } catch (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    throw error;
  }
};

/**
 * Met à jour les informations d'authentification
 * @param {Object} credentials - Nouvelles informations d'authentification
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const updateCredentials = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/credentials`, {
      method: 'PUT',
      headers: addAuthHeader({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de la mise à jour des informations d\'authentification');
    }
    
    return data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour des informations d\'authentification:', error);
    throw error;
  }
};

/**
 * Envoie un message via le formulaire de contact
 * @param {Object} formData - Données du formulaire (name, email, phone, subject, message)
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const sendContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue lors de l\'envoi du formulaire.');
    }
    
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du formulaire:', error);
    throw error;
  }
};

/**
 * S'abonne à la newsletter
 * @param {string} email - Adresse email pour l'abonnement
 * @returns {Promise} - Promesse contenant la réponse de l'API
 */
export const subscribeToNewsletter = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue lors de l\'abonnement à la newsletter.');
    }
    
    return data;
  } catch (error) {
    console.error('Erreur lors de l\'abonnement à la newsletter:', error);
    throw error;
  }
};
