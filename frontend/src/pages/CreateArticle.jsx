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
import { useTranslation } from 'react-i18next'
import { createPost, uploadImage } from '../services/api'
import RichTextEditor from '../components/RichTextEditor'
import ArticlePreview from '../components/ArticlePreview'

const CreateArticle = () => {
  const { t } = useTranslation()
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
  
  // Catégories disponibles
  const categories = [
    { value: 'web-dev', label: 'Développement Web', color: 'bg-blue-100 text-blue-800', icon: '💻', gradient: 'from-blue-500 to-cyan-500' },
    { value: 'transport', label: 'Transport', color: 'bg-green-100 text-green-800', icon: '🚛', gradient: 'from-green-500 to-emerald-500' },
    { value: 'construction', label: 'Construction', color: 'bg-orange-100 text-orange-800', icon: '🏗️', gradient: 'from-orange-500 to-amber-500' },
    { value: 'general', label: 'Général', color: 'bg-gray-100 text-gray-800', icon: '📝', gradient: 'from-gray-500 to-slate-500' },
    { value: 'tech', label: 'Technologie', color: 'bg-purple-100 text-purple-800', icon: '⚡', gradient: 'from-purple-500 to-violet-500' },
    { value: 'design', label: 'Design', color: 'bg-pink-100 text-pink-800', icon: '🎨', gradient: 'from-pink-500 to-rose-500' }
  ]
  
  // Étapes de création
  const steps = [
    { id: 1, title: 'Informations de base', icon: <FileText size={20} />, description: 'Titre, catégorie et résumé' },
    { id: 2, title: 'Contenu principal', icon: <PenTool size={20} />, description: 'Rédaction de l\'article' },
    { id: 3, title: 'Médias et finalisation', icon: <ImageIcon size={20} />, description: 'Image et publication' }
  ]
  
  // Calculer le nombre de mots et temps de lecture
  useEffect(() => {
    const text = formData.content.replace(/<[^>]*>/g, '') // Supprimer les balises HTML
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    const count = words.length
    setWordCount(count)
    setReadTime(Math.ceil(count / 200)) // 200 mots par minute
  }, [formData.content])
  
  // Gérer les changements de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Gérer le changement de contenu
  const handleContentChange = (content) => {
    setFormData(prev => ({ ...prev, content }))
  }
  
  // Gérer l'upload d'image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    if (!file.type.startsWith('image/')) {
      setSaveError('Veuillez sélectionner un fichier image valide')
      return
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setSaveError('La taille de l\'image ne doit pas dépasser 5MB')
      return
    }
    
    setIsUploading(true)
    setSaveError('')
    
    try {
      const imageUrl = await uploadImage(file)
      setFormData(prev => ({ ...prev, featuredImage: imageUrl }))
    } catch (error) {
      console.error('Erreur lors du téléchargement de l\'image:', error)
      setSaveError('Erreur lors du téléchargement de l\'image: ' + error.message)
    } finally {
      setIsUploading(false)
    }
  }
  
  // Sauvegarder l'article
  const handleSave = async (status = 'draft') => {
    setSaveSuccess(false)
    setSaveError('')
    
    // Validation
    if (!formData.title.trim()) {
      setSaveError('Le titre est obligatoire')
      return
    }
    
    if (!formData.excerpt.trim()) {
      setSaveError('Le résumé est obligatoire')
      return
    }
    
    if (!formData.content.trim()) {
      setSaveError('Le contenu est obligatoire')
      return
    }
    
    if (!formData.author.trim()) {
      setSaveError('L\'auteur est obligatoire')
      return
    }
    
    setIsSaving(true)
    
    try {
      // Traiter les tags
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '')
      
      const articleData = {
        ...formData,
        tags: tagsArray,
        status
      }
      
      await createPost(articleData)
      
      setSaveSuccess(true)
      setTimeout(() => {
        navigate('/admin')
      }, 2000)
      
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      setSaveError(error.message || 'Erreur lors de la sauvegarde de l\'article')
    } finally {
      setIsSaving(false)
    }
  }
  
  // Obtenir les informations de catégorie
  const getCategoryInfo = (categoryValue) => {
    return categories.find(cat => cat.value === categoryValue) || categories[0]
  }
  
  // Préparer les données pour l'aperçu
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
  
  // Calculer le pourcentage de progression
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
                <h1 className="text-2xl font-bold text-gray-900">Créer un nouvel article</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {wordCount} mots • {readTime} min de lecture • {getProgressPercentage()}% complété
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
                  {showPreview ? 'Édition' : 'Aperçu'}
                </span>
              </button>
              
              <button
                onClick={() => handleSave('draft')}
                disabled={isSaving}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <Save size={18} />
                <span className="hidden sm:inline">
                  {isSaving ? 'Sauvegarde...' : 'Brouillon'}
                </span>
              </button>
              
              <button
                onClick={() => handleSave('published')}
                disabled={isSaving}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-4 py-2 rounded-xl hover:from-green-700 hover:to-emerald-800 transition-all duration-200 shadow-lg shadow-green-600/25 disabled:opacity-50"
              >
                <Globe size={18} />
                <span className="hidden sm:inline">
                  {isSaving ? 'Publication...' : 'Publier'}
                </span>
              </button>
            </div>
          </div>
          
          {/* Barre de progression */}
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
      
      {/* Messages de succès/erreur */}
      {saveSuccess && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-6">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 rounded-2xl flex items-center shadow-lg animate-in slide-in-from-top duration-300">
            <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mr-3">
              <Check size={18} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold">Article créé avec succès !</p>
              <p className="text-sm text-green-600">Redirection vers le tableau de bord...</p>
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
              <p className="font-semibold">Erreur lors de la création</p>
              <p className="text-sm text-red-600">{saveError}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {!showPreview ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Formulaire principal */}
            <div className="lg:col-span-3 space-y-8">
              {/* Informations de base */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Informations de base</h2>
                    <p className="text-sm text-gray-500">Définissez les éléments essentiels de votre article</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Titre */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Titre de l'article *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Entrez un titre accrocheur..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                    />
                  </div>
                  
                  {/* Catégorie */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Catégorie *
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
                  
                  {/* Résumé */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Résumé de l'article *
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      placeholder="Décrivez brièvement le contenu de votre article..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.excerpt.length}/300 caractères recommandés
                    </p>
                  </div>
                  
                  {/* Auteur */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Auteur *
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Nom de l'auteur"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
              
              {/* Contenu principal */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mr-4">
                    <PenTool className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Contenu de l'article</h2>
                    <p className="text-sm text-gray-500">Rédigez le contenu principal de votre article</p>
                  </div>
                </div>
                
                <RichTextEditor
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Commencez à écrire votre article..."
                  height="500px"
                />
                
                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>{wordCount} mots</span>
                    <span>•</span>
                    <span>{readTime} min de lecture</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${wordCount > 300 ? 'bg-green-500' : wordCount > 100 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <span>
                      {wordCount > 300 ? 'Longueur optimale' : wordCount > 100 ? 'Contenu court' : 'Contenu très court'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Image à la une */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex items-center mb-4">
                  <ImageIcon className="w-5 h-5 text-indigo-500 mr-2" />
                  <h3 className="font-semibold text-gray-900">Image à la une</h3>
                </div>
                
                {formData.featuredImage ? (
                  <div className="relative">
                    <img
                      src={formData.featuredImage}
                      alt="Image à la une"
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
                          <p className="text-sm text-gray-600">Téléchargement...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Camera className="w-8 h-8 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Cliquez pour ajouter une image</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG jusqu'à 5MB</p>
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
                  Séparez les tags par des virgules
                </p>
              </div>
              
              {/* Statistiques */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex items-center mb-4">
                  <Target className="w-5 h-5 text-indigo-500 mr-2" />
                  <h3 className="font-semibold text-gray-900">Statistiques</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progression</span>
                    <span className="text-sm font-semibold text-indigo-600">{getProgressPercentage()}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Mots</span>
                    <span className="text-sm font-semibold text-gray-900">{wordCount}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lecture</span>
                    <span className="text-sm font-semibold text-gray-900">{readTime} min</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Catégorie</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getCategoryInfo(formData.category).color}`}>
                      {getCategoryInfo(formData.category).icon} {getCategoryInfo(formData.category).label}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Conseils */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-5 h-5 text-indigo-500 mr-2" />
                  <h3 className="font-semibold text-indigo-900">Conseils</h3>
                </div>
                
                <ul className="space-y-2 text-sm text-indigo-700">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Utilisez un titre accrocheur et descriptif</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Ajoutez une image pour attirer l'attention</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Visez 300+ mots pour un bon référencement</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    <span>Utilisez des tags pertinents</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* Mode aperçu */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-lg">
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center">
                  <Eye className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">Mode aperçu</span>
                </div>
                <p className="text-blue-600 text-sm mt-1">
                  Voici comment votre article apparaîtra aux lecteurs
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
