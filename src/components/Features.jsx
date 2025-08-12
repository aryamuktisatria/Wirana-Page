// src/components/Features.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Calendar, 
  FileText, 
  Heart, 
  Search, 
  Share2, 
  Download,
  Lock,
  Smartphone,
  Palette,
  Cloud,
  Zap,
  Star,
  Sparkles,
  MessageSquare,
  Gift
} from 'lucide-react';
import '../styles/Features.css';

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const features = [
    {
      icon: <Camera />,
      title: "Galeri Foto & Video",
      description: "Upload semua momen spesial Anda, baik foto maupun video, dengan mudah.",
      gradientClass: "gradient-blue-cyan",
    },
    {
      icon: <Calendar />,
      title: "Timeline Otomatis",
      description: "Kenangan Anda akan tersusun rapi secara otomatis berdasarkan tanggal.",
      gradientClass: "gradient-purple-pink",
    },
    {
      icon: <FileText />,
      title: "Cerita & Deskripsi",
      description: "Tambahkan cerita, deskripsi, atau pesan romantis untuk setiap momen.",
      gradientClass: "gradient-orange-red",
    },
    {
      icon: <Heart />,
      title: "Momen Favorit",
      description: "Tandai momen-momen paling berharga agar mudah ditemukan kembali.",
      gradientClass: "gradient-pink-rose",
    },
    {
      icon: <Search />,
      title: "Pencarian Cerdas",
      description: "Temukan kenangan dengan cepat menggunakan kata kunci, tanggal, atau tag.",
      gradientClass: "gradient-green-emerald",
    },
    {
      icon: <Share2 />,
      title: "Berbagi Kenangan",
      description: "Bagikan kenangan indah ini dengan orang-orang terdekat yang Anda undang.",
      gradientClass: "gradient-indigo-purple",
    },
    {
      icon: <Lock />,
      title: "Privasi Terjamin",
      description: "Kendalikan penuh siapa saja yang dapat melihat dan mengakses kenangan Anda.",
      gradientClass: "gradient-gray-slate",
    },
    {
      icon: <Download />,
      title: "Ekspor Data",
      description: "Unduh dan simpan salinan semua data Anda kapan pun diperlukan.",
      gradientClass: "gradient-teal-cyan",
    },
    {
      icon: <Smartphone />,
      title: "Akses Multi-Perangkat",
      description: "Nikmati semua fitur dengan tampilan optimal di ponsel, tablet, dan desktop.",
      gradientClass: "gradient-violet-indigo",
    },
    {
      icon: <Palette />,
      title: "Kustomisasi Tampilan",
      description: "Personalisasi tampilan Wirana Page agar sesuai dengan selera Anda berdua.",
      gradientClass: "gradient-yellow-orange",
    },
    {
      icon: <Cloud />,
      title: "Penyimpanan Cloud",
      description: "Semua kenangan tersimpan aman di cloud, bebas dari risiko hilang.",
      gradientClass: "gradient-sky-blue",
    },
    {
      icon: <Zap />,
      title: "Performa Super Cepat",
      description: "Rasakan pengalaman yang mulus dan cepat, tanpa jeda yang mengganggu.",
      gradientClass: "gradient-amber-yellow",
    }
  ];

  const bgIcons = [
    { icon: <Heart size={50} />, top: '10%', left: '5%', animation: { rotate: [0, -10, 10, 0] } },
    { icon: <Star size={40} />, top: '80%', left: '15%', animation: { y: [0, 10, -10, 0] } },
    { icon: <Sparkles size={60} />, top: '50%', left: '90%', animation: { rotate: [0, 360] } },
    { icon: <Gift size={55} />, top: '30%', left: '70%', animation: { scale: [1, 1.1, 1] } },
    { icon: <MessageSquare size={45} />, top: '65%', left: '40%', animation: { x: [0, 5, -5, 0] } },
    { icon: <Lock size={40} />, top: '20%', left: '50%', animation: { rotate: [0, 5, -5, 0] } },
  ];

  return (
    <section id="features" className="features-section">
      {/* Background Decorations */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="bg-blob-1"
      />
      <motion.div 
        animate={{ 
          rotate: [360, 0],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="bg-blob-2"
      />
      
      <div className="background-decorations">
        {bgIcons.map((item, index) => (
          <motion.div
            key={index}
            style={{ top: item.top, left: item.left }}
            animate={item.animation}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            className="bg-icon-item"
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="features-container"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="features-header">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="features-icon-header"
          >
            <Zap />
          </motion.div>
          
          <h2 className="features-title">
            <span>Fitur Unggulan</span>
          </h2>
          
          <p className="features-description">
            Dilengkapi dengan berbagai fitur canggih yang dirancang untuk memberikan 
            pengalaman terbaik dalam menyimpan dan mengelola kenangan Anda.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="features-grid-container">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                rotate: 0,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
              whileTap={{ scale: 0.95 }}
              className={`feature-card`}
            >
              <div className="feature-card-content">
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="feature-icon-wrapper"
                >
                  <div className={`feature-icon ${feature.gradientClass}`}>
                    {feature.icon}
                  </div>
                </motion.div>
              
                <h3 className="feature-card-title">
                  {feature.title}
                </h3>
                <p className="feature-card-description">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="cta-wrapper"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="cta-card"
          >
            <h3 className="cta-title">
              Mau nambah memori lagi?
            </h3>
            <p className="cta-description">
              Tulis lah disini biar aku, kamu, kita bisa ingat semuanya.
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('add-memory')?.scrollIntoView({ behavior: 'smooth' })}
              className="cta-button"
            >
              <Heart />
              <span>Mulai Sekarang</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Features;