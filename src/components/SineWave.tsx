import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

interface SineWaveProps {
  position?: 'left' | 'right' | 'top' | 'bottom' | 'diagonal';
  offset?: number;
  className?: string;
  amplitude?: number;
  frequency?: number;
  layers?: number;
  animated?: boolean;
  color?: string;
  thickness?: number;
  blur?: boolean;
}

const SineWave: React.FC<SineWaveProps> = ({ 
  position = 'left', 
  offset = 0,
  className = '',
  amplitude = 50,
  frequency = 0.02,
  layers = 3,
  animated = true,
  color = 'url(#sineGradient)',
  thickness = 2,
  blur = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  
  // Smoother spring animation
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 40,
    mass: 1.2,
    restDelta: 0.001
  });
  
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5], [0.98, 1]);

  const generatePath = (layerIndex: number) => {
    const points = [];
    const layerFrequency = frequency * (1 + layerIndex * 0.3); // Reduced frequency difference
    const layerAmplitude = amplitude * (1 - layerIndex * 0.15); // Smoother amplitude reduction
    const timeOffset = animated ? Date.now() * 0.0008 : 0; // Slower animation
    
    for (let i = 0; i <= 150; i++) { // Increased points for smoother curves
      let x, y;
      const t = i / 150;
      
      switch (position) {
        case 'top':
        case 'bottom':
          // Smoother vertical waves with multiple frequencies
          x = layerAmplitude * Math.sin(layerFrequency * t * Math.PI * 2 + timeOffset) * 
              (1 + 0.2 * Math.sin(layerFrequency * t * Math.PI * 4 + timeOffset)) + 300;
          y = t * 600;
          break;
          
        case 'diagonal':
          // Enhanced diagonal waves with varying amplitude
          x = t * 600;
          const diagonalOffset = Math.sin(t * Math.PI + timeOffset) * 0.5 + 0.5;
          y = layerAmplitude * Math.sin(layerFrequency * (x + y) * diagonalOffset + timeOffset) + t * 100;
          break;
          
        default:
          // Complex horizontal waves with smooth transitions
          const baseWave = Math.sin(layerFrequency * x + timeOffset);
          const secondWave = Math.sin(layerFrequency * 2 * x + timeOffset * 1.5) * 0.3;
          const thirdWave = Math.sin(layerFrequency * 3 * x + timeOffset * 0.7) * 0.15;
          const fourthWave = Math.cos(layerFrequency * 4 * x + timeOffset * 0.3) * 0.1;
          
          x = t * 600;
          y = layerAmplitude * (baseWave + secondWave + thirdWave + fourthWave);
      }
      
      // Add slight randomness for organic feel
      const randomness = Math.random() * 0.5;
      y += randomness;
      
      points.push(`${x},${y}`);
    }
    
    // Use cubic bezier curve for smoother path
    return `M ${points[0]} C ${points.slice(1).join(' ')}`;
  };

  const getSvgDimensions = () => {
    switch (position) {
      case 'top':
      case 'bottom':
        return { width: 600, height: 600, viewBox: '0 0 600 600' };
      case 'diagonal':
        return { width: 800, height: 300, viewBox: '0 0 800 300' };
      default:
        return { width: 600, height: 150, viewBox: '0 0 600 150' };
    }
  };

  const getTransform = () => {
    switch (position) {
      case 'right':
        return 'scaleX(-1) translateX(-100%)';
      case 'bottom':
        return 'scaleY(-1) translateY(-100%)';
      case 'diagonal':
        return 'rotate(-10deg) scale(1.2)';
      default:
        return 'none';
    }
  };

  useEffect(() => {
    if (!animated) return;
    
    let animationFrame: number;
    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;
    
    const updatePaths = (currentTime: number) => {
      if (currentTime - lastTime >= interval) {
        pathRefs.current.forEach((pathRef, index) => {
          if (pathRef) {
            pathRef.setAttribute('d', generatePath(index));
          }
        });
        lastTime = currentTime;
      }
      animationFrame = requestAnimationFrame(updatePaths);
    };
    
    animationFrame = requestAnimationFrame(updatePaths);
    return () => cancelAnimationFrame(animationFrame);
  }, [animated, amplitude, frequency, layers, position]);

  const dimensions = getSvgDimensions();

  return (
    <div 
      ref={ref} 
      className={`absolute pointer-events-none ${className}`}
      style={{ 
        filter: blur ? 'blur(20px)' : 'none',
        mixBlendMode: 'screen'
      }}
    >
      <motion.svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={dimensions.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          transform: getTransform(),
          overflow: 'visible'
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { 
          opacity: 1, 
          scale: 1,
          transition: { 
            duration: 1.5, 
            ease: [0.34, 1.56, 0.64, 1]
          }
        } : {}}
      >
        {Array.from({ length: layers }).map((_, index) => (
          <g key={index} style={{ filter: 'url(#glow)' }}>
            <motion.path
              ref={el => pathRefs.current[index] = el}
              d={generatePath(index)}
              stroke={color}
              strokeWidth={thickness * (1 - index * 0.15)}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{
                pathLength: animated ? pathLength : 1,
                opacity: animated ? opacity : 0.4 - index * 0.1,
                scale,
                transformOrigin: 'center',
                filter: `blur(${index * 0.8}px)`,
              }}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{
                duration: 2.5 + index * 0.3,
                delay: offset + index * 0.15,
                ease: "easeInOut"
              }}
            />
          </g>
        ))}
        
        <defs>
          <linearGradient id="sineGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--color-primary)">
              <animate
                attributeName="stop-color"
                values="var(--color-primary); var(--color-accent); var(--color-primary)"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="var(--color-accent)">
              <animate
                attributeName="stop-color"
                values="var(--color-accent); var(--color-primary); var(--color-accent)"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="var(--color-primary)">
              <animate
                attributeName="stop-color"
                values="var(--color-primary); var(--color-accent); var(--color-primary)"
                dur="10s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
          
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feFlood floodColor="var(--color-primary)" floodOpacity="0.15" result="glowColor"/>
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
            <feMerge>
              <feMergeNode in="softGlow"/>
              <feMergeNode in="softGlow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </motion.svg>
    </div>
  );
};

export default SineWave;