'use client';

import { useState, useEffect } from 'react';
import Container from '@/common/components/elements/Container';
import Profile from '@/common/components/sidebar/Profile';
import Navigation from '@/common/components/sidebar/Navigation';
import ThemeToggleButton from '@/common/components/elements/ThemeToggleButton';
import LanguageToggleButton from '@/common/components/elements/LanguageToggleButton';
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
            <LanguageToggleButton className="hidden sm:flex" />
            <ThemeToggleButton />
          </div>
        </div>
      </Container>
    </header>
  );
}
