import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, Briefcase, TrendingUp, AlertTriangle, BookOpen, 
  ArrowRight, ShieldCheck, CheckCircle2, ChevronRight 
} from 'lucide-react';

const StudentDashboard = () => {
  // Mock Student details
  const profile = {
    name: 'Aarav Mehta',
    course: 'B.Tech in Computer Science (Final Year)',
    institution: 'IIT Bombay',
    completion: 82
  };

  const stats = [
    { label: 'Assessment Score', value: '78%', subtext: 'Updated 2 days ago', icon: Award, color: 'text-purple-400 bg-purple-500/10' },
    { label: 'Applied Internships', value: '4 Active', subtext: '1 interview scheduled', icon: Briefcase, color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Skills Verified', value: '7 Skills', subtext: '3 badges earned', icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'Identified Gaps', value: '2 Gaps', subtext: 'Needs immediate action', icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10' }
  ];

  const skillGaps = [
    { name: 'JavaScript & React', level: 85, required: 80, status: 'Optimal', color: 'bg-emerald-500' },
    { name: 'SQL Databases (PostgreSQL)', level: 45, required: 70, status: 'Critical Gap', color: 'bg-rose-500' },
    { name: 'Data Structures & Algorithms', level: 60, required: 75, status: 'Moderate Gap', color: 'bg-amber-500' },
    { name: 'DevOps & CI/CD', level: 30, required: 60, status: 'Critical Gap', color: 'bg-rose-500' },
    { name: 'Communication & Presentation', level: 90, required: 70, status: 'Optimal', color: 'bg-emerald-500' }
  ];

  const applications = [
    { company: 'TCS Research', role: 'Frontend Intern', match: 94, status: 'Interviewing', date: 'Aug 24, 2026', statusColor: 'text-blue-400 bg-blue-500/10' },
    { company: 'Cognizant', role: 'React Developer', match: 88, status: 'Shortlisted', date: 'Aug 20, 2026', statusColor: 'text-emerald-400 bg-emerald-500/10' },
    { company: 'Wipro Technologies', role: 'Database Associate', match: 58, status: 'Applied', date: 'Aug 18, 2026', statusColor: 'text-slate-400 bg-slate-500/10' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/40 relative overflow-hidden glassmorphism">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Student Portal</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Welcome back, {profile.name}</h1>
            <p className="text-xs text-slate-400 mt-1">{profile.course} — {profile.institution}</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-900 w-full sm:w-auto">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">Profile Completion</span>
              <span className="text-lg font-bold text-white mt-0.5">{profile.completion}%</span>
            </div>
            <div className="w-24 bg-slate-900 rounded-full h-2 overflow-hidden">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${profile.completion}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between hover:border-slate-700/60 transition-all glassmorphism-card">
              <div className="flex justify-between items-start">
                <span className="text-xs font-medium text-slate-400">{s.label}</span>
                <span className={`p-2 rounded-xl ${s.color}`}>
                  <Icon className="w-4.5 h-4.5" />
                </span>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-white">{s.value}</span>
                <p className="text-[10px] text-slate-500 mt-1">{s.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Skill Gaps and Active Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Skill Gap Analysis */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Skill Gap Matrix</h3>
              <p className="text-xs text-slate-500">Calculated from your latest assessments vs industry requirement baselines</p>
            </div>
            <Link 
              to="/student/assessment" 
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 hover:translate-x-0.5 transition-all"
            >
              <span>Retake Test</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {skillGaps.map((skill, idx) => {
              const isGap = skill.level < skill.required;
              return (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Score: {skill.level}% (Req: {skill.required}%)</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        skill.status === 'Optimal' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10' 
                          : skill.status === 'Moderate Gap'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/10'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/10'
                      }`}>
                        {skill.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 flex overflow-hidden">
                    <div className={`${skill.color} h-2 rounded-full`} style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Panel / Quick Recommendations */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between glassmorphism-card">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Targeted Learning Path</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on your detected SQL database deficit, we recommend the following certifications:
            </p>

            <div className="space-y-3 mt-4">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900 flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">PostgreSQL Basics to Advanced</h4>
                  <span className="text-[10px] text-slate-500">Sponsored by Industry Collaborators</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900 flex items-start gap-3">
                <BookOpen className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Database Tuning & Query Optimization</h4>
                  <span className="text-[10px] text-slate-500">Self-Paced Workshop</span>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/student/jobs"
            className="mt-6 w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg shadow-purple-600/25 transition-all"
          >
            <span>Browse Matched Internships</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Applications Tracker */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card">
        <h3 className="text-base font-bold text-white mb-6">Recent Applications & Status</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-semibold">
                <th className="pb-3 font-semibold">Company / Partner</th>
                <th className="pb-3 font-semibold">Job / Internship Role</th>
                <th className="pb-3 font-semibold">Match score</th>
                <th className="pb-3 font-semibold">Application Date</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-900/20 transition-all">
                  <td className="py-4 font-bold text-slate-200">{app.company}</td>
                  <td className="py-4 text-slate-300">{app.role}</td>
                  <td className="py-4 font-mono font-semibold text-purple-400">{app.match}% Match</td>
                  <td className="py-4 text-slate-500">{app.date}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${app.statusColor}`}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;
