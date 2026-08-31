'use client';

import { SOCIAL } from '@/common/constant/social';

export default function SocialMedia() {
  return (
    <div className="flex items-center gap-3">
      {SOCIAL.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer"
          aria-label={label}
          className="text-neutral-400 transition-colors duration-300 hover:text-neutral-200 cursor-pointer"
        >
          <Icon className="h-6 w-6" />
        </a>
      ))}
    </div>
  );
}
