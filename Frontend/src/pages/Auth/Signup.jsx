import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  Building, 
  GraduationCap, 
  Building2, 
  Award, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Layers
} from 'lucide-react';

const ROLES = [
  { id: 'student', label: 'Student / Learner', icon: GraduationCap, desc: 'Assess skills & find internships' },
  { id: 'industry', label: 'Industry Partner', icon: Building2, desc: 'Hire pre-assessed engineering talent' },
  { id: 'academician', label: 'Faculty / Mentor', icon: Award, desc: 'Align curriculum & research projects' },
  { id: 'institution', label: 'University Admin', icon: BarChart3, desc: 'Track cohort outcomes & rankings' },
];

const SKILL_TAGS = [
  'React / Frontend',
  'Python & Data Engineering',
  'Node / Backend',
  'AWS Cloud DevOps',
  'System Architecture',
  'Cybersecurity',
  'Distributed Systems'
];

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(['React / Frontend', 'Python & Data Engineering']);
  const [showPassword, setShowPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return Math.min(score, 4);
  };

  const strength = getPasswordStrength();
  const strengthLabels = ['Too Weak', 'Fair', 'Good', 'Strong', 'Ultra Strong'];
  const strengthColors = ['bg-rose-500', 'bg-amber-500', 'bg-yellow-500', 'bg-emerald-500', 'bg-indigo-500'];

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
      <div className="max-w-2xl w-full neu-flat-lg p-6 sm:p-10 space-y-8 relative">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 text-white shadow-lg shadow-indigo-500/20 mb-1">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
            Create Your SkillSync Account
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            Join the verified talent network and experience tactile skills synchronization
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {errorMsg && (
            <div className="neu-inset-sm p-3.5 text-xs text-rose-500 font-medium rounded-xl border border-rose-500/20 bg-rose-500/10 animate-in fade-in">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Step 1: Role Selection Matrix */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider block">
              1. Choose Your Ecosystem Role
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROLES.map((r) => {
                const Icon = r.icon;
                const isSelected = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'neu-inset border border-indigo-500/30 scale-[0.98]'
                        : 'neu-btn text-[var(--text-primary)]'
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'neu-flat text-indigo-500' : 'bg-slate-500/10 text-[var(--text-muted)]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold ${isSelected ? 'text-indigo-500' : 'text-[var(--text-primary)]'}`}>
                          {r.label}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />}
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] leading-tight">{r.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Personal & Org Info */}
          <div className="space-y-4 pt-2">
            <label className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider block">
              2. Profile & Authentication Credentials
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
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

              {/* Email Address */}
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Institution / Org */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {role === 'student' ? 'College / University' : role === 'industry' ? 'Company / Enterprise' : 'Organization Name'}
                </label>
                <div className="relative flex items-center">
                  <Building className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder={role === 'student' ? 'e.g. IIT Bombay' : 'e.g. Google India'}
                    className="neu-input pl-10"
                  />
                </div>
              </div>

              {/* Password */}
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
            </div>

            {/* Password Strength Indicator */}
            {password && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-muted)]">Password Security:</span>
                  <span className="font-bold text-[var(--text-primary)]">{strengthLabels[strength]}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 neu-inset-sm p-1 rounded-full">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i < strength ? strengthColors[strength] : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Skill Domains / Interests */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider block">
              3. Focus Technical Domains
            </label>
            <div className="flex flex-wrap gap-2">
              {SKILL_TAGS.map((tag) => {
                const isSelected = selectedSkills.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleSkill(tag)}
                    className={`neu-pill text-xs cursor-pointer ${
                      isSelected ? 'active text-indigo-500 font-bold' : ''
                    }`}
                  >
                    <span>{tag}</span>
                    {isSelected && <CheckCircle2 className="w-3 h-3 text-indigo-500 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Terms Toggle */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                required
                className="mt-0.5 rounded accent-indigo-500 cursor-pointer"
              />
              <span>
                I agree to the <a href="#terms" className="text-indigo-500 font-semibold hover:underline">Terms of Service</a> and <a href="#privacy" className="text-indigo-500 font-semibold hover:underline">Privacy Policy</a> for verified talent calibration.
              </span>
            </label>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading || !termsAgreed}
            className="neu-btn-primary w-full py-3.5 text-sm font-bold shadow-xl flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating Verified Profile...
              </span>
            ) : (
              <span>Complete Registration & Open Dashboard</span>
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
