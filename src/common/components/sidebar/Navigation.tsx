'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiChevronDown,
  FiBarChart2,
  FiMonitor,
  FiBook,
  FiFilm,
  FiX,
  FiFolder,
  FiFileText,
  FiUser,
  FiTool,
  FiLink,
  FiMail,
} from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { SOCIAL } from '@/common/constant/social';
import ThemeToggleButton from '@/common/components/elements/ThemeToggleButton';

const PRIMARY_NAVIGATION = [
  { label: 'Portfolio', href: '/projects', icon: FiFolder },
  { label: 'Blog', href: '/blog', icon: FiFileText },
  { label: 'About', href: '/about', icon: FiUser },
  { label: 'Tools', href: '/#tools', icon: FiTool },
  { label: 'Links', href: '/links', icon: FiLink },
  { label: 'Contact', href: '/contact', icon: FiMail },
];

const MORE_NAVIGATION = [
  { label: 'Statistik Situs', href: '/stats', icon: FiBarChart2, desc: 'Statistik pengunjung & GitHub metrics' },
  { label: 'My Setup', href: '/#setup', icon: FiMonitor, desc: 'Hardware, gears & workflow' },
  { label: 'Guestbook', href: '/#guestbook', icon: FiBook, desc: 'Tinggalkan pesan Anda' },
  { label: 'Di Balik Layar', href: '/#behind-the-scenes', icon: FiFilm, desc: 'Proses kreatif & eksplorasi' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Open with smooth slide up transition
  const handleOpen = () => {
    setDragOffset(0);
    setIsOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  };

  // Close with smooth slide down transition
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setDragOffset(0);
    }, 300);
  }, []);

  // Pointer drag gestures for sheet header/handle
  const handleDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragStartY.current = e.clientY - dragOffset;
    setIsDragging(true);
  };

  const handleDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaY = e.clientY - dragStartY.current;
    if (deltaY > 0) {
      setDragOffset(deltaY);
    } else {
      // Elastic resistance when dragged above viewport top
      setDragOffset(deltaY * 0.2);
    }
  };

  const handleDragEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(false);
    if (dragOffset > 90) {
      handleClose();
    } else {
      setDragOffset(0);
    }
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

  // Lock body scroll when mobile bottomsheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile sheet on route change
  useEffect(() => {
    handleClose();
  }, [pathname, handleClose]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1 ps-6 relative">
        {PRIMARY_NAVIGATION.map(({ label, href }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group relative px-3 py-1.5 text-sm md:text-base font-medium transition-colors duration-200 cursor-pointer',
                active
                  ? 'text-primary dark:text-white font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              )}
            >
              <span className="relative z-10">{label}</span>

              {/* Underline expanding from the center on hover */}
              <span
                className={cn(
                  'absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full origin-center transition-transform duration-300 ease-out',
                  active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                )}
              />
            </Link>
          );
        })}

        {/* More Dropdown */}
        <div ref={moreRef} className="relative">
          <button
            onClick={() => setMoreOpen((v) => !v)}
            className={cn(
              'group relative flex items-center gap-1 px-3 py-1.5 text-sm md:text-base font-medium transition-colors duration-200 cursor-pointer',
              moreOpen || pathname === '/stats'
                ? 'text-primary dark:text-white font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            )}
          >
            <span className="relative z-10">More</span>
            <FiChevronDown
              className={cn(
                'h-3.5 w-3.5 transition-transform duration-200 relative z-10',
                moreOpen && 'rotate-180'
              )}
            />

            {/* Underline expanding from the center on hover */}
            <span
              className={cn(
                'absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full origin-center transition-transform duration-300 ease-out',
                moreOpen || pathname === '/stats'
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
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

      {/* Mobile Hamburger Toggle Button */}
      <button
        className="lg:hidden flex flex-col justify-center items-center gap-1.5 p-2 ms-auto rounded-xl hover:bg-neutral-200/50 dark:hover:bg-white/10 transition-colors"
        aria-label="Toggle Navigation Menu"
        onClick={handleOpen}
      >
        <span className="w-5 h-0.5 bg-neutral-900 dark:bg-white rounded-full transition-all duration-300" />
        <span className="w-5 h-0.5 bg-neutral-900 dark:bg-white rounded-full transition-all duration-300" />
        <span className="w-5 h-0.5 bg-neutral-900 dark:bg-white rounded-full transition-all duration-300" />
      </button>

      {/* Mobile Bottom Sheet Modal rendered via React Portal with gesture drag */}
      {isOpen &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex flex-col justify-end pointer-events-auto">
            {/* Backdrop Blur Overlay */}
            <div
              className={cn(
                'fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-in-out',
                isVisible ? 'opacity-100' : 'opacity-0'
              )}
              onClick={handleClose}
            />

            {/* Bottom Sheet Card with interactive drag */}
            <div
              style={{
                transform: isVisible
                  ? `translateY(${dragOffset}px)`
                  : 'translateY(100%)',
                transition: isDragging
                  ? 'none'
                  : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative z-10 w-full max-h-[85vh] overflow-y-auto rounded-t-[32px] border-t-2 border-neutral-300/80 dark:border-white/15 bg-white dark:bg-[#121622] p-6 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] will-change-transform"
            >
              {/* Draggable Top Handle Area */}
              <div
                onPointerDown={handleDragStart}
                onPointerMove={handleDragMove}
                onPointerUp={handleDragEnd}
                onPointerCancel={handleDragEnd}
                className="touch-none cursor-grab active:cursor-grabbing select-none py-1 -mt-2 mb-3"
              >
                <div className="mx-auto h-1.5 w-12 rounded-full bg-neutral-300 dark:bg-white/25 hover:bg-neutral-400 dark:hover:bg-white/40 transition-colors" />
              </div>

              {/* Header row in sheet */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-white/10 mb-4">
                <span className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider select-none">
                  Navigasi Menu
                </span>
                <button
                  onClick={handleClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  aria-label="Close menu"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </div>

              {/* Primary Nav Links */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {PRIMARY_NAVIGATION.map(({ label, href, icon: Icon }) => {
                  const active = isActive(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={handleClose}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl p-3.5 text-sm font-semibold transition-all duration-200 cursor-pointer',
                        active
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-neutral-100/80 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200/80 dark:hover:bg-white/10'
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* More Insights Section */}
              <div className="pt-2 border-t border-neutral-200 dark:border-white/10 mb-6">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-3 select-none">
                  More Insights
                </span>
                <div className="space-y-2">
                  {MORE_NAVIGATION.map((item) => {
                    const Icon = item.icon;
                    const itemActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleClose}
                        className={cn(
                          'flex items-center gap-3.5 rounded-2xl p-3 text-xs md:text-sm font-medium transition-all cursor-pointer',
                          itemActive
                            ? 'bg-primary/10 text-primary dark:text-white font-semibold'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'
                        )}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-neutral-200">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-neutral-900 dark:text-white">{item.label}</p>
                          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Controls Row: Flag, Theme Toggle & Social Media */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 rounded-full border border-neutral-300 dark:border-white/15 bg-neutral-100 dark:bg-white/5 px-2.5 py-1 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                    <span className="inline-block h-3.5 w-3.5 overflow-hidden rounded-full border border-neutral-400/40">
                      <span className="block h-1/2 bg-[#e70011]" />
                      <span className="block h-1/2 bg-white" />
                    </span>
                    <span>ID</span>
                  </div>
                  <ThemeToggleButton />
                </div>

                {/* Quick Socials */}
                <div className="flex items-center gap-2">
                  {SOCIAL.slice(0, 4).map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:text-primary transition-colors cursor-pointer"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
