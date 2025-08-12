// src/components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Sparkles,
  ArrowRight,
  Infinity,
  Lock,
  MessageCircle,
  CalendarDays,
  Camera,
  Gift,
  Star,
  Smile
} from 'lucide-react';
import '../styles/About.css';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    }
  };

  const benefitItems = [
    {
      icon: <Lock className="icon-main" />,
      title: "Hanya untuk Kita",
      description: "Sebuah ruang pribadi yang aman, di mana setiap kenangan hanya bisa diakses oleh kita berdua."
    },
    {
      icon: <Infinity className="icon-main" />,
      title: "Kenangan Abadi",
      description: "Setiap cerita, foto, dan video akan tersimpan selamanya, mengabadikan perjalanan cinta kita."
    },
    {
      icon: <MessageCircle className="icon-main" />,
      title: "Pesan-pesan Manis",
      description: "Tempat kita bisa saling meninggalkan pesan dan kejutan, merayakan setiap momen, besar maupun kecil."
    }
  ];

  const timelineEvents = [
    {
      icon: <CalendarDays />,
      title: "Hari Pertama",
      description: "Mengingat kembali saat pertama kali kita bertemu dan kisah ini dimulai."
    },
    {
      icon: <Camera />,
      title: "Momen Indah",
      description: "Galeri digital untuk setiap potret dan video kebahagiaan kita."
    },
    {
      icon: <Gift />,
      title: "Janji Manis",
      description: "Fitur spesial untuk menyimpan pesan dan kejutan yang bisa dibuka pada hari istimewa."
    }
  ];

  return (
    <section id="about" className="about-section">
      {/* Background Decorations */}
      <div className="background-decorations">
        {/* Lingkaran besar */}
        <motion.div 
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: 9999, ease: "linear", repeatType: "loop" }}
          className="bg-circle-1"
        />
        <motion.div 
          animate={{ rotate: [360, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 25, repeat: 9999, ease: "linear", repeatType: "loop" }}
          className="bg-circle-2"
        />

        {/* Icon animasi di background */}
        <motion.div
          animate={{ y: [20, 0, 20] }}
          transition={{ duration: 12, repeat: 9999, repeatType: "loop" }}
          className="bg-floating-icon"
        >
          <Heart size={28} color="#fb923c" />
        </motion.div>
        <motion.div
          animate={{ y: [-15, 0, -15] }}
          transition={{ duration: 14, repeat: 9999, repeatType: "loop" }}
          className="bg-floating-icon-2"
        >
          <Star size={28} color="#fbbf24" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 16, repeat: 9999, repeatType: "loop" }}
          className="bg-floating-icon-3"
        >
          <Smile size={28} color="#fcd34d" />
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="about-container"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="about-header">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="header-icon-wrapper"
          >
            <Heart className="header-icon" />
          </motion.div>
          
          <h2 className="header-title">
            <span>Kisah Kita di Wirana Page</span>
          </h2>
          
          <p className="header-description">
            Ini adalah rumah digital kita, tempat di mana setiap kenangan yang terukir antara{" "}
            <span className="highlight-name">Rio</span> dan{" "}
            <span className="highlight-name">Keysa</span> tersimpan dengan aman dan indah.
            Sebuah album digital yang merayakan setiap babak dalam kisah cinta kita, dari awal hingga selamanya.
          </p>
        </motion.div>

        {/* Benefits Section */}
        <motion.div variants={containerVariants} className="benefits-wrapper">
          <motion.h3 variants={itemVariants} className="benefits-title">
            ✨ Mengapa Ini Sangat Berarti?
          </motion.h3>
          
          <div className="benefits-layout">
            {benefitItems.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
                className="benefit-card-new"
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: [0, -15, 15, -15, 0] }}
                  transition={{ duration: 0.5 }}
                  className="benefit-icon-wrapper-new"
                >
                  {benefit.icon}
                </motion.div>
                <h4 className="benefit-title-new">{benefit.title}</h4>
                <p className="benefit-description-new">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div variants={containerVariants} className="timeline-wrapper">
          <motion.h3 variants={itemVariants} className="timeline-title">
            ❤️ Timeline Kisah Kita
          </motion.h3>
          <div className="timeline-grid">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                className="timeline-card"
              >
                <motion.div whileHover={{ rotate: [0, 20, -20, 0] }} className="timeline-icon-wrapper">
                  {event.icon}
                </motion.div>
                <h4 className="timeline-event-title">{event.title}</h4>
                <p className="timeline-event-description">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div variants={itemVariants} className="mission-wrapper">
          <motion.div whileHover={{ scale: 1.02, y: -5 }} className="mission-card">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: 9999, repeatType: "loop" }}
              className="mission-icon-wrapper"
            >
              <Sparkles className="mission-icon" />
            </motion.div>
            <h3 className="mission-title">Komitmen Kita</h3>
            <p className="mission-description">
              Kami akan selalu menjaga dan mengisi lembaran digital ini dengan cerita-cerita baru, tawa, dan air mata kebahagiaan. 
              Ini adalah janji kita untuk selalu mengingat, merayakan, dan menghargai setiap detik perjalanan kita.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(249, 115, 22, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="explore-button"
            >
              <span>Mulai Buat Kenangan</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
