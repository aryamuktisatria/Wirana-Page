// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogIn, User, Lock, Sparkles, Eye, EyeOff, 
  AlertCircle, CheckCircle, X, Heart, BookOpen 
} from 'lucide-react';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call with a delay
    setTimeout(() => {
      // Kredensial statis yang sudah diperbarui
      if (username === 'wiranapage' && password === 'riotampankeysacantik') {
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('lastActivity', Date.now());

  // 🔹 Trigger event supaya Navbar langsung update
  window.dispatchEvent(new Event('authChange'));

  setSuccess(true);
  
  setTimeout(() => {
    navigate('/');
  }, 1500);
}
else {
        setError('Username atau password salah.');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleCloseError = () => {
    setError('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="login-page">
      {/* Background elements */}
      <motion.div 
        className="login-bg-shape shape-1"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="login-bg-shape shape-2"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        className="login-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="login-card"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="login-header">
            <motion.div
              animate={floatingAnimation}
              className="login-icon-wrapper"
            >
              <BookOpen className="login-icon-main" />
              <Sparkles className="login-icon-sparkle" />
            </motion.div>
            <h2 className="login-title">Masuk ke Wirana Page</h2>
            <p className="login-subtitle">Simpan kenangan indah kita bersama</p>
          </motion.div>
          
          {/* Success message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="login-success"
              >
                <CheckCircle className="success-icon" />
                <span>Login berhasil! Mengalihkan...</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleLogin} className="login-form">
            <motion.div variants={itemVariants} className="input-group">
              <div className="input-icon-wrapper">
                <User className="input-icon" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
                disabled={isLoading}
              />
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="input-decoration"
              >
                <Heart className="decoration-icon" />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="input-group">
              <div className="input-icon-wrapper">
                <Lock className="input-icon" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                disabled={isLoading}
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="password-toggle"
              >
                {showPassword ? <EyeOff className="toggle-icon" /> : <Eye className="toggle-icon" />}
              </motion.button>
            </motion.div>
            
            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="error-message"
                >
                  <AlertCircle className="error-icon" />
                  <span>{error}</span>
                  <motion.button
                    onClick={handleCloseError}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="error-close"
                  >
                    <X className="close-icon" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button 
              type="submit" 
              className="login-button"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 123, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading || success}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="login-spinner"
                />
              ) : (
                <>
                  <LogIn className="button-icon" />
                  <span>Masuk</span>
                </>
              )}
            </motion.button>
          </form>

          {/* <motion.div variants={itemVariants} className="login-footer">
            <p className="footer-text">
              Belum punya akun?{' '}
              <motion.span
                whileHover={{ scale: 1.05, color: "#3b82f6" }}
                className="footer-link"
              >
                Daftar sekarang
              </motion.span>
            </p>
          </motion.div> */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;