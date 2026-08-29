import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  Layers,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Bell,
  Sun,
  Moon,
  Briefcase,
  Award,
  GraduationCap,
  Sparkles,
  BarChart3,
  User,
  Plus,
  ShieldCheck
} from 'lucide-react';
import NotificationDrawer from './NotificationDrawer';

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  // Build role-specific navigation links
  let navLinks = [
    { label: 'Home', path: '/' }
  ];

  if (user) {
    if (role === 'student') {
      navLinks = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Explore Postings', path: '/postings' },
        { label: 'My Applications', path: '/applications' },
        { label: 'Skill Profile', path: '/profile' }
      ];
    } else if (role === 'recruiter' || role === 'industry') {
      navLinks = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Create Posting', path: '/recruiter/create-posting' },
        { label: 'Company Profile', path: '/recruiter/profile' }
      ];
    } else if (role === 'college_tpo' || role === 'institution') {
      navLinks = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Student Roster', path: '/tpo/students' },
        { label: 'Placement Analytics', path: '/tpo/analytics' }
      ];
    }
  }

  const roleLabel = role === 'student' ? 'Student' : role === 'recruiter' || role === 'industry' ? 'Recruiter' : role === 'college_tpo' || role === 'institution' ? 'TPO Admin' : 'Visitor';

  return (
    <>
      <header className="sticky top-3 z-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all duration-300">
        <nav className="neu-flat px-4 sm:px-6 py-3 flex items-center justify-between backdrop-blur-md rounded-3xl">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 p-[2px] neu-flat shadow-md transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full rounded-[14px] flex items-center justify-center bg-indigo-600 text-white font-black">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
                SkillSync
              </span>
              <span className="text-[9px] uppercase font-extrabold tracking-widest text-[var(--text-muted)] -mt-1">
                SIH PS 26044
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'neu-inset text-indigo-600 dark:text-indigo-400 font-extrabold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:neu-btn'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5">
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl neu-btn text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            {/* Notification Bell */}
            {user && (
              <button
                onClick={() => setNotificationOpen(true)}
                className="relative p-2 rounded-xl neu-btn text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-[var(--bg-main)]" />
              </button>
            )}

            {/* Auth Dropdown / Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="neu-btn px-3 py-1.5 text-xs flex items-center gap-2 rounded-2xl"
                >
                  <img
                    src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover neu-sm"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold leading-none truncate max-w-[110px] text-[var(--text-primary)]">{user?.name || user?.email}</p>
                    <p className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 capitalize mt-0.5">{roleLabel}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 neu-flat p-2 rounded-2xl shadow-2xl z-50 animate-scale-up bg-[var(--bg-main)]">
                    <div className="p-3 border-b border-[var(--border-subtle)]">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Signed in as</p>
                      <p className="text-xs font-bold text-[var(--text-primary)] truncate">{user?.name || user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                        {roleLabel}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:neu-inset text-[var(--text-primary)] font-medium"
                      >
                        Dashboard
                      </Link>

                      {role === 'student' && (
                        <Link
                          to="/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:neu-inset text-[var(--text-primary)] font-medium"
                        >
                          Skill Profile
                        </Link>
                      )}

                      {role === 'recruiter' && (
                        <Link
                          to="/recruiter/profile"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:neu-inset text-[var(--text-primary)] font-medium"
                        >
                          Company Profile
                        </Link>
                      )}
                    </div>

                    <div className="pt-1 border-t border-[var(--border-subtle)]">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-500 font-bold rounded-xl hover:neu-inset"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-3.5 py-1.5 rounded-xl text-xs font-bold neu-btn text-[var(--text-primary)]">
                  Sign In
                </Link>
                <Link to="/signup" className="px-3.5 py-1.5 rounded-xl text-xs font-bold neu-btn-primary text-white shadow-md">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl neu-btn text-[var(--text-secondary)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 neu-flat p-4 rounded-3xl flex flex-col gap-2 bg-[var(--bg-main)]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[var(--text-primary)] hover:neu-inset"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Notification Slideout Drawer */}
      <NotificationDrawer
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
    </>
  );
};

export default Navbar;
