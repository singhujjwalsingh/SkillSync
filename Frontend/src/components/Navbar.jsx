import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Layers, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X, 
  LayoutDashboard
} from 'lucide-react';

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header className="sticky top-3 z-50 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all duration-300">
      <nav className="neu-flat px-4 sm:px-6 py-3 flex items-center justify-between backdrop-blur-md">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-[14px] flex items-center justify-center bg-slate-900/40 backdrop-blur-xs text-white">
              <Layers className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              SkillSync
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
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'neu-inset text-indigo-500 font-semibold' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:neu-flat-sm'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Controls: Auth Only */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="neu-btn px-3.5 py-2 text-sm flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  {(user?.name || user?.email || 'User').charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-semibold leading-none truncate max-w-[100px]">{user?.name || user?.email || 'User'}</p>
                  <p className="text-[10px] text-[var(--text-muted)] capitalize">{role || 'User'}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 neu-flat p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 border-b border-[var(--border-subtle)]">
                    <p className="text-xs text-[var(--text-muted)]">Signed in as</p>
                    <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{user?.email}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-indigo-500/15 text-indigo-500">
                      {role}
                    </span>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl hover:neu-inset-sm transition-all text-[var(--text-primary)]"
                    >
                      <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                      Dashboard
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="neu-btn px-4 py-2 text-xs font-semibold text-[var(--text-primary)]"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="neu-btn-primary px-4 py-2 text-xs font-semibold"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="neu-icon-btn w-9 h-9"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 neu-flat p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium ${
                  location.pathname === link.path ? 'neu-inset text-indigo-500 font-semibold' : 'text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-col gap-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm text-rose-500 font-medium neu-inset-sm"
              >
                <LogOut className="w-4 h-4" />
                Sign Out ({user?.name || user?.email || 'User'})
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="neu-btn p-2.5 text-xs text-center font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="neu-btn-primary p-2.5 text-xs text-center font-semibold"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
