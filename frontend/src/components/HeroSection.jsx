import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'

const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundImage = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069',
  badge,
  children,
  fullHeight = false
}) => {
  const { t } = useTranslation();

  // Array of company activity images
  const companyImages = [
    { src: '/images/web-saas.jpg', alt: 'Web development and SaaS solutions' },
    { src: '/images/web-mobileapp.jpg', alt: 'Mobile application development' },
    { src: '/images/web-cons.jpg', alt: 'Web consulting services' },
    { src: '/images/web-trans.jpg', alt: 'Digital transformation' },
    { src: '/images/web-histo.jpg', alt: 'Technology history and innovation' },
    { src: '/images/web-imag.jpg', alt: 'Digital imaging solutions' }
  ];

  // State for current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % companyImages.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [companyImages.length]);

  return (
    <section 
      className={`relative ${fullHeight ? 'min-h-[70vh] pt-32 pb-16' : 'pt-32 pb-16'} text-white overflow-hidden`}
      style={{ backgroundColor: '#000000' }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40" 
          style={{ 
            backgroundImage: `url('${backgroundImage}')`
          }}
        ></div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-20 h-full flex flex-col justify-center">
        <div className={`grid grid-cols-1 ${fullHeight ? 'lg:grid-cols-2' : ''} gap-8 lg:gap-20 items-center ${!fullHeight ? 'justify-center text-center' : ''}`}>
          <div className={`max-w-3xl ${!fullHeight ? 'mx-auto' : ''}`}>
            {badge && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-blue-500/20 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm border border-blue-400/30 shadow-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                {badge}
              </div>
            )}
            
            {/* Enhanced Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              {title}
            </h1>
            
            {/* Enhanced Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 leading-relaxed font-light tracking-wide">
              {subtitle}
            </p>
            
            {children && (
              <div className="mb-8">
                {children}
              </div>
            )}
            
            {/* Mobile Image - Show below buttons on mobile */}
            {fullHeight && (
              <div className="block lg:hidden mt-8">
                <div className="relative w-full max-w-md mx-auto px-4">
                  {/* Enhanced decorative border frame for mobile */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 rounded-2xl blur-md"></div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-2xl"></div>
                  
                  {/* Main image container with carousel for mobile - responsive height */}
                  <div className="relative overflow-hidden rounded-2xl border-2 border-white/20 shadow-xl h-[200px] xs:h-[220px] sm:h-[280px] md:h-[320px]">
                    {companyImages.map((image, index) => (
                      <img 
                        key={index}
                        src={image.src} 
                        alt={image.alt} 
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                          index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ transitionDuration: '1000ms' }}
                      />
                    ))}
                    {/* Sophisticated overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-black/60 z-10"></div>
                    
                    {/* Image indicators for mobile */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-20">
                      {companyImages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-white scale-125' 
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Right side - Hero Image (only show on desktop) */}
          {fullHeight && (
            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Enhanced decorative border frame */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 rounded-3xl blur-lg"></div>
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-3xl"></div>
                
                {/* Main image container with carousel */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-white/20 shadow-2xl h-[400px]">
                  {companyImages.map((image, index) => (
                    <img 
                      key={index}
                      src={image.src} 
                      alt={image.alt} 
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out transform hover:scale-105 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ transitionDuration: '1000ms' }}
                    />
                  ))}
                  {/* Sophisticated overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-black/60 z-10"></div>
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10"></div>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                    {companyImages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
              </div>
            </div>
          )}
        </div>
        
      </div>
    </section>
  )
}

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  badge: PropTypes.string,
  children: PropTypes.node,
  fullHeight: PropTypes.bool
}

export default HeroSection
