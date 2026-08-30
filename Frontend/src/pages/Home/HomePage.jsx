import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Briefcase
} from 'lucide-react';

const FEATURED_ITEMS = [
  {
    id: 1,
    title: 'AI in Healthcare',
    description: 'A healthcare overview matrix and deep learning clinical trial screening models for predictive diagnostic analysis.',
    partner: 'Synthetix AI Labs',
    score: 85,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Rol in Healthcare',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit developer and utilitarian research.',
    partner: 'Nexus Cloud Corp',
    score: 85,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Flornrn Collaboration',
    description: 'Lorem ipsum dolor sit amet, sed commond connumable neghheat, and corporation integration.',
    partner: 'QuantEdge Capital',
    score: 65,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  }
];

const RECOMMENDED_CONNECTIONS = [
  {
    id: 1,
    tag: 'Research',
    tagColor: 'bg-purple-100/90 text-purple-800',
    title: 'Innovations AI in Healthcare',
    description: 'A academic synergy inspiration to promote and healthcare solutions researchers on giants, and modern industry.',
    partner: 'Dr. Anya Sharma',
    score: 80,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    tag: 'Corporate',
    tagColor: 'bg-amber-100/90 text-amber-800',
    title: 'Industry and Solutions',
    description: 'Promote economic training innovations and temporal solutions appreachon coordinate solutions.',
    partner: 'Nexus Cloud Corp',
    score: 90,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

const HomePage = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="relative min-h-screen py-8 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-12 select-none">

      {/* ========================================================
          MAIN FLOATING WHITE SHEET CANVAS (EXACT MOCKUP)
          ======================================================== */}
      <div className="w-full bg-white/95 backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-12 lg:p-16 shadow-[0_30px_70px_rgba(0,0,0,0.06)] border border-white/95 flex flex-col gap-16 relative overflow-hidden">

        {/* HERO TITLE & SUBTITLE */}
        <div className="text-center flex flex-col items-center gap-5 max-w-4xl mx-auto pt-2">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.12]">
            Unlocking Synergy Between <br className="hidden sm:inline" />
            Academia & Industry
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
            Learn on our projects, partners, so foram to corporate academic, industry partners with high-end fintech and corporate.
          </p>

          {/* SEARCH BAR (EXACT MOCKUP) */}
          <div className="w-full max-w-2xl relative mt-4">
            <div className="relative flex items-center w-full bg-white rounded-full px-5 py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-200/90 focus-within:border-slate-400 transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for projects, partners, or research areas."
                className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium"
              />
            </div>
          </div>
        </div>

        {/* FEATURED COLLABORATIONS (EXACT 3-CARD ROW) */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl sm:text-2xl font-black text-center text-slate-950 tracking-tight">
            Featured Collaborations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between gap-6"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-extrabold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={item.avatar}
                      alt={item.partner}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs"
                    />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Industry Partners</span>
                      <span className="text-xs font-semibold text-slate-800">{item.partner}</span>
                    </div>
                  </div>

                  {/* Golden Glowing Dual-Ring Match Score Badge */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-[3px] border-amber-400 bg-amber-50/70 flex items-center justify-center text-xs font-black text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.35)]">
                      {item.score}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRONDERHEASTIONS / RECOMMENDED CONNECTIONS */}
        <div className="flex flex-col items-center gap-6 pt-4 border-t border-slate-100">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-black text-slate-950">
              Pronderheastions
            </h2>
            <span className="text-xs text-slate-400 font-medium">Recommended Connections</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {RECOMMENDED_CONNECTIONS.map((rec) => (
              <div
                key={rec.id}
                className="p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between gap-5"
              >
                <div className="flex flex-col gap-2">
                  <span className={`self-start text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${rec.tagColor}`}>
                    {rec.tag}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-950">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {rec.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rec.avatar}
                      alt={rec.partner}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                    />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Industry Partners</span>
                      <span className="text-xs font-semibold text-slate-800">{rec.partner}</span>
                    </div>
                  </div>

                  <div className="w-12 h-12 rounded-full border-[3px] border-amber-400 bg-amber-50/70 flex items-center justify-center text-xs font-black text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.35)]">
                    {rec.score}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center gap-1.5 pt-2">
            <span className="w-6 h-1.5 rounded-full bg-slate-950" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          </div>
        </div>

        {/* FIND YOUR IDEAL PARTNER SECTION (EXACT 2-COLUMN MOCKUP) */}
        <div className="flex flex-col gap-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                Find Your Ideal Partner
              </h2>
              <span className="text-xs text-slate-400 font-medium">Recommended Connections</span>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Left: Research Opportunities */}
            <div className="p-6 rounded-3xl bg-slate-50/90 border border-slate-200/80 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="px-4 py-2 rounded-xl bg-purple-100 text-purple-900 text-xs font-black uppercase tracking-wider text-center">
                  Research Opportunities
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                    alt="Researcher"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-slate-950">Name Jcammer</span>
                    <span className="text-xs text-slate-500">Affiliation of Campers</span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-1 pt-1">
                  <span className="text-xs font-bold text-slate-600">Match Score</span>
                  <div className="w-11 h-11 rounded-full border-[3px] border-amber-400 bg-amber-50 flex items-center justify-center text-xs font-black text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                    85%
                  </div>
                </div>
              </div>

              <Link to="/login?role=student" className="w-full">
                <button
                  type="button"
                  className="w-full py-3.5 rounded-2xl bg-[#090e17] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md"
                >
                  Connect Now
                </button>
              </Link>
            </div>

            {/* Right: Industry Needs */}
            <div className="p-6 rounded-3xl bg-slate-50/90 border border-slate-200/80 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="px-4 py-2 rounded-xl bg-cyan-100 text-cyan-900 text-xs font-black uppercase tracking-wider text-center">
                  Industry Needs
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Recruiter"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-slate-950">Kiiiee Mosian</span>
                    <span className="text-xs text-slate-500">University of Sapolt</span>
                  </div>
                </div>

                <div className="flex items-center justify-between px-1 pt-1">
                  <span className="text-xs font-bold text-slate-600">Match Score</span>
                  <div className="w-11 h-11 rounded-full border-[3px] border-amber-400 bg-amber-50 flex items-center justify-center text-xs font-black text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                    90%
                  </div>
                </div>
              </div>

              <Link to="/login?role=recruiter" className="w-full">
                <button
                  type="button"
                  className="w-full py-3.5 rounded-2xl bg-[#090e17] hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md"
                >
                  Connect Now
                </button>
              </Link>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default HomePage;
