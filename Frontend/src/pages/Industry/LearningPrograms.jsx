import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, Users, Plus, CheckCircle, X, Award } from 'lucide-react';

const LearningPrograms = () => {
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [type, setType] = useState('Workshop');
  const [desc, setDesc] = useState('');

  const [programs, setPrograms] = useState([
    { id: 1, title: 'Advanced React Hooks & State Orchestration', type: 'Certification', duration: '4 Weeks', enrolled: 148, desc: 'Master advanced React architecture patterns, custom hooks design, and memory profiling.' },
    { id: 2, title: 'Modern PostgreSQL Indexing & Optimization', type: 'Workshop', duration: '3 Days', enrolled: 92, desc: 'Learn to write highly optimized SQL queries, construct appropriate composite indices, and analyze explain plans.' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    
    setTimeout(() => {
      setSuccess(false);
      setShowForm(false);
      // Append mock program
      setPrograms(prev => [
        ...prev,
        { id: Date.now(), title, type, duration, enrolled: 0, desc }
      ]);
      // Reset fields
      setTitle('');
      setDuration('');
      setDesc('');
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Industry Learning Programs</h1>
          <p className="text-xs text-slate-400 mt-1">Publish training certifications, workshops, and courses designed to upskill students.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg transition-all cursor-pointer w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Program</span>
        </button>
      </div>

      {/* Program Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((prog) => (
          <div 
            key={prog.id} 
            className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between hover:border-slate-700/60 transition-all glassmorphism-card group"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
                  {prog.type}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                  <Users className="w-3.5 h-3.5" />
                  {prog.enrolled} Enrolled
                </span>
              </div>
              
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-400 transition-colors">{prog.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{prog.desc}</p>

              <div className="flex items-center gap-4 text-[10px] text-slate-500 pt-2 border-t border-slate-800/60 font-semibold">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{prog.duration}</span>
                <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" />Verified Badge Earned</span>
              </div>
            </div>

            <button className="mt-6 w-full py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-900/50 text-slate-300 hover:text-white transition-all text-xs font-semibold">
              Manage Enrolled Students
            </button>
          </div>
        ))}
      </div>

      {/* Add Program Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-2xl relative glassmorphism animate-in zoom-in-95 duration-200">
            
            {/* Close */}
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!success ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Course Publisher</span>
                  <h3 className="text-lg font-bold text-white mt-1">Publish New Training Program</h3>
                  <p className="text-xs text-slate-400">Pushes course curricula suggestions to students holding relevant gaps</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Program Title</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none"
                      placeholder="e.g. Modern PostgreSQL Optimization"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Duration</label>
                      <input
                        type="text"
                        required
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none"
                        placeholder="e.g. 4 Weeks"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Program Type</label>
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs focus:border-purple-500 focus:outline-none"
                      >
                        <option value="Certification">Certification</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Course">Course</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-xs focus:border-purple-500 focus:outline-none placeholder-slate-700"
                      placeholder="Explain learning objectives..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg transition-all cursor-pointer"
                  >
                    Confirm & Publish Course
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-6">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Course Published!</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    This course has been successfully posted. Students with matching skill gaps will see it suggested on their dashboards.
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

export default LearningPrograms;
