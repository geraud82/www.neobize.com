import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Tag, Clock, Eye, Share2, Facebook, Twitter, Linkedin, Copy, CheckCircle } from 'lucide-react'
import { marked } from 'marked'
import { getArticleBySlug, getPublishedPosts } from '../services/api'

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

const BlogDetail = () => {
  const { slug } = useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [relatedArticles, setRelatedArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  // Category icons
  const categoryIcons = {
    'web-dev': '💻',
    'transport': '🚛',
    'construction': '🏗️',
    'general': '📝'
  }

  // Category colors
  const categoryColors = {
    'web-dev': 'bg-blue-100 text-blue-800',
    'transport': 'bg-green-100 text-green-800',
    'construction': 'bg-orange-100 text-orange-800',
    'general': 'bg-gray-100 text-gray-800'
  }

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        setError(null)

        // Récupérer l'article par slug
        const articleData = await getArticleBySlug(slug)
        setArticle(articleData)
        
        // Récupérer les articles liés de la même catégorie
        const allArticles = await getPublishedPosts()
        const filtered = allArticles
          .filter(a => a.category === articleData.category && a.slug !== slug)
          .slice(0, 3)
        setRelatedArticles(filtered)
        
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'article:', error)
        if (error.message.includes('404') || error.message.includes('non trouvé')) {
          setError('Article non trouvé')
        } else {
          setError('Erreur lors du chargement de l\'article')
        }
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchArticle()
    }
  }, [slug])

  // Fonction pour partager l'article
  const shareArticle = (platform) => {
    const url = window.location.href
    const title = article?.title || ''
    const text = article?.excerpt || ''

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400')
    }
  }

  // Fonction pour copier le lien
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'article...</p>
        </div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-midnight mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-8">{error || 'L\'article que vous recherchez n\'existe pas ou a été supprimé.'}</p>
          <div className="space-y-4">
            <Link 
              to="/blog" 
              className="btn btn-primary flex items-center justify-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Retour au blog
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline flex items-center justify-center w-full"
            >
              Retour à la page précédente
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-midnight text-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-midnight via-primary/40 to-midnight/80 z-10"></div>
          
          {/* Background image */}
          {article.featuredImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 z-0" 
              style={{ backgroundImage: `url('${article.featuredImage}')` }}
            ></div>
          )}
          
          {/* Animated shapes */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              {t('blog.title')}
            </Link>
            
            <div className="flex items-center mb-4">
              <span className={`inline-flex items-center text-sm font-medium px-3 py-1 rounded-full ${categoryColors[article.category] || categoryColors.general}`}>
                <span className="mr-1">{categoryIcons[article.category] || categoryIcons.general}</span>
                {t(`projects.categories.${article.category}`) || article.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              {article.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <User size={20} className="mr-2 text-primary" />
                <span>{article.author}</span>
              </div>
              
              <div className="flex items-center">
                <Calendar size={20} className="mr-2 text-primary" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              
              <div className="flex items-center">
                <Clock size={20} className="mr-2 text-primary" />
                <span>{article.readTime} min de lecture</span>
              </div>
              
              <div className="flex items-center">
                <Eye size={20} className="mr-2 text-primary" />
                <span>{article.views} vues</span>
              </div>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center text-sm bg-white/10 text-white px-3 py-1 rounded-full"
                  >
                    <Tag size={14} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Image */}
              {article.featuredImage && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="mb-12"
                >
                  <img 
                    src={article.featuredImage} 
                    alt={article.title} 
                    className="w-full h-96 object-cover rounded-lg shadow-lg"
                  />
                </motion.div>
              )}

              {/* Article Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="prose prose-lg max-w-none"
              >
                <motion.div 
                  variants={fadeIn}
                  dangerouslySetInnerHTML={{ __html: marked(article.content) }}
                />
              </motion.div>

              {/* Share Section */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <h3 className="text-xl font-bold text-midnight mb-4">Partager cet article</h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => shareArticle('facebook')}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Facebook size={16} className="mr-2" />
                    Facebook
                  </button>
                  
                  <button
                    onClick={() => shareArticle('twitter')}
                    className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
                  >
                    <Twitter size={16} className="mr-2" />
                    Twitter
                  </button>
                  
                  <button
                    onClick={() => shareArticle('linkedin')}
                    className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin size={16} className="mr-2" />
                    LinkedIn
                  </button>
                  
                  <button
                    onClick={copyLink}
                    className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                      copied 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {copied ? (
                      <>
                        <CheckCircle size={16} className="mr-2" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="mr-2" />
                        Copier le lien
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Author Info */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="bg-gray-50 rounded-lg p-6 mb-8"
              >
                <h3 className="text-lg font-bold text-midnight mb-4">À propos de l'auteur</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium text-midnight">{article.author}</h4>
                    <p className="text-sm text-gray-600">Expert NEOBIZE</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Spécialiste dans le domaine {t(`projects.categories.${article.category}`) || article.category}, 
                  avec une expertise approfondie dans les dernières technologies et tendances du secteur.
                </p>
              </motion.div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="text-lg font-bold text-midnight mb-4">Articles similaires</h3>
                  <div className="space-y-4">
                    {relatedArticles.map(relatedArticle => (
                      <Link
                        key={relatedArticle.id}
                        to={`/blog/${relatedArticle.slug}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          {relatedArticle.featuredImage && (
                            <img 
                              src={relatedArticle.featuredImage} 
                              alt={relatedArticle.title} 
                              className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                            />
                          )}
                          <div className="flex-grow">
                            <h4 className="font-medium text-midnight group-hover:text-primary transition-colors line-clamp-2">
                              {relatedArticle.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {formatDate(relatedArticle.publishedAt)}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {relatedArticle.readTime} min de lecture
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
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
              Besoin d'aide pour votre projet ?
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl mb-8 max-w-2xl mx-auto"
            >
              Contactez-nous pour discuter de vos besoins et découvrir comment NEOBIZE peut vous accompagner dans la réalisation de vos projets.
            </motion.p>
            
            <motion.div variants={fadeIn}>
              <Link 
                to="/contact" 
                className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
              >
                {t('common.contactUs')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default BlogDetail
