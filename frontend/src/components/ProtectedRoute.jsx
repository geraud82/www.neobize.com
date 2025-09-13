import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated, hasToken } from '../services/api'

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null) // null = loading, true = authenticated, false = not authenticated
  
  useEffect(() => {
    // Vérifier l'authentification
    const checkAuth = async () => {
      try {
        // First check if we have a token locally
        if (!hasToken()) {
          setIsAuth(false)
          return
        }
        
        // Then verify with the server
        const authenticated = await isAuthenticated()
        setIsAuth(authenticated)
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error)
        
        // If there's a network error but we have a token, allow access for development
        if (hasToken() && (error.message.includes('fetch') || error.message.includes('network'))) {
          console.warn('Backend unavailable, allowing access with local token for development')
          setIsAuth(true)
        } else {
          setIsAuth(false)
        }
      }
    }
    
    checkAuth()
  }, [])
  
  // Afficher un loader pendant la vérification
  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-midnight flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }
  
  // Si non authentifié, rediriger vers la page de login
  if (!isAuth) {
    return <Navigate to="/admin/login" replace />
  }
  
  // Si authentifié, afficher le contenu protégé
  return children
}

export default ProtectedRoute
