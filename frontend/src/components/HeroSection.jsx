import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, useRef } from 'react'

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

// Particule component
const Particle = ({ className }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const size = Math.random() * 10 + 5;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;

  return (
    <motion.div
      className={`absolute rounded-full bg-white/10 backdrop-blur-md ${className}`}
      style={{ 
        left: `${randomX}%`, 
        top: `${randomY}%`, 
        width: size, 
        height: size 
      }}
      animate={{
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        opacity: [0, 0.5, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );
};

Particle.propTypes = {
  className: PropTypes.string
};

// TypeWriter effect component
const TypeWriter = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [typingSpeed] = useState(60);
  
  // Reset state when text changes (e.g., language change)
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);
  
  useEffect(() => {
    if (isComplete) return;
    
    const timer = setTimeout(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex));
        setCurrentIndex(currentIndex + 1);
        
        // Check if typing is complete
        if (currentIndex === text.length) {
          setIsComplete(true);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, typingSpeed, isComplete]);

  return (
    <div className={className}>
      <div className="relative inline-block">
        <span>{displayText}</span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="absolute -right-2 top-0 inline-block w-1 h-8 bg-primary"
        />
      </div>
    </div>
  );
};

TypeWriter.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundImage = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069',
  badge,
  children,
  fullHeight = false
}) => {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  // Generate particles
  const particles = Array.from({ length: 15 }).map((_, index) => (
    <Particle key={index} className="z-10" />
  ));
  
  // Handle mouse movement for interactive effect
  const handleMouseMove = (e) => {
    if (sectionRef.current) {
      const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMousePosition({ x, y });
    }
  };
  
  useEffect(() => {
    controls.start({
      x: mousePosition.x * 20 - 10,
      y: mousePosition.y * 20 - 10,
      transition: { type: "spring", damping: 50 }
    });
  }, [mousePosition, controls]);
  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={`relative ${fullHeight ? 'h-screen' : 'pt-32 pb-20'} bg-midnight text-white overflow-hidden`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 via-primary/30 to-midnight/80 z-10"></div>
        
        {/* Background image with parallax effect */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center opacity-35 z-0" 
          style={{ 
            backgroundImage: `url('${backgroundImage}')`,
            y
          }}
        ></motion.div>
        
        {/* Animated shapes */}
        <motion.div 
          animate={controls}
          className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"
        ></motion.div>
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        ></motion.div>
        
        {/* Interactive particles */}
        {particles}
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {badge && (
              <motion.div 
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                className="inline-block bg-primary/10 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-white/10"
              >
                {badge}
              </motion.div>
            )}
            
            {/* Animated title with TypeWriter effect */}
            <motion.div variants={fadeIn}>
              <TypeWriter 
                text={title}
                className="text-4xl md:text-6xl font-bold mb-3 leading-tight"
              />
            </motion.div>
            
            <motion.p 
              variants={fadeIn}
              className="text-0.1xl md:text-0.1xl mb-6 text-gray-300"
            >
              {subtitle}
            </motion.p>
            
            {children && (
              <motion.div 
                variants={fadeIn}
                className="flex flex-wrap gap-4"
              >
                {Array.isArray(children) 
                  ? children.map((child, index) => (
                      <motion.div 
                        key={index}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        {child}
                      </motion.div>
                    ))
                  : <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {children}
                    </motion.div>
                }
              </motion.div>
            )}
          </motion.div>
          
          {/* Right side slot for optional content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:block relative"
          >
            {/* Animated decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
                className="w-80 h-80 border-2 border-primary/20 rounded-full"
              />
              <motion.div 
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute w-60 h-60 border-2 border-white/10 rounded-full"
              />
              <motion.div 
                animate={{ 
                  rotate: 180,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 12, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute w-40 h-40 border-2 border-primary/30 rounded-full"
              />
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator (only for full height hero) */}
        {fullHeight && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <motion.span 
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-sm text-gray-300 mb-2"
            >
              {t('common.discover')}
            </motion.span>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1 relative overflow-hidden">
              <motion.div 
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                }}
                className="w-2 h-2 bg-white rounded-full"
              />
              <motion.div 
                animate={{ 
                  y: [-20, 20],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                }}
                className="absolute w-full h-full bg-gradient-to-b from-white/0 via-white/20 to-white/0"
              />
            </div>
          </motion.div>
        )}
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
