import { motion } from 'framer-motion'
import { History, Target, Eye, Users, Truck, Code, Building, MapPin, Award, Clock } from 'lucide-react'
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

const About = () => {
  // Team members - NEOBIZE Transportation & Tech Experts
  const teamMembers = [
    {
      id: 1,
      name: 'Mawule Geraud',
      role: 'CEO & Transportation Operations Director',
      bio: 'Leading NEOBIZE with expertise in NEMT services, airport shuttle operations, and medical carrier solutions across Africa and USA.',
      image: '/images/mawule.jpeg'
    },
    {
      id: 2,
      name: 'Ursula Martinez',
      role: 'CTO & Web Development Lead',
      bio: 'Driving digital innovation with advanced web development, mobile apps, and SaaS solutions for transportation and healthcare industries.',
      image: '/images/matin.jpeg'
    },
    {
      id: 3,
      name: 'Jeosbe Avadra',
      role: 'Medical Transportation Specialist',
      bio: 'Ensuring safe and reliable NEMT services with specialized medical equipment and certified professional drivers.',
      image: '/images/avadra.jpeg'
    },
    {
      id: 4,
      name: 'Martin Leroy',
      role: 'AI & SaaS Solutions Architect',
      bio: 'Developing intelligent automation systems and SaaS platforms that optimize transportation operations and patient care management.',
      image: '/images/leroy.jpeg'
    }
  ]

  return (
    <div>
      <HeroSection
        title="About NEOBIZE: Transportation Services & Digital Solutions Leader"
        subtitle="Discover how NEOBIZE combines reliable NEMT, Airport Shuttle, Medical Carrier services with innovative Web Development, SaaS, and AI Solutions across Africa and USA."
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071"
        badge="ABOUT NEOBIZE"
      />

      {/* History Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeIn} className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <History size={32} className="text-white" />
                </div>
                <div className="h-px bg-gradient-to-r from-primary to-transparent flex-1"></div>
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-midnight via-gray-800 to-primary bg-clip-text text-transparent leading-tight"
              >
                NEOBIZE Journey: From Vision to Transportation & Tech Excellence
              </motion.h2>
              
              <motion.div 
                variants={fadeIn}
                className="space-y-6"
              >
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-600 rounded-full"></div>
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  Founded with a vision to revolutionize transportation services and digital solutions, NEOBIZE has grown from a startup to a leading provider of NEMT, Airport Shuttle, Medical Carrier services, and cutting-edge Web Development, SaaS, and AI Solutions across Africa and USA.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed font-light">
                  Our commitment to excellence in both transportation services and digital innovation has made us the trusted partner for healthcare facilities, airports, and businesses seeking reliable transportation solutions and advanced technology platforms.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                className="flex items-center space-x-8 pt-6"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2018</div>
                  <div className="text-sm text-gray-600 font-medium">Founded</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-gray-600 font-medium">NEMT Trips</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-gray-600 font-medium">Apps Built</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">2</div>
                  <div className="text-sm text-gray-600 font-medium">Continents</div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative group">
                {/* Decorative background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                
                {/* Main image container */}
                <div className="relative bg-white p-3 rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                  <div className="rounded-2xl overflow-hidden">
                    <img 
                      src="/images/team.jpeg" 
                      alt="NEOBIZE Transportation & Tech Team" 
                      className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                    <div className="text-sm font-semibold">Excellence</div>
                    <div className="text-xs opacity-90">Since 2018</div>
                  </div>
                </div>

                {/* Additional decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-30 blur-lg"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <motion.div variants={fadeIn} className="mb-6">
                <Target size={48} className="text-primary" />
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="text-2xl md:text-3xl font-bold mb-4 text-midnight"
              >
                Our Mission
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600"
              >
                To provide exceptional NEMT, Airport Shuttle, and Medical Carrier services while delivering innovative Web Development, Mobile Apps, SaaS, and AI Solutions that transform transportation and healthcare operations across Africa and USA.
              </motion.p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <motion.div variants={fadeIn} className="mb-6">
                <Eye size={48} className="text-primary" />
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="text-2xl md:text-3xl font-bold mb-4 text-midnight"
              >
                Our Vision
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600"
              >
                To be the leading provider of integrated transportation services and digital solutions, setting new standards for safety, reliability, and innovation in medical transportation and technology platforms worldwide.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Services Overview */}
      <section className="py-20 bg-white">
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
              className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
            >
              NEOBIZE Core Service Areas
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Combining reliable transportation services with cutting-edge digital solutions
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Truck size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-midnight mb-4">Transportation Services</h3>
              <p className="text-gray-600">
                NEMT, Airport Shuttle, and Medical Carrier solutions with professional drivers and specialized equipment across Africa and USA.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Code size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-midnight mb-4">Web & Mobile Development</h3>
              <p className="text-gray-600">
                Custom web applications and mobile apps designed to streamline operations and enhance user experiences in transportation and healthcare.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Building size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-midnight mb-4">SaaS & AI Solutions</h3>
              <p className="text-gray-600">
                Advanced SaaS platforms and AI-powered solutions for fleet management, route optimization, and patient care coordination.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn} className="inline-block mb-6">
              <Users size={48} className="text-primary mx-auto" />
            </motion.div>
            
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
            >
              Meet Our Expert Team
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Dedicated professionals combining transportation expertise with cutting-edge technology skills
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeIn}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="h-64 flex items-center justify-center bg-gray-50 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="max-h-64 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-midnight mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
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
              className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
            >
              Our Core Values
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              The principles that guide our transportation services and digital solutions
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Award size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold text-midnight mb-4">Safety & Excellence</h3>
              <p className="text-gray-600">
                Maintaining the highest safety standards in medical transportation while delivering excellent digital solutions that exceed client expectations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-green-50 to-white p-8 rounded-lg shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/20 transition-colors">
                <Code size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-midnight mb-4">Innovation & Technology</h3>
              <p className="text-gray-600">
                Continuously advancing our transportation services and digital platforms with cutting-edge technology and innovative solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-lg shadow-lg text-center group hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/20 transition-colors">
                <Clock size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-midnight mb-4">Reliability & Trust</h3>
              <p className="text-gray-600">
                Building lasting relationships through reliable transportation services and dependable digital solutions that clients can trust.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Geographic Presence */}
      <section className="py-20 bg-gradient-to-br from-primary to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeIn} className="mb-6">
              <MapPin size={48} className="text-white mx-auto" />
            </motion.div>
            
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Serving Africa & USA
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl mb-8 max-w-3xl mx-auto"
            >
              NEOBIZE provides transportation services and digital solutions across two continents, ensuring reliable NEMT, airport shuttle, and medical carrier services while delivering innovative web development, mobile apps, and SaaS platforms.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a 
                href="/contact" 
                className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
              >
                Contact Us Today
              </a>
              <a 
                href="/services" 
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3"
              >
                Explore Our Services
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
