'use client';

import Link from 'next/link';

export default function Profile() {
  return (
    <div className="flex items-center gap-3 pe-3 md:pe-6 py-1 lg:border-e-2 border-neutral-300 dark:border-neutral-800">
      <Link
        href="/"
        className="group relative block py-1 cursor-pointer select-none"
        aria-label="rizkiarbi homepage"
      >
        <div className="relative h-[28px] md:h-[32px] overflow-hidden font-brak text-xl md:text-2xl font-bold tracking-tight">
          {/* Top text slides up on hover */}
          <span className="flex items-center text-neutral-900 dark:text-white transition-transform duration-300 ease-out group-hover:-translate-y-full">
            <span>rizkiarbi</span>
            <span className="text-primary group-hover:scale-125 transition-transform duration-300">.</span>
          </span>

          {/* Bottom text slides in from below on hover */}
          <span className="absolute inset-0 flex items-center text-primary dark:text-indigo-400 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
            <span>rizkiarbi</span>
            <span className="text-emerald-400 animate-pulse">.</span>
          </span>
        </div>
      </Link>
    </div>
  );
}
