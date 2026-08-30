import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Briefcase,
  MapPin,
  Calendar,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';
import MatchScoreIndicator from '../../components/matching/MatchScoreIndicator';
import SkillTag from '../../components/matching/SkillTag';

const PostingsBrowse = () => {
  const { user } = useAuth();

  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [minMatch, setMinMatch] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');

  useEffect(() => {
    const fetchPostings = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('skillsync_token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const res = await fetch('/api/student/postings', { headers });
        if (res.ok) {
          const data = await res.json();
          setPostings(data);
        }
      } catch (err) {
        console.warn('Fallback local postings in browse:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPostings();
  }, []);

  // Filter pipeline
  const filtered = postings.filter(p => {
    const s = search.toLowerCase();
    const matchesSearch = !search ||
      p.title?.toLowerCase().includes(s) ||
      p.company_name?.toLowerCase().includes(s) ||
      p.location?.toLowerCase().includes(s) ||
      (p.required_skills && p.required_skills.some(sk => (sk.name || sk).toLowerCase().includes(s)));

    const matchesScore = (p.matchScore || 0) >= Number(minMatch);

    const matchesLocation = selectedLocation === 'all' ||
      (p.location && p.location.toLowerCase().includes(selectedLocation.toLowerCase()));

    const matchesRole = selectedRole === 'all' ||
      (p.role && p.role.toLowerCase().includes(selectedRole.toLowerCase())) ||
      (p.title && p.title.toLowerCase().includes(selectedRole.toLowerCase()));

    return matchesSearch && matchesScore && matchesLocation && matchesRole;
  });

  return (
    <div className="relative z-10 min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8 animate-slide-up">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-indigo-600 bg-indigo-500/10 border border-indigo-500/20 mb-2">
            <Zap className="w-3.5 h-3.5" /> Dynamic Match Scored Postings
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)]">
            Explore Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Discover verified corporate internships ranked automatically by your real skill compatibility.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl neu-inset text-indigo-600 dark:text-indigo-400">
            {filtered.length} Matching Postings
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <NeuCard className="p-6 flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Search Input */}
          <div className="md:col-span-2 relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, company, or required skill (e.g. React, Python)..."
              className="neu-input w-full py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] rounded-xl outline-none"
            />
          </div>

          {/* Location Filter */}
          <div className="relative flex items-center">
            <MapPin className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="neu-input w-full py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] rounded-xl outline-none cursor-pointer"
            >
              <option value="all">All Locations</option>
              <option value="remote">Remote</option>
              <option value="bengaluru">Bengaluru</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="delhi">Delhi / NCR</option>
            </select>
          </div>

          {/* Role Filter */}
          <div className="relative flex items-center">
            <Briefcase className="absolute left-3.5 w-4 h-4 text-[var(--text-muted)]" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="neu-input w-full py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] rounded-xl outline-none cursor-pointer"
            >
              <option value="all">All Disciplines</option>
              <option value="full stack">Full Stack Dev</option>
              <option value="machine learning">AI / Machine Learning</option>
              <option value="frontend">Frontend React</option>
              <option value="devops">Cloud & DevOps</option>
            </select>
          </div>

        </div>

        {/* Match Score Slider Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold text-[var(--text-secondary)]">
              Min Skill Match Score: <strong className="text-indigo-600 font-extrabold">{minMatch}%</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-72">
            <span className="text-[10px] text-[var(--text-muted)] font-bold">0%</span>
            <input
              type="range"
              min="0"
              max="90"
              step="10"
              value={minMatch}
              onChange={(e) => setMinMatch(e.target.value)}
              className="w-full h-2 rounded-lg neu-inset appearance-none cursor-pointer accent-indigo-600"
            />
            <span className="text-[10px] text-[var(--text-muted)] font-bold">90%+</span>
          </div>
        </div>
      </NeuCard>

      {/* Postings Grid */}
      {loading ? (
        <div className="neu-inset p-16 rounded-3xl text-center text-sm text-[var(--text-muted)]">
          Loading intelligent matching results...
        </div>
      ) : filtered.length === 0 ? (
        <NeuCard className="p-12 text-center flex flex-col items-center gap-3">
          <Sparkles className="w-8 h-8 text-indigo-500 opacity-60" />
          <h3 className="text-lg font-bold text-[var(--text-primary)]">No Postings Match Current Filters</h3>
          <p className="text-xs text-[var(--text-secondary)] max-w-sm">
            Try adjusting your search keyword or lower the minimum match percentage filter.
          </p>
          <NeuButton size="sm" variant="secondary" onClick={() => { setSearch(''); setMinMatch(0); setSelectedLocation('all'); setSelectedRole('all'); }}>
            Reset Filters
          </NeuButton>
        </NeuCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(posting => (
            <NeuCard key={posting.id} hover className="p-6 flex flex-col justify-between gap-5 group">

              <div className="flex flex-col gap-4">
                {/* Header with Logo & Match Score */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={posting.company_logo || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150&auto=format&fit=crop&q=80'}
                      alt={posting.company_name}
                      className="w-12 h-12 rounded-2xl object-cover neu-flat shrink-0"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {posting.title}
                      </h3>
                      <span className="text-xs font-semibold text-[var(--text-secondary)]">
                        {posting.company_name}
                      </span>
                    </div>
                  </div>

                  <MatchScoreIndicator score={posting.matchScore || 80} size="sm" showLabel={false} />
                </div>

                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--text-secondary)]">
                  <span className="px-2.5 py-1 rounded-xl neu-inset">
                    📍 {posting.location}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl neu-inset text-emerald-600 font-bold">
                    💰 {posting.stipend}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl neu-inset">
                    ⏱️ {posting.duration || '3-6 Months'}
                  </span>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                  {posting.description}
                </p>

                {/* Matched vs Gap Chips */}
                <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border-subtle)]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Skill Compatibility Breakdown
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {posting.matchedSkills && posting.matchedSkills.map(sk => (
                      <SkillTag key={sk} skill={sk} isMatched size="sm" />
                    ))}
                    {posting.missingSkills && posting.missingSkills.map(sk => (
                      <SkillTag key={sk} skill={sk} isMissing size="sm" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <Link to={`/postings/${posting.id}`} className="w-full block">
                  <NeuButton size="md" variant="primary" className="w-full font-bold">
                    Review Compatibility & Apply →
                  </NeuButton>
                </Link>
              </div>

            </NeuCard>
          ))}
        </div>
      )}

    </div>
  );
};

export default PostingsBrowse;
