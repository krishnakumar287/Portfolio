import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FileJson, 
  Layers, 
  Database, 
  Server, 
  Figma, 
  GitBranch, 
  Globe, 
  Palette, 
  Zap, 
  LayoutGrid, 
  Boxes, 
  Braces, 
  Webhook
} from 'lucide-react';
import SineWave from './SineWave';

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const frontendSkills: Skill[] = [
    { name: 'HTML/CSS', icon: <Globe size={32} />, color: '#E34F26' },
    { name: 'JavaScript', icon: <FileJson size={32} />, color: '#F7DF1E' },
    { name: 'React', icon: <Layers size={32} />, color: '#61DAFB' },
    { name: 'TypeScript', icon: <Braces size={32} />, color: '#3178C6' },
    { name: 'Tailwind CSS', icon: <Palette size={32} />, color: '#38B2AC' },
    { name: 'Next.js', icon: <LayoutGrid size={32} />, color: '#000000' },
  ];

  const backendSkills: Skill[] = [
    { name: 'Node.js', icon: <Server size={32} />, color: '#339933' },
    { name: 'Express', icon: <Webhook size={32} />, color: '#000000' },
    { name: 'MongoDB', icon: <Database size={32} />, color: '#47A248' },
    { name: 'Firebase', icon: <Zap size={32} />, color: '#FFCA28' },
  ];

  const otherSkills = [
    { name: 'Git', icon: <GitBranch size={32} />, color: '#F05032' },
    { name: 'AWS', icon: <Server size={32} />, color: '#FF9900' },
    { name: 'Figma', icon: <Figma size={32} />, color: '#F24E1E' },
  ];

  // Random floating animation for each icon
  const getRandomFloatingAnimation = (index: number) => {
    const randomDuration = 3 + Math.random() * 4; // Between 3-7 seconds
    const randomDelay = Math.random() * 2; // Random delay up to 2 seconds
    const randomY = 10 + Math.random() * 15; // Random float distance between 10-25px
    const randomRotate = Math.random() > 0.5 ? [0, 5, 0] : [0, -5, 0]; // Random rotation direction
    
    return {
      y: [0, -randomY, 0],
      rotate: randomRotate,
      transition: {
        duration: randomDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: randomDelay,
      }
    };
  };

  // Staggered appearance animation for container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Animation for each skill item
  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      } 
    },
  };

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <SineWave className="top-32 -left-32" offset={0.1} />
      <SineWave position="right" className="top-64 -right-32" offset={0.2} />
      <SineWave className="bottom-32 -left-32" offset={0.3} />

      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="text-primary mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            What I Can Do
          </motion.p>
          <h2 className="heading text-4xl md:text-5xl mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>

        {/* Frontend Skills */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Frontend Development
          </h3>
          
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8"
          >
            {frontendSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full glass-card flex items-center justify-center mb-4"
                  style={{ 
                    background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 70%)`,
                    boxShadow: `0 0 20px rgba(${skill.color}, 0.3)` 
                  }}
                  animate={getRandomFloatingAnimation(index)}
                >
                  <div className="text-primary">
                    {skill.icon}
                  </div>
                </motion.div>
                <p className="font-medium text-center text-sm sm:text-base">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Backend Skills */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Backend Development
          </h3>
          
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {backendSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  className="w-20 h-20 rounded-full glass-card flex items-center justify-center mb-4"
                  style={{ 
                    background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 70%)`,
                    boxShadow: `0 0 20px rgba(${skill.color}, 0.3)` 
                  }}
                  animate={getRandomFloatingAnimation(index + 6)}
                >
                  <div className="text-accent">
                    {skill.icon}
                  </div>
                </motion.div>
                <p className="font-medium text-center">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Other Skills */}
        <motion.div 
          className="glass-card p-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Other Skills & Tools
          </h3>
          
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
          >
            {otherSkills.map((skill, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                <motion.div 
                  className="w-16 h-16 rounded-full glass-card flex items-center justify-center mb-3"
                  style={{ 
                    background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 70%)`,
                  }}
                  animate={getRandomFloatingAnimation(index + 12)}
                >
                  <div className="text-white/80">
                    {skill.icon}
                  </div>
                </motion.div>
                <p className="text-sm font-medium text-center">{skill.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;