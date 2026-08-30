import React from 'react';
import { Zap, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

const MatchScoreIndicator = ({
  score = 0,
  size = 'md', // 'sm', 'md', 'lg', 'compact'
  variant = 'circular', // 'circular', 'bar', 'badge'
  showLabel = true,
  className = ''
}) => {
  const safeScore = Math.min(100, Math.max(0, Math.round(score)));

  // Color tier logic
  let color = '#10B981'; // Emerald
  let badgeBg = 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
  let tierLabel = 'Exceptional Match';

  if (safeScore < 50) {
    color = '#EF4444'; // Rose
    badgeBg = 'bg-rose-500/10 text-rose-600 border-rose-500/20';
    tierLabel = 'Skill Gap Alert';
  } else if (safeScore < 75) {
    color = '#F59E0B'; // Amber
    badgeBg = 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    tierLabel = 'Moderate Match';
  } else if (safeScore < 90) {
    color = '#4F46E5'; // Indigo
    badgeBg = 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20';
    tierLabel = 'High Match';
  }

  // Circular gauge calculations
  const dimensions = size === 'lg' ? 140 : size === 'sm' ? 70 : 100;
  const strokeWidth = size === 'lg' ? 10 : size === 'sm' ? 6 : 8;
  const radius = (dimensions - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  if (variant === 'badge') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${badgeBg} ${className}`}>
        <Zap className="w-3.5 h-3.5" />
        {safeScore}% Match
      </span>
    );
  }

  if (variant === 'bar') {
    return (
      <div className={`w-full flex flex-col gap-1.5 ${className}`}>
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1 text-[var(--text-secondary)]">
            <Zap className="w-3.5 h-3.5 text-indigo-500" /> Skill Match Compatibility
          </span>
          <span className="font-black text-sm" style={{ color }}>{safeScore}%</span>
        </div>
        {/* Embossed inset track */}
        <div className="w-full h-3 rounded-full neu-inset overflow-hidden p-0.5">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${safeScore}%`,
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}80`
            }}
          />
        </div>
      </div>
    );
  }

  // Default Circular variant
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <div
        className="relative flex items-center justify-center neu-flat rounded-full p-2"
        style={{ width: dimensions + 16, height: dimensions + 16 }}
      >
        <svg width={dimensions} height={dimensions} className="rotate-[-90deg] transition-all duration-700">
          {/* Track */}
          <circle
            cx={dimensions / 2}
            cy={dimensions / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-[var(--bg-inset)]"
          />
          {/* Progress */}
          <circle
            cx={dimensions / 2}
            cy={dimensions / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
          <span className={`${size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-base' : 'text-2xl'} font-black text-[var(--text-primary)] tracking-tight`}>
            {safeScore}%
          </span>
          {size === 'lg' && (
            <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-muted)] mt-0.5">
              Score
            </span>
          )}
        </div>
      </div>

      {showLabel && (
        <div className={`text-center font-bold ${size === 'lg' ? 'text-sm' : 'text-xs'}`}>
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
            {safeScore >= 75 ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            {tierLabel}
          </span>
        </div>
      )}
    </div>
  );
};

export default MatchScoreIndicator;
