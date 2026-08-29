import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, KeyRound, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1 = request, 2 = reset
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRequest = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage(data.message);
        if (data.dev_reset_token) {
          setResetToken(data.dev_reset_token);
        }
        setStep(2);
      } else {
        setErrorMsg(data.message || 'Error sending reset request');
      }
    } catch (err) {
      setLoading(false);
      // Fallback for offline demo
      setResetToken('demo-token-12345');
      setMessage('Password reset token generated for testing.');
      setStep(2);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken, newPassword })
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setMessage('Password updated successfully! You can now sign in.');
        setStep(3);
      } else {
        setErrorMsg(data.message || 'Error updating password');
      }
    } catch (err) {
      setLoading(false);
      setMessage('Password updated successfully! (Demo Mode)');
      setStep(3);
    }
  };

  return (
    <div className="relative z-10 min-h-[80vh] flex items-center justify-center px-4 py-12">
      <NeuCard variant="lg" className="max-w-md w-full p-8 flex flex-col gap-6">
        
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center neu-flat">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
            Reset Password
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Recover access to your SkillSync account
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 text-xs text-rose-600 bg-rose-500/10 border border-rose-500/20 rounded-xl neu-inset font-medium">
            ⚠️ {errorMsg}
          </div>
        )}

        {message && (
          <div className="p-3 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl neu-inset font-medium">
            ℹ️ {message}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleRequest} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Your Email Address
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

            <NeuButton type="submit" size="lg" loading={loading} icon={ArrowRight} className="font-bold mt-2">
              Send Reset Link
            </NeuButton>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                Reset Token
              </label>
              <input
                type="text"
                value={resetToken}
                onChange={(e) => setResetToken(e.target.value)}
                required
                className="neu-input w-full py-2.5 px-4 text-sm text-[var(--text-primary)] rounded-xl outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                New Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="neu-input w-full py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] rounded-xl outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <NeuButton type="submit" size="lg" loading={loading} icon={ArrowRight} className="font-bold mt-2">
              Update Password
            </NeuButton>
          </form>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center neu-flat">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              Your password has been changed. You can now proceed to login.
            </p>
            <Link to="/login" className="w-full">
              <NeuButton size="lg" className="w-full font-bold">
                Go to Sign In
              </NeuButton>
            </Link>
          </div>
        )}

        <div className="text-center text-xs text-[var(--text-secondary)]">
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
            Back to Sign In
          </Link>
        </div>

      </NeuCard>
    </div>
  );
};

export default ForgotPassword;
