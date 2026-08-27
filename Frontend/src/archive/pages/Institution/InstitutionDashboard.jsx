import React, { useState } from 'react';
import { School, TrendingUp, Users, DollarSign, Award, BookOpen, ChevronRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

const InstitutionDashboard = () => {
  const [activeTab, setActiveTab] = useState('statistics');

  const institution = {
    name: 'Indian Institute of Technology, Bombay',
    admin: 'Director Prof. Subhasis Chaudhuri',
    code: 'IITB-2026'
  };

  const stats = [
    { label: 'Avg Placement Rate', value: '78.2%', icon: TrendingUp, color: 'text-purple-400 bg-purple-500/10' },
    { label: 'Average CTC Package', value: '₹12.4 LPA', icon: DollarSign, color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Assessed Students', value: '1,420 Students', icon: Users, color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'Industry Collaborators', value: '38 Partners', icon: School, color: 'text-amber-400 bg-amber-500/10' }
  ];

  const skillAverages = [
    { name: 'JavaScript & Web Dev', average: 84, status: 'Optimal', color: 'bg-emerald-500' },
    { name: 'SQL Databases', average: 52, status: 'Deficit detected', color: 'bg-rose-500' },
    { name: 'Data Structures & Algorithms', average: 76, status: 'Optimal', color: 'bg-emerald-500' },
    { name: 'Cloud Computing & DevOps', average: 38, status: 'Critical Deficit', color: 'bg-rose-500' }
  ];

  const students = [
    { id: 1, name: 'Aarav Mehta', dept: 'CSE', cgpa: '9.1', assessments: 3, status: 'Placed', ctc: '₹18 LPA' },
    { id: 2, name: 'Priyah Patel', dept: 'CSE', cgpa: '8.4', assessments: 2, status: 'Placed', ctc: '₹12 LPA' },
    { id: 3, name: 'Rohan Sharma', dept: 'ECE', cgpa: '7.8', assessments: 4, status: 'Needs Training', ctc: 'N/A' },
    { id: 4, name: 'Neha Gupta', dept: 'IT', cgpa: '8.1', assessments: 1, status: 'Ready', ctc: 'N/A' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/40 relative overflow-hidden glassmorphism">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Institution Analytics Console</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{institution.name}</h1>
            <p className="text-xs text-slate-400 mt-1">Code: {institution.code} — Directed by {institution.admin}</p>
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
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab Nav */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab('statistics')}
          className={`pb-3 text-xs font-bold border-b-2 cursor-pointer transition-all ${
            activeTab === 'statistics' 
              ? 'border-purple-500 text-purple-400' 
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Curriculum & Skill Metrics
        </button>
        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3 text-xs font-bold border-b-2 cursor-pointer transition-all ${
            activeTab === 'students' 
              ? 'border-purple-500 text-purple-400' 
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Student Progress Monitor
        </button>
      </div>

      {/* Tab 1: Stats & Gaps */}
      {activeTab === 'statistics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Deficit Matrix */}
          <div className="lg:col-span-2 p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card">
            <h3 className="text-base font-bold text-white mb-6">Aggregated Student Skill Indices</h3>
            <div className="space-y-4">
              {skillAverages.map((s, idx) => {
                const isDeficit = s.average < 60;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-200">{s.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Class Average: {s.average}%</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          isDeficit 
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {s.status}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                      <div className={`${s.color} h-2 rounded-full`} style={{ width: `${s.average}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Recommendations */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Curriculum Warnings</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                SQL and DevOps averages are under the target 60% threshold. It is recommended to schedule remedial bootcamps.
              </p>
              
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900 flex items-start gap-3 mt-4">
                <BookOpen className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-slate-200">Suggested Action</h4>
                  <p className="text-[10px] text-slate-500 leading-normal mt-0.5">Integrate TCS-sponsored Database training into Semester VII Syllabus.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('Proposal logged to Academic Senate')}
              className="mt-6 w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg transition-all"
            >
              Propose Curriculum Update
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Student Tracker */}
      {activeTab === 'students' && (
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card">
          <h3 className="text-base font-bold text-white mb-6 font-sans">Placement Readiness & Outcome Index</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-semibold">
                  <th className="pb-3 font-semibold">Student Name</th>
                  <th className="pb-3 font-semibold">Department</th>
                  <th className="pb-3 font-semibold">CGPA</th>
                  <th className="pb-3 font-semibold">Assessments Passed</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Compensation Offer</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-b border-slate-800/50 hover:bg-slate-900/20 transition-all">
                    <td className="py-4 font-bold text-slate-200">{s.name}</td>
                    <td className="py-4 text-slate-400">{s.dept}</td>
                    <td className="py-4 font-mono text-slate-300">{s.cgpa}</td>
                    <td className="py-4 text-slate-400">{s.assessments} modules</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        s.status === 'Placed' 
                          ? 'text-emerald-400 bg-emerald-500/10' 
                          : s.status === 'Ready'
                            ? 'text-purple-400 bg-purple-500/10'
                            : 'text-amber-400 bg-amber-500/10'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-4 font-semibold text-slate-200 text-right">{s.ctc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default InstitutionDashboard;
