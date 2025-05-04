import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';
import SineWave from './SineWave';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with payment processing, user authentication, and product management.",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 2,
      title: "Meeting Scheduler",
      description: "Developed a full-stack web application to efficiently schedule and manage meetings.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["React", "MongoDb", "Tailwind CSS","Vite"],
      github: "https://github.com/krishnakumar287/meeting-scheduler",
      demo: "https://demo.com"
    },
    {
      id: 3,
      title: "Fitness Tracker",
      description: "A fitness tracking application that helps users monitor workouts, nutrition, and progress over time.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["React", "MongoDb", "JavaScript"],
      github: "https://github.com/krishnakumar287/Fitness-tracker",
      demo: "https://demo.com"
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "A weather dashboard that provides real-time weather data and forecasts for locations worldwide.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1065&q=80",
      tags: ["JavaScript", "Weather API", "CSS"],
      github: "https://github.com/krishnakumar287/weather_App",
      demo: "https://krishnakumar287.github.io/weather_App/"
    },
  ];

  const [filter, setFilter] = useState<string>('all');

  const categories = ['all', 'React', 'Node.js', 'TypeScript', 'JavaScript'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));

  return (
    <section id="projects" className="section-padding bg-background-dark/50 relative" ref={ref}>
      <SineWave className="top-20 -left-32" offset={0.2} />
      <SineWave position="right" className="bottom-40 -right-32" offset={0.3} />

      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="text-primary mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            My Recent Work
          </motion.p>
          <h2 className="heading text-4xl md:text-5xl mb-4">Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>

        {/* Category Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === category ? 'bg-primary text-white' : 'bg-white/5 text-text/70 hover:bg-white/10'}`}
              onClick={() => setFilter(category)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects List */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg p-4 cursor-pointer transition-all"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: "easeInOut" }}
                whileHover={{
                  y: -10,
                  boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.4)",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  transition: { duration: 0.4, ease: "easeInOut" }
                }}
              >
                <div className="relative overflow-hidden rounded-lg aspect-video">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-opacity duration-700"
                  />
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Tags and Links appear on hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                      >
                        <Github size={18} />
                      </a>
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-200"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Content */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                    {project.title}
                  </h3>
                  <p className="text-text/70 mb-2 text-sm">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
