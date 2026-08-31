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
      <nav className="hidden lg:flex items-center gap-9 ps-10 relative">
        {NAVIGATION.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'text-white text-base md:text-lg font-medium transition-colors duration-300 cursor-pointer',
              isActive(href)
                ? 'text-white underline underline-offset-8'
                : 'text-neutral-400 hover:text-neutral-200',
            )}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Mobile toggler */}
      <button
        className="lg:hidden flex flex-col gap-1.5 p-2 ms-2"
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={cn('w-6 h-0.5 bg-white transition-all', open && 'rotate-45 translate-y-2')} />
        <span className={cn('w-6 h-0.5 bg-white transition-all', open && 'opacity-0')} />
        <span className={cn('w-6 h-0.5 bg-white transition-all', open && '-rotate-45 -translate-y-2')} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden absolute left-0 top-full w-full border-t border-white/10 bg-neutral-950 p-6 flex flex-col gap-4 transition-all">
          {NAVIGATION.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'text-lg font-medium transition-colors duration-300 cursor-pointer',
                isActive(href) ? 'text-white' : 'text-neutral-400 hover:text-neutral-200',
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
