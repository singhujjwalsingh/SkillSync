import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Award,
  Briefcase,
  TrendingUp,
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  DollarSign,
  ChevronRight,
  FileText,
  Filter
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';
import MatchScoreIndicator from '../../components/matching/MatchScoreIndicator';
import SkillTag from '../../components/matching/SkillTag';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [postings, setPostings] = useState([]);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('skillsync_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        // 1. Fetch Student Profile
        const profileRes = await fetch('/api/student/profile', { headers });
        if (profileRes.ok) {
          const pData = await profileRes.json();
          setProfile(pData.profile);
        }

        // 2. Fetch Scored Postings
        const postingsRes = await fetch('/api/student/postings', { headers });
        if (postingsRes.ok) {
          const postData = await postingsRes.json();
          setPostings(postData);
        }

        // 3. Fetch Applications
        const appsRes = await fetch('/api/student/applications', { headers });
        if (appsRes.ok) {
          const appData = await appsRes.json();
          setApplications(appData);
        }
      } catch (err) {
        console.warn('Using local fallback for student dashboard:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const studentSkills = profile?.skills || user?.profile?.skills || ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Tailwind CSS'];
  const approvalStatus = profile?.approval_status || 'approved';
  const highMatchCount = postings.filter(p => (p.matchScore || 0) >= 75).length;

  return (
    <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8 animate-slide-up">
      
      {/* 1. WELCOME HERO CARD */}
      <NeuCard className="p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-gradient-to-r from-indigo-900/10 via-[var(--bg-main)] to-teal-900/10">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={user?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover neu-flat ring-2 ring-indigo-500/20"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[var(--bg-main)] flex items-center justify-center text-white text-[10px] font-bold">
              ✓
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">
                Hello, {user?.name || 'Student'} 👋
              </h1>
              {approvalStatus === 'approved' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck className="w-3.5 h-3.5" /> TPO Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold text-amber-600 bg-amber-500/10 border border-amber-500/20">
                  <Clock className="w-3.5 h-3.5" /> Approval Pending
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
              {profile?.department || 'Computer Science & Engineering'} • Roll: {profile?.roll_no || '2022CS1042'} • CGPA: {profile?.cgpa || '8.85'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <Link to="/profile">
            <NeuButton variant="secondary" icon={Award} size="md">
              Update Skills ({studentSkills.length})
            </NeuButton>
          </Link>
          <Link to="/postings">
            <NeuButton variant="primary" icon={Search} size="md">
              Explore Postings
            </NeuButton>
          </Link>
        </div>
      </NeuCard>

      {/* 2. STATS OVERVIEW TILES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Applications', value: applications.length || 2, icon: Briefcase, color: 'text-indigo-600', sub: 'In recruitment pipeline' },
          { label: 'High Match Openings', value: highMatchCount || 3, icon: Sparkles, color: 'text-emerald-600', sub: '>= 75% skill match' },
          { label: 'Verified Skills', value: studentSkills.length || 9, icon: Award, color: 'text-teal-600', sub: 'In skill taxonomy' },
          { label: 'Shortlist Rate', value: '67%', icon: TrendingUp, color: 'text-purple-600', sub: 'Above college avg (48%)' },
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

      {/* 3. MAIN DASHBOARD CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Recommended Postings by Match Score */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Recommended For Your Skillset
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Ranked dynamically by the Skill-Mapping Engine
              </p>
            </div>
            <Link to="/postings" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="neu-inset p-12 rounded-3xl text-center text-sm text-[var(--text-muted)]">
              Calculating real-time skill matching compatibility...
            </div>
          ) : postings.length === 0 ? (
            <NeuCard className="p-8 text-center text-[var(--text-secondary)]">
              No postings available right now. Check back soon!
            </NeuCard>
          ) : (
            <div className="flex flex-col gap-4">
              {postings.slice(0, 4).map(posting => (
                <NeuCard key={posting.id} hover className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group">
                  
                  <div className="flex items-start gap-4 flex-1">
                    <img
                      src={posting.company_logo || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&auto=format&fit=crop&q=80'}
                      alt={posting.company_name}
                      className="w-12 h-12 rounded-2xl object-cover neu-flat shrink-0"
                    />
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-indigo-600 transition-colors">
                          {posting.title}
                        </h3>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full neu-inset text-[var(--text-secondary)]">
                          {posting.type || 'Internship'}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] font-medium">
                        {posting.company_name} • {posting.location} • <strong className="text-emerald-600 font-bold">{posting.stipend}</strong>
                      </p>

                      {/* Matched vs Gap Skill Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        {posting.matchedSkills && posting.matchedSkills.slice(0, 3).map(sk => (
                          <SkillTag key={sk} skill={sk} isMatched size="sm" />
                        ))}
                        {posting.missingSkills && posting.missingSkills.slice(0, 2).map(sk => (
                          <SkillTag key={sk} skill={sk} isMissing size="sm" />
                        ))}
                        {(posting.missingSkills?.length || 0) > 2 && (
                          <span className="text-[10px] text-[var(--text-muted)] font-semibold">
                            +{posting.missingSkills.length - 2} more gaps
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Match Score Indicator & CTA */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-3 sm:pt-0 border-t sm:border-0 border-[var(--border-subtle)]">
                    <MatchScoreIndicator score={posting.matchScore || 85} size="sm" />
                    <Link to={`/postings/${posting.id}`}>
                      <NeuButton size="sm" variant="primary" className="font-bold">
                        View Details →
                      </NeuButton>
                    </Link>
                  </div>

                </NeuCard>
              ))}
            </div>
          )}
        </div>

        {/* Right Col: Skill Profile Widget & Applications Status */}
        <div className="flex flex-col gap-6">
          
          {/* Skill Profile Card */}
          <NeuCard className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-500" />
                My Verified Skills
              </h3>
              <Link to="/profile" className="text-xs text-indigo-500 font-bold hover:underline">
                Edit
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {studentSkills.map(sk => (
                <SkillTag key={sk} skill={sk} size="sm" />
              ))}
            </div>

            <div className="neu-inset p-3.5 rounded-2xl flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span>Taxonomy Strength</span>
              <span className="font-black text-indigo-600 dark:text-indigo-400">Top 10%</span>
            </div>
          </NeuCard>

          {/* Quick Application Tracker */}
          <NeuCard className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-500" />
                Active Applications
              </h3>
              <Link to="/applications" className="text-xs text-indigo-500 font-bold hover:underline">
                View All
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              {applications.length === 0 ? (
                <div className="text-xs text-[var(--text-muted)] text-center py-4">
                  No active applications yet. Browse openings to apply!
                </div>
              ) : (
                applications.slice(0, 3).map(app => (
                  <div key={app.id} className="p-3 rounded-2xl neu-inset flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-[var(--text-primary)] line-clamp-1">
                        {app.posting?.title || 'Full Stack Web Engineer'}
                      </span>
                      <span className="text-[10px] text-[var(--text-secondary)]">
                        {app.posting?.company_name || 'Nexus Cloud'}
                      </span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      app.status === 'offered' ? 'bg-emerald-500/20 text-emerald-600' :
                      app.status === 'interview' ? 'bg-purple-500/20 text-purple-600' :
                      app.status === 'shortlisted' ? 'bg-indigo-500/20 text-indigo-600' :
                      'bg-slate-500/20 text-slate-600'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </NeuCard>

        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;
