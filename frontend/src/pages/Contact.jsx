import { useState, useEffect } from 'react'
import { sendContactForm } from '../services/api'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Check, AlertCircle, Clock, Car, Smartphone, Globe } from 'lucide-react'
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
      console.error('Error sending form:', error)
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <HeroSection
        title="Get in Touch with NEOBIZE"
        subtitle="Ready to transform your transportation operations or launch your next digital project? Contact our expert team for personalized solutions."
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074"
        badge="Contact Us"
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
                Send Us a Message
              </motion.h2>

              <motion.p 
                variants={fadeIn}
                className="text-gray-600 mb-6"
              >
                Whether you need transportation services, want to develop a mobile app, or require a custom SaaS solution, we're here to help. Fill out the form below and we'll get back to you within 24 hours.
              </motion.p>

              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-start"
                >
                  <Check size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                  <p>Thank you for your message! We'll get back to you within 24 hours.</p>
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-start"
                >
                  <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
                  <p>There was an error sending your message. Please try again or contact us directly.</p>
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
                      Full Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject*
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      <option value="Transportation Services">Transportation Services</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="SaaS Solutions">SaaS Solutions</option>
                      <option value="AI Integration">AI Integration</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Partnership">Partnership Opportunity</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Tell us about your project or transportation needs..."
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
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send size={16} className="mr-2" />
                        Send Message
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
                Contact Information
              </motion.h2>
              
              <motion.div variants={fadeIn} className="space-y-8">
                <div className="flex items-start">
                  <MapPin size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-midnight mb-1">Our Locations</h3>
                    <div className="text-gray-600 space-y-2">
                      <div>
                        <p className="font-semibold">USA Office</p>
                        <p>4208 11th Avenue A</p>
                        <p>Moline, IL 61265</p>
                      </div>
                      <div>
                        <p className="font-semibold">Benin Office</p>
                        <p>Pahou, Benin</p>
                        <p>west Africa Operations</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-midnight mb-1">Phone Numbers</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>
                        <span className="font-semibold">Benin:</span>{' '}
                        <a href="tel:+2290196765151" className="hover:text-primary transition-colors">
                          +229 01 96 76 51 51
                        </a>
                      </p>
                      <p>
                        <span className="font-semibold">USA:</span>{' '}
                        <a href="tel:+13097161835" className="hover:text-primary transition-colors">
                          +1 (309) 7990907
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary mr-4 mt-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-midnight mb-1">WhatsApp</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>
                        <span className="font-semibold">Benin:</span>{' '}
                        <a href="https://wa.me/2296196765151" className="hover:text-primary transition-colors">
                          +229 61 96 76 51 51
                        </a>
                      </p>
                      <p>
                        <span className="font-semibold">USA:</span>{' '}
                        <a href="https://wa.me/13124016907" className="hover:text-primary transition-colors">
                          +1 (309) 7990907
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-midnight mb-1">Email Addresses</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>
                        <span className="font-semibold">General:</span>{' '}
                        <a href="mailto:contact@neobize.com" className="hover:text-primary transition-colors">
                          contact@neobize.com
                        </a>
                      </p>
                      <p>
                        <span className="font-semibold">Transportation:</span>{' '}
                        <a href="mailto:transport@neobize.com" className="hover:text-primary transition-colors">
                          transport@neobize.com
                        </a>
                      </p>
                      <p>
                        <span className="font-semibold">Development:</span>{' '}
                        <a href="mailto:dev@neobize.com" className="hover:text-primary transition-colors">
                          dev@neobize.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock size={24} className="text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-midnight mb-1">Business Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p><span className="font-semibold">Transportation Services:</span> 24/7 Available</p>
                      <p><span className="font-semibold">Office Hours:</span> Mon-Fri 8:00 AM - 6:00 PM (Local Time)</p>
                      <p><span className="font-semibold">Emergency Support:</span> Available 24/7</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Google Maps Embed */}
              <motion.div 
                variants={fadeIn}
                className="mt-8 rounded-lg overflow-hidden shadow-lg h-80"
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2984.8234567890123!2d-90.5151234!3d41.5067890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87e23456789abcde%3A0x1234567890abcdef!2s4208%2011th%20Ave%20A%2C%20Moline%2C%20IL%2061265%2C%20USA!5e0!3m2!1sen!2sus!4v1716040420000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NEOBIZE Location - 4208 11th Avenue A, Moline, IL 61265"
                ></iframe>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
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
              className="text-3xl md:text-4xl font-bold mb-4 text-midnight"
            >
              Our Service Areas
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              We provide transportation services and digital solutions across multiple regions
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <Car size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-midnight mb-2">Transportation Services</h3>
              <p className="text-gray-600 mb-4">
                NEMT, Airport Shuttle, Medical Carrier services across USA and West Africa
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Moline, Illinois</li>
                <li>• Cotonou, Benin</li>
                <li>• Regional Coverage</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <Smartphone size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-midnight mb-2">Mobile & Web Development</h3>
              <p className="text-gray-600 mb-4">
                Custom applications and websites for businesses worldwide
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Global Remote Services</li>
                <li>• Multi-language Support</li>
                <li>• 24/7 Development Support</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <Globe size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-midnight mb-2">SaaS & AI Solutions</h3>
              <p className="text-gray-600 mb-4">
                Cloud-based software and AI integration for modern businesses
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cloud Infrastructure</li>
                <li>• AI-Powered Solutions</li>
                <li>• Scalable Platforms</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Get answers to common questions about our transportation services and digital solutions
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="text-lg font-bold text-midnight mb-3">What transportation services do you offer?</h3>
              <p className="text-gray-600">
                We provide Non-Emergency Medical Transportation (NEMT), Airport Shuttle services, and Medical Carrier services. Our fleet is equipped with modern vehicles and trained drivers to ensure safe, comfortable transportation for all passengers.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="text-lg font-bold text-midnight mb-3">How long does it take to develop a custom application?</h3>
              <p className="text-gray-600">
                Development timelines vary based on project complexity. Simple mobile apps typically take 2-3 months, while complex SaaS platforms may require 6-12 months. We provide detailed project timelines during our initial consultation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="text-lg font-bold text-midnight mb-3">Do you provide 24/7 transportation services?</h3>
              <p className="text-gray-600">
                Yes, our transportation services are available 24/7 for emergency medical transport and scheduled rides. We maintain a fleet of vehicles and drivers ready to respond to your transportation needs at any time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="text-lg font-bold text-midnight mb-3">Can you integrate AI into existing business systems?</h3>
              <p className="text-gray-600">
                Absolutely! We specialize in AI integration for existing systems. Whether you need chatbots, predictive analytics, or automated workflows, we can seamlessly integrate AI solutions to enhance your current business operations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="text-lg font-bold text-midnight mb-3">What makes NEOBIZE different from other service providers?</h3>
              <p className="text-gray-600">
                Our unique combination of transportation services and digital solutions sets us apart. We understand both physical and digital logistics, allowing us to create comprehensive solutions that bridge the gap between traditional services and modern technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-50 p-6 rounded-lg"
            >
              <h3 className="text-lg font-bold text-midnight mb-3">Do you offer ongoing support and maintenance?</h3>
              <p className="text-gray-600">
                Yes, we provide comprehensive ongoing support for all our digital solutions. This includes regular updates, security patches, performance monitoring, and technical support to ensure your systems run smoothly 24/7.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
