import React, { useState } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Target, ChevronRight, CheckCircle2, X } from 'lucide-react';

const JobPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isAppliedSuccessfully, setIsAppliedSuccessfully] = useState(false);

  const jobs = [
    {
      id: 1,
      role: 'React Frontend Intern',
      company: 'TCS Research',
      location: 'Mumbai (Hybrid)',
      type: 'internship',
      stipend: '₹25,000 / month',
      match: 94,
      skills: ['React.js', 'JavaScript', 'Tailwind CSS'],
      desc: 'Build dashboard widgets and client interfaces using modular components. Collaborate with backend REST APIs.'
    },
    {
      id: 2,
      role: 'Database Developer',
      company: 'Infosys Solutions',
      location: 'Bangalore (On-site)',
      type: 'job',
      stipend: '₹8,50,000 / year',
      match: 68,
      skills: ['SQL', 'PostgreSQL', 'Query Optimization'],
      desc: 'Design table relationships, optimize index performances, build stored procedures and functions.'
    },
    {
      id: 3,
      role: 'Software Engineer (Web)',
      company: 'Cognizant Digital',
      location: 'Remote',
      type: 'job',
      stipend: '₹7,20,000 / year',
      match: 88,
      skills: ['React.js', 'Node.js', 'PostgreSQL'],
      desc: 'Maintain scalable codebases for enterprise SaaS tools. Participate in agile sprints and design discussions.'
    },
    {
      id: 4,
      role: 'Full Stack Associate',
      company: 'Wipro Technologies',
      location: 'Pune (Hybrid)',
      type: 'internship',
      stipend: '₹20,000 / month',
      match: 58,
      skills: ['JavaScript', 'Node.js', 'SQL'],
      desc: 'Develop server endpoints, support CI/CD pipelines, execute unit tests on key functional components.'
    }
  ];

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setIsApplying(true);
    // Simulate short submission latency
    setTimeout(() => {
      setIsApplying(false);
      setIsAppliedSuccessfully(true);
    }, 1000);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsAppliedSuccessfully(false);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || job.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Internship & Job Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Discover opportunities matched automatically to your verified skill portfolio.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800 glassmorphism-card">
        {/* Search */}
        <div className="sm:col-span-2 relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none placeholder-slate-600 transition-all"
            placeholder="Search roles, skills, or companies..."
          />
        </div>

        {/* Filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs focus:border-purple-500 focus:outline-none cursor-pointer transition-all"
        >
          <option value="all">All Postings</option>
          <option value="internship">Internships Only</option>
          <option value="job">Full-time Jobs Only</option>
        </select>
      </div>

      {/* Job Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div 
            key={job.id} 
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between hover:border-slate-700/60 transition-all glassmorphism-card group"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-400 transition-colors">{job.role}</h3>
                  <span className="text-xs text-slate-400 font-semibold">{job.company}</span>
                </div>
                {/* Match percentage */}
                <div className={`px-2.5 py-1 rounded-xl flex items-center gap-1 border text-[10px] font-bold ${
                  job.match >= 80 
                    ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' 
                    : 'text-slate-400 bg-slate-500/10 border-slate-500/10'
                }`}>
                  <Target className="w-3 h-3" />
                  <span>{job.match}% Match</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-slate-400 line-clamp-2">{job.desc}</p>

              {/* Badges / Skills */}
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400 border border-slate-900 font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Meta details */}
              <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium pt-2 border-t border-slate-800/60">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />{job.stipend}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedJob(job)}
              className="mt-6 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg shadow-purple-600/25 transition-all cursor-pointer"
            >
              <span>View Details & Apply</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500 text-sm">
            No active postings match your search filters.
          </div>
        )}
      </div>

      {/* Application Popup Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-2xl relative glassmorphism animate-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-6 right-6 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isAppliedSuccessfully ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Application Desk</span>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedJob.role}</h3>
                  <p className="text-xs text-slate-400">{selectedJob.company} • {selectedJob.location}</p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex items-start gap-3">
                  <Target className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Dynamic Skill Sync Matched: {selectedJob.match}%</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                      Our alignment parser verified that your profile contains {selectedJob.skills.filter((_, i) => i < 2).join(', ')} badges.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-300">Share Cover Introduction (Optional)</label>
                    <textarea
                      rows={3}
                      className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none placeholder-slate-700"
                      placeholder="Explain briefly why you fit this role..."
                    />
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-slate-950/60 border border-slate-900 rounded-xl">
                    <input
                      type="checkbox"
                      id="share-portfolio"
                      defaultChecked
                      className="rounded border-slate-800 text-purple-600 focus:ring-purple-500 bg-slate-950"
                    />
                    <label htmlFor="share-portfolio" className="text-[10px] text-slate-400 font-medium cursor-pointer">
                      Auto-sync my verified SkillSync Digital Portfolio resume link
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isApplying}
                    className="w-full flex items-center justify-center py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isApplying ? 'Submitting Application...' : 'Confirm Verification & Apply'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Application Submitted!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Your matched score and verified skill profile credentials have been shared with the TCS recruiters. You will receive email notifications.
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer"
                >
                  Close Desk
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default JobPortal;
