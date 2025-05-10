import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, setIsLoading }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Prevent body scrolling during loading
    document.body.classList.add('overflow-hidden');
    
    // Set a timeout to remove loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Small delay before enabling scroll again
      setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
      }, 100);
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('overflow-hidden');
      window.removeEventListener('resize', checkMobile);
    };
  }, [setIsLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <>
          {/* Mobile Loading Screen */}
          {isMobile && (
            <motion.div
              className="fixed inset-0 z-50 bg-background-dark flex flex-col items-center justify-center md:hidden"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { 
                  duration: 0.5,
                  ease: "easeInOut"
                }
              }}
            >
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className="text-4xl font-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Krishna
                </motion.h1>
                
                <div className="relative w-64 h-2 bg-white/10 overflow-hidden rounded-full">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
                
                <motion.p 
                  className="mt-4 text-text/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Loading portfolio...
                </motion.p>
              </motion.div>
            </motion.div>
          )}

          {/* Desktop Loading Screen - Your original loading screen */}
          {!isMobile && (
            <motion.div
              className="fixed inset-0 z-50 bg-background-dark hidden md:flex flex-col items-center justify-center"
              initial={{ opacity: 1 }}
              exit={{ 
                opacity: 0,
                transition: { 
                  duration: 0.5,
                  ease: "easeInOut"
                }
              }}
            >
              {/* Your original desktop loading screen content */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0,
                    transition: { 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 20,
                      duration: 0.8
                    }
                  }}
                  className="mb-8"
                >
                  {/* Fancy logo animation for desktop */}
                  <div className="w-40 h-40 mx-auto relative">
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-20"
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                      }}
                    />
                    <div className="w-full h-full rounded-full bg-background-dark flex items-center justify-center border-4 border-primary">
                      <h1 className="text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">K</h1>
                    </div>
                  </div>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-6xl font-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Krishna
                </motion.h1>
                
                <div className="relative w-80 h-2 bg-white/10 overflow-hidden rounded-full mx-auto">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
                
                <motion.p 
                  className="mt-6 text-text/70 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Welcome to my digital portfolio
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;