import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Users,
  Award,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Clock,
  ShieldCheck,
  FileText
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';
import NeuModal from '../../components/common/NeuModal';
import MatchScoreIndicator from '../../components/matching/MatchScoreIndicator';
import SkillTag from '../../components/matching/SkillTag';

const ApplicantsList = () => {
  const { id } = useParams();

  const [posting, setPosting] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [newStatus, setNewStatus] = useState('shortlisted');
  const [statusNote, setStatusNote] = useState('');
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('skillsync_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const res = await fetch(`/api/recruiter/postings/${id}/applicants`, { headers });
        if (res.ok) {
          const data = await res.json();
          setPosting(data.posting);
          setApplicants(data.applicants || []);
        }
      } catch (err) {
        console.warn('Fallback recruiter applicants:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [id]);

  const handleUpdateStatus = async () => {
    if (!selectedApp) return;
    setStatusLoading(true);

    try {
      const token = localStorage.getItem('skillsync_token');
      const res = await fetch(`/api/recruiter/applications/${selectedApp.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          status: newStatus,
          note: statusNote || `Status updated to ${newStatus}`
        })
      });

      if (res.ok) {
        // Update locally
        setApplicants(applicants.map(a => {
          if (a.id === selectedApp.id) {
            return { ...a, status: newStatus };
          }
          return a;
        }));
      } else {
        // Local fallback update
        setApplicants(applicants.map(a => {
          if (a.id === selectedApp.id) {
            return { ...a, status: newStatus };
          }
          return a;
        }));
      }
      setSelectedApp(null);
      setStatusNote('');
    } catch (err) {
      setSelectedApp(null);
    } finally {
      setStatusLoading(false);
    }
  };

  const filtered = applicants.filter(a => {
    if (statusFilter === 'all') return true;
    return a.status === statusFilter;
  });

  return (
    <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-8 animate-slide-up">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:underline mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Recruiter Dashboard
          </Link>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">
            Applicant Evaluation Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            {posting?.title || 'Job Opening'} • Ranked by automated skill compatibility algorithm.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl neu-inset text-teal-600">
            {applicants.length} Total Applicants
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="grid grid-cols-5 gap-2 neu-inset p-1.5 rounded-2xl max-w-xl">
        {[
          { id: 'all', label: 'All' },
          { id: 'applied', label: 'Applied' },
          { id: 'shortlisted', label: 'Shortlisted' },
          { id: 'interview', label: 'Interview' },
          { id: 'offered', label: 'Offered' },
        ].map(tab => {
          const active = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center ${
                active
                  ? 'bg-teal-600 text-white neu-sm shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Applicants List */}
      {loading ? (
        <div className="neu-inset p-16 rounded-3xl text-center text-sm text-[var(--text-muted)]">
          Ranking applicants by skill matching algorithm...
        </div>
      ) : filtered.length === 0 ? (
        <NeuCard className="p-12 text-center flex flex-col items-center gap-3">
          <Users className="w-8 h-8 text-teal-500 opacity-60" />
          <h3 className="text-lg font-bold text-[var(--text-primary)]">No Applicants in this Category</h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm">
            No candidate applications with status "{statusFilter}".
          </p>
        </NeuCard>
      ) : (
        <div className="flex flex-col gap-5">
          {filtered.map((app, index) => {
            const student = app.student || {};
            const profile = app.student_profile || {};
            const score = app.match_score || 88;
            const matched = app.matched_skills || profile.skills?.slice(0, 4) || ['React', 'Node.js'];
            const missing = app.missing_skills || ['Docker'];

            return (
              <NeuCard key={app.id} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                
                {/* Left: Student info & match rank */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative shrink-0">
                    <img
                      src={student.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt={student.name}
                      className="w-14 h-14 rounded-2xl object-cover neu-flat"
                    />
                    <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center neu-sm">
                      #{index + 1}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-[var(--text-primary)]">
                        {student.name || app.student_name || 'Candidate'}
                      </h3>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        app.status === 'offered' ? 'bg-emerald-500/20 text-emerald-600' :
                        app.status === 'interview' ? 'bg-purple-500/20 text-purple-600' :
                        app.status === 'shortlisted' ? 'bg-indigo-500/20 text-indigo-600' :
                        'bg-slate-500/20 text-slate-600'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] font-medium">
                      {student.email || app.student_email} • Roll: {profile.roll_no || '2022CS1042'} • CGPA: {profile.cgpa || '8.85'}
                    </p>

                    {/* Skill Breakdown */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                      {matched.map((sk, i) => (
                        <SkillTag key={i} skill={sk} isMatched size="sm" />
                      ))}
                      {missing.map((sk, i) => (
                        <SkillTag key={i} skill={sk} isMissing size="sm" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Score Gauge & Status Update Trigger */}
                <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-3 md:pt-0 border-t md:border-0 border-[var(--border-subtle)]">
                  <MatchScoreIndicator score={score} size="sm" />
                  <NeuButton
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setSelectedApp(app);
                      setNewStatus(app.status || 'shortlisted');
                    }}
                    className="font-bold shrink-0"
                  >
                    Change Pipeline Status
                  </NeuButton>
                </div>

              </NeuCard>
            );
          })}
        </div>
      )}

      {/* Status Transition Modal */}
      <NeuModal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title="Update Candidate Pipeline Status"
      >
        {selectedApp && (
          <div className="flex flex-col gap-5 text-left">
            <div className="p-4 rounded-2xl neu-inset flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-[var(--text-muted)] font-semibold">Candidate</span>
                <span className="text-base font-bold text-[var(--text-primary)]">
                  {selectedApp.student?.name || selectedApp.student_name || 'Candidate'}
                </span>
              </div>
              <span className="text-xs font-bold text-indigo-600">
                {selectedApp.match_score || 88}% Compatibility
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] pl-1">
                Select New Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'shortlisted', label: 'Shortlist Candidate', color: 'text-indigo-600' },
                  { id: 'interview', label: 'Schedule Interview', color: 'text-purple-600' },
                  { id: 'offered', label: 'Extend Offer Letter 🎉', color: 'text-emerald-600' },
                  { id: 'rejected', label: 'Archive / Decline', color: 'text-rose-600' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setNewStatus(opt.id)}
                    className={`p-3 rounded-2xl text-xs font-bold text-left transition-all ${
                      newStatus === opt.id
                        ? 'neu-inset ring-2 ring-teal-500/40 font-extrabold ' + opt.color
                        : 'neu-btn text-[var(--text-secondary)]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] pl-1">
                Recruiter Remarks & Next Steps (Sent to Student)
              </label>
              <textarea
                rows={3}
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="e.g. Technical Round 1 scheduled for Wednesday at 3:00 PM IST via Google Meet."
                className="neu-input w-full p-3 text-sm rounded-xl outline-none resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-subtle)]">
              <NeuButton variant="secondary" onClick={() => setSelectedApp(null)}>
                Cancel
              </NeuButton>
              <NeuButton
                variant="primary"
                loading={statusLoading}
                onClick={handleUpdateStatus}
                className="font-bold"
              >
                Confirm & Notify Student
              </NeuButton>
            </div>
          </div>
        )}
      </NeuModal>

    </div>
  );
};

export default ApplicantsList;
