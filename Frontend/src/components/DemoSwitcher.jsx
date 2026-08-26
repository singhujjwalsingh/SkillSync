import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Settings, User, Briefcase, GraduationCap, School, LogOut, ChevronUp, ChevronDown } from 'lucide-react';

const DemoSwitcher = () => {
  const { user, role, switchRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { id: 'student', label: 'Student', icon: User, path: '/student/dashboard', color: 'text-blue-400 bg-blue-500/10' },
    { id: 'industry', label: 'Industry Recruiter', icon: Briefcase, path: '/industry/dashboard', color: 'text-emerald-400 bg-emerald-500/10' },
    { id: 'academician', label: 'Academician', icon: GraduationCap, path: '/academic/dashboard', color: 'text-amber-400 bg-amber-500/10' },
    { id: 'institution', label: 'Institution Admin', icon: School, path: '/institution/dashboard', color: 'text-purple-400 bg-purple-500/10' },
  ];

  const handleRoleChange = (roleId, path) => {
    switchRole(roleId);
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 text-white rounded-full border border-slate-700/80 shadow-2xl hover:bg-slate-800 transition-all duration-300 font-medium text-sm glassmorphism"
      >
        <Settings className={`w-4 h-4 text-purple-400 ${isOpen ? 'animate-spin' : ''}`} />
        <span>Demo Panel</span>
        {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-64 p-4 rounded-2xl bg-slate-900/95 border border-slate-700/85 shadow-2xl flex flex-col gap-2 glassmorphism animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="pb-2 border-b border-slate-800">
            <h4 className="font-semibold text-slate-200 text-sm">Switch User Role</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Toggle to view different workflows</p>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            {roles.map((r) => {
              const Icon = r.icon;
              const isActive = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => handleRoleChange(r.id, r.path)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/25'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`p-1 rounded-lg ${isActive ? 'bg-white/10 text-white' : r.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span>{r.label}</span>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </button>
              );
            })}
          </div>

          {user && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 mt-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-all duration-200 border border-transparent hover:border-rose-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out (Clear Session)</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DemoSwitcher;
