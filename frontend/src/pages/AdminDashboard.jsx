import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Save, 
  Trash2, 
  Edit, 
  Plus, 
  LogOut, 
  Eye, 
  Calendar, 
  Clock, 
  Tag, 
  User,
  Check,
  X,
  Settings as SettingsIcon,
  LayoutDashboard,
  FileText,
  Menu,
  ChevronDown,
  Search,
  Filter,
  Bell,
  BarChart2,
  TrendingUp,
  MessageSquare,
  Calendar as CalendarIcon,
  ArrowDownRight,
  Users,
  ArrowLeft,
  Upload,
  Globe,
  EyeOff
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { 
  logout, 
  getAllPosts, 
  createPost, 
  updatePost, 
  deletePost,
  publishPost,
  unpublishPost,
  uploadImage
} from '../services/api'

const AdminDashboard = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  
  // Blog posts state
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPost, setCurrentPost] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  
  // Form state for new/edit post
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'web-dev',
    author: '',
    featuredImage: '',
    tags: '',
    status: 'draft'
  })
  
  // Categories options
  const categories = [
    { value: 'web-dev', label: 'Développement Web' },
    { value: 'transport', label: 'Transport' },
    { value: 'construction', label: 'Construction' },
    { value: 'general', label: 'Général' }
  ]
  
  // Dashboard stats
  const stats = [
    { 
      title: 'Articles publiés', 
      value: posts.filter(post => post.status === 'published').length,
      icon: <FileText className="text-blue-500" />,
      change: '+12%',
      trend: 'up'
    },
    { 
      title: 'Brouillons', 
      value: posts.filter(post => post.status === 'draft').length,
      icon: <Edit className="text-amber-500" />,
      change: '+5%',
      trend: 'up'
    },
    { 
      title: 'Vues totales', 
      value: posts.reduce((total, post) => total + (post.views || 0), 0),
      icon: <Eye className="text-green-500" />,
      change: '+18%',
      trend: 'up'
    },
    { 
      title: 'Total articles', 
      value: posts.length,
      icon: <MessageSquare className="text-purple-500" />,
      change: '+3%',
      trend: 'up'
    }
  ]
  
  // Logout function
  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }
  
  // Fetch posts from API
  const fetchPosts = async () => {
    setIsLoading(true)
    
    try {
      const postsData = await getAllPosts()
      setPosts(postsData || [])
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error)
      setPosts([])
    } finally {
      setIsLoading(false)
    }
  }
  
  // Create new post form
  const createNewPost = () => {
    setCurrentPost(null)
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'web-dev',
      author: '',
      featuredImage: '',
      tags: '',
      status: 'draft'
    })
    setIsEditing(true)
    setShowPreview(false)
    setActiveSection('articles')
    setSidebarOpen(false)
  }
  
  // Edit post
  const editPost = (post) => {
    setCurrentPost(post)
    setFormData({
      title: post.title || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      category: post.category || 'web-dev',
      author: post.author || '',
      featuredImage: post.featuredImage || '',
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      status: post.status || 'draft'
    })
    setIsEditing(true)
    setShowPreview(false)
    setActiveSection('articles')
    setSidebarOpen(false)
  }
  
  // Delete post
  const handleDeletePost = async (postId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await deletePost(postId)
        setPosts(posts.filter(post => post.id !== postId))
        
        if (currentPost && currentPost.id === postId) {
          setCurrentPost(null)
          setIsEditing(false)
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'article:', error)
        alert('Erreur lors de la suppression de l\'article: ' + error.message)
      }
    }
  }
  
  // Toggle publish status
  const togglePublishStatus = async (post) => {
    try {
      let updatedPost
      if (post.status === 'published') {
        updatedPost = await unpublishPost(post.id)
      } else {
        updatedPost = await publishPost(post.id)
      }
      
      setPosts(posts.map(p => p.id === post.id ? updatedPost : p))
      
      if (currentPost && currentPost.id === post.id) {
        setCurrentPost(updatedPost)
        setFormData(prev => ({ ...prev, status: updatedPost.status }))
      }
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error)
      alert('Erreur lors du changement de statut: ' + error.message)
    }
  }
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  
  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    setIsUploading(true)
    try {
      const imageUrl = await uploadImage(file)
      setFormData({ ...formData, featuredImage: imageUrl })
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error)
      alert('Erreur lors du téléchargement de l\'image: ' + error.message)
    } finally {
      setIsUploading(false)
    }
  }
  
  // Save post
  const savePost = async (e) => {
    e.preventDefault()
    setSaveSuccess(false)
    setSaveError('')
    
    // Validate form
    if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
      setSaveError('Veuillez remplir tous les champs obligatoires')
      return
    }
    
    // Process tags
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '')
    
    // Create post object
    const postData = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      author: formData.author,
      featuredImage: formData.featuredImage,
      tags: tagsArray,
      status: formData.status
    }
    
    try {
      if (currentPost) {
        // Update existing post
        const updatedPost = await updatePost(currentPost.id, postData)
        setPosts(posts.map(post => post.id === currentPost.id ? updatedPost : post))
        setCurrentPost(updatedPost)
      } else {
        // Create new post
        const newPost = await createPost(postData)
        setPosts([newPost, ...posts])
        setCurrentPost(newPost)
      }
      
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'article:', error)
      setSaveError(error.message || 'Erreur lors de l\'enregistrement de l\'article')
    }
  }
  
  // Cancel editing
  const cancelEditing = () => {
    setIsEditing(false)
    setShowPreview(false)
    setSaveError('')
    setCurrentPost(null)
  }
  
  // Toggle preview mode
  const togglePreview = () => {
    setShowPreview(!showPreview)
  }
  
  // Filter and sort posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || post.status === filterStatus
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })
  
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'title':
        comparison = (a.title || '').localeCompare(b.title || '')
        break
      case 'author':
        comparison = (a.author || '').localeCompare(b.author || '')
        break
      case 'createdAt':
      default:
        comparison = new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        break
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date inconnue'
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  // Fetch data on component mount
  useEffect(() => {
    fetchPosts()
  }, [])
  
  // Handle sidebar responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-midnight text-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 lg:px-6 border-b border-gray-800">
          <h1 className="text-lg lg:text-xl font-bold">NEOBIZE Admin</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white p-1 rounded-md hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-800 rounded-lg">
            <div className="w-8 lg:w-10 h-8 lg:h-10 rounded-full bg-primary flex items-center justify-center">
              <User size={16} className="lg:w-5 lg:h-5" />
            </div>
            <div>
              <p className="font-medium text-sm lg:text-base">Admin</p>
              <p className="text-xs text-gray-400">Administrateur</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => {
                setActiveSection('dashboard')
                setIsEditing(false)
                setSidebarOpen(false)
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors text-sm lg:text-base ${
                activeSection === 'dashboard' && !isEditing
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <LayoutDashboard size={16} className="mr-3 lg:w-5 lg:h-5" />
              Tableau de bord
            </button>
            
            <button 
              onClick={() => {
                setActiveSection('articles')
                setIsEditing(false)
                setSidebarOpen(false)
              }}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors text-sm lg:text-base ${
                activeSection === 'articles' && !isEditing
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <FileText size={16} className="mr-3 lg:w-5 lg:h-5" />
              Articles
            </button>
            
            <button 
              onClick={() => {
                navigate('/admin/settings')
                setSidebarOpen(false)
              }}
              className="flex items-center w-full px-3 py-2 rounded-lg transition-colors text-gray-300 hover:bg-gray-800 text-sm lg:text-base"
            >
              <SettingsIcon size={16} className="mr-3 lg:w-5 lg:h-5" />
              Paramètres
            </button>
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t border-gray-800 pt-4 flex flex-col space-y-2">
            <button
              onClick={() => {
                navigate('/')
                setSidebarOpen(false)
              }}
              className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors text-sm lg:text-base"
            >
              <Eye size={16} className="mr-3 lg:w-5 lg:h-5" />
              Voir le site
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors text-sm lg:text-base"
            >
              <LogOut size={16} className="mr-3 lg:w-5 lg:h-5" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen w-full lg:w-auto">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-500 p-1 rounded-md hover:bg-gray-100 mr-3"
              >
                <Menu size={24} />
              </button>
              
              {isEditing && (
                <button
                  onClick={cancelEditing}
                  className="mr-3 p-1 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              
              <h2 className="text-lg lg:text-xl font-bold text-gray-800 truncate">
                {isEditing && (currentPost ? 'Modifier l\'article' : 'Nouvel article')}
                {!isEditing && activeSection === 'dashboard' && 'Tableau de bord'}
                {!isEditing && activeSection === 'articles' && 'Gestion des articles'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              {isEditing && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={togglePreview}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors text-sm ${
                      showPreview 
                        ? 'bg-gray-200 text-gray-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Eye size={16} />
                    <span className="hidden sm:inline">Aperçu</span>
                  </button>
                  
                  <button
                    onClick={savePost}
                    className="flex items-center gap-1 bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    <Save size={16} />
                    <span className="hidden sm:inline">Enregistrer</span>
                  </button>
                </div>
              )}
              
              {!isEditing && activeSection === 'articles' && (
                <button
                  onClick={createNewPost}
                  className="flex items-center justify-center gap-1 lg:gap-2 bg-primary text-white px-2 lg:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm lg:text-base"
                >
                  <Plus size={16} className="lg:w-5 lg:h-5" />
                  <span className="hidden sm:inline">Nouvel article</span>
                  <span className="sm:hidden">Nouveau</span>
                </button>
              )}
              
              <div className="relative">
                <button className="text-gray-500 p-1 rounded-md hover:bg-gray-100 relative">
                  <Bell size={18} className="lg:w-5 lg:h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              
              <div className="h-6 lg:h-8 w-px bg-gray-200"></div>
              
              <div className="flex items-center">
                <div className="w-6 lg:w-8 h-6 lg:h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <User size={12} className="lg:w-4 lg:h-4" />
                </div>
                <div className="ml-2 hidden md:block">
                  <p className="text-xs lg:text-sm font-medium">Admin</p>
                </div>
                <ChevronDown size={14} className="ml-1 text-gray-500 lg:w-4 lg:h-4" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {/* Success/Error Messages */}
          {saveSuccess && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
              <Check size={20} className="mr-2" />
              Article enregistré avec succès !
            </div>
          )}
          
          {saveError && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
              <X size={20} className="mr-2" />
              {saveError}
            </div>
          )}
          
          {/* Article Editor */}
          {isEditing && (
            <div className="space-y-6">
              <form onSubmit={savePost} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Form */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Informations de l'article</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Titre *
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Titre de l'article"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Extrait *
                          </label>
                          <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Résumé de l'article"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Catégorie
                            </label>
                            <select
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              {categories.map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Auteur *
                            </label>
                            <input
                              type="text"
                              name="author"
                              value={formData.author}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Nom de l'auteur"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags
                          </label>
                          <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Tag1, Tag2, Tag3"
                          />
                          <p className="text-xs text-gray-500 mt-1">Séparez les tags par des virgules</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image à la une
                          </label>
                          <div className="space-y-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                              disabled={isUploading}
                            />
                            {isUploading && (
                              <p className="text-sm text-blue-600">Téléchargement en cours...</p>
                            )}
                            {formData.featuredImage && (
                              <div className="mt-2">
                                <img
                                  src={formData.featuredImage}
                                  alt="Aperçu"
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Statut
                          </label>
                          <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="draft">Brouillon</option>
                            <option value="published">Publié</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Column - Content */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm p-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Contenu de l'article</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contenu *
                        </label>
                        <textarea
                          name="content"
                          value={formData.content}
                          onChange={handleInputChange}
                          rows={20}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="Contenu de l'article en Markdown"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">Vous pouvez utiliser Markdown pour formater le contenu</p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
          
          {/* Dashboard */}
          {activeSection === 'dashboard' && !isEditing && (
            <div className="space-y-4 lg:space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm p-3 lg:p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <p className="text-gray-500 text-xs lg:text-sm truncate">{stat.title}</p>
                        <h3 className="text-lg lg:text-2xl font-bold mt-1">{stat.value}</h3>
                        <div className={`flex items-center mt-1 lg:mt-2 text-xs lg:text-sm ${
                          stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {stat.trend === 'up' ? (
                            <TrendingUp size={12} className="mr-1 lg:w-3.5 lg:h-3.5" />
                          ) : (
                            <ArrowDownRight size={12} className="mr-1 lg:w-3.5 lg:h-3.5" />
                          )}
                          <span className="truncate">{stat.change}</span>
                        </div>
                      </div>
                      <div className="p-2 lg:p-3 rounded-lg bg-gray-50 ml-2">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Recent Posts */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-base lg:text-lg font-bold text-gray-800">Articles récents</h3>
                  <button 
                    onClick={() => setActiveSection('articles')}
                    className="text-xs lg:text-sm text-primary font-medium hover:underline"
                  >
                    Voir tous
                  </button>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {posts.slice(0, 5).map(post => (
                    <div
                      key={post.id}
                      className="p-3 lg:p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0 pr-2">
                          <h4 className="text-sm lg:text-base font-medium text-gray-900 truncate">{post.title}</h4>
                          <p className="text-xs lg:text-sm text-gray-500 mt-1 truncate">{post.excerpt}</p>
                          <div className="flex items-center mt-2 space-x-2 lg:space-x-3 flex-wrap">
                            <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                              post.status === 'published'
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {post.status === 'published' ? 'Publié' : 'Brouillon'}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <CalendarIcon size={10} className="mr-1" />
                              {formatDate(post.createdAt)}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <User size={10} className="mr-1" />
                              {post.author}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button 
                            onClick={() => editPost(post)}
                            className="p-1 text-gray-400 hover:text-primary transition-colors"
                          >
                            <Edit size={14} className="lg:w-4 lg:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Articles Management - List View */}
          {activeSection === 'articles' && !isEditing && (
            <div className="space-y-4 lg:space-y-6">
              {/* Filters */}
              <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Rechercher des articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 lg:gap-4">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="published">Publiés</option>
                      <option value="draft">Brouillons</option>
                    </select>
                    
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">Toutes les catégories</option>
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Articles List */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100">
                  <h3 className="text-base lg:text-lg font-bold text-gray-800">Articles ({sortedPosts.length})</h3>
                </div>
                
                {isLoading ? (
                  <div className="text-center py-8 lg:py-12">
                    <div className="animate-spin rounded-full h-8 lg:h-10 w-8 lg:w-10 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600 text-sm lg:text-base">Chargement des articles...</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {sortedPosts.length === 0 ? (
                      <div className="text-center py-8 lg:py-12">
                        <FileText size={40} className="mx-auto text-gray-300 mb-4 lg:w-12 lg:h-12" />
                        <p className="text-gray-600 text-sm lg:text-base">Aucun article trouvé</p>
                        <button
                          onClick={createNewPost}
                          className="mt-4 flex items-center justify-center gap-2 bg-primary text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors mx-auto text-sm lg:text-base"
                        >
                          <Plus size={16} className="lg:w-5 lg:h-5" />
                          Créer le premier article
                        </button>
                      </div>
                    ) : (
                      sortedPosts.map(post => (
                        <div
                          key={post.id}
                          className="p-3 lg:p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0 pr-2">
                              <h4 className="text-sm lg:text-base font-medium text-gray-900 truncate">{post.title}</h4>
                              <p className="text-xs lg:text-sm text-gray-500 mt-1 truncate">{post.excerpt}</p>
                              <div className="flex items-center mt-2 space-x-2 lg:space-x-3 flex-wrap">
                                <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                                  post.status === 'published'
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {post.status === 'published' ? 'Publié' : 'Brouillon'}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <CalendarIcon size={10} className="mr-1" />
                                  {formatDate(post.createdAt)}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <User size={10} className="mr-1" />
                                  {post.author}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <Eye size={10} className="mr-1" />
                                  {post.views || 0} vues
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <button 
                                onClick={() => togglePublishStatus(post)}
                                className={`p-1 transition-colors ${
                                  post.status === 'published'
                                    ? 'text-green-600 hover:text-green-800'
                                    : 'text-gray-400 hover:text-green-600'
                                }`}
                                title={post.status === 'published' ? 'Dépublier' : 'Publier'}
                              >
                                {post.status === 'published' ? (
                                  <Globe size={14} className="lg:w-4 lg:h-4" />
                                ) : (
                                  <EyeOff size={14} className="lg:w-4 lg:h-4" />
                                )}
                              </button>
                              <button 
                                onClick={() => editPost(post)}
                                className="p-1 text-gray-400 hover:text-primary transition-colors"
                                title="Modifier"
                              >
                                <Edit size={14} className="lg:w-4 lg:h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeletePost(post.id)}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 size={14} className="lg:w-4 lg:h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
