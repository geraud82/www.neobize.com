import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

// Hooks
import useScrollToAnchor from '../hooks/useScrollToAnchor'

const Layout = () => {
  const location = useLocation()
  const { t } = useTranslation()
  
  // Utiliser le hook pour gérer le défilement vers les ancres
  useScrollToAnchor()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Layout
