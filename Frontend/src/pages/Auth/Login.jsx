import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  Award, 
  BarChart3, 
  Layers
} from 'lucide-react';

const ROLES = [
  { id: 'student', label: 'Student', icon: GraduationCap },
  { id: 'industry', label: 'Industry', icon: Building2 },
  { id: 'academician', label: 'Faculty', icon: Award },
  { id: 'institution', label: 'University', icon: BarChart3 },
];

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
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
    <div className="relative z-10 min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-md w-full neu-flat-lg p-6 sm:p-10 space-y-6 relative">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20 mb-1">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Sign in to access your calibrated SkillSync ecosystem
          </p>
        </div>

        {/* Neumorphic Role Selector Tab Group */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
            Select Your Role
          </label>
          <div className="grid grid-cols-4 gap-1.5 p-1.5 neu-inset-sm rounded-2xl">
            {ROLES.map((r) => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleChange(r.id)}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    isSelected
                      ? 'neu-flat text-indigo-500 shadow-md font-bold'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] tracking-tight">{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>



        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          
          {errorMsg && (
            <div className="neu-inset-sm p-3 text-xs text-rose-500 font-medium rounded-xl border border-rose-500/20 bg-rose-500/10 animate-in fade-in">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="neu-input pl-10"
                placeholder="name@organization.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Password</label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Please contact support to reset your password."); }} className="text-[11px] text-indigo-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="neu-input pl-10 pr-10"
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

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-indigo-500 cursor-pointer"
              />
              <span>Remember this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="neu-btn-primary w-full py-3 text-sm font-semibold shadow-lg"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Sign In as {ROLES.find(r => r.id === selectedRole)?.label}</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>

        </form>



        {/* Signup Redirect */}
        <div className="text-center pt-2 text-xs text-[var(--text-secondary)]">
          Don't have a SkillSync account?{' '}
          <Link to="/signup" className="text-indigo-500 font-bold hover:underline">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
