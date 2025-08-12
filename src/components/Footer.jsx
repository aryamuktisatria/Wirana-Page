import React from 'react';
import { motion } from 'framer-motion';
import { Book, Heart } from 'lucide-react';
import '../styles/Footer.css';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="footer-container"
    >
      <div className="footer-content">
        <motion.div variants={itemVariants} className="footer-logo">
          <Book className="footer-logo-icon" />
          <span className="footer-logo-text">Wirana Page</span>
        </motion.div>
        <motion.p variants={itemVariants} className="footer-text">
          Dibuat dengan <Heart className="footer-heart-icon" /> oleh Wirana Page.
          <br />© {new Date().getFullYear()} Semua Hak Cipta Dilindungi.
        </motion.p>
        <motion.div variants={itemVariants} className="footer-links">
          <a href="#about" className="footer-link">Tentang</a>
          <a href="#features" className="footer-link">Fitur</a>
          <a href="#add-memory" className="footer-link">Tambah Kenangan</a>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
