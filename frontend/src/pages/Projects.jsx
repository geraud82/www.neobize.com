import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code, Truck, Building, ArrowRight } from 'lucide-react'
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

const Projects = () => {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')

  // Projects data (sample)
  const projects = [
    {
      id: 1,
      title: 'Plateforme SaaS de gestion de projet',
      category: 'webDev',
      description: 'Développement d\'une plateforme SaaS complète pour la gestion de projets, incluant des fonctionnalités de suivi des tâches, de collaboration et de reporting.',
      image: '/images/web-saas.jpg',
      client: 'TechStart',
      year: '2023'
    },
    {
      id: 2,
      title: 'Application mobile de e-commerce',
      category: 'webDev',
      description: 'Création d\'une application mobile de e-commerce avec des fonctionnalités de paiement sécurisé, de gestion des commandes et de fidélisation des clients.',
      image: '/images/web-mobileapp.jpg',
      client: 'ShopNow',
      year: '2022'
    },
    {
      id: 3,
      title: 'Optimisation de flotte de livraison',
      category: 'transport',
      description: 'Mise en place d\'un système d\'optimisation des itinéraires pour une flotte de véhicules de livraison, permettant de réduire les coûts et d\'améliorer l\'efficacité.',
      image: 'https://placehold.co/800x600/1E40AF/FFFFFF?text=Transport+Fleet',
      client: 'LogiTrans',
      year: '2023'
    },
    {
      id: 4,
      title: 'Service de livraison médicale express',
      category: 'transport',
      description: 'Développement d\'un service de livraison express pour le secteur médical, garantissant la livraison rapide et sécurisée de médicaments et d\'équipements médicaux.',
      image: 'https://placehold.co/800x600/1E40AF/FFFFFF?text=Medical+Delivery',
      client: 'MediExpress',
      year: '2022'
    },
    {
      id: 5,
      title: 'Construction d\'un immeuble de bureaux écologique',
      category: 'construction',
      description: 'Construction d\'un immeuble de bureaux respectueux de l\'environnement, intégrant des technologies d\'économie d\'énergie et des matériaux durables.',
      image: 'https://placehold.co/800x600/1E40AF/FFFFFF?text=Green+Building',
      client: 'EcoOffice',
      year: '2023'
    },
    {
      id: 6,
      title: 'Rénovation d\'un bâtiment historique',
      category: 'construction',
      description: 'Rénovation complète d\'un bâtiment historique, préservant son caractère architectural tout en modernisant ses installations et en améliorant son efficacité énergétique.',
      image: 'https://placehold.co/800x600/1E40AF/FFFFFF?text=Historic+Renovation',
      client: 'PatrimoineRénov',
      year: '2021'
    }
  ]

  // Filter projects by category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  // Category icons
  const categoryIcons = {
    webDev: <Code size={20} className="mr-2" />,
    transport: <Truck size={20} className="mr-2" />,
    construction: <Building size={20} className="mr-2" />
  }

  return (
    <div>
      <HeroSection
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071"
        badge={t('projects.sectionTitle')}
      />

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Filter Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {t('projects.categories.all')}
            </button>
            <button
              onClick={() => setActiveCategory('webDev')}
              className={`px-6 py-2 rounded-full transition-colors flex items-center ${
                activeCategory === 'webDev'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {categoryIcons.webDev}
              {t('projects.categories.webDev')}
            </button>
            <button
              onClick={() => setActiveCategory('transport')}
              className={`px-6 py-2 rounded-full transition-colors flex items-center ${
                activeCategory === 'transport'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {categoryIcons.transport}
              {t('projects.categories.transport')}
            </button>
            <button
              onClick={() => setActiveCategory('construction')}
              className={`px-6 py-2 rounded-full transition-colors flex items-center ${
                activeCategory === 'construction'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {categoryIcons.construction}
              {t('projects.categories.construction')}
            </button>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                    {project.year}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    {categoryIcons[project.category]}
                    <span className="text-sm font-medium text-gray-500">
                      {t(`projects.categories.${project.category}`)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-midnight mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      Client: {project.client}
                    </span>
                    <Link 
                      to={`/projects/${project.id}`} 
                      className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
                    >
                      {t('projects.viewProject')}
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
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
              Vous avez un projet en tête ?
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl mb-8 max-w-2xl mx-auto"
            >
              Contactez-nous pour discuter de votre projet et découvrir comment NEOBIZE peut vous aider à le réaliser.
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

export default Projects
