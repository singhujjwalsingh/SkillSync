import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, Briefcase, GraduationCap, School, Layers, 
  ArrowRight, ShieldCheck, Zap, BarChart3, LineChart, Target, Compass
} from 'lucide-react';

const LandingPage = () => {
  const roles = [
    {
      title: 'Student Workspace',
      desc: 'Take interactive skill tests, identify competence gaps, apply to verified internships, and build an exportable digital resume.',
      icon: Award,
      color: 'from-blue-600 to-cyan-500',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      cta: 'Explore Portfolio',
      link: '/login?role=student'
    },
    {
      title: 'Industry Portal',
      desc: 'Post job postings with required skill checklists. Access students matched dynamically via matching scoring models.',
      icon: Briefcase,
      color: 'from-emerald-600 to-teal-500',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      cta: 'Post Internship',
      link: '/login?role=industry'
    },
    {
      title: 'Academician Hub',
      desc: 'Collaborate on research projects, explore industrial training programs, and register for Faculty Development Programs (FDPs).',
      icon: GraduationCap,
      color: 'from-amber-600 to-orange-500',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      cta: 'Browse Faculty Jobs',
      link: '/login?role=academician'
    },
    {
      title: 'Institution Dashboard',
      desc: 'Gain bird-eye analytical views of institutional placements, skill distribution matrices, and student career progression metrics.',
      icon: School,
      color: 'from-purple-600 to-pink-500',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      cta: 'View Institutional KPIs',
      link: '/login?role=institution'
    }
  ];

  const features = [
    { title: 'Interactive Assessments', desc: 'Assess hard and soft skills in a controlled workspace and generate instant feedback graphs.', icon: Target },
    { title: 'AI Matching Engine', desc: 'Match students with internship vacancies depending on real skill compatibility percentages.', icon: Zap },
    { title: 'Collaboration Workspace', desc: 'Allow industry recruiters to hire academic experts and run industrial consultancy initiatives.', icon: Compass },
    { title: 'Institutional Audits', desc: 'Provide college administrators with unified charts summarizing placements and skill development.', icon: BarChart3 }
  ];

  return (
    <div className="relative isolate overflow-hidden bg-slate-950">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-full -translate-x-1/2 bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950" />
      
      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-xs text-purple-400 font-medium mb-8 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            Smart India Hackathon 2026 Submission
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Bridging the Gap Between <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
              Academia & Industry
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-400 max-w-3xl mx-auto">
            SkillSync is an intelligent collaboration portal matching students, universities, and industry recruiters to accelerate placement tracking, skill auditing, and joint research.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/register"
              className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-purple-600/20 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center gap-2 hover:translate-x-0.5"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#roles"
              className="text-sm font-semibold leading-6 text-slate-300 hover:text-white transition-colors"
            >
              Explore Portals <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* CSS Mockup Dashboard Card */}
        <div className="mt-16 sm:mt-20 mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/60 p-4 sm:p-6 shadow-2xl glassmorphism">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs text-slate-500 font-mono">skillsync-dashboard-v1.0.exe</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-slate-800 text-[10px] text-purple-400 font-semibold font-mono uppercase tracking-wider">
              Simulation Active
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mock Stat 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-900 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Global Match Rating</span>
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-3xl font-bold text-white">92.4%</span>
              <div className="w-full bg-slate-900 rounded-full h-1.5 mt-2">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '92.4%' }} />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Based on 14,000+ matched criteria</p>
            </div>

            {/* Mock Stat 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-900 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Placement Conversions</span>
                <LineChart className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-3xl font-bold text-white">+48.2%</span>
              <div className="w-full bg-slate-900 rounded-full h-1.5 mt-2">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '78%' }} />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Compared to legacy college portals</p>
            </div>

            {/* Mock Stat 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-900 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Active Collaborations</span>
                <ShieldCheck className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-3xl font-bold text-white">412 PS</span>
              <div className="w-full bg-slate-900 rounded-full h-1.5 mt-2">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Research & Faculty FDP postings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Callout */}
      <section className="border-t border-slate-900 bg-slate-950 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">The Challenge</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 leading-tight">
              Bridging the Critical <br className="hidden sm:inline" />
              Skills Deficit
            </h2>
            <p className="mt-6 text-slate-400 leading-relaxed text-sm">
              A massive gap exists between skills taught in colleges and competencies required by companies. Students struggle to identify relevant skills, industries struggle to filter high-fit candidates, and academic institutions lack clear placement outcomes data.
            </p>
            
            <div className="mt-8 space-y-4">
              {[
                'Students suffer from unguided skill matrices and stale curriculums.',
                'Industries filter through generic resumes lacking verified badge histories.',
                'Universities lack unified placement trackers and research collaboration models.'
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs leading-relaxed text-slate-300">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 text-[10px] shrink-0 font-bold">
                    !
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 glassmorphism-card">
            <h3 className="text-lg font-bold text-white mb-6">SkillSync Solutions Suite</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex flex-col gap-2">
                    <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400">
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <h4 className="text-sm font-semibold text-slate-200">{f.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Role-Based Portals Section */}
      <section id="roles" className="border-t border-slate-900 bg-slate-900/10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Tailored Experiences</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Select Your Profile Role
            </h2>
            <p className="text-slate-400 mt-4 text-sm leading-relaxed">
              SkillSync features customized workspaces for students, recruiters, academic professors, and college administrators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((r, i) => {
              const Icon = r.icon;
              return (
                <div 
                  key={i} 
                  className="group relative flex flex-col justify-between p-6 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-700/80 transition-all duration-300 hover:-translate-y-1 glassmorphism-card"
                >
                  <div className="space-y-4">
                    <span className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-tr ${r.color} text-white shadow-lg`}>
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">{r.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
                  </div>

                  <Link 
                    to={r.link}
                    className="mt-6 w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white hover:bg-slate-800/50 transition-all"
                  >
                    <span>{r.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section id="stats" className="border-t border-slate-900 bg-slate-950 py-16 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-purple-900/10 to-indigo-900/10 border border-slate-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden glassmorphism">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">99.2%</span>
              <span className="text-xs text-slate-400 font-medium">Matching Fidelity</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-purple-400">12k+</span>
              <span className="text-xs text-slate-400 font-medium">Matched Internships</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-indigo-400">450+</span>
              <span className="text-xs text-slate-400 font-medium">Universities Engaged</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-cyan-400">1,800+</span>
              <span className="text-xs text-slate-400 font-medium">FDP Collaborations</span>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default LandingPage;
