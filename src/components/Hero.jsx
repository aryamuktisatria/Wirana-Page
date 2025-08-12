// src/components/Hero.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Star, Sparkles, ChevronDown } from 'lucide-react';
import '../styles/Hero.css';

const Hero = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate time from May 25, 2023
  useEffect(() => {
    const calculateTime = () => {
      const startDate = new Date('2023-05-25T00:00:00');
      const now = new Date();
      const diff = now - startDate;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Mengurangi delay untuk loading lebih cepat
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6, // Mengurangi durasi animasi
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [-5, 5, -5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const scrollToNext = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      {/* Background Elements */}
      <div className="hero-background-elements">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="bg-shape shape-1"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="bg-shape shape-2"
        />
        <motion.div 
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="bg-shape shape-3"
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-container"
      >
        {/* Main Title */}
        <motion.div variants={itemVariants} className="hero-title-section">
          <motion.div
            animate={floatingAnimation}
            className="hero-subtitle"
          >
            <Star className="hero-star-icon" />
            <span className="hero-welcome-text">✨ Welcome to Our Digital Memory Book</span>
            <Heart className="hero-heart-icon" />
          </motion.div>
          
          <h1 className="hero-main-title">
            <motion.span 
              className="hero-gradient-text-1"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Memory
            </motion.span>
            <br />
            <motion.span 
              className="hero-gradient-text-2"
              animate={{ 
                backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              Scrapbook
            </motion.span>
          </h1>
          
          <motion.p 
            variants={itemVariants}
            className="hero-description"
          >
            Menyimpan setiap momen berharga dalam perjalanan hidup kita dengan indah dan elegan. 
            <span className="text-blue"> Kenangan yang tak terlupakan, </span>
            <span className="text-orange">terekam selamanya.</span>
          </motion.p>
        </motion.div>

        {/* Time Counter */}
        <motion.div variants={itemVariants} className="hero-time-counter">
          <div className="counter-card-wrapper">
            <motion.div 
              whileHover={{ scale: 1.02, y: -5 }}
              className="counter-card"
            >
              <motion.h2 
                variants={itemVariants}
                className="counter-title"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="clock-icon"
                >
                  <Clock className="icon" />
                </motion.div>
                Perjalanan Dimulai dari 
                <span className="counter-start-date">25 Mei 2023</span>
              </motion.h2>
              
              <div className="counter-grid">
                {[
                  { label: 'Tahun', value: timeElapsed.years, color: 'blue', icon: '📅' },
                  { label: 'Bulan', value: timeElapsed.months, color: 'purple', icon: '🗓️' },
                  { label: 'Hari', value: timeElapsed.days, color: 'pink', icon: '📆' },
                  { label: 'Jam', value: timeElapsed.hours, color: 'orange', icon: '🕐' },
                  { label: 'Menit', value: timeElapsed.minutes, color: 'yellow', icon: '⏰' },
                  { label: 'Detik', value: timeElapsed.seconds, color: 'green', icon: '⚡' }
                ].map((item, index) => (
                  <motion.div 
                    key={item.label}
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }} // Mengurangi delay
                    whileHover={{ 
                      scale: 1.05, // Mengurangi scale up sedikit
                      y: -5, // Mengurangi pergeseran y
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                    }}
                    className={`counter-item ${item.color}`}
                  >
                    <div className="counter-icon-emoji">{item.icon}</div>
                    <motion.div 
                      className="counter-value"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {item.value}
                    </motion.div>
                    <div className="counter-label">{item.label}</div>
                    
                    {/* Sparkle effect */}
                    <motion.div
                      className="sparkle-overlay"
                      animate={{ 
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="sparkle-icon" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="hero-cta-section">
          <div className="hero-cta-buttons">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('add-memory')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-cta-button primary"
            >
              <Star className="button-icon" />
              <span>Mulai Menyimpan Kenangan</span>
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('scrapbook')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-cta-button secondary"
            >
              <Heart className="button-icon" />
              <span>Lihat Scrapbook</span>
            </motion.button>
          </div>
          
          <motion.p className="hero-cta-caption">
            Tulis memori kita bersama disini
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          variants={itemVariants}
          className="scroll-indicator"
        >
          <motion.button
            onClick={scrollToNext}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="scroll-button"
          >
            <ChevronDown className="icon" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;