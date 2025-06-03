import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Save, Trash2, Edit, Plus, LogOut, Eye, Calendar, Clock, Tag, User,
  Check, X, Settings as SettingsIcon, LayoutDashboard, FileText, Menu,
  ChevronDown, Search, Filter, Bell, BarChart2, TrendingUp, MessageSquare,
  Calendar as CalendarIcon, ArrowDownRight, Users, ArrowLeft, Upload, Globe,
  EyeOff, Type, Image, Palette, RefreshCw, Download, Share2, BookOpen,
  Activity, Zap, Star, Heart, ChevronRight, MoreVertical, Copy, ExternalLink
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  logout, getAllPosts, createPost, updatePost, deletePost,
  publishPost, unpublishPost, uploadImage
} from '../services/api'
import RichTextEditor from '../components/RichTextEditor'
import ArticlePreview from '../components/ArticlePreview'

const AdminDashboard = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [viewMode, setViewMode] = useState('grid')
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPost, setCurrentPost] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [formData, setFormData] = useState({
    title: '', excerpt: '', content: '', category: 'web-dev',
    author: '', featuredImage: '', tags: '', status: 'draft'
  })

  const categories = [
    { value: 'web-dev', label: 'Développement Web', color: 'bg-blue-100 text-blue-800', icon: '💻' },
    { value: 'transport', label: 'Transport', color: 'bg-green-100 text-green-800', icon: '🚛' },
    { value: 'construction', label: 'Construction', color: 'bg-orange-100 text-orange-800', icon: '🏗️' },
    { value: 'general', label: 'Général', color: 'bg-gray-100 text-gray-800', icon: '📝' }
  ]

  const stats = [
    { title: 'Articles publiés', value: posts.filter(p => p.status === 'published').length,
      icon: <Globe className="text-emerald-500" />, change: '+12%', trend: 'up',
      color: 'bg-emerald-50 border-emerald-200', description: 'Articles visibles publiquement' },
    { title: 'Brouillons', value: posts.filter(p => p.status === 'draft').length,
      icon: <Edit className="text-amber-500" />, change: '+5%', trend: 'up',
      color: 'bg-amber-50 border-amber-200', description: 'Articles en cours de rédaction' },
    { title: 'Vues totales', value: posts.reduce((total, p) => total + (p.views || 0), 0),
      icon: <Eye className="text-blue-500" />, change: '+18%', trend: 'up',
      color: 'bg-blue-50 border-blue-200', description: 'Nombre total de vues' },
    { title: 'Total articles', value: posts.length,
      icon: <BookOpen className="text-purple-500" />, change: '+3%', trend: 'up',
      color: 'bg-purple-50 border-purple-200', description: 'Tous les articles créés' }
  ]

  const recentActivity = [
    { type: 'create', title: 'Nouvel article créé', time: '2 min', icon: <Plus className="text-green-500" /> },
    { type: 'edit', title: 'Article modifié', time: '15 min', icon: <Edit className="text-blue-500" /> },
    { type: 'publish', title: 'Article publié', time: '1h', icon: <Globe className="text-emerald-500" /> },
    { type: 'view', title: '50 nouvelles vues', time: '2h', icon: <Eye className="text-purple-500" /> }
  ]

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const fetchPosts = async (showRefresh = false) => {
    showRefresh ? setIsRefreshing(true) : setIsLoading(true)
    try {
      const data = await getAllPosts()
      setPosts(data || [])
    } catch (e) {
      console.error('Erreur API:', e)
      setPosts([])
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const editPost = (post) => {
    setCurrentPost(post)
    setFormData({
      title: post.title || '', excerpt: post.excerpt || '', content: post.content || '',
      category: post.category || 'web-dev', author: post.author || '',
      featuredImage: post.featuredImage || '', tags: Array.isArray(post.tags) ? post.tags.join(', ') : '',
      status: post.status || 'draft'
    })
    setIsEditing(true)
    setShowPreview(false)
    setActiveSection('articles')
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContentChange = (c) => setFormData(prev => ({ ...prev, content: c }))

  const savePost = async (e) => {
    e.preventDefault()
    setSaveSuccess(false)
    setSaveError('')
    if (!formData.title || !formData.excerpt || !formData.content || !formData.author) {
      setSaveError('Veuillez remplir tous les champs obligatoires')
      return
    }
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    const data = { ...formData, tags: tagsArray }
    try {
      if (currentPost) {
        const updated = await updatePost(currentPost.id, data)
        setPosts(posts.map(p => p.id === currentPost.id ? updated : p))
      } else {
        const created = await createPost(data)
        setPosts([created, ...posts])
      }
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      setSaveError(err.message || 'Erreur lors de l\'enregistrement')
    }
  }

  useEffect(() => { fetchPosts() }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`${stat.color} border rounded-2xl p-4`}>
            <div className="flex justify-between items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-white rounded shadow">{stat.icon}</div>
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Activités récentes</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                {activity.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.time} • Aujourd'hui</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
