import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Award, Briefcase, User, BookOpen, 
  ChevronRight, Sparkles, LogOut, Menu, X, Users
} from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  // Configuration for Sidebar links based on role
  const getSidebarLinks = () => {
    switch (role) {
      case 'student':
        return [
          { label: 'Overview', path: '/student/dashboard', icon: LayoutDashboard },
          { label: 'Skill Assessment', path: '/student/assessment', icon: Award },
          { label: 'Jobs & Internships', path: '/student/jobs', icon: Briefcase },
          { label: 'Digital Portfolio', path: '/student/portfolio', icon: User },
        ];
      case 'industry':
        return [
          { label: 'Overview', path: '/industry/dashboard', icon: LayoutDashboard },
          { label: 'Learning Programs', path: '/industry/learning', icon: BookOpen },
        ];
      case 'academician':
        return [
          { label: 'Overview', path: '/academic/dashboard', icon: LayoutDashboard },
        ];
      case 'institution':
        return [
          { label: 'Overview', path: '/institution/dashboard', icon: LayoutDashboard },
        ];
      default:
        return [];
    }
  };

  const links = getSidebarLinks();

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-slate-950 text-slate-100">
      
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-20 left-4 z-40">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 bg-slate-900 border border-slate-800 text-white rounded-xl shadow-lg"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        className={`bg-slate-900/40 border-r border-slate-900 transition-all duration-300 z-30
          ${collapsed ? 'w-20' : 'w-64'} 
          ${mobileOpen ? 'fixed inset-y-16 left-0 w-64 bg-slate-900' : 'hidden md:flex md:flex-col'}
        `}
      >
        <div className="flex flex-col h-full justify-between p-4 pt-8 md:pt-6">
          <div className="space-y-6">
            
            {/* Header in sidebar */}
            <div className="flex items-center justify-between px-2">
              {!collapsed && (
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">Dashboard</span>
                  <span className="text-sm font-semibold text-slate-200 truncate capitalize">{role} Hub</span>
                </div>
              )}
              <button 
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:block p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-1.5">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                      ${isActive 
                        ? 'bg-purple-600/10 border border-purple-500/25 text-purple-400' 
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'}
                    `}
                  >
                    <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    {!collapsed && <span>{link.label}</span>}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* User Details card & Logout */}
          <div className="space-y-3">
            {!collapsed && (
              <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-2xl flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold text-[10px]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-slate-300 truncate max-w-[120px]">{user.name}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate">{user.email}</div>
              </div>
            )}
            
            <button
              onClick={() => {
                logout();
                window.location.href = '/';
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/10 cursor-pointer"
            >
              <LogOut className="w-4.5 h-4.5 shrink-0" />
              {!collapsed && <span>Log Out</span>}
            </button>
          </div>

        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full relative">
        {/* Background gradient flares to look high-end */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/5 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-500/5 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />
        
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;
