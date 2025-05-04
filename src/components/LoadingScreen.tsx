import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface LoadingScreenProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, setIsLoading }) => {
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // Animation for the logo parts
  const logoVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      }
    }
  };

  // Animation for the text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Animation for the container exit
  const containerVariants = {
    exit: {
      y: "-100vh",
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  // Dots loading animation
  const dotsVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0.2, 1, 0.2],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      }
    }
  };

  const dotTransition = (delay: number) => ({
    delay,
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
    times: [0, 0.5, 1]
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background-dark"
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      <div className="relative w-32 h-32 mb-8">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="none"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          />
          
          {/* Code bracket left */}
          <motion.path
            d="M35,30 L25,50 L35,70"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3, duration: 1.2 }}
          />
          
          {/* Code bracket right */}
          <motion.path
            d="M65,30 L75,50 L65,70"
            stroke="url(#gradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6, duration: 1.2 }}
          />
          
          {/* Define gradient */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00AEEF" />
              <stop offset="100%" stopColor="#A96BFF" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Pulsing inner circle */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm" />
        </motion.div>
      </div>
      
      <motion.h2
        className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Krishna
      </motion.h2>
      
      <motion.p
        className="text-lg text-text/80 mb-6"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        Creative Developer
      </motion.p>
      
      <div className="flex space-x-2">
        <motion.div
          className="w-3 h-3 rounded-full bg-primary"
          variants={dotsVariants}
          initial="initial"
          animate="animate"
          transition={dotTransition(0)}
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-primary/80"
          variants={dotsVariants}
          initial="initial"
          animate="animate"
          transition={dotTransition(0.2)}
        />
        <motion.div
          className="w-3 h-3 rounded-full bg-accent"
          variants={dotsVariants}
          initial="initial"
          animate="animate"
          transition={dotTransition(0.4)}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;