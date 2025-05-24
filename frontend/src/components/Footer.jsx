import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <Facebook size={20} />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <Twitter size={20} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Instagram size={20} />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <Linkedin size={20} />, url: 'https://linkedin.com', label: 'LinkedIn' }
  ]

  const companyLinks = [
    { name: t('common.home'), path: '/' },
    { name: t('common.about'), path: '/about' },
    { name: t('common.services'), path: '/services' },
    { name: t('common.projects'), path: '/projects' },
    { name: t('common.blog'), path: '/blog' }
  ]

  const serviceLinks = [
    { name: t('services.webDev.title'), path: '/services#web-dev' },
    { name: t('services.transport.title'), path: '/services#transport' },
    { name: t('services.construction.title'), path: '/services#construction' }
  ]

  return (
    <footer className="bg-midnight text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="text-2xl font-bold mb-4 inline-block">
              NEOBIZE
            </Link>
            <p className="text-gray-400 mb-6">{t('about.mission.description')}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-dark-gray p-2 rounded-full hover:bg-white hover:text-midnight transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 text-gray-400 flex-shrink-0 mt-1" />
                <span>
                  {t('contact.info.locations.benin.title')}<br />
                  {t('contact.info.locations.benin.address')}
                </span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="mr-2 text-gray-400 flex-shrink-0 mt-1" />
                <span>
                  <a href="tel:+2290196765151" className="text-gray-400 hover:text-white transition-colors">
                    {t('contact.info.locations.benin.contact')}
                  </a><br />
                  <a href="https://wa.me/2290196765151" className="text-gray-400 hover:text-white transition-colors">
                    {t('contact.info.locations.benin.whatsapp')}
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="mr-2 text-gray-400 flex-shrink-0 mt-1" />
                <span>
                  <a href="tel:+13097161835" className="text-gray-400 hover:text-white transition-colors">
                    {t('contact.info.locations.usa.title')}
                  </a><br />
                  <a href="https://wa.me/13124016907" className="text-gray-400 hover:text-white transition-colors">
                    {t('contact.info.locations.usa.whatsapp')}
                  </a>
                </span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="mr-2 text-gray-400 flex-shrink-0 mt-1" />
                <a href="mailto:contact@neobize.com" className="text-gray-400 hover:text-white transition-colors">
                  {t('contact.info.locations.email')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-bold mb-2">{t('footer.newsletter.title')}</h3>
              <p className="text-gray-400">{t('footer.newsletter.description')}</p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-grow px-4 py-2 bg-dark-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary whitespace-nowrap"
                >
                  {t('footer.newsletter.subscribe')}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {currentYear} NEOBIZE. {t('common.allRightsReserved')}.
          </p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              {t('common.privacyPolicy')}
            </Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">
              {t('common.termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
