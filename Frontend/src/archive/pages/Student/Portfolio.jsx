import React, { useState } from 'react';
import { ShieldCheck, Award, ExternalLink, Mail, Phone, MapPin, Download, CheckCircle } from 'lucide-react';

const Portfolio = () => {
  const [copied, setCopied] = useState(false);

  const student = {
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
    skills: [
      { name: 'React.js / Next.js', level: 90, status: 'Verified' },
      { name: 'JavaScript / Node.js', level: 85, status: 'Verified' },
      { name: 'SQL Databases (Postgres/MySQL)', level: 75, status: 'Verified' },
      { name: 'HTML & CSS / Tailwind', level: 95, status: 'Self-Declared' },
      { name: 'Data Structures & Algorithms', level: 80, status: 'Verified' }
    ],
    badges: [
      { name: 'Database Foundations Expert', organization: 'SkillSync Core', id: 'SS-DB-84321', date: 'Aug 2026', authority: 'IIT Bombay Board' },
      { name: 'Advanced React Certification', organization: 'SkillSync Core', id: 'SS-FE-12903', date: 'Jul 2026', authority: 'Wipro Dev Group' },
      { name: 'Cybersecurity Awareness Badge', organization: 'SIH Certification', id: 'SIH-SEC-5819', date: 'Jun 2026', authority: 'Ministry of Education' }
    ],
    projects: [
      { name: 'E-Commerce Microservices Engine', tech: 'Node.js, Express, PostgreSQL', desc: 'Designed database normalizations and cluster indices, improving transaction rates by 35%.' },
      { name: 'SIH26 Portal (SkillSync)', tech: 'React, Tailwind CSS, Auth Context', desc: 'Interactive digital resume tracking platform incorporating custom matched scoring pipelines.' }
    ]
  };

  const handleShareLink = () => {
    setCopied(true);
    navigator.clipboard.writeText(`https://skillsync.sih/portfolio/aarav-mehta`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Action Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Digital Portfolio</h1>
          <p className="text-xs text-slate-400 mt-1">Verified achievements and credentials cryptographically tied to your student account.</p>
        </div>
        <button
          onClick={handleShareLink}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Copy Verification Link</span>
            </>
          )}
        </button>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Personal info & Education */}
        <div className="space-y-6">
          
          {/* Profile Card */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-extrabold text-3xl flex items-center justify-center mx-auto shadow-xl">
              AM
            </div>
            <h2 className="text-lg font-bold text-white mt-4">{student.name}</h2>
            <p className="text-xs text-purple-400 mt-1">{student.role}</p>

            <div className="mt-6 flex flex-col gap-2.5 text-left text-xs border-t border-slate-800/80 pt-4 text-slate-400">
              <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-slate-500" />{student.email}</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-500" />{student.phone}</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-500" />{student.location}</span>
            </div>
          </div>

          {/* Education Card */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Academic Record</h3>
            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-semibold text-slate-200">{student.education.degree}</h4>
                <p className="text-slate-400 mt-0.5">{student.education.institution}</p>
                <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono">
                  <span>Timeline: {student.education.timeline}</span>
                  <span className="text-purple-400 font-bold">CGPA: {student.education.cgpa}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Columns: Skills, Projects, Badges */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Verified Badges */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Cryptographic Verification Badges</h3>
              <p className="text-xs text-slate-500 mt-0.5">Certificates validated directly by educational boards and industry assessors</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {student.badges.map((badge, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/5 relative overflow-hidden flex flex-col justify-between h-40"
                >
                  {/* Watermark badge icon */}
                  <ShieldCheck className="absolute top-2 right-2 w-12 h-12 text-amber-500/10 -z-10" />
                  
                  <div>
                    <span className="flex items-center gap-1 text-[9px] text-amber-400 font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      Verified
                    </span>
                    <h4 className="text-xs font-bold text-slate-200 mt-2 leading-snug">{badge.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{badge.organization}</p>
                  </div>

                  <div className="text-[9px] text-slate-400 font-mono border-t border-slate-800 pt-2 mt-2">
                    <div>Ref: {badge.id}</div>
                    <div className="mt-0.5">Authority: {badge.authority}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Metrics */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card space-y-4">
            <h3 className="text-base font-bold text-white">Skill Verification Matrix</h3>
            <div className="space-y-3.5">
              {student.skills.map((skill, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-200">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">{skill.level}% Proficiency</span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                        skill.status === 'Verified' 
                          ? 'bg-purple-500/15 text-purple-400 border border-purple-500/20' 
                          : 'bg-slate-800 text-slate-500'
                      }`}>
                        {skill.status}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
                    <div className={`h-1.5 rounded-full bg-purple-500`} style={{ width: `${skill.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card space-y-4">
            <h3 className="text-base font-bold text-white">Featured Project Repositories</h3>
            <div className="flex flex-col gap-4">
              {student.projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-900 flex justify-between items-start gap-4">
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-purple-400 fill-current" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span>{proj.name}</span>
                    </h4>
                    <p className="text-[11px] leading-relaxed text-slate-400">{proj.desc}</p>
                    <div className="text-[10px] text-purple-400/80 font-medium">Stack: {proj.tech}</div>
                  </div>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white p-1 transition-all">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Portfolio;
