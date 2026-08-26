import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  TrendingUp, 
  Award, 
  GraduationCap, 
  Building2, 
  BarChart3, 
  Search, 
  Plus, 
  Code2, 
  Cpu, 
  Database, 
  Cloud, 
  ShieldCheck, 
  ChevronRight,
  Bookmark,
  Share2,
  CheckCircle2,
  Clock,
  Sparkles,
  Activity,
  Briefcase
} from 'lucide-react';

const SKILL_DOMAINS = {
  student: [
    { name: 'React & Next.js Architecture', current: 92, target: 85, status: 'Verified Master', icon: Code2, color: 'text-indigo-500' },
    { name: 'Python & Distributed Data Pipelines', current: 78, target: 80, status: '2% Gap to Benchmark', icon: Cpu, color: 'text-purple-500' },
    { name: 'Distributed Systems & Go Microservices', current: 85, target: 75, status: 'Exceeds Benchmark', icon: Database, color: 'text-pink-500' },
    { name: 'AWS Cloud & Kubernetes CI/CD', current: 74, target: 85, status: 'Recommended Audit', icon: Cloud, color: 'text-cyan-500' },
  ],
  industry: [
    { name: 'Fullstack & Systems Engineers Pipeline', current: 94, target: 90, status: 'High Volume', icon: Code2, color: 'text-indigo-500' },
    { name: 'Cloud Infrastructure Talent Pool', current: 82, target: 85, status: 'Moderate Pool', icon: Cloud, color: 'text-purple-500' },
    { name: 'Zero-Trust Cybersecurity Candidates', current: 88, target: 80, status: 'Adequate Pool', icon: ShieldCheck, color: 'text-pink-500' },
    { name: 'Distributed Data Engineers', current: 79, target: 85, status: 'In Demand', icon: Database, color: 'text-cyan-500' },
  ],
  academician: [
    { name: 'Semester CS Curriculum Alignment', current: 96, target: 90, status: 'Industry Calibrated', icon: Award, color: 'text-indigo-500' },
    { name: 'Student Capstone Code Quality', current: 88, target: 85, status: 'Optimal', icon: Code2, color: 'text-purple-500' },
    { name: 'Industry Sponsored Lab Modules', current: 82, target: 80, status: 'Active Partners', icon: Building2, color: 'text-pink-500' },
    { name: 'Faculty Peer Research Citations', current: 90, target: 85, status: 'Top 5% Band', icon: GraduationCap, color: 'text-cyan-500' },
  ],
  institution: [
    { name: 'Campus Placement Readiness Index', current: 94, target: 90, status: 'Tier 1 Standard', icon: BarChart3, color: 'text-indigo-500' },
    { name: 'Accreditation Metric Calibration', current: 98, target: 95, status: 'Accreditation Ready', icon: ShieldCheck, color: 'text-purple-500' },
    { name: 'Corporate Enterprise MoUs', current: 86, target: 80, status: 'Expanding', icon: Building2, color: 'text-pink-500' },
    { name: 'Student Hackathon National Wins', current: 91, target: 85, status: 'Leading Zone', icon: Award, color: 'text-cyan-500' },
  ]
};

const OPPORTUNITIES = [
  {
    id: 1,
    title: 'Senior Frontend Engineer (React/WebGL)',
    company: 'Stripe Global',
    location: 'Remote / Bengaluru',
    type: 'Full-time',
    stipend: '$140k - $175k',
    match: 96,
    tags: ['React', 'TypeScript', 'Neumorphism', 'GraphQL'],
    logo: '⚡'
  },
  {
    id: 2,
    title: 'Distributed Systems & Data Engineering Intern',
    company: 'Anthropic Systems Partner',
    location: 'Hybrid / San Francisco & Remote',
    type: 'Internship',
    stipend: '$8,500/month',
    match: 92,
    tags: ['Python', 'PostgreSQL', 'FastAPI', 'Kafka'],
    logo: '⚡'
  },
  {
    id: 3,
    title: 'Cloud Infrastructure & Kubernetes Architect',
    company: 'Datadog Platforms',
    location: 'Remote',
    type: 'Full-time',
    stipend: '$150k - $190k',
    match: 88,
    tags: ['AWS', 'Kubernetes', 'Go', 'Terraform'],
    logo: '☁️'
  },
  {
    id: 4,
    title: 'Industry Capstone: High-Throughput Embedded Systems',
    company: 'Qualcomm Research Consortium',
    location: 'On-Campus / Virtual',
    type: 'Research Project',
    stipend: '$5,000 Grant',
    match: 94,
    tags: ['C++', 'RTOS', 'Embedded Systems', 'Linux'],
    logo: '🔬'
  }
];

