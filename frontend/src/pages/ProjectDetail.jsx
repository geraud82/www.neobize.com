import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle, 
  ExternalLink,
  Star,
  Award,
  Target,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Globe,
  Code,
  Truck,
  Search,
  BarChart3,
  MessageSquare,
  Heart,
  Eye
} from 'lucide-react'

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

// Updated projects data reflecting NEOBIZE's actual business
const projectsData = [
  {
    id: 1,
    slug: 'saas-project-management-platform',
    title: 'SaaS Project Management Platform',
    category: 'digital-solutions',
    description: 'A comprehensive SaaS platform for project management with real-time collaboration, task tracking, and advanced analytics.',
    fullDescription: `
      <p>We developed a cutting-edge SaaS project management platform that revolutionizes how teams collaborate and manage their projects. This comprehensive solution combines intuitive design with powerful functionality to deliver exceptional user experience.</p>
      
      <h3>Key Features Implemented:</h3>
      <ul>
        <li><strong>Real-time Collaboration:</strong> Live document editing, instant messaging, and video conferencing integration</li>
        <li><strong>Advanced Task Management:</strong> Kanban boards, Gantt charts, and customizable workflows</li>
        <li><strong>Analytics Dashboard:</strong> Comprehensive reporting with data visualization and performance metrics</li>
        <li><strong>Mobile-First Design:</strong> Responsive interface optimized for all devices</li>
        <li><strong>API Integration:</strong> Seamless connection with popular tools like Slack, Google Workspace, and Microsoft 365</li>
        <li><strong>Security & Compliance:</strong> Enterprise-grade security with SOC 2 compliance</li>
      </ul>
      
      <p>The platform was built using modern technologies including React.js for the frontend, Node.js with Express for the backend, and MongoDB for data storage. We implemented microservices architecture to ensure scalability and reliability.</p>
      
      <p>Since launch, the platform has gained over 10,000 active users and has been recognized as one of the top project management tools in the industry.</p>
    `,
    image: '/images/web-saas.jpg',
    gallery: [
      '/images/web-saas.jpg',
      '/images/web-cons.jpg',
      '/images/web-imag.jpg'
    ],
    client: 'TechStart Inc.',
    year: '2024',
    duration: '8 months',
    budget: '$150,000',
    teamSize: '6 developers',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Docker', 'AWS', 'Socket.io', 'Redis', 'Stripe API'],
    services: ['UI/UX Design', 'Frontend Development', 'Backend Development', 'DevOps', 'Quality Assurance', 'Technical Support'],
    results: [
      '10,000+ active users within 6 months',
      '40% increase in team productivity for clients',
      '99.9% uptime achieved',
      'Featured in TechCrunch as "Startup to Watch"'
    ],
    testimonial: {
      text: "NEOBIZE delivered beyond our expectations. The platform they built has transformed how our teams work together.",
      author: "Sarah Johnson",
      position: "CTO, TechStart Inc.",
      avatar: "/images/team.jpeg"
    },
    challenges: [
      'Implementing real-time collaboration without performance issues',
      'Ensuring data security and compliance with international standards',
      'Creating an intuitive interface for complex project management features'
    ],
    solutions: [
      'Used WebSocket technology with optimized data synchronization',
      'Implemented end-to-end encryption and regular security audits',
      'Conducted extensive user testing and iterative design improvements'
    ],
    metrics: {
      userSatisfaction: 98,
      performanceScore: 95,
      securityRating: 'A+',
      scalability: '10,000+ concurrent users'
    }
  },
  {
    id: 2,
    slug: 'mobile-ecommerce-app',
    title: 'Mobile E-commerce Application',
    category: 'digital-solutions',
    description: 'A feature-rich mobile e-commerce application with AI-powered recommendations, secure payments, and seamless user experience.',
    fullDescription: `
      <p>We created a state-of-the-art mobile e-commerce application that combines cutting-edge technology with exceptional user experience. The app features AI-powered product recommendations, advanced search capabilities, and a streamlined checkout process.</p>
      
      <h3>Advanced Features:</h3>
      <ul>
        <li><strong>AI-Powered Recommendations:</strong> Machine learning algorithms that analyze user behavior to suggest relevant products</li>
        <li><strong>Augmented Reality:</strong> AR try-on feature for fashion and home decor items</li>
        <li><strong>Voice Search:</strong> Natural language processing for voice-activated product search</li>
        <li><strong>Social Commerce:</strong> Integration with social media platforms for seamless sharing and purchasing</li>
        <li><strong>Multi-Payment Options:</strong> Support for credit cards, digital wallets, and cryptocurrency</li>
        <li><strong>Real-time Inventory:</strong> Live inventory tracking with automatic stock updates</li>
      </ul>
      
      <p>The application was developed using React Native for cross-platform compatibility, with a robust backend powered by Node.js and PostgreSQL. We integrated advanced analytics to track user behavior and optimize the shopping experience.</p>
      
      <p>The app has achieved over 500,000 downloads and maintains a 4.8-star rating on both App Store and Google Play Store.</p>
    `,
    image: '/images/web-mobileapp.jpg',
    gallery: [
      '/images/web-mobileapp.jpg',
      '/images/web-saas.jpg',
      '/images/web-cons.jpg'
    ],
    client: 'RetailMax Solutions',
    year: '2024',
    duration: '10 months',
    budget: '$200,000',
    teamSize: '8 developers',
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'TensorFlow', 'AWS', 'Stripe', 'Firebase', 'ARCore/ARKit'],
    services: ['Mobile App Development', 'AI/ML Integration', 'UI/UX Design', 'Backend Development', 'Quality Assurance', 'App Store Optimization'],
    results: [
      '500,000+ app downloads',
      '4.8-star average rating',
      '60% increase in mobile sales',
      '35% improvement in user retention'
    ],
    testimonial: {
      text: "The mobile app NEOBIZE built for us has revolutionized our business. Sales have increased dramatically since launch.",
      author: "Michael Chen",
      position: "CEO, RetailMax Solutions",
      avatar: "/images/team.jpeg"
    },
    challenges: [
      'Implementing AR features across different device capabilities',
      'Optimizing AI recommendations for real-time performance',
      'Ensuring seamless payment processing across multiple platforms'
    ],
    solutions: [
      'Developed adaptive AR features based on device specifications',
      'Implemented edge computing for faster AI processing',
      'Created unified payment gateway with fallback options'
    ],
    metrics: {
      userSatisfaction: 96,
      performanceScore: 94,
      conversionRate: '12.5%',
      averageSessionTime: '8.5 minutes'
    }
  },
  {
    id: 3,
    slug: 'nemt-fleet-optimization-system',
    title: 'NEMT Fleet Optimization System',
    category: 'transportation',
    description: 'Advanced fleet management system for Non-Emergency Medical Transportation with route optimization, real-time tracking, and compliance management.',
    fullDescription: `
      <p>We developed a comprehensive fleet optimization system specifically designed for Non-Emergency Medical Transportation (NEMT) services. This system addresses the unique challenges of medical transportation including patient safety, regulatory compliance, and operational efficiency.</p>
      
      <h3>Specialized Features:</h3>
      <ul>
        <li><strong>Medical Compliance Tracking:</strong> Automated compliance monitoring for HIPAA, DOT, and state regulations</li>
        <li><strong>Patient Care Management:</strong> Special needs tracking, medical equipment requirements, and accessibility features</li>
        <li><strong>Route Optimization:</strong> AI-powered routing that considers medical appointments, patient conditions, and traffic patterns</li>
        <li><strong>Real-time Monitoring:</strong> GPS tracking with medical emergency alerts and communication systems</li>
        <li><strong>Insurance Integration:</strong> Direct billing integration with Medicaid, Medicare, and private insurance providers</li>
        <li><strong>Driver Certification:</strong> Automated tracking of driver certifications, medical training, and background checks</li>
      </ul>
      
      <p>The system was built with a focus on reliability and security, using enterprise-grade technologies including Java Spring Boot for the backend, React for the web interface, and native mobile apps for drivers and dispatchers.</p>
      
      <p>Implementation resulted in 30% reduction in operational costs and 99.5% on-time performance for medical appointments.</p>
    `,
    image: '/images/LogiTrans.jpeg',
    gallery: [
      '/images/LogiTrans.jpeg',
      '/images/MediCare.jpeg',
      '/images/web-trans.jpg'
    ],
    client: 'MediTransport Services',
    year: '2024',
    duration: '12 months',
    budget: '$300,000',
    teamSize: '10 specialists',
    technologies: ['Java Spring Boot', 'React', 'PostgreSQL', 'Google Maps API', 'AWS', 'Docker', 'Kubernetes', 'Redis'],
    services: ['System Architecture', 'Compliance Consulting', 'Software Development', 'Integration Services', 'Training & Support', 'Maintenance'],
    results: [
      '30% reduction in operational costs',
      '99.5% on-time appointment performance',
      '100% regulatory compliance maintained',
      '50% improvement in patient satisfaction scores'
    ],
    testimonial: {
      text: "NEOBIZE understood our unique needs in medical transportation. Their system has made us more efficient while ensuring patient safety.",
      author: "Dr. Patricia Williams",
      position: "Operations Director, MediTransport Services",
      avatar: "/images/team.jpeg"
    },
    challenges: [
      'Meeting strict medical transportation regulations',
      'Integrating with multiple insurance and healthcare systems',
      'Ensuring system reliability for critical medical appointments'
    ],
    solutions: [
      'Implemented comprehensive compliance monitoring and reporting',
      'Developed universal API connectors for healthcare systems',
      'Built redundant systems with 99.9% uptime guarantee'
    ],
    metrics: {
      systemUptime: '99.9%',
      complianceScore: '100%',
      costReduction: '30%',
      patientSatisfaction: '95%'
    }
  }
];

