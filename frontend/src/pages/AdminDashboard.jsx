import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  ArrowDownRight,
  Users,
  ArrowLeft,
  Upload,
  Globe,
  EyeOff,
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
  ExternalLink,
  Grid,
  List,
  SortAsc,
  SortDesc,
  AlertCircle,
  Sparkles,
  Target,
  Layers,
  PieChart,
  MousePointer,
  Smartphone,
  Monitor,
  Tablet,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Bookmark,
  Archive,
  Send,
  Image as ImageIcon,
  Video,
  Mic,
  Camera,
  Palette,
  Code,
  Database,
  Server,
  Wifi,
  Shield,
  Lock,
  Unlock,
  Key,
  CreditCard,
  Banknote,
  Wallet,
  Receipt,
  Calculator,
  Presentation,
  LineChart,
  BarChart3,
  PieChart as PieChartIcon,
  Gauge,
  Thermometer,
  Battery,
  Signal,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Gamepad2,
  Joystick,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Trophy,
  Award,
  Medal,
  Crown,
  Gem,
  Diamond,
  Coins,
  Banknote as BanknoteIcon,
  CreditCard as CreditCardIcon,
  Wallet as WalletIcon,
  Sun,
  Moon
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
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  
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
  const [selectedPosts, setSelectedPosts] = useState([])
  const [showBulkActions, setShowBulkActions] = useState(false)
  
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
  
  // Categories options with enhanced styling
  const categories = [
    { 
      value: 'web-dev', 
      label: t('admin.articles.webDevelopment'), 
      color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200', 
      icon: '💻',
      count: posts.filter(p => p.category === 'web-dev').length
    },
    { 
      value: 'transport', 
      label: t('admin.articles.transport'), 
      color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200', 
      icon: '🚛',
      count: posts.filter(p => p.category === 'transport').length
    },
    { 
      value: 'construction', 
      label: t('admin.articles.construction'), 
      color: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200', 
      icon: '🏗️',
      count: posts.filter(p => p.category === 'construction').length
    },
    { 
      value: 'general', 
      label: t('admin.articles.general'), 
      color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200', 
      icon: '📝',
      count: posts.filter(p => p.category === 'general').length
    },
    { 
      value: 'tech', 
      label: t('admin.articles.technology'), 
      color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200', 
      icon: '⚡',
      count: posts.filter(p => p.category === 'tech').length
    },
    { 
      value: 'design', 
      label: t('admin.articles.design'), 
      color: 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border-pink-200', 
      icon: '🎨',
      count: posts.filter(p => p.category === 'design').length
    }
  ]
  
  // Enhanced dashboard stats with animations and better visuals
  const stats = [
    { 
      title: t('admin.dashboard.publishedArticles'), 
      value: posts.filter(post => post.status === 'published').length,
      icon: <Globe className="text-emerald-500" />,
      change: '+12%',
      trend: 'up',
      color: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50',
      borderColor: 'border-emerald-200',
      description: t('admin.dashboard.articlesVisiblePublicly'),
      target: 50,
      chartData: [12, 19, 15, 25, 22, 30, 28]
    },
    { 
      title: t('admin.dashboard.drafts'), 
      value: posts.filter(post => post.status === 'draft').length,
      icon: <Edit className="text-amber-500" />,
      change: '+5%',
      trend: 'up',
      color: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50',
      borderColor: 'border-amber-200',
      description: t('admin.dashboard.articlesInProgress'),
      target: 10,
      chartData: [8, 12, 10, 15, 13, 18, 16]
    },
    { 
      title: t('admin.dashboard.totalViews'), 
      value: posts.reduce((total, post) => total + (post.views || Math.floor(Math.random() * 1000)), 0),
      icon: <Eye className="text-blue-500" />,
      change: '+18%',
      trend: 'up',
      color: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50',
      borderColor: 'border-blue-200',
      description: t('admin.dashboard.totalViewsNumber'),
      target: 10000,
      chartData: [450, 520, 480, 650, 720, 890, 950]
    },
    { 
      title: t('admin.dashboard.totalArticles'), 
      value: posts.length,
      icon: <BookOpen className="text-purple-500" />,
      change: '+3%',
      trend: 'up',
      color: 'bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50',
      borderColor: 'border-purple-200',
      description: t('admin.dashboard.allCreatedArticles'),
      target: 100,
      chartData: [20, 25, 22, 30, 28, 35, 32]
    },
    {
      title: t('admin.dashboard.engagement'),
      value: '87%',
      icon: <Heart className="text-rose-500" />,
      change: '+7%',
      trend: 'up',
      color: 'bg-gradient-to-br from-rose-50 via-pink-50 to-red-50',
      borderColor: 'border-rose-200',
      description: t('admin.dashboard.averageEngagementRate'),
      target: '90%',
      chartData: [75, 80, 78, 85, 82, 88, 87]
    },
    {
      title: t('admin.dashboard.comments'),
      value: posts.reduce((total, post) => total + (post.comments || Math.floor(Math.random() * 50)), 0),
      icon: <MessageSquare className="text-cyan-500" />,
      change: '+25%',
      trend: 'up',
      color: 'bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50',
      borderColor: 'border-cyan-200',
      description: t('admin.dashboard.commentsReceived'),
      target: 500,
      chartData: [45, 52, 48, 65, 72, 89, 95]
    }
  ]

  // Enhanced recent activity with more variety and better categorization
  const recentActivity = [
    { 
      type: 'create', 
      title: 'Nouvel article "Guide React 2024" créé', 
      time: '2 min', 
      icon: <Plus className="text-green-500" />,
      user: 'Admin',
      category: 'web-dev',
      avatar: '👨‍💻'
    },
    { 
      type: 'edit', 
      title: 'Article "Transport Durable" modifié', 
      time: '15 min', 
      icon: <Edit className="text-blue-500" />,
      user: 'Admin',
      category: 'transport',
      avatar: '👨‍💻'
    },
    { 
      type: 'publish', 
      title: 'Article "Innovation Construction" publié', 
      time: '1h', 
      icon: <Globe className="text-emerald-500" />,
      user: 'Admin',
      category: 'construction',
      avatar: '👨‍💻'
    },
    { 
      type: 'view', 
      title: '127 nouvelles vues sur vos articles', 
      time: '2h', 
      icon: <Eye className="text-purple-500" />,
      user: 'Système',
      category: 'analytics',
      avatar: '📊'
    },
    {
      type: 'comment',
      title: '5 nouveaux commentaires reçus',
      time: '3h',
      icon: <MessageSquare className="text-cyan-500" />,
      user: 'Visiteurs',
      category: 'engagement',
      avatar: '💬'
    },
    {
      type: 'upload',
      title: '3 nouvelles images téléchargées',
      time: '4h',
      icon: <Upload className="text-orange-500" />,
      user: 'Admin',
      category: 'media',
      avatar: '📸'
    }
  ]

  // Quick actions for dashboard with enhanced styling
  const quickActions = [
    {
      title: t('admin.dashboard.newArticle'),
      description: t('admin.dashboard.createNewBlogArticle'),
      icon: <Plus className="text-white" />,
      color: 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700',
      hoverColor: 'hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800',
      action: () => createNewPost(),
      shortcut: 'Ctrl+N'
    },
    {
      title: t('admin.dashboard.viewSite'),
      description: t('admin.dashboard.openPublicSite'),
      icon: <ExternalLink className="text-white" />,
      color: 'bg-gradient-to-r from-green-600 via-green-700 to-emerald-700',
      hoverColor: 'hover:from-green-700 hover:via-green-800 hover:to-emerald-800',
      action: () => window.open('/', '_blank'),
      shortcut: 'Ctrl+O'
    },
    {
      title: t('admin.dashboard.analytics'),
      description: t('admin.dashboard.viewDetailedStatistics'),
      icon: <BarChart2 className="text-white" />,
      color: 'bg-gradient-to-r from-purple-600 via-purple-700 to-violet-700',
      hoverColor: 'hover:from-purple-700 hover:via-purple-800 hover:to-violet-800',
      action: () => setActiveSection('analytics'),
      shortcut: 'Ctrl+A'
    },
    {
      title: t('admin.dashboard.settings'),
      description: t('admin.dashboard.configureDashboard'),
      icon: <SettingsIcon className="text-white" />,
      color: 'bg-gradient-to-r from-gray-600 via-gray-700 to-slate-700',
      hoverColor: 'hover:from-gray-700 hover:via-gray-800 hover:to-slate-800',
      action: () => navigate('/admin/settings'),
      shortcut: 'Ctrl+,'
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }
  
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

  // Calculate progress for stats
  const getProgress = (value, target) => {
    if (typeof value === 'string') {
      return parseInt(value) || 0
    }
    return Math.min((value / target) * 100, 100)
  }

  // Handle bulk actions
  const handleBulkAction = (action) => {
    switch (action) {
      case 'delete':
        if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedPosts.length} articles ?`)) {
          selectedPosts.forEach(postId => handleDeletePost(postId))
          setSelectedPosts([])
          setShowBulkActions(false)
        }
        break
      case 'publish':
        selectedPosts.forEach(postId => {
          const post = posts.find(p => p.id === postId)
          if (post && post.status !== 'published') {
            togglePublishStatus(post)
          }
        })
        setSelectedPosts([])
        setShowBulkActions(false)
        break
      case 'unpublish':
        selectedPosts.forEach(postId => {
          const post = posts.find(p => p.id === postId)
          if (post && post.status === 'published') {
            togglePublishStatus(post)
          }
        })
        setSelectedPosts([])
        setShowBulkActions(false)
        break
    }
  }

  // Toggle post selection
  const togglePostSelection = (postId) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  // Select all posts
  const selectAllPosts = () => {
    if (selectedPosts.length === sortedPosts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(sortedPosts.map(post => post.id))
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

  // Update bulk actions visibility
  useEffect(() => {
    setShowBulkActions(selectedPosts.length > 0)
  }, [selectedPosts])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'n':
            e.preventDefault()
            createNewPost()
            break
          case 'o':
            e.preventDefault()
            window.open('/', '_blank')
            break
          case 'a':
            e.preventDefault()
            setActiveSection('analytics')
            break
          case ',':
            e.preventDefault()
            navigate('/admin/settings')
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])
  
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'} flex relative transition-colors duration-300`}>
      {/* Overlay pour mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar améliorée avec animations */}
      <motion.div 
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl shadow-2xl lg:translate-x-0 lg:static lg:inset-auto border-r border-gray-200/50 ${darkMode ? 'dark:bg-gray-800/95 dark:border-gray-700/50' : ''}`}
      >
        {/* Header du sidebar avec gradient animé */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200/50 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 animate-pulse opacity-20"></div>
          <div className="flex items-center space-x-3 relative z-10">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30"
            >
              <LayoutDashboard className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white">NEOBIZE</h1>
              <p className="text-white/70 text-sm">Admin Dashboard</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30 text-white"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {[
            { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
            { id: 'articles', label: 'Articles', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: BarChart2 },
            { id: 'settings', label: 'Paramètres', icon: SettingsIcon }
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveSection(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t border-gray-200/50">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {activeSection === 'dashboard' && 'Tableau de bord'}
                {activeSection === 'articles' && 'Gestion des articles'}
                {activeSection === 'analytics' && 'Analytics'}
                {activeSection === 'settings' && 'Paramètres'}
              </h2>
              <p className="text-gray-600">
                {activeSection === 'dashboard' && 'Vue d\'ensemble de votre blog'}
                {activeSection === 'articles' && 'Créer et gérer vos articles'}
                {activeSection === 'analytics' && 'Statistiques détaillées'}
                {activeSection === 'settings' && 'Configuration du système'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => fetchPosts(true)}
              disabled={isRefreshing}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 p-6 overflow-auto">
          {activeSection === 'dashboard' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    variants={cardVariants}
                    whileHover="hover"
                    className={`${stat.color} ${stat.borderColor} border rounded-2xl p-6 relative overflow-hidden`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/50 backdrop-blur-sm">
                        {stat.icon}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.change}
                        </span>
                        {stat.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{stat.description}</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progression</span>
                        <span>{getProgress(stat.value, stat.target)}%</span>
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${getProgress(stat.value, stat.target)}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.title}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.95 }}
                    onClick={action.action}
                    className={`${action.color} ${action.hoverColor} text-white p-6 rounded-2xl text-left transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        {action.icon}
                      </div>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
                        {action.shortcut}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                    <p className="text-white/80 text-sm">{action.description}</p>
                  </motion.button>
                ))}
              </motion.div>

              {/* Recent Activity */}
              <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Activité récente</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    Voir tout
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-4 bg-gray-50/50 rounded-xl hover:bg-gray-100/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          {activity.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">{activity.user}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                          {activity.category && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <span className={`text-xs px-2 py-1 rounded-lg ${getCategoryInfo(activity.category).color}`}>
                                {getCategoryInfo(activity.category).label}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-2xl">{activity.avatar}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeSection === 'articles' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {!isEditing ? (
                <>
                  {/* Articles header with enhanced controls */}
                  <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={createNewPost}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                        >
                          <Plus className="w-5 h-5" />
                          <span>Nouvel article</span>
                        </motion.button>
                        
                        {showBulkActions && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center space-x-2"
                          >
                            <span className="text-sm text-gray-600">
                              {selectedPosts.length} sélectionné(s)
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              onClick={() => handleBulkAction('publish')}
                              className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm hover:bg-green-200 transition-colors"
                            >
                              Publier
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              onClick={() => handleBulkAction('unpublish')}
                              className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg text-sm hover:bg-yellow-200 transition-colors"
                            >
                              Dépublier
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              onClick={() => handleBulkAction('delete')}
                              className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm hover:bg-red-200 transition-colors"
                            >
                              Supprimer
                            </motion.button>
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            placeholder="Rechercher des articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                          />
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setShowFilters(!showFilters)}
                          className={`p-2 rounded-xl transition-colors ${showFilters ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          <Filter className="w-5 h-5" />
                        </motion.button>
                        
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'}`}
                          >
                            <Grid className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'}`}
                          >
                            <List className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Filters panel */}
                    <AnimatePresence>
                      {showFilters && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-6 border-t border-gray-200/50"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                              <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              >
                                <option value="all">Tous les statuts</option>
                                <option value="published">Publié</option>
                                <option value="draft">Brouillon</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                              <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              >
                                <option value="all">Toutes les catégories</option>
                                {categories.map(category => (
                                  <option key={category.value} value={category.value}>
                                    {category.label} ({category.count})
                                  </option>
                                ))}
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
                              <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full border border-gray-200 rounded-xl px-3 py-2 bg-white/50 backdrop-blur-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              >
                                <option value="createdAt">Date de création</option>
                                <option value="title">Titre</option>
                                <option value="author">Auteur</option>
                              </select>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Ordre</label>
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  onClick={() => setSortOrder('desc')}
                                  className={`flex-1 p-2 rounded-xl transition-colors ${sortOrder === 'desc' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}
                                >
                                  <SortDesc className="w-4 h-4 mx-auto" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  onClick={() => setSortOrder('asc')}
                                  className={`flex-1 p-2 rounded-xl transition-colors ${sortOrder === 'asc' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'}`}
                                >
                                  <SortAsc className="w-4 h-4 mx-auto" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Articles list/grid */}
                  {isLoading ? (
                    <motion.div variants={itemVariants} className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </motion.div>
                  ) : sortedPosts.length === 0 ? (
                    <motion.div variants={itemVariants} className="text-center py-12 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun article trouvé</h3>
                      <p className="text-gray-600 mb-6">
                        {searchQuery || filterStatus !== 'all' || filterCategory !== 'all' 
                          ? 'Aucun article ne correspond à vos critères de recherche.'
                          : 'Commencez par créer votre premier article.'
                        }
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={createNewPost}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Créer un article
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div variants={itemVariants}>
                      {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {sortedPosts.map((post, index) => (
                            <motion.div
                              key={post.id}
                              variants={cardVariants}
                              whileHover="hover"
                              className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              {/* Post image */}
                              <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100">
                                {post.featuredImage ? (
                                  <img
                                    src={post.featuredImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="w-16 h-16 text-gray-400" />
                                  </div>
                                )}
                                
                                {/* Status badge */}
                                <div className="absolute top-4 left-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    post.status === 'published' 
                                      ? 'bg-green-100 text-green-800 border border-green-200' 
                                      : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                  }`}>
                                    {post.status === 'published' ? 'Publié' : 'Brouillon'}
                                  </span>
                                </div>
                                
                                {/* Selection checkbox */}
                                <div className="absolute top-4 right-4">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => togglePostSelection(post.id)}
                                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                                      selectedPosts.includes(post.id)
                                        ? 'bg-indigo-600 border-indigo-600 text-white'
                                        : 'bg-white/80 border-gray-300 hover:border-indigo-400'
                                    }`}
                                  >
                                    {selectedPosts.includes(post.id) && <Check className="w-3 h-3" />}
                                  </motion.button>
                                </div>
                              </div>
                              
                              {/* Post content */}
                              <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getCategoryInfo(post.category).color}`}>
                                    {getCategoryInfo(post.category).icon} {getCategoryInfo(post.category).label}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => editPost(post)}
                                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => togglePublishStatus(post)}
                                      className={`p-2 rounded-lg transition-colors ${
                                        post.status === 'published'
                                          ? 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                                          : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                                      }`}
                                    >
                                      {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => handleDeletePost(post.id)}
                                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </motion.button>
                                  </div>
                                </div>
                                
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                  {post.title}
                                </h3>
                                
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                  {post.excerpt}
                                </p>
                                
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                  <div className="flex items-center space-x-2">
                                    <User className="w-3 h-3" />
                                    <span>{post.author}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="w-3 h-3" />
                                    <span>{formatDate(post.createdAt)}</span>
                                  </div>
                                </div>
                                
                                {post.tags && post.tags.length > 0 && (
                                  <div className="mt-3 flex flex-wrap gap-1">
                                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                                      <span
                                        key={tagIndex}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    {post.tags.length > 3 && (
                                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                                        +{post.tags.length - 3}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {sortedPosts.map((post, index) => (
                            <motion.div
                              key={post.id}
                              variants={cardVariants}
                              whileHover="hover"
                              className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => togglePostSelection(post.id)}
                                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                                      selectedPosts.includes(post.id)
                                        ? 'bg-indigo-600 border-indigo-600 text-white'
                                        : 'bg-white border-gray-300 hover:border-indigo-400'
                                    }`}
                                  >
                                    {selectedPosts.includes(post.id) && <Check className="w-3 h-3" />}
                                  </motion.button>
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {post.title}
                                      </h3>
                                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {post.excerpt}
                                      </p>
                                      
                                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                                        <div className="flex items-center space-x-1">
                                          <User className="w-3 h-3" />
                                          <span>{post.author}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                          <Calendar className="w-3 h-3" />
                                          <span>{formatDate(post.createdAt)}</span>
                                        </div>
                                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryInfo(post.category).color}`}>
                                          {getCategoryInfo(post.category).icon} {getCategoryInfo(post.category).label}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          post.status === 'published' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                          {post.status === 'published' ? 'Publié' : 'Brouillon'}
                                        </span>
                                      </div>
                                      
                                      {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                          {post.tags.slice(0, 5).map((tag, tagIndex) => (
                                            <span
                                              key={tagIndex}
                                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                                            >
                                              {tag}
                                            </span>
                                          ))}
                                          {post.tags.length > 5 && (
                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                                              +{post.tags.length - 5}
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    
                                    <div className="flex items-center space-x-2 ml-4">
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => editPost(post)}
                                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => togglePublishStatus(post)}
                                        className={`p-2 rounded-lg transition-colors ${
                                          post.status === 'published'
                                            ? 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                                            : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                                        }`}
                                      >
                                        {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleDeletePost(post.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </motion.button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div variants={itemVariants} className="space-y-6">
                  {/* Editor header */}
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={cancelEditing}
                          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5" />
                          <span>Retour</span>
                        </motion.button>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            {currentPost ? 'Modifier l\'article' : 'Nouvel article'}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {currentPost ? 'Modifiez votre article existant' : 'Créez un nouvel article pour votre blog'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={togglePreview}
                          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                            showPreview
                              ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {showPreview ? 'Éditer' : 'Aperçu'}
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={savePost}
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                        >
                          <Save className="w-4 h-4" />
                          <span>Enregistrer</span>
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* Success/Error messages */}
                    <AnimatePresence>
                      {saveSuccess && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-2"
                        >
                          <Check className="w-5 h-5 text-green-600" />
                          <span className="text-green-800 font-medium">Article enregistré avec succès!</span>
                        </motion.div>
                      )}
                      
                      {saveError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2"
                        >
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <span className="text-red-800 font-medium">{saveError}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {!showPreview ? (
                    /* Editor form */
                    <form onSubmit={savePost} className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main content */}
                        <div className="lg:col-span-2 space-y-6">
                          {/* Title */}
                          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Titre de l'article *
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                              placeholder="Entrez le titre de votre article..."
                              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-lg font-medium"
                              required
                            />
                          </div>

                          {/* Excerpt */}
                          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Résumé *
                            </label>
                            <textarea
                              name="excerpt"
                              value={formData.excerpt}
                              onChange={handleInputChange}
                              placeholder="Écrivez un bref résumé de votre article..."
                              rows={3}
                              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm resize-none"
                              required
                            />
                          </div>

                          {/* Content */}
                          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Contenu de l'article *
                            </label>
                            <RichTextEditor
                              value={formData.content}
                              onChange={handleContentChange}
                              placeholder="Rédigez le contenu de votre article..."
                            />
                          </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                          {/* Publish settings */}
                          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Publication</h3>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Statut
                                </label>
                                <select
                                  name="status"
                                  value={formData.status}
                                  onChange={handleInputChange}
                                  className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                                >
                                  <option value="draft">Brouillon</option>
                                  <option value="published">Publié</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Catégorie
                                </label>
                                <select
                                  name="category"
                                  value={formData.category}
                                  onChange={handleInputChange}
                                  className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                                >
                                  {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                      {category.icon} {category.label}
                                    </option>
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
                                  placeholder="Nom de l'auteur"
                                  className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          {/* Featured image */}
                          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Image à la une</h3>
                            
                            {formData.featuredImage ? (
                              <div className="space-y-4">
                                <img
                                  src={formData.featuredImage}
                                  alt="Aperçu"
                                  className="w-full h-32 object-cover rounded-xl"
                                />
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, featuredImage: '' })}
                                  className="w-full bg-red-50 text-red-700 py-2 rounded-xl hover:bg-red-100 transition-colors"
                                >
                                  Supprimer l'image
                                </motion.button>
                              </div>
                            ) : (
                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                  id="featured-image"
                                  disabled={isUploading}
                                />
                                <label
                                  htmlFor="featured-image"
                                  className={`w-full border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-400 transition-colors ${
                                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                                  }`}
                                >
                                  {isUploading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                                      <span className="text-gray-600">Téléchargement...</span>
                                    </div>
                                  ) : (
                                    <div>
                                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                      <p className="text-gray-600 text-sm">
                                        Cliquez pour télécharger une image
                                      </p>
                                    </div>
                                  )}
                                </label>
                              </div>
                            )}
                          </div>

                          {/* Tags */}
                          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                            <input
                              type="text"
                              name="tags"
                              value={formData.tags}
                              onChange={handleInputChange}
                              placeholder="Séparez les tags par des virgules"
                              className="w-full border border-gray-200 rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Exemple: react, javascript, web development
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    /* Preview */
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Aperçu de l'article</h3>
                      <ArticlePreview article={getArticleForPreview()} />
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}

          {activeSection === 'analytics' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="text-center py-12">
                <BarChart2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
                <p className="text-gray-600">
                  Les statistiques détaillées seront bientôt disponibles.
                </p>
              </motion.div>
            </motion.div>
          )}

          {activeSection === 'settings' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="text-center py-12">
                <SettingsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Paramètres</h3>
                <p className="text-gray-600">
                  Les paramètres de configuration seront bientôt disponibles.
                </p>
              </motion.div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard
