import React, { useEffect, useState } from 'react';

const WaveBackground = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#f8fafc]" aria-hidden="true">
      {/* Exact User-Provided Liquid Iridescent Glass Wave Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url('/assets/exact-wave-bg.jpg')`,
          backgroundAttachment: 'fixed',
          transform: `scale(1.03) translate3d(0, ${-scrollY * 0.08}px, 0)`,
          opacity: 0.95,
        }}
      />

      {/* Subtle Ethereal Shimmer Layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-soft-light transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(244, 114, 182, 0.25) 0%, rgba(56, 189, 248, 0.2) 45%, transparent 75%)',
          transform: `translate3d(0, ${scrollY * 0.12}px, 0)`,
        }}
      />
    </div>
  );
};

export default WaveBackground;
