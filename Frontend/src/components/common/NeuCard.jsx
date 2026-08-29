import React from 'react';

const NeuCard = ({
  children,
  className = '',
  variant = 'flat', // 'flat', 'sm', 'lg', 'inset', 'interactive'
  hover = false,
  onClick,
  ...props
}) => {
  let shadowClass = 'neu-flat';
  if (variant === 'sm') shadowClass = 'neu-sm';
  if (variant === 'lg') shadowClass = 'neu-lg';
  if (variant === 'inset') shadowClass = 'neu-inset';
  if (variant === 'interactive') shadowClass = 'neu-interactive cursor-pointer';

  const hoverClass = hover ? 'hover:translate-y-[-3px] transition-all duration-300' : '';

  return (
    <div
      className={`rounded-3xl p-6 relative transition-all duration-300 ${shadowClass} ${hoverClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default NeuCard;
