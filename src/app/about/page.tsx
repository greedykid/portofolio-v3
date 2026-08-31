'use client';

import { useState } from 'react';
import Container from '@/common/components/elements/Container';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { FaLaptopCode, FaStore, FaCode, FaServer, FaGraduationCap } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/common/context/LanguageContext';

interface EducationItem {
  institution: string;
  degree: string;
  major: string;
  period: string;
  iconBg: string;
}

interface CareerItem {
  role: string;
  company: string;
  legalCompany: string;
  location: string;
  period: string;
  type: string;
  workplace: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

const EDUCATION_DATA: EducationItem[] = [
  {
    institution: 'Universitas Gunadarma',
    degree: "Bachelor's Degree",
    major: 'Sistem Informasi (Information Systems)',
    period: '2022 - 2026',
    iconBg: 'bg-amber-500/20 text-amber-400',
  },
  {
    institution: 'SMA Negeri Jakarta',
    degree: 'Senior High School',
    major: 'MIPA (Mathematics & Natural Science)',
    period: '2019 - 2022',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
  },
];

const CAREER_DATA: CareerItem[] = [
  {
    role: 'Web Developer & Research Lead',
    company: 'GEGARES',
    legalCompany: 'Universitas Gunadarma',
    location: 'Jakarta, Indonesia',
    period: 'Sep 2025 - Feb 2026',
    type: 'Academic Project',
    workplace: 'On-site',
    icon: FaGraduationCap,
    iconBg: 'bg-[#181d2a] border-indigo-500/30 text-indigo-400',
    iconColor: '#6366f1',
  },
  {
    role: 'Web Developer (Digital Catalog)',
    company: 'Berkah Mulia',
    legalCompany: 'bmberkahmulia.com',
    location: 'Jakarta, Indonesia',
    period: 'Jun 2024 - Present',
    type: 'Freelance',
    workplace: 'Remote',
    icon: FaStore,
    iconBg: 'bg-[#181d2a] border-emerald-500/30 text-emerald-400',
    iconColor: '#10b981',
  },
  {
    role: 'Frontend & UI Specialist',
    company: 'Independent Projects',
    legalCompany: 'Freelance & Open Source',
    location: 'Jakarta, Indonesia',
    period: 'Jan 2023 - May 2024',
    type: 'Contract',
    workplace: 'Remote',
    icon: FaCode,
    iconBg: 'bg-[#181d2a] border-cyan-500/30 text-cyan-400',
    iconColor: '#06b6d4',
  },
  {
    role: 'Full Stack Engineer',
    company: 'Creative Tech Studio',
    legalCompany: 'Studio Labs',
    location: 'Jakarta, Indonesia',
    period: 'Nov 2022 - Dec 2023',
    type: 'Full-time',
    workplace: 'Hybrid',
    icon: FaLaptopCode,
    iconBg: 'bg-[#181d2a] border-purple-500/30 text-purple-400',
    iconColor: '#a855f7',
  },
  {
    role: 'IT Support & Hardware Specialist',
    company: 'Tech Solutions',
    legalCompany: 'Independent Services',
    location: 'Jakarta, Indonesia',
    period: 'Jun 2022 - Nov 2022',
    type: 'Internship',
    workplace: 'On-site',
    icon: FaServer,
    iconBg: 'bg-[#181d2a] border-pink-500/30 text-pink-400',
    iconColor: '#ec4899',
  },
];

export default function AboutPage() {
  const { locale } = useLanguage();
  const [showAllCareer, setShowAllCareer] = useState(false);

  const displayedCareer = showAllCareer ? CAREER_DATA : CAREER_DATA.slice(0, 4);

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight mb-2">
            About Me
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
            {locale === 'id'
              ? 'Kenali cerita perjalanan saya, filosofi rekayasa perangkat lunak, dan karya yang saya bangun.'
              : 'Discover my journey, engineering philosophy, and the digital experiences I build.'}
          </p>
        </div>

        {/* 1. Main Top Card: Nice to meet you! */}
        <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-6 md:p-10 lg:p-12 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] mb-8 md:mb-10 overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-5">
            <h2 className="text-neutral-900 dark:text-white text-2xl md:text-3xl font-brak font-bold">
              {locale === 'id' ? 'Senang bertemu dengan Anda!' : 'Nice to meet you!'}
            </h2>

