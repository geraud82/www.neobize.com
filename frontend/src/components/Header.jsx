import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)

  // Change language handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
    setIsLangMenuOpen(false)
  }

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-button')) {
        setIsMenuOpen(false)
      }
      if (isLangMenuOpen && !e.target.closest('.lang-menu') && !e.target.closest('.lang-button')) {
        setIsLangMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, isLangMenuOpen])

  // Navigation links
  const navLinks = [
    { name: t('common.home'), path: '/' },
    { name: t('common.services'), path: '/services' },
    { name: t('common.about'), path: '/about' },
    { name: t('common.projects'), path: '/projects' },
    { name: t('common.contact'), path: '/contact' },
    { name: t('common.blog'), path: '/blog' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-midnight/80 backdrop-blur-lg shadow-lg py-2 border-b border-white/10' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-white flex items-center font-heading"
        >
          <span className="bg-primary text-white px-2 py-1 rounded-md mr-1">N</span>
          <span className="tracking-wider">EOBIZE</span>
        </Link>

        <div className="hidden md:flex items-center">
          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-heading font-semibold tracking-wide uppercase transition-all duration-300 rounded-md ${
                    isActive
                      ? 'text-white after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-primary after:rounded-full'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* CTA Button */}
            <Link
              to="/contact"
              className="btn btn-primary ml-4 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 font-heading font-semibold tracking-wide"
            >
              {t('common.contactUs')}
            </Link>
          </nav>

          {/* Language Switcher */}
          <div className="relative ml-6">
            <button
              className="lang-button flex items-center px-2 py-2 text-sm font-heading font-semibold tracking-wide text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs overflow-hidden border-2 border-white/20 shadow-lg`}>
                {i18n.language === 'fr' ? 
                  <span className="bg-blue-600 text-white w-full h-full flex items-center justify-center font-bold">FR</span> : 
                  <span className="bg-red-600 text-white w-full h-full flex items-center justify-center font-bold">EN</span>
                }
              </span>
              <ChevronDown size={16} className={`ml-1 text-white transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="lang-menu absolute right-0 mt-1 w-48 bg-midnight/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
                >
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-white hover:bg-primary/20 transition-colors flex items-center"
                    onClick={() => changeLanguage('fr')}
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-600 mr-2 flex items-center justify-center text-xs">FR</span>
                    Français
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-white hover:bg-primary/20 transition-colors flex items-center"
                    onClick={() => changeLanguage('en')}
                  >
                    <span className="w-5 h-5 rounded-full bg-red-600 mr-2 flex items-center justify-center text-xs">EN</span>
                    English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-button md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu md:hidden bg-midnight/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-5">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block text-base font-heading font-semibold tracking-wide uppercase py-2 px-3 rounded-md transition-colors ${
                        isActive
                          ? 'text-white bg-primary/20 border-l-4 border-primary pl-4'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              {/* Language Switcher */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="flex flex-col space-y-2 pt-4 border-t border-gray-700/50"
              >
                <span className="text-sm font-heading font-semibold tracking-wide uppercase text-gray-400 px-3">{t('common.language')}</span>
                <div className="flex space-x-2 px-3">
                  <button
                    className="flex-1 py-2 px-3 rounded-md bg-white/5 text-base font-heading font-semibold tracking-wide text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                    onClick={() => changeLanguage('fr')}
                  >
                    <span className="w-5 h-5 rounded-full bg-blue-600 mr-2 flex items-center justify-center text-xs">FR</span>
                    Français
                  </button>
                  <button
                    className="flex-1 py-2 px-3 rounded-md bg-white/5 text-base font-heading font-semibold tracking-wide text-gray-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                    onClick={() => changeLanguage('en')}
                  >
                    <span className="w-5 h-5 rounded-full bg-red-600 mr-2 flex items-center justify-center text-xs">EN</span>
                    English
                  </button>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.05 }}
              >
                <Link
                  to="/contact"
                  className="btn btn-primary w-full text-center mt-2 shadow-lg shadow-primary/20 font-heading font-semibold tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.contactUs')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
