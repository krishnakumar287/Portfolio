import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Code, BookOpen } from 'lucide-react';
import AnimatedText from './AnimatedText';
import heroImage from './hero.jpg';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: <GraduationCap size={20} />, value: 'Pre Final Year', label: 'IT Undergraduate' },
    { icon: <Code size={20} />, value: '5+', label: 'Projects Completed' },
    { icon: <BookOpen size={20} />, value: '2+', label: 'Internships & Courses' },
  ];

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.p
            className="text-primary mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Get To Know
          </motion.p>
          <h2 className="heading text-4xl md:text-5xl mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="About Me"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-primary"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-accent"></div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-4 sm:p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex justify-center mb-2 sm:mb-3 text-primary">
                    {stat.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-1">{stat.value}</h3>
                  <p className="text-text/70 text-xs sm:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <AnimatedText
              text="I'm a motivated Computer Science undergraduate with a strong interest in web and software development."
              className="text-xl mb-4"
              once
            />

            <p className="text-text/70 mb-6">
              Currently in my pre final year of studies, I have a keen interest in building dynamic and user-friendly applications.
              Through coursework, internships, and personal projects, I've gained hands-on experience in full-stack development.
            </p>

            <p className="text-text/70 mb-8">
              I love learning new technologies, solving problems, and collaborating with others to create impactful solutions.
              Outside of coding, I enjoy participating in hackathons, exploring UI/UX design, and engaging with the developer community.
            </p>

            {/* Resume Download Button */}
           
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
