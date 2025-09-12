import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { FileText, Scale, AlertTriangle, Users, Gavel, Shield } from 'lucide-react'

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

const TermsOfService = () => {
  const { t } = useTranslation()

  const sections = [
    {
      icon: <FileText size={24} />,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using NEOBIZE services, you agree to be bound by these terms of use.",
        "If you do not accept these terms, you must not use our services.",
        "We reserve the right to modify these terms at any time. Changes will take effect upon publication on our website.",
        "It is your responsibility to regularly review these terms to stay informed of any changes."
      ]
    },
    {
      icon: <Users size={24} />,
      title: "Service Description",
      content: [
        "NEOBIZE provides services in three main areas: web and mobile development, transport and logistics, construction and civil engineering.",
        "Our development services include creating web applications, mobile apps, and custom SaaS solutions.",
        "Our transport services include logistics, delivery, and fleet management.",
        "Our construction services include planning, design, and execution of construction projects.",
        "We reserve the right to modify, suspend, or discontinue all or part of our services at any time."
      ]
    },
    {
      icon: <Scale size={24} />,
      title: "User Obligations",
      content: [
        "You agree to use our services legally and in accordance with these terms of use.",
        "You must not use our services for illegal, fraudulent, or harmful activities.",
        "You are responsible for maintaining the confidentiality of your account information and passwords.",
        "You must notify us immediately of any unauthorized use of your account.",
        "You agree to provide accurate and up-to-date information when using our services."
      ]
    },
    {
      icon: <Gavel size={24} />,
      title: "Intellectual Property",
      content: [
        "All content, trademarks, logos, and intellectual property on our website belong to NEOBIZE or our partners.",
        "You may not reproduce, distribute, or modify our content without prior written authorization.",
        "Solutions we develop for you remain your property, unless otherwise specified in the service contract.",
        "We respect third-party intellectual property rights and expect the same from our users.",
        "If you believe your intellectual property has been violated, please contact us immediately."
      ]
    },
    {
      icon: <AlertTriangle size={24} />,
      title: "Limitation of Liability",
      content: [
        "NEOBIZE provides its services 'as is' without express or implied warranty.",
        "We do not guarantee that our services will be uninterrupted, secure, or error-free.",
        "Our liability is limited to the amount paid for the specific services that caused the damage.",
        "We are not responsible for indirect, consequential, or punitive damages.",
        "Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you."
      ]
    },
    {
      icon: <Shield size={24} />,
      title: "Privacy and Security",
      content: [
        "We are committed to protecting the confidentiality of your information in accordance with our privacy policy.",
        "We implement appropriate security measures to protect your data.",
        "You are responsible for maintaining the security of your own systems and data.",
        "In case of a security breach, we will inform you as soon as possible.",
        "We comply with applicable data protection regulations."
      ]
    }
  ]

  const prohibitedUses = [
    "Violate applicable laws or regulations",
    "Infringe on the rights of others",
    "Transmit viruses or malicious code",
    "Attempt unauthorized access to our systems",
    "Use our services for spam or unsolicited communications",
    "Copy or reproduce our content without authorization",
    "Interfere with the normal operation of our services"
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
              <Scale className="w-4 h-4 mr-2" />
              Legal Terms
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Terms of Service
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
            >
              These terms govern the use of our services and establish the rights and obligations of each party.
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
                Welcome to NEOBIZE. These terms of service ("Terms") govern your use 
                of our website and services. By using our services, you agree to be bound by these Terms.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-amber-50 border border-amber-200 rounded-xl p-8 mb-12">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-amber-800 mb-4">Important</h3>
                  <p className="text-amber-700 leading-relaxed">
                    Please read these terms carefully before using our services. 
                    If you do not accept these terms, you must not use our website or services.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Sections */}
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

      {/* Prohibited Uses */}
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
              <h2 className="text-3xl font-bold text-midnight mb-6">Prohibited Uses</h2>
              <p className="text-lg text-gray-600">
                You agree not to use our services for the following activities:
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-red-50 border border-red-200 rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {prohibitedUses.map((use, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-red-700 text-sm">{use}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Payments and Refunds */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-midnight mb-8">Payments and Refunds</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-midnight mb-4">Payment Terms</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Payments are due according to the terms specified in your service contract.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>We accept bank transfers, credit cards, and other approved payment methods.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Payment delays may result in service suspension.</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-midnight mb-4">Refund Policy</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Refunds are processed according to the terms of your specific contract.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Refund requests must be submitted in writing.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Refunds are processed within 30 business days.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Termination */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-midnight mb-8">Termination</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-midnight mb-4">Termination by User</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You may terminate your use of our services at any time by notifying us in writing. 
                    Termination will take effect according to the terms of your service contract.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-midnight mb-4">Termination by NEOBIZE</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We reserve the right to suspend or terminate your access to our services in case of:
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Violation of these terms of service</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Non-payment for services</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Fraudulent or illegal use of our services</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Governing Law */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-midnight mb-8">Governing Law and Jurisdiction</h2>
              
              <div className="space-y-6 text-gray-700">
                <p className="leading-relaxed">
                  These terms of service are governed by French law. Any dispute arising from or in relation 
                  to these terms will be subject to the exclusive jurisdiction of French courts.
                </p>
                
                <p className="leading-relaxed">
                  In case of dispute, we encourage amicable resolution through mediation before any legal action.
                </p>
                
                <p className="leading-relaxed">
                  If any provision of these terms is deemed invalid or unenforceable, the other provisions 
                  will remain in effect.
                </p>
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
              Questions about these terms?
            </motion.h2>
            
            <motion.p variants={fadeIn} className="text-xl text-blue-100 mb-8">
              If you have any questions regarding these terms of service, 
              please don't hesitate to contact us.
            </motion.p>
            
            <motion.div variants={fadeIn} className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-bold mb-2">Legal Email</h4>
                  <p className="text-blue-100">legal@neobize.com</p>
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
                  <h4 className="font-bold mb-2">Customer Support</h4>
                  <p className="text-blue-100">support@neobize.com</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default TermsOfService
