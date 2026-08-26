import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 text-slate-400 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-md">
                <Layers className="w-4.5 h-4.5" />
              </span>
              <span>
                Skill<span className="text-purple-400">Sync</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              SkillSync is a centralized Academia–Industry Collaboration Portal built for Smart India Hackathon (SIH) 2026, bridging the gap between student skills and industry demands.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h5 className="text-white text-sm font-semibold mb-4">Modules</h5>
            <ul className="space-y-2 text-xs">
              <li><Link to="/student/assessment" className="hover:text-purple-400 transition-colors">Skill Evaluation</Link></li>
              <li><Link to="/student/jobs" className="hover:text-purple-400 transition-colors">Internship Matching</Link></li>
              <li><Link to="/industry/learning" className="hover:text-purple-400 transition-colors">Learning Hub</Link></li>
              <li><Link to="/academic/dashboard" className="hover:text-purple-400 transition-colors">Academic Collaborations</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-white text-sm font-semibold mb-4">Resources</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">Documentation</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">F.A.Q.</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">API References</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social / Contact */}
          <div>
            <h5 className="text-white text-sm font-semibold mb-4">Smart India Hackathon</h5>
            <p className="text-xs leading-relaxed text-slate-500 mb-4">
              Designed & developed for SIH 2026 under problem statements focusing on Skill Assessment & Placement Tracking.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all flex items-center justify-center">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="mailto:support@skillsync.sih" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SkillSync Portal. All rights reserved.</p>
          <p>Built for SIH 2026 | Team SkillSync</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
