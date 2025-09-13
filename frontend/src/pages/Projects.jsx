import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code, Truck, Building, ArrowRight, MapPin, Calendar, User } from 'lucide-react'
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
  const [activeCategory, setActiveCategory] = useState('all')

  // NEOBIZE Projects - Transportation & Digital Solutions
  const projects = [
    {
      id: 1,
      title: 'NEMT Fleet Management System',
      category: 'transportation',
      description: 'Comprehensive Non-Emergency Medical Transportation fleet management system serving patients across Africa and USA with real-time tracking, scheduling, and route optimization.',
      image: '/images/web-trans.jpg',
      client: 'HealthCare Plus',
      year: '2023',
      location: 'USA & Africa',
      technologies: ['GPS Tracking', 'Real-time Scheduling', 'Medical Equipment Integration'],
      results: '500+ successful trips, 98% patient satisfaction'
    },
    {
      id: 2,
      title: 'Airport Shuttle Mobile App',
      category: 'webDev',
      description: 'Custom mobile application for airport shuttle services with GPS tracking, booking system, payment integration, and real-time passenger notifications.',
      image: '/images/web-mobileapp.jpg',
      client: 'AirPort Express',
      year: '2023',
      location: 'Africa',
      technologies: ['React Native', 'GPS Integration', 'Payment Gateway', 'Push Notifications'],
      results: '24/7 service availability, 40% increase in bookings'
    },
    {
      id: 3,
      title: 'Medical Carrier SaaS Platform',
      category: 'saas',
      description: 'Advanced SaaS platform for medical carrier operations with AI-powered route optimization, patient care management, and healthcare system integration.',
      image: '/images/web-saas.jpg',
      client: 'MedTrans Solutions',
      year: '2024',
      location: 'USA',
      technologies: ['AI Route Optimization', 'Healthcare APIs', 'Cloud Infrastructure', 'Analytics Dashboard'],
      results: '30% reduction in transport time, improved patient care coordination'
    },
    {
      id: 4,
      title: 'Transportation Booking Web Platform',
      category: 'webDev',
      description: 'Comprehensive web platform for booking various transportation services including NEMT, airport shuttles, and medical carriers with integrated payment and scheduling.',
      image: '/images/web-imag.jpg',
      client: 'TransportHub',
      year: '2023',
      location: 'Africa & USA',
      technologies: ['React.js', 'Node.js', 'Payment Integration', 'Booking System'],
      results: 'Multi-service platform serving 1000+ users monthly'
    },
    {
      id: 5,
      title: 'AI-Powered Route Optimization System',
      category: 'saas',
      description: 'Intelligent route optimization system using machine learning to optimize transportation routes, reduce fuel costs, and improve service efficiency.',
      image: '/images/web-saas.jpg',
      client: 'LogiTrans',
      year: '2024',
      location: 'Africa',
      technologies: ['Machine Learning', 'Route Algorithms', 'Real-time Data', 'Analytics'],
      results: '25% fuel cost reduction, 35% improvement in delivery times'
    },
    {
      id: 6,
      title: 'Patient Care Management Mobile App',
      category: 'webDev',
      description: 'Mobile application for healthcare providers to manage patient transportation, track medical equipment, and coordinate with NEMT services.',
      image: '/images/web-mobileapp.jpg',
      client: 'MediCare Network',
      year: '2023',
      location: 'USA',
      technologies: ['Flutter', 'Healthcare APIs', 'Real-time Tracking', 'Secure Messaging'],
      results: 'Streamlined patient care coordination for 50+ healthcare facilities'
    }
  ]

  // Filter projects by category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  // Category icons
  const categoryIcons = {
    webDev: <Code size={20} className="mr-2" />,
    transportation: <Truck size={20} className="mr-2" />,
    saas: <Building size={20} className="mr-2" />
  }

  return (
    <div>
      <HeroSection
        title="NEOBIZE Projects: Transportation & Digital Solutions Portfolio"
        subtitle="Explore our successful NEMT, Airport Shuttle, Medical Carrier projects and innovative Web Development, Mobile Apps, SaaS, and AI Solutions across Africa and USA."
        backgroundImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071"
        badge="OUR PROJECTS"
      />

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Introduction */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-6 text-midnight"
            >
              NEOBIZE Project Success Stories
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-4xl mx-auto"
            >
              Discover how NEOBIZE has transformed transportation services and delivered cutting-edge digital solutions for clients across Africa and USA, combining reliability with innovation.
            </motion.p>
          </motion.div>

          {/* Filter Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                activeCategory === 'all'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveCategory('transportation')}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center font-medium ${
                activeCategory === 'transportation'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoryIcons.transportation}
              Transportation Services
            </button>
            <button
              onClick={() => setActiveCategory('webDev')}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center font-medium ${
                activeCategory === 'webDev'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoryIcons.webDev}
              Web & Mobile Apps
            </button>
            <button
              onClick={() => setActiveCategory('saas')}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center font-medium ${
                activeCategory === 'saas'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoryIcons.saas}
              SaaS & AI Solutions
            </button>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                    {project.year}
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                    <MapPin size={12} className="mr-1" />
                    {project.location}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center text-primary">
                      {categoryIcons[project.category]}
                    </div>
                    <span className="text-sm font-medium text-gray-500 ml-1">
                      {project.category === 'webDev' ? 'Web & Mobile Apps' : 
                       project.category === 'transportation' ? 'Transportation Services' : 
                       'SaaS & AI Solutions'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-midnight mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-green-800 text-sm font-medium">
                      📈 {project.results}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <User size={14} className="mr-1" />
                      <span className="font-medium">{project.client}</span>
                    </div>
                    <Link 
                      to={`/projects/${project.id}`} 
                      className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors group-hover:translate-x-1 transition-transform duration-300"
                    >
                      View Details
                      <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-20 bg-gradient-to-r from-primary to-blue-800 rounded-2xl p-8 text-white"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div variants={fadeIn}>
                <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
                <div className="text-white/90">Projects Completed</div>
              </motion.div>
              <motion.div variants={fadeIn}>
                <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
                <div className="text-white/90">Client Satisfaction</div>
              </motion.div>
              <motion.div variants={fadeIn}>
                <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
                <div className="text-white/90">NEMT Trips</div>
              </motion.div>
              <motion.div variants={fadeIn}>
                <div className="text-3xl md:text-4xl font-bold mb-2">2</div>
                <div className="text-white/90">Continents Served</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-6 text-midnight"
            >
              Technologies We Use
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Cutting-edge technologies powering our transportation services and digital solutions
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'React.js', 'Node.js', 'Flutter', 'AI/ML', 'GPS Tracking', 'Cloud AWS',
              'Payment APIs', 'Healthcare APIs', 'Real-time Analytics', 'Mobile Apps', 'SaaS Platforms', 'Route Optimization'
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-sm font-medium text-gray-800">{tech}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-800 text-white">
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
              Ready to Start Your Transportation or Technology Project?
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl mb-8 max-w-3xl mx-auto"
            >
              Join our satisfied clients across Africa and USA. Contact NEOBIZE today to discuss your NEMT, airport shuttle, medical carrier, or digital solution needs.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                to="/contact" 
                className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
              >
                Start Your Project
              </Link>
              <Link 
                to="/services" 
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3"
              >
                Explore Our Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Projects
