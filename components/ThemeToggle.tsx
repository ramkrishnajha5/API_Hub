
import React from 'react';
import { Moon, Sun } from '../constants';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 md:w-16 md:h-8 rounded-full p-1 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 group overflow-hidden"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)'
          : 'linear-gradient(135deg, #60a5fa 0%, #38bdf8 100%)'
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Stars (visible in dark mode) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1 md:top-1.5 left-1.5 md:left-2 w-0.5 md:w-1 h-0.5 md:h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-2 md:top-3 left-3 md:left-4 w-0.5 h-0.5 bg-white/70 rounded-full" />
        <div className="absolute top-1.5 md:top-2 left-5 md:left-6 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Clouds (visible in light mode) */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0.5 md:top-1 right-2.5 md:right-3 w-3 md:w-4 h-1.5 md:h-2 bg-white/40 rounded-full" />
        <div className="absolute top-2 md:top-3 right-4 md:right-5 w-2 md:w-3 h-1 md:h-1.5 bg-white/30 rounded-full" />
      </div>

      {/* Toggle Circle with Icon */}
      <div
        className={`absolute top-0.5 md:top-1 w-5 h-5 md:w-6 md:h-6 rounded-full shadow-lg transition-all duration-500 ease-out flex items-center justify-center ${theme === 'dark'
            ? 'translate-x-7 md:translate-x-8 bg-slate-800 shadow-blue-500/20'
            : 'translate-x-0 bg-yellow-300 shadow-orange-300/50'
          }`}
      >
        {theme === 'dark' ? (
          <Moon className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-300" />
        ) : (
          <Sun className="w-3 h-3 md:w-3.5 md:h-3.5 text-orange-500" />
        )}
      </div>

      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-500 ${theme === 'dark' ? 'opacity-0' : 'opacity-100'
          }`}
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)'
        }}
      />
    </button>
  );
};
