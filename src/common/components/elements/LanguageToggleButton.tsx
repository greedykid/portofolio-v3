'use client';

import { useLanguage } from '@/common/context/LanguageContext';
import { cn } from '@/lib/utils';

export default function LanguageToggleButton({ className }: { className?: string }) {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      onClick={toggleLocale}
      type="button"
      aria-label={`Switch language. Current: ${locale.toUpperCase()}`}
      title={`Switch to ${locale === 'id' ? 'English' : 'Bahasa Indonesia'}`}
      className={cn(
        'group flex items-center gap-1.5 rounded-full border border-neutral-300 dark:border-white/15 bg-neutral-100 dark:bg-white/5 px-2.5 py-1 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-all duration-200 hover:scale-105 active:scale-95 hover:border-indigo-400 cursor-pointer select-none shadow-sm',
        className
      )}
    >
      {locale === 'id' ? (
        <>
          {/* Indonesian Flag Icon */}
          <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-neutral-400/40 shadow-inner">
            <span className="block h-1/2 bg-[#e70011]" />
            <span className="block h-1/2 bg-white" />
          </span>
          <span className="font-bold tracking-wider transition-transform group-hover:text-primary">
            ID
          </span>
        </>
      ) : (
        <>
          {/* English / UK Flag Icon */}
          <span className="inline-flex items-center justify-center h-3.5 w-3.5 overflow-hidden rounded-full border border-neutral-400/40 bg-[#012169] text-[9px] shadow-inner text-white font-bold">
            🇬🇧
          </span>
          <span className="font-bold tracking-wider transition-transform group-hover:text-primary">
            EN
          </span>
        </>
      )}
    </button>
  );
}
