import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Sparkles, ArrowRight, Mail, Camera, MapPin, Coffee, Cloud, Star } from 'lucide-react';
import '../styles/AboutUs.css';

const AboutUs = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: "easeOut", staggerChildren: 0.2 } 
    }
  };

  const floatVariants = {
    animate: { 
      y: [0, -5, 0],
      transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const startDate = new Date(2023, 4, 25);
  const diffDays = Math.ceil(Math.abs(new Date() - startDate) / (1000 * 60 * 60 * 24));

  // Parallax mouse tracking
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Ikon background samar
  const bgIcons = [
    { icon: <Heart />, size: 40, x: '10%', y: '20%' },
    { icon: <Coffee />, size: 30, x: '70%', y: '30%' },
    { icon: <Cloud />, size: 50, x: '20%', y: '70%' },
    { icon: <Star />, size: 35, x: '80%', y: '60%' },
    { icon: <Camera />, size: 45, x: '50%', y: '80%' },
  ];

  return (
    <section id="about-us" className="about-us-container">
      {/* Ikon Samar Bergerak */}
      <div className="about-us-bg-icons">
        {bgIcons.map((item, index) => (
          <motion.div
            key={index}
            className="bg-icon"
            style={{
              left: item.x,
              top: item.y,
              fontSize: item.size,
              transform: `translate(${mousePos.x * 0.01}px, ${mousePos.y * 0.01}px)`
            }}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 6 + index, ease: "easeInOut" }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Gambar */}
      <motion.div 
        className="about-us-image-wrapper"
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img src="/about-us.jpg" alt="Kita" className="about-us-image" />
        <div className="subtle-overlay"></div>
      </motion.div>

      {/* Konten */}
      <motion.div 
        className="about-us-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="about-us-header" variants={fadeInUp}>
          <motion.div className="about-us-icon-wrapper" variants={floatVariants} animate="animate">
            <Heart className="about-us-icon" />
            <Sparkles className="about-us-sparkles-icon" />
          </motion.div>
          <h2 className="about-us-title">Cerita Kita</h2>
          <p className="about-us-subtitle">
            Bersama sejak 25 Mei 2023 — {diffDays} hari penuh momen kecil yang berarti.
          </p>
        </motion.div>

        <motion.div className="about-us-card" variants={fadeInUp}>
          <Calendar className="about-us-card-icon" />
          <h3 className="about-us-card-title">Awal Bertemu</h3>
          <p className="about-us-card-description">
            Kita bertemu tanpa rencana besar. Hanya dua orang yang akhirnya menemukan kenyamanan di satu sama lain.
          </p>
        </motion.div>

        <motion.div className="about-us-card" variants={fadeInUp}>
          <Camera className="about-us-card-icon" />
          <h3 className="about-us-card-title">Kenangan</h3>
          <p className="about-us-card-description">
            Foto-foto sederhana, candaan random, dan momen tanpa kamera — semuanya membentuk cerita kita.
          </p>
          <div className="memory-highlights">
            {["Ngopi bareng", "Jalan sore", "Tertawa di tengah hujan", "Perjalanan spontan"].map((item, index) => (
              <motion.span key={index} className="highlight-item" whileHover={{ scale: 1.05 }}>
                <ArrowRight className="highlight-icon" /> {item}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div className="about-us-card" variants={fadeInUp}>
          <MapPin className="about-us-card-icon" />
          <h3 className="about-us-card-title">Perjalanan</h3>
          <p className="about-us-card-description">
            Dari tempat yang dekat sampai tujuan tak terduga, semua terasa istimewa selama kita bersama.
          </p>
        </motion.div>

        <motion.div className="about-us-cta" variants={fadeInUp}>
          <p className="about-us-cta-text">Mau tambahin cerita baru?</p>
          <motion.a 
            whileHover={{ scale: 1.05, backgroundColor: "#3d5a80" }}
            whileTap={{ scale: 0.95 }}
            href="mailto:rio181.keysa199@gmail.com"
            className="about-us-cta-button"
          >
            <Mail className="cta-icon" /> Kirim Cerita
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
