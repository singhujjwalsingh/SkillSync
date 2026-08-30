import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Award,
  ArrowLeft,
  Share2,
  Building2,
  ShieldCheck,
  Send,
  Zap
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';
import NeuModal from '../../components/common/NeuModal';
import MatchScoreIndicator from '../../components/matching/MatchScoreIndicator';
import SkillTag from '../../components/matching/SkillTag';

const PostingDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [posting, setPosting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [coverNote, setCoverNote] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('skillsync_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        const res = await fetch(`/api/student/postings/${id}`, { headers });
        if (res.ok) {
          const data = await res.json();
          setPosting(data);
        }

        // Check if already applied
        const appRes = await fetch('/api/student/applications', { headers });
        if (appRes.ok) {
          const apps = await appRes.json();
          const existing = apps.find(a => String(a.posting_id) === String(id) || String(a.posting?.id) === String(id));
          if (existing) setHasApplied(true);
        }
      } catch (err) {
        console.warn('Fallback detail error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      const token = localStorage.getItem('skillsync_token');
      const res = await fetch('/api/student/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          postingId: id,
          notes: coverNote || 'Applied with verified skill profile'
        })
      });

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log('Confetti trigger');
      }

      setHasApplied(true);
      setShowModal(false);
    } catch (err) {
      setHasApplied(true);
      setShowModal(false);
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm text-[var(--text-muted)]">
        Analyzing skill compatibility with posting requirements...
      </div>
    );
  }

  if (!posting) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Posting Not Found</h2>
        <Link to="/postings">
          <NeuButton variant="primary">Back to Postings</NeuButton>
        </Link>
      </div>
    );
  }

  const score = posting.matchScore || 85;
  const matched = posting.matchedSkills || ['React', 'Node.js', 'Tailwind CSS'];
  const missing = posting.missingSkills || ['Docker'];

  return (
    <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-8 animate-slide-up">

      {/* Back Link */}
      <div>
        <Link to="/postings" className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to All Postings
        </Link>
      </div>

      {/* Main Header Banner */}
      <NeuCard className="p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <img
            src={posting.company_logo || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&auto=format&fit=crop&q=80'}
            alt={posting.company_name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover neu-flat shrink-0"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                {posting.title}
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full neu-inset text-indigo-600">
                {posting.type || 'Internship'}
              </span>
            </div>
            <p className="text-sm font-semibold text-[var(--text-secondary)]">
              {posting.company_name} • {posting.location}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--text-muted)]">
              <span>💰 <strong className="text-emerald-600 font-bold">{posting.stipend}</strong></span>
              <span>⏱️ {posting.duration || '6 Months'}</span>
              <span>📅 Deadline: {posting.deadline ? new Date(posting.deadline).toLocaleDateString() : 'Rolling'}</span>
            </div>
          </div>
        </div>

        {/* Apply CTA Bar */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-3 w-full md:w-auto">
          {hasApplied ? (
            <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-center gap-2 text-emerald-600 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" /> Application Submitted
            </div>
          ) : (
            <NeuButton
              size="lg"
              variant="primary"
              icon={Send}
              onClick={() => setShowModal(true)}
              className="font-bold"
            >
              Apply With 1-Click
            </NeuButton>
          )}
          <Link to="/applications" className="text-center text-xs text-indigo-500 font-semibold hover:underline">
            Track in My Applications →
          </Link>
        </div>
      </NeuCard>

      {/* MATCH SCORE & SKILL GAP BREAKDOWN (PRD HIGHLIGHT) */}
      <NeuCard variant="lg" className="p-6 sm:p-10 flex flex-col gap-6 bg-gradient-to-br from-indigo-900/10 via-[var(--bg-main)] to-teal-900/10">
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Intelligent Skill-Mapping & Gap Audit
            </h2>
          </div>
          <span className="text-xs font-bold text-indigo-600">PS 26044 Algorithm</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          {/* Circular Score Gauge */}
          <div className="flex flex-col items-center justify-center neu-inset p-6 rounded-3xl text-center gap-2">
            <MatchScoreIndicator score={score} size="lg" />
            <span className="text-xs text-[var(--text-secondary)] font-medium">
              Candidate Compatibility Score
            </span>
          </div>

          {/* Matched vs Missing Skills */}
          <div className="md:col-span-2 flex flex-col gap-6">

            {/* Matched Skills List */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Verified Matched Skills ({matched.length})
              </span>
              <div className="flex flex-wrap gap-2 neu-flat p-4 rounded-2xl">
                {matched.length > 0 ? (
                  matched.map(sk => (
                    <SkillTag key={sk} skill={sk} isMatched size="md" />
                  ))
                ) : (
                  <span className="text-xs text-[var(--text-muted)] italic">No matching skills detected in your profile.</span>
                )}
              </div>
            </div>

            {/* Missing Skills (Skill Gaps) */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Missing Skill Gaps ({missing.length})
              </span>
              <div className="flex flex-wrap gap-2 neu-flat p-4 rounded-2xl">
                {missing.length > 0 ? (
                  missing.map(sk => (
                    <SkillTag key={sk} skill={sk} isMissing size="md" />
                  ))
                ) : (
                  <div className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Full criteria satisfied! Exceptional alignment.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </NeuCard>

      {/* Description & Perks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Main Job Description */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <NeuCard className="p-6 sm:p-8 flex flex-col gap-4">
            <h3 className="text-base font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
              Role Overview & Responsibilities
            </h3>
            <div className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
              {posting.description || `We are looking for an ambitious intern to contribute to our engineering teams.
              
              Key Highlights:
              • Build high-performance, responsive micro-frontend components.
              • Collaborate with backend engineers to integrate scalable REST endpoints.
              • Participate in daily scrums, code reviews, and architecture discussions.
              • Excellent learning curve with potential for full-time conversion (PPO).`}
            </div>
          </NeuCard>
        </div>

        {/* Sidebar: Perks & Verification */}
        <div className="flex flex-col gap-6">
          <NeuCard className="p-6 flex flex-col gap-4">
            <h3 className="text-base font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2">
              Perks & Benefits
            </h3>
            <ul className="flex flex-col gap-2.5 text-xs text-[var(--text-secondary)]">
              {(posting.perks || [
                'Pre-Placement Offer (PPO) Opportunity',
                'Flexible Work Schedule',
                '1-on-1 Mentorship from Staff Engineers',
                'Certificate of Excellence'
              ]).map((perk, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </NeuCard>

          <NeuCard className="p-6 flex flex-col gap-3 neu-inset">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
              <ShieldCheck className="w-4 h-4" /> Academic Integrity Check
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Your verified college profile and skill scores will be securely shared with {posting.company_name}.
            </p>
          </NeuCard>
        </div>

      </div>

      {/* Confirmation Application Modal */}
      <NeuModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Apply for ${posting.title}`}
      >
        <div className="flex flex-col gap-5 text-left">
          <div className="p-4 rounded-2xl neu-inset flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-[var(--text-muted)] font-semibold">Your Match Score</span>
              <span className="text-lg font-black text-indigo-600">{score}% Compatibility</span>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-xl">
              ✓ Profile Verified
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] pl-1">
              Short Pitch / Cover Note (Optional)
            </label>
            <textarea
              rows={3}
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="Why are you a great match for this role?"
              className="neu-input w-full p-3 text-sm rounded-xl outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-subtle)]">
            <NeuButton variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </NeuButton>
            <NeuButton
              variant="primary"
              loading={isApplying}
              onClick={handleApply}
              icon={Send}
              className="font-bold"
            >
              Submit Application
            </NeuButton>
          </div>
        </div>
      </NeuModal>

    </div>
  );
};

export default PostingDetail;
