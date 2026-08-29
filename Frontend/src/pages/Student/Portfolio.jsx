import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, Award, ExternalLink, Mail, Phone, MapPin, 
  Download, CheckCircle, Edit, Trash2, Plus, UploadCloud, 
  FileText, X, Eye, FileUp, Sparkles, GraduationCap, Briefcase
} from 'lucide-react';

const Portfolio = () => {
  const { studentProfile, setStudentProfile } = useAuth();
  const [copied, setCopied] = useState(false);
  
  // Modals & form state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isResumePreviewOpen, setIsResumePreviewOpen] = useState(false);
  
  // Active items being added/edited
  const [activeSkill, setActiveSkill] = useState({ name: '', level: 80, status: 'Self-Declared' });
  const [activeSkillIndex, setActiveSkillIndex] = useState(null); // null means "Add Mode"
  
  const [activeProject, setActiveProject] = useState({ name: '', tech: '', desc: '' });
  const [activeProjectIndex, setActiveProjectIndex] = useState(null); // null means "Add Mode"
  
  // Resume uploading state
  const [uploadProgress, setUploadProgress] = useState(null);
  const fileInputRef = useRef(null);

  // Form states for profile and education
  const [profileForm, setProfileForm] = useState({
    name: studentProfile?.name || '',
    role: studentProfile?.role || '',
    email: studentProfile?.email || '',
    phone: studentProfile?.phone || '',
    location: studentProfile?.location || '',
    degree: studentProfile?.education?.degree || '',
    institution: studentProfile?.education?.institution || '',
    timeline: studentProfile?.education?.timeline || '',
    cgpa: studentProfile?.education?.cgpa || '',
  });

  const student = studentProfile || {
    name: 'Aarav Mehta',
    role: 'Full Stack Engineer & Database Specialist',
    email: 'aarav.mehta@skillsync.sih',
    phone: '+91 98765 43210',
    location: 'Mumbai, MH, India',
    education: {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'Indian Institute of Technology, Bombay',
      timeline: '2023 - 2027',
      cgpa: '9.1 / 10.0'
    },
    skills: [],
    badges: [],
    projects: [],
    resume: null
  };

  const handleShareLink = () => {
    setCopied(true);
    navigator.clipboard.writeText(`https://skillsync.sih/portfolio/${student.name.toLowerCase().replace(/\s+/g, '-')}`);
    setTimeout(() => setCopied(false), 2000);
  };

  // Profile Edit Handler
  const openEditProfile = () => {
    setProfileForm({
      name: student.name,
      role: student.role,
      email: student.email,
      phone: student.phone,
      location: student.location,
      degree: student.education.degree,
      institution: student.education.institution,
      timeline: student.education.timeline,
      cgpa: student.education.cgpa,
    });
    setIsEditProfileOpen(true);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setStudentProfile(prev => ({
      ...prev,
      name: profileForm.name,
      role: profileForm.role,
      email: profileForm.email,
      phone: profileForm.phone,
      location: profileForm.location,
      education: {
        degree: profileForm.degree,
        institution: profileForm.institution,
        timeline: profileForm.timeline,
        cgpa: profileForm.cgpa
      }
    }));
    setIsEditProfileOpen(false);
  };

  // Skills CRUD Handlers
  const openAddSkill = () => {
    setActiveSkill({ name: '', level: 80, status: 'Self-Declared' });
    setActiveSkillIndex(null);
    setIsSkillModalOpen(true);
  };

  const openEditSkill = (skill, index) => {
    setActiveSkill({ ...skill });
    setActiveSkillIndex(index);
    setIsSkillModalOpen(true);
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (!activeSkill.name.trim()) return;

    setStudentProfile(prev => {
      const updatedSkills = [...prev.skills];
      if (activeSkillIndex !== null) {
        // Edit Mode
        updatedSkills[activeSkillIndex] = activeSkill;
      } else {
        // Add Mode
        updatedSkills.push(activeSkill);
      }
      return { ...prev, skills: updatedSkills };
    });
    setIsSkillModalOpen(false);
  };

  const handleDeleteSkill = (index) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      setStudentProfile(prev => {
        const updatedSkills = prev.skills.filter((_, i) => i !== index);
        return { ...prev, skills: updatedSkills };
      });
    }
  };

  // Projects CRUD Handlers
  const openAddProject = () => {
    setActiveProject({ name: '', tech: '', desc: '' });
    setActiveProjectIndex(null);
    setIsProjectModalOpen(true);
  };

  const openEditProject = (project, index) => {
    setActiveProject({ ...project });
    setActiveProjectIndex(index);
    setIsProjectModalOpen(true);
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!activeProject.name.trim()) return;

    setStudentProfile(prev => {
      const updatedProjects = [...prev.projects];
      if (activeProjectIndex !== null) {
        updatedProjects[activeProjectIndex] = activeProject;
      } else {
        updatedProjects.push(activeProject);
      }
      return { ...prev, projects: updatedProjects };
    });
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = (index) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setStudentProfile(prev => {
        const updatedProjects = prev.projects.filter((_, i) => i !== index);
        return { ...prev, projects: updatedProjects };
      });
    }
  };

  // Resume Upload Handler (Simulation)
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const simulateUpload = (file) => {
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
        return prev + 20;
      });
    }, 150);
  };

  const handleDeleteResume = () => {
    if (window.confirm("Are you sure you want to remove your resume?")) {
      setStudentProfile(prev => ({
        ...prev,
        resume: null
      }));
    }
  };

  // Mock Resume Download
  const handleDownloadResume = () => {
    if (!student.resume) return;
    alert(`Downloading ${student.resume.name}...`);
    // Create a virtual file to download
    const element = document.createElement("a");
    const file = new Blob([`SkillSync Verified Resume for ${student.name}\nRole: ${student.role}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = student.resume.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Action Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            Digital Portfolio <Sparkles className="w-5 h-5 text-purple-400" />
          </h1>
          <p className="text-xs text-slate-400 mt-1">Verified achievements, custom projects, and resumes tied cryptographically to your student profile.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={openEditProfile}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/80 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Edit className="w-4 h-4 text-purple-400" />
            <span>Edit Profile</span>
          </button>
          
          <button
            onClick={handleShareLink}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4 animate-bounce" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-4 h-4" />
                <span>Copy Portfolio Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Personal info & Education & Resume Desk */}
        <div className="space-y-6">
          
          {/* Profile Card */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-extrabold text-3xl flex items-center justify-center mx-auto shadow-xl border border-purple-500/20">
              {student.name.split(' ').map(w => w[0]).join('')}
            </div>
            <h2 className="text-lg font-bold text-white mt-4">{student.name}</h2>
            <p className="text-xs text-purple-400 mt-1">{student.role}</p>

            <div className="mt-6 flex flex-col gap-3 text-left text-xs border-t border-slate-800/80 pt-4 text-slate-400">
              <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-purple-400/80 shrink-0" />{student.email}</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-400/80 shrink-0" />{student.phone}</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400/80 shrink-0" />{student.location}</span>
            </div>
          </div>

          {/* Academic Record Card */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <GraduationCap className="w-4.5 h-4.5 text-purple-400" />
                <span>Academic Record</span>
              </h3>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-semibold text-slate-200">{student.education.degree || 'Not Added'}</h4>
                <p className="text-slate-400 mt-0.5">{student.education.institution || 'Click Edit Profile to add'}</p>
                <div className="flex justify-between mt-2.5 text-[10px] text-slate-500 font-mono">
                  <span>Timeline: {student.education.timeline || 'N/A'}</span>
                  <span className="text-purple-400 font-bold">CGPA: {student.education.cgpa || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Desk Card */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <FileText className="w-4.5 h-4.5 text-purple-400" />
              <span>Resume Desk</span>
            </h3>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".pdf,.doc,.docx"
              className="hidden" 
            />

            {uploadProgress !== null ? (
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-2 text-center text-xs">
                <FileUp className="w-8 h-8 text-purple-400 mx-auto animate-bounce" />
                <span className="text-slate-400 font-medium">Uploading Resume...</span>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-purple-500 h-1.5 rounded-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                </div>
                <span className="text-[10px] text-slate-600 font-mono">{uploadProgress}% Complete</span>
              </div>
            ) : student.resume ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl border border-purple-500/10 bg-purple-500/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-slate-200 truncate">{student.resume.name}</h4>
                    <p className="text-[10px] text-slate-500 font-mono mt-0.5">{student.resume.size} • {student.resume.uploadDate}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setIsResumePreviewOpen(true)}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-slate-800 hover:bg-slate-800/80 text-[11px] font-semibold text-slate-300 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-purple-400" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={handleDownloadResume}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-slate-800 hover:bg-slate-800/80 text-[11px] font-semibold text-slate-300 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Download</span>
                  </button>
                </div>
                
                <button
                  onClick={handleDeleteResume}
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 text-[10px] font-bold text-rose-400 transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Resume</span>
                </button>
              </div>
            ) : (
              <div 
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={triggerFileSelect}
                className="border border-dashed border-slate-800 hover:border-purple-500/40 bg-slate-950/20 hover:bg-purple-500/5 p-6 rounded-xl text-center cursor-pointer transition-all space-y-2 group"
              >
                <UploadCloud className="w-10 h-10 text-slate-600 group-hover:text-purple-400 mx-auto transition-colors" />
                <div className="text-xs font-semibold text-slate-300">Drag & Drop Resume</div>
                <div className="text-[10px] text-slate-500">PDF, DOC, DOCX up to 5MB</div>
                <div className="inline-block mt-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[10px] text-slate-400 group-hover:border-slate-700">
                  Select File
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Columns: Skills, Projects, Badges */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Verified Badges */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Cryptographic Verification Badges</h3>
              <p className="text-xs text-slate-500 mt-0.5">Certificates validated directly by educational boards and industry partners</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {student.badges.map((badge, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/5 relative overflow-hidden flex flex-col justify-between h-40 group hover:border-amber-500/30 transition-all"
                >
                  <ShieldCheck className="absolute top-2 right-2 w-12 h-12 text-amber-500/10 group-hover:text-amber-500/15 -z-10 transition-colors" />
                  
                  <div>
                    <span className="flex items-center gap-1 text-[9px] text-amber-400 font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0 animate-pulse" />
                      Verified
                    </span>
                    <h4 className="text-xs font-bold text-slate-200 mt-2 leading-snug">{badge.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{badge.organization}</p>
                  </div>

                  <div className="text-[9px] text-slate-400 font-mono border-t border-slate-800/80 pt-2 mt-2">
                    <div>Ref: {badge.id}</div>
                    <div className="mt-0.5">Authority: {badge.authority}</div>
                  </div>
                </div>
              ))}
              {student.badges.length === 0 && (
                <div className="col-span-full py-8 text-center text-xs text-slate-500">
                  No verified cryptographic badges earned yet.
                </div>
              )}
            </div>
          </div>

          {/* Skill Metrics */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold text-white">Skill Verification Matrix</h3>
              <button
                onClick={openAddSkill}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-xs font-bold text-purple-400 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </div>
            
            <div className="space-y-4 pt-2">
              {student.skills.map((skill, idx) => (
                <div key={idx} className="space-y-1.5 text-xs group/item">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200">{skill.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                        skill.status === 'Verified' 
                          ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20' 
                          : 'bg-slate-800 text-slate-400 border border-slate-800'
                      }`}>
                        {skill.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-medium">{skill.level}% Proficiency</span>
                      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800/80 rounded-lg p-0.5 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditSkill(skill, idx)}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(idx)}
                          className="p-1 hover:bg-slate-800 rounded text-rose-400 hover:text-rose-300 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-1.5 rounded-full bg-gradient-to-r ${
                        skill.status === 'Verified' ? 'from-purple-500 to-indigo-500' : 'from-slate-600 to-slate-500'
                      }`} 
                      style={{ width: `${skill.level}%` }} 
                    />
                  </div>
                </div>
              ))}
              {student.skills.length === 0 && (
                <div className="py-6 text-center text-slate-500 text-xs">
                  No skills listed. Click "Add Skill" to build your alignment portfolio.
                </div>
              )}
            </div>
          </div>

          {/* Projects */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <Briefcase className="w-4.5 h-4.5 text-purple-400" />
                <span>Featured Project Repositories</span>
              </h3>
              <button
                onClick={openAddProject}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-xs font-bold text-purple-400 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>
            
            <div className="flex flex-col gap-4 pt-2">
              {student.projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-900/80 hover:border-slate-800/80 flex justify-between items-start gap-4 group/proj transition-all">
                  <div className="space-y-2 flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-purple-400 fill-current shrink-0" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span className="truncate">{proj.name}</span>
                    </h4>
                    <p className="text-[11px] leading-relaxed text-slate-400 break-words">{proj.desc}</p>
                    <div className="text-[10px] text-purple-400/80 font-medium">Stack: {proj.tech}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-1 bg-slate-900 border border-slate-800/80 rounded-lg p-0.5 opacity-0 group-hover/proj:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditProject(proj, idx)}
                        className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(idx)}
                        className="p-1 hover:bg-slate-800 rounded text-rose-400 hover:text-rose-300 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white p-1.5 transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
              {student.projects.length === 0 && (
                <div className="py-6 text-center text-slate-500 text-xs">
                  No projects listed. Click "Add Project" to add your repositories.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-2xl relative glassmorphism animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setIsEditProfileOpen(false)}
              className="absolute top-6 right-6 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Edit Profile Details</h3>
            
            <form onSubmit={handleProfileSubmit} className="space-y-6 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Professional Role Title</label>
                  <input
                    type="text"
                    required
                    value={profileForm.role}
                    onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Contact Number</label>
                  <input
                    type="text"
                    required
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Location (City, State, Country)</label>
                  <input
                    type="text"
                    required
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <h4 className="text-sm font-semibold text-white border-b border-slate-850 pt-2 pb-2">Academic History</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Degree / Course</label>
                  <input
                    type="text"
                    required
                    value={profileForm.degree}
                    onChange={(e) => setProfileForm({ ...profileForm, degree: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">University / College</label>
                  <input
                    type="text"
                    required
                    value={profileForm.institution}
                    onChange={(e) => setProfileForm({ ...profileForm, institution: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Academic Timeline</label>
                  <input
                    type="text"
                    placeholder="e.g., 2023 - 2027"
                    required
                    value={profileForm.timeline}
                    onChange={(e) => setProfileForm({ ...profileForm, timeline: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">CGPA / Grade Marks</label>
                  <input
                    type="text"
                    placeholder="e.g., 9.1 / 10.0"
                    required
                    value={profileForm.cgpa}
                    onChange={(e) => setProfileForm({ ...profileForm, cgpa: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-850 hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Skill Modal (Add/Edit) */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl relative glassmorphism animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsSkillModalOpen(false)}
              className="absolute top-6 right-6 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              {activeSkillIndex !== null ? 'Edit Skill Metric' : 'Add New Skill Metric'}
            </h3>

            <form onSubmit={handleSkillSubmit} className="space-y-4 mt-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Node.js, Python, Figma"
                  value={activeSkill.name}
                  onChange={(e) => setActiveSkill({ ...activeSkill, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  <span>Proficiency Rating</span>
                  <span className="text-purple-400 font-mono font-bold">{activeSkill.level}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={activeSkill.level}
                  onChange={(e) => setActiveSkill({ ...activeSkill, level: parseInt(e.target.value) })}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Verification Status</label>
                <select
                  value={activeSkill.status}
                  onChange={(e) => setActiveSkill({ ...activeSkill, status: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs focus:border-purple-500 focus:outline-none cursor-pointer transition-colors"
                >
                  <option value="Self-Declared">Self-Declared (Unverified)</option>
                  <option value="Verified">Verified Certification Badge</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-850 mt-6">
                <button
                  type="button"
                  onClick={() => setIsSkillModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-850 hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg transition-colors cursor-pointer"
                >
                  {activeSkillIndex !== null ? 'Save Changes' : 'Add Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Modal (Add/Edit) */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl relative glassmorphism animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-6 right-6 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
              {activeProjectIndex !== null ? 'Edit Project Repository' : 'Featured Project Details'}
            </h3>

            <form onSubmit={handleProjectSubmit} className="space-y-4 mt-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Decentralized Voting DApp"
                  value={activeProject.name}
                  onChange={(e) => setActiveProject({ ...activeProject, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Tech Stack Used</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React, Solidity, Web3.js, Tailwind"
                  value={activeProject.tech}
                  onChange={(e) => setActiveProject({ ...activeProject, tech: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Brief Repository Description</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain database architectures, key enhancements, performance results..."
                  value={activeProject.desc}
                  onChange={(e) => setActiveProject({ ...activeProject, desc: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none placeholder-slate-700 transition-colors resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-850 mt-6">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-850 hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg transition-colors cursor-pointer"
                >
                  {activeProjectIndex !== null ? 'Save Changes' : 'Add Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resume Preview Modal (Paper Simulator) */}
      {isResumePreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-3xl border border-slate-850 bg-slate-900 shadow-2xl relative animate-in zoom-in-95 duration-200 my-8 overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center bg-slate-950 p-4 px-6 border-b border-slate-850">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-bold text-slate-200">Interactive Document Viewer: {student.resume?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadResume}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-[10px] font-bold text-white transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button 
                  onClick={() => setIsResumePreviewOpen(false)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Paper Sheet Simulator */}
            <div className="p-6 sm:p-10 bg-slate-950 overflow-y-auto max-h-[70vh]">
              <div className="mx-auto max-w-2xl bg-white text-slate-900 p-8 sm:p-12 shadow-2xl rounded-sm border border-slate-300 font-serif leading-relaxed text-left">
                
                {/* Resume Header */}
                <div className="text-center space-y-2 border-b-2 border-slate-900 pb-4">
                  <h1 className="text-2xl font-bold uppercase tracking-wide font-sans text-slate-950">{student.name}</h1>
                  <p className="text-xs text-purple-700 font-semibold uppercase tracking-wider font-sans">{student.role}</p>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-slate-600 font-sans mt-2">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-700" />{student.email}</span>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-700" />{student.phone}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-700" />{student.location}</span>
                  </div>
                </div>

                {/* Resume Education */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-sans border-b border-slate-400 pb-0.5">Education</h3>
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <h4 className="font-bold">{student.education.institution}</h4>
                      <p className="text-[11px] text-slate-600 italic">{student.education.degree}</p>
                    </div>
                    <div className="text-right text-[11px] font-sans">
                      <div className="font-semibold text-slate-800">{student.education.timeline}</div>
                      <div className="text-purple-700 font-bold mt-0.5">CGPA: {student.education.cgpa}</div>
                    </div>
                  </div>
                </div>

                {/* Resume Skills */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-sans border-b border-slate-400 pb-0.5">Core Proficiencies</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                    {student.skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-800">{skill.name}</span>
                        <span className="text-[10px] text-slate-500 font-sans">({skill.level}% proficiency)</span>
                        {skill.status === 'Verified' && (
                          <span className="text-[8px] bg-purple-100 text-purple-700 border border-purple-300 font-bold px-1 rounded-sm uppercase tracking-wide font-sans">
                            Verified
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resume Featured Projects */}
                <div className="mt-6 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-sans border-b border-slate-400 pb-0.5">Technical Projects</h3>
                  {student.projects.map((proj, index) => (
                    <div key={index} className="space-y-1 text-xs">
                      <div className="flex justify-between items-baseline font-sans">
                        <h4 className="font-bold text-slate-900">{proj.name}</h4>
                        <span className="text-[10px] text-purple-700 font-medium font-mono">Stack: {proj.tech}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{proj.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Resume Cryptographic Badges */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 font-sans border-b border-slate-400 pb-0.5">Cryptographic Endorsements</h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px]">
                    {student.badges.map((badge, index) => (
                      <div key={index} className="border border-slate-200 p-2 rounded-sm bg-slate-50 flex items-start gap-1.5">
                        <ShieldCheck className="w-4.5 h-4.5 text-purple-600 shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-slate-850 leading-tight">{badge.name}</div>
                          <div className="text-slate-500 mt-0.5">{badge.organization} • Ref: {badge.id}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer certification */}
                <div className="mt-10 pt-4 border-t border-slate-200 text-center text-[9px] text-slate-400 font-sans uppercase tracking-wider">
                  Cryptographically secured by SkillSync Board of Verification
                </div>
              </div>
            </div>

            {/* Viewer footer */}
            <div className="bg-slate-950 p-4 border-t border-slate-850 text-right text-xs text-slate-500">
              Interactive sandbox rendering — Changes in profile will live-update CV rendering.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Portfolio;
