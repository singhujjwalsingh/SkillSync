import React from 'react';

const NeuInput = ({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] pl-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[var(--text-muted)] pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`neu-input w-full py-3 text-sm text-[var(--text-primary)] rounded-2xl placeholder:text-[var(--text-muted)] transition-all outline-none ${Icon ? 'pl-10 pr-4' : 'px-4'} ${error ? 'border border-rose-400 focus:border-rose-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-rose-500 font-medium pl-1">{error}</span>}
    </div>
  );
};

export default NeuInput;