const RECENT_ACTIVITIES = [
  { id: 1, text: 'Completed proctored "React & Micro-frontends" verification test (Score: 96%)', time: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-500' },
  { id: 2, text: 'Stripe Engineering Recruiter viewed your digital skill portfolio', time: '5 hours ago', icon: Sparkles, color: 'text-indigo-500' },
  { id: 3, text: 'Earned Verifiable Credential Token: "Distributed Systems & Go"', time: 'Yesterday', icon: Award, color: 'text-purple-500' },
  { id: 4, text: 'Shortlisted for Qualcomm Embedded Systems Research Fellowship interview round', time: '2 days ago', icon: Briefcase, color: 'text-amber-500' },
];

const ENTERPRISE_PARTNERS = [
  'Microsoft', 'Deloitte', 'Siemens', 'Oracle', 'IBM', 'Accenture', 'Salesforce'
];

const Dashboard = () => {
  const { user, role: currentRole, switchRole } = useAuth();
  
  const [activePerspective, setActivePerspective] = useState(currentRole || 'student');
  const [opportunityFilter, setOpportunityFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState([1]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [assessmentSuccess, setAssessmentSuccess] = useState(false);

  const handlePerspectiveChange = (roleId) => {
    setActivePerspective(roleId);
    switchRole(roleId);
  };

  const toggleBookmark = (id) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(item => item !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  const handleApply = (id) => {
    if (!appliedIds.includes(id)) {
      setAppliedIds([...appliedIds, id]);
    }
  };

  const runMockAssessment = () => {
    setAssessmentSuccess(true);
    setTimeout(() => {
      setAssessmentSuccess(false);
      setModalOpen(false);
    }, 2000);
  };

  const filteredOpportunities = OPPORTUNITIES.filter(op => {
    const matchesFilter = opportunityFilter === 'All' || op.type.toLowerCase().includes(opportunityFilter.toLowerCase());
    const matchesSearch = op.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          op.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          op.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="relative z-10 space-y-8 pt-4 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* =========================================================================
          TOP EXECUTIVE HEADER & MULTI-ROLE DOCK
          ========================================================================= */}
      <div className="neu-flat p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* User Identity Greeting */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-lg shrink-0">
            <div className="w-full h-full rounded-[14px] flex items-center justify-center bg-slate-900/60 text-white text-xl font-extrabold">
              {user && user.name ? user.name.charAt(0) : (user?.email ? user.email.charAt(0).toUpperCase() : 'U')}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
                Welcome back, {user ? (user.name || user.email) : 'User'}
              </h1>
              <span className="neu-badge text-indigo-500 uppercase text-[10px]">
                {activePerspective} Verified
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">
              Enterprise Talent Telemetry Engine • Calibrated today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        {/* Multi-Role Quick Switcher Dock */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="neu-tab-group p-1.5 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={() => handlePerspectiveChange('student')}
              className={`neu-tab-item text-xs ${activePerspective === 'student' ? 'active text-indigo-500' : ''}`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>
            <button
              onClick={() => handlePerspectiveChange('industry')}
              className={`neu-tab-item text-xs ${activePerspective === 'industry' ? 'active text-purple-500' : ''}`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Industry</span>
            </button>
            <button
              onClick={() => handlePerspectiveChange('academician')}
              className={`neu-tab-item text-xs ${activePerspective === 'academician' ? 'active text-pink-500' : ''}`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Faculty</span>
            </button>
            <button
              onClick={() => handlePerspectiveChange('institution')}
              className={`neu-tab-item text-xs ${activePerspective === 'institution' ? 'active text-cyan-500' : ''}`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>University</span>
            </button>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="neu-btn-primary px-4 py-2.5 text-xs font-semibold shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Action</span>
          </button>
        </div>

      </div>

      {/* =========================================================================
          KEY STATS / KPI METRICS
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1 */}
        <div className="neu-flat p-5 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              {activePerspective === 'student' ? 'Mastery Score' : activePerspective === 'industry' ? 'Talent Match Index' : activePerspective === 'academician' ? 'Cohort Index' : 'Placement Rate'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-500 flex items-center justify-center neu-inset-sm">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-indigo-500">
              {activePerspective === 'student' ? '92.4%' : activePerspective === 'industry' ? '94.8%' : activePerspective === 'academician' ? '88.6%' : '98.2%'}
            </span>
            <span className="text-xs text-emerald-500 font-semibold flex items-center gap-0.5">
              +4.2% <TrendingUp className="w-3 h-3 inline" />
            </span>
          </div>
          <div className="neu-inset-sm h-2 w-full p-0.5 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: '92%' }} />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="neu-flat p-5 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              {activePerspective === 'student' ? 'Verified Proofs' : activePerspective === 'industry' ? 'Pre-Assessed Leads' : activePerspective === 'academician' ? 'Curriculum Alignment' : 'Corporate Ties'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center neu-inset-sm">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-500">
              {activePerspective === 'student' ? '18 Skills' : activePerspective === 'industry' ? '340 Candidates' : activePerspective === 'academician' ? '96.2%' : '84 Partners'}
            </span>
            <span className="text-xs text-emerald-500 font-semibold">Verified</span>
          </div>
          <div className="neu-inset-sm h-2 w-full p-0.5 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: '85%' }} />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="neu-flat p-5 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              {activePerspective === 'student' ? 'Active Applications' : activePerspective === 'industry' ? 'Open Challenges' : activePerspective === 'academician' ? 'Joint Capstones' : 'Median CTC'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-pink-500/15 text-pink-500 flex items-center justify-center neu-inset-sm">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-pink-500">
              {activePerspective === 'student' ? '6 Active' : activePerspective === 'industry' ? '8 Live' : activePerspective === 'academician' ? '12 Projects' : '$128k avg'}
            </span>
            <span className="text-xs text-indigo-400 font-semibold">Tier 1</span>
          </div>
          <div className="neu-inset-sm h-2 w-full p-0.5 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500" style={{ width: '78%' }} />
          </div>
        </div>

        {/* KPI 4 */}
        <div className="neu-flat p-5 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              {activePerspective === 'student' ? 'Recruiter Inquiries' : activePerspective === 'industry' ? 'Time-to-Hire' : activePerspective === 'academician' ? 'Faculty Citations' : 'NIRF Rank Band'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center neu-inset-sm">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-500">
              {activePerspective === 'student' ? '38 Inquiries' : activePerspective === 'industry' ? '6 Days' : activePerspective === 'academician' ? '240+' : 'Top 5'}
            </span>
            <span className="text-xs text-emerald-500 font-semibold">Top 1%</span>
          </div>
          <div className="neu-inset-sm h-2 w-full p-0.5 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500" style={{ width: '95%' }} />
          </div>
        </div>

      </div>

      {/* =========================================================================
          MAIN 2-COLUMN DASHBOARD SECTION
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Skill Gap Radar & Opportunities Board (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Skill Gap & Growth Analyzer */}
          <div className="neu-flat p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Skill Mastery & Industry Benchmark Calibration
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Real-time algorithmic evaluation comparing capability signatures against enterprise benchmarks
                </p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="neu-btn px-3 py-1.5 text-xs font-semibold text-indigo-500 self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5" /> Re-audit Skills
              </button>
            </div>

            {/* Skill Bars */}
            <div className="space-y-4 pt-2">
              {(SKILL_DOMAINS[activePerspective] || SKILL_DOMAINS.student).map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={index} className="neu-inset p-4 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg neu-flat-sm ${skill.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-500">{skill.current}%</span>
                        <span className="text-[10px] neu-badge text-[var(--text-muted)]">
                          {skill.status}
                        </span>
                      </div>
                    </div>

                    <div className="relative pt-1">
                      <div className="neu-inset-sm h-3.5 w-full p-0.5 rounded-full overflow-hidden relative">
                        {/* Target Marker */}
                        <div
                          className="absolute top-0 bottom-0 w-1 bg-amber-400 z-10 opacity-80"
                          style={{ left: `${skill.target}%` }}
                          title={`Target: ${skill.target}%`}
                        />
                        {/* Current Bar */}
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700"
                          style={{ width: `${skill.current}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-[var(--text-muted)] pt-1 px-1">
                        <span>Foundation (0%)</span>
                        <span className="text-amber-500 font-semibold">Target Baseline ({skill.target}%)</span>
                        <span>Mastery (100%)</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Opportunities & Pipelines Board */}
          <div className="neu-flat p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  Calibrated Opportunities & Industry Openings
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Roles algorithmically matched to verified credentials
                </p>
              </div>

              {/* Search input */}
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 w-3.5 h-3.5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search roles or skills..."
                  className="neu-input pl-9 py-1.5 text-xs"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Full-time', 'Internship', 'Research Project'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setOpportunityFilter(filter)}
                  className={`neu-pill text-xs ${opportunityFilter === filter ? 'active' : ''}`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Opportunity Cards List */}
            <div className="space-y-4">
              {filteredOpportunities.map((op) => {
                const isBookmarked = bookmarkedIds.includes(op.id);
                const isApplied = appliedIds.includes(op.id);
                return (
                  <div key={op.id} className="neu-flat-sm p-5 space-y-3 hover:-translate-y-0.5 transition-transform">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-2xl neu-inset-sm flex items-center justify-center text-xl shrink-0">
                          {op.logo}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[var(--text-primary)]">{op.title}</h4>
                          <p className="text-xs text-[var(--text-muted)] flex items-center gap-2 mt-0.5">
                            <span className="font-semibold text-indigo-400">{op.company}</span>
                            <span>•</span>
                            <span>{op.location}</span>
                            <span>•</span>
                            <span className="text-emerald-500 font-semibold">{op.stipend}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="neu-badge text-emerald-500 font-bold text-xs">
                          {op.match}% Match
                        </span>
                        <button
                          onClick={() => toggleBookmark(op.id)}
                          className={`neu-icon-btn w-8 h-8 ${isBookmarked ? 'text-amber-500' : 'text-[var(--text-muted)]'}`}
                          title="Bookmark"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Skill Tag Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {op.tags.map((tag) => (
                        <span key={tag} className="neu-badge text-[10px] text-[var(--text-secondary)]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] text-xs">
                      <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Application Deadline: 12 days left
                      </span>

                      <button
                        onClick={() => handleApply(op.id)}
                        disabled={isApplied}
                        className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          isApplied
                            ? 'neu-inset text-emerald-500 font-bold'
                            : 'neu-btn-primary'
                        }`}
                      >
                        {isApplied ? 'Application Sent ✓' : 'Instant 1-Click Apply'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enterprise Partners Grid */}
          <div className="neu-flat p-6 text-center space-y-4">
            <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--text-muted)]">
              Trusted by Leading Enterprise Partners
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 pt-1">
              {ENTERPRISE_PARTNERS.map((partner) => (
                <div key={partner} className="neu-inset-sm px-4 py-2 rounded-xl text-xs font-bold text-[var(--text-secondary)]">
                  {partner}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Quick Action Dock & Live Activity Feed (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Quick Action Dock */}
          <div className="neu-flat p-6 space-y-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Tactile Quick Actions
            </h3>
            
            <div className="space-y-2">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full neu-btn p-3 text-xs justify-between hover:text-indigo-500"
              >
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-indigo-500" />
                  <span className="font-semibold">Launch Technical Skill Assessment</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </button>

              <button
                onClick={() => alert("Digital Portfolio link copied to clipboard!")}
                className="w-full neu-btn p-3 text-xs justify-between hover:text-purple-500"
              >
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold">Share Verifiable Profile</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </button>

              <button
                onClick={() => alert("Exporting Institutional Accreditation Audit report...")}
                className="w-full neu-btn p-3 text-xs justify-between hover:text-pink-500"
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-pink-500" />
                  <span className="font-semibold">Download Telemetry PDF</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </button>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="neu-flat p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Telemetry Activity
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="space-y-3">
              {RECENT_ACTIVITIES.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="neu-inset p-3.5 rounded-2xl space-y-1">
                    <div className="flex items-start gap-2.5">
                      <div className={`p-1 rounded-lg neu-flat-sm shrink-0 mt-0.5 ${act.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs text-[var(--text-primary)] font-medium leading-snug">
                        {act.text}
                      </p>
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)] block pl-6">
                      {act.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Security & Verification Guarantee */}
          <div className="neu-flat-sm p-5 space-y-2 text-center bg-gradient-to-tr from-indigo-500/5 to-purple-500/5">
            <ShieldCheck className="w-8 h-8 text-indigo-500 mx-auto" />
            <h4 className="text-xs font-bold text-[var(--text-primary)]">
              Cryptographically Verified Signatures
            </h4>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              All assessment results are signed with zero-knowledge tamper-proof tokens accepted by 450+ enterprise employers.
            </p>
          </div>

        </div>

      </div>

      {/* =========================================================================
          INTERACTIVE ACTION MODAL (TECHNICAL SKILL ASSESSMENT / RE-AUDIT)
          ========================================================================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="neu-flat-lg max-w-md w-full p-6 sm:p-8 space-y-5 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Launch Skill Assessment
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="neu-icon-btn w-8 h-8 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[var(--text-secondary)]">
              The standardized testing engine will generate real-time coding tasks and architectural challenges calibrated for Tier 1 engineering roles.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Select Domain Challenge:</label>
              <select className="neu-input text-xs">
                <option>React & High-Performance WebGL Interfaces</option>
                <option>Python & Distributed Data Pipelines</option>
                <option>Go / Node.js High-Concurrency Microservices</option>
                <option>Kubernetes & Cloud Infrastructure Automation</option>
              </select>
            </div>

            {assessmentSuccess ? (
              <div className="neu-inset p-4 rounded-2xl text-center space-y-1 text-emerald-500 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 mx-auto" />
                <p className="text-xs font-bold">Assessment Initialized Successfully!</p>
                <p className="text-[11px] text-[var(--text-muted)]">Calibrating testing sandbox environment...</p>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="neu-btn px-4 py-2 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={runMockAssessment}
                  className="neu-btn-primary px-5 py-2 text-xs font-semibold"
                >
                  Start Assessment Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
