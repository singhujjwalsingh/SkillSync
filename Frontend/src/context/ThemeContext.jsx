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
  const [theme, setThemeState] = useState('light');
  const [effectiveTheme, setEffectiveTheme] = useState('light');

  useEffect(() => {
    // Enforce light mode on initial load unless user explicitly changes it
    const saved = localStorage.getItem('skillsync_theme_pref');
    const initialTheme = saved === 'dark' ? 'dark' : 'light';
    setThemeState(initialTheme);
    setEffectiveTheme(initialTheme);

    const root = document.documentElement;
    root.setAttribute('data-theme', initialTheme);
    if (initialTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, []);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    setEffectiveTheme(newTheme);
    localStorage.setItem('skillsync_theme_pref', newTheme);
    const root = document.documentElement;
    root.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        effectiveTheme,
        setTheme,
        toggleTheme,
        isDark: theme === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
