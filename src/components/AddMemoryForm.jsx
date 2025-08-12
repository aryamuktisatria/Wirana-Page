// src/components/AddMemoryForm.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Upload,
  Star,
  FileText,
  Calendar,
  MapPin,
  X,
  Check,
  Heart,
  Camera
} from 'lucide-react';
import '../styles/AddMemoryForm.css';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 100,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const filePreviewVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
};

const fileItemVariants = {
  hover: { scale: 1.05 },
};

const AddMemoryForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    mood: '',
    files: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Bahagia', value: 'happy' },
    { emoji: '❤️', label: 'Cinta', value: 'love' },
    { emoji: '🎉', label: 'Excited', value: 'excited' },
    { emoji: '😌', label: 'Tenang', value: 'peaceful' },
    { emoji: '🥰', label: 'Sayang', value: 'adorable' },
    { emoji: '🌟', label: 'Istimewa', value: 'special' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024);
    if (validFiles.length < files.length) {
      alert("Beberapa file terlalu besar (maks. 10MB per file) dan tidak ditambahkan.");
    }
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles]
    }));
  };

  const removeFile = (indexToRemove) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus media ini?")) {
      setFormData(prev => ({ ...prev, files: prev.files.filter((_, index) => index !== indexToRemove) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Ini hanya placeholder, nanti akan diganti dengan logika Firebase/Supabase
    console.log('Form data submitted:', formData);

    setTimeout(() => {
      setShowSuccess(true);
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        title: '',
        date: '',
        location: '',
        description: '',
        mood: '',
        files: []
      });
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };
  
  return (
    <section id="add-memory" className="add-memory-section">
      <div className="background-elements">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="bg-blob bg-blob-1"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="bg-blob bg-blob-2"
        />
      </div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="form-wrapper"
      >
        <motion.div variants={itemVariants} className="form-header">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="header-icon-wrapper"
          >
            <Sparkles className="header-icon" />
          </motion.div>
          <h2 className="header-title"><span>Tambah Kenangan Baru</span></h2>
          <p className="header-description">Abadikan momen spesial Anda dan simpan dalam timeline yang indah</p>
        </motion.div>
        
        <motion.form 
          variants={itemVariants}
          onSubmit={handleSubmit} 
          className="form-container"
        >
          {/* Basic Information Section */}
          <motion.div variants={itemVariants} className="form-section">
            <h3 className="section-title">
              <Star className="section-icon" />
              Informasi Dasar
            </h3>
            
            <div className="form-grid">
              <motion.div variants={itemVariants} className="input-group">
                <label htmlFor="title" className="input-label">Judul Kenangan</label>
                <motion.input
                  whileFocus={{ scale: 1.01, boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)" }}
                  type="text" id="title" name="title" value={formData.title} onChange={handleInputChange}
                  placeholder="Masukkan judul " className="input-field" required
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="input-group">
                <label htmlFor="date" className="input-label">Tanggal</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }} type="date" id="date" name="date" value={formData.date}
                  onChange={handleInputChange} className="input-field" required
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="input-group">
                <label htmlFor="location" className="input-label">Lokasi (Opsional)</label>
                <motion.input
                  whileFocus={{ scale: 1.01 }} type="text" id="location" name="location" value={formData.location}
                  onChange={handleInputChange} placeholder="Dimana ini ?" className="input-field"
                />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Mood Section */}
          <motion.div variants={itemVariants} className="form-section">
            <h3 className="section-title">
              <Heart className="section-icon" />
              Suasana Hati
            </h3>
            
            <div className="mood-selection-grid">
              {moods.map((mood) => (
                <motion.button
                  key={mood.value} type="button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData(prev => ({ ...prev, mood: mood.value }))}
                  className={`mood-button ${formData.mood === mood.value ? 'mood-button-active' : ''}`}
                >
                  <div className="mood-emoji">{mood.emoji}</div>
                  <div className="mood-label">{mood.label}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
          
          {/* Description Section */}
          <motion.div variants={itemVariants} className="form-section">
            <h3 className="section-title">
              <FileText className="section-icon" />
              Cerita & Deskripsi
            </h3>
            
            <motion.textarea
              whileFocus={{ scale: 1.01 }} id="description" name="description" value={formData.description}
              onChange={handleInputChange} placeholder="Ceritakan tentang kenangan indah ini..." rows="5"
              className="textarea-field" required
            />
          </motion.div>
          
          {/* Media Section */}
          <motion.div variants={itemVariants} className="form-section">
            <h3 className="section-title">
              <Camera className="section-icon" />
              Unggah Media
            </h3>
            
            <div className="file-upload-dropzone">
              <input 
                type="file" multiple onChange={handleFileChange} className="file-input-hidden"
                accept="image/*,video/*"
              />
              <Upload className="upload-icon" />
              <p className="upload-text">
                Tarik & lepas file di sini atau <span className="upload-link">klik untuk mengunggah</span>
              </p>
              <p className="upload-subtext">Hingga 10 file (gambar, video) - Maksimal 10MB per file</p>
            </div>
            
            <AnimatePresence>
              {formData.files.length > 0 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
                  className="file-preview-container"
                >
                  <h4 className="file-preview-title">File Terunggah:</h4>
                  <div className="file-preview-grid">
                    <AnimatePresence>
                      {formData.files.map((file, index) => (
                        <motion.div
                          key={index} variants={filePreviewVariants} initial="initial" animate="animate" exit="exit"
                          whileHover="hover" className="file-preview-item"
                        >
                          <motion.div variants={fileItemVariants} className="file-preview-overlay">
                            <button type="button" onClick={() => removeFile(index)} className="file-remove-button">
                              <X className="file-remove-icon" />
                            </button>
                          </motion.div>
                          {file.type.startsWith('image/') ? (
                            <img src={URL.createObjectURL(file)} alt={file.name} className="file-preview-media" />
                          ) : file.type.startsWith('video/') ? (
                            <video src={URL.createObjectURL(file)} className="file-preview-media" />
                          ) : (
                            <div className="file-preview-placeholder"><FileText className="file-preview-placeholder-icon" /></div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Submit Button */}
          <motion.div variants={itemVariants} className="form-submit-wrapper">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }} className="submit-button" disabled={isSubmitting}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div key="loading" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }} transition={{ duration: 0.2 }} className="loading-spinner-dots"
                  >
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </motion.div>
                ) : (
                  <motion.span
                    key="submit-text" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="submit-button-content"
                  >
                    <Sparkles className="submit-icon" />
                    <span>Simpan Kenangan</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.form>
        
        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }} transition={{ type: "spring", stiffness: 100 }}
              className="success-message"
            >
              <Check className="success-icon" />
              <span>Kenangan berhasil disimpan!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default AddMemoryForm;