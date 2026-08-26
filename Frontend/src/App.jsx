import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RoleGuard from './components/RoleGuard';
import DemoSwitcher from './components/DemoSwitcher';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';

// Import Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Student Pages
import StudentDashboard from './pages/Student/StudentDashboard';
import SkillAssessment from './pages/Student/SkillAssessment';
import JobPortal from './pages/Student/JobPortal';
import Portfolio from './pages/Student/Portfolio';

// Industry Pages
import IndustryDashboard from './pages/Industry/IndustryDashboard';
import LearningPrograms from './pages/Industry/LearningPrograms';

// Academician Pages
import AcademicDashboard from './pages/Academician/AcademicDashboard';

// Institution Pages
import InstitutionDashboard from './pages/Institution/InstitutionDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100">
          <Navbar />
          
          <div className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Student Protected Routes */}
              <Route
                path="/student"
                element={
                  <RoleGuard allowedRoles={['student']}>
                    <DashboardLayout>
                      <Outlet />
                    </DashboardLayout>
                  </RoleGuard>
                }
              >
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="assessment" element={<SkillAssessment />} />
                <Route path="jobs" element={<JobPortal />} />
                <Route path="portfolio" element={<Portfolio />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>

              {/* Industry Protected Routes */}
              <Route
                path="/industry"
                element={
                  <RoleGuard allowedRoles={['industry']}>
                    <DashboardLayout>
                      <Outlet />
                    </DashboardLayout>
                  </RoleGuard>
                }
              >
                <Route path="dashboard" element={<IndustryDashboard />} />
                <Route path="learning" element={<LearningPrograms />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>

              {/* Academic Protected Routes */}
              <Route
                path="/academic"
                element={
                  <RoleGuard allowedRoles={['academician']}>
                    <DashboardLayout>
                      <Outlet />
                    </DashboardLayout>
                  </RoleGuard>
                }
              >
                <Route path="dashboard" element={<AcademicDashboard />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>

              {/* Institution Protected Routes */}
              <Route
                path="/institution"
                element={
                  <RoleGuard allowedRoles={['institution']}>
                    <DashboardLayout>
                      <Outlet />
                    </DashboardLayout>
                  </RoleGuard>
                }
              >
                <Route path="dashboard" element={<InstitutionDashboard />} />
                <Route index element={<Navigate to="dashboard" replace />} />
              </Route>

              {/* 404 Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
          <DemoSwitcher />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