const ProjectDetail = () => {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')

  // Category icons and colors
  const categoryConfig = {
    'digital-solutions': {
      icon: <Code size={20} className="mr-2" />,
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    'transportation': {
      icon: <Truck size={20} className="mr-2" />,
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    }
  }

  useEffect(() => {
    const fetchProject = () => {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        const foundProject = projectsData.find(p => p.slug === slug)
        setProject(foundProject)
        setLoading(false)
      }, 500)
    }

    fetchProject()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-8">The project you're looking for doesn't exist or may have been moved.</p>
          <Link 
            to="/projects" 
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Link>
        </motion.div>
      </div>
    )
  }

  const categoryInfo = categoryConfig[project.category]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 z-0" 
            style={{ backgroundImage: `url('${project.image}')` }}
          ></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeIn}>
              <Link 
                to="/projects" 
                className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group"
              >
                <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Link>
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex items-center mb-4">
              <div className={`flex items-center ${categoryInfo.bgColor} ${categoryInfo.textColor} px-4 py-2 rounded-full`}>
                {categoryInfo.icon}
                <span className="text-sm font-medium capitalize">
                  {project.category.replace('-', ' ')}
                </span>
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {project.title}
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-white/90 mb-8 leading-relaxed">
              {project.description}
            </motion.p>
            
            <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <User size={24} className="mx-auto mb-2 text-blue-400" />
                <p className="text-sm text-white/70">Client</p>
                <p className="font-semibold">{project.client}</p>
              </div>
              
              <div className="text-center">
                <Calendar size={24} className="mx-auto mb-2 text-blue-400" />
                <p className="text-sm text-white/70">Year</p>
                <p className="font-semibold">{project.year}</p>
              </div>
              
              <div className="text-center">
                <Clock size={24} className="mx-auto mb-2 text-blue-400" />
                <p className="text-sm text-white/70">Duration</p>
                <p className="font-semibold">{project.duration}</p>
              </div>
              
              <div className="text-center">
                <Users size={24} className="mx-auto mb-2 text-blue-400" />
                <p className="text-sm text-white/70">Team Size</p>
                <p className="font-semibold">{project.teamSize}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Project Gallery
            </motion.h2>
            
            <motion.div variants={fadeIn} className="mb-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={project.gallery[activeImage]} 
                  alt={`${project.title} - View ${activeImage + 1}`} 
                  className="w-full h-96 md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex gap-4 justify-center overflow-x-auto pb-4">
              {project.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden transition-all ${
                    activeImage === index 
                      ? 'ring-4 ring-blue-500 scale-105' 
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${project.title} - Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Details Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Tab Navigation */}
            <motion.div variants={fadeIn} className="flex flex-wrap justify-center mb-12">
              {[
                { id: 'overview', label: 'Overview', icon: <Eye size={16} /> },
                { id: 'technologies', label: 'Technologies', icon: <Code size={16} /> },
                { id: 'results', label: 'Results', icon: <BarChart3 size={16} /> },
                { id: 'testimonial', label: 'Testimonial', icon: <MessageSquare size={16} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 mx-2 mb-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <motion.div variants={fadeIn} className="bg-white rounded-2xl shadow-xl p-8">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Overview</h3>
                  <div 
                    className="prose prose-lg max-w-none text-gray-600"
                    dangerouslySetInnerHTML={{ __html: project.fullDescription }}
                  />
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Challenges</h4>
                      <ul className="space-y-3">
                        {project.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start">
                            <Target size={16} className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-gray-600">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Solutions</h4>
                      <ul className="space-y-3">
                        {project.solutions.map((solution, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle size={16} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-gray-600">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'technologies' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Technologies & Services</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
                          >
                            <Zap size={14} className="mr-2" />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Services Provided</h4>
                      <ul className="space-y-3">
                        {project.services.map((service, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle size={16} className="text-green-500 mr-3" />
                            <span className="text-gray-600">{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'results' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Results</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h4>
                      <ul className="space-y-4">
                        {project.results.map((result, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <TrendingUp size={16} className="text-green-600" />
                            </div>
                            <span className="text-gray-600 font-medium">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                      <div className="space-y-4">
                        {Object.entries(project.metrics).map(([key, value], index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-semibold text-gray-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'testimonial' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Client Testimonial</h3>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                    <div className="flex items-center mb-6">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} fill="currentColor" />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-600 font-medium">5.0 out of 5</span>
                    </div>
                    
                    <blockquote className="text-xl text-gray-700 mb-6 italic leading-relaxed">
                      "{project.testimonial.text}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <img 
                        src={project.testimonial.avatar} 
                        alt={project.testimonial.author}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{project.testimonial.author}</p>
                        <p className="text-gray-600">{project.testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </motion.h2>
            
            <motion.p variants={fadeIn} className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss how NEOBIZE can help bring your vision to life with our expertise in digital solutions and transportation services.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <MessageSquare size={20} className="mr-2" />
                Get In Touch
              </Link>
              
              <Link 
                to="/projects" 
                className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <Eye size={20} className="mr-2" />
                View More Projects
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail
