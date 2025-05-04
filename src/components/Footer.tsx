import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={20} />, href: 'https://github.com/krishnakumar287' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/krishnakumar-s2005/' },
  ];

  return (
    <footer className="bg-background-dark py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.a
            href="#home"
            className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-6 md:mb-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            Portfolio
          </motion.a>
          
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text/70 hover:text-primary transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
          
          <motion.p 
            className="text-text/50 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © {currentYear} Krishnakumar. All rights reserved. Made with{' '}
            <Heart size={14} className="inline text-primary" /> using React.
          </motion.p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <ul className="flex flex-wrap justify-center gap-6 mb-4">
            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
              <li key={index}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="text-text/70 hover:text-primary transition-colors text-sm"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          
          <p className="text-text/50 text-xs">
            Designed and developed with modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;