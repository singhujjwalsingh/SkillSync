import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Award, Briefcase, GraduationCap, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

const DEMO_ACCOUNTS = [
  {
    role: 'student',
    name: 'Aarav Sharma (Student)',
    email: 'student@skillsync.edu',
    password: 'password123',
    icon: Award,
    color: 'bg-indigo-600'
  },
  {
    role: 'recruiter',
    name: 'Nexus Cloud (Recruiter)',
    email: 'recruiter@skillsync.io',
    password: 'password123',
    icon: Briefcase,
    color: 'bg-teal-600'
  },
  {
    role: 'college_tpo',
    name: 'NIT Delhi (TPO Admin)',
    email: 'tpo@skillsync.edu',
    password: 'password123',
    icon: GraduationCap,
    color: 'bg-purple-600'
  }
];

const DemoSwitcher = () => {
  const { login, role } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSwitch = async (account) => {
    setLoading(true);
    await login(account.email, account.password, account.role);
    setLoading(false);
    setIsOpen(false);
    navigate('/dashboard');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="neu-flat p-3 rounded-2xl shadow-2xl flex flex-col gap-2 w-64 bg-[var(--bg-main)] animate-scale-up border border-[var(--border-subtle)]">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
            <span className="text-[10px] uppercase font-black tracking-wider text-[var(--text-muted)] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              SIH Demo Persona Switcher
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            {DEMO_ACCOUNTS.map(acc => {
              const isActive = role === acc.role;
              const Icon = acc.icon;
              return (
                <button
                  key={acc.role}
                  disabled={loading}
                  onClick={() => handleSwitch(acc)}
                  className={`p-2.5 rounded-xl text-left text-xs font-bold flex items-center justify-between transition-all ${
                    isActive
                      ? 'neu-inset text-indigo-600 dark:text-indigo-400 font-extrabold'
                      : 'neu-btn text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-lg text-white flex items-center justify-center ${acc.color}`}>
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className="truncate">{acc.name}</span>
                  </div>
                  {isActive && <span className="text-[10px] text-emerald-500 font-black">ACTIVE</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-2xl neu-flat text-xs font-bold text-[var(--text-primary)] flex items-center gap-2 hover:scale-105 transition-all shadow-xl bg-[var(--bg-main)] cursor-pointer"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
          {role || 'Demo'}
        </span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};

export default DemoSwitcher;
