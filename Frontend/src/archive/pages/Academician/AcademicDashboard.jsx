import React, { useState } from 'react';
import { Award, Briefcase, GraduationCap, School, Layers, Plus, Calendar, CheckCircle2, ChevronRight, X, FileText, Send } from 'lucide-react';

const AcademicDashboard = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [selectedFdp, setSelectedFdp] = useState(null);
  const [successProposal, setSuccessProposal] = useState(false);
  const [successFdp, setSuccessFdp] = useState(false);

  // Proposal form states
  const [title, setTitle] = useState('');
  const [partner, setPartner] = useState('TCS Research');
  const [budget, setBudget] = useState('');
  const [scope, setScope] = useState('');

  const stats = [
    { label: 'Active Proposals', value: '3 Submitted', icon: FileText, color: 'text-purple-400 bg-purple-500/10' },
    { label: 'Consultancies', value: '1 Active', icon: Briefcase, color: 'text-blue-400 bg-blue-500/10' },
    { label: 'FDP Workshops', value: '2 Enrolled', icon: GraduationCap, color: 'text-emerald-400 bg-emerald-500/10' }
  ];

  const fdps = [
    { id: 1, title: 'AI and ML in Engineering Pedagogy', host: 'TCS Research', date: 'Sept 12 - Sept 18', type: 'Faculty Development Program', desc: 'Practical teaching methodologies incorporating modern LLMs and deep learning paradigms into engineering courses.' },
    { id: 2, title: 'Cloud Infrastructure & Kubernetes Architecture', host: 'Wipro Digital', date: 'Oct 02 - Oct 04', type: 'Industrial Training', desc: 'Hands-on bootcamp on microservices management, autoscaling policies, and container security controls.' }
  ];

  const consultancies = [
    { id: 1, title: 'Distributed Systems Load Balancing Architecture', industry: 'Cognizant', status: 'Approved', budget: '₹4,50,000' },
    { id: 2, title: 'Optimizing Query Pipelines for Logistics Core Databases', industry: 'TCS Research', status: 'Under Review', budget: '₹3,00,000' }
  ];

  const handleProposalSubmit = (e) => {
    e.preventDefault();
    setSuccessProposal(true);
    setTimeout(() => {
      setSuccessProposal(false);
      setShowProposalModal(false);
      setTitle('');
      setBudget('');
      setScope('');
    }, 1200);
  };

  const handleFdpRegister = (fdp) => {
    setSelectedFdp(fdp);
    setSuccessFdp(true);
    setTimeout(() => {
      setSuccessFdp(false);
      setSelectedFdp(null);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900/40 relative overflow-hidden glassmorphism">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px]" />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative z-10">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Academic Collaboration Hub</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Dr. Rajesh Sharma</h1>
            <p className="text-xs text-slate-400 mt-1">Professor, Department of Computer Science & Engineering — IIT Bombay</p>
          </div>
          <button
            onClick={() => setShowProposalModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-white shadow-lg shadow-amber-600/25 transition-all cursor-pointer w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Project Proposal</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

      {/* Tab Selectors */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab('opportunities')}
          className={`pb-3 text-xs font-bold border-b-2 cursor-pointer transition-all ${
            activeTab === 'opportunities' 
              ? 'border-amber-500 text-amber-400' 
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Research & FDP Opportunities
        </button>
        <button
          onClick={() => setActiveTab('consultancies')}
          className={`pb-3 text-xs font-bold border-b-2 cursor-pointer transition-all ${
            activeTab === 'consultancies' 
              ? 'border-amber-500 text-amber-400' 
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Active Consultancies
        </button>
      </div>

      {/* Tab 1: FDP / Industry calls */}
      {activeTab === 'opportunities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fdps.map((fdp) => (
            <div 
              key={fdp.id} 
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between hover:border-slate-700/60 transition-all glassmorphism-card group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                    {fdp.type}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">{fdp.host}</span>
                </div>
                
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors">{fdp.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{fdp.desc}</p>

                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold pt-2 border-t border-slate-800/60">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Timeline: {fdp.date}</span>
                </div>
              </div>

              <button
                onClick={() => handleFdpRegister(fdp)}
                className="mt-6 w-full py-2.5 rounded-xl bg-amber-600/10 hover:bg-amber-600 hover:text-white border border-amber-500/20 text-amber-400 transition-all text-xs font-semibold cursor-pointer"
              >
                Register for Workshop
              </button>
            </div>
          ))}

          {/* FDP Success Banner */}
          {successFdp && (
            <div className="fixed bottom-24 left-6 z-50 p-4 rounded-xl border border-emerald-500/20 bg-slate-900/90 text-emerald-400 text-xs font-medium glassmorphism flex items-center gap-2 animate-in slide-in-from-left-4 duration-200">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Successfully registered for: {selectedFdp?.title}!</span>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Consultancies */}
      {activeTab === 'consultancies' && (
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 glassmorphism-card">
          <h3 className="text-base font-bold text-white mb-6 font-sans">Research & Consultancy Proposals</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-semibold">
                  <th className="pb-3 font-semibold">Project Title</th>
                  <th className="pb-3 font-semibold">Industry Partner</th>
                  <th className="pb-3 font-semibold">Proposed Budget</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {consultancies.map((c) => (
                  <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-900/20 transition-all">
                    <td className="py-4 font-bold text-slate-200">{c.title}</td>
                    <td className="py-4 text-slate-400">{c.industry}</td>
                    <td className="py-4 font-mono font-semibold text-slate-300">{c.budget}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.status === 'Approved' 
                          ? 'text-emerald-400 bg-emerald-500/10' 
                          : 'text-amber-400 bg-amber-500/10'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Proposal Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-2xl relative glassmorphism animate-in zoom-in-95 duration-200">
            
            {/* Close */}
            <button 
              onClick={() => setShowProposalModal(false)}
              className="absolute top-6 right-6 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!successProposal ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Research Desk</span>
                  <h3 className="text-lg font-bold text-white mt-1">Submit Joint Research Proposal</h3>
                  <p className="text-xs text-slate-400">Propose custom engineering and consulting research to companies</p>
                </div>

                <form onSubmit={handleProposalSubmit} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Research Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
                      placeholder="e.g. Distributed Database Engine Architecture"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Target Partner</label>
                      <select
                        value={partner}
                        onChange={(e) => setPartner(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs focus:border-amber-500 focus:outline-none"
                      >
                        <option value="TCS Research">TCS Research</option>
                        <option value="Wipro Digital">Wipro Digital</option>
                        <option value="Cognizant">Cognizant</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Requested Funding</label>
                      <input
                        type="text"
                        required
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none"
                        placeholder="e.g. ₹5,000,000"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Project Abstract</label>
                    <textarea
                      rows={3}
                      required
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-amber-500 focus:outline-none placeholder-slate-700"
                      placeholder="Brief scope of the research..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-semibold text-white shadow-lg transition-all cursor-pointer"
                  >
                    Send Research Proposal
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Proposal Transmitted!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Your research draft and department profile have been sent to the target industry review panel. Review progress in your Consultancies tab.
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

export default AcademicDashboard;
