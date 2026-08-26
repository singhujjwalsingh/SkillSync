import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('skillsync_theme_pref') || 'auto';
  });

  const [effectiveTheme, setEffectiveTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('skillsync_theme_pref') || 'auto';
    if (saved === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return saved;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateEffectiveTheme = () => {
      let resolved = theme;
      if (theme === 'auto') {
        resolved = mediaQuery.matches ? 'dark' : 'light';
      }
      setEffectiveTheme(resolved);

      const root = document.documentElement;
      root.setAttribute('data-theme', resolved);
      if (resolved === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    };

    updateEffectiveTheme();

    const handler = () => {
      if (theme === 'auto') {
        updateEffectiveTheme();
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('skillsync_theme_pref', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
