import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'AWRAD Regional', path: '/regional' },
    { name: t('publications'), path: '/publications' },
    { name: 'Activities', path: '/activities' },
    { name: t('partners_clients.title'), path: '/partners-clients' },
    { name: 'Community Role', path: '/community-role' },
    { name: t('team'), path: '/team' },
    { name: t('contact'), path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ease-in-out ${
        isScrolled ? 'shadow-md py-0' : 'shadow-lg py-2'
      }`} 
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex items-center transition-all duration-300 ${
          isScrolled ? 'h-14' : 'h-18'
        }`}>
          {/* Menu Toggle - Left */}
          <motion.div
            className="flex-1 flex justify-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className={`h-9 w-9 p-0 transition-all duration-300 ${
                isScrolled ? 'scale-90' : 'scale-100'
              }`}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? (
                <X className={`transition-all duration-300 ${
                  isScrolled ? 'h-4 w-4' : 'h-5 w-5'
                }`} />
              ) : (
                <Menu className={`transition-all duration-300 ${
                  isScrolled ? 'h-4 w-4' : 'h-5 w-5'
                }`} />
              )}
            </Button>
          </motion.div>

          {/* Logo - Center */}
          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/48e6b7fb-a2b2-4aa7-ba87-8c575bbe0b92.png" 
                alt="AWRAD Logo" 
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-9 md:h-11' : 'h-12 md:h-14'
                }`}
                style={{ filter: 'brightness(0) invert(0)' }}
              />
            </Link>
          </motion.div>

          {/* Language Toggle - Right */}
          <motion.div 
            className="flex-1 flex justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`transition-all duration-300 ${
              isScrolled ? 'scale-90' : 'scale-100'
            }`}>
              <LanguageToggle />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            className="bg-white shadow-inner overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto flex flex-col space-y-4 py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={item.path}
                    className={`py-2 text-base font-medium transition-colors hover:text-awrad-blue ${
                      location.pathname === item.path
                        ? 'text-awrad-blue font-semibold'
                        : 'text-awrad-gray'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
