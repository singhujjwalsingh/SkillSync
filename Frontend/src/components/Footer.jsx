import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Heart,
  ShieldCheck,
  Zap,
  Globe,
  MessageCircle,
  Share2
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="mt-20 border-t border-[var(--border-subtle)] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 p-[2px] shadow-md">
                <div className="w-full h-full rounded-[14px] flex items-center justify-center bg-slate-900/40 text-white">
                  <Layers className="w-4 h-4 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                SkillSync
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
              The verified, tactile skill benchmarking and enterprise synergy platform bridging the gap between education, student talent, and global industry opportunities.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="neu-icon-btn"
                aria-label="GitHub"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="neu-icon-btn"
                aria-label="Community"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="neu-icon-btn"
                aria-label="Network"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Platform</h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><Link to="/#features" className="hover:text-indigo-500 transition-colors">Features</Link></li>
              <li><Link to="/#roles" className="hover:text-indigo-500 transition-colors">Role Synergies</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-500 transition-colors">Live Dashboard</Link></li>
              <li><Link to="/#matrix" className="hover:text-indigo-500 transition-colors">Skill Matcher</Link></li>
            </ul>
          </div>

          {/* Ecosystem Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li><Link to="/login" className="hover:text-indigo-500 transition-colors">Student Portal</Link></li>
              <li><Link to="/login" className="hover:text-indigo-500 transition-colors">Industry Partner Hub</Link></li>
              <li><Link to="/login" className="hover:text-indigo-500 transition-colors">Academic Hub</Link></li>
              <li><Link to="/login" className="hover:text-indigo-500 transition-colors">Institution Admin</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">Stay Updated</h4>
            <p className="text-xs text-[var(--text-secondary)]">
              Get monthly digest on skill trends, industry hiring matrices, and platform updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="neu-input text-xs py-2 px-3"
                />
                <button
                  type="submit"
                  className="neu-btn-primary p-2.5 rounded-xl shrink-0"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-500 font-medium flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-3 h-3" /> Subscribed successfully!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SkillSync Core v2.4.0 Online</span>
          </div>

          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> & Neumorphic Design System
          </p>

          <p>© {new Date().getFullYear()} SkillSync Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
