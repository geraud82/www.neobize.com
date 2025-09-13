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
      label: 'Web Development', 
      color: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200', 
      icon: '💻',
      count: posts.filter(p => p.category === 'web-dev').length
    },
    { 
      value: 'transport', 
      label: 'Transportation', 
      color: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200', 
      icon: '🚛',
      count: posts.filter(p => p.category === 'transport').length
    },
    { 
      value: 'construction', 
      label: 'Construction', 
      color: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200', 
      icon: '🏗️',
      count: posts.filter(p => p.category === 'construction').length
    },
    { 
      value: 'general', 
      label: 'General', 
      color: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200', 
      icon: '📝',
      count: posts.filter(p => p.category === 'general').length
    },
    { 
      value: 'tech', 
      label: 'Technology', 
      color: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200', 
      icon: '⚡',
      count: posts.filter(p => p.category === 'tech').length
    },
    { 
      value: 'design', 
      label: 'Design', 
      color: 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border-pink-200', 
      icon: '🎨',
      count: posts.filter(p => p.category === 'design').length
    }
  ]
  
  // Enhanced dashboard stats with animations and better visuals
  const stats = [
    { 
      title: 'Published Articles', 
      value: posts.filter(post => post.status === 'published').length,
      icon: <Globe className="text-emerald-500" />,
      change: '+12%',
      trend: 'up',
      color: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50',
      borderColor: 'border-emerald-200',
      description: 'Articles visible publicly',
      target: 50,
      chartData: [12, 19, 15, 25, 22, 30, 28]
    },
    { 
      title: 'Drafts', 
      value: posts.filter(post => post.status === 'draft').length,
      icon: <Edit className="text-amber-500" />,
      change: '+5%',
      trend: 'up',
      color: 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50',
      borderColor: 'border-amber-200',
      description: 'Articles in progress',
      target: 10,
      chartData: [8, 12, 10, 15, 13, 18, 16]
    },
    { 
      title: 'Total Views', 
      value: posts.reduce((total, post) => total + (post.views || Math.floor(Math.random() * 1000)), 0),
      icon: <Eye className="text-blue-500" />,
      change: '+18%',
      trend: 'up',
      color: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50',
      borderColor: 'border-blue-200',
      description: 'Total views count',
      target: 10000,
      chartData: [450, 520, 480, 650, 720, 890, 950]
    },
    { 
      title: 'Total Articles', 
      value: posts.length,
      icon: <BookOpen className="text-purple-500" />,
      change: '+3%',
      trend: 'up',
      color: 'bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50',
      borderColor: 'border-purple-200',
      description: 'All created articles',
      target: 100,
      chartData: [20, 25, 22, 30, 28, 35, 32]
    },
    {
      title: 'Engagement',
      value: '87%',
      icon: <Heart className="text-rose-500" />,
      change: '+7%',
      trend: 'up',
      color: 'bg-gradient-to-br from-rose-50 via-pink-50 to-red-50',
      borderColor: 'border-rose-200',
      description: 'Average engagement rate',
      target: '90%',
      chartData: [75, 80, 78, 85, 82, 88, 87]
    },
    {
      title: 'Comments',
      value: posts.reduce((total, post) => total + (post.comments || Math.floor(Math.random() * 50)), 0),
      icon: <MessageSquare className="text-cyan-500" />,
      change: '+25%',
      trend: 'up',
      color: 'bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50',
      borderColor: 'border-cyan-200',
      description: 'Comments received',
      target: 500,
      chartData: [45, 52, 48, 65, 72, 89, 95]
    }
  ]

  // Enhanced recent activity with more variety and better categorization
  const recentActivity = [
    { 
      type: 'create', 
      title: 'New article "React Guide 2024" created', 
      time: '2 min', 
      icon: <Plus className="text-green-500" />,
      user: 'Admin',
      category: 'web-dev',
      avatar: '👨‍💻'
    },
    { 
      type: 'edit', 
      title: 'Article "Sustainable Transport" modified', 
      time: '15 min', 
      icon: <Edit className="text-blue-500" />,
      user: 'Admin',
      category: 'transport',
      avatar: '👨‍💻'
    },
    { 
      type: 'publish', 
      title: 'Article "Construction Innovation" published', 
      time: '1h', 
      icon: <Globe className="text-emerald-500" />,
      user: 'Admin',
      category: 'construction',
      avatar: '👨‍💻'
    },
    { 
      type: 'view', 
      title: '127 new views on your articles', 
      time: '2h', 
      icon: <Eye className="text-purple-500" />,
      user: 'System',
      category: 'analytics',
      avatar: '📊'
    },
    {
      type: 'comment',
      title: '5 new comments received',
      time: '3h',
      icon: <MessageSquare className="text-cyan-500" />,
      user: 'Visitors',
      category: 'engagement',
      avatar: '💬'
    },
    {
      type: 'upload',
      title: '3 new images uploaded',
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
      title: 'New Article',
      description: 'Create a new blog article',
      icon: <Plus className="text-white" />,
      color: 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700',
      hoverColor: 'hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800',
      action: () => createNewPost(),
      shortcut: 'Ctrl+N'
    },
    {
      title: 'View Site',
      description: 'Open public website',
      icon: <ExternalLink className="text-white" />,
      color: 'bg-gradient-to-r from-green-600 via-green-700 to-emerald-700',
      hoverColor: 'hover:from-green-700 hover:via-green-800 hover:to-emerald-800',
      action: () => window.open('/', '_blank'),
      shortcut: 'Ctrl+O'
    },
    {
      title: 'Analytics',
      description: 'View detailed statistics',
      icon: <BarChart2 className="text-white" />,
      color: 'bg-gradient-to-r from-purple-600 via-purple-700 to-violet-700',
      hoverColor: 'hover:from-purple-700 hover:via-purple-800 hover:to-violet-800',
      action: () => setActiveSection('analytics'),
      shortcut: 'Ctrl+A'
    },
    {
      title: 'Settings',
      description: 'Configure dashboard',
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
      console.error('Error fetching data:', error)
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
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deletePost(postId)
        setPosts(posts.filter(post => post.id !== postId))
        
        if (currentPost && currentPost.id === postId) {
          setCurrentPost(null)
          setIsEditing(false)
        }
      } catch (error) {
        console.error('Error deleting article:', error)
        alert('Error deleting article: ' + error.message)
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
      console.error('Error changing status:', error)
      alert('Error changing status: ' + error.message)
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
      console.error('Error uploading image:', error)
      alert('Error uploading image: ' + error.message)
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
      setSaveError('Please fill in all required fields')
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
      console.error('Error saving article:', error)
      setSaveError(error.message || 'Error saving article')
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
        if (window.confirm(`Are you sure you want to delete ${selectedPosts.length} articles?`)) {
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
      {/* Mobile overlay */}
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
      
      {/* Enhanced sidebar with animations */}
      <motion.div 
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl shadow-2xl lg:translate-x-0 lg:static lg:inset-auto border-r border-gray-200/50 ${darkMode ? 'dark:bg-gray-800/95 dark:border-gray-700/50' : ''}`}
      >
        {/* Sidebar header with animated gradient */}
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
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'articles', label: 'Articles', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: BarChart2 },
            { id: 'settings', label: 'Settings', icon: SettingsIcon }
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
            <span className="font-medium">Sign Out</span>
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
                {activeSection === 'dashboard' && 'Dashboard'}
                {activeSection === 'articles' && 'Article Management'}
                {activeSection === 'analytics' && 'Analytics'}
                {activeSection === 'settings' && 'Settings'}
              </h2>
              <p className="text-gray-600">
                {activeSection === 'dashboard' && 'Overview of your blog'}
                {activeSection === 'articles' && 'Create and manage your articles'}
                {activeSection === 'analytics' && 'Detailed statistics'}
                {activeSection === 'settings' && 'System configuration'}
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
                        <span>Progress</span>
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
                  <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    View All
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
                  {/* Articles header with actions */}
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Articles</h3>
                      <p className="text-gray-600">Manage your blog articles</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={createNewPost}
                        className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                      >
                        <Plus className="w-4 h-4" />
                        <span>New Article</span>
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Filters and search */}
                  <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          />
                        </div>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="all">All Status</option>
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                        </select>
                        <select
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="all">All Categories</option>
                          {categories.map(category => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Bulk actions */}
                  <AnimatePresence>
                    {showBulkActions && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-indigo-800 font-medium">
                            {selectedPosts.length} article{selectedPosts.length > 1 ? 's' : ''} selected
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleBulkAction('publish')}
                              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              Publish
                            </button>
                            <button
                              onClick={() => handleBulkAction('unpublish')}
                              className="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                            >
                              Unpublish
                            </button>
                            <button
                              onClick={() => handleBulkAction('delete')}
                              className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => {
                                setSelectedPosts([])
                                setShowBulkActions(false)
                              }}
                              className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Articles list/grid */}
                  <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 overflow-hidden">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                        <span className="ml-3 text-gray-600">Loading articles...</span>
                      </div>
                    ) : sortedPosts.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                        <p className="text-gray-600 mb-6">
                          {searchQuery || filterStatus !== 'all' || filterCategory !== 'all'
                            ? 'Try adjusting your filters or search terms.'
                            : 'Get started by creating your first article.'}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={createNewPost}
                          className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Create First Article</span>
                        </motion.button>
                      </div>
                    ) : (
                      <div className="p-6">
                        {/* Select all checkbox */}
                        <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
                          <input
                            type="checkbox"
                            checked={selectedPosts.length === sortedPosts.length && sortedPosts.length > 0}
                            onChange={selectAllPosts}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label className="ml-2 text-sm text-gray-600">
                            Select all ({sortedPosts.length} articles)
                          </label>
                        </div>

                        {viewMode === 'grid' ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sortedPosts.map((post, index) => (
                              <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
                              >
                                <div className="p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <input
                                      type="checkbox"
                                      checked={selectedPosts.includes(post.id)}
                                      onChange={() => togglePostSelection(post.id)}
                                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mt-1"
                                    />
                                    <div className="flex items-center space-x-1">
                                      <span className={`px-2 py-1 text-xs rounded-full ${
                                        post.status === 'published' 
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-yellow-100 text-yellow-800'
                                      }`}>
                                        {post.status === 'published' ? 'Published' : 'Draft'}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  {post.featuredImage && (
                                    <img
                                      src={post.featuredImage}
                                      alt={post.title}
                                      className="w-full h-32 object-cover rounded-lg mb-3"
                                    />
                                  )}
                                  
                                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {post.title || 'Untitled'}
                                  </h3>
                                  
                                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {post.excerpt || 'No excerpt available'}
                                  </p>
                                  
                                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                    <span>{post.author || 'Unknown'}</span>
                                    <span>{formatDate(post.createdAt)}</span>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <span className={`px-2 py-1 text-xs rounded-lg ${getCategoryInfo(post.category).color}`}>
                                      {getCategoryInfo(post.category).icon} {getCategoryInfo(post.category).label}
                                    </span>
                                    
                                    <div className="flex items-center space-x-1">
                                      <button
                                        onClick={() => editPost(post)}
                                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                        title="Edit"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => togglePublishStatus(post)}
                                        className={`p-1 rounded transition-colors ${
                                          post.status === 'published'
                                            ? 'text-yellow-600 hover:bg-yellow-50'
                                            : 'text-green-600 hover:bg-green-50'
                                        }`}
                                        title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                                      >
                                        {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                      </button>
                                      <button
                                        onClick={() => handleDeletePost(post.id)}
                                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                        title="Delete"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {sortedPosts.map((post, index) => (
                              <motion.div
                                key={post.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedPosts.includes(post.id)}
                                  onChange={() => togglePostSelection(post.id)}
                                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                
                                {post.featuredImage && (
                                  <img
                                    src={post.featuredImage}
                                    alt={post.title}
                                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                  />
                                )}
                                
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-gray-900 truncate">
                                    {post.title || 'Untitled'}
                                  </h3>
                                  <p className="text-gray-600 text-sm truncate">
                                    {post.excerpt || 'No excerpt available'}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                                    <span>{post.author || 'Unknown'}</span>
                                    <span>•</span>
                                    <span>{formatDate(post.createdAt)}</span>
                                    <span>•</span>
                                    <span className={`px-2 py-1 rounded-lg ${getCategoryInfo(post.category).color}`}>
                                      {getCategoryInfo(post.category).label}
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    post.status === 'published' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {post.status === 'published' ? 'Published' : 'Draft'}
                                  </span>
                                  
                                  <button
                                    onClick={() => editPost(post)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => togglePublishStatus(post)}
                                    className={`p-2 rounded-lg transition-colors ${
                                      post.status === 'published'
                                        ? 'text-yellow-600 hover:bg-yellow-50'
                                        : 'text-green-600 hover:bg-green-50'
                                    }`}
                                    title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                                  >
                                    {post.status === 'published' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                  </button>
                                  <button
                                    onClick={() => handleDeletePost(post.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </>
              ) : (
                /* Article Editor */
                <motion.div variants={itemVariants} className="space-y-6">
                  {/* Editor header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={cancelEditing}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </motion.button>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {currentPost ? 'Edit Article' : 'Create New Article'}
                        </h3>
                        <p className="text-gray-600">
                          {currentPost ? 'Update your existing article' : 'Write and publish a new article'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={togglePreview}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                          showPreview 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                        <span>{showPreview ? 'Edit' : 'Preview'}</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Success/Error messages */}
                  <AnimatePresence>
                    {saveSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl flex items-center"
                      >
                        <Check className="w-5 h-5 mr-3" />
                        <span>Article saved successfully!</span>
                      </motion.div>
                    )}
                    
                    {saveError && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center"
                      >
                        <X className="w-5 h-5 mr-3" />
                        <span>{saveError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!showPreview ? (
                    /* Edit Form */
                    <form onSubmit={savePost} className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main form */}
                        <div className="lg:col-span-2 space-y-6">
                          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Article Details</h4>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Title *
                                </label>
                                <input
                                  type="text"
                                  name="title"
                                  value={formData.title}
                                  onChange={handleInputChange}
                                  placeholder="Enter article title..."
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg font-medium"
                                  required
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Excerpt *
                                </label>
                                <textarea
                                  name="excerpt"
                                  value={formData.excerpt}
                                  onChange={handleInputChange}
                                  placeholder="Brief description of the article..."
                                  rows={3}
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                  required
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Author *
                                </label>
                                <input
                                  type="text"
                                  name="author"
                                  value={formData.author}
                                  onChange={handleInputChange}
                                  placeholder="Author name"
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Content</h4>
                            <RichTextEditor
                              value={formData.content}
                              onChange={handleContentChange}
                              placeholder="Write your article content..."
                              height="400px"
                            />
                          </div>
                        </div>
                        
                        {/* Sidebar */}
                        <div className="space-y-6">
                          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Settings</h4>
                            
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Category
                                </label>
                                <select
                                  name="category"
                                  value={formData.category}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                  {categories.map(category => (
                                    <option key={category.value} value={category.value}>
                                      {category.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Status
                                </label>
                                <select
                                  name="status"
                                  value={formData.status}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                  <option value="draft">Draft</option>
                                  <option value="published">Published</option>
                                </select>
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
                                  placeholder="react, javascript, web..."
                                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                  Separate tags with commas
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Featured Image</h4>
                            
                            {formData.featuredImage ? (
                              <div className="relative">
                                <img
                                  src={formData.featuredImage}
                                  alt="Featured"
                                  className="w-full h-32 object-cover rounded-xl"
                                />
                                <button
                                  type="button"
                                  onClick={() => setFormData({ ...formData, featuredImage: '' })}
                                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <label className="block">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                />
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-200 cursor-pointer">
                                  {isUploading ? (
                                    <div className="flex flex-col items-center">
                                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-2"></div>
                                      <p className="text-sm text-gray-600">Uploading...</p>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center">
                                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                      <p className="text-sm text-gray-600">Click to upload image</p>
                                      <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                    </div>
                                  )}
                                </div>
                              </label>
                            )}
                          </div>
                          
                          <div className="flex flex-col space-y-3">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              type="submit"
                              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                            >
                              <Save className="w-4 h-4" />
                              <span>Save Article</span>
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              type="button"
                              onClick={cancelEditing}
                              className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-all duration-200"
                            >
                              <X className="w-4 h-4" />
                              <span>Cancel</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    /* Preview Mode */
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 p-8">
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="flex items-center">
                          <Eye className="w-5 h-5 text-blue-600 mr-2" />
                          <span className="text-blue-800 font-medium">Preview Mode</span>
                        </div>
                        <p className="text-blue-600 text-sm mt-1">
                          This is how your article will appear to readers
                        </p>
                      </div>
                      
                      <ArticlePreview post={getArticleForPreview()} />
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
                  Detailed statistics will be available soon.
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings</h3>
                <p className="text-gray-600">
                  Configuration settings will be available soon.
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
