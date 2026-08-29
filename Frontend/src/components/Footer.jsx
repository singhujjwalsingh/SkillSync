import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Globe, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-[var(--border-subtle)] relative z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col sm:flex-row items-center justify-between gap-8">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center neu-flat font-black text-base shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black text-[var(--text-primary)]">
              SkillSync
            </span>
            <span className="text-xs text-[var(--text-muted)] font-semibold">
              Smart India Hackathon 2026 • PS 26044
            </span>
          </div>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-8 text-xs font-extrabold text-[var(--text-secondary)]">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/postings" className="hover:text-indigo-600 transition-colors">Opportunities</Link>
          <Link to="/login" className="hover:text-indigo-600 transition-colors">Sign In</Link>
          <Link to="/signup" className="hover:text-indigo-600 transition-colors">Register</Link>
        </div>

        {/* Right Credits */}
        <div className="text-xs text-[var(--text-muted)] font-medium text-center sm:text-right">
          Academia-Industry Collaboration & Placement Portal
        </div>

      </div>
    </footer>
  );
};

export default Footer;
