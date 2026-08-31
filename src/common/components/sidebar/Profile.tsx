'use client';

import Link from 'next/link';

export default function Profile() {
  return (
    <div className="flex items-center gap-3 pe-4 lg:pe-8 py-1 lg:border-e-2 border-neutral-300 dark:border-neutral-800">
      <Link href="/" className="text-neutral-900 dark:text-white font-brak text-2xl lg:text-2xl tracking-wide block py-2 cursor-pointer transition-colors duration-200">
        <div className="relative h-[32px] overflow-hidden inline-block">
          <span className="block whitespace-nowrap leading-none font-bold">Rizki</span>
          <span className="hidden lg:block whitespace-nowrap absolute top-[32px] start-0 text-primary leading-none font-bold">Rizki</span>
        </div>
      </Link>
    </div>
  );
}

