import { useState, useEffect } from 'react'
import { sendContactForm } from '../services/api'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from 'lucide-react'
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

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState(null) // null, 'success', 'error'
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Reset form when status changes to success
  useEffect(() => {
    if (formStatus === 'success') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }
  }, [formStatus])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)
    
    try {
      const response = await sendContactForm(formData)
      setFormStatus('success')
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error)
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <HeroSection
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074"
        badge={t('contact.sectionTitle')}
      />

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <motion.h2 
                variants={fadeIn}
                className="text-2xl md:text-3xl font-bold mb-6 text-midnight"
              >
                {t('contact.form.title') || 'Envoyez-nous un message'}
              </motion.h2>

              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-start"
                >
                  <Check size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                  <p>{t('contact.form.success')}</p>
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-start"
                >
                  <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                  <p>{t('contact.form.error')}</p>
                </motion.div>
              )}
              
              <motion.form 
                variants={fadeIn}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.name')}*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.email')}*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.subject')}*
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.message')}*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full md:w-auto flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send size={16} className="mr-2" />
                        {t('contact.form.submit')}
                      </span>
                    )}
                  </button>
                </div>
              </motion.form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 
                variants={fadeIn}
                className="text-2xl md:text-3xl font-bold mb-6 text-midnight"
              >
                {t('contact.info.title')}
              </motion.h2>
              
              <motion.div variants={fadeIn} className="space-y-8">
                <div className="flex items-start">
                  <MapPin size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-midnight mb-1">{t('contact.info.address')}</h3>
                    <p className="text-gray-600">
                      {t('contact.info.locations.benin.title')}<br />
                      {t('contact.info.locations.benin.address')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-midnight mb-1">{t('contact.info.phone')}</h3>
                    <p className="text-gray-600">
                      <a href="tel:+2290196765151" className="hover:text-primary transition-colors">
                        {t('contact.info.locations.benin.contact')}
                      </a><br />
                      <a href="https://wa.me/2296196765151" className="hover:text-primary transition-colors">
                        {t('contact.info.locations.benin.whatsapp')}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-midnight mb-1">USA</h3>
                    <p className="text-gray-600">
                      <a href="tel:+13097161835" className="hover:text-primary transition-colors">
                        {t('contact.info.locations.usa.title')}
                      </a><br />
                      <a href="https://wa.me/13124016907" className="hover:text-primary transition-colors">
                        {t('contact.info.locations.usa.whatsapp')}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-midnight mb-1">{t('contact.info.email')}</h3>
                    <p className="text-gray-600">
                      <a href="mailto:contact@neobize.com" className="hover:text-primary transition-colors">
                        {t('contact.info.locations.email')}
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-primary mr-4 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-midnight mb-1">{t('contact.info.hours')}</h3>
                    <p className="text-gray-600">
                      {t('contact.info.workingHours').split('\n').map((line, index) => (
                        <span key={index}>
                          {line}
                          {index === 0 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Google Maps Embed */}
              <motion.div 
                variants={fadeIn}
                className="mt-8 rounded-lg overflow-hidden shadow-lg h-80"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3979.8060184463323!2d2.216213689271973!3d6.384633146088166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sbj!4v1716040420000!5m2!1sfr!2sbj" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NEOBIZE Location"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              {t('contact.faq.title')}
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              {t('contact.faq.subtitle')}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold text-midnight mb-2">{t('contact.faq.questions.0.question')}</h3>
              <p className="text-gray-600">
                {t('contact.faq.questions.0.answer')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold text-midnight mb-2">{t('contact.faq.questions.1.question')}</h3>
              <p className="text-gray-600">
                {t('contact.faq.questions.1.answer')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold text-midnight mb-2">{t('contact.faq.questions.2.question')}</h3>
              <p className="text-gray-600">
                {t('contact.faq.questions.2.answer')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold text-midnight mb-2">{t('contact.faq.questions.3.question')}</h3>
              <p className="text-gray-600">
                {t('contact.faq.questions.3.answer')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
