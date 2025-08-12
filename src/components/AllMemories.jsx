// F:\wirana-page\memory-scrapbook\src\components\AllMemories.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, MapPin, ImageIcon, FolderOpen, ArrowLeft } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import '../styles/ScrapbookPreview.css'; // Menggunakan CSS yang sama untuk tampilan kartu

const AllMemories = () => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Memuat semua kenangan dari Firestore
    const q = query(collection(db, 'memory'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const memoriesArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date ? doc.data().date.toDate().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : '',
      }));
      setMemories(memoriesArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Memuat semua kenangan...</p>
      </div>
    );
  }

  return (
    <section id="all-memories">
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
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="scrapbook-preview-container"
      >
        <motion.div variants={itemVariants} className="list-header">
          <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="header-icon-wrapper">
            <BookOpen />
          </motion.div>
          <h2 className="header-title">Semua Kenangan Anda</h2>
          <p className="header-description">Daftar lengkap momen yang telah Anda abadikan</p>
        </motion.div>

        <AnimatePresence>
          {memories.length > 0 ? (
            <motion.div variants={itemVariants} className="memory-grid">
              {memories.map((memory) => (
                <Link to={`/memory/${memory.id}`} key={memory.id}>
                  <motion.div
                    className="memory-card"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="card-image">
                      {memory.photoUrls && memory.photoUrls.length > 0 ? (
                        <img src={memory.photoUrls[0]} alt={memory.title} />
                      ) : (
                        <div className="placeholder-image">
                          <ImageIcon />
                        </div>
                      )}
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{memory.title}</h3>
                      <div className="card-details">
                        <span className="detail-item">
                          <Calendar className="icon" />
                          <span>{memory.date}</span>
                        </span>
                        {memory.location && (
                          <span className="detail-item">
                            <MapPin className="icon" />
                            <span>{memory.location}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="empty-state"
            >
              <FolderOpen className="empty-icon" />
              <h3>Belum ada kenangan</h3>
              <p>Mulai abadikan momen berharga Anda.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default AllMemories;
