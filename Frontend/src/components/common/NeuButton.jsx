import React from 'react';

const NeuButton = ({
  children,
  className = '',
  variant = 'primary', // 'primary', 'secondary', 'neutral', 'success', 'danger', 'inset'
  size = 'md', // 'sm', 'md', 'lg'
  disabled = false,
  loading = false,
  icon: Icon,
  type = 'button',
  onClick,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-2xl gap-2',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5 font-semibold'
  };

  let variantClass = 'neu-btn-primary text-white font-medium shadow-md';
  if (variant === 'secondary') {
    variantClass = 'neu-btn font-medium text-[var(--accent-primary)] hover:text-indigo-600';
  } else if (variant === 'neutral') {
    variantClass = 'neu-btn text-[var(--text-primary)] font-medium';
  } else if (variant === 'success') {
    variantClass = 'bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-600/20';
  } else if (variant === 'danger') {
    variantClass = 'bg-rose-600 hover:bg-rose-500 text-white font-medium shadow-lg shadow-rose-600/20';
  } else if (variant === 'inset') {
    variantClass = 'neu-inset text-[var(--text-secondary)] active:scale-95 font-medium';
  }

  const disabledClass = disabled || loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-all duration-200 select-none ${sizeClasses[size] || sizeClasses.md} ${variantClass} ${disabledClass} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : (
        <>
          {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
          {children}
        </>
      )}
    </button>
  );
};

export default NeuButton;
