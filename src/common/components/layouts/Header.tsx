'use client';

import Container from '@/common/components/elements/Container';
import Profile from '@/common/components/sidebar/Profile';
import Navigation from '@/common/components/sidebar/Navigation';
import ThemeToggleButton from '@/common/components/elements/ThemeToggleButton';

export default function Header() {
  return (
    <header className="sticky top-0 z-40">
      <Container className="max-w-[1280px]">
        <div className="relative mt-4 md:mt-6 flex items-center justify-between rounded-3xl border-2 border-white/10 bg-neutral-950 px-4 py-2 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] md:px-6">
          <Profile />
          <div className="flex items-center flex-1">
            <Navigation />
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggleButton />
          </div>
        </div>
      </Container>
    </header>
  );
}
