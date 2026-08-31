'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage, type Locale } from '@/common/context/LanguageContext';
import { FiCheck } from 'react-icons/fi';
import { cn } from '@/lib/utils';

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
        {locale === 'id' ? (
          <span className="text-xl transition-transform duration-300 group-hover:scale-110">
            🇮🇩
          </span>
        ) : (
          <span className="text-xl transition-transform duration-300 group-hover:scale-110">
            🇬🇧
          </span>
        )}
      </button>

      {/* Language Selection Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border-2 border-neutral-300 dark:border-white/15 bg-white dark:bg-[#121622] p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <button
              onClick={() => selectLocale('id')}
              className={cn(
                'flex items-center justify-between w-full rounded-xl px-3 py-2.5 text-xs md:text-sm font-semibold transition-all cursor-pointer',
                locale === 'id'
                  ? 'bg-primary/10 text-primary dark:text-white font-bold'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🇮🇩</span>
                <span>Indonesia</span>
              </div>
              {locale === 'id' && <FiCheck className="h-4 w-4 text-primary" />}
            </button>

            <button
              onClick={() => selectLocale('en')}
              className={cn(
                'flex items-center justify-between w-full rounded-xl px-3 py-2.5 text-xs md:text-sm font-semibold transition-all cursor-pointer',
                locale === 'en'
                  ? 'bg-primary/10 text-primary dark:text-white font-bold'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-lg">🇬🇧</span>
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
