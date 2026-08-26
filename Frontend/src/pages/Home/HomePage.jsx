import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight, 
  Building2, 
  GraduationCap, 
  Award, 
  BarChart3, 
  Layers, 
  Zap, 
  Activity,
  Code2, 
  Cpu, 
  Database, 
  Cloud,
  ChevronLeft,
  Star
} from 'lucide-react';

const SKILLS_LIST = [
  { id: 'react', label: 'React.js & Next.js', category: 'Frontend', boost: 18 },
  { id: 'dataEng', label: 'Python & Data Pipelines', category: 'Backend/Data', boost: 25 },
  { id: 'cloud', label: 'AWS & Kubernetes', category: 'Cloud/DevOps', boost: 20 },
  { id: 'node', label: 'Node.js & Go Microservices', category: 'Backend', boost: 15 },
  { id: 'ui', label: 'Modern UI/UX & Motion', category: 'Design', boost: 12 },
  { id: 'sys', label: 'High-Concurrency Systems', category: 'Architecture', boost: 22 },
  { id: 'data', label: 'PostgreSQL & Distributed DBs', category: 'Data', boost: 16 },
  { id: 'sec', label: 'Zero-Trust Security', category: 'Cybersec', boost: 19 },
];

const ENTERPRISE_PARTNERS = [
  { name: 'Microsoft', logo: '❖ Microsoft' },
  { name: 'Deloitte', logo: 'Deloitte.' },
  { name: 'Siemens', logo: 'SIEMENS' },
  { name: 'Oracle', logo: 'ORACLE' },
  { name: 'IBM', logo: 'IBM' },
  { name: 'Accenture', logo: 'accenture' },
  { name: 'Salesforce', logo: 'salesforce' }
];

const TESTIMONIALS = [
  {
    quote: "SkillSync eliminated the guesswork from campus recruiting. We hired 14 verified engineers who hit the ground running on day one.",
    author: "Rohan Varma",
    role: "VP of Engineering at FinScale Global",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    tag: "Enterprise Partner"
  },
  {
    quote: "The tactile skill audits gave me clear benchmarks. I closed my distributed systems gap and landed my dream internship at a top engineering lab.",
    author: "Ananya Deshmukh",
    role: "Final Year CS Student, IIT Delhi",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    tag: "Student"
  },
  {
    quote: "Our curriculum alignment and NAAC readiness metrics jumped by 24% after mapping semester syllabi to SkillSync's verified skill framework.",
    author: "Dr. Vikram Sengupta",
    role: "Dean of Academic Affairs, Tech University",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    rating: 5,
    tag: "Academic Dean"
  }
];

const HomePage = () => {
  const [selectedSkills, setSelectedSkills] = useState(['react', 'dataEng', 'cloud']);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [chartHoverIndex, setChartHoverIndex] = useState(4);
  const [chartPeriod, setChartPeriod] = useState('Month');

  // Chart data points
  const chartPoints = [
    { label: 'Jan', value: 42, talent: 1240, placement: '88%' },
    { label: 'Feb', value: 58, talent: 1680, placement: '91%' },
    { label: 'Mar', value: 65, talent: 2150, placement: '93%' },
    { label: 'Apr', value: 82, talent: 2890, placement: '95%' },
    { label: 'May', value: 96, talent: 3420, placement: '98%' },
    { label: 'Jun', value: 92, talent: 3950, placement: '97%' }
  ];

  const toggleSkill = (skillId) => {
    if (selectedSkills.includes(skillId)) {
      if (selectedSkills.length > 1) {
        setSelectedSkills(selectedSkills.filter(id => id !== skillId));
      }
    } else {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  // Compute dynamic match metrics based on selected skills
  const baseScore = 42;
  const computedScore = Math.min(
    99.2,
    baseScore + selectedSkills.reduce((acc, id) => {
      const skill = SKILLS_LIST.find(s => s.id === id);
      return acc + (skill ? skill.boost * 0.42 : 0);
    }, 0)
  ).toFixed(1);

  const matchedJobsCount = Math.round(selectedSkills.length * 520 + 180);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div className="relative z-10 space-y-24 pt-6 sm:pt-10 pb-20">
      
      {/* =========================================================================
          HERO SECTION (LARGE DATA VISUALIZATION METRICS & EXECUTIVE CTA)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Executive Headline & Onboarding CTAs */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left animate-slide-up">
            
            {/* Minimalist Executive Badge */}
            <div className="inline-flex items-center gap-2 neu-pill px-4 py-1.5 border border-indigo-500/20">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                Enterprise Talent Intelligence
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-[1.12]">
              Next-Generation{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 bg-clip-text text-transparent">
                Enterprise Software
              </span>{' '}
              Portal for Verified Talent.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto lg:mx-0">
              Unlock verified skill telemetry, benchmark engineering capabilities in real time, and scale enterprise talent synergy with zero screening friction.
            </p>

            {/* Prominent Executive CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/dashboard"
                className="neu-btn-primary px-8 py-4 text-sm sm:text-base font-bold w-full sm:w-auto shadow-xl"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/signup"
                className="neu-btn px-7 py-4 text-sm sm:text-base font-semibold w-full sm:w-auto text-[var(--text-primary)]"
              >
                <span>Get Started Free</span>
                <ChevronRight className="w-4 h-4 text-indigo-400" />
              </Link>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>98.4% Placement Calibration</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                <span>Zero-Trust Skill Proofs</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Real-Time Telemetry</span>
              </div>
            </div>

          </div>

          {/* Right Column: Large Data Visualization Metrics Chart Card */}
          <div className="lg:col-span-6 animate-scale-up">
            <div className="neu-flat-lg p-6 sm:p-8 space-y-6 relative overflow-hidden">
              
              {/* Card Top Bar */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                      Telemetry Matrix
                    </span>
                    <span className="neu-badge text-emerald-500 text-[10px]">Live Data</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[var(--text-primary)] mt-0.5">
                    Platform Revenue & Placement Trend (Q4)
                  </h3>
                </div>

                {/* Period Switcher */}
                <div className="neu-tab-group p-1 text-xs">
                  {['Week', 'Month', 'Year'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setChartPeriod(period)}
                      className={`neu-tab-item py-1 px-2.5 text-xs ${chartPeriod === period ? 'active text-indigo-500 font-bold' : ''}`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive SVG Area Chart */}
              <div className="neu-inset p-4 rounded-2xl space-y-3">
                
                {/* SVG Curve Canvas */}
                <div className="relative h-44 w-full flex items-end">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4338ca" />
                        <stop offset="50%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                    </defs>

                    {/* Area Fill */}
                    <path
                      d="M 0 160 L 0 95 Q 100 65, 200 80 T 400 20 T 500 35 L 500 160 Z"
                      fill="url(#chartGradient)"
                    />

                    {/* Main Curved Line */}
                    <path
                      d="M 0 95 Q 100 65, 200 80 T 400 20 T 500 35"
                      fill="none"
                      stroke="url(#lineGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    {chartPoints.map((pt, i) => {
                      const x = (i / (chartPoints.length - 1)) * 480 + 10;
                      const y = 150 - (pt.value / 100) * 125;
                      const isHovered = chartHoverIndex === i;
                      return (
                        <g key={i} className="cursor-pointer" onMouseEnter={() => setChartHoverIndex(i)}>
                          <circle
                            cx={x}
                            cy={y}
                            r={isHovered ? 6 : 4}
                            className={`transition-all duration-200 ${isHovered ? 'fill-indigo-500 stroke-white stroke-2' : 'fill-indigo-400'}`}
                          />
                        </g>
                      );
                    })}
                  </svg>

                  {/* Active Point Floating Tooltip */}
                  {chartHoverIndex !== null && (
                    <div 
                      className="absolute -top-3 neu-flat-sm px-3 py-1.5 text-center text-xs font-bold pointer-events-none transform -translate-x-1/2 transition-all duration-200"
                      style={{ left: `${(chartHoverIndex / (chartPoints.length - 1)) * 90 + 5}%` }}
                    >
                      <span className="text-indigo-500 block text-[10px] uppercase font-bold">
                        {chartPoints[chartHoverIndex].label} Verified
                      </span>
                      <span className="text-sm font-extrabold text-[var(--text-primary)]">
                        {chartPoints[chartHoverIndex].talent} Hires ({chartPoints[chartHoverIndex].placement})
                      </span>
                    </div>
                  )}
                </div>

                {/* X-Axis Labels */}
                <div className="flex justify-between text-[11px] font-medium text-[var(--text-muted)] pt-1 px-2 border-t border-[var(--border-subtle)]">
                  {chartPoints.map((pt, idx) => (
                    <span key={idx} className={chartHoverIndex === idx ? 'text-indigo-500 font-bold' : ''}>
                      {pt.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* 4 Bottom Key Performance Indicators */}
              <div className="grid grid-cols-4 gap-3 pt-2">
                <div className="neu-inset-sm p-3 text-center space-y-0.5">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold block">Active Users</span>
                  <span className="text-base font-black text-[var(--text-primary)]">14,892</span>
                  <span className="text-[10px] text-emerald-500 font-bold block">+12%</span>
                </div>
                <div className="neu-inset-sm p-3 text-center space-y-0.5">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold block">Verified Proofs</span>
                  <span className="text-base font-black text-[var(--text-primary)]">3.1M</span>
                  <span className="text-[10px] text-indigo-500 font-bold block">100%</span>
                </div>
                <div className="neu-inset-sm p-3 text-center space-y-0.5">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold block">System Uptime</span>
                  <span className="text-base font-black text-[var(--text-primary)]">99.98%</span>
                  <span className="text-[10px] text-emerald-500 font-bold block">Stable</span>
                </div>
                <div className="neu-inset-sm p-3 text-center space-y-0.5">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold block">Placement Growth</span>
                  <span className="text-base font-black text-[var(--text-primary)]">24%</span>
                  <span className="text-[10px] text-purple-500 font-bold block">Q4 Peak</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          CLEAN LOGO GRID OF ENTERPRISE PARTNERS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neu-flat p-8 sm:p-10 space-y-6 text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--text-muted)]">
            Trusted By Leading Global Enterprises & Research Consortia
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 items-center justify-center pt-2">
            {ENTERPRISE_PARTNERS.map((partner) => (
              <div 
                key={partner.name} 
                className="neu-inset-sm p-4 rounded-xl flex items-center justify-center text-sm font-extrabold text-[var(--text-secondary)] tracking-wide hover:text-indigo-500 transition-colors"
              >
                {partner.logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE TECHNICAL SKILL & RECRUITING SANDBOX (#matrix)
          ========================================================================= */}
      <section id="matrix" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neu-flat-lg p-6 sm:p-12 space-y-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="neu-pill px-3.5 py-1 text-xs text-indigo-500 font-semibold inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Sandbox
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Test the Technical Skill & Enterprise Match Engine
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Click to toggle skills below. Watch how the tactile engine calibrates real-time candidate readiness, job volume, and projected compensation.
            </p>
          </div>

          {/* Skill Selector Chips Grid */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {SKILLS_LIST.map((skill) => {
              const active = selectedSkills.includes(skill.id);
              return (
                <button
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className={`neu-pill px-4 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                    active ? 'active text-indigo-500 font-bold border-indigo-500/40' : ''
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${active ? 'bg-indigo-500 animate-pulse' : 'bg-slate-400'}`} />
                  <span>{skill.label}</span>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider pl-1">
                    +{skill.boost}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Metrics Output Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 max-w-5xl mx-auto">
            
            <div className="neu-inset p-6 rounded-2xl text-center space-y-2">
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Overall Competency Index
              </span>
              <div className="text-4xl sm:text-5xl font-black text-indigo-500 tracking-tight">
                {computedScore}%
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Calibrated across {selectedSkills.length} verified technical domain tracks
              </p>
            </div>

            <div className="neu-inset p-6 rounded-2xl text-center space-y-2">
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Matching Enterprise Vacancies
              </span>
              <div className="text-4xl sm:text-5xl font-black text-purple-500 tracking-tight">
                {matchedJobsCount}+
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Active hiring pipelines in Tier 1 engineering teams
              </p>
            </div>

            <div className="neu-inset p-6 rounded-2xl text-center space-y-2">
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Projected CTC Band
              </span>
              <div className="text-4xl sm:text-5xl font-black text-emerald-500 tracking-tight">
                ${(75 + selectedSkills.length * 15).toFixed(0)}k - ${(110 + selectedSkills.length * 20).toFixed(0)}k
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Industry benchmark compensation for this skill profile
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4-WAY ROLE ECOSYSTEM SYNERGY (#roles)
          ========================================================================= */}
      <section id="roles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="neu-pill px-3.5 py-1 text-xs text-indigo-500 font-semibold inline-flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> 4-Way Ecosystem
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Designed for Every Stakeholder
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            A cohesive, single-source-of-truth network connecting students, industry recruiters, faculty mentors, and university deans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Student */}
          <div className="neu-flat p-6 rounded-3xl space-y-4 hover:-translate-y-1.5 transition-all">
            <div className="w-12 h-12 rounded-2xl neu-inset-sm flex items-center justify-center text-indigo-500">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Students & Learners</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Take standardized skill assessments, eliminate resume screening bias, and showcase interactive digital portfolios directly to recruiters.
            </p>
            <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-subtle)]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Verifiable skill tokens
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 1-Click internship apply
              </li>
            </ul>
          </div>

          {/* Industry */}
          <div className="neu-flat p-6 rounded-3xl space-y-4 hover:-translate-y-1.5 transition-all">
            <div className="w-12 h-12 rounded-2xl neu-inset-sm flex items-center justify-center text-purple-500">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Industry Partners</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Post real-world coding challenges, sponsor capstone labs, and hire pre-assessed candidates with zero interview drop-off.
            </p>
            <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-subtle)]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 6-Day average time-to-hire
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Sponsoring custom MoUs
              </li>
            </ul>
          </div>

          {/* Faculty */}
          <div className="neu-flat p-6 rounded-3xl space-y-4 hover:-translate-y-1.5 transition-all">
            <div className="w-12 h-12 rounded-2xl neu-inset-sm flex items-center justify-center text-pink-500">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Faculty & Mentors</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Monitor student cohort benchmarks, align course syllabi to real industry trends, and collaborate on enterprise research.
            </p>
            <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-subtle)]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Cohort skill heatmaps
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Joint project mentorship
              </li>
            </ul>
          </div>

          {/* Institution */}
          <div className="neu-flat p-6 rounded-3xl space-y-4 hover:-translate-y-1.5 transition-all">
            <div className="w-12 h-12 rounded-2xl neu-inset-sm flex items-center justify-center text-cyan-500">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Universities & Deans</h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Real-time placement dashboards, NAAC/NIRF accreditation reports, and institutional corporate partnership management.
            </p>
            <ul className="space-y-1.5 text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-subtle)]">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Placement rate metrics
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> One-click audit exports
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* =========================================================================
          TESTIMONIALS SECTION
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neu-flat-lg p-8 sm:p-10 space-y-6 relative overflow-hidden">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="neu-badge text-indigo-500 text-xs">
              {TESTIMONIALS[activeTestimonial].tag}
            </span>
          </div>

          <blockquote className="text-lg sm:text-xl font-medium text-[var(--text-primary)] italic leading-relaxed">
            "{TESTIMONIALS[activeTestimonial].quote}"
          </blockquote>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <img
                src={TESTIMONIALS[activeTestimonial].avatar}
                alt={TESTIMONIALS[activeTestimonial].author}
                className="w-11 h-11 rounded-full object-cover neu-flat-sm p-0.5"
              />
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)]">
                  {TESTIMONIALS[activeTestimonial].author}
                </h4>
                <p className="text-xs text-[var(--text-muted)]">
                  {TESTIMONIALS[activeTestimonial].role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="neu-icon-btn w-9 h-9"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="neu-icon-btn w-9 h-9"
                title="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          FINAL CTA BANNER
          ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neu-flat-lg p-10 sm:p-14 text-center space-y-6 relative overflow-hidden bg-gradient-to-tr from-indigo-500/5 via-purple-500/5 to-pink-500/5">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Ready to Transform Your Talent Pipeline?
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)]">
              Join over 150,000 students and 450+ enterprise employers calibrating verified skills on SkillSync today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/signup"
              className="neu-btn-primary px-8 py-3.5 text-sm sm:text-base font-bold w-full sm:w-auto shadow-xl"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="neu-btn px-7 py-3.5 text-sm sm:text-base font-semibold w-full sm:w-auto text-[var(--text-primary)]"
            >
              <span>View Live Demo</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
