import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Code, Truck, Building, Check } from 'lucide-react'
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
  const { t } = useTranslation()

  // Service icons
  const serviceIcons = {
    webDev: <Code size={48} className="text-primary" />,
    transport: <Truck size={48} className="text-primary" />,
    construction: <Building size={48} className="text-primary" />
  }

  return (
    <div>
      <HeroSection
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
        badge={t('services.sectionTitle')}
      />

      {/* Web Development Section */}
      <section id="web-dev" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="mb-6">
                {serviceIcons.webDev}
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
              >
                {t('services.webDev.title')}
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 mb-8"
              >
                {t('services.webDev.description')}
              </motion.p>
              
              <motion.ul variants={staggerContainer} className="space-y-3">
                {t('services.webDev.services', { returnObjects: true }).map((service, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeIn}
                    className="flex items-start"
                  >
                    <Check size={20} className="text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>{service}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/images/web-imag.jpg" 
                  alt="Web Development Services" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transport Section */}
      <section id="transport" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/images/web-trans.jpg" 
                  alt="Transport Services" 
                  className="w-full h-full object-cover"
                />
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
                {serviceIcons.transport}
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
              >
                {t('services.transport.title')}
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 mb-8"
              >
                {t('services.transport.description')}
              </motion.p>
              
              <motion.ul variants={staggerContainer} className="space-y-3">
                {t('services.transport.services', { returnObjects: true }).map((service, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeIn}
                    className="flex items-start"
                  >
                    <Check size={20} className="text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>{service}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Construction Section */}
      <section id="construction" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="mb-6">
                {serviceIcons.construction}
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
              >
                {t('services.construction.title')}
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600 mb-8"
              >
                {t('services.construction.description')}
              </motion.p>
              
              <motion.ul variants={staggerContainer} className="space-y-3">
                {t('services.construction.services', { returnObjects: true }).map((service, index) => (
                  <motion.li 
                    key={index}
                    variants={fadeIn}
                    className="flex items-start"
                  >
                    <Check size={20} className="text-primary mt-1 mr-2 flex-shrink-0" />
                    <span>{service}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/images/web-cons.jpg" 
                  alt="Construction Services" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
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
              {t('home.cta.title')}
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl mb-8 max-w-2xl mx-auto"
            >
              {t('home.cta.description')}
            </motion.p>
            
            <motion.div variants={fadeIn}>
              <a 
                href="/contact" 
                className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
              >
                {t('common.requestQuote')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
