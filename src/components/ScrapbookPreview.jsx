import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  MapPin, 
  ImageIcon, 
  FolderOpen, 
  Plus, 
  Search, 
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Smile,
  Sparkles,
  Sun
} from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import '../styles/ScrapbookPreview.css'; 

const ScrapbookPreview = () => {
  const [memories, setMemories] = useState([]);
  const [filteredMemories, setFilteredMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    mood: '',
    dateFrom: '',
    dateTo: ''
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const moodIcons = {
    happy: { icon: Smile, emoji: '😊', label: 'Bahagia' },
    love: { icon: Heart, emoji: '❤️', label: 'Cinta' },
    excited: { icon: Sparkles, emoji: '🎉', label: 'Excited' },
    peaceful: { icon: Sun, emoji: '😌', label: 'Tenang' },
    special: { icon: Sparkles, emoji: '🌟', label: 'Istimewa' }
  };

  useEffect(() => {
    const q = query(collection(db, 'memory'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const memoriesArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date ? doc.data().date.toDate() : new Date(),
        displayDate: doc.data().date ? doc.data().date.toDate().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }) : '',
      }));
      setMemories(memoriesArray);
      setFilteredMemories(memoriesArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Handle search and filter
  useEffect(() => {
    let filtered = memories;

    // Search by title
    if (searchTerm) {
      filtered = filtered.filter(memory =>
        memory.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by mood
    if (filters.mood) {
      filtered = filtered.filter(memory => memory.mood === filters.mood);
    }

    // Filter by date range
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(memory => memory.date >= fromDate);
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(memory => memory.date <= toDate);
    }

    setFilteredMemories(filtered);
  }, [memories, searchTerm, filters]);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = carouselRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const openMemoryDetail = (memory) => {
    setSelectedMemory(memory);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeMemoryDetail = () => {
    setSelectedMemory(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedMemory && selectedMemory.photoUrls) {
      setCurrentImageIndex((prev) => 
        prev === selectedMemory.photoUrls.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedMemory && selectedMemory.photoUrls) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedMemory.photoUrls.length - 1 : prev - 1
      );
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ mood: '', dateFrom: '', dateTo: '' });
    setShowFilters(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
        <p>Memuat kenangan...</p>
      </div>
    );
  }

  return (
    <section id="scrapbook-preview">
      <div className="background-animation">
        <div className="floating-icon icon-1"></div>
        <div className="floating-icon icon-2"></div>
        <div className="floating-icon icon-3"></div>
      </div>

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
          <h2 className="header-title">Jelajahi Kenangan Anda</h2>
          <p className="header-description">Sebuah buku kenangan digital yang bisa dibuka kapan saja</p>
          
          {/* Search and Filter Controls */}
          <div className="controls-section">
            <div className="search-bar">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Cari berdasarkan judul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`filter-button ${showFilters ? 'active' : ''}`}
            >
              <Filter />
              Filter
            </motion.button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="filter-panel"
              >
                <div className="filter-row">
                  <div className="filter-group">
                    <label>Mood</label>
                    <select
                      value={filters.mood}
                      onChange={(e) => setFilters({...filters, mood: e.target.value})}
                      className="filter-select"
                    >
                      <option value="">Semua Mood</option>
                      <option value="happy">😊 Bahagia</option>
                      <option value="love">❤️ Cinta</option>
                      <option value="excited">🎉 Excited</option>
                      <option value="peaceful">😌 Tenang</option>
                      <option value="special">🌟 Istimewa</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label>Dari Tanggal</label>
                    <input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
                      className="filter-input"
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label>Sampai Tanggal</label>
                    <input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
                      className="filter-input"
                    />
                  </div>
                </div>
                
                <div className="filter-actions">
                  <button onClick={clearFilters} className="clear-filters-btn">
                    Bersihkan Filter
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Carousel Container */}
        <AnimatePresence>
          {filteredMemories.length > 0 ? (
            <motion.div variants={itemVariants} className="carousel-container">
              <button 
                className={`carousel-nav left ${!canScrollLeft ? 'disabled' : ''}`}
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
              >
                <ChevronLeft />
              </button>
              
              <div 
                className="memory-carousel"
                ref={carouselRef}
                onScroll={checkScrollButtons}
              >
                {filteredMemories.map((memory) => (
                  <motion.div
                    key={memory.id}
                    className="memory-card"
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openMemoryDetail(memory)}
                    layout
                  >
                    <div className="card-image">
                      {memory.photoUrls && memory.photoUrls.length > 0 ? (
                        <>
                          <img src={memory.photoUrls[0]} alt={memory.title} />
                          {memory.photoUrls.length > 1 && (
                            <div className="image-count">
                              <ImageIcon />
                              <span>{memory.photoUrls.length}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="placeholder-image">
                          <ImageIcon />
                        </div>
                      )}
                      
                      {/* Mood indicator */}
                      {memory.mood && moodIcons[memory.mood] && (
                        <div className="mood-indicator">
                          <span>{moodIcons[memory.mood].emoji}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="card-content">
                      <h3 className="card-title">{memory.title}</h3>
                      <div className="card-details">
                        <span className="detail-item">
                          <Calendar className="icon" />
                          <span>{memory.displayDate}</span>
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
                ))}
              </div>
              
              <button 
                className={`carousel-nav right ${!canScrollRight ? 'disabled' : ''}`}
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
              >
                <ChevronRight />
              </button>
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
              <h3>
                {searchTerm || filters.mood || filters.dateFrom || filters.dateTo
                  ? 'Tidak ada kenangan yang sesuai'
                  : 'Belum ada kenangan'
                }
              </h3>
              <p>
                {searchTerm || filters.mood || filters.dateFrom || filters.dateTo
                  ? 'Coba ubah pencarian atau filter Anda'
                  : 'Mulai abadikan momen berharga Anda.'
                }
              </p>
              {!(searchTerm || filters.mood || filters.dateFrom || filters.dateTo) && (
                <button className="add-memory-button">
                  <Plus className="icon" /> Tambah Kenangan
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Memory Detail Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={closeMemoryDetail}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeMemoryDetail}>
                <X />
              </button>
              
              <div className="modal-header">
                <h2>{selectedMemory.title}</h2>
                {selectedMemory.mood && moodIcons[selectedMemory.mood] && (
                  <div className="modal-mood">
                    <span className="mood-emoji">{moodIcons[selectedMemory.mood].emoji}</span>
                    <span className="mood-label">{moodIcons[selectedMemory.mood].label}</span>
                  </div>
                )}
              </div>
              
              {selectedMemory.photoUrls && selectedMemory.photoUrls.length > 0 && (
                <div className="modal-images">
                  <div className="image-container">
                    <img 
                      src={selectedMemory.photoUrls[currentImageIndex]} 
                      alt={selectedMemory.title}
                    />
                    
                    {selectedMemory.photoUrls.length > 1 && (
                      <>
                        <button className="image-nav prev" onClick={prevImage}>
                          <ChevronLeft />
                        </button>
                        <button className="image-nav next" onClick={nextImage}>
                          <ChevronRight />
                        </button>
                        
                        <div className="image-indicators">
                          {selectedMemory.photoUrls.map((_, index) => (
                            <button
                              key={index}
                              className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              <div className="modal-details">
                <div className="detail-row">
                  <Calendar className="icon" />
                  <span>{selectedMemory.displayDate}</span>
                </div>
                
                {selectedMemory.location && (
                  <div className="detail-row">
                    <MapPin className="icon" />
                    <span>{selectedMemory.location}</span>
                  </div>
                )}
                
                {selectedMemory.description && (
                  <div className="description">
                    <p>{selectedMemory.description}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ScrapbookPreview;