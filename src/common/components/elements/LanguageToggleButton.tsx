'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage, type Locale } from '@/common/context/LanguageContext';
import { FiCheck } from 'react-icons/fi';
import { cn } from '@/lib/utils';

// SVG Flag Icons for maximum crispness across all platforms
const IndonesiaFlag = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full object-cover shadow-sm">
    <g fillRule="evenodd" strokeWidth="1pt">
      <path fill="#e70011" d="M0 0h640v240H0z" />
      <path fill="#ffffff" d="M0 240h640v240H0z" />
    </g>
  </svg>
);

const UKFlag = () => (
  <svg viewBox="0 0 640 480" className="w-5 h-5 rounded-full object-cover shadow-sm">
    <path fill="#012169" d="M0 0h640v480H0z" />
    <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-179L0 64V0h75z" />
    <path fill="#C8102E" d="m424 281 216 159v40L369 281h55zm-104-41 240-176h80v16L400 240h-80zM0 440l183-136h57L24 480H0v-40zM240 240 0 62V0h24l276 205v35h-60z" />
    <path fill="#FFF" d="M240 0h160v480H240zM0 160h640v160H0z" />
    <path fill="#C8102E" d="M267 0h106v480H267zM0 187h640v106H0z" />
  </svg>
);

export default function LanguageToggleButton({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectLocale = (target: Locale) => {
    setLocale(target);
    setDropdownOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setDropdownOpen((v) => !v)}
        type="button"
        aria-label="Pilih Bahasa / Select Language"
        title="Ganti Bahasa / Switch Language"
        className="group relative flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-2xl border-2 border-neutral-900 dark:border-white/20 bg-white dark:bg-neutral-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(99,102,241,0.5)] transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(99,102,241,0.6)] active:translate-x-0 active:translate-y-0 active:shadow-none cursor-pointer select-none"
      >
        <div className="transition-transform duration-300 group-hover:scale-110">
          {locale === 'id' ? <IndonesiaFlag /> : <UKFlag />}
        </div>
      </button>

      {/* Language Selection Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl border-2 border-neutral-300 dark:border-white/15 bg-white dark:bg-[#121622] p-1.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <button
              onClick={() => selectLocale('id')}
              className={cn(
                'flex items-center justify-between w-full rounded-xl px-3 py-2 text-xs md:text-sm font-semibold transition-all cursor-pointer',
                locale === 'id'
                  ? 'bg-primary/10 text-primary dark:text-white font-bold'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              <div className="flex items-center gap-2.5">
                <IndonesiaFlag />
                <span>Indonesia</span>
              </div>
              {locale === 'id' && <FiCheck className="h-4 w-4 text-primary" />}
            </button>

            <button
              onClick={() => selectLocale('en')}
              className={cn(
                'flex items-center justify-between w-full rounded-xl px-3 py-2 text-xs md:text-sm font-semibold transition-all cursor-pointer',
                locale === 'en'
                  ? 'bg-primary/10 text-primary dark:text-white font-bold'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              <div className="flex items-center gap-2.5">
                <UKFlag />
                <span>English</span>
              </div>
              {locale === 'en' && <FiCheck className="h-4 w-4 text-primary" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
