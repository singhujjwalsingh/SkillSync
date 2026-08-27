import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, Briefcase, GraduationCap, School, Layers, AlertCircle } from 'lucide-react';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Set default role from URL if present
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam && ['student', 'industry', 'academician', 'institution'].includes(roleParam)) {
      setRole(roleParam);
      autoFill(roleParam);
    } else {
      autoFill('student');
    }
  }, [searchParams]);

  const autoFill = (selectedRole) => {
    setEmail(`${selectedRole}@skillsync.dev`);
    setPassword('password123');
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    autoFill(newRole);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all credentials.');
      return;
    }

    setLoading(true);

    // Simulate short loading delay for realistic effect
    setTimeout(() => {
      try {
        login(email, password, role);
        setLoading(false);
        // Redirect to respective dashboard
        if (role === 'student') navigate('/student/dashboard');
        else if (role === 'industry') navigate('/industry/dashboard');
        else if (role === 'academician') navigate('/academic/dashboard');
        else if (role === 'institution') navigate('/institution/dashboard');
      } catch (err) {
        setError('Login failed. Please try again.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-slate-950">
      
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-2xl glassmorphism z-10">
        
        {/* Title */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white shadow-lg shadow-purple-500/20">
              <Layers className="w-6 h-6" />
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Sign in to your account</h2>
          <p className="mt-2 text-xs text-slate-400">Select your workspace role to begin</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-4 gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          {[
            { id: 'student', label: 'Student', icon: User },
            { id: 'industry', label: 'Industry', icon: Briefcase },
            { id: 'academician', label: 'Faculty', icon: GraduationCap },
            { id: 'institution', label: 'Admin', icon: School },
          ].map((r) => {
            const Icon = r.icon;
            const isSelected = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleChange(r.id)}
                className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl text-[10px] font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-medium animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-300">Email address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:border-purple-500 focus:outline-none transition-all placeholder-slate-600"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <a href="#forgot" className="text-[10px] font-medium text-purple-400 hover:text-purple-300">Forgot?</a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:border-purple-500 focus:outline-none transition-all placeholder-slate-600"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex justify-between bg-slate-950/50 p-2.5 rounded-xl border border-slate-900">
            <span>Demo Mode: Credentials auto-loaded</span>
            <span className="font-semibold text-purple-400">JWT Authenticated</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-sm font-semibold text-white shadow-xl shadow-purple-600/15 hover:shadow-purple-600/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          <p className="text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to={`/register?role=${role}`} className="font-semibold text-purple-400 hover:text-purple-300">
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
