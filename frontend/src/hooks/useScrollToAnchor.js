import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useScrollToAnchor = () => {
  const location = useLocation()

  useEffect(() => {
    // Vérifier s'il y a un hash dans l'URL
    if (location.hash) {
      // Attendre un court délai pour que la page soit complètement rendue
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.substring(1))
        if (element) {
          // Calculer la position en tenant compte du header fixe (s'il y en a un)
          const headerOffset = 80 // Ajustez cette valeur selon la hauteur de votre header
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)

      return () => clearTimeout(timer)
    } else {
      // Si pas d'ancre, défiler vers le haut de la page
      window.scrollTo(0, 0)
    }
  }, [location])
}

export default useScrollToAnchor
