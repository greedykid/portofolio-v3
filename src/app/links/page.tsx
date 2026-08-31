'use client';

import { FiSun, FiMoon, FiGlobe, FiCalendar, FiCoffee, FiMail, FiArrowRight } from 'react-icons/fi';
import { SOCIAL } from '@/common/constant/social';
import { PROFILE } from '@/common/constant/data';
import { useTheme } from '@/common/context/ThemeContext';
import { BsQrCode } from 'react-icons/bs';

const PERSONAL_LINKS = [
  {
    title: 'My Personal Space',
    href: '/',
    icon: FiGlobe,
    accentBorder: 'border-b-emerald-400',
    description: 'Explore my projects, writings, and background',
  },
  {
    title: "Let's Chat!",
    href: 'mailto:rizkiarbi65@gmail.com',
    icon: FiCalendar,
    accentBorder: 'border-b-rose-400',
    description: 'Schedule a call or quick virtual coffee',
  },
  {
    title: 'Buy Me Coffee?',
    href: 'https://saweria.co',
    icon: FiCoffee,
    accentBorder: 'border-b-amber-400',
    description: 'Support my open-source work & creative explorations',
  },
];

export default function LinksPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full py-6 md:py-10 flex items-center justify-center px-4">
      <div className="w-full max-w-[480px] rounded-3xl border-2 border-neutral-300/80 dark:border-white/15 bg-white dark:bg-[#0e1117] shadow-[8px_8px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[8px_8px_0px_0px_rgba(99,102,241,0.35)] overflow-hidden">
        {/* Top Banner Gradient & Action Buttons */}
        <div className="relative h-36 md:h-40 w-full bg-gradient-to-br from-teal-800/40 via-indigo-900/60 to-slate-900 p-4 flex items-start justify-between">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-amber-400 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-all cursor-pointer"
          >
            {theme === 'dark' ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4 text-neutral-200" />}
          </button>
          <button
            aria-label="Share QR code"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-black/60 transition-all cursor-pointer"
          >
            <BsQrCode className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Info Center */}
        <div className="relative px-6 pb-8 -mt-16 text-center">
          {/* Avatar */}
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white dark:border-[#0e1117] bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-brak font-bold text-white shadow-xl">
            {PROFILE.first.charAt(0)}
          </div>

          <h1 className="text-2xl md:text-3xl font-brak font-bold text-neutral-900 dark:text-white">
            {PROFILE.name}
          </h1>
          <p className="mt-1 text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            {PROFILE.location} • he/him
          </p>

          {/* Social Icons Row */}
          <div className="mt-5 flex items-center justify-center gap-3">
            {SOCIAL.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 transition-all hover:bg-primary hover:text-white hover:scale-110"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Links Section */}
          <div className="mt-8 text-left">
            <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3 uppercase tracking-wider">
              Links
            </h2>
            <div className="space-y-3">
              {PERSONAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.title}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className={`group flex items-center justify-between rounded-2xl border-2 border-neutral-200 dark:border-white/10 ${link.accentBorder} bg-neutral-50/80 dark:bg-white/5 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer shadow-sm`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-neutral-600 dark:text-neutral-300 transition-transform group-hover:scale-110" />
                      <div>
                        <span className="text-sm font-bold text-neutral-900 dark:text-white block">
                          {link.title}
                        </span>
                      </div>
                    </div>
                    <FiArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Get in touch Card */}
          <div className="mt-8 text-left">
            <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3 uppercase tracking-wider">
              Get in touch
            </h2>
            <div className="rounded-2xl border border-blue-200 dark:border-blue-500/20 bg-blue-50/80 dark:bg-[#131d2e] p-5 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1.5">
                <FiMail className="h-5 w-5" />
                <span className="text-sm font-bold">Drop Me an Email</span>
              </div>
              <a
                href="mailto:rizkiarbi65@gmail.com"
                className="text-base font-bold text-neutral-900 dark:text-white hover:underline block mb-2"
              >
                rizkiarbi65@gmail.com
              </a>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Expect my rapid dan eager reply — your message won&apos;t be kept waiting!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
