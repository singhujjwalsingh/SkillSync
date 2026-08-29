import React from 'react';
import { ChevronDown } from 'lucide-react';

const NeuSelect = ({
  label,
  options = [],
  value,
  onChange,
  error,
  className = '',
  id,
  placeholder = 'Select option...',
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] pl-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={`neu-input w-full py-3 px-4 text-sm text-[var(--text-primary)] rounded-2xl appearance-none pr-10 outline-none cursor-pointer ${error ? 'border border-rose-400' : ''} ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={optVal} value={optVal}>
                {optLabel}
              </option>
            );
          })}
        </select>
        <div className="absolute right-3.5 text-[var(--text-muted)] pointer-events-none">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {error && <span className="text-xs text-rose-500 font-medium pl-1">{error}</span>}
    </div>
  );
};

export default NeuSelect;
