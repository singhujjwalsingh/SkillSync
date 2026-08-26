import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Newly Redesigned Neumorphic Pages
import HomePage from './pages/Home/HomePage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {/* Creative Soft Ambient Background */}
          <div className="soft-ambient-bg" aria-hidden="true">
            <div className="soft-orb soft-orb-1" />
            <div className="soft-orb soft-orb-2" />
            <div className="soft-orb soft-orb-3" />
          </div>

          {/* Main App Container */}
          <div className="relative min-h-screen flex flex-col justify-between selection:bg-indigo-500/20 selection:text-indigo-400">
            <Navbar />
            
            <main className="flex-1 w-full">
              <Routes>
                {/* 4 Core Redesigned Neumorphic Pages */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
