import { useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'

// Create a context for language change
export const LanguageContext = createContext()

// Layouts
import Layout from './layouts/Layout'

// Pages
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import Admin from './pages/Admin'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  const { i18n } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'fr')
  
  // Function to change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setCurrentLanguage(lng)
  }

  // Effect to update i18n language when currentLanguage changes
  useEffect(() => {
    i18n.changeLanguage(currentLanguage)
  }, [currentLanguage, i18n])

  useEffect(() => {
    // Simuler un temps de chargement pour l'animation initiale
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-midnight">
        <div className="text-4xl font-bold text-white">NEOBIZE</div>
      </div>
    )
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Admin routes outside of the main layout */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/settings" element={<Settings />} />
        </Routes>
      </AnimatePresence>
    </LanguageContext.Provider>
  )
}

export default App
