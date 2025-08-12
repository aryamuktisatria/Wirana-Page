// src/components/ScrapbookDetail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, ArrowLeft, Heart, Image as ImageIcon
} from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/ScrapbookDetail.css';

const moodEmojis = {
  happy: '😊',
  love: '❤️',
  excited: '🎉',
  peaceful: '😌',
  adorable: '🥰',
  special: '🌟'
};

const ScrapbookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memory, setMemory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  useEffect(() => {
    const fetchMemory = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        // Menggunakan nama koleksi 'memory' agar konsisten
        const docRef = doc(db, 'memory', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMemory({
            ...data,
            id: docSnap.id,
            // Pastikan field date ada sebelum memanggil toDate()
            date: data.date ? data.date.toDate().toLocaleDateString('id-ID', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : 'Tanggal tidak tersedia',
          });
        } else {
          console.log("Tidak ada dokumen tersebut!");
          setMemory(null);
        }
      } catch (error) {
        console.error("Error mengambil dokumen:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemory();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Memuat detail kenangan...</p>
      </div>
    );
  }

  if (!memory) {
    return (
      <div className="error-container">
        <h3>Kenangan tidak ditemukan</h3>
        <button onClick={() => navigate('/')}>Kembali ke Beranda</button>
      </div>
    );
  }

  const { title, date, location, description, mood, photoUrls } = memory;

  const handleMediaClick = (index) => {
    setActiveMediaIndex(index);
  };

  return (
    <section id="scrapbook-detail">
      <motion.button 
        className="back-button" 
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="icon" />
        Kembali
      </motion.button>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="detail-container"
      >
        <div className="media-section">
          <div className="main-media">
            <AnimatePresence mode="wait">
              {photoUrls && photoUrls[activeMediaIndex] ? (
                <motion.img
                  key={activeMediaIndex}
                  src={photoUrls[activeMediaIndex]}
                  alt={`${title} - media`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <div className="placeholder-image-large">
                  <ImageIcon size={64} />
                  <span>Tidak ada foto</span>
                </div>
              )}
            </AnimatePresence>
          </div>
          {photoUrls && photoUrls.length > 1 && (
            <div className="thumbnail-gallery">
              {photoUrls.map((url, index) => (
                <motion.div
                  key={index}
                  className={`thumbnail-item ${index === activeMediaIndex ? 'active' : ''}`}
                  onClick={() => handleMediaClick(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img src={url} alt={`Thumbnail ${index + 1}`} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="info-section">
          <h1 className="detail-title">{title}</h1>
          <div className="info-items">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="info-item">
              <Calendar className="icon calendar-icon" />
              <span>{date}</span>
            </motion.div>
            {location && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="info-item">
                <MapPin className="icon map-icon" />
                <span>{location}</span>
              </motion.div>
            )}
            {mood && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="info-item">
                <Heart className="icon mood-icon" />
                <span>{moodEmojis[mood]} {mood}</span>
              </motion.div>
            )}
          </div>
          <p className="detail-description">{description}</p>
        </div>
      </motion.div>
    </section>
  );
};

export default ScrapbookDetail;