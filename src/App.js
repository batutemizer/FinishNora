import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Teachers from './components/Teachers';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';

import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import TestStudent from './components/TestStudent';
import { motion, AnimatePresence } from 'framer-motion';

// Component to conditionally render Navbar and Footer
function AppContent() {
  const location = useLocation();
  const isDashboardPage = location.pathname.includes('dashboard');
  const isAuthPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-white">
      {!isDashboardPage && !isAuthPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <About />
              <Services />
              <Teachers />
              <Contact />
            </motion.div>
          } />
          <Route path="/login" element={<Login />} />

          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/test-student" element={<TestStudent />} />
        </Routes>
      </AnimatePresence>
      {!isDashboardPage && !isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-primary-600">Nora Akademi</h2>
          <p className="text-secondary-600 mt-2">Yükleniyor...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App; 