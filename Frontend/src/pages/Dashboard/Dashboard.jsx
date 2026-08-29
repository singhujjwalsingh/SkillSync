import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import StudentDashboard from '../Student/StudentDashboard';
import RecruiterDashboard from '../Recruiter/RecruiterDashboard';
import TpoDashboard from '../TPO/TpoDashboard';

const Dashboard = () => {
  const { user, role } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Normalize role
  const effectiveRole = (role || user.role || 'student').toLowerCase();

  if (effectiveRole === 'student') {
    return <StudentDashboard />;
  }

  if (effectiveRole === 'recruiter' || effectiveRole === 'industry') {
    return <RecruiterDashboard />;
  }

  if (effectiveRole === 'college_tpo' || effectiveRole === 'institution' || effectiveRole === 'tpo') {
    return <TpoDashboard />;
  }

  // Fallback default
  return <StudentDashboard />;
};

export default Dashboard;
