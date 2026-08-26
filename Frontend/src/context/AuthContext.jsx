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
    <AuthContext.Provider value={{ user, role: activeRole, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
