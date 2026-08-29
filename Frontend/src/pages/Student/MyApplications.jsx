import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  Calendar,
  Award,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';
import StatusTimeline from '../../components/matching/StatusTimeline';
import MatchScoreIndicator from '../../components/matching/MatchScoreIndicator';

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('skillsync_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const res = await fetch('/api/student/applications', { headers });
        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        }
      } catch (err) {
        console.warn('Fallback applications error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const filtered = applications.filter(app => {
    if (activeFilter === 'all') return true;
    return app.status === activeFilter;
  });

  return (
    <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col gap-8 animate-slide-up">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-indigo-600 bg-indigo-500/10 border border-indigo-500/20 mb-2">
            <Briefcase className="w-3.5 h-3.5" /> Pipeline Tracking
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">
            My Applications & Status Timeline
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Real-time status transitions with transparent recruiter feedback and interview schedules.
          </p>
        </div>

        <Link to="/postings">
          <NeuButton variant="primary" icon={Search} size="sm" className="font-bold">
            Explore More Openings
          </NeuButton>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="grid grid-cols-4 gap-2 neu-inset p-1.5 rounded-2xl max-w-lg">
        {[
          { id: 'all', label: 'All Applications' },
          { id: 'shortlisted', label: 'Shortlisted' },
          { id: 'interview', label: 'Interview' },
          { id: 'offered', label: 'Offered' },
        ].map(tab => {
          const active = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                active
                  ? 'bg-indigo-600 text-white neu-sm shadow-md'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Applications Roster */}
      {loading ? (
        <div className="neu-inset p-16 rounded-3xl text-center text-sm text-[var(--text-muted)]">
          Retrieving application pipelines...
        </div>
      ) : filtered.length === 0 ? (
        <NeuCard className="p-12 text-center flex flex-col items-center gap-3">
          <Briefcase className="w-8 h-8 text-indigo-500 opacity-60" />
          <h3 className="text-lg font-bold text-[var(--text-primary)]">No Applications in this Category</h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm">
            You haven't submitted applications with status "{activeFilter}". Browse verified postings to apply!
          </p>
          <Link to="/postings">
            <NeuButton size="sm" variant="primary">
              Browse Openings
            </NeuButton>
          </Link>
        </NeuCard>
      ) : (
        <div className="flex flex-col gap-6">
          {filtered.map(app => {
            const posting = app.posting || {};
            const history = Array.isArray(app.status_history) ? app.status_history : [];

            return (
              <NeuCard key={app.id} className="p-6 sm:p-8 flex flex-col gap-6">
                
                {/* Application Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-4">
                    <img
                      src={posting.company_logo || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&auto=format&fit=crop&q=80'}
                      alt={posting.company_name}
                      className="w-12 h-12 rounded-2xl object-cover neu-flat shrink-0"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                        {posting.title || 'Internship Application'}
                      </h3>
                      <span className="text-xs font-semibold text-[var(--text-secondary)]">
                        {posting.company_name || 'Partner Company'} • {posting.location || 'Remote'} • <strong className="text-emerald-600">{posting.stipend || 'Competitive'}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MatchScoreIndicator score={app.match_score || 85} size="badge" />
                    {posting.id && (
                      <Link to={`/postings/${posting.id}`}>
                        <NeuButton size="sm" variant="secondary" icon={ExternalLink}>
                          View Posting
                        </NeuButton>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Pipeline Stepper (Interactive Timeline) */}
                <div className="px-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2 block">
                    Recruitment Stage Progress
                  </span>
                  <StatusTimeline
                    currentStatus={app.status}
                    statusHistory={history}
                    layout="horizontal"
                  />
                </div>

                {/* Latest Audit Note / Recruiter Remarks */}
                {history.length > 0 && (
                  <div className="neu-inset p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">Latest Update:</span>
                      <span className="text-[var(--text-primary)] font-medium">
                        {history[history.length - 1]?.note || 'Application under active evaluation.'}
                      </span>
                    </div>
                    <span className="text-[11px] text-[var(--text-muted)] shrink-0 font-medium">
                      {history[history.length - 1]?.date ? new Date(history[history.length - 1].date).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                )}

              </NeuCard>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default MyApplications;
