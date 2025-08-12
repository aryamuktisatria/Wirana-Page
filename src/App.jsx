// F:\wirana-page\memory-scrapbook\src\App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import LanguageCarousel from './components/LanguageCarousel';
import Features from './components/Features';
import AddMemoryForm from './components/AddMemoryForm';
import ScrapbookPreview from './components/ScrapbookPreview';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Login from './components/Login'; // Import komponen Login

// Styles
import './App.css';

// Komponen untuk melindungi rute
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem('isAuthenticated') === 'true');
    };
    window.addEventListener('storage', checkAuth); // Dengarkan perubahan localStorage
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            {/* Rute untuk halaman login */}
            <Route path="/login" element={<Login />} />

            {/* Rute utama yang dilindungi */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <section id="hero">
                      <Hero />
                    </section>

                    <section id="about">
                      <About />
                    </section>

                    <section id="language-carousel">
                      <LanguageCarousel />
                    </section>

                    <section id="features">
                      <Features />
                    </section>

                    <section id="add-memory">
                      <AddMemoryForm />
                    </section>

                    <section id="scrapbook">
                      <ScrapbookPreview />
                    </section>

                    <section id="about-us">
                      <AboutUs />
                    </section>
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
