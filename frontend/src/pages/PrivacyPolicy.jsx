import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react'

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
      staggerChildren: 0.1
    }
  }
}

const PrivacyPolicy = () => {
  const { t } = useTranslation()

  const sections = [
    {
      icon: <Database size={24} />,
      title: "Data Collection",
      content: [
        "We collect information you provide directly to us, such as your name, email address, phone number, and other contact information when you use our services.",
        "We automatically collect certain information when you visit our website, including your IP address, browser type, pages visited, and duration of your visit.",
        "We may collect information about your general location based on your IP address."
      ]
    },
    {
      icon: <Eye size={24} />,
      title: "Data Usage",
      content: [
        "Provide, maintain, and improve our web development, transport, and construction services.",
        "Communicate with you regarding our services, including updates and important notifications.",
        "Personalize your experience and improve our website.",
        "Analyze service usage to optimize performance.",
        "Comply with our legal and regulatory obligations."
      ]
    },
    {
      icon: <Shield size={24} />,
      title: "Data Protection",
      content: [
        "We implement appropriate technical and organizational security measures to protect your personal data.",
        "Access to your data is limited to employees who need it to perform their duties.",
        "We use SSL encryption to protect data transmission.",
        "Our servers are secured and regularly updated with the latest security patches."
      ]
    },
    {
      icon: <UserCheck size={24} />,
      title: "Your Rights",
      content: [
        "Right of access: You can request a copy of the personal data we hold about you.",
        "Right of rectification: You can request correction of inaccurate or incomplete data.",
        "Right to erasure: You can request deletion of your personal data in certain circumstances.",
        "Right to portability: You can request transfer of your data to another service.",
        "Right to object: You can object to the processing of your data in certain cases."
      ]
    },
    {
      icon: <Lock size={24} />,
      title: "Data Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share your information with third-party service providers who help us provide our services.",
        "We may disclose your information if required by law or to protect our legal rights.",
        "In case of merger or acquisition, your data may be transferred to the new owner."
      ]
    },
    {
      icon: <FileText size={24} />,
      title: "Data Retention",
      content: [
        "We retain your personal data as long as necessary to provide our services.",
        "Contact data is retained for the duration of our business relationship.",
        "Navigation data is generally retained for a maximum of 2 years.",
        "Some data may be retained longer to comply with our legal obligations."
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              variants={fadeIn}
              className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm font-medium mb-6"
            >
              <Shield className="w-4 h-4 mr-2" />
              Data Protection
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Privacy Policy
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
            >
              We are committed to protecting your privacy and handling your personal data transparently and securely.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="mt-8 text-sm text-blue-200"
            >
              Last updated: {new Date().toLocaleDateString('en-US')}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-midnight mb-6">Introduction</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                NEOBIZE ("we", "our" or "us") is committed to protecting and respecting your privacy. 
                This privacy policy explains how we collect, use, store, and protect your personal information 
                when you use our website and services.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-blue-50 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-bold text-midnight mb-4">Important Information</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>This policy applies to all our services: web development, transport, and construction.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>By using our services, you accept the practices described in this policy.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>We comply with the General Data Protection Regulation (GDPR).</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <div className="grid gap-8">
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                      <div className="text-primary">
                        {section.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-midnight">{section.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cookies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-3xl font-bold text-midnight mb-6">Cookies and Similar Technologies</h2>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-midnight mb-6">Types of cookies used</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-midnight mb-3">Essential cookies</h4>
                  <p className="text-gray-600 text-sm">
                    Necessary for the website to function. They cannot be disabled.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-midnight mb-3">Analytics cookies</h4>
                  <p className="text-gray-600 text-sm">
                    Help us understand how you use our site to improve it.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-midnight mb-3">Performance cookies</h4>
                  <p className="text-gray-600 text-sm">
                    Collect information about website performance.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-midnight mb-3">Preference cookies</h4>
                  <p className="text-gray-600 text-sm">
                    Remember your preferences like language and region.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2 variants={fadeIn} className="text-3xl font-bold mb-6">
              Questions about this policy?
            </motion.h2>
            
            <motion.p variants={fadeIn} className="text-xl text-blue-100 mb-8">
              If you have any questions regarding this privacy policy or wish to exercise your rights, 
              please don't hesitate to contact us.
            </motion.p>
            
            <motion.div variants={fadeIn} className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-bold mb-2">Email</h4>
                  <p className="text-blue-100">privacy@neobize.com</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Phone</h4>
                  <p className="text-blue-100">+33 1 23 45 67 89</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Address</h4>
                  <p className="text-blue-100">123 Innovation Street<br />75001 Paris, France</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Data Protection Officer</h4>
                  <p className="text-blue-100">dpo@neobize.com</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
