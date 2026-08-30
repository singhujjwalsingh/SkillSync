import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LogOut,
  ChevronDown,
  Menu,
  X,
  Bell,
  Sparkles
} from 'lucide-react';
import NotificationDrawer from './NotificationDrawer';

const Navbar = () => {
  const { user, role, logout } = useAuth();
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

  // Nav links matching reference mockup
  let navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Opportunities', path: '/postings' },
    { label: 'Researchers', path: '/profile' },
    { label: 'Industry Partners', path: '/login?role=recruiter' },
    { label: 'About', path: '/dashboard' }
  ];

  if (user) {
    if (role === 'student') {
      navLinks = [
        { label: 'Home', path: '/' },
        { label: 'Opportunities', path: '/postings' },
        { label: 'My Applications', path: '/applications' },
        { label: 'Skill Profile', path: '/profile' }
      ];
    } else if (role === 'recruiter' || role === 'industry') {
      navLinks = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Post Opportunity', path: '/recruiter/create-posting' },
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
      <header className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full transition-all duration-300">
        <nav className="bg-white/90 backdrop-blur-2xl px-6 sm:px-8 py-3.5 flex items-center justify-between rounded-full border border-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-xl bg-slate-950 text-white flex items-center justify-center font-black shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-950">
              SkillSync
            </span>
          </Link>

          {/* Desktop Nav Links (Centered with Underline Indicator) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-xs font-bold transition-all relative py-1 ${isActive
                    ? 'text-slate-950 font-black'
                    : 'text-slate-500 hover:text-slate-950'
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-950 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Notification Bell */}
            {user && (
              <button
                onClick={() => setNotificationOpen(true)}
                className="relative p-2 rounded-full text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
              </button>
            )}

            {/* Auth Buttons / Profile Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold flex items-center gap-2 shadow-xs text-slate-800"
                >
                  <img
                    src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline text-slate-800 truncate max-w-[100px]">
                    {user?.name || user?.email}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white p-2 rounded-2xl shadow-xl border border-slate-100 z-50 animate-scale-up">
                    <div className="p-3 border-b border-slate-100">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Signed in as</p>
                      <p className="text-xs font-bold text-slate-900 truncate">{user?.name || user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600">
                        {roleLabel}
                      </span>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:bg-slate-50 text-slate-700 font-semibold"
                      >
                        Dashboard
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 font-bold rounded-xl hover:bg-rose-50"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="px-5 py-1.5 rounded-xl border border-slate-900 text-xs font-bold text-slate-950 hover:bg-slate-900 hover:text-white transition-all shadow-xs"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="hidden sm:inline-flex px-5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-xl flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      <NotificationDrawer
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
    </>
  );
};

export default Navbar;
