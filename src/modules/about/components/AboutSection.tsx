'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { useLanguage } from '@/common/context/LanguageContext';

export default function AboutSection() {
  const { t, locale } = useLanguage();

  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-stretch gap-6">
          {/* About Narrative Card */}
          <div className="w-full lg:w-[68%] flex flex-col justify-between bg-white dark:bg-[#141414] rounded-3xl p-6 md:p-10 lg:p-12 relative group border-2 border-neutral-300/80 dark:border-white/10 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.4)] overflow-hidden">
            {/* Ambient Gradient Beam */}
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute h-[220px] w-[220px] rounded-full opacity-30 blur-3xl mix-blend-screen"
                style={{ background: 'linear-gradient(to left, #6366f1, #a855f7, transparent)' }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-neutral-900 dark:text-neutral-100 text-2xl md:text-3xl lg:text-4xl tracking-tight font-brak font-bold mb-4 md:mb-6">
                {t('about_title')}
              </h2>
              <div className="space-y-4 md:space-y-5">
                <p className="text-neutral-700 dark:text-neutral-200 text-sm md:text-base leading-relaxed">
                  {t('about_p1')}
                </p>
                <p className="text-neutral-700 dark:text-neutral-200 text-sm md:text-base leading-relaxed">
                  {t('about_p2')}
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary dark:text-indigo-400 hover:underline transition-colors group/link cursor-pointer font-bold text-sm md:text-base"
              >
                <span>{t('about_more')}</span>
                <FiArrowUpRight className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
              </Link>
            </div>
          </div>

          {/* Real Photo Card */}
          <div className="w-full lg:w-[32%] min-h-[340px] lg:min-h-full relative group">
            <div className="relative h-full w-full overflow-hidden rounded-3xl border-2 border-neutral-300/80 dark:border-white/15 bg-neutral-100 dark:bg-[#121622] shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.4)] flex flex-col justify-end">
              {/* Photo Image */}
              <div className="relative h-full w-full min-h-[340px] lg:min-h-[420px]">
                <Image
                  src="/images/profile-photo.png"
                  alt="Rizki Arbiansyah"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Bottom Subtle Gradient & Name Tag Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 pt-12 z-10">
                <p className="font-brak font-bold text-lg text-white leading-tight drop-shadow-md">
                  Rizki Arbiansyah
                </p>
                <p className="text-xs font-medium text-emerald-400 mt-0.5 flex items-center gap-1.5 drop-shadow">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{locale === 'id' ? 'Tersedia untuk Pekerjaan / IT & Web' : 'Available for Work / IT & Web'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
