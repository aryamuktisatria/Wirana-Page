// src/components/LanguageCarousel.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaReact 
} from 'react-icons/fa';
import { 
  SiFirebase, 
  SiVercel,
  SiVite 
} from 'react-icons/si';
import { Heart } from 'lucide-react';
import '../styles/LanguageCarousel.css';

const languages = [
{ name: 'HTML5', icon: <FaHtml5 /> },
{ name: 'CSS3', icon: <FaCss3Alt /> },
{ name: 'React.js', icon: <FaReact /> },
{ name: 'Vite', icon: <SiVite /> },
{ name: 'Firebase', icon: <SiFirebase /> }, // Perubahan di sini
{ name: 'Vercel', icon: <SiVercel /> },
];

const LanguageCarousel = () => {
  const containerVariants = {
    animate: {
      x: ["0%", "-100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 60, // ✨ Diubah menjadi 60 detik (2x lebih lambat)
          ease: "linear",
        },
      },
    },
  };

  return (
    <section id="language-carousel" className="language-carousel-section">
      <div className="language-carousel-header">
        <h2 className="language-carousel-title">
          <span>Dibangun dengan Cinta dan Teknologi Modern</span>
        </h2>
        <p className="language-carousel-subtitle">
          Situs ini dirancang menggunakan teknologi terdepan untuk memastikan pengalaman yang mulus dan cepat.
        </p>
      </div>
      
      <div className="carousel-wrapper">
        <motion.div
          className="carousel-track"
          variants={containerVariants}
          animate="animate"
          whileHover={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 120, // ✨ Diubah menjadi 120 detik (2x lebih lambat)
              ease: "linear",
            },
          }}
        >
          {/* ✨ Menggandakan item untuk ilusi non-stop */}
          {[...languages, ...languages, ...languages, ...languages, ...languages].map((lang, index) => (
            <motion.div
              key={index}
              className="carousel-item"
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)"
              }}
            >
              <div className="item-icon-wrapper">
                <motion.div 
                  className="item-icon"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 3 + Math.random(),
                    repeat: Infinity,
                    repeatType: "yoyo"
                  }}
                >
                  {lang.icon}
                </motion.div>
              </div>
              <p className="item-name">{lang.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <div className="language-carousel-footer">
        <motion.div
          whileHover={{ rotate: 10, scale: 1.1 }}
          className="footer-heart"
        >
          <Heart />
        </motion.div>
        <p>Dirancang untuk <span className="footer-name">Aryamukti & Keysa</span></p> {/* ✨ Menambahkan span dengan kelas baru */}
      </div>
    </section>
  );
};

export default LanguageCarousel;