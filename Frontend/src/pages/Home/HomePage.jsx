import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Building2,
  TrendingUp,
  Cpu,
  Layers,
  Search
} from 'lucide-react';
import NeuCard from '../../components/common/NeuCard';
import NeuButton from '../../components/common/NeuButton';
import MatchScoreIndicator from '../../components/matching/MatchScoreIndicator';
import SkillTag from '../../components/matching/SkillTag';

const SAMPLE_ROLES = [
  {
    id: 'fullstack',
    title: 'Full Stack Web Engineer',
    company: 'Nexus Cloud Technologies',
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Tailwind CSS']
  },
  {
    id: 'aiml',
    title: 'AI / Machine Learning Engineer',
    company: 'Synthetix AI Labs',
    requiredSkills: ['Python', 'Machine Learning', 'PyTorch', 'TensorFlow', 'Docker', 'Data Structures & Algorithms']
  },
  {
    id: 'cloud',
    title: 'Cloud DevOps & SRE Intern',
    company: 'Nexus Cloud Technologies',
    requiredSkills: ['Docker', 'AWS', 'Kubernetes', 'Python', 'Git & GitHub', 'Linux']
  }
];

const ALL_DEMO_SKILLS = [
  'React', 'Node.js', 'JavaScript', 'TypeScript', 'Python', 'Machine Learning',
  'PyTorch', 'Docker', 'AWS', 'PostgreSQL', 'Tailwind CSS', 'Git & GitHub', 'Data Structures & Algorithms'
];

const HomePage = () => {
  const [selectedRole, setSelectedRole] = useState(SAMPLE_ROLES[0]);
  const [selectedSkills, setSelectedSkills] = useState(['React', 'JavaScript', 'Node.js', 'Tailwind CSS', 'Git & GitHub']);

  // Toggle skill in simulator
  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Calculate live simulator score
  const matched = selectedRole.requiredSkills.filter(req => selectedSkills.includes(req));
  const missing = selectedRole.requiredSkills.filter(req => !selectedSkills.includes(req));
  const liveScore = Math.round((matched.length / selectedRole.requiredSkills.length) * 100);

  return (
    <div className="relative isolate overflow-hidden min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 text-center flex flex-col items-center gap-6 animate-slide-up">
        
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 neu-sm bg-[var(--bg-card)] text-xs font-bold text-indigo-600 dark:text-indigo-400">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span>SIH PS 26044 — Academia-Industry Skill Mapping & Placement Portal</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[var(--text-primary)] leading-[1.1] max-w-4xl">
          Intelligent Skill Mapping for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500">
            Next-Gen Placements
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl font-normal leading-relaxed">
          A unified three-sided ecosystem connecting <strong>Students</strong>, <strong>Industry Recruiters</strong>, and <strong>College TPOs</strong> powered by dynamic algorithmic skill-gap scoring.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
          <Link to="/signup">
            <NeuButton size="lg" icon={ArrowRight} className="font-bold">
              Launch Workspace Free
            </NeuButton>
          </Link>
          <a href="#simulator">
            <NeuButton size="lg" variant="secondary" icon={Zap}>
              Try Live Match Engine
            </NeuButton>
          </a>
        </div>

        {/* Quick Stats Pill */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl">
          {[
            { label: 'Skill Match Precision', val: '98.4%', icon: Sparkles },
            { label: 'Hiring Reduction Time', val: '3.5x', icon: TrendingUp },
            { label: 'Partner Colleges', val: '120+', icon: GraduationCap },
            { label: 'Verified Internships', val: '450+', icon: Briefcase },
          ].map((item, idx) => (
            <NeuCard key={idx} variant="sm" className="p-4 flex flex-col items-center justify-center text-center">
              <item.icon className="w-5 h-5 text-indigo-500 mb-1" />
              <span className="text-2xl font-black text-[var(--text-primary)]">{item.val}</span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">{item.label}</span>
            </NeuCard>
          ))}
        </div>
      </section>

      {/* 2. INTERACTIVE SKILL MATCH SIMULATOR */}
      <section id="simulator" className="flex flex-col items-center gap-8 scroll-mt-24">
        <div className="text-center max-w-2xl flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/20 mx-auto">
            <Cpu className="w-3.5 h-3.5" /> Interactive Algorithm Demonstration
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)]">
            Experience the Matching Engine in Action
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Toggle candidate skills and switch internship roles to witness real-time skill gap analysis and scoring.
          </p>
        </div>

        <NeuCard className="w-full max-w-5xl p-6 sm:p-10 flex flex-col lg:flex-row gap-10 items-center justify-between">
          
          {/* Left: Role & Skill Selection */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            
            {/* Target Role Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Step 1: Select Target Posting
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SAMPLE_ROLES.map(role => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`p-3 rounded-2xl text-left text-xs font-bold transition-all ${
                      selectedRole.id === role.id
                        ? 'neu-inset text-indigo-600 dark:text-indigo-400 font-extrabold ring-2 ring-indigo-500/30'
                        : 'neu-btn text-[var(--text-secondary)]'
                    }`}
                  >
                    <div>{role.title}</div>
                    <div className="text-[10px] text-[var(--text-muted)] font-normal mt-0.5">{role.company}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Skills Picker */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  Step 2: Toggle Candidate's Acquired Skills
                </label>
                <span className="text-xs text-indigo-500 font-semibold">{selectedSkills.length} selected</span>
              </div>
              <div className="flex flex-wrap gap-2 neu-inset p-4 rounded-2xl">
                {ALL_DEMO_SKILLS.map(skill => {
                  const active = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        active
                          ? 'bg-indigo-600 text-white neu-sm shadow-md'
                          : 'neu-flat text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}{skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Breakdown Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Matched Skills ({matched.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matched.length > 0 ? (
                    matched.map(s => <SkillTag key={s} skill={s} isMatched size="sm" />)
                  ) : (
                    <span className="text-xs text-[var(--text-muted)] italic">None matched yet</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Identified Skill Gaps ({missing.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {missing.length > 0 ? (
                    missing.map(s => <SkillTag key={s} skill={s} isMissing size="sm" />)
                  ) : (
                    <span className="text-xs text-emerald-600 font-bold">Zero skill gaps! Perfect fit!</span>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Right: Live Gauge Card */}
          <div className="w-full lg:w-72 flex flex-col items-center justify-center p-6 neu-inset rounded-3xl gap-4 shrink-0 text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Algorithm Match Result
            </span>
            <MatchScoreIndicator score={liveScore} size="lg" />
            <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {liveScore >= 75
                ? 'Candidate is qualified for immediate interview pipeline.'
                : liveScore >= 50
                ? 'Moderate compatibility. Recommended bridge courses identified.'
                : 'Significant gaps detected. Target skill acquisition required.'}
            </div>
            <Link to="/signup" className="w-full">
              <NeuButton size="sm" className="w-full font-bold">
                Apply With Profile
              </NeuButton>
            </Link>
          </div>

        </NeuCard>
      </section>

      {/* 3. THREE-SIDED PORTAL PATHWAYS */}
      <section className="flex flex-col items-center gap-12">
        <div className="text-center max-w-2xl flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mx-auto">
            <Layers className="w-3.5 h-3.5" /> 3-Sided Collaboration
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)]">
            Tailored Experiences for Every Stakeholder
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Empowering students, recruiters, and placement officers on one synchronized platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          
          {/* Student Card */}
          <NeuCard hover className="flex flex-col justify-between p-8 gap-6 group">
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center neu-flat">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Student Workspace</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Build a standardized academic & skill profile, discover matched internships with transparent skill-gap scores, and track applications along a live status timeline.
              </p>
              <ul className="text-xs text-[var(--text-secondary)] flex flex-col gap-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Standardized Skill Taxonomy
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time Gap Breakdown
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Status Pipeline Audit Trail
                </li>
              </ul>
            </div>
            <Link to="/login?role=student">
              <NeuButton variant="primary" className="w-full font-bold">
                Enter Student Portal →
              </NeuButton>
            </Link>
          </NeuCard>

          {/* Recruiter Card */}
          <NeuCard hover className="flex flex-col justify-between p-8 gap-6 group">
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center neu-flat">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">Industry Recruiter</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Create internship listings with weighted skill criteria. Review candidate leaderboards automatically sorted by objective match score percentages.
              </p>
              <ul className="text-xs text-[var(--text-secondary)] flex flex-col gap-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Weighted Skills Creator
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Automated Applicant Ranking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 1-Click Status Transitions
                </li>
              </ul>
            </div>
            <Link to="/login?role=recruiter">
              <NeuButton variant="secondary" className="w-full font-bold">
                Enter Recruiter Hub →
              </NeuButton>
            </Link>
          </NeuCard>

          {/* College TPO Card */}
          <NeuCard hover className="flex flex-col justify-between p-8 gap-6 group">
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center neu-flat">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">College TPO Admin</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Verify student profiles, monitor branch-wise placement conversion funnels, and gain insights into curriculum skill deficiencies demanded by industry.
              </p>
              <ul className="text-xs text-[var(--text-secondary)] flex flex-col gap-2 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Student Verification Workflow
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Branch Placement Analytics
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Curriculum Gap Reports
                </li>
              </ul>
            </div>
            <Link to="/login?role=college_tpo">
              <NeuButton variant="secondary" className="w-full font-bold">
                Enter TPO Console →
              </NeuButton>
            </Link>
          </NeuCard>

        </div>
      </section>

      {/* 4. CALL TO ACTION FOOTER BANNER */}
      <section className="neu-flat p-10 sm:p-14 rounded-3xl text-center flex flex-col items-center gap-6 bg-gradient-to-br from-indigo-900/10 via-[var(--bg-main)] to-teal-900/10">
        <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)]">
          Ready to Modernize Campus Placements?
        </h2>
        <p className="text-base text-[var(--text-secondary)] max-w-xl">
          Join institutions and recruiters across India collaborating on SkillSync to maximize placement success.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/signup">
            <NeuButton size="lg" icon={ArrowRight} className="font-bold">
              Get Started Now
            </NeuButton>
          </Link>
          <Link to="/login">
            <NeuButton size="lg" variant="neutral" className="font-bold">
              Sign In to Existing Account
            </NeuButton>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
