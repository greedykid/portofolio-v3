'use client';

import { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/common/context/ThemeContext';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="group flex h-[48px] w-[48px] items-center justify-center rounded-xl border-2 border-white bg-white transition-all duration-300 hover:bg-white/90 hover:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.4)] cursor-pointer"
    >
      {isDark ? (
        <FiSun className="h-5 w-5 text-black transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110" />
      ) : (
        <FiMoon className="h-5 w-5 text-black transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
      )}
    </button>
  );
}
