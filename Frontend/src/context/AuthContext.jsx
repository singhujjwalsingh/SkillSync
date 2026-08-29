import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('skillsync_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeRole, setActiveRole] = useState(() => {
    const saved = localStorage.getItem('skillsync_role');
    return saved || null;
  });

  const [studentProfile, setStudentProfile] = useState(() => {
    const saved = localStorage.getItem('skillsync_student_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved profile", e);
      }
    }
    return {
      name: 'Aarav Mehta',
      role: 'Full Stack Engineer & Database Specialist',
      email: 'aarav.mehta@skillsync.sih',
      phone: '+91 98765 43210',
      location: 'Mumbai, MH, India',
      education: {
        degree: 'B.Tech in Computer Science & Engineering',
        institution: 'Indian Institute of Technology, Bombay',
        timeline: '2023 - 2027',
        cgpa: '9.1 / 10.0'
      },
      skills: [
        { name: 'React.js / Next.js', level: 90, status: 'Verified' },
        { name: 'JavaScript / Node.js', level: 85, status: 'Verified' },
        { name: 'SQL Databases (Postgres/MySQL)', level: 75, status: 'Verified' },
        { name: 'HTML & CSS / Tailwind', level: 95, status: 'Self-Declared' },
        { name: 'Data Structures & Algorithms', level: 80, status: 'Verified' }
      ],
      badges: [
        { name: 'Database Foundations Expert', organization: 'SkillSync Core', id: 'SS-DB-84321', date: 'Aug 2026', authority: 'IIT Bombay Board' },
        { name: 'Advanced React Certification', organization: 'SkillSync Core', id: 'SS-FE-12903', date: 'Jul 2026', authority: 'Wipro Dev Group' },
        { name: 'Cybersecurity Awareness Badge', organization: 'SIH Certification', id: 'SIH-SEC-5819', date: 'Jun 2026', authority: 'Ministry of Education' }
      ],
      projects: [
        { name: 'E-Commerce Microservices Engine', tech: 'Node.js, Express, PostgreSQL', desc: 'Designed database normalizations and cluster indices, improving transaction rates by 35%.' },
        { name: 'SIH26 Portal (SkillSync)', tech: 'React, Tailwind CSS, Auth Context', desc: 'Interactive digital resume tracking platform incorporating custom matched scoring pipelines.' }
      ],
      resume: null
    };
  });

  useEffect(() => {
    if (studentProfile) {
      localStorage.setItem('skillsync_student_profile', JSON.stringify(studentProfile));
    } else {
      localStorage.removeItem('skillsync_student_profile');
    }
  }, [studentProfile]);

  const login = (email, password, role) => {
    // Mock user creation based on role
    let name = 'User';
    if (role === 'student') name = 'Aarav Mehta';
    else if (role === 'industry') name = 'TCS Careers / N. Chandrasekaran';
    else if (role === 'academician') name = 'Dr. Rajesh Sharma';
    else if (role === 'institution') name = 'IIT Bombay Admin';

    const mockUser = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      name,
      role
    };

    setUser(mockUser);
    setActiveRole(role);
    localStorage.setItem('skillsync_user', JSON.stringify(mockUser));
    localStorage.setItem('skillsync_role', role);
    return mockUser;
  };

  const register = (name, email, password, role) => {
    const mockUser = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      name,
      role
    };

    setUser(mockUser);
    setActiveRole(role);
    localStorage.setItem('skillsync_user', JSON.stringify(mockUser));
    localStorage.setItem('skillsync_role', role);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    setActiveRole(null);
    localStorage.removeItem('skillsync_user');
    localStorage.removeItem('skillsync_role');
  };

  const switchRole = (role) => {
    if (!user) {
      // If not logged in, log in with a default name for that role
      login(`${role}@skillsync.dev`, 'password', role);
    } else {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      setActiveRole(role);
      localStorage.setItem('skillsync_user', JSON.stringify(updatedUser));
      localStorage.setItem('skillsync_role', role);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role: activeRole, login, register, logout, switchRole, studentProfile, setStudentProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
