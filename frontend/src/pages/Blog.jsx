import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Calendar, User, Tag, Clock, Search, ArrowRight, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import { api } from '../services/api'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const Blog = () => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [articles, setArticles] = useState([])
  const [featuredArticles, setFeaturedArticles] = useState([])
  const [recentArticles, setRecentArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({})
  const [currentPage, setCurrentPage] = useState(1)

  // Categories
  const categories = [
    { id: 'all', name: 'Tous les articles' },
    { id: 'web-dev', name: 'Développement Web' },
    { id: 'transport', name: 'Transport & Logistique' },
    { id: 'construction', name: 'Construction & BTP' },
    { id: 'general', name: 'Général' }
  ]

  // Category colors
  const categoryColors = {
    'web-dev': 'bg-blue-100 text-blue-800',
    'transport': 'bg-green-100 text-green-800',
    'construction': 'bg-orange-100 text-orange-800',
    'general': 'bg-gray-100 text-gray-800'
  }

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Fonction pour récupérer les articles
  const fetchArticles = async (page = 1, category = 'all', search = '') => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '6'
      })

      if (category !== 'all') {
        params.append('category', category)
      }

      if (search.trim()) {
        params.append('search', search.trim())
      }

      const response = await api.get(`/articles?${params}`, false) // false = pas d'authentification
      
      if (response.success) {
        setArticles(response.data.articles || [])
        setPagination(response.data.pagination || {})
      } else {
        setError('Erreur lors du chargement des articles')
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error)
      setError('Erreur lors du chargement des articles')
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour récupérer les articles en vedette
  const fetchFeaturedArticles = async () => {
    try {
      const response = await api.get('/articles/featured?limit=3', false) // false = pas d'authentification
      if (response.success) {
        setFeaturedArticles(response.data || [])
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des articles en vedette:', error)
    }
  }

  // Fonction pour récupérer les articles récents
  const fetchRecentArticles = async () => {
    try {
      const response = await api.get('/articles/recent?limit=5', false) // false = pas d'authentification
      if (response.success) {
        setRecentArticles(response.data || [])
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des articles récents:', error)
    }
  }

  // Effect pour charger les données initiales
  useEffect(() => {
    fetchArticles(1, activeCategory, searchQuery)
    fetchFeaturedArticles()
    fetchRecentArticles()
  }, [])

  // Effect pour recharger les articles quand les filtres changent
  useEffect(() => {
    setCurrentPage(1)
    fetchArticles(1, activeCategory, searchQuery)
  }, [activeCategory, searchQuery])

  // Fonction pour changer de page
  const handlePageChange = (page) => {
    setCurrentPage(page)
    fetchArticles(page, activeCategory, searchQuery)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSearchQuery('')
    setActiveCategory('all')
    setCurrentPage(1)
  }

  // Obtenir tous les tags uniques
  const allTags = [...new Set(articles.flatMap(article => article.tags || []))].sort()

  return (
    <div>
      <HeroSection
        title={t('blog.title')}
        subtitle={t('blog.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070"
        badge={t('blog.sectionTitle')}
      />

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 
                variants={fadeIn}
                className="text-3xl font-bold text-midnight mb-12 text-center"
              >
                Articles en vedette
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredArticles.map(article => (
                  <motion.article
                    key={article.id}
                    variants={fadeIn}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {article.featuredImage && (
                      <img 
                        src={article.featuredImage} 
                        alt={article.title} 
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[article.category] || categoryColors.general}`}>
                          {t(`projects.categories.${article.category}`) || article.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-midnight mb-3">
                        <Link to={`/blog/${article.slug}`} className="hover:text-primary transition-colors">
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <User size={14} className="mr-1" />
                        <span className="mr-4">{article.author}</span>
                        <Clock size={14} className="mr-1" />
                        <span>{article.readTime} min</span>
                      </div>
                      <Link 
                        to={`/blog/${article.slug}`} 
                        className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                      >
                        Lire la suite
                        <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Search and Filter */}
              <div className="mb-12">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      placeholder="Rechercher un article..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600">Chargement des articles...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={() => fetchArticles(currentPage, activeCategory, searchQuery)}
                    className="btn btn-primary"
                  >
                    Réessayer
                  </button>
                </div>
              )}

              {/* Blog Posts */}
              {!loading && !error && (
                <>
                  {articles.length > 0 ? (
                    <div className="space-y-12">
                      {articles.map(article => (
                        <motion.article
                          key={article.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.5 }}
                          className="bg-white rounded-lg shadow-lg overflow-hidden"
                        >
                          <div className="md:flex">
                            <div className="md:w-1/3">
                              {article.featuredImage ? (
                                <img 
                                  src={article.featuredImage} 
                                  alt={article.title} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400">Pas d'image</span>
                                </div>
                              )}
                            </div>
                            <div className="p-6 md:w-2/3">
                              <div className="flex flex-wrap gap-2 mb-3">
                                {article.tags && article.tags.map((tag, index) => (
                                  <span 
                                    key={index}
                                    className="inline-flex items-center text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded-full"
                                  >
                                    <Tag size={12} className="mr-1" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <h2 className="text-2xl font-bold text-midnight mb-3">
                                <Link to={`/blog/${article.slug}`} className="hover:text-primary transition-colors">
                                  {article.title}
                                </Link>
                              </h2>
                              <p className="text-gray-600 mb-4">{article.excerpt}</p>
                              <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-4">
                                <div className="flex items-center">
                                  <User size={16} className="mr-1" />
                                  {article.author}
                                </div>
                                <div className="flex items-center">
                                  <Calendar size={16} className="mr-1" />
                                  {formatDate(article.publishedAt)}
                                </div>
                                <div className="flex items-center">
                                  <Clock size={16} className="mr-1" />
                                  {article.readTime} min de lecture
                                </div>
                                <div className="flex items-center">
                                  <Eye size={16} className="mr-1" />
                                  {article.views} vues
                                </div>
                              </div>
                              <Link 
                                to={`/blog/${article.slug}`} 
                                className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                              >
                                {t('blog.readMore')}
                                <ArrowRight size={16} className="ml-2" />
                              </Link>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                      <p className="text-gray-600 mb-4">Aucun article ne correspond à votre recherche.</p>
                      <button
                        onClick={resetFilters}
                        className="text-primary font-medium hover:text-primary/80 transition-colors"
                      >
                        Réinitialiser les filtres
                      </button>
                    </div>
                  )}

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <nav className="inline-flex rounded-md shadow">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={!pagination.hasPrevPage}
                          className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                            pagination.hasPrevPage
                              ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                              : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Précédent
                        </button>
                        
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 text-sm font-medium border-t border-b ${
                              page === currentPage
                                ? 'bg-primary border-primary text-white'
                                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={!pagination.hasNextPage}
                          className={`px-4 py-2 text-sm font-medium rounded-r-md border ${
                            pagination.hasNextPage
                              ? 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                              : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Suivant
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-midnight mb-4">{t('blog.categories')}</h3>
                <ul className="space-y-2">
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeCategory === category.id
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts */}
              {recentArticles.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-bold text-midnight mb-4">{t('blog.recentPosts')}</h3>
                  <div className="space-y-4">
                    {recentArticles.map(article => (
                      <div key={article.id} className="flex gap-3">
                        {article.featuredImage && (
                          <img 
                            src={article.featuredImage} 
                            alt={article.title} 
                            className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                          />
                        )}
                        <div>
                          <h4 className="font-medium text-midnight hover:text-primary transition-colors">
                            <Link to={`/blog/${article.slug}`}>
                              {article.title}
                            </Link>
                          </h4>
                          <p className="text-sm text-gray-500">{formatDate(article.publishedAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {allTags.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-midnight mb-4">{t('blog.tags')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(tag)}
                        className="inline-flex items-center text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                      >
                        <Tag size={14} className="mr-1" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Restez informé
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-xl mb-8"
              >
                Abonnez-vous à notre newsletter pour recevoir nos derniers articles et actualités.
              </motion.p>
              
              <motion.form 
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-grow px-4 py-3 rounded-md focus:outline-none text-gray-900"
                  required
                />
                <button
                  type="submit"
                  className="btn bg-white text-primary hover:bg-gray-100 whitespace-nowrap"
                >
                  {t('footer.newsletter.subscribe')}
                </button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog
