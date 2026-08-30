import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Briefcase,
  Users,
  Award,
  Sparkles,
  Plus,
  Eye,
  Edit,
  Trash2,
  Building2,
  TrendingUp,
  MapPin,
  Calendar,
  DollarSign,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [postings, setPostings] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('skillsync_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        // Profile
        const profRes = await fetch('/api/recruiter/profile', { headers });
        if (profRes.ok) {
          const pData = await profRes.json();
          setProfile(pData.profile);
        }

        // Postings
        const postRes = await fetch('/api/recruiter/postings', { headers });
        if (postRes.ok) {
          const postData = await postRes.json();
          setPostings(postData);
        }
      } catch (err) {
        console.warn('Fallback recruiter dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalApplicants = postings.reduce((sum, p) => sum + (p.applicant_count || 0), 0);
  const totalShortlisted = postings.reduce((sum, p) => sum + (p.shortlisted_count || 0), 0);

  return (
    <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8 animate-slide-up">

      {/* 1. HERO BANNER */}
      <NeuCard className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-teal-900/10 via-[var(--bg-main)] to-indigo-900/10">
        <div className="flex items-center gap-5">
          <img
            src={profile?.logo_url || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&auto=format&fit=crop&q=80'}
            alt={profile?.company_name || 'Company'}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover neu-flat ring-2 ring-teal-500/20 shrink-0"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                {profile?.company_name || user?.name || 'Nexus Cloud Technologies'}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold text-teal-600 bg-teal-500/10 border border-teal-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Industry Partner
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
              {profile?.industry || 'Cloud Infrastructure & SaaS'} • {profile?.location || 'Bengaluru / Remote'} • {profile?.company_size || '250-500 Employees'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link to="/recruiter/profile">
            <NeuButton variant="secondary" icon={Building2} size="md">
              Company Profile
            </NeuButton>
          </Link>
          <Link to="/recruiter/create-posting">
            <NeuButton variant="primary" icon={Plus} size="md" className="font-bold">
              Create New Posting
            </NeuButton>
          </Link>
        </div>
      </NeuCard>

      {/* 2. STATS TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Openings', value: postings.length || 2, icon: Briefcase, color: 'text-indigo-600', sub: 'Accepting candidates' },
          { label: 'Total Candidates', value: totalApplicants || 8, icon: Users, color: 'text-teal-600', sub: 'Across all listings' },
          { label: 'Shortlisted Pool', value: totalShortlisted || 4, icon: Award, color: 'text-emerald-600', sub: '>= 75% match compatibility' },
          { label: 'Avg Match Score', value: '88%', icon: Sparkles, color: 'text-purple-600', sub: 'Top quality applicants' },
        ].map((tile, idx) => (
          <NeuCard key={idx} variant="sm" className="p-5 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {tile.label}
              </span>
              <div className={`p-2 rounded-xl neu-inset ${tile.color}`}>
                <tile.icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                {tile.value}
              </div>
              <div className="text-[11px] text-[var(--text-secondary)] mt-0.5 font-medium">
                {tile.sub}
              </div>
            </div>
          </NeuCard>
        ))}
      </div>

      {/* 3. POSTINGS MANAGEMENT ROSTER */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-teal-600" />
              Your Active Internship & Placement Postings
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Ranked candidates automatically sorted by skill-mapping algorithm
            </p>
          </div>
          <Link to="/recruiter/create-posting">
            <NeuButton size="sm" variant="primary" icon={Plus}>
              New Posting
            </NeuButton>
          </Link>
        </div>

        {loading ? (
          <div className="neu-inset p-16 rounded-3xl text-center text-sm text-[var(--text-muted)]">
            Loading company postings...
          </div>
        ) : postings.length === 0 ? (
          <NeuCard className="p-12 text-center flex flex-col items-center gap-3">
            <Briefcase className="w-8 h-8 text-teal-500 opacity-60" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">No Postings Created Yet</h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm">
              Create your first internship posting with weighted skill requirements to begin receiving scored candidates.
            </p>
            <Link to="/recruiter/create-posting">
              <NeuButton size="sm" variant="primary" icon={Plus}>
                Create Opening
              </NeuButton>
            </Link>
          </NeuCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {postings.map(p => (
              <NeuCard key={p.id} hover className="p-6 flex flex-col justify-between gap-5 group">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-teal-600 transition-colors">
                        {p.title}
                      </h3>
                      <span className="text-xs text-[var(--text-secondary)] font-medium">
                        {p.role || p.title} • {p.location}
                      </span>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full neu-inset text-emerald-600 shrink-0">
                      {p.stipend || 'Competitive'}
                    </span>
                  </div>

                  {/* Applicant Metrics Badge */}
                  <div className="grid grid-cols-2 gap-2 neu-inset p-3 rounded-2xl text-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Total Applicants</span>
                      <span className="text-base font-black text-[var(--text-primary)]">{p.applicant_count || 1}</span>
                    </div>
                    <div className="flex flex-col border-l border-[var(--border-subtle)]">
                      <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Shortlisted</span>
                      <span className="text-base font-black text-emerald-600">{p.shortlisted_count || 1}</span>
                    </div>
                  </div>

                  {/* Required Skills Checklist */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                      Required Skills ({p.required_skills?.length || 0})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {p.required_skills && p.required_skills.map((sk, i) => {
                        const name = typeof sk === 'object' ? sk.name : sk;
                        const req = typeof sk === 'object' && sk.required;
                        return (
                          <span key={i} className={`text-xs px-2.5 py-0.5 rounded-xl border ${req ? 'neu-flat text-indigo-600 border-indigo-500/30 font-bold' : 'neu-inset text-[var(--text-secondary)]'}`}>
                            {name} {req && '★'}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-3 border-t border-[var(--border-subtle)]">
                  <Link to={`/recruiter/applicants/${p.id}`} className="flex-1">
                    <NeuButton size="sm" variant="primary" icon={Users} className="w-full font-bold">
                      View Ranked Applicants ({p.applicant_count || 1})
                    </NeuButton>
                  </Link>
                </div>
              </NeuCard>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default RecruiterDashboard;
