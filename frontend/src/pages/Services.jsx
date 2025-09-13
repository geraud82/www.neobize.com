import { motion } from 'framer-motion'
import { Code, Truck, Building, Check, MapPin, Clock, Shield, Smartphone, Globe, Zap, Users, Heart } from 'lucide-react'
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

const Services = () => {
  // Transportation Services
  const transportationServices = [
    'Non-Emergency Medical Transportation (NEMT)',
    'Airport Shuttle Services 24/7',
    'Medical Carrier with Specialized Equipment',
    'Wheelchair Accessible Vehicles',
    'Professional Certified Drivers',
    'Real-time GPS Tracking',
    'Insurance Coverage & Safety Compliance',
    'Multi-language Support'
  ]

  // Web & Mobile Development Services
  const webMobileServices = [
    'Custom Web Application Development',
    'Mobile App Development (iOS & Android)',
    'Responsive Website Design',
    'E-commerce Platform Development',
    'Progressive Web Apps (PWA)',
    'API Development & Integration',
    'Database Design & Management',
    'UI/UX Design & Optimization'
  ]

  // SaaS & AI Solutions Services
  const saasAIServices = [
    'Fleet Management SaaS Platforms',
    'AI-Powered Route Optimization',
    'Patient Care Management Systems',
    'Real-time Analytics & Reporting',
    'Automated Scheduling Systems',
    'Cloud-based Transportation Solutions',
    'Machine Learning for Predictive Maintenance',
    'Integration with Healthcare Systems'
  ]

  return (
    <div>
      <HeroSection
        title="NEOBIZE Services: Transportation & Digital Solutions"
        subtitle="Comprehensive NEMT, Airport Shuttle, Medical Carrier services combined with cutting-edge Web Development, Mobile Apps, SaaS, and AI Solutions across Africa and USA."
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
        badge="OUR SERVICES"
      />

      {/* Services Overview */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
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
              NEOBIZE: Your Complete Transportation & Technology Partner
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-4xl mx-auto"
            >
              From reliable medical transportation services to innovative digital solutions, NEOBIZE delivers comprehensive services that bridge the gap between transportation needs and technology advancement.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Truck size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-midnight mb-4">Transportation Services</h3>
              <p className="text-gray-600">
                Professional NEMT, airport shuttle, and medical carrier services with certified drivers and specialized equipment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Code size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-midnight mb-4">Web & Mobile Development</h3>
              <p className="text-gray-600">
                Custom web applications and mobile apps designed for transportation, healthcare, and business optimization.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Building size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-midnight mb-4">SaaS & AI Solutions</h3>
              <p className="text-gray-600">
                Advanced SaaS platforms and AI-powered solutions for fleet management, route optimization, and automation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transportation Services Section */}
      <section id="transportation" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Truck size={32} className="text-white" />
                  </div>
                  <div className="h-px bg-gradient-to-r from-blue-500 to-transparent flex-1"></div>
                </div>
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
              >
                Transportation Services
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 mb-8 text-lg"
              >
                NEOBIZE provides comprehensive transportation services including NEMT (Non-Emergency Medical Transportation), Airport Shuttle services, and Medical Carrier solutions across Africa and USA. Our professional drivers and specialized vehicles ensure safe, reliable, and comfortable transportation for all passengers.
              </motion.p>
              
              <motion.ul variants={staggerContainer} className="space-y-4">
                {transportationServices.map((service, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeIn}
                    className="flex items-start group"
                  >
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1 mr-3 group-hover:bg-blue-500 transition-colors">
                      <Check size={14} className="text-blue-600 group-hover:text-white" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{service}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeIn} className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                  <Clock size={16} className="text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">24/7 Available</span>
                </div>
                <div className="flex items-center bg-green-50 px-4 py-2 rounded-full">
                  <Shield size={16} className="text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Fully Insured</span>
                </div>
                <div className="flex items-center bg-purple-50 px-4 py-2 rounded-full">
                  <MapPin size={16} className="text-purple-600 mr-2" />
                  <span className="text-purple-800 font-medium">GPS Tracked</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative bg-white p-3 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <div className="rounded-2xl overflow-hidden">
                    <img 
                      src="/images/web-trans.jpg" 
                      alt="NEOBIZE Transportation Services" 
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                    <div className="text-sm font-semibold">NEMT</div>
                    <div className="text-xs opacity-90">Certified</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Web & Mobile Development Section */}
      <section id="web-mobile" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-emerald-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative bg-white p-3 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <div className="rounded-2xl overflow-hidden">
                    <img 
                      src="/images/web-mobileapp.jpg" 
                      alt="NEOBIZE Web & Mobile Development" 
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                    <div className="text-sm font-semibold">Mobile</div>
                    <div className="text-xs opacity-90">Apps</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="order-1 lg:order-2"
            >
              <motion.div variants={fadeIn} className="mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Code size={32} className="text-white" />
                  </div>
                  <div className="h-px bg-gradient-to-r from-green-500 to-transparent flex-1"></div>
                </div>
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
              >
                Web & Mobile App Development
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 mb-8 text-lg"
              >
                NEOBIZE develops custom web applications and mobile apps tailored for transportation, healthcare, and business industries. Our solutions enhance operational efficiency, improve user experiences, and integrate seamlessly with existing systems across Africa and USA.
              </motion.p>
              
              <motion.ul variants={staggerContainer} className="space-y-4">
                {webMobileServices.map((service, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeIn}
                    className="flex items-start group"
                  >
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1 mr-3 group-hover:bg-green-500 transition-colors">
                      <Check size={14} className="text-green-600 group-hover:text-white" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{service}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeIn} className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center bg-green-50 px-4 py-2 rounded-full">
                  <Smartphone size={16} className="text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Mobile First</span>
                </div>
                <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                  <Globe size={16} className="text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">Cross Platform</span>
                </div>
                <div className="flex items-center bg-purple-50 px-4 py-2 rounded-full">
                  <Zap size={16} className="text-purple-600 mr-2" />
                  <span className="text-purple-800 font-medium">High Performance</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SaaS & AI Solutions Section */}
      <section id="saas-ai" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Building size={32} className="text-white" />
                  </div>
                  <div className="h-px bg-gradient-to-r from-purple-500 to-transparent flex-1"></div>
                </div>
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
              >
                SaaS & AI Solutions
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 mb-8 text-lg"
              >
                NEOBIZE creates advanced SaaS platforms and AI-powered solutions that revolutionize transportation operations. Our intelligent systems optimize routes, manage fleets, coordinate patient care, and provide real-time analytics for better decision-making across Africa and USA.
              </motion.p>
              
              <motion.ul variants={staggerContainer} className="space-y-4">
                {saasAIServices.map((service, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeIn}
                    className="flex items-start group"
                  >
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1 mr-3 group-hover:bg-purple-500 transition-colors">
                      <Check size={14} className="text-purple-600 group-hover:text-white" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{service}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div variants={fadeIn} className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center bg-purple-50 px-4 py-2 rounded-full">
                  <Zap size={16} className="text-purple-600 mr-2" />
                  <span className="text-purple-800 font-medium">AI Powered</span>
                </div>
                <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                  <Globe size={16} className="text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">Cloud Based</span>
                </div>
                <div className="flex items-center bg-green-50 px-4 py-2 rounded-full">
                  <Users size={16} className="text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Scalable</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-indigo-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative bg-white p-3 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <div className="rounded-2xl overflow-hidden">
                    <img 
                      src="/images/web-saas.jpg" 
                      alt="NEOBIZE SaaS & AI Solutions" 
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                    <div className="text-sm font-semibold">AI</div>
                    <div className="text-xs opacity-90">Solutions</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose NEOBIZE */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
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
              Why Choose NEOBIZE?
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              The unique combination of transportation expertise and digital innovation that sets us apart
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Heart size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-midnight mb-2">Patient-Centered Care</h3>
              <p className="text-gray-600 text-sm">
                Prioritizing patient safety and comfort in all our transportation services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Zap size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-midnight mb-2">Cutting-Edge Technology</h3>
              <p className="text-gray-600 text-sm">
                Latest technology solutions that enhance efficiency and user experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Globe size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-midnight mb-2">Global Reach</h3>
              <p className="text-gray-600 text-sm">
                Serving clients across Africa and USA with consistent quality standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Clock size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-midnight mb-2">24/7 Availability</h3>
              <p className="text-gray-600 text-sm">
                Round-the-clock support and services whenever you need them.
              </p>
            </motion.div>
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
              Ready to Transform Your Transportation & Technology Needs?
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl mb-8 max-w-3xl mx-auto"
            >
              Contact NEOBIZE today to discuss how our transportation services and digital solutions can benefit your organization across Africa and USA.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a 
                href="/contact" 
                className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
              >
                Get Started Today
              </a>
              <a 
                href="/projects" 
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3"
              >
                View Our Projects
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
