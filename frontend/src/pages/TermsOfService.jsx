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
      title: "Acceptation des conditions",
      content: [
        "En accédant et en utilisant les services de NEOBIZE, vous acceptez d'être lié par ces conditions d'utilisation.",
        "Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser nos services.",
        "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur notre site web.",
        "Il est de votre responsabilité de consulter régulièrement ces conditions pour prendre connaissance des éventuelles modifications."
      ]
    },
    {
      icon: <Users size={24} />,
      title: "Description des services",
      content: [
        "NEOBIZE fournit des services dans trois domaines principaux : développement web et mobile, transport et logistique, construction et génie civil.",
        "Nos services de développement incluent la création d'applications web, mobiles et de solutions SaaS personnalisées.",
        "Nos services de transport comprennent la logistique, la livraison et la gestion de flotte.",
        "Nos services de construction incluent la planification, la conception et la réalisation de projets de construction.",
        "Nous nous réservons le droit de modifier, suspendre ou interrompre tout ou partie de nos services à tout moment."
      ]
    },
    {
      icon: <Scale size={24} />,
      title: "Obligations de l'utilisateur",
      content: [
        "Vous vous engagez à utiliser nos services de manière légale et conforme à ces conditions d'utilisation.",
        "Vous ne devez pas utiliser nos services pour des activités illégales, frauduleuses ou nuisibles.",
        "Vous êtes responsable de maintenir la confidentialité de vos informations de compte et mots de passe.",
        "Vous devez nous notifier immédiatement de toute utilisation non autorisée de votre compte.",
        "Vous vous engagez à fournir des informations exactes et à jour lors de l'utilisation de nos services."
      ]
    },
    {
      icon: <Gavel size={24} />,
      title: "Propriété intellectuelle",
      content: [
        "Tous les contenus, marques, logos et propriétés intellectuelles sur notre site web appartiennent à NEOBIZE ou à nos partenaires.",
        "Vous ne pouvez pas reproduire, distribuer ou modifier notre contenu sans autorisation écrite préalable.",
        "Les solutions que nous développons pour vous restent votre propriété, sauf accord contraire spécifié dans le contrat de service.",
        "Nous respectons les droits de propriété intellectuelle des tiers et attendons la même chose de nos utilisateurs.",
        "Si vous pensez que votre propriété intellectuelle a été violée, veuillez nous contacter immédiatement."
      ]
    },
    {
      icon: <AlertTriangle size={24} />,
      title: "Limitation de responsabilité",
      content: [
        "NEOBIZE fournit ses services 'en l'état' sans garantie expresse ou implicite.",
        "Nous ne garantissons pas que nos services seront ininterrompus, sécurisés ou exempts d'erreurs.",
        "Notre responsabilité est limitée au montant payé pour les services spécifiques qui ont causé le dommage.",
        "Nous ne sommes pas responsables des dommages indirects, consécutifs ou punitifs.",
        "Certaines juridictions ne permettent pas la limitation de responsabilité, donc ces limitations peuvent ne pas s'appliquer à vous."
      ]
    },
    {
      icon: <Shield size={24} />,
      title: "Confidentialité et sécurité",
      content: [
        "Nous nous engageons à protéger la confidentialité de vos informations conformément à notre politique de confidentialité.",
        "Nous mettons en place des mesures de sécurité appropriées pour protéger vos données.",
        "Vous êtes responsable de maintenir la sécurité de vos propres systèmes et données.",
        "En cas de violation de sécurité, nous vous en informerons dans les meilleurs délais.",
        "Nous nous conformons aux réglementations applicables en matière de protection des données."
      ]
    }
  ]

  const prohibitedUses = [
    "Violer les lois ou réglementations applicables",
    "Porter atteinte aux droits d'autrui",
    "Transmettre des virus ou codes malveillants",
    "Tenter d'accéder de manière non autorisée à nos systèmes",
    "Utiliser nos services pour du spam ou des communications non sollicitées",
    "Copier ou reproduire notre contenu sans autorisation",
    "Interférer avec le fonctionnement normal de nos services"
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
              Conditions légales
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Conditions d'Utilisation
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
            >
              Ces conditions régissent l'utilisation de nos services et établissent les droits et obligations de chaque partie.
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
                Bienvenue chez NEOBIZE. Ces conditions d'utilisation ("Conditions") régissent votre utilisation 
                de notre site web et de nos services. En utilisant nos services, vous acceptez d'être lié par ces Conditions.
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-amber-50 border border-amber-200 rounded-xl p-8 mb-12">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-amber-800 mb-4">Important</h3>
                  <p className="text-amber-700 leading-relaxed">
                    Veuillez lire attentivement ces conditions avant d'utiliser nos services. 
                    Si vous n'acceptez pas ces conditions, vous ne devez pas utiliser notre site web ou nos services.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sections principales */}
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

      {/* Utilisations interdites */}
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
              <h2 className="text-3xl font-bold text-midnight mb-6">Utilisations Interdites</h2>
              <p className="text-lg text-gray-600">
                Vous vous engagez à ne pas utiliser nos services pour les activités suivantes :
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

      {/* Paiements et remboursements */}
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
              <h2 className="text-3xl font-bold text-midnight mb-8">Paiements et Remboursements</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-midnight mb-4">Conditions de paiement</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Les paiements sont dus selon les termes spécifiés dans votre contrat de service.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Nous acceptons les virements bancaires, cartes de crédit et autres méthodes approuvées.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Les retards de paiement peuvent entraîner la suspension des services.</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-midnight mb-4">Politique de remboursement</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Les remboursements sont traités selon les termes de votre contrat spécifique.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Les demandes de remboursement doivent être soumises par écrit.</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Les remboursements sont traités dans un délai de 30 jours ouvrables.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Résiliation */}
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
              <h2 className="text-3xl font-bold text-midnight mb-8">Résiliation</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-midnight mb-4">Résiliation par l'utilisateur</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Vous pouvez résilier votre utilisation de nos services à tout moment en nous notifiant par écrit. 
                    La résiliation prendra effet selon les termes de votre contrat de service.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-midnight mb-4">Résiliation par NEOBIZE</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Nous nous réservons le droit de suspendre ou de résilier votre accès à nos services en cas de :
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Violation de ces conditions d'utilisation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Non-paiement des services</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Utilisation frauduleuse ou illégale de nos services</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Droit applicable */}
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
              <h2 className="text-3xl font-bold text-midnight mb-8">Droit Applicable et Juridiction</h2>
              
              <div className="space-y-6 text-gray-700">
                <p className="leading-relaxed">
                  Ces conditions d'utilisation sont régies par le droit français. Tout litige découlant de ou en relation 
                  avec ces conditions sera soumis à la juridiction exclusive des tribunaux français.
                </p>
                
                <p className="leading-relaxed">
                  En cas de litige, nous encourageons la résolution amiable par la médiation avant tout recours judiciaire.
                </p>
                
                <p className="leading-relaxed">
                  Si une disposition de ces conditions est jugée invalide ou inapplicable, les autres dispositions 
                  resteront en vigueur.
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
              Questions sur ces conditions ?
            </motion.h2>
            
            <motion.p variants={fadeIn} className="text-xl text-blue-100 mb-8">
              Si vous avez des questions concernant ces conditions d'utilisation, 
              n'hésitez pas à nous contacter.
            </motion.p>
            
            <motion.div variants={fadeIn} className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-bold mb-2">Email juridique</h4>
                  <p className="text-blue-100">legal@neobize.com</p>
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
                  <h4 className="font-bold mb-2">Service client</h4>
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
