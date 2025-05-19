import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Building, Code, Truck, Clock, CheckCircle } from 'lucide-react'

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

// Sample projects data (in a real app, this would come from an API)
const projectsData = [
  {
    id: 1,
    title: 'Plateforme SaaS de gestion de projet',
    category: 'webDev',
    description: 'Développement d\'une plateforme SaaS complète pour la gestion de projets, incluant des fonctionnalités de suivi des tâches, de collaboration et de reporting.',
    fullDescription: `
      <p>Notre équipe a conçu et développé une plateforme SaaS complète de gestion de projet pour TechStart, une startup en pleine croissance dans le secteur technologique.</p>
      
      <p>Cette solution offre une suite complète d'outils permettant aux équipes de :</p>
      <ul>
        <li>Planifier et suivre les projets avec des diagrammes de Gantt interactifs</li>
        <li>Gérer les tâches avec une méthodologie Kanban personnalisable</li>
        <li>Collaborer en temps réel sur les documents et les livrables</li>
        <li>Générer des rapports détaillés sur l'avancement des projets</li>
        <li>Intégrer des outils tiers via une API robuste</li>
      </ul>
      
      <p>La plateforme a été développée en utilisant les technologies les plus récentes, notamment React pour le frontend, Node.js pour le backend, et MongoDB pour la base de données. Nous avons également mis en place une architecture microservices pour assurer la scalabilité et la résilience de la solution.</p>
      
      <p>Le résultat est une plateforme intuitive, performante et sécurisée qui a permis à TechStart d'améliorer significativement la productivité de ses équipes et la satisfaction de ses clients.</p>
    `,
    image: 'https://placehold.co/800x600/1E40AF/FFFFFF?text=SaaS+Project',
    gallery: [
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=SaaS+Project+1',
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=SaaS+Project+2',
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=SaaS+Project+3'
    ],
    client: 'TechStart',
    year: '2023',
    duration: '8 mois',
    technologies: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS'],
    services: ['Conception UX/UI', 'Développement Frontend', 'Développement Backend', 'DevOps', 'Support technique'],
    results: [
      'Augmentation de 40% de la productivité des équipes',
      'Réduction de 30% des délais de livraison',
      'Satisfaction client améliorée de 25%'
    ]
  },
  {
    id: 2,
    title: 'Application mobile de e-commerce',
    category: 'webDev',
    description: 'Création d\'une application mobile de e-commerce avec des fonctionnalités de paiement sécurisé, de gestion des commandes et de fidélisation des clients.',
    fullDescription: `
      <p>Pour ShopNow, une entreprise de vente au détail en pleine expansion, nous avons développé une application mobile e-commerce complète disponible sur iOS et Android.</p>
      
      <p>Cette application offre une expérience d'achat fluide et personnalisée avec les fonctionnalités suivantes :</p>
      <ul>
        <li>Interface utilisateur intuitive et responsive</li>
        <li>Catalogue de produits avec recherche avancée et filtres</li>
        <li>Système de paiement sécurisé multi-méthodes</li>
        <li>Gestion des commandes en temps réel</li>
        <li>Programme de fidélité avec système de points et récompenses</li>
        <li>Notifications push personnalisées</li>
        <li>Intégration avec les réseaux sociaux</li>
      </ul>
      
      <p>L'application a été développée en utilisant React Native pour assurer une expérience utilisateur cohérente sur toutes les plateformes, avec Firebase pour le backend et Stripe pour les paiements.</p>
      
      <p>Depuis son lancement, l'application a connu un grand succès, avec plus de 100 000 téléchargements et une augmentation significative des ventes en ligne pour ShopNow.</p>
    `,
    image: 'https://placehold.co/800x600/1E40AF/FFFFFF?text=Mobile+App',
    gallery: [
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Mobile+App+1',
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Mobile+App+2',
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Mobile+App+3'
    ],
    client: 'ShopNow',
    year: '2022',
    duration: '6 mois',
    technologies: ['React Native', 'Firebase', 'Stripe', 'Redux', 'Node.js'],
    services: ['Conception UX/UI', 'Développement mobile', 'Intégration API', 'Tests et assurance qualité'],
    results: [
      'Plus de 100 000 téléchargements',
      'Augmentation de 60% des ventes en ligne',
      'Taux de conversion amélioré de 35%'
    ]
  },
  {
    id: 3,
    title: 'Optimisation de flotte de livraison',
    category: 'transport',
    description: 'Mise en place d\'un système d\'optimisation des itinéraires pour une flotte de véhicules de livraison, permettant de réduire les coûts et d\'améliorer l\'efficacité.',
    fullDescription: `
      <p>Pour LogiTrans, une entreprise de logistique, nous avons conçu et implémenté un système complet d'optimisation de flotte de livraison.</p>
      
      <p>Ce système innovant comprend :</p>
      <ul>
        <li>Un algorithme d'optimisation d'itinéraires en temps réel</li>
        <li>Un système de suivi GPS des véhicules</li>
        <li>Une plateforme de gestion centralisée pour les dispatchers</li>
        <li>Une application mobile pour les chauffeurs</li>
        <li>Des analyses détaillées de performance et de consommation</li>
        <li>Des prévisions de maintenance préventive</li>
      </ul>
      
      <p>La solution a été développée en utilisant une architecture cloud scalable, avec des algorithmes d'intelligence artificielle pour l'optimisation des itinéraires et la prédiction des temps de livraison.</p>
      
      <p>Grâce à cette solution, LogiTrans a pu réduire significativement ses coûts opérationnels tout en améliorant la qualité de service et la satisfaction client.</p>
    `,
    image: 'https://placehold.co/800x600/1E40AF/FFFFFF?text=Transport+Fleet',
    gallery: [
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Transport+Fleet+1',
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Transport+Fleet+2',
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Transport+Fleet+3'
    ],
    client: 'LogiTrans',
    year: '2023',
    duration: '10 mois',
    technologies: ['Python', 'TensorFlow', 'Google Maps API', 'React', 'Flutter'],
    services: ['Conseil en logistique', 'Développement logiciel', 'Intégration IoT', 'Formation'],
    results: [
      'Réduction de 25% des coûts de carburant',
      'Augmentation de 30% du nombre de livraisons par jour',
      'Diminution de 40% des retards de livraison'
    ]
  },
  {
    id: 4,
    title: 'Service de livraison médicale express',
    category: 'transport',
    description: 'Développement d\'un service de livraison express pour le secteur médical, garantissant la livraison rapide et sécurisée de médicaments et d\'équipements médicaux.',
    fullDescription: `
      <p>Pour MediExpress, nous avons développé un service de livraison médicale express spécialisé dans le transport rapide et sécurisé de médicaments, d'échantillons biologiques et d'équipements médicaux sensibles.</p>
      
      <p>Ce service comprend :</p>
      <ul>
        <li>Une flotte de véhicules spécialement équipés pour le transport médical</li>
        <li>Un système de suivi en temps réel avec contrôle de température</li>
        <li>Une plateforme de réservation en ligne pour les professionnels de santé</li>
        <li>Un protocole strict de manipulation et de transport des produits médicaux</li>
        <li>Une équipe de chauffeurs formés aux normes médicales</li>
      </ul>
      
      <p>Nous avons également développé une application mobile permettant aux clients de suivre leurs livraisons en temps réel et de recevoir des notifications à chaque étape du processus.</p>
      
      <p>Ce service a permis à MediExpress de devenir un acteur majeur dans le secteur de la logistique médicale, avec une réputation d'excellence et de fiabilité.</p>
    `,
    image: 'https://placehold.co/800x600/1E40AF/FFFFFF?text=Medical+Delivery',
    gallery: [
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Medical+Delivery+1',
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Medical+Delivery+2',
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Medical+Delivery+3'
    ],
    client: 'MediExpress',
    year: '2022',
    duration: '9 mois',
    technologies: ['IoT', 'React Native', 'Node.js', 'MongoDB', 'AWS'],
    services: ['Conseil en logistique médicale', 'Développement d\'application', 'Formation du personnel', 'Support opérationnel'],
    results: [
      'Délai de livraison réduit à moins de 2 heures',
      'Taux de satisfaction client de 98%',
      'Zéro incident de détérioration de produits'
    ]
  },
  {
    id: 5,
    title: 'Construction d\'un immeuble de bureaux écologique',
    category: 'construction',
    description: 'Construction d\'un immeuble de bureaux respectueux de l\'environnement, intégrant des technologies d\'économie d\'énergie et des matériaux durables.',
    fullDescription: `
      <p>Pour EcoOffice, nous avons conçu et construit un immeuble de bureaux écologique de 5000m² qui répond aux normes environnementales les plus strictes.</p>
      
      <p>Ce projet innovant comprend :</p>
      <ul>
        <li>Une structure en bois certifié FSC et en matériaux recyclés</li>
        <li>Un système de panneaux solaires couvrant 80% des besoins énergétiques</li>
        <li>Un système de récupération et de traitement des eaux de pluie</li>
        <li>Une isolation thermique et acoustique haute performance</li>
        <li>Un système de ventilation naturelle réduisant les besoins en climatisation</li>
        <li>Des espaces verts intégrés et une toiture végétalisée</li>
        <li>Des bornes de recharge pour véhicules électriques</li>
      </ul>
      
      <p>Le bâtiment a obtenu la certification LEED Platinum, la plus haute distinction en matière de construction écologique, et a été reconnu comme un exemple d'excellence en architecture durable.</p>
      
      <p>Ce projet démontre notre engagement envers des pratiques de construction responsables et notre capacité à innover dans le domaine de l'architecture écologique.</p>
    `,
    image: 'https://placehold.co/800x600/1E40AF/FFFFFF?text=Green+Building',
    gallery: [
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Green+Building+1',
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Green+Building+2',
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Green+Building+3'
    ],
    client: 'EcoOffice',
    year: '2023',
    duration: '18 mois',
    technologies: ['Construction écologique', 'Panneaux solaires', 'Système de récupération d\'eau', 'Domotique avancée'],
    services: ['Architecture', 'Ingénierie structurelle', 'Gestion de projet', 'Certification environnementale'],
    results: [
      'Certification LEED Platinum obtenue',
      'Réduction de 70% de la consommation énergétique',
      'Économie de 60% sur les coûts d\'exploitation'
    ]
  },
  {
    id: 6,
    title: 'Rénovation d\'un bâtiment historique',
    category: 'construction',
    description: 'Rénovation complète d\'un bâtiment historique, préservant son caractère architectural tout en modernisant ses installations et en améliorant son efficacité énergétique.',
    fullDescription: `
      <p>Pour PatrimoineRénov, nous avons entrepris la rénovation complète d'un bâtiment historique du 19ème siècle, transformant cet édifice classé en un espace moderne tout en préservant son caractère architectural unique.</p>
      
      <p>Ce projet complexe a impliqué :</p>
      <ul>
        <li>La restauration minutieuse des façades et éléments architecturaux d'origine</li>
        <li>Le renforcement structurel du bâtiment selon les normes antisismiques actuelles</li>
        <li>L'installation de systèmes modernes de chauffage, ventilation et climatisation</li>
        <li>La mise aux normes électriques et de sécurité</li>
        <li>L'amélioration de l'isolation thermique et acoustique</li>
        <li>L'intégration discrète de technologies intelligentes</li>
        <li>L'aménagement d'espaces intérieurs fonctionnels et élégants</li>
      </ul>
      
      <p>Notre équipe a travaillé en étroite collaboration avec des historiens et des conservateurs du patrimoine pour garantir que chaque aspect de la rénovation respecte l'intégrité historique du bâtiment.</p>
      
      <p>Le résultat est un magnifique exemple de la façon dont l'ancien et le moderne peuvent coexister harmonieusement, créant un espace qui honore le passé tout en répondant aux besoins du présent.</p>
    `,
    image: 'https://placehold.co/800x600/1E40AF/FFFFFF?text=Historic+Renovation',
    gallery: [
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Historic+Renovation+1',
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Historic+Renovation+2',
      'https://placehold.co/800x600/1E40AF/FFFFFF?text=Historic+Renovation+3'
    ],
    client: 'PatrimoineRénov',
    year: '2021',
    duration: '24 mois',
    technologies: ['Techniques de restauration traditionnelles', 'Matériaux écologiques', 'Systèmes domotiques', 'Isolation écologique'],
    services: ['Restauration architecturale', 'Ingénierie structurelle', 'Design d\'intérieur', 'Gestion de projet patrimonial'],
    results: [
      'Préservation de 95% des éléments architecturaux d\'origine',
      'Amélioration de 60% de l\'efficacité énergétique',
      'Prix d\'excellence en restauration patrimoniale'
    ]
  }
];

