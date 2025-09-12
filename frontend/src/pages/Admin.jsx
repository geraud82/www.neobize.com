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
  Users
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { 
  login, 
  logout, 
  isAuthenticated, 
  getAllPosts, 
  createPost, 
  updatePost, 
  deletePost,
  getCategories,
  uploadImage
} from '../services/api'

const Admin = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  // Authentication state
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  
  // Blog posts state
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPost, setCurrentPost] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')
  
  // Form state for new/edit post
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'web-dev',
    author: '',
    image: '',
    tags: '',
    published: false
  })
  
  // Categories
  const [categories, setCategories] = useState([])
  
  // Dashboard stats (mock data)
  const stats = [
    { 
      title: 'Articles publiés', 
      value: posts.filter(post => post.published).length,
      icon: <FileText className="text-blue-500" />,
      change: '+12%',
      trend: 'up'
    },
    { 
      title: 'Brouillons', 
      value: posts.filter(post => !post.published).length,
      icon: <Edit className="text-amber-500" />,
      change: '+5%',
      trend: 'up'
    },
    { 
      title: 'Vues totales', 
      value: '2,845',
      icon: <Eye className="text-green-500" />,
      change: '+18%',
      trend: 'up'
    },
    { 
      title: 'Commentaires', 
      value: '48',
      icon: <MessageSquare className="text-purple-500" />,
      change: '-3%',
      trend: 'down'
    }
  ]
  
  // Monthly views data for chart (mock data)
  const monthlyViews = [
    { month: 'Jan', views: 1200 },
    { month: 'Fév', views: 1900 },
    { month: 'Mar', views: 1500 },
    { month: 'Avr', views: 2100 },
    { month: 'Mai', views: 2400 },
    { month: 'Juin', views: 1800 }
  ]
  
  // Login function
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    
    try {
      await login({ username, password })
      setIsUserAuthenticated(true)
      fetchPosts()
    } catch (error) {
      setLoginError(error.message || 'Nom d\'utilisateur ou mot de passe incorrect')
    }
  }
  
  // Logout function
  const handleLogout = () => {
    logout()
    setIsUserAuthenticated(false)
    navigate('/admin')
  }
  
  // Fetch posts and categories from API
  const fetchPosts = async () => {
    setIsLoading(true)
    
    try {
      const [posts, categoriesData] = await Promise.all([
        getAllPosts(),
        getCategories()
      ])
      
      setPosts(posts)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error)
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
      image: '',
      tags: '',
      published: false
    })
    setIsEditing(true)
    setShowPreview(false)
    setActiveSection('articles')
  }
  
  // Edit post
  const editPost = (post) => {
    setCurrentPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      image: post.image,
      tags: post.tags.join(', '),
      published: post.published
    })
    setIsEditing(true)
    setShowPreview(false)
    setActiveSection('articles')
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
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
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
    
    // Create new post object
    const postData = {
      ...formData,
      tags: tagsArray,
      readTime: `${Math.max(1, Math.ceil(formData.content.length / 2000))} min`
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
      setIsEditing(false)
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
  }
  
  // Toggle preview mode
  const togglePreview = () => {
    setShowPreview(!showPreview)
  }
  
  // Sort posts
  const sortPosts = (posts) => {
    return [...posts].sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'author':
          comparison = a.author.localeCompare(b.author)
          break
        case 'date':
        default:
          comparison = new Date(b.date) - new Date(a.date)
          break
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }
  
  // Filter posts based on search query, status filter, and category filter
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && post.published) ||
                         (filterStatus === 'draft' && !post.published)
    
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })
  
  // Get sorted and filtered posts
  const sortedAndFilteredPosts = sortPosts(filteredPosts)
  
  // Check if user is already authenticated on component mount
  useEffect(() => {
    const auth = isAuthenticated()
    setIsUserAuthenticated(auth)
    
    if (auth) {
      fetchPosts()
    }
  }, [])
  
  // If not authenticated, show login form
  if (!isUserAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-midnight flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-midnight mb-2">NEOBIZE</h1>
            <p className="text-gray-600">Connectez-vous à votre espace d'administration</p>
          </div>
          
          <form onSubmit={handleLogin}>
            {loginError && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
                <div className="flex items-center">
                  <X size={18} className="mr-2 flex-shrink-0" />
                  <p>{loginError}</p>
                </div>
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Nom d'utilisateur
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="mb-8">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center"
            >
              Se connecter
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} NEOBIZE. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-midnight text-white shadow-xl transform lg:translate-x-0 lg:static lg:inset-auto">
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">NEOBIZE Admin</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white p-1 rounded-md hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-800 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium">Admin</p>
              <p className="text-xs text-gray-400">Administrateur</p>
            </div>
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveSection('dashboard')}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'dashboard' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <LayoutDashboard size={18} className="mr-3" />
              Tableau de bord
            </button>
            
            <button 
              onClick={() => setActiveSection('articles')}
              className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                activeSection === 'articles' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <FileText size={18} className="mr-3" />
              Articles
            </button>
            
            <button 
              onClick={() => navigate('/admin/settings')}
              className="flex items-center w-full px-3 py-2 rounded-lg transition-colors text-gray-300 hover:bg-gray-800"
            >
              <SettingsIcon size={18} className="mr-3" />
              Paramètres
            </button>
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t border-gray-800 pt-4 flex flex-col space-y-2">
            <button
              onClick={() => navigate('/')}
              className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            >
              <Eye size={18} className="mr-3" />
              Voir le site
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
            >
              <LogOut size={18} className="mr-3" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-500 p-1 rounded-md hover:bg-gray-100 mr-3"
              >
                <Menu size={24} />
              </button>
              
              <h2 className="text-xl font-bold text-gray-800">
                {activeSection === 'dashboard' && 'Tableau de bord'}
                {activeSection === 'articles' && 'Gestion des articles'}
              </h2>
            </div>
            
            {activeSection === 'articles' && !isEditing && (
              <button
                onClick={createNewPost}
                className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus size={18} />
                Nouvel article
              </button>
            )}
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="text-gray-500 p-1 rounded-md hover:bg-gray-100 relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              
              <div className="h-8 w-px bg-gray-200"></div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <div className="ml-2 hidden md:block">
                  <p className="text-sm font-medium">Admin</p>
                </div>
                <ChevronDown size={16} className="ml-1 text-gray-500" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Dashboard */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-500 text-sm">{stat.title}</p>
                        <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        <div className={`flex items-center mt-2 text-sm ${
                          stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {stat.trend === 'up' ? (
                            <TrendingUp size={14} className="mr-1" />
                          ) : (
                            <ArrowDownRight size={14} className="mr-1" />
                          )}
                          <span>{stat.change} depuis le mois dernier</span>
                        </div>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-50">
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Charts and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold">Vues mensuelles</h3>
                    <div className="flex items-center space-x-2">
                      <select className="text-sm border border-gray-200 rounded-md px-2 py-1">
                        <option>6 derniers mois</option>
                        <option>12 derniers mois</option>
                        <option>Cette année</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="h-64 flex items-end space-x-2">
                    {monthlyViews.map((item, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-blue-500 rounded-t-md hover:bg-blue-600 transition-all duration-200"
                          style={{ height: `${(item.views / 2500) * 100}%` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-2">{item.month}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4">Activité récente</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mr-3 flex-shrink-0">
                        <FileText size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nouvel article publié</p>
                        <p className="text-xs text-gray-500">Il y a 2 heures</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500 mr-3 flex-shrink-0">
                        <MessageSquare size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nouveau commentaire</p>
                        <p className="text-xs text-gray-500">Il y a 4 heures</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-500 mr-3 flex-shrink-0">
                        <Edit size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Article mis à jour</p>
                        <p className="text-xs text-gray-500">Il y a 1 jour</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 mr-3 flex-shrink-0">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Nouveau visiteur</p>
                        <p className="text-xs text-gray-500">Il y a 1 jour</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 text-sm text-primary font-medium hover:underline">
                    Voir toutes les activités
                  </button>
                </div>
              </div>
              
              {/* Recent Posts */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">Articles récents</h3>
                  <button 
                    onClick={() => setActiveSection('articles')}
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    Voir tous les articles
                  </button>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {posts.slice(0, 5).map(post => (
                    <div
                      key={post.id}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-medium text-gray-900 truncate">{post.title}</h4>
                          <p className="text-sm text-gray-500 mt-1 truncate">{post.excerpt}</p>
                          <div className="flex items-center mt-2 space-x-3">
                            <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                              post.published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {post.published ? 'Publié' : 'Brouillon'}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <CalendarIcon size={12} className="mr-1" />
                              {post.date || '15 mai 2025'}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <User size={12} className="mr-1" />
                              {post.author}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button 
                            onClick={() => editPost(post)}
                            className="p-1 text-gray-400 hover:text-primary transition-colors"
                          >
                            <Edit size={16} />
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
            <div className="space-y-6">
              {/* Bouton "Nouvel article" en haut de la page */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={createNewPost}
                  className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus size={18} />
                  Nouvel article
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 min-w-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher un article..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div className="relative">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">Tous</option>
                      <option value="published">Publiés</option>
                      <option value="draft">Brouillons</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <Filter size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800">Articles ({filteredPosts.length})</h3>
                </div>
                
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement des articles...</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredPosts.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-600">Aucun article trouvé</p>
                      </div>
                    ) : (
                      filteredPosts.map(post => (
                        <div
                          key={post.id}
                          className="p-4 border-l-4 cursor-pointer transition-colors border-l-transparent hover:bg-gray-50"
                          onClick={() => editPost(post)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-medium text-gray-900 truncate">{post.title}</h4>
                              <p className="text-sm text-gray-500 mt-1 truncate">{post.excerpt}</p>
                              <div className="flex items-center mt-2 space-x-3">
                                <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                                  post.published 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {post.published ? 'Publié' : 'Brouillon'}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <CalendarIcon size={12} className="mr-1" />
                                  {post.date || '15 mai 2025'}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center">
                                  <User size={12} className="mr-1" />
                                  {post.author}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  editPost(post);
                                }}
                                className="p-1 text-gray-400 hover:text-primary transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeletePost(post.id);
                                }}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
                              >
                                <Trash2 size={16} />
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
          
          {/* Articles Management - Edit View */}
          {activeSection === 'articles' && isEditing && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  {currentPost ? 'Modifier l\'article' : 'Nouvel article'}
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={togglePreview}
                    className={`flex items-center justify-center gap-2 px-4 py-2 border ${
                      showPreview ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'
                    } rounded-lg hover:bg-gray-50 transition-colors`}
                  >
                    <Eye size={18} />
                    {showPreview ? 'Éditer' : 'Prévisualiser'}
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <X size={18} />
                    Annuler
                  </button>
                  <button
                    onClick={savePost}
                    className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Save size={18} />
                    Enregistrer
                  </button>
                </div>
              </div>
              
              {saveSuccess && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
                  <div className="flex items-center">
                    <Check size={18} className="mr-2 flex-shrink-0" />
                    <p>Article enregistré avec succès!</p>
                  </div>
                </div>
              )}
              
              {saveError && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                  <div className="flex items-center">
                    <X size={18} className="mr-2 flex-shrink-0" />
                    <p>{saveError}</p>
                  </div>
                </div>
              )}
              
              {!showPreview ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Form */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-6 space-y-6">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Titre *
                          </label>
                          <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                            Extrait *
                          </label>
                          <textarea
                            id="excerpt"
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                          ></textarea>
                        </div>
                        
                        <div>
                          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                            Contenu *
                          </label>
                          <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center space-x-2">
                              <button type="button" className="p-1 rounded hover:bg-gray-200" title="Gras">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                                  <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                                </svg>
                              </button>
                              <button type="button" className="p-1 rounded hover:bg-gray-200" title="Italique">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="19" y1="4" x2="10" y2="4"></line>
                                  <line x1="14" y1="20" x2="5" y2="20"></line>
                                  <line x1="15" y1="4" x2="9" y2="20"></line>
                                </svg>
                              </button>
                              <button type="button" className="p-1 rounded hover:bg-gray-200" title="Souligné">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
                                  <line x1="4" y1="21" x2="20" y2="21"></line>
                                </svg>
                              </button>
                              <div className="h-6 w-px bg-gray-300 mx-1"></div>
                              <button type="button" className="p-1 rounded hover:bg-gray-200" title="Lien">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                              </button>
                              <button type="button" className="p-1 rounded hover:bg-gray-200" title="Image">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                  <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                              </button>
                              <div className="h-6 w-px bg-gray-300 mx-1"></div>
                              <button type="button" className="p-1 rounded hover:bg-gray-200" title="Liste à puces">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="8" y1="6" x2="21" y2="6"></line>
                                  <line x1="8" y1="12" x2="21" y2="12"></line>
                                  <line x1="8" y1="18" x2="21" y2="18"></line>
                                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                              </button>
                              <button type="button" className="p-1 rounded hover:bg-gray-200" title="Liste numérotée">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="10" y1="6" x2="21" y2="6"></line>
                                  <line x1="10" y1="12" x2="21" y2="12"></line>
                                  <line x1="10" y1="18" x2="21" y2="18"></line>
                                  <path d="M4 6h1v4"></path>
                                  <path d="M4 10h2"></path>
                                  <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                                </svg>
                              </button>
                            </div>
                            <textarea
                              id="content"
                              name="content"
                              value={formData.content}
                              onChange={handleInputChange}
                              rows={15}
                              className="w-full px-4 py-2 border-none focus:outline-none focus:ring-0"
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sidebar */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="font-medium text-gray-800">Paramètres de publication</h3>
                      </div>
                      <div className="p-6 space-y-6">
                        <div>
                          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                            Auteur *
                          </label>
                          <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                            Catégorie
                          </label>
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="web-dev">Développement Web</option>
                            <option value="mobile-dev">Développement Mobile</option>
                            <option value="design">Design</option>
                            <option value="business">Business</option>
                            <option value="marketing">Marketing</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                            Tags (séparés par des virgules)
                          </label>
                          <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                            Image principale
                          </label>
                          {formData.image && (
                            <div className="mb-3">
                              <img 
                                src={formData.image} 
                                alt="Aperçu de l'image" 
                                className="h-40 w-auto object-cover rounded-lg border border-gray-300" 
                              />
                            </div>
                          )}
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                            <div className="space-y-1 text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <div className="flex text-sm text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/90 focus-within:outline-none">
                                  <span>Télécharger un fichier</span>
                                  <input 
                                    id="file-upload" 
                                    name="file-upload" 
                                    type="file" 
                                    className="sr-only" 
                                    accept="image/png, image/jpeg, image/gif"
                                    onChange={async (e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        try {
                                          const file = e.target.files[0];
                                          // Vérifier la taille du fichier (max 10MB)
                                          if (file.size > 10 * 1024 * 1024) {
                                            alert('Le fichier est trop volumineux. La taille maximale est de 10MB.');
                                            return;
                                          }
                                          
                                          // Télécharger l'image
                                          const imageUrl = await uploadImage(file);
                                          
                                          // Mettre à jour le formulaire avec l'URL de l'image
                                          setFormData({
                                            ...formData,
                                            image: imageUrl
                                          });
                                        } catch (error) {
                                          console.error('Erreur lors du téléchargement de l\'image:', error);
                                          alert('Erreur lors du téléchargement de l\'image: ' + error.message);
                                        }
                                      }
                                    }}
                                  />
                                </label>
                                <p className="pl-1">ou glisser-déposer</p>
                              </div>
                              <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="published"
                            name="published"
                            checked={formData.published}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                            Publier l'article
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">Prévisualisation</h3>
                    <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${
                      formData.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {formData.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="max-w-3xl mx-auto">
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title || 'Titre de l\'article'}</h1>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-6">
                        <span className="flex items-center">
                          <User size={14} className="mr-1" />
                          {formData.author || 'Auteur'}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <CalendarIcon size={14} className="mr-1" />
                          {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {Math.max(1, Math.ceil(formData.content.length / 2000))} min de lecture
                        </span>
                      </div>
                      
                      <div className="prose prose-lg max-w-none">
                        <p className="text-lg text-gray-700 mb-6">{formData.excerpt || 'Extrait de l\'article...'}</p>
                        
                        <div className="whitespace-pre-wrap">
                          {formData.content || 'Contenu de l\'article...'}
                        </div>
                      </div>
                      
                      {formData.tags && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                          <div className="flex flex-wrap gap-2">
                            {formData.tags.split(',').map((tag, index) => (
                              tag.trim() && (
                                <span key={index} className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                                  <Tag size={12} className="mr-1" />
                                  {tag.trim()}
                                </span>
                              )
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Admin
