import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoSwitcher from './components/DemoSwitcher';

// Core Pages
import HomePage from './pages/Home/HomePage';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';

// Student Module Pages
import StudentProfile from './pages/Student/StudentProfile';
import PostingsBrowse from './pages/Student/PostingsBrowse';
import PostingDetail from './pages/Student/PostingDetail';
import MyApplications from './pages/Student/MyApplications';

// Recruiter Module Pages
import RecruiterDashboard from './pages/Recruiter/RecruiterDashboard';
import CreatePosting from './pages/Recruiter/CreatePosting';
import ApplicantsList from './pages/Recruiter/ApplicantsList';
import RecruiterProfile from './pages/Recruiter/RecruiterProfile';

// College TPO Module Pages
import TpoDashboard from './pages/TPO/TpoDashboard';
import StudentManagement from './pages/TPO/StudentManagement';
import TpoAnalytics from './pages/TPO/TpoAnalytics';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {/* Creative Soft Ambient Background with Oversized Orbs */}
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
                {/* Public & Shared Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Role-Aware Dynamic Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Student Module */}
                <Route path="/profile" element={<StudentProfile />} />
                <Route path="/postings" element={<PostingsBrowse />} />
                <Route path="/postings/:id" element={<PostingDetail />} />
                <Route path="/applications" element={<MyApplications />} />

                {/* Recruiter Module */}
                <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
                <Route path="/recruiter/create-posting" element={<CreatePosting />} />
                <Route path="/recruiter/postings/create" element={<CreatePosting />} />
                <Route path="/recruiter/applicants/:id" element={<ApplicantsList />} />
                <Route path="/recruiter/profile" element={<RecruiterProfile />} />

                {/* College TPO Module */}
                <Route path="/tpo/dashboard" element={<TpoDashboard />} />
                <Route path="/tpo/students" element={<StudentManagement />} />
                <Route path="/tpo/analytics" element={<TpoAnalytics />} />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
            <DemoSwitcher />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
