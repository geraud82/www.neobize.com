import { useEffect } from 'react'
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
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    if (apiUrl) {
      fetch(`${apiUrl}/api/hello`)
        .then(res => {
          if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
            return res.json();
          } else {
            throw new Error('API response is not JSON');
          }
        })
        .then(data => console.log('API Response:', data))
        .catch(err => console.error('API Error:', err));
    } else {
      console.log('VITE_API_URL not defined');
    }
  }, []);

  // Services data
  const services = [
    {
      icon: <Truck size={40} />,
      title: 'Transportation Services',
      description: 'NEOBIZE provides NEMT (Non-Emergency Medical Transportation), Airport Shuttle services, and Medical Carrier solutions across Africa and USA.',
      link: '/services#transportation'
    },
    {
      icon: <Code size={40} />,
      title: 'Web & Mobile Apps',
      description: 'Custom web development and mobile app solutions designed to transform your business with cutting-edge technology and user-friendly interfaces.',
      link: '/services#web-mobile'
    },
    {
      icon: <Building size={40} />,
      title: 'SaaS & AI Solutions',
      description: 'Advanced SaaS platforms and AI-powered solutions that streamline operations and drive business growth through intelligent automation.',
      link: '/services#saas-ai'
    }
  ]

  // Projects data - NEOBIZE Transportation & Tech Solutions
  const projects = [
    {
      id: 1,
      title: 'NEMT Fleet Management System',
      category: 'transportation',
      domain: 'Transportation Services',
      description: 'Advanced Non-Emergency Medical Transportation fleet management system serving patients across Africa and USA with real-time tracking and scheduling.',
      image: '/images/web-trans.jpg',
    },
    {
      id: 2,
      title: 'Airport Shuttle Mobile App',
      category: 'mobile-app',
      domain: 'Mobile App Development',
      description: 'Custom mobile application for airport shuttle services with GPS tracking, booking system, and payment integration for seamless passenger experience.',
      image: '/images/web-mobileapp.jpg'
    },
    {
      id: 3,
      title: 'Medical Carrier SaaS Platform',
      category: 'saas',
      domain: 'SaaS & AI Solutions',
      description: 'Comprehensive SaaS platform for medical carrier operations with AI-powered route optimization and patient care management across multiple locations.',
      image: '/images/web-saas.jpg'
    }
  ]

  // Testimonials data - NEOBIZE Transportation & Tech Clients
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Medical Director, HealthCare Plus',
      content: 'NEOBIZE NEMT services have been exceptional for our patients across Africa and USA. Their medical carrier solutions ensure safe, reliable transportation with professional drivers and medical equipment.',
      avatar: 'https://placehold.co/100/1E40AF/FFFFFF?text=SJ'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Operations Manager, AirPort Express',
      content: 'NEOBIZE developed our airport shuttle mobile app with GPS tracking and booking system. The SaaS platform streamlined our operations and improved customer satisfaction significantly.',
      avatar: 'https://placehold.co/100/1E40AF/FFFFFF?text=MR'
    },
    {
      id: 3,
      name: 'Amara Okafor',
      role: 'CEO, MedTrans Solutions',
      content: 'Working with NEOBIZE on our AI-powered transportation management system was outstanding. Their web development and SaaS expertise delivered a solution that transformed our medical carrier business.',
      avatar: 'https://placehold.co/100/1E40AF/FFFFFF?text=AO'
    }
  ]

  // Partners data - NEOBIZE Transportation & Tech Industry Partners
  const partners = [
    {
      id: 1,
      name: 'MediCare',
      logo: '/images/MediCare.jpeg',
      industry: 'Healthcare',
      website: 'https://example.com/medicare',
      bgColor: 'from-emerald-500 to-emerald-600',
      shadowColor: 'shadow-emerald-500/25'
    },
    {
      id: 2,
      name: 'LogiTrans',
      logo: '/images/LogiTrans.jpeg',
      industry: 'Transportation',
      website: 'https://example.com/logitrans',
      bgColor: 'from-orange-500 to-orange-600',
      shadowColor: 'shadow-orange-500/25'
    },
    {
      id: 3,
      name: 'TechNova',
      logo: '/images/tecknova.jpeg',
      industry: 'Technology',
      website: 'https://example.com/technova',
      bgColor: 'from-blue-500 to-blue-600',
      shadowColor: 'shadow-blue-500/25'
    },
    {
      id: 4,
      name: 'AirPort Express',
      logo: '/images/entrepro.jpeg',
      industry: 'Airport Services',
      website: 'https://example.com/airportexpress',
      bgColor: 'from-purple-500 to-purple-600',
      shadowColor: 'shadow-purple-500/25'
    }
  ]

  return (
    <div>
      <HeroSection
        title="NEOBIZE | Transportation Services & Digital Solutions"
        subtitle="Leading provider of NEMT, Airport Shuttle, Medical Carrier services, plus cutting-edge Web & Mobile Apps, SaaS, and AI Solutions across Africa and USA."
        backgroundImage="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069"
        fullHeight={true}
      >
        <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center w-full">
          {/* First button - Discover our services */}
          <Link 
            to="/services" 
            className="flex-1 sm:w-auto btn btn-primary text-sm sm:text-lg px-4 sm:px-8 py-3 hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 relative overflow-hidden group text-center"
          >
            <span className="relative z-10">Discover Our Services</span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary via-blue-600 to-primary bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></span>
          </Link>
          
          {/* Second button - Contact us */}
          <Link 
            to="/contact" 
            className="flex-1 sm:w-auto btn bg-transparent border-2 border-white text-white hover:text-white hover:border-red-600 text-sm sm:text-lg px-4 sm:px-8 py-3 transition-all duration-300 relative overflow-hidden group text-center"
          >
            <span className="relative z-10">Contact Us</span>
            <span className="absolute inset-0 bg-transparent group-hover:bg-red-600 transition-all duration-300"></span>
          </Link>
        </div>
      </HeroSection>
      
      {/* Stats Section */}
      <section className="py-16 text-white" style={{ backgroundColor: '#29292A' }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="p-3 md:p-4">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">500+</h3>
              <p className="text-white/90 text-sm md:text-base">NEMT Trips Completed</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="p-3 md:p-4">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">24/7</h3>
              <p className="text-white/90 text-sm md:text-base">Airport Shuttle Service</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="p-3 md:p-4">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">50+</h3>
              <p className="text-white/90 text-sm md:text-base">Mobile Apps Developed</p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="p-3 md:p-4">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">2</h3>
              <p className="text-white/90 text-sm md:text-base">Continents Served</p>
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
              OUR SERVICES
            </motion.div>
            
            
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-6 text-midnight"
            >
              NEOBIZE Transportation Services, Web Development & SaaS Solutions
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              NEOBIZE delivers comprehensive NEMT, Airport Shuttle, Medical Carrier services, plus innovative Web & Mobile Apps, SaaS, and AI Solutions across Africa and USA
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
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-blue-50 group-hover:bg-red-600 transition-all duration-300">
                    <div className="text-red-600 group-hover:text-white transition-all duration-300 transform">
                      {service.icon}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-midnight">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  to={service.link} 
                  className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors group-hover:translate-x-2 transition-transform duration-300"
                >
                  Read More
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
                ABOUT US
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
              >
                NEOBIZE: Transportation Services & Digital Solutions Leader
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-lg text-gray-600 mb-4"
              >
                NEOBIZE specializes in NEMT (Non-Emergency Medical Transportation), Airport Shuttle services, Medical Carrier solutions, plus cutting-edge Web & Mobile Apps, SaaS, and AI Solutions across Africa and USA.
              </motion.p>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 mb-8"
              >
                With extensive experience in transportation services and web development, NEOBIZE understands the unique challenges of medical transportation, airport shuttle operations, and digital transformation. Our comprehensive approach combines reliable transportation solutions with innovative mobile apps and SaaS platforms.
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
                    <h4 className="font-bold text-midnight">Quality</h4>
                    <p className="text-sm text-gray-600">Excellence in all our services</p>
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
                    <p className="text-sm text-gray-600">Modern and efficient solutions</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={fadeIn}>
                <Link 
                  to="/about" 
                  className="btn btn-primary"
                >
                  Read More
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
                      src="/images/team.jpeg" 
                      alt="Our Team" 
                      className="w-full h-64 sm:h-80 object-cover rounded-lg transition-all duration-500"
                    />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-lg shadow-lg">
                  <Users size={32} className="mb-2" />
                  <h3 className="text-xl font-bold">Expert Team</h3>
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
              OUR PROJECTS
            </motion.div>
            
            
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-6 text-midnight"
            >
              NEOBIZE Transportation & Technology Projects Portfolio
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Explore our successful NEMT, Airport Shuttle, Medical Carrier projects and innovative Web & Mobile Apps, SaaS, AI Solutions across Africa and USA
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
                  {project.domain}
                </div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/80 text-sm mb-3 line-clamp-2">{project.description}</p>
                  <Link 
                    to={`/projects/${project.id}`} 
                    className="text-white/80 hover:text-white transition-colors inline-flex items-center group-hover:translate-x-2 transition-transform duration-300"
                  >
                    View Project
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
              View All Projects
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
              CLIENT TESTIMONIALS
            </motion.div>
            
            
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-6 text-midnight"
            >
              NEOBIZE Client Success Stories: Transportation & Tech Solutions
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover how NEOBIZE NEMT, Airport Shuttle, Medical Carrier services and Web Development, SaaS, AI Solutions have transformed businesses across Africa and USA
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

      {/* Partners Section - Modernized */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-2xl"></div>
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
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              TRUSTED BY LEADERS
            </motion.div>
            
            <motion.h2 
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent"
            >
              They Trust Us
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Leading companies trust us with their most ambitious projects
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                variants={fadeIn}
                whileHover={{ 
                  y: -12,
                  scale: 1.05,
                  rotateY: 5
                }}
                className="group relative mx-auto w-full max-w-xs"
              >
                <div className={`relative bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 backdrop-blur-sm hover:${partner.shadowColor} overflow-hidden`}>
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${partner.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                 <div className="relative z-10 flex flex-col items-center justify-center h-16 sm:h-20 px-2 group">
  <img 
    src={partner.logo} 
    alt={partner.name} 
   className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
  />
</div>


                  {/* Industry badge */}
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`bg-gradient-to-r ${partner.bgColor} text-white text-xs px-2 py-1 rounded-full shadow-lg`}>
                      {partner.industry}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mt-16"
          >
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
              <svg className="w-5 h-5 mr-2 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
              <span className="text-slate-600 font-medium">Discover Our Services</span>
              <ArrowRight className="w-4 h-4 ml-2 text-slate-600" />
            </div>
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
                Ready to Start Your Project?
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-xl mb-10 max-w-2xl mx-auto"
              >
                Let's discuss how we can help bring your vision to life with our comprehensive services
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link 
                  to="/contact" 
                  className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
                >
                  Get Started Today
                </Link>
                <Link 
                  to="/services" 
                  className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3"
                >
                  Our Services
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
