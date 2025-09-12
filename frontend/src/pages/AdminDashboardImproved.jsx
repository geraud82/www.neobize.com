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
  EyeOff,
  Type,
  Image,
  Palette,
  RefreshCw,
  Download,
  Share2,
  BookOpen,
  Activity,
  Zap,
  Star,
  Heart,
  ChevronRight,
  MoreVertical,
  Copy,
  ExternalLink
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
import RichTextEditor from '../components/RichTextEditor'
import ArticlePreview from '../components/ArticlePreview'

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
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  
  // Blog posts state
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPost, setCurrentPost] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
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
    { value: 'web-dev', label: 'Développement Web', color: 'bg-blue-100 text-blue-800', icon: '💻' },
    { value: 'transport', label: 'Transport', color: 'bg-green-100 text-green-800', icon: '🚛' },
    { value: 'construction', label: 'Construction', color: 'bg-orange-100 text-orange-800', icon: '🏗️' },
    { value: 'general', label: 'Général', color: 'bg-gray-100 text-gray-800', icon: '📝' }
  ]
  
  // Dashboard stats with enhanced data
  const stats = [
    { 
      title: 'Articles publiés', 
      value: posts.filter(post => post.status === 'published').length,
      icon: <Globe className="text-emerald-500" />,
      change: '+12%',
      trend: 'up',
      color: 'bg-emerald-50 border-emerald-200',
      description: 'Articles visibles publiquement'
    },
    { 
      title: 'Brouillons', 
      value: posts.filter(post => post.status === 'draft').length,
      icon: <Edit className="text-amber-500" />,
      change: '+5%',
      trend: 'up',
      color: 'bg-amber-50 border-amber-200',
      description: 'Articles en cours de rédaction'
    },
    { 
      title: 'Vues totales', 
      value: posts.reduce((total, post) => total + (post.views || 0), 0),
      icon: <Eye className="text-blue-500" />,
      change: '+18%',
      trend: 'up',
      color: 'bg-blue-50 border-blue-200',
      description: 'Nombre total de vues'
    },
    { 
      title: 'Total articles', 
      value: posts.length,
      icon: <BookOpen className="text-purple-500" />,
      change: '+3%',
      trend: 'up',
      color: 'bg-purple-50 border-purple-200',
      description: 'Tous les articles créés'
    }
  ]

  // Recent activity mock data
  const recentActivity = [
    { type: 'create', title: 'Nouvel article créé', time: '2 min', icon: <Plus className="text-green-500" /> },
    { type: 'edit', title: 'Article modifié', time: '15 min', icon: <Edit className="text-blue-500" /> },
    { type: 'publish', title: 'Article publié', time: '1h', icon: <Globe className="text-emerald-500" /> },
    { type: 'view', title: '50 nouvelles vues', time: '2h', icon: <Eye className="text-purple-500" /> }
  ]
  
  // Logout function
  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }
  
  // Fetch posts from API with loading state
  const fetchPosts = async (showRefresh = false) => {
    if (showRefresh) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }
    
    try {
      const postsData = await getAllPosts()
      setPosts(postsData || [])
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error)
      setPosts([])
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
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
  
  // Delete post with confirmation
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

  // Handle content change from rich text editor
  const handleContentChange = (content) => {
    setFormData({ ...formData, content })
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
    if (!dateString) return 'Unknown date'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get category info
  const getCategoryInfo = (categoryValue) => {
    return categories.find(cat => cat.value === categoryValue) || categories[3]
  }

  // Prepare article data for preview
  const getArticleForPreview = () => {
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '')

    return {
      ...formData,
      tags: tagsArray,
      publishedAt: new Date(),
      readTime: Math.ceil((formData.content || '').split(/\s+/).length / 200)
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex relative">
      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar améliorée */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto border-r border-gray-200 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header du sidebar */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-primary to-primary/90">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold text-white">NEOBIZE Admin</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white p-1 rounded-md hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Profile section */}
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Admin</p>
              <p className="text-sm text-gray-500">Administrateur</p>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-xs text-green-600 font-medium">En ligne</span>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            <button 
              onClick={() => {
                setActiveSection('dashboard')
                setIsEditing(false)
                setSidebarOpen(false)
              }}
              className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeSection === 'dashboard' && !isEditing
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard size={20} className="mr-3" />
              <span className="font-medium">Tableau de bord</span>
              {activeSection === 'dashboard' && !isEditing && (
                <ChevronRight size={16} className="ml-auto" />
              )}
            </button>
            
            <button 
              onClick={() => {
                setActiveSection('articles')
                setIsEditing(false)
                setSidebarOpen(false)
              }}
              className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeSection === 'articles' && !isEditing
                  ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <FileText size={20} className="mr-3" />
              <span className="font-medium">Articles</span>
              <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {posts.length}
              </span>
            </button>
            
            <button 
              onClick={() => {
                navigate('/admin/settings')
                setSidebarOpen(false)
              }}
              className="flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <SettingsIcon size={20} className="mr-3" />
              <span className="font-medium">Paramètres</span>
            </button>
          </nav>
        </div>
        
        {/* Quick stats */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Aperçu rapide</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Publiés</span>
                <span className="text-sm font-bold text-green-600">
                  {posts.filter(p => p.status === 'published').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Brouillons</span>
                <span className="text-sm font-bold text-amber-600">
                  {posts.filter(p => p.status === 'draft').length}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
          <div className="space-y-2">
            <button
              onClick={() => {
                navigate('/')
                setSidebarOpen(false)
              }}
              className="flex items-center w-full px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <ExternalLink size={18} className="mr-3" />
              <span className="font-medium">Voir le site</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={18} className="mr-3" />
              <span className="font-medium">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen w-full lg:w-auto">
        {/* Header amélioré */}
        <header className="bg-white shadow-sm z-10 border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-500 p-2 rounded-lg hover:bg-gray-100 mr-3 transition-colors"
              >
                <Menu size={20} />
              </button>
              
              {isEditing && (
                <button
                  onClick={cancelEditing}
                  className="mr-3 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {isEditing && (currentPost ? 'Modifier l\'article' : 'Nouvel article')}
                  {!isEditing && activeSection === 'dashboard' && 'Tableau de bord'}
                  {!isEditing && activeSection === 'articles' && 'Gestion des articles'}
                </h2>
                {!isEditing && (
                  <p className="text-sm text-gray-500 mt-1">
                    {activeSection === 'dashboard' && 'Vue d\'ensemble de votre contenu'}
                    {activeSection === 'articles' && `${posts.length} articles au total`}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Actions pour l'édition */}
              {isEditing && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={togglePreview}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      showPreview 
                        ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Eye size={16} />
                    <span className="hidden sm:inline">
                      {showPreview ? 'Édition' : 'Aperçu'}
                    </span>
                  </button>
                  
                  <button
                    onClick={savePost}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg shadow-green-600/25"
                  >
                    <Save size={16} />
                    <span className="hidden sm:inline">Enregistrer</span>
                  </button>
                </div>
              )}
              
              {/* Actions pour la liste des articles */}
              {!isEditing && activeSection === 'articles' && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => fetchPosts(true)}
                    disabled={isRefreshing}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                  </button>
                  
                  <button
                    onClick={createNewPost}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white px-4 py-2 rounded-lg hover:from-primary/90 hover:to-primary transition-all duration-200 shadow-lg shadow-primary/25"
                  >
                    <Plus size={16} />
                    <span className="hidden sm:inline">Nouvel article</span>
                  </button>
                </div>
              )}
              
              {/* Notifications */}
              <div className="relative">
                <button className="text-gray-500 p-2 rounded-lg hover:bg-gray-100 relative transition-colors">
                  <Bell size={18} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>
              </div>
              
              <div className="h-6 w-px bg-gray-200"></div>
              
              {/* Profile dropdown */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-white shadow-lg">
                  <User size={16} />
                </div>
                <div className="ml-3 hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">Admin</p>
                </div>
                <ChevronDown size={16} className="ml-2 text-gray-500" />
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {/* Success/Error Messages améliorés */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-xl flex items-center shadow-lg animate-in slide-in-from-top duration-300">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <Check size={18} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold">Article enregistré avec succès !</p>
                <p className="text-sm text-green-600">Vos modifications ont été sauvegardées.</p>
              </div>
            </div>
          )}
          
          {saveError && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-800 rounded-xl flex items-center shadow-lg animate-in slide-in-from-top duration-300">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <X size={18} className="text-red-600" />
              </div>
              <div>
                <p className="font-semibold">Erreur lors de l'enregistrement</p>
                <p className="text-sm text-red-600">{saveError}</p>
              </div>
            </div>
          )}
          
          {/* Dashboard */}
          {!isEditing && activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats cards améliorées */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className={`${stat.color} border rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        {stat.icon}
                      </div>
                      <div className={`flex items-center text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp size={14} className="mr-1" />
                        {stat.change}
                      </div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                      <p className="text-
