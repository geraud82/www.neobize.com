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
      title: "Collecte des données",
      content: [
        "Nous collectons les informations que vous nous fournissez directement, telles que votre nom, adresse e-mail, numéro de téléphone et autres informations de contact lorsque vous utilisez nos services.",
        "Nous collectons automatiquement certaines informations lorsque vous visitez notre site web, notamment votre adresse IP, le type de navigateur, les pages visitées et la durée de votre visite.",
        "Nous pouvons collecter des informations sur votre localisation générale basée sur votre adresse IP."
      ]
    },
    {
      icon: <Eye size={24} />,
      title: "Utilisation des données",
      content: [
        "Fournir, maintenir et améliorer nos services de développement web, transport et construction.",
        "Communiquer avec vous concernant nos services, y compris les mises à jour et les notifications importantes.",
        "Personnaliser votre expérience et améliorer notre site web.",
        "Analyser l'utilisation de nos services pour optimiser les performances.",
        "Respecter nos obligations légales et réglementaires."
      ]
    },
    {
      icon: <Shield size={24} />,
      title: "Protection des données",
      content: [
        "Nous mettons en place des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles.",
        "L'accès à vos données est limité aux employés qui en ont besoin pour accomplir leurs tâches.",
        "Nous utilisons le chiffrement SSL pour protéger la transmission de vos données.",
        "Nos serveurs sont sécurisés et régulièrement mis à jour avec les derniers correctifs de sécurité."
      ]
    },
    {
      icon: <UserCheck size={24} />,
      title: "Vos droits",
      content: [
        "Droit d'accès : Vous pouvez demander une copie des données personnelles que nous détenons à votre sujet.",
        "Droit de rectification : Vous pouvez demander la correction de données inexactes ou incomplètes.",
        "Droit à l'effacement : Vous pouvez demander la suppression de vos données personnelles dans certaines circonstances.",
        "Droit à la portabilité : Vous pouvez demander le transfert de vos données vers un autre service.",
        "Droit d'opposition : Vous pouvez vous opposer au traitement de vos données dans certains cas."
      ]
    },
    {
      icon: <Lock size={24} />,
      title: "Partage des données",
      content: [
        "Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers.",
        "Nous pouvons partager vos informations avec des prestataires de services tiers qui nous aident à fournir nos services.",
        "Nous pouvons divulguer vos informations si la loi l'exige ou pour protéger nos droits légaux.",
        "En cas de fusion ou d'acquisition, vos données peuvent être transférées au nouvel propriétaire."
      ]
    },
    {
      icon: <FileText size={24} />,
      title: "Conservation des données",
      content: [
        "Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir nos services.",
        "Les données de contact sont conservées pendant la durée de notre relation commerciale.",
        "Les données de navigation sont généralement conservées pendant 2 ans maximum.",
        "Certaines données peuvent être conservées plus longtemps pour respecter nos obligations légales."
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
              Protection des données
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Politique de Confidentialité
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
            >
              Nous nous engageons à protéger votre vie privée et à traiter vos données personnelles de manière transparente et sécurisée.
            </motion.p>
            
            <motion.div 
              variants={fadeIn}
              className="mt-8 text-sm text-blue-200"
            >
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
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
                NEOBIZE ("nous", "notre" ou "nos") s'engage à protéger et respecter votre vie privée. 
                Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et 
                protégeons vos informations personnelles lorsque vous utilisez notre site web et nos services.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-blue-50 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-bold text-midnight mb-4">Informations importantes</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Cette politique s'applique à tous nos services : développement web, transport et construction.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>En utilisant nos services, vous acceptez les pratiques décrites dans cette politique.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Nous nous conformons au Règlement Général sur la Protection des Données (RGPD).</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sections détaillées */}
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
              <h2 className="text-3xl font-bold text-midnight mb-6">Cookies et Technologies Similaires</h2>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-midnight mb-6">Types de cookies utilisés</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-midnight mb-3">Cookies essentiels</h4>
                  <p className="text-gray-600 text-sm">
                    Nécessaires au fonctionnement du site web. Ils ne peuvent pas être désactivés.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-midnight mb-3">Cookies analytiques</h4>
                  <p className="text-gray-600 text-sm">
                    Nous aident à comprendre comment vous utilisez notre site pour l'améliorer.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-midnight mb-3">Cookies de performance</h4>
                  <p className="text-gray-600 text-sm">
                    Collectent des informations sur les performances du site web.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-bold text-midnight mb-3">Cookies de préférences</h4>
                  <p className="text-gray-600 text-sm">
                    Mémorisent vos préférences comme la langue et la région.
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
              Questions sur cette politique ?
            </motion.h2>
            
            <motion.p variants={fadeIn} className="text-xl text-blue-100 mb-8">
              Si vous avez des questions concernant cette politique de confidentialité ou souhaitez exercer vos droits, 
              n'hésitez pas à nous contacter.
            </motion.p>
            
            <motion.div variants={fadeIn} className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-bold mb-2">Email</h4>
                  <p className="text-blue-100">privacy@neobize.com</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Téléphone</h4>
                  <p className="text-blue-100">+33 1 23 45 67 89</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Adresse</h4>
                  <p className="text-blue-100">123 Rue de la Innovation<br />75001 Paris, France</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Délégué à la protection des données</h4>
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
