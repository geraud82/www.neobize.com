import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll event to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

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
          ? 'bg-white/95 backdrop-blur-xl shadow-soft border-b border-neutral-200/50 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className={`text-2xl font-bold flex items-center font-heading transition-colors duration-300 ${
            isScrolled ? 'text-neutral-900' : 'text-white'
          }`}
        >
          <div className="relative">
            <span className="bg-gradient-to-r from-danger-600 to-danger-700 text-white px-3 py-2 rounded-xl mr-3 shadow-lg">
              N
            </span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-pulse"></div>
          </div>
          <span className="tracking-wide">EOBIZE</span>
        </Link>

        <div className="hidden lg:flex items-center">
          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-2 mr-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => {
                  const baseClasses = 'relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-lg group';
                  const activeClasses = isActive
                    ? isScrolled 
                      ? 'text-primary-600 bg-primary-50' 
                      : 'text-white bg-white/10'
                    : isScrolled
                      ? 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                      : 'text-neutral-200 hover:text-white hover:bg-white/10';
                  
                  return `${baseClasses} ${activeClasses}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            to="/contact"
            className="btn btn-primary-gradient group"
          >
            <span>{t('common.contactUs')}</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`menu-button lg:hidden p-2 rounded-xl transition-all duration-300 ${
            isScrolled 
              ? 'text-neutral-900 hover:bg-neutral-100' 
              : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="mobile-menu lg:hidden bg-white/95 backdrop-blur-xl border-t border-neutral-200/50 shadow-large"
          >
            <div className="container py-8">
              <nav className="space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `block text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300 ${
                          isActive
                            ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                            : 'text-neutral-700 hover:text-primary-600 hover:bg-primary-50'
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2, duration: 0.4 }}
                className="mt-8 pt-6 border-t border-neutral-200"
              >
                <Link
                  to="/contact"
                  className="btn btn-primary-gradient w-full group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{t('common.contactUs')}</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
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
