import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, Briefcase, MapPin, DollarSign, Target, ChevronRight, 
  CheckCircle2, X, AlertCircle, FileText, UploadCloud, Check, 
  HelpCircle, Filter, ArrowUpRight, ShieldCheck, Sparkles, Star
} from 'lucide-react';

const JobPortal = () => {
  const { studentProfile, setStudentProfile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterMode, setFilterMode] = useState('all');
  const [filterStipend, setFilterStipend] = useState('all');
  const [filterMatch, setFilterMatch] = useState('all');
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isAppliedSuccessfully, setIsAppliedSuccessfully] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  // Inline resume upload simulation state
  const [uploadProgress, setUploadProgress] = useState(null);

  const student = studentProfile || {
    name: 'Aarav Mehta',
    skills: [],
    resume: null
  };

  const jobs = [
    {
      id: 1,
      role: 'React Frontend Intern',
      company: 'TCS Research',
      location: 'Mumbai (Hybrid)',
      type: 'internship',
      workMode: 'hybrid',
      stipend: '₹25,000 / month',
      stipendVal: 25000,
      skills: ['React.js / Next.js', 'JavaScript / Node.js', 'HTML & CSS / Tailwind'],
      desc: 'Build dashboard widgets and client interfaces using modular components. Collaborate with backend REST APIs to integrate secure micro-frontends.',
      responsibilities: [
        'Develop responsive web pages using React and CSS grid systems.',
        'Optimize client-side components to achieve sub-second paint load times.',
        'Write unit tests using Jest and React Testing Library.',
        'Integrate local verification states using custom React context abstractions.'
      ],
      requirements: [
        'Strong fundamentals in HTML, CSS, JavaScript (ES6+).',
        'Familiarity with React component lifecycle, Hooks, and routers.',
        'Understand semantic HTML structures and web accessibility (WCAG) guidelines.'
      ]
    },
    {
      id: 2,
      role: 'Database Developer',
      company: 'Infosys Solutions',
      location: 'Bangalore (On-site)',
      type: 'job',
      workMode: 'on-site',
      stipend: '₹70,000 / month',
      stipendVal: 70000,
      skills: ['SQL Databases (Postgres/MySQL)', 'Data Structures & Algorithms', 'JavaScript / Node.js'],
      desc: 'Design relational table schemas, optimize index performances, build robust stored procedures, functions, and materialized query views.',
      responsibilities: [
        'Maintain and refactor production PostgreSQL schema clusters.',
        'Identify slow-running queries and optimize database transaction logic.',
        'Coordinate database replication protocols for failover backups.',
        'Collaborate with backend engineers to streamline node-postgres bindings.'
      ],
      requirements: [
        'Solid comprehension of SQL syntax, normalizations, and clustering indices.',
        'Experience with MySQL, PostgreSQL, or Oracle schemas.',
        'Knowledge of connection pooling and distributed database nodes.'
      ]
    },
    {
      id: 3,
      role: 'Software Engineer (Web)',
      company: 'Cognizant Digital',
      location: 'Remote',
      type: 'job',
      workMode: 'remote',
      stipend: '₹60,000 / month',
      stipendVal: 60000,
      skills: ['React.js / Next.js', 'JavaScript / Node.js', 'SQL Databases (Postgres/MySQL)'],
      desc: 'Maintain scalable, test-driven codebases for enterprise SaaS platforms. Participate in Agile daily standups and UI UX design brainstorming sessions.',
      responsibilities: [
        'Build features in Next.js backend-API routes and front-end layouts.',
        'Manage states across application frameworks with Redux / Zustand.',
        'Code review peer merge requests to maintain architectural standards.',
        'Deploy microservices containers using Docker pipelines.'
      ],
      requirements: [
        '1+ years of experience with Node.js and modern JavaScript frameworks.',
        'Excellent understanding of asynchronous JS and RESTful conventions.',
        'Familiarity with containerized deployments and Git workflow.'
      ]
    },
    {
      id: 4,
      role: 'Full Stack Associate',
      company: 'Wipro Technologies',
      location: 'Pune (Hybrid)',
      type: 'internship',
      workMode: 'hybrid',
      stipend: '₹20,000 / month',
      stipendVal: 20000,
      skills: ['JavaScript / Node.js', 'SQL Databases (Postgres/MySQL)', 'Data Structures & Algorithms'],
      desc: 'Develop secure API server endpoints, support continuous integration (CI/CD) pipelines, and execute QA tests on backend services.',
      responsibilities: [
        'Implement web controllers and request routers in Express.',
        'Conduct integration tests on REST parameters using Postman/Supertest.',
        'Debug and fix database deadlock conditions on local sandboxes.',
        'Document developer setup readmes and code API parameters.'
      ],
      requirements: [
        'Basic understand of backend server architectures and MVC structures.',
        'Analytical problem solving using Data Structures & Algorithms.',
        'Eagerness to learn cloud technologies (AWS, GCP).'
      ]
    },
    {
      id: 5,
      role: 'Junior Web Developer',
      company: 'Tech Mahindra',
      location: 'Remote',
      type: 'internship',
      workMode: 'remote',
      stipend: '₹15,000 / month',
      stipendVal: 15000,
      skills: ['HTML & CSS / Tailwind', 'JavaScript / Node.js'],
      desc: 'Develop responsive email layouts and interactive landing pages for client campaigns. Refine user experiences through micro-animations.',
      responsibilities: [
        'Convert design mockups into pixel-perfect semantic HTML structures.',
        'Write responsive CSS layouts using Flexbox and CSS Grid frameworks.',
        'Debug cross-browser rendering inconsistencies on Safari, Chrome, and Edge.'
      ],
      requirements: [
        'Fluent with CSS utilities like Tailwind or Bootstrap.',
        'Familiarity with version control systems (Git).'
      ]
    },
    {
      id: 6,
      role: 'Core Systems Intern',
      company: 'HCL Labs',
      location: 'Noida (On-site)',
      type: 'internship',
      workMode: 'on-site',
      stipend: '₹18,000 / month',
      stipendVal: 18000,
      skills: ['Data Structures & Algorithms', 'SQL Databases (Postgres/MySQL)'],
      desc: 'Analyze systems configurations, execute benchmarks on query execution speeds, and support high-availability operations.',
      responsibilities: [
        'Execute load tests on system nodes and generate transaction statistics.',
        'Program script tasks in Python or Bash to automate routine logs extraction.',
        'Participate in data mapping sprints for migration audits.'
      ],
      requirements: [
        'Clear understandings of trees, graphs, sorting, and algorithmic complexities.',
        'Basic familiarity with Linux shells and database queries.'
      ]
    }
  ];

  // Dynamic Skill Alignment Score calculation
  const calculateMatchScore = (jobSkills) => {
    if (!student.skills || student.skills.length === 0) return 20; // fallback base score
    let matchedCount = 0;
    let verifiedCount = 0;
    let totalProficiency = 0;

    jobSkills.forEach(jobSkill => {
      // Find case-insensitive partial match
      const matchedSkill = student.skills.find(s => 
        s.name.toLowerCase().replace(/\s+/g, '').includes(jobSkill.toLowerCase().split('/')[0].trim().replace(/\s+/g, '')) ||
        jobSkill.toLowerCase().replace(/\s+/g, '').includes(s.name.toLowerCase().split('/')[0].trim().replace(/\s+/g, ''))
      );

      if (matchedSkill) {
        matchedCount++;
        totalProficiency += matchedSkill.level;
        if (matchedSkill.status === 'Verified') {
          verifiedCount += 1.5; // verified skills weighted heavier
        } else {
          verifiedCount += 1;
        }
      }
    });

    if (matchedCount === 0) return 15;

    const matchRatio = matchedCount / jobSkills.length;
    const avgProficiency = totalProficiency / matchedCount;
    
    // Weighted combination of ratio of matched skills and student's average proficiency
    const baseScore = (matchRatio * 60) + ((avgProficiency / 100) * 30);
    const verificationBonus = (verifiedCount / (jobSkills.length * 1.5)) * 10;
    
    return Math.min(100, Math.round(baseScore + verificationBonus));
  };

  // Inline Resume Upload
  const handleInlineResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStudentProfile(old => ({
              ...old,
              resume: {
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
                uploadDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              }
            }));
            setTimeout(() => setUploadProgress(null), 500);
            return 100;
          }
          return prev + 25;
        });
      }, 120);
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!student.resume) {
      alert("Please upload a resume first.");
      return;
    }
    setIsApplying(true);
    // Simulate API delay
    setTimeout(() => {
      setIsApplying(false);
      setIsAppliedSuccessfully(true);
    }, 1200);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsAppliedSuccessfully(false);
    setCoverLetter('');
  };

  // Filter & Search logic
  const filteredJobs = jobs
    .map(job => ({
      ...job,
      match: calculateMatchScore(job.skills)
    }))
    .filter(job => {
      // 1. Search Query
      const matchesSearch = 
        job.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Opportunity Type
      const matchesType = filterType === 'all' || job.type === filterType;

      // 3. Work Mode
      const matchesMode = filterMode === 'all' || job.workMode === filterMode;

      // 4. Stipend/Salary range
      let matchesStipend = true;
      if (filterStipend === '15') {
        matchesStipend = job.stipendVal >= 15000;
      } else if (filterStipend === '25') {
        matchesStipend = job.stipendVal >= 25000;
      } else if (filterStipend === '50') {
        matchesStipend = job.stipendVal >= 50000;
      }

      // 5. Match score alignment
      let matchesMatch = true;
      if (filterMatch === 'excellent') {
        matchesMatch = job.match >= 80;
      } else if (filterMatch === 'good') {
        matchesMatch = job.match >= 60;
      } else if (filterMatch === 'fair') {
        matchesMatch = job.match >= 40;
      }

      return matchesSearch && matchesType && matchesMode && matchesStipend && matchesMatch;
    });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            Internship & Job Portal <Sparkles className="w-5 h-5 text-purple-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">Discover industry roles. Matching scores are dynamically computed from your active profile skills.</p>
        </div>
      </div>

      {/* Advanced Filters & Search desk */}
      <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
            <Search className="w-4.5 h-4.5" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none placeholder-slate-650 transition-all"
            placeholder="Search by roles, skills (e.g. React, SQL), or company recruiters..."
          />
        </div>

        {/* Filter selects row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          
          {/* Filter Type */}
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Opportunity Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-850 text-slate-300 text-xs focus:border-purple-500 focus:outline-none cursor-pointer transition-all"
            >
              <option value="all">All Postings</option>
              <option value="internship">Internships</option>
              <option value="job">Full-time Jobs</option>
            </select>
          </div>

          {/* Filter Mode */}
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Work Mode</label>
            <select
              value={filterMode}
              onChange={(e) => setFilterMode(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-855 text-slate-300 text-xs focus:border-purple-500 focus:outline-none cursor-pointer transition-all"
            >
              <option value="all">All Modes</option>
              <option value="remote">Remote Only</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-site</option>
            </select>
          </div>

          {/* Filter Stipend */}
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Min Salary / Stipend</label>
            <select
              value={filterStipend}
              onChange={(e) => setFilterStipend(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-850 text-slate-300 text-xs focus:border-purple-500 focus:outline-none cursor-pointer transition-all"
            >
              <option value="all">Any Compensation</option>
              <option value="15">₹15,000+/mo</option>
              <option value="25">₹25,000+/mo</option>
              <option value="50">₹50,000+/mo</option>
            </select>
          </div>

          {/* Filter Match Score */}
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Alignment Score</label>
            <select
              value={filterMatch}
              onChange={(e) => setFilterMatch(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-950/80 border border-slate-850 text-slate-300 text-xs focus:border-purple-500 focus:outline-none cursor-pointer transition-all"
            >
              <option value="all">All Alignments</option>
              <option value="excellent">Excellent (&gt;80% Match)</option>
              <option value="good">Good (&gt;60% Match)</option>
              <option value="fair">Fair (&gt;40% Match)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Job Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div 
            key={job.id} 
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between hover:border-slate-700/60 transition-all glassmorphism-card group"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-400 transition-colors">{job.role}</h3>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                      job.type === 'internship' ? 'bg-indigo-500/15 text-indigo-400' : 'bg-emerald-500/15 text-emerald-400'
                    }`}>
                      {job.type}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">{job.company}</span>
                </div>
                
                {/* Dynamically calculated match score indicator */}
                <div className={`px-2.5 py-1 rounded-xl flex items-center gap-1 border shrink-0 text-[10px] font-bold ${
                  job.match >= 80 
                    ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' 
                    : job.match >= 50
                      ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
                      : 'text-slate-400 bg-slate-500/10 border-slate-550/10'
                }`}>
                  <Target className="w-3.5 h-3.5" />
                  <span>{job.match}% Match</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-slate-400 line-clamp-2">{job.desc}</p>

              {/* Badges / Skills Required */}
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill, idx) => {
                  const studentHasSkill = student.skills.some(s => 
                    s.name.toLowerCase().replace(/\s+/g, '').includes(skill.toLowerCase().split('/')[0].trim().replace(/\s+/g, '')) ||
                    skill.toLowerCase().replace(/\s+/g, '').includes(s.name.toLowerCase().split('/')[0].trim().replace(/\s+/g, ''))
                  );
                  return (
                    <span 
                      key={idx} 
                      className={`px-2 py-0.5 rounded text-[10px] border font-medium flex items-center gap-1 ${
                        studentHasSkill 
                          ? 'bg-purple-950/40 text-purple-300 border-purple-900/60' 
                          : 'bg-slate-950 text-slate-500 border-slate-900'
                      }`}
                    >
                      {studentHasSkill && <Check className="w-3 h-3 text-purple-400" />}
                      {skill}
                    </span>
                  );
                })}
              </div>

              {/* Meta details */}
              <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium pt-2 border-t border-slate-800/60">
                <span className="flex items-center gap-1 uppercase"><MapPin className="w-3.5 h-3.5 text-purple-400/80" />{job.location}</span>
                <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-400/80" />{job.stipend}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedJob(job)}
              className="mt-6 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg transition-all cursor-pointer"
            >
              <span>View Details & Apply</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500 text-sm border border-dashed border-slate-800 rounded-2xl">
            No active opportunities match your specific filtering queries.
          </div>
        )}
      </div>

      {/* Expanded Application Desk Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-850 bg-slate-900 p-6 sm:p-8 shadow-2xl relative glassmorphism animate-in zoom-in-95 duration-200 my-8 overflow-y-auto max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-6 right-6 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isAppliedSuccessfully ? (
              <div className="space-y-6">
                
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Application Desk</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                      selectedJob.type === 'internship' ? 'bg-indigo-500/15 text-indigo-400' : 'bg-emerald-500/15 text-emerald-400'
                    }`}>
                      {selectedJob.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">{selectedJob.role}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedJob.company} • {selectedJob.location}</p>
                </div>

                {/* Match Analysis Alert card */}
                <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10 space-y-3">
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-white">Dynamic Skill Alignment Score: {selectedJob.match}%</h4>
                      <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                        Our parser evaluated your verification profile skills against this role's requirement vector.
                      </p>
                    </div>
                  </div>
                  
                  {/* Skill breakdown list */}
                  <div className="border-t border-slate-800/80 pt-3 text-[11px] space-y-2">
                    <div className="font-semibold text-slate-300">Required Skills Breakdown:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedJob.skills.map((skill, idx) => {
                        const matchedSkill = student.skills?.find(s => 
                          s.name.toLowerCase().replace(/\s+/g, '').includes(skill.toLowerCase().split('/')[0].trim().replace(/\s+/g, '')) ||
                          skill.toLowerCase().replace(/\s+/g, '').includes(s.name.toLowerCase().split('/')[0].trim().replace(/\s+/g, ''))
                        );

                        return (
                          <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40 border border-slate-850">
                            <span className="text-slate-400 font-medium truncate">{skill}</span>
                            {matchedSkill ? (
                              <span className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold shrink-0">
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>{matchedSkill.level}%</span>
                                {matchedSkill.status === 'Verified' && <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />}
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-[9px] text-slate-600 font-bold shrink-0">
                                <X className="w-3 h-3" />
                                <span>Missing</span>
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Job Description details tabs */}
                <div className="space-y-4 border-t border-slate-800/80 pt-4">
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">About the Role</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">{selectedJob.desc}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1"><ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />Responsibilities</h4>
                      <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1.5 mt-2">
                        {selectedJob.responsibilities.map((r, i) => (
                          <li key={i} className="leading-relaxed">{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1"><Star className="w-3.5 h-3.5 text-purple-400" />Requirements</h4>
                      <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1.5 mt-2">
                        {selectedJob.requirements.map((req, i) => (
                          <li key={i} className="leading-relaxed">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Form application */}
                <form onSubmit={handleApplySubmit} className="space-y-4 pt-4 border-t border-slate-800/80">
                  
                  {/* Resume Sync status */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verification Resume Document</label>
                    {uploadProgress !== null ? (
                      <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/40 space-y-2 text-center text-xs">
                        <span className="text-slate-400">Uploading resume to profile...</span>
                        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                        </div>
                      </div>
                    ) : student.resume ? (
                      <div className="p-3.5 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-200 block truncate">{student.resume.name}</span>
                            <span className="text-[9px] text-slate-500 font-mono mt-0.5">Linked dynamically from Profile</span>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/15 uppercase">Attached</span>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl border border-rose-500/10 bg-rose-500/5 space-y-3">
                        <div className="flex items-start gap-2.5 text-xs text-rose-400">
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-white">No resume found on your digital profile</span>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">
                               recruiters require a digital CV resume. Upload one below to apply.
                            </p>
                          </div>
                        </div>
                        
                        <div className="relative border border-dashed border-rose-500/20 hover:border-purple-500/40 bg-slate-950/20 p-4 rounded-xl text-center cursor-pointer transition-colors group">
                          <input 
                            type="file" 
                            accept=".pdf,.doc,.docx"
                            onChange={handleInlineResumeUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <UploadCloud className="w-8 h-8 text-slate-500 group-hover:text-purple-400 mx-auto transition-colors" />
                          <div className="text-[10px] font-semibold text-slate-300 mt-1">Upload Resume Instantly</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cover letter intro */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Share Cover Introduction (Optional)</label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none placeholder-slate-700 resize-none transition-colors"
                      placeholder="Add a brief cover note to TCS recruiters about why you fit this role..."
                    />
                  </div>

                  <div className="flex items-center gap-2.5 p-3.5 bg-slate-950/60 border border-slate-850 rounded-xl">
                    <input
                      type="checkbox"
                      id="share-profile"
                      defaultChecked
                      required
                      className="rounded border-slate-800 text-purple-600 focus:ring-purple-500 bg-slate-950"
                    />
                    <label htmlFor="share-profile" className="text-[10px] text-slate-400 leading-normal font-medium cursor-pointer">
                      I authorize sharing my verified SkillSync Digital Portfolio parameters, verified skill badges, and attached resume CV link.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isApplying || !student.resume}
                    className="w-full flex items-center justify-center py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isApplying ? 'Transmitting verified dossier...' : 'Confirm Verification & Apply'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-6">
                <span className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Application Successfully Transmitted!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Your dynamic score of <span className="text-purple-400 font-bold font-mono">{selectedJob.match}%</span>, skill credentials vector, and resume (<span className="text-slate-300 font-medium">{student.resume.name}</span>) have been synced with {selectedJob.company}.
                  </p>
                </div>
                
                <div className="border border-slate-850 rounded-2xl p-4 max-w-md mx-auto text-left text-xs bg-slate-950/50 space-y-2 text-slate-400">
                  <div className="font-bold text-slate-200 border-b border-slate-800 pb-1">Transmission Receipt</div>
                  <div><span className="text-slate-500">Recruiter Desk:</span> {selectedJob.company} Careers</div>
                  <div><span className="text-slate-500">Linked Resume:</span> {student.resume.name}</div>
                  <div><span className="text-slate-500">Verification Hash:</span> SS-MD5-{Math.random().toString(36).substring(2, 8).toUpperCase()}-{Math.floor(Date.now()/1000)}</div>
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
