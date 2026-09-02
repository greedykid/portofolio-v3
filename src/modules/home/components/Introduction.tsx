'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiMapPin, FiBriefcase, FiDownload, FiMail } from 'react-icons/fi';
import { useLanguage } from '@/common/context/LanguageContext';
import ResumeModal from '@/common/components/elements/ResumeModal';

export default function Introduction() {
  const { t } = useLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative rounded-3xl p-6 md:p-12 lg:p-14 overflow-hidden border-2 border-white/10 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] rtl:shadow-[-6px_6px_0px_0px_rgba(99,102,241,0.3)] bg-[#101010] transition-shadow duration-300 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,0.4)]"
        >
          {/* 1. Base Gradient glow top-right with interactive hover scaling */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl transition-transform duration-500 ease-out group-hover:scale-125 group-hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
            />
          </div>

          {/* 2. Interactive Spotlight that tracks cursor on hover */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.22), rgba(168,85,247,0.12), transparent 75%)`,
            }}
          />

          <div className="relative z-10 w-full">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-brak font-bold leading-tight mb-4 md:mb-6 flex items-center flex-wrap gap-x-3">
              <span>{t('hero_greeting')}</span>
              <span className="inline-block origin-[70%_70%] animate-wave">👋</span>
              <span>{t('hero_im')}</span>
            </h1>

            <p className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug max-w-4xl mb-6 md:mb-8">
              {t('hero_headline_1')}
              <span className="bg-white text-black px-2.5 py-0.5 rounded-lg mx-1 inline-block font-brak font-extrabold shadow-sm">
                {t('hero_headline_badge')}
              </span>
              {t('hero_headline_2')}
            </p>

            {/* Location and Status */}
            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-neutral-300 mb-8 md:mb-10">
              <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-medium">
                <FiMapPin className="text-indigo-400 h-4 w-4 shrink-0" />
                <span>{t('hero_location')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-medium">
                <FiBriefcase className="text-purple-400 h-4 w-4 shrink-0" />
                <span>{t('hero_work')}</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => setIsResumeOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm sm:text-base shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)] transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <FiDownload className="h-4 w-4" />
                <span>{t('hero_download_cv')}</span>
              </button>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm sm:text-base transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <FiMail className="h-4 w-4" />
                <span>{t('hero_contact_btn')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </section>
  );
}
