import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Layers
} from 'lucide-react';

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setErrorMsg('');
    setIsLoading(true);

    const result = await register(name, email, password, role);
    setIsLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="relative z-10 min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full neu-flat-lg p-6 sm:p-10 space-y-6 relative">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/20 mb-1">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Create Account
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Join the verified talent network
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {errorMsg && (
            <div className="neu-inset-sm p-3.5 text-xs text-rose-500 font-medium rounded-xl border border-rose-500/20 bg-rose-500/10 animate-in fade-in">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Full Name</label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Aarav Mehta"
                className="neu-input pl-10"
              />
            </div>
          </div>

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
                placeholder="name@university.edu"
                className="neu-input pl-10"
              />
            </div>
          </div>

          {/* Role Dropdown Selector */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Ecosystem Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="neu-input py-2.5 text-sm cursor-pointer"
            >
              <option value="student">Student / Learner</option>
              <option value="industry">Industry Partner</option>
              <option value="academician">Faculty / Mentor</option>
              <option value="institution">University Admin</option>
            </select>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">Secure Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Min 8+ characters"
                className="neu-input pl-10 pr-10"
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

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="neu-btn-primary w-full py-3 text-sm font-bold shadow-xl flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Profile...
              </span>
            ) : (
              <span>Complete Registration</span>
            )}
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 text-xs text-[var(--text-secondary)] border-t border-[var(--border-subtle)]">
          Already have a SkillSync account?{' '}
          <Link to="/login" className="text-indigo-500 font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;
