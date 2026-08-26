import React, { useState } from 'react';
import { Award, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2, AlertTriangle, Play, HelpCircle } from 'lucide-react';

const SkillAssessment = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const categories = [
    {
      id: 'sql',
      name: 'SQL Databases',
      desc: 'Evaluate relational database schemas, query optimizations, normalization rules, and ACID transaction concepts.',
      questions: [
        {
          q: 'Which database isolation level prevents dirty reads but allows non-repeatable reads?',
          options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
          correct: 1
        },
        {
          q: 'What is the purpose of database normalization?',
          options: ['To increase redundancy and retrieve data faster', 'To minimize redundancy and prevent anomalies', 'To encrypt private user column attributes', 'To manage horizontal database partitions'],
          correct: 1
        },
        {
          q: 'Which SQL operator is used to retrieve values matching a wildcard expression?',
          options: ['MATCH', 'IN', 'LIKE', 'REGEXP'],
          correct: 2
        },
        {
          q: 'What does the "D" stand for in database ACID properties?',
          options: ['Dependability', 'Diversity', 'Decoupling', 'Durability'],
          correct: 3
        }
      ]
    },
    {
      id: 'react',
      name: 'React & Frontend',
      desc: 'Verify core frontend capabilities: virtual DOM diffing, state rendering hooks, lifecycle controls, and Context updates.',
      questions: [
        {
          q: 'What hook is used to cache the computed output of a heavy calculations function?',
          options: ['useCallback', 'useMemo', 'useRef', 'useEffect'],
          correct: 1
        },
        {
          q: 'What does HMR stand for in modern dev bundling tools?',
          options: ['Header Meta Redirection', 'HTML Mapping Route', 'Hot Module Replacement', 'High Performance Model Rendering'],
          correct: 2
        },
        {
          q: 'Which hook should you call to perform side-effects in a React component?',
          options: ['useState', 'useContext', 'useEffect', 'useReducer'],
          correct: 2
        },
        {
          q: 'In React, what are keys used for during list rendering?',
          options: ['To identify items uniquely for efficient DOM reconciliation', 'To bind click handlers to element containers', 'To secure state contents from unauthorized local scripts', 'To establish styles dynamic rules'],
          correct: 0
        }
      ]
    }
  ];

  const handleStartCategory = (category) => {
    setActiveCategory(category);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsCompleted(false);
    setScore(0);
  };

  const handleSelectAnswer = (optionIdx) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIdx
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < activeCategory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score
      let correctAnswers = 0;
      activeCategory.questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correct) {
          correctAnswers++;
        }
      });
      const calculatedScore = Math.round((correctAnswers / activeCategory.questions.length) * 100);
      setScore(calculatedScore);
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleReset = () => {
    setActiveCategory(null);
    setIsCompleted(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Skill Assessment Engine</h1>
        <p className="text-xs text-slate-400 mt-1">Complete modular exams to verify your abilities and earn badges visible on your digital resume.</p>
      </div>

      {/* Select Category Grid */}
      {!activeCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col justify-between hover:border-slate-700/60 transition-all glassmorphism-card group"
            >
              <div className="space-y-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400">
                  <Award className="w-5 h-5" />
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">{cat.name}</h3>
                <p className="text-xs leading-relaxed text-slate-400">{cat.desc}</p>
                <div className="text-[10px] text-slate-500 font-mono">Exam duration: 4 Questions • Requirement: 70%+</div>
              </div>

              <button
                onClick={() => handleStartCategory(cat)}
                className="mt-6 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-lg shadow-purple-600/25 transition-all cursor-pointer"
              >
                <span>Launch Assessment</span>
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Assessment Running */}
      {activeCategory && !isCompleted && (
        <div className="max-w-2xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 shadow-2xl glassmorphism">
          <div className="flex justify-between items-center pb-4 border-b border-slate-800 mb-6">
            <span className="text-xs text-slate-400 font-medium">Exam: {activeCategory.name}</span>
            <span className="text-xs text-purple-400 font-semibold">Question {currentQuestionIndex + 1} of {activeCategory.questions.length}</span>
          </div>

          <div className="space-y-6">
            {/* Question Text */}
            <h3 className="text-sm sm:text-base font-bold text-slate-200 flex gap-2">
              <HelpCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <span>{activeCategory.questions[currentQuestionIndex].q}</span>
            </h3>

            {/* Answer Options */}
            <div className="flex flex-col gap-3">
              {activeCategory.questions[currentQuestionIndex].options.map((opt, optionIdx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === optionIdx;
                return (
                  <button
                    key={optionIdx}
                    onClick={() => handleSelectAnswer(optionIdx)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isSelected 
                        ? 'bg-purple-600/10 border-purple-500 text-purple-400' 
                        : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-900/40'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
              <button
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              
              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-purple-600 hover:bg-purple-500 text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <span>{currentQuestionIndex === activeCategory.questions.length - 1 ? 'Submit' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion View */}
      {isCompleted && (
        <div className="max-w-xl mx-auto rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 shadow-2xl glassmorphism text-center space-y-6">
          <div className="flex justify-center">
            {score >= 70 ? (
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                <CheckCircle2 className="w-8 h-8" />
              </span>
            ) : (
              <span className="flex items-center justify-center w-14 h-14 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/25">
                <AlertTriangle className="w-8 h-8" />
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white">Assessment Complete</h2>
            <p className="text-xs text-slate-400">Category: {activeCategory.name}</p>
          </div>

          <div className="py-4 px-6 rounded-2xl bg-slate-950 border border-slate-900 inline-block">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Your Score</span>
            <span className={`text-4xl font-extrabold mt-1 block ${score >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>{score}%</span>
          </div>

          {score >= 70 ? (
            <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-emerald-400 text-xs leading-relaxed max-w-md mx-auto">
              🏆 **Badge Earned!** You have successfully passed the database benchmark exam. This badge is now verified and appended to your Digital Portfolio automatically.
            </div>
          ) : (
            <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/5 text-rose-400 text-xs leading-relaxed max-w-md mx-auto">
              ⚠️ **Gap Identified.** Minimum passing score is 70%. We recommend exploring training modules under your Dashboard suggestions and taking a re-test in 24 hours.
            </div>
          )}

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Back to Exams</span>
            </button>
            
            {score < 70 && (
              <button
                onClick={() => handleStartCategory(activeCategory)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white shadow-md transition-all cursor-pointer"
              >
                <span>Retry Exam</span>
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default SkillAssessment;
