import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Layers, LogOut, ChevronDown, User } from 'lucide-react';

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

  // Define navigation links based on user role
  const getNavLinks = () => {
    switch (role) {
      case 'student':
        return [
          { label: 'Dashboard', path: '/student/dashboard' },
          { label: 'Skill Assessment', path: '/student/assessment' },
          { label: 'Jobs & Internships', path: '/student/jobs' },
          { label: 'Digital Portfolio', path: '/student/portfolio' },
        ];
      case 'industry':
        return [
          { label: 'Dashboard', path: '/industry/dashboard' },
          { label: 'Post Opportunity', path: '/industry/dashboard?action=post' },
          { label: 'Learning Programs', path: '/industry/learning' },
        ];
      case 'academician':
        return [
          { label: 'Dashboard', path: '/academic/dashboard' },
          { label: 'Opportunities Hub', path: '/academic/dashboard?tab=opportunities' },
        ];
      case 'institution':
        return [
          { label: 'Dashboard', path: '/institution/dashboard' },
          { label: 'Student Analytics', path: '/institution/dashboard?tab=students' },
        ];
      default:
        return [
          { label: 'Features', path: '/#features' },
          { label: 'Roles', path: '/#roles' },
          { label: 'Institution Info', path: '/#stats' },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-lg shadow-purple-500/20">
                <Layers className="w-5 h-5" />
              </span>
              <span>
                Skill<span className="text-purple-400">Sync</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  location.pathname === link.path ? 'text-purple-400' : 'text-slate-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-1.5 text-sm text-slate-300 hover:text-white hover:border-slate-700 transition-all cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-semibold text-[10px]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-slate-900 border border-slate-800 p-1 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-100">
                    <div className="px-3 py-2 text-xs border-b border-slate-800">
                      <p className="text-slate-400 font-normal">Signed in as</p>
                      <p className="text-slate-200 font-medium truncate mt-0.5">{user.email}</p>
                      <span className="inline-block px-1.5 py-0.5 mt-1 rounded text-[9px] font-semibold tracking-wider bg-purple-500/10 text-purple-400 uppercase">
                        {role}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm text-rose-400 hover:bg-slate-800/60 rounded-lg transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-600/15 hover:shadow-purple-600/25 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2 text-slate-400 hover:bg-slate-900 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block rounded-xl px-3 py-2 text-base font-medium ${
                location.pathname === link.path
                  ? 'bg-purple-600/10 text-purple-400'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-900 mt-2 space-y-2">
            {user ? (
              <>
                <div className="px-3 py-1">
                  <p className="text-sm text-slate-200 font-semibold">{user.name}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 text-left px-3 py-2 rounded-xl text-base font-medium text-rose-400 hover:bg-slate-900"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center rounded-xl px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center rounded-xl bg-purple-600 px-3 py-2 text-base font-medium text-white shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