const ProjectDetail = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  // Category icons
  const categoryIcons = {
    webDev: <Code size={20} className="mr-2" />,
    transport: <Truck size={20} className="mr-2" />,
    construction: <Building size={20} className="mr-2" />
  }

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProject = () => {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        const foundProject = projectsData.find(p => p.id === parseInt(id))
        setProject(foundProject)
        setLoading(false)
      }, 500)
    }

    fetchProject()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-midnight mb-4">Projet non trouvé</h1>
        <p className="text-gray-600 mb-8">Le projet que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link 
          to="/projects" 
          className="btn btn-primary flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          Retour aux projets
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-midnight text-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-midnight via-primary/40 to-midnight/80 z-10"></div>
          
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 z-0" 
            style={{ backgroundImage: `url('${project.image}')` }}
          ></div>
          
          {/* Animated shapes */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <Link 
              to="/projects" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              {t('projects.title')}
            </Link>
            
            <div className="flex items-center mb-4">
              {categoryIcons[project.category]}
              <span className="text-sm font-medium text-white/80">
                {t(`projects.categories.${project.category}`)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <User size={20} className="mr-2 text-primary" />
                <span>Client: <strong>{project.client}</strong></span>
              </div>
              
              <div className="flex items-center">
                <Calendar size={20} className="mr-2 text-primary" />
                <span>Année: <strong>{project.year}</strong></span>
              </div>
              
              <div className="flex items-center">
                <Clock size={20} className="mr-2 text-primary" />
                <span>Durée: <strong>{project.duration}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mb-16"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl font-bold text-midnight mb-8"
            >
              Galerie du projet
            </motion.h2>
            
            <motion.div variants={fadeIn} className="mb-4">
              <img 
                src={project.gallery[activeImage]} 
                alt={`${project.title} - Vue ${activeImage + 1}`} 
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex gap-4 overflow-x-auto pb-4">
              {project.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden transition-all ${
                    activeImage === index ? 'ring-4 ring-primary' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${project.title} - Miniature ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.h2 
                  variants={fadeIn}
                  className="text-3xl font-bold text-midnight mb-8"
                >
                  À propos du projet
                </motion.h2>
                
                <motion.div 
                  variants={fadeIn}
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.fullDescription }}
                />
              </motion.div>
            </div>
            
            <div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <motion.h3 
                  variants={fadeIn}
                  className="text-xl font-bold text-midnight mb-6"
                >
                  Détails du projet
                </motion.h3>
                
                <motion.div variants={fadeIn} className="space-y-6">
                  <div>
                    <h4 className="font-bold text-gray-700 mb-2">Technologies utilisées</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-700 mb-2">Services fournis</h4>
                    <ul className="space-y-2">
                      {project.services.map((service, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-700 mb-2">Résultats obtenus</h4>
                    <ul className="space-y-2">
                      {project.results.map((result, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </div>
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
              Vous avez un projet similaire ?
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl mb-8 max-w-2xl mx-auto"
            >
              Contactez-nous pour discuter de votre projet et découvrir comment NEOBIZE peut vous aider à le réaliser.
            </motion.p>
            
            <motion.div variants={fadeIn}>
              <Link 
                to="/contact" 
                className="btn bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3"
              >
                {t('common.contactUs')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail
