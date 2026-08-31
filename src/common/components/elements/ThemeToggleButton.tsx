'use client';

import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/common/context/ThemeContext';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group relative flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-2xl border-2 border-neutral-900 dark:border-white/20 bg-white dark:bg-neutral-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(99,102,241,0.5)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(99,102,241,0.6)] active:translate-x-0 active:translate-y-0 active:shadow-none cursor-pointer"
    >
      {isDark ? (
        <FiSun className="h-5 w-5 text-amber-400 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
      ) : (
        <FiMoon className="h-5 w-5 text-indigo-600 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
      )}
    </button>
  );
}

