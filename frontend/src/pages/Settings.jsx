import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Save, 
  Plus, 
  Trash2, 
  LogOut, 
  Settings as SettingsIcon,
  User,
  Key,
  Tag,
  Check,
  X,
  ChevronLeft
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { 
  isAuthenticated, 
  logout, 
  getAllCategories, 
  createCategory, 
  deleteCategory, 
  updateCredentials 
} from '../services/api'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const Settings = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  // Authentication state
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  
  // Settings state
  const [activeTab, setActiveTab] = useState('categories')
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [newCategory, setNewCategory] = useState({ id: '', name: '' })
  const [credentials, setCredentials] = useState({
    username: 'admin',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  
  // Alerts state
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')
  
  // Handle category form input changes
  const handleCategoryChange = (e) => {
    const { name, value } = e.target
    setNewCategory({
      ...newCategory,
      [name]: name === 'id' ? value.toLowerCase().replace(/\s+/g, '-') : value
    })
  }
  
  // Fetch categories
  const fetchCategories = async () => {
    setIsLoading(true)
    try {
      const categoriesData = await getAllCategories()
      setCategories(categoriesData)
    } catch (error) {
      setSaveError('Erreur lors de la récupération des catégories')
      console.error('Erreur lors de la récupération des catégories:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  // Add new category
  const addCategory = async (e) => {
    e.preventDefault()
    
    if (!newCategory.id || !newCategory.name) {
      setSaveError('Veuillez remplir tous les champs')
      return
    }
    
    if (categories.some(cat => cat.id === newCategory.id)) {
      setSaveError('Une catégorie avec cet identifiant existe déjà')
      return
    }
    
    try {
      const createdCategory = await createCategory(newCategory)
      setCategories([...categories, createdCategory])
      setNewCategory({ id: '', name: '' })
      setSaveSuccess(true)
      setSaveError('')
      
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    } catch (error) {
      setSaveError(error.message || 'Erreur lors de la création de la catégorie')
    }
  }
  
  // Delete category
  const handleDeleteCategory = async (categoryId) => {
    if (categories.length <= 1) {
      setSaveError('Vous devez conserver au moins une catégorie')
      return
    }
    
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await deleteCategory(categoryId)
        setCategories(categories.filter(cat => cat.id !== categoryId))
        setSaveSuccess(true)
        setSaveError('')
        
        setTimeout(() => {
          setSaveSuccess(false)
        }, 3000)
      } catch (error) {
        setSaveError(error.message || 'Erreur lors de la suppression de la catégorie')
      }
    }
  }
  
  // Handle credentials form input changes
  const handleCredentialsChange = (e) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials,
      [name]: value
    })
  }
  
  // Save new credentials
  const saveCredentials = async (e) => {
    e.preventDefault()
    
    if (!credentials.username) {
      setSaveError('Le nom d\'utilisateur ne peut pas être vide')
      return
    }
    
    if (credentials.newPassword) {
      if (!credentials.currentPassword) {
        setSaveError('Veuillez saisir votre mot de passe actuel')
        return
      }
      
      if (credentials.newPassword !== credentials.confirmPassword) {
        setSaveError('Les nouveaux mots de passe ne correspondent pas')
        return
      }
      
      if (credentials.newPassword.length < 6) {
        setSaveError('Le nouveau mot de passe doit contenir au moins 6 caractères')
        return
      }
    }
    
    try {
      await updateCredentials({
        username: credentials.username,
        currentPassword: credentials.currentPassword,
        newPassword: credentials.newPassword || undefined
      })
      
      setSaveSuccess(true)
      setSaveError('')
      
      // Réinitialiser les champs de mot de passe
      setCredentials({
        ...credentials,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    } catch (error) {
      setSaveError(error.message || 'Erreur lors de la mise à jour des informations d\'authentification')
    }
  }
  
  // Logout function
  const handleLogout = () => {
    logout()
    setIsUserAuthenticated(false)
    navigate('/admin')
  }
  
  // Check if user is already authenticated and fetch data on component mount
  useEffect(() => {
    const auth = isAuthenticated()
    setIsUserAuthenticated(auth)
    
    if (!auth) {
      navigate('/admin')
    } else {
      fetchCategories()
    }
  }, [navigate])
  
  if (!isUserAuthenticated) {
    return null // Redirect handled in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-midnight text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">NEOBIZE Admin</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="text-white hover:text-gray-300 transition-colors flex items-center gap-1"
            >
              <ChevronLeft size={16} />
              Retour
            </button>
            <button
              onClick={() => navigate('/')}
              className="text-white hover:text-gray-300 transition-colors"
            >
              Voir le site
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-midnight">Paramètres</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'categories'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('categories')}
            >
              <Tag size={16} className="inline mr-2" />
              Catégories
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'account'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('account')}
            >
              <User size={16} className="inline mr-2" />
              Compte
            </button>
          </div>
          
          <div className="p-6">
            {saveSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center">
                <Check size={16} className="mr-2" />
                Modifications enregistrées avec succès
              </div>
            )}
            
            {saveError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
                <X size={16} className="mr-2" />
                {saveError}
              </div>
            )}
            
            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Gestion des catégories d'articles</h3>
                
                <div className="mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-gray-700 mb-2">Ajouter une nouvelle catégorie</h4>
                    <form onSubmit={addCategory} className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                          Identifiant
                        </label>
                        <input
                          type="text"
                          id="id"
                          name="id"
                          value={newCategory.id}
                          onChange={handleCategoryChange}
                          placeholder="ex: web-dev"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nom
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={newCategory.name}
                          onChange={handleCategoryChange}
                          placeholder="ex: Développement Web"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
                        >
                          <Plus size={16} />
                          Ajouter
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <h4 className="font-medium text-gray-700 mb-2">Catégories existantes</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Identifiant
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nom
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {categories.map((category) => (
                          <tr key={category.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {category.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {category.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                onClick={() => handleDeleteCategory(category.id)}
                                className="text-red-600 hover:text-red-900 transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Account Tab */}
            {activeTab === 'account' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Paramètres du compte</h3>
                
                <form onSubmit={saveCredentials} className="space-y-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom d'utilisateur
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={credentials.username}
                      onChange={handleCredentialsChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-700 mb-2">Changer le mot de passe</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Mot de passe actuel
                        </label>
                        <input
                          type="password"
                          id="currentPassword"
                          name="currentPassword"
                          value={credentials.currentPassword}
                          onChange={handleCredentialsChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={credentials.newPassword}
                          onChange={handleCredentialsChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirmer le nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={credentials.confirmPassword}
                          onChange={handleCredentialsChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1"
                    >
                      <Save size={16} />
                      Enregistrer les modifications
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
