import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-midnight mb-6">Page non trouvée</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link 
            to="/" 
            className="btn btn-primary inline-flex items-center"
          >
            <Home size={18} className="mr-2" />
            {t('common.home')}
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
