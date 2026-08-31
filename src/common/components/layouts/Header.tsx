'use client';

import { useState, useEffect } from 'react';
import Container from '@/common/components/elements/Container';
import Profile from '@/common/components/sidebar/Profile';
import Navigation from '@/common/components/sidebar/Navigation';
import ThemeToggleButton from '@/common/components/elements/ThemeToggleButton';
import { cn } from '@/lib/utils';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-3 md:top-4 z-[100] w-full transition-all duration-300 pointer-events-auto">
      <Container className="max-w-[1280px]">
        <div
          className={cn(
            'relative flex items-center justify-between rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md px-4 md:px-6 transition-all duration-300 ease-out',
            scrolled
              ? 'py-1.5 md:py-2 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.4)] scale-[0.985]'
              : 'py-2.5 md:py-3.5 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] scale-100'
          )}
        >
          <Profile />
          <div className="flex items-center flex-1">
            <Navigation />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-neutral-300 dark:border-white/15 bg-neutral-100 dark:bg-white/5 px-2.5 py-1 text-xs font-semibold text-neutral-800 dark:text-neutral-200 select-none shadow-sm">
              <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-neutral-400/40">
                <span className="block h-1/2 bg-[#e70011]" />
                <span className="block h-1/2 bg-white" />
              </span>
              <span>ID</span>
            </div>
            <ThemeToggleButton />
          </div>
        </div>
      </Container>
    </header>
  );
}

