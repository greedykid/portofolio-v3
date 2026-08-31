'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronDown, FiBarChart2, FiMonitor, FiBook, FiFilm } from 'react-icons/fi';
import { cn } from '@/lib/utils';

const PRIMARY_NAVIGATION = [
  { label: 'Portfolio', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Tools', href: '/#tools' },
  { label: 'Links', href: '/links' },
  { label: 'Contact', href: '/contact' },
];

const MORE_NAVIGATION = [
  { label: 'Statistik Situs', href: '/stats', icon: FiBarChart2, desc: 'Statistik pengunjung & GitHub metrics' },
  { label: 'My Setup', href: '/#setup', icon: FiMonitor, desc: 'Hardware, gears & workflow' },
  { label: 'Guestbook', href: '/#guestbook', icon: FiBook, desc: 'Tinggalkan pesan Anda' },
  { label: 'Di Balik Layar', href: '/#behind-the-scenes', icon: FiFilm, desc: 'Proses kreatif & eksplorasi' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1.5 ps-6 relative">
        {PRIMARY_NAVIGATION.map(({ label, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group relative px-3 py-1.5 rounded-full text-sm md:text-base font-medium transition-all duration-200 cursor-pointer',
                active
                  ? 'text-primary dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              {/* Hover background pill animation */}
              <span className="absolute inset-0 rounded-full bg-neutral-200/60 dark:bg-white/10 opacity-0 scale-90 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 pointer-events-none" />

              <span className="relative z-10">{label}</span>

              {/* Active underline indicator */}
              {active && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full" />
              )}
            </Link>
          );
        })}

        {/* More Dropdown */}
        <div ref={moreRef} className="relative">
          <button
            onClick={() => setMoreOpen((v) => !v)}
            className={cn(
              'group relative flex items-center gap-1 px-3 py-1.5 rounded-full text-sm md:text-base font-medium transition-all duration-200 cursor-pointer',
              moreOpen || pathname === '/stats'
                ? 'text-primary dark:text-white font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            )}
          >
            <span className="absolute inset-0 rounded-full bg-neutral-200/60 dark:bg-white/10 opacity-0 scale-90 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 pointer-events-none" />
            <span className="relative z-10">More</span>
            <FiChevronDown
              className={cn(
                'h-3.5 w-3.5 transition-transform duration-200 relative z-10',
                moreOpen && 'rotate-180'
              )}
            />
          </button>

          {/* Dropdown Menu Modal */}
          {moreOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border-2 border-neutral-300 dark:border-white/15 bg-white dark:bg-[#121622] p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-1 space-y-1">
                {MORE_NAVIGATION.map((item) => {
                  const Icon = item.icon;
                  const itemActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl p-2.5 transition-all text-xs md:text-sm font-medium',
                        itemActive
                          ? 'bg-primary/10 text-primary dark:text-white font-semibold'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white'
                      )}
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-neutral-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-semibold">{item.label}</p>
                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile toggler button */}
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

      {/* Mobile menu modal */}
      {open && (
        <div className="lg:hidden absolute left-0 top-full mt-3 w-full rounded-2xl border-2 border-neutral-300 dark:border-white/10 bg-white dark:bg-neutral-950 p-6 flex flex-col gap-3 shadow-2xl z-50 transition-all">
          {PRIMARY_NAVIGATION.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'text-base font-medium transition-colors duration-200 cursor-pointer py-1.5 px-2 rounded-lg',
                isActive(href)
                  ? 'bg-primary/10 text-primary dark:text-white font-semibold'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'
              )}
            >
              {label}
            </Link>
          ))}

          <div className="pt-2 mt-1 border-t border-neutral-200 dark:border-white/10 space-y-1">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-2 block mb-1">
              More Insights
            </span>
            {MORE_NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-400 py-1.5 px-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/5"
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
