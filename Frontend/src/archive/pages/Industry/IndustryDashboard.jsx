import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Users, Briefcase, Award, TrendingUp, Plus, 
  MapPin, Clock, DollarSign, Target, CheckCircle2, ChevronRight, X 
} from 'lucide-react';

const IndustryDashboard = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPostModal, setShowPostModal] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState('internship');
  const [location, setLocation] = useState('Remote');
  const [stipend, setStipend] = useState('');
  const [skills, setSkills] = useState('');
  const [desc, setDesc] = useState('');

  // Handle URL action parameter
  useEffect(() => {
    if (searchParams.get('action') === 'post') {
      setShowPostModal(true);
    }
  }, [searchParams]);

  // Mock Recruiter details
  const company = {
    name: 'Tata Consultancy Services (TCS)',
    recruiter: 'N. Chandrasekaran',
    sector: 'Information Technology'
  };

  const stats = [
    { label: 'Active Postings', value: '3 Posts', icon: Briefcase, color: 'text-purple-400 bg-purple-500/10' },
    { label: 'Total Applicants', value: '42 Candidates', icon: Users, color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Shortlisted Pool', value: '12 Qualified', icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'Avg. Profile Match', value: '81.4%', icon: Target, color: 'text-amber-400 bg-amber-500/10' }
  ];

  const [applicants, setApplicants] = useState([
    { id: 1, name: 'Aarav Mehta', role: 'Frontend React Intern', institution: 'IIT Bombay', match: 94, status: 'Shortlisted', date: 'Aug 24' },
    { id: 2, name: 'Priyah Patel', role: 'React Frontend Intern', institution: 'BITS Pilani', match: 82, status: 'Applied', date: 'Aug 25' },
    { id: 3, name: 'Rohan Sharma', role: 'Database Developer', institution: 'Delhi Technological University', match: 68, status: 'Applied', date: 'Aug 23' },
    { id: 4, name: 'Neha Gupta', role: 'Frontend React Intern', institution: 'IIIT Hyderabad', match: 78, status: 'Applied', date: 'Aug 24' }
  ]);

  const handleShortlist = (id) => {
    setApplicants(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, status: 'Shortlisted' };
      }
      return app;
    }));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setShowPostModal(false);
      // Reset form
      setTitle('');
      setStipend('');
      setSkills('');
      setDesc('');
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/40 relative overflow-hidden glassmorphism">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px]" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Industry Portal</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{company.name}</h1>
            <p className="text-xs text-slate-400 mt-1">Sector: {company.sector} — Managed by {company.recruiter}</p>
          </div>
          <button
            onClick={() => setShowPostModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all cursor-pointer w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            <span>Create Opportunity</span>
          </button>
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

      {/* Applicants List */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-base font-bold text-white font-sans">Active Applicant Pipeline</h3>
            <p className="text-xs text-slate-500">Review applicants filtered dynamically by skill match indexes</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-semibold">
                <th className="pb-3 font-semibold">Student Name</th>
                <th className="pb-3 font-semibold">College / Institution</th>
                <th className="pb-3 font-semibold">Applied Position</th>
                <th className="pb-3 font-semibold">Match score</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((app) => (
                <tr key={app.id} className="border-b border-slate-800/50 hover:bg-slate-900/20 transition-all">
                  <td className="py-4 font-bold text-slate-200">{app.name}</td>
                  <td className="py-4 text-slate-400">{app.institution}</td>
                  <td className="py-4 text-slate-300">{app.role}</td>
                  <td className="py-4">
                    <span className="font-mono font-semibold text-emerald-400">{app.match}% Match</span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      app.status === 'Shortlisted' 
                        ? 'text-emerald-400 bg-emerald-500/10' 
                        : 'text-slate-400 bg-slate-500/10'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {app.status === 'Applied' ? (
                      <button
                        onClick={() => handleShortlist(app.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all text-[10px] font-semibold cursor-pointer"
                      >
                        Shortlist Candidate
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-500 italic">Shortlisted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Post Opportunity Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-2xl relative glassmorphism animate-in zoom-in-95 duration-200">
            
            {/* Close */}
            <button 
              onClick={() => setShowPostModal(false)}
              className="absolute top-6 right-6 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!postSuccess ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Campaign Creator</span>
                  <h3 className="text-lg font-bold text-white mt-1">Publish New Internship / Job</h3>
                  <p className="text-xs text-slate-400">Pushes opportunity queries to student matching feeds</p>
                </div>

                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Position Title</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-emerald-500 focus:outline-none"
                        placeholder="React Developer Intern"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Compensation</label>
                      <input
                        type="text"
                        required
                        value={stipend}
                        onChange={(e) => setStipend(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-emerald-500 focus:outline-none"
                        placeholder="₹25,000 / month"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Job Type</label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="internship">Internship</option>
                        <option value="job">Full-time Job</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Location Type</label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Required Skills (Comma separated)</label>
                    <input
                      type="text"
                      required
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-emerald-500 focus:outline-none"
                      placeholder="React.js, JavaScript, Tailwind CSS"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-emerald-500 focus:outline-none placeholder-slate-700"
                      placeholder="Explain key core tasks..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white shadow-lg transition-all cursor-pointer"
                  >
                    Post Opportunity & Launch Match Engine
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Opportunity Published!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    The placement matches algorithm has been triggered. Eligible candidates matching these skills will receive notification feeds immediately.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default IndustryDashboard;
