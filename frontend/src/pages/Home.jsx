import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Code, Truck, Building, Users, Star } from 'lucide-react'
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

const Home = () => {
  const { t } = useTranslation()

  // Services data
  const services = [
    {
      icon: <Code size={40} className="text-primary" />,
      title: t('home.services.webDev.title'),
      description: t('home.services.webDev.description'),
      link: '/services#web-dev'
    },
    {
      icon: <Truck size={40} className="text-primary" />,
      title: t('home.services.transport.title'),
      description: t('home.services.transport.description'),
      link: '/services#transport'
    },
    {
      icon: <Building size={40} className="text-primary" />,
      title: t('home.services.construction.title'),
      description: t('home.services.construction.description'),
      link: '/services#construction'
    }
  ]

  // Projects data (sample)
  const projects = [
    {
      id: 1,
      title: 'Application SaaS de gestion',
      category: 'web-dev',
      image: '/images/web-saas.jpg',
    },
    {
      id: 2,
      title: 'Flotte de livraison express',
      category: 'transport',
      image: '/images/web-cons.jpg'
    },
    {
      id: 3,
      title: 'Rénovation d\'immeuble commercial',
      category: 'construction',
      image: '/images/web-trans.jpg'
    }
  ]

  // Testimonials data (sample)
  const testimonials = [
    {
      id: 1,
      name: 'Sophie Martin',
      role: 'CEO, TechStart',
      content: 'NEOBIZE a développé notre plateforme SaaS avec une expertise remarquable. Leur équipe a su comprendre nos besoins et livrer un produit qui dépasse nos attentes.',
      avatar: 'https://placehold.co/100/1E40AF/FFFFFF?text=SM'
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      role: 'Directeur Logistique, LogiTrans',
      content: 'Le service de transport de NEOBIZE est fiable et efficace. Nous utilisons leurs services depuis plus d\'un an et sommes très satisfaits de la qualité et de la ponctualité.',
      avatar: 'https://placehold.co/100/1E40AF/FFFFFF?text=TD'
    },
    {
      id: 3,
      name: 'Marie Leroy',
      role: 'Architecte, UrbanDesign',
      content: 'Nous avons collaboré avec NEOBIZE sur plusieurs projets de construction. Leur professionnalisme et leur attention aux détails font d\'eux un partenaire de choix.',
      avatar: 'https://placehold.co/100/1E40AF/FFFFFF?text=ML'
    }
  ]

  // Partners data
  const partners = [
    {
      id: 1,
      name: 'TechInnovate',
      logo: 'https://placehold.co/200x80/0078D7/FFFFFF?text=TechInnovate',
      industry: 'Technology',
      website: 'https://example.com/techinnovate',
      bgColor: 'bg-blue-600'
    },
    {
      id: 2,
      name: 'LogiTrans',
      logo: 'https://placehold.co/200x80/FF6B00/FFFFFF?text=LogiTrans',
      industry: 'Logistics',
      website: 'https://example.com/logitrans',
      bgColor: 'bg-orange-600'
    },
    {
      id: 3,
      name: 'UrbanDesign',
      logo: 'https://placehold.co/200x80/7030A0/FFFFFF?text=UrbanDesign',
      industry: 'Architecture',
      website: 'https://example.com/urbandesign',
      bgColor: 'bg-purple-700'
    },
    {
      id: 4,
      name: 'MediCare',
      logo: 'https://placehold.co/200x80/00B050/FFFFFF?text=MediCare',
      industry: 'Healthcare',
      website: 'https://example.com/medicare',
      bgColor: 'bg-green-600'
    },
    {
      id: 5,
      name: 'EcoSolutions',
      logo: 'https://placehold.co/200x80/C00000/FFFFFF?text=EcoSolutions',
      industry: 'Environment',
      website: 'https://example.com/ecosolutions',
      bgColor: 'bg-red-600'
    }
  ]

  return (
    <div>
      <HeroSection
        title={t('home.hero.title')}
        subtitle={t('home.hero.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069"
        fullHeight={true}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/services" 
            className="btn btn-primary text-lg px-8 py-3 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">{t('home.hero.cta')}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-primary bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></span>
          </Link>
        </div>
      </HeroSection>
      
      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-r from-primary to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <motion.div variants={fadeIn} className="p-4">
              <h3 className="text-4xl font-bold mb-2">150+</h3>
              <p className="text-gray-200">Projets réalisés</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="p-4">
              <h3 className="text-4xl font-bold mb-2">98%</h3>
              <p className="text-gray-200">Clients satisfaits</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="p-4">
              <h3 className="text-4xl font-bold mb-2">15+</h3>
              <p className="text-gray-200">Experts</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="p-4">
              <h3 className="text-4xl font-bold mb-2">3</h3>
              <p className="text-gray-200">Domaines d'expertise</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-bl-full opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 rounded-tr-full opacity-70"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div 
              variants={fadeIn}
              className="inline-block bg-blue-100 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4"
            >
              {t('home.services.sectionTitle')}
            </motion.div>
            
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
            >
              {t('home.services.title')}
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {t('home.services.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="mb-6 bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <div className="text-primary group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-midnight">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  to={service.link} 
                  className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors group-hover:translate-x-2 transition-transform duration-300"
                >
                  {t('common.readMore')}
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full opacity-50"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-100 rounded-full opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div 
                variants={fadeIn}
                className="inline-block bg-blue-100 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4"
              >
                {t('home.about.sectionTitle')}
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
              >
                {t('home.about.title')}
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-lg text-gray-600 mb-4"
              >
                {t('home.about.subtitle')}
              </motion.p>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 mb-8"
              >
                {t('home.about.description')}
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                className="flex flex-wrap gap-6 mb-8"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <div className="text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-midnight">Qualité</h4>
                    <p className="text-sm text-gray-600">Excellence dans tous nos services</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <div className="text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-midnight">Innovation</h4>
                    <p className="text-sm text-gray-600">Solutions modernes et efficaces</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn}>
                <Link 
                  to="/about" 
                  className="btn btn-primary"
                >
                  {t('common.readMore')}
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-full h-full bg-primary rounded-lg transform rotate-3"></div>
                <div className="relative z-10 bg-white p-3 rounded-lg shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070" 
                    alt="NEOBIZE Team" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-lg shadow-lg">
                  <Users size={32} className="mb-2" />
                  <h3 className="text-xl font-bold">{t('about.team.title')}</h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-40 right-0 w-72 h-72 bg-blue-50 rounded-l-full opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div 
              variants={fadeIn}
              className="inline-block bg-blue-100 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4"
            >
              {t('home.projects.sectionTitle')}
            </motion.div>
            
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
            >
              {t('home.projects.title')}
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {t('home.projects.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <div className="absolute top-4 left-4 z-20 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  {project.category === 'web-dev' ? 'Web & Mobile' : 
                   project.category === 'transport' ? 'Transport' : 'Construction'}
                </div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <Link 
                    to={`/projects/${project.id}`} 
                    className="text-white/80 hover:text-white transition-colors inline-flex items-center group-hover:translate-x-2 transition-transform duration-300"
                  >
                    {t('projects.viewProject')}
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link 
              to="/projects" 
              className="btn btn-outline"
            >
              {t('home.projects.viewAll')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-100 rounded-full opacity-50"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-100 rounded-full opacity-50"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div 
              variants={fadeIn}
              className="inline-block bg-blue-100 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4"
            >
              {t('home.testimonials.sectionTitle')}
            </motion.div>
            
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
            >
              {t('home.testimonials.title')}
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {t('home.testimonials.subtitle')}
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-lg relative border border-gray-100 transition-all"
              >
                <div className="absolute -top-5 left-8">
                  <div className="bg-yellow-400 p-2 rounded-full">
                    <Star size={24} className="text-white" />
                  </div>
                </div>
                <div className="mb-6 pt-4">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </div>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-midnight">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div 
              variants={fadeIn}
              className="inline-block bg-blue-100 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4"
            >
              {t('home.partners.title').toUpperCase()}
            </motion.div>
            
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
            >
              {t('home.partners.title')}
            </motion.h2>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex justify-center items-center space-x-8"
          >
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                variants={fadeIn}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  filter: "grayscale(0)"
                }}
                className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 grayscale hover:grayscale-0 w-[180px] h-[90px] flex items-center justify-center ${partner.bgColor} bg-opacity-10 border border-gray-200`}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 italic">
              {t('common.discover')} {t('common.services').toLowerCase()} {t('common.readMore').toLowerCase()}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-800 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 right-10 w-80 h-80 bg-white rounded-full"></div>
            <div className="absolute bottom-10 left-10 w-60 h-60 bg-white rounded-full"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="text-center"
            >
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-5xl font-bold mb-6"
              >
                {t('home.cta.title')}
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-xl mb-10 max-w-2xl mx-auto"
              >
                {t('home.cta.description')}
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link 
                  to="/contact" 
                  className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
                >
                  {t('home.cta.button')}
                </Link>
                <Link 
                  to="/services" 
                  className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3"
                >
                  {t('common.services')}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
