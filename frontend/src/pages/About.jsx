import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { History, Target, Eye, Users } from 'lucide-react'
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
  const { t } = useTranslation()

  // Team members (sample)
  const teamMembers = [
    {
      id: 1,
      name: 'Mawule Djossou',
      role: 'CEO & Fondateur',
      bio: 'Entrepreneur passionné avec plus de 20ans d\'expérience dans le développement d\'application web et mobile et la gestion d\'entreprise.',
      image: '/images/mawule.jpeg'
    },
    {
      id: 2,
      name: 'Ursula verchere',
      role: 'Directrice des Operations et IT',
      bio: 'Expert en développement web et mobile avec une solide expérience dans la création d\'applications innovantes.',
      image: '/images/matin.jpeg'
    },
    {
      id: 3,
      name: 'Jeosbe Avadra',
      role: 'Directeur Administratif et Logistique',
      bio: 'Expert En gestion d\'entreprise  et en logistique  avec plus de 10 ans d\'expérience dans la gestion de flottes et l\'optimisation des itinéraires.',
      image: '/images/avadra.jpeg'
    },
    {
      id: 4,
      name: 'Martiviok Leroy',
      role: 'Architecte',
      bio: 'Ingénieure en génie civil avec une expertise dans la gestion de projets de construction et de rénovation.',
      image: '/images/leroy.jpeg'
    }
  ]

  return (
    <div>
      <HeroSection
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071"
        badge={t('about.sectionTitle')}
      />

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn} className="mb-6">
                <History size={48} className="text-primary" />
              </motion.div>
              
              <motion.h2 
                variants={fadeIn}
                className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
              >
                {t('about.history.title')}
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600"
              >
                {t('about.history.description')}
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/images/web-histo.jpg" 
                  alt="NEOBIZE History" 
                  className="w-full h-full object-cover"
                />
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
                {t('about.mission.title')}
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600"
              >
                {t('about.mission.description')}
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
                {t('about.vision.title')}
              </motion.h2>
              
              <motion.p 
                variants={fadeIn}
                className="text-gray-600"
              >
                {t('about.vision.description')}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
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
              {t('about.team.title')}
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {t('about.team.description')}
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
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-64 flex items-center justify-center bg-gray-50">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="max-h-64 w-auto object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-midnight mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-100">
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
              {t('about.values.title')}
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {t('about.values.subtitle')}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-midnight mb-4">{t('about.values.excellence.title')}</h3>
              <p className="text-gray-600">
                {t('about.values.excellence.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-midnight mb-4">{t('about.values.innovation.title')}</h3>
              <p className="text-gray-600">
                {t('about.values.innovation.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-lg text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-primary text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-midnight mb-4">{t('about.values.integrity.title')}</h3>
              <p className="text-gray-600">
                {t('about.values.integrity.description')}
              </p>
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
              {t('about.join.title')}
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl mb-8 max-w-2xl mx-auto"
            >
              {t('about.join.description')}
            </motion.p>
            
            <motion.div variants={fadeIn}>
              <a 
                href="/contact" 
                className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
              >
                {t('common.contactUs')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
