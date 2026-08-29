import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Award,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';

const ROLE_OPTIONS = [
  {
    role: 'student',
    title: 'Student',
    desc: 'Apply to verified internships & track skill matching',
    icon: Award
  },
  {
    role: 'recruiter',
    title: 'Recruiter',
    desc: 'Post job openings & evaluate matched applicants',
    icon: Briefcase
  },
  {
    role: 'college_tpo',
    title: 'College TPO',
    desc: 'Approve students & analyze placement metrics',
    icon: GraduationCap
  }
];

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const result = await register(name, email, password, role);
    setIsLoading(false);

    if (result.success) {
      if (role === 'student') {
        navigate('/profile'); // Guide student to setup profile wizard!
      } else {
        navigate('/dashboard');
      }
    } else {
      setErrorMsg(result.error || 'Failed to create account');
    }
  };

  return (
    <div className="relative z-10 min-h-[90vh] flex items-center justify-center px-4 py-12">
      <NeuCard variant="lg" className="max-w-lg w-full p-8 flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center neu-flat">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
            Create Account
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Choose your role to get started with SkillSync
          </p>
        </div>

        {/* Role Selector Cards */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Select Your Role
          </label>
          <div className="grid grid-cols-3 gap-2">
            {ROLE_OPTIONS.map(opt => {
              const active = role === opt.role;
              const Icon = opt.icon;
              return (
                <button
                  key={opt.role}
                  type="button"
                  onClick={() => setRole(opt.role)}
                  className={`p-3 rounded-2xl text-center flex flex-col items-center gap-1.5 transition-all ${
                    active
                      ? 'neu-inset text-indigo-600 dark:text-indigo-400 font-extrabold ring-2 ring-indigo-500/40'
                      : 'neu-btn text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-bold">{opt.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {errorMsg && (
            <div className="p-3 text-xs text-rose-600 bg-rose-500/10 border border-rose-500/20 rounded-xl neu-inset font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              {role === 'recruiter' ? 'Company / HR Representative Name' : 'Full Name'}
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="neu-input w-full py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] rounded-xl outline-none"
                placeholder={role === 'recruiter' ? 'e.g. John Doe (Nexus Cloud)' : 'e.g. Aarav Sharma'}
              />
            </div>
          </div>

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
                placeholder="name@institution.edu"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
              Password (min 6 characters)
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="neu-input w-full py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] rounded-xl outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <NeuButton
            type="submit"
            size="lg"
            loading={isLoading}
            icon={ArrowRight}
            className="w-full font-bold mt-2"
          >
            Create {role === 'student' ? 'Student' : role === 'recruiter' ? 'Recruiter' : 'TPO'} Account
          </NeuButton>
        </form>

        {/* Footer Link */}
        <div className="text-center text-xs text-[var(--text-secondary)]">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </NeuCard>
    </div>
  );
};

export default Signup;
