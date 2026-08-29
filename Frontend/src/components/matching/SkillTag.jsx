import React from 'react';
import { Check, Minus, AlertCircle, Star } from 'lucide-react';

const SkillTag = ({
  skill,
  status = 'neutral', // 'matched', 'missing', 'neutral', 'required'
  isMatched = false,
  isMissing = false,
  isRequired = false,
  weight,
  size = 'md', // 'sm', 'md', 'lg'
  onRemove,
  onClick,
  className = ''
}) => {
  // Determine final state
  let effectiveStatus = status;
  if (isMatched) effectiveStatus = 'matched';
  if (isMissing) effectiveStatus = 'missing';

  const skillName = typeof skill === 'object' ? skill.name || skill.skill : skill;
  const isRequiredSkill = isRequired || (typeof skill === 'object' && skill.required);

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1 rounded-xl',
    md: 'text-xs px-3.5 py-1.5 gap-1.5 rounded-2xl font-medium',
    lg: 'text-sm px-4 py-2 gap-2 rounded-2xl font-semibold'
  };

  let styleClass = 'neu-chip text-[var(--text-secondary)] border-[var(--border-subtle)]';
  let Icon = null;

  if (effectiveStatus === 'matched') {
    styleClass = 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 neu-sm shadow-sm';
    Icon = Check;
  } else if (effectiveStatus === 'missing') {
    styleClass = 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30 neu-sm shadow-sm';
    Icon = Minus;
  } else if (isRequiredSkill) {
    styleClass = 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30 neu-sm';
    Icon = Star;
  }

  return (
    <span
      className={`inline-flex items-center select-none border transition-all duration-200 ${sizeClasses[size] || sizeClasses.md} ${styleClass} ${onClick ? 'cursor-pointer hover:scale-105' : ''} ${className}`}
      onClick={onClick}
    >
      {Icon && (
        <span className={effectiveStatus === 'matched' ? 'text-emerald-500' : effectiveStatus === 'missing' ? 'text-amber-500' : 'text-indigo-500'}>
          <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        </span>
      )}
      <span>{skillName}</span>
      {isRequiredSkill && (
        <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 ml-0.5">
          (Req)
        </span>
      )}
      {weight && weight > 1 && (
        <span className="text-[10px] font-bold px-1 rounded bg-black/10 dark:bg-white/10 ml-0.5">
          {weight}x
        </span>
      )}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="ml-1 hover:text-rose-500 transition-colors p-0.5 rounded-full"
          aria-label={`Remove ${skillName}`}
        >
          &times;
        </button>
      )}
    </span>
  );
};

export default SkillTag;