            {locale === 'id' ? (
              <>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  Halo! Terima kasih sudah berkunjung. Saya Rizki Arbiansyah, seorang software engineer dan web developer berbasis di Jakarta, Indonesia. Saya berfokus pada perancangan dan pembangunan produk digital yang berkinerja tinggi, responsif, andal, serta memikat secara visual.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  Keahlian utama saya mencakup arsitektur antarmuka modern berbasis Next.js, React, TypeScript, hingga pengembangan API backend dan optimasi basis data relasional. Saya selalu berdedikasi menciptakan kode yang rapi, terstruktur (clean architecture), dan mudah dikembangkan dalam jangka panjang.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  Saya meyakini bahwa kolaborasi terbuka, perhatian mendalam pada detail UI/UX, dan kecepatan eksekusi adalah fondasi dalam mewujudkan software yang berdampak nyata. Baik dalam proyek mandiri maupun berkolaborasi di lingkungan tim agile, saya selalu memberikan hasil kerja terbaik.
                </p>
              </>
            ) : (
              <>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  Hey! Thanks for stopping by. I&apos;m Rizki Arbiansyah, a software engineer and web developer based in Jakarta, Indonesia with extensive experience crafting modern, high-performance, and resilient digital products.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  My core specialization lies in architecting robust frontend systems with Next.js, React, TypeScript, developing performant backend APIs, and streamlining database structures. I love writing clean, testable, and scalable code that powers seamless user experiences.
                </p>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
                  I strongly believe that open collaboration, exceptional attention to UI/UX details, and engineering rigor are the hallmarks of great software. Whether taking full ownership of independent projects or collaborating within agile engineering teams, I am committed to delivering excellence.
                </p>
              </>
            )}

            <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {locale === 'id' ? 'Salam hangat,' : 'Best regards,'}
              </p>
              <p className="font-brak font-bold text-2xl md:text-3xl text-neutral-900 dark:text-white tracking-tight mt-0.5">
                Rizki.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Bottom Grid: Where I Learned & Career Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Card: Where I Learned */}
          <div className="lg:col-span-5 relative rounded-3xl border-2 border-teal-300/80 dark:border-teal-500/20 bg-teal-50/60 dark:bg-[#0d1e22] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(20,184,166,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(20,184,166,0.25)] flex flex-col justify-between">
            <div>
              <h3 className="text-neutral-900 dark:text-white text-xl md:text-2xl font-brak font-bold mb-1">
                {locale === 'id' ? 'Tempat Belajar' : 'Where I Learned'}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm mb-6">
                {locale === 'id' ? 'Pondasi akademik & perjalanan studi' : 'The foundation of my journey'}
              </p>

              <div className="space-y-4">
                {EDUCATION_DATA.map((edu) => (
                  <div
                    key={edu.institution}
                    className="rounded-2xl border border-teal-200 dark:border-white/10 bg-white/90 dark:bg-white/5 p-4 md:p-5 transition-all duration-200 hover:border-teal-400/50"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', edu.iconBg)}>
                        <HiOutlineAcademicCap className="h-6 w-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm md:text-base font-bold text-neutral-900 dark:text-white truncate">
                            {edu.institution}
                          </h4>
                          <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 shrink-0">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 mt-0.5">
                          {edu.degree}
                        </p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                          {edu.major}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Career Timeline (Matching Reference Screenshot 1) */}
          <div className="lg:col-span-7 relative rounded-3xl border-2 border-indigo-300/80 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-[#0f1322] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)]">
            <div className="flex items-center justify-between gap-4 mb-1">
              <h3 className="text-neutral-900 dark:text-white text-xl md:text-2xl font-brak font-bold">
                {locale === 'id' ? 'Linimasa Karir' : 'Career Timeline'}
              </h3>
              <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                4+ {locale === 'id' ? 'tahun' : 'years'}
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm mb-6">
              @2022 - {locale === 'id' ? 'Sekarang' : 'Present'}
            </p>

            {/* Seamless Connected Vertical Timeline */}
            <div className="relative space-y-4 before:absolute before:left-[22px] before:top-6 before:bottom-6 before:w-[2px] before:bg-indigo-500/30 dark:before:bg-indigo-500/25">
              {displayedCareer.map((career, idx) => {
                const Icon = career.icon;
                return (
                  <div key={idx} className="relative flex items-center gap-4 group">
                    {/* Centered Node Avatar Badge */}
                    <div
                      className={cn(
                        'relative z-10 flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-2xl border shadow-sm transition-transform duration-200 group-hover:scale-105',
                        career.iconBg
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Timeline Content Card */}
                    <div className="flex-1 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white/95 dark:bg-[#161b2a] p-4 md:p-5 shadow-sm transition-all duration-200 hover:border-indigo-400/50 hover:shadow-md">
                      <h4 className="text-sm md:text-base font-bold text-neutral-900 dark:text-white leading-tight">
                        {career.role}
                      </h4>
                      <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-1">
                        {career.company} <span className="text-neutral-400 dark:text-neutral-500">•</span> {career.legalCompany} <span className="text-neutral-400 dark:text-neutral-500">•</span> {career.location}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {career.period} <span className="text-neutral-400 dark:text-neutral-500">•</span> {career.type} <span className="text-neutral-400 dark:text-neutral-500">•</span> {career.workplace}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Show All Toggle */}
            {CAREER_DATA.length > 4 && (
              <button
                onClick={() => setShowAllCareer((v) => !v)}
                className="mt-6 flex items-center justify-center gap-2 w-full rounded-2xl border border-neutral-300 dark:border-white/10 bg-white/80 dark:bg-white/5 py-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-all hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                {showAllCareer ? (
                  <>
                    {locale === 'id' ? 'Show less' : 'Show less'}{' '}
                    <FiChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    {locale === 'id' ? 'Show all' : 'Show all'} ({CAREER_DATA.length - 4}{' '}
                    {locale === 'id' ? 'more' : 'more'}){' '}
                    <FiChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
