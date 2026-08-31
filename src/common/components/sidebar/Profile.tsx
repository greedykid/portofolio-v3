'use client';

import Link from 'next/link';
import { PROFILE } from '@/common/constant/data';

export default function Profile() {
  return (
    <div className="flex items-center gap-3 pe-4 lg:pe-8 py-1 lg:border-e-2 border-[#e7f0ff]">
      <Link href="/" className="text-white font-brak text-2xl lg:text-2xl tracking-wide block py-3 cursor-pointer">
        <div className="relative h-[32px] overflow-hidden inline-block">
          <span className="block whitespace-nowrap leading-none">Rizki</span>
          <span className="hidden lg:block whitespace-nowrap absolute top-[32px] start-0 text-white leading-none">Rizki</span>
        </div>
      </Link>
    </div>
  );
}
