import React, { createContext, useContext, useState } from 'react';

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

  const [token, setToken] = useState(() => {
    return localStorage.getItem('skillsync_token') || null;
  });

  const register = async (name, email, password, role = 'student') => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      const userData = data.user || { name, email, role };
      const authToken = data.token;

      setUser(userData);
      setActiveRole(userData.role || role);
      setToken(authToken);

      localStorage.setItem('skillsync_user', JSON.stringify(userData));
      localStorage.setItem('skillsync_role', userData.role || role);
      if (authToken) localStorage.setItem('skillsync_token', authToken);

      return { success: true, user: userData };
    } catch (err) {
      console.warn('Backend register error, fallback to local state if offline:', err.message);
      
      // If server is offline or connection fails, allow graceful local fallback
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        const mockUser = { id: Math.random().toString(36).substring(2, 9), name, email, role };
        setUser(mockUser);
        setActiveRole(role);
        localStorage.setItem('skillsync_user', JSON.stringify(mockUser));
        localStorage.setItem('skillsync_role', role);
        return { success: true, user: mockUser };
      }

      return { success: false, error: err.message };
    }
  };

  const login = async (email, password, selectedRole = 'student') => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      const userData = data.user || { email, role: selectedRole };
      const authToken = data.token;

      setUser(userData);
      setActiveRole(userData.role || selectedRole);
      setToken(authToken);

      localStorage.setItem('skillsync_user', JSON.stringify(userData));
      localStorage.setItem('skillsync_role', userData.role || selectedRole);
      if (authToken) localStorage.setItem('skillsync_token', authToken);

      return { success: true, user: userData };
    } catch (err) {
      console.warn('Backend login error:', err.message);

      // Graceful demo handling if server is unreachable
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        let name = 'User';
        if (selectedRole === 'student') name = 'Aarav Mehta';
        else if (selectedRole === 'industry') name = 'TCS Careers';
        else if (selectedRole === 'academician') name = 'Dr. Rajesh Sharma';
        else if (selectedRole === 'institution') name = 'IIT Bombay Admin';

        const mockUser = { id: Math.random().toString(36).substring(2, 9), email, name, role: selectedRole };
        setUser(mockUser);
        setActiveRole(selectedRole);
        localStorage.setItem('skillsync_user', JSON.stringify(mockUser));
        localStorage.setItem('skillsync_role', selectedRole);
        return { success: true, user: mockUser };
      }

      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setActiveRole(null);
    setToken(null);
    localStorage.removeItem('skillsync_user');
    localStorage.removeItem('skillsync_role');
    localStorage.removeItem('skillsync_token');
  };

  const switchRole = (role) => {
    if (!user) {
      login(`${role}@skillsync.dev`, 'password123', role);
    } else {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      setActiveRole(role);
      localStorage.setItem('skillsync_user', JSON.stringify(updatedUser));
      localStorage.setItem('skillsync_role', role);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role: activeRole, token, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
