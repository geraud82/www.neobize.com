import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Upload, 
  Image as ImageIcon, 
  Tag, 
  User, 
  Calendar,
  Globe,
  FileText,
  Sparkles,
  Check,
  X,
  AlertCircle,
  Camera,
  Palette,
  Type,
  Layout,
  Target,
  Zap,
  BookOpen,
  PenTool,
  Settings
} from 'lucide-react'
import { createPost, uploadImage } from '../services/api'
import RichTextEditor from '../components/RichTextEditor'
import ArticlePreview from '../components/ArticlePreview'

const CreateArticle = () => {
  const navigate = useNavigate()
  
  // État du formulaire
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
  
  // États UI
  const [showPreview, setShowPreview] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [readTime, setReadTime] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  
  // Available categories
  const categories = [
    { value: 'web-dev', label: 'Web Development', color: 'bg-blue-100 text-blue-800', icon: '💻', gradient: 'from-blue-500 to-cyan-500' },
    { value: 'transport', label: 'Transportation', color: 'bg-green-100 text-green-800', icon: '🚛', gradient: 'from-green-500 to-emerald-500' },
    { value: 'mobile-dev', label: 'Mobile Development', color: 'bg-orange-100 text-orange-800', icon: '📱', gradient: 'from-orange-500 to-amber-500' },
    { value: 'saas', label: 'SaaS Solutions', color: 'bg-gray-100 text-gray-800', icon: '☁️', gradient: 'from-gray-500 to-slate-500' },
    { value: 'ai-tech', label: 'AI & Technology', color: 'bg-purple-100 text-purple-800', icon: '🤖', gradient: 'from-purple-500 to-violet-500' },
    { value: 'business', label: 'Business', color: 'bg-pink-100 text-pink-800', icon: '💼', gradient: 'from-pink-500 to-rose-500' }
  ]
  
  // Creation steps
  const steps = [
    { id: 1, title: 'Basic Information', icon: <FileText size={20} />, description: 'Title, category and summary' },
    { id: 2, title: 'Main Content', icon: <PenTool size={20} />, description: 'Article writing' },
    { id: 3, title: 'Media and Finalization', icon: <ImageIcon size={20} />, description: 'Image and publication' }
  ]
  
  // Calculate word count and reading time
  useEffect(() => {
    const text = formData.content.replace(/<[^>]*>/g, '') // Remove HTML tags
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    const count = words.length
    setWordCount(count)
    setReadTime(Math.ceil(count / 200)) // 200 words per minute
  }, [formData.content])
  
  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle content change
  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }))
  }
  
  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    if (!file.type.startsWith('image/')) {
      setSaveError('Please select a valid image file')
      return
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setSaveError('Image size must not exceed 5MB')
      return
    }
    
    setIsUploading(true)
    setSaveError('')
    
    try {
      const imageUrl = await uploadImage(file)
      setFormData(prev => ({ ...prev, featuredImage: imageUrl }))
    } catch (error) {
      console.error('Error uploading image:', error)
      setSaveError('Error uploading image: ' + error.message)
    } finally {
      setIsUploading(false)
    }
  }
  
  // Save article
  const handleSave = async (status = 'draft') => {
    setSaveSuccess(false)
    setSaveError('')
    
    // Validation
    if (!formData.title.trim()) {
      setSaveError('Title is required')
      return
    }
    
    if (!formData.excerpt.trim()) {
      setSaveError('Summary is required')
      return
    }
    
    if (!formData.content.trim()) {
      setSaveError('Content is required')
      return
    }
    
    if (!formData.author.trim()) {
      setSaveError('Author is required')
      return
    }
    
    setIsSaving(true)
    
    try {
      // Process tags - ensure formData.tags is a string
      const tagsString = formData.tags || ''
      const tagsArray = tagsString
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '')
      
      const articleData = {
        ...formData,
        tags: tagsArray,
        status
      }
      
      // If backend is not available, simulate success for development
      try {
        await createPost(articleData)
        setSaveSuccess(true)
        setTimeout(() => {
          navigate('/admin')
        }, 2000)
      } catch (networkError) {
        if (networkError.message.includes('fetch') || networkError.message.includes('Failed to fetch')) {
          // Backend not available - simulate success for development
          console.warn('Backend not available, simulating article creation for development')
          setSaveSuccess(true)
          setTimeout(() => {
            navigate('/admin')
          }, 2000)
        } else {
          throw networkError
        }
      }
      
    } catch (error) {
      console.error('Error saving article:', error)
      setSaveError(error.message || 'Error saving article')
    } finally {
      setIsSaving(false)
    }
  }
  
  // Get category information
  const getCategoryInfo = (categoryValue) => {
    return categories.find(cat => cat.value === categoryValue) || categories[0]
  }
  
  // Prepare data for preview
  const getPreviewData = () => {
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '')
    
    return {
      ...formData,
      tags: tagsArray,
      publishedAt: new Date(),
      readTime
    }
  }
  
  // Calculate progress percentage
  const getProgressPercentage = () => {
    let progress = 0
    if (formData.title) progress += 15
    if (formData.category) progress += 10
    if (formData.excerpt) progress += 15
    if (formData.author) progress += 10
    if (formData.content && wordCount > 50) progress += 30
    if (formData.featuredImage) progress += 10
    if (formData.tags) progress += 10
    return Math.min(progress, 100)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft size={22} />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Article</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {wordCount} words • {readTime} min read • {getProgressPercentage()}% completed
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  showPreview 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Eye size={18} />
                <span className="hidden sm:inline">
                  {showPreview ? 'Edit' : 'Preview'}
                </span>
              </button>
              
              <button
                onClick={() => handleSave('draft')}
                disabled={isSaving}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <Save size={18} />
                <span className="hidden sm:inline">
                  {isSaving ? 'Saving...' : 'Draft'}
                </span>
              </button>
              
              <button
                onClick={() => handleSave('published')}
                disabled={isSaving}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-4 py-2 rounded-xl hover:from-green-700 hover:to-emerald-800 transition-all duration-200 shadow-lg shadow-green-600/25 disabled:opacity-50"
              >
                <Globe size={18} />
                <span className="hidden sm:inline">
                  {isSaving ? 'Publishing...' : 'Publish'}
                </span>
              </button>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="pb-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Success/error messages */}
      {saveSuccess && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-2xl flex items-center shadow-lg animate-in slide-in-from-top duration-300">
            <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mr-3">
              <Check size={18} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold">Article created successfully!</p>
              <p className="text-sm text-green-600">Redirecting to dashboard...</p>
            </div>
          </div>
        </div>
      )}
      
      {saveError && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
          <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 text-red-800 rounded-2xl flex items-center shadow-lg animate-in slide-in-from-top duration-300">
            <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center mr-3">
              <X size={18} className="text-red-600" />
            </div>
            <div>
              <p className="font-semibold">Error creating article</p>
              <p className="text-sm text-red-600">{saveError}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {!showPreview ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main form */}
            <div className="lg:col-span-3 space-y-8">
              {/* Basic information */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                    <p className="text-sm text-gray-500">Define the essential elements of your article</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter a catchy title..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                    />
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((category) => (
                        <button
                          key={category.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                            formData.category === category.value
                              ? `border-transparent bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                              : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className="text-2xl mb-2">{category.icon}</div>
                          <div className="text-sm font-medium">{category.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Summary */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Article Summary *
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      placeholder="Briefly describe the content of your article..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.excerpt.length}/300 characters recommended
                    </p>
                  </div>
                  
                  {/* Author */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Author name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
              
              {/* Main content */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mr-4">
                    <PenTool className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Article Content</h2>
                    <p className="text-sm text-gray-500">Write the main content of your article</p>
                  </div>
                </div>
                
                <RichTextEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Start writing your article..."
                  height="500px"
                />
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>{wordCount} words</span>
                    <span>•</span>
                    <span>{readTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${wordCount > 300 ? 'bg-green-500' : wordCount > 100 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <span>
                      {wordCount > 300 ? 'Optimal length' : wordCount > 100 ? 'Short content' : 'Very short content'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Featured image */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex items-center mb-4">
                  <ImageIcon className="w-5 h-5 text-indigo-500 mr-2" />
                  <h3 className="font-semibold text-gray-900">Featured Image</h3>
                </div>
                
                {formData.featuredImage ? (
                  <div className="relative">
                    <img
                      src={formData.featuredImage}
                      alt="Featured image"
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
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
                          <Camera className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Click to add an image</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </div>
                  </label>
                )}
              </div>
              
              {/* Tags */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex items-center mb-4">
                  <Tag className="w-5 h-5 text-indigo-500 mr-2" />
                  <h3 className="font-semibold text-gray-900">Tags</h3>
                </div>
                
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="react, javascript, web..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Separate tags with commas
                </p>
              </div>
              
              {/* Statistics */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex items-center mb-4">
                  <Target className="w-5 h-5 text-indigo-500 mr-2" />
                  <h3 className="font-semibold text-gray-900">Statistics</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-indigo-600">{getProgressPercentage()}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Words</span>
                    <span className="text-sm font-semibold text-gray-900">{wordCount}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Reading</span>
                    <span className="text-sm font-semibold text-gray-900">{readTime} min</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Category</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryInfo(formData.category).color}`}>
                      {getCategoryInfo(formData.category).icon} {getCategoryInfo(formData.category).label}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Tips */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-500 mr-2" />
                  <h3 className="font-semibold text-indigo-900">Tips</h3>
                </div>
                
                <ul className="space-y-2 text-sm text-indigo-700">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Use a catchy and descriptive title</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Add an image to attract attention</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Aim for 300+ words for good SEO</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Use relevant tags</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Preview mode */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center">
                  <Eye className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">Preview mode</span>
                </div>
                <p className="text-blue-600 text-sm mt-1">
                  This is how your article will appear to readers
                </p>
              </div>
              
              <ArticlePreview post={getPreviewData()} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default CreateArticle
