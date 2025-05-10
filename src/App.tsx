import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ParticleField from './components/ParticleField';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Handle page load and transitions
    if (isLoading) {
      document.body.classList.add('overflow-hidden');
    } else {
      // Add a small delay before showing content to ensure smooth transition
      const timer = setTimeout(() => {
        document.body.classList.remove('overflow-hidden');
        setContentReady(true);
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <>
      <LoadingScreen isLoading={isLoading} setIsLoading={setIsLoading} />
      
      {/* Only render content after loading is complete and transition has finished */}
      {(contentReady || !isLoading) && (
        <div className="app-container bg-background-dark text-text">
          <ParticleField />
          <Navbar />
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
          <Footer />
          <ScrollToTop />
        </div>
      )}
    </>
  );
}

export default App;