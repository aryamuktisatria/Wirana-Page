// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, Menu, X, Sparkles, Home, Info, 
  Lightbulb, PlusCircle, Users, BookMarked, LogOut 
} from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
  const updateAuthStatus = () => {
    setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
  };

  // Untuk perubahan dari tab yang sama & beda tab
  window.addEventListener('authChange', updateAuthStatus);
  window.addEventListener('storage', updateAuthStatus);

  return () => {
    window.removeEventListener('authChange', updateAuthStatus);
    window.removeEventListener('storage', updateAuthStatus);
  };
}, []);


  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('lastActivity');
    window.dispatchEvent(new Event('storage'));
    setShowLogoutConfirm(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, color: '#3b82f6' },
    { id: 'about', label: 'About', icon: Info, color: '#8b5cf6' },
    { id: 'features', label: 'Features', icon: Lightbulb, color: '#f97316' },
    { id: 'add-memory', label: 'Add Memory', icon: PlusCircle, color: '#10b981' },
    { id: 'about-us', label: 'About Us', icon: Users, color: '#ef4444' }
  ];

  const menuVariants = {
    hidden: { opacity: 0, x: '100vw' },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 70,
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const ctaButtonVariants = {
    hidden: { x: 50, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        delay: 1.5,
      },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="navbar-container">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="navbar-logo"
          onClick={() => scrollToSection('home')}
        >
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="navbar-logo-icon-wrapper"
          >
            <Book className="navbar-logo-icon" />
            <Sparkles className="navbar-sparkles-icon" />
          </motion.div>
          <span className="navbar-title">
            Wirana Page
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="navbar-desktop-menu-wrapper">
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            className="navbar-desktop-menu"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                variants={itemVariants}
                onClick={() => scrollToSection(item.id)}
                className={`navbar-item ${activeSection === item.id ? 'active' : ''}`}
              >
                <motion.div
                  className="navbar-item-icon"
                  style={{ color: item.color }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon className="icon-main" />
                </motion.div>
                <span className="navbar-item-label">{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
          
          {/* Scrapbook Button with Logout */}
          <motion.div 
            variants={ctaButtonVariants}
            initial="hidden"
            animate="visible"
            className="navbar-cta-wrapper"
          >
            <motion.button 
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('scrapbook')}
              className="navbar-cta-button"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="button-icon-wrapper"
              >
                <BookMarked className="button-icon" />
              </motion.div>
              <span>My Scrapbook</span>
            </motion.button>

            {isAuthenticated && (
              <motion.div 
                className="logout-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowLogoutConfirm(true)}
                  className="logout-button"
                >
                  <LogOut className="logout-icon" />
                </motion.button>

                <AnimatePresence>
  {showLogoutConfirm && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="logout-confirm"
    >
      <div className="logout-header">
        <LogOut className="logout-icon-popup" />
        <p>Yakin ingin keluar?</p>
      </div>
      <div className="confirm-buttons">
        <button onClick={handleLogout} className="confirm-yes">
          <LogOut size={14} /> Ya
        </button>
        <button onClick={() => setShowLogoutConfirm(false)} className="confirm-no">
          <X size={14} /> Tidak
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>

              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="navbar-mobile-button">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="navbar-menu-icon"
          >
            {isMobileMenuOpen ? <X className="icon-main" /> : <Menu className="icon-main" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="navbar-mobile-menu"
          >
            <div className="navbar-mobile-list">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 10 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`navbar-mobile-item ${activeSection === item.id ? 'active' : ''}`}
                >
                  <item.icon className="icon-main" style={{ color: item.color }} />
                  <span className="navbar-mobile-item-label">{item.label}</span>
                </motion.button>
              ))}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => scrollToSection('scrapbook')}
                className="navbar-mobile-cta"
              >
                <BookMarked className="button-icon" />
                <span>My Scrapbook</span>
              </motion.button>

              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowLogoutConfirm(true)}
                  className="navbar-mobile-logout"
                >
                  <LogOut className="button-icon" />
                  <span>Logout</span>
                </motion.button>
              )}

              <AnimatePresence>
                {showLogoutConfirm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mobile-logout-confirm"
                  >
                    <p>Yakin ingin keluar?</p>
                    <div className="confirm-buttons">
                      <button 
                        onClick={handleLogout}
                        className="confirm-yes"
                      >
                        Ya
                      </button>
                      <button 
                        onClick={() => setShowLogoutConfirm(false)}
                        className="confirm-no"
                      >
                        Tidak
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;