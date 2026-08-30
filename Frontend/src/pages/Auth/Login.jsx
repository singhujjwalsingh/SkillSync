import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Award,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';

const DEMO_PERSONAS = [
  {
    role: 'student',
    label: 'Student',
    email: 'student@skillsync.edu',
    password: 'password123',
    icon: Award,
    desc: 'Aarav Sharma (CSE)'
  },
  {
    role: 'recruiter',
    label: 'Recruiter',
    email: 'recruiter@skillsync.io',
    password: 'password123',
    icon: Briefcase,
    desc: 'Nexus Cloud Tech'
  },
  {
    role: 'college_tpo',
    label: 'College TPO',
    email: 'tpo@skillsync.edu',
    password: 'password123',
    icon: GraduationCap,
    desc: 'NIT Delhi Admin'
  }
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('student@skillsync.edu');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam) {
      const matched = DEMO_PERSONAS.find(p => p.role === roleParam || (roleParam === 'industry' && p.role === 'recruiter') || (roleParam === 'institution' && p.role === 'college_tpo'));
      if (matched) {
        setSelectedRole(matched.role);
        setEmail(matched.email);
        setPassword(matched.password);
      }
    }
  }, [location.search]);

  const selectPersona = (persona) => {
    setSelectedRole(persona.role);
    setEmail(persona.email);
    setPassword(persona.password);
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const result = await login(email, password, selectedRole);
    setIsLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(result.error || 'Invalid email or password');
    }
  };

  return (
    <div className="relative z-10 min-h-[85vh] flex items-center justify-center px-4 py-12">
      <NeuCard variant="lg" className="max-w-md w-full p-8 flex flex-col gap-6">

        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
            Welcome Back
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Sign in to your SkillSync collaborative portal
          </p>
        </div>

        {/* 1-Click Demo Switcher Tabs */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] text-center">
            ⚡ 1-Click Demo Quick Login
          </label>
          <div className="grid grid-cols-3 gap-2 neu-inset p-1.5 rounded-2xl">
            {DEMO_PERSONAS.map(p => {
              const active = selectedRole === p.role;
              const Icon = p.icon;
              return (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => selectPersona(p)}
                  className={`p-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-1 ring-indigo-500/30'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {errorMsg && (
            <div className="p-3 text-xs text-rose-600 bg-rose-500/10 border border-rose-500/20 rounded-xl neu-inset font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="neu-input w-full py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] rounded-xl outline-none"
                placeholder="name@skillsync.edu"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Password
              </label>
              <Link to="/forgot-password" className="text-xs text-indigo-500 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="neu-input w-full py-2.5 pl-10 pr-10 text-sm text-[var(--text-primary)] rounded-xl outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <NeuButton
            type="submit"
            size="lg"
            loading={isLoading}
            icon={ArrowRight}
            className="w-full font-bold mt-2"
          >
            Sign In to {selectedRole === 'student' ? 'Student Portal' : selectedRole === 'recruiter' ? 'Recruiter Hub' : 'TPO Console'}
          </NeuButton>
        </form>

        {/* Footer Link */}
        <div className="text-center text-xs text-[var(--text-secondary)]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
            Register New Account
          </Link>
        </div>

      </NeuCard>
    </div>
  );
};

export default Login;
