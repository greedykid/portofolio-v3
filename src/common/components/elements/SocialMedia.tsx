'use client';

import { SOCIAL } from '@/common/constant/social';

export default function SocialMedia() {
  return (
    <div className="relative z-30 flex items-center gap-3">
      {SOCIAL.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300/80 dark:border-white/15 bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-200 transition-all duration-200 hover:scale-110 hover:bg-primary hover:text-white hover:border-primary active:scale-95 cursor-pointer shadow-sm"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

