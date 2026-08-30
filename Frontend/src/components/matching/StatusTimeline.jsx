import React from 'react';
import { CheckCircle2, Clock, Calendar, Award, XCircle } from 'lucide-react';

const STAGES = [
  { key: 'applied', label: 'Applied', icon: Clock },
  { key: 'shortlisted', label: 'Shortlisted', icon: CheckCircle2 },
  { key: 'interview', label: 'Interview', icon: Calendar },
  { key: 'offered', label: 'Offered', icon: Award }
];

const StatusTimeline = ({
  currentStatus = 'applied',
  statusHistory = [],
  layout = 'horizontal', // 'horizontal', 'vertical'
  className = ''
}) => {
  const isRejected = currentStatus === 'rejected';

  // Calculate current stage index
  let activeIndex = STAGES.findIndex(s => s.key === currentStatus);
  if (activeIndex === -1 && !isRejected) activeIndex = 0;

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col gap-4 py-2 ${className}`}>
        {STAGES.map((stage, idx) => {
          const isDone = !isRejected && idx <= activeIndex;
          const isCurrent = !isRejected && idx === activeIndex;
          const historyItem = statusHistory.find(h => h.status === stage.key);
          const Icon = stage.icon;

          return (
            <div key={stage.key} className="flex items-start gap-3 relative">
              {idx < STAGES.length - 1 && (
                <div
                  className={`absolute left-4 top-8 bottom-[-16px] w-0.5 ${isDone && idx < activeIndex ? 'bg-emerald-500' : 'bg-[var(--border-subtle)]'}`}
                />
              )}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center select-none shrink-0 transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/20 scale-110'
                    : isDone
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'neu-inset text-[var(--text-muted)] opacity-60'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className={`text-sm font-bold ${isCurrent ? 'text-indigo-600 dark:text-indigo-400' : isDone ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  {stage.label}
                </span>
                {historyItem && (
                  <span className="text-xs text-[var(--text-secondary)]">
                    {historyItem.date ? new Date(historyItem.date).toLocaleDateString() : 'Updated'} — {historyItem.note || 'Stage completed'}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {isRejected && (
          <div className="flex items-center gap-3 text-rose-600 bg-rose-500/10 p-3 rounded-2xl border border-rose-500/20">
            <XCircle className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-bold">Application Not Selected</span>
              <span className="text-xs text-rose-500">Thank you for your interest. Keep sharpening your skills!</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Horizontal Stepper with Clean Relative Alignment (No Overlap)
  return (
    <div className={`w-full py-4 relative ${className}`}>
      {/* Background connector track */}
      <div className="absolute top-[28px] left-[10%] right-[10%] h-1.5 rounded-full neu-inset overflow-hidden -z-0">
        <div
          className="h-full bg-emerald-500 transition-all duration-700 ease-out"
          style={{
            width: isRejected
              ? '0%'
              : activeIndex === 0
              ? '0%'
              : activeIndex === 1
              ? '33.3%'
              : activeIndex === 2
              ? '66.6%'
              : '100%'
          }}
        />
      </div>

      <div className="flex items-start justify-between relative z-10 w-full">
        {STAGES.map((stage, idx) => {
          const isDone = !isRejected && idx <= activeIndex;
          const isCurrent = !isRejected && idx === activeIndex;
          const Icon = stage.icon;

          return (
            <div key={stage.key} className="flex flex-col items-center gap-2 flex-1 text-center">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center select-none transition-all duration-300 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110 ring-4 ring-indigo-500/20'
                    : isDone
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-[var(--bg-main)] neu-inset text-[var(--text-muted)]'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-xs font-bold tracking-tight ${isCurrent ? 'text-indigo-600 dark:text-indigo-400 font-extrabold' : isDone ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;
