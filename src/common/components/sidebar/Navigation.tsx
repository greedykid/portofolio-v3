'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const NAVIGATION = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      {/* Desktop */}
      <nav className="hidden lg:flex items-center gap-4 ps-6 relative">
        {NAVIGATION.map(({ label, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group relative px-3.5 py-1.5 rounded-full text-base md:text-lg font-medium transition-all duration-200 cursor-pointer',
                active
                  ? 'text-primary dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              {/* Hover background pill animation */}
              <span className="absolute inset-0 rounded-full bg-neutral-200/60 dark:bg-white/10 opacity-0 scale-90 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 pointer-events-none" />

              <span className="relative z-10">{label}</span>

              {/* Active underline */}
              {active && (
                <span className="absolute bottom-0.5 left-3.5 right-3.5 h-[2.5px] bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mobile toggler */}
      <button
        className="lg:hidden flex flex-col gap-1.5 p-2 ms-auto"
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={cn(
            'w-6 h-0.5 bg-neutral-900 dark:bg-white transition-all duration-300',
            open && 'rotate-45 translate-y-2'
          )}
        />
        <span
          className={cn(
            'w-6 h-0.5 bg-neutral-900 dark:bg-white transition-all duration-300',
            open && 'opacity-0'
          )}
        />
        <span
          className={cn(
            'w-6 h-0.5 bg-neutral-900 dark:bg-white transition-all duration-300',
            open && '-rotate-45 -translate-y-2'
          )}
        />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden absolute left-0 top-full mt-3 w-full rounded-2xl border-2 border-neutral-300 dark:border-white/10 bg-white dark:bg-neutral-950 p-6 flex flex-col gap-4 shadow-xl z-50 transition-all">
          {NAVIGATION.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'text-lg font-medium transition-colors duration-200 cursor-pointer py-1',
                isActive(href)
                  ? 'text-primary dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

