import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Calendar, User, Tag, Clock, Search, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'

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

  // Blog posts data (sample)
  const blogPosts = [
    {
      id: 1,
      title: 'Les tendances du développement web en 2025',
      excerpt: 'Découvrez les dernières tendances et technologies qui façonnent le développement web cette année.',
      category: 'web-dev',
      author: 'Marie Laurent',
      date: '15 avril 2025',
      readTime: '5 min',
      image: 'https://placehold.co/800x500/1E40AF/FFFFFF?text=Web+Dev+Trends',
      tags: ['Développement Web', 'Tendances', 'Technologies']
    },
    {
      id: 2,
      title: 'Comment optimiser votre chaîne logistique',
      excerpt: 'Apprenez les meilleures pratiques pour optimiser votre chaîne logistique et réduire les coûts de transport.',
      category: 'transport',
      author: 'Pierre Martin',
      date: '28 mars 2025',
      readTime: '7 min',
      image: 'https://placehold.co/800x500/1E40AF/FFFFFF?text=Logistics',
      tags: ['Logistique', 'Transport', 'Optimisation']
    },
    {
      id: 3,
      title: 'L\'impact de l\'IA sur le secteur de la construction',
      excerpt: 'Analyse de l\'impact de l\'intelligence artificielle sur les méthodes de construction et la gestion de projets.',
      category: 'construction',
      author: 'Sophie Dubois',
      date: '10 mars 2025',
      readTime: '6 min',
      image: 'https://placehold.co/800x500/1E40AF/FFFFFF?text=AI+Construction',
      tags: ['Construction', 'IA', 'Innovation']
    },
    {
      id: 4,
      title: 'Les avantages des applications SaaS pour les entreprises',
      excerpt: 'Pourquoi les solutions SaaS sont devenues incontournables pour les entreprises de toutes tailles.',
      category: 'web-dev',
      author: 'Jean Dupont',
      date: '22 février 2025',
      readTime: '4 min',
      image: 'https://placehold.co/800x500/1E40AF/FFFFFF?text=SaaS+Apps',
      tags: ['SaaS', 'Entreprise', 'Cloud']
    },
    {
      id: 5,
      title: 'Transport écologique : les solutions d\'avenir',
      excerpt: 'Exploration des solutions de transport écologiques qui réduisent l\'impact environnemental.',
      category: 'transport',
      author: 'Pierre Martin',
      date: '15 février 2025',
      readTime: '8 min',
      image: 'https://placehold.co/800x500/1E40AF/FFFFFF?text=Green+Transport',
      tags: ['Transport', 'Écologie', 'Développement Durable']
    },
    {
      id: 6,
      title: 'Matériaux innovants pour la construction durable',
      excerpt: 'Découvrez les nouveaux matériaux qui révolutionnent la construction écologique et durable.',
      category: 'construction',
      author: 'Sophie Dubois',
      date: '5 février 2025',
      readTime: '6 min',
      image: 'https://placehold.co/800x500/1E40AF/FFFFFF?text=Sustainable+Materials',
      tags: ['Construction', 'Matériaux', 'Écologie']
    }
  ]

  // Categories
  const categories = [
    { id: 'all', name: 'Tous les articles' },
    { id: 'web-dev', name: 'Développement Web' },
    { id: 'transport', name: 'Transport & Logistique' },
    { id: 'construction', name: 'Construction & BTP' }
  ]

  // Filter posts by category and search query
  const filteredPosts = blogPosts
    .filter(post => activeCategory === 'all' || post.category === activeCategory)
    .filter(post => 
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

  // Get all unique tags
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags))].sort()

  // Get recent posts (3 most recent)
  const recentPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)

  return (
    <div>
      <HeroSection
        title={t('blog.title')}
        subtitle={t('blog.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070"
        badge={t('blog.sectionTitle')}
      />

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

              {/* Blog Posts */}
              {filteredPosts.length > 0 ? (
                <div className="space-y-12">
                  {filteredPosts.map(post => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-6 md:w-2/3">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag, index) => (
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
                            <Link to={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                              {post.title}
                            </Link>
                          </h2>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-4">
                            <div className="flex items-center">
                              <User size={16} className="mr-1" />
                              {post.author}
                            </div>
                            <div className="flex items-center">
                              <Calendar size={16} className="mr-1" />
                              {post.date}
                            </div>
                            <div className="flex items-center">
                              <Clock size={16} className="mr-1" />
                              {post.readTime} de lecture
                            </div>
                          </div>
                          <Link 
                            to={`/blog/${post.id}`} 
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
                    onClick={() => {
                      setSearchQuery('')
                      setActiveCategory('all')
                    }}
                    className="text-primary font-medium hover:text-primary/80 transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}

              {/* Pagination (simplified) */}
              {filteredPosts.length > 0 && (
                <div className="mt-12 flex justify-center">
                  <nav className="inline-flex rounded-md shadow">
                    <a
                      href="#"
                      className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-l-md"
                    >
                      Précédent
                    </a>
                    <a
                      href="#"
                      className="px-4 py-2 bg-primary border border-primary text-sm font-medium text-white hover:bg-primary/90"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="px-4 py-2 bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-r-md"
                    >
                      Suivant
                    </a>
                  </nav>
                </div>
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
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-midnight mb-4">{t('blog.recentPosts')}</h3>
                <div className="space-y-4">
                  {recentPosts.map(post => (
                    <div key={post.id} className="flex gap-3">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-medium text-midnight hover:text-primary transition-colors">
                          <Link to={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </h4>
                        <p className="text-sm text-gray-500">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
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
                  className="flex-grow px-4 py-3 rounded-md focus:outline-none"
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
