import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

// Sections
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';
import Problems from './components/sections/Problems';
import Features from './components/sections/Features';
import Values from './components/sections/Values';
import Steps from './components/sections/Steps';
import Audience from './components/sections/Audience';
import CTA from './components/sections/CTA';
import Footer from './components/sections/Footer';

// UI Components
import LoginModal from './components/ui/LoginModal';

type ThemeMode = 'light' | 'dark';

export default function Home() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Login States
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return window.localStorage.getItem('hirevision-logged-in') === 'true';
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    window.localStorage.setItem('hirevision-logged-in', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.localStorage.setItem('hirevision-logged-in', 'false');
  };

  // Scroll Progress logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('hirevision-theme') as ThemeMode | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextTheme = storedTheme ?? (systemPrefersDark ? 'dark' : 'light');

    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('hirevision-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-[#030712] dark:text-slate-100 bg-cyber-grid">
      
      {/* Page scroll progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-primary-purple origin-left z-55"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <Navbar 
        theme={theme} 
        setTheme={setTheme} 
        isScrolled={isScrolled} 
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        setShowLoginModal={setShowLoginModal}
      />

      {/* Sections */}
      <main>
        <Hero isLoggedIn={isLoggedIn} setIsLoggedIn={handleLoginSuccess} />
        <Problems />
        <Features />
        <Values />
        <Steps />
        <Audience />
        <CTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Back to Top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-lg backdrop-blur-md transition hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Quay lại đầu trang"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
