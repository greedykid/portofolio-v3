'use client';

import { useState } from 'react';
import Container from '@/common/components/elements/Container';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { cn } from '@/lib/utils';

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
  iconColor: string;
  iconBg: string;
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
    iconColor: '#6366f1',
    iconBg: 'bg-indigo-500/20 text-indigo-400',
  },
  {
    role: 'Web Developer (Digital Catalog)',
    company: 'Berkah Mulia',
    legalCompany: 'bmberkahmulia.com',
    location: 'Jakarta, Indonesia',
    period: 'Jun 2024 - Present',
    type: 'Freelance',
    workplace: 'Remote',
    iconColor: '#10b981',
    iconBg: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    role: 'Frontend & UI Specialist',
    company: 'Freelance Projects',
    legalCompany: 'Independent',
    location: 'Jakarta, Indonesia',
    period: 'Jan 2023 - May 2024',
    type: 'Contract',
    workplace: 'Remote',
    iconColor: '#06b6d4',
    iconBg: 'bg-cyan-500/20 text-cyan-400',
  },
  {
    role: 'IT Support & Hardware Specialist',
    company: 'Tech Solutions',
    legalCompany: 'Freelance',
    location: 'Jakarta, Indonesia',
    period: 'Jun 2022 - Dec 2022',
    type: 'Internship',
    workplace: 'On-site',
    iconColor: '#ec4899',
    iconBg: 'bg-pink-500/20 text-pink-400',
  },
];

export default function AboutPage() {
  const [showAllCareer, setShowAllCareer] = useState(false);

  const displayedCareer = showAllCareer ? CAREER_DATA : CAREER_DATA.slice(0, 3);

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight mb-2">
            About Me
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
            Kenalin cerita saya, apa yang drive saya, dan cool stuff yang saya suka bikin.
          </p>
        </div>

        {/* 1. Main Top Card: Nice to meet you! */}
        <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-6 md:p-10 lg:p-12 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] mb-8 md:mb-10 overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-5">
            <h2 className="text-neutral-900 dark:text-white text-2xl md:text-3xl font-brak font-bold">
              Nice to meet you!
            </h2>

            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
              Hey! Thanks for stopping by. I&apos;m Rizki, web developer & software enthusiast based di Jakarta, Indonesia dengan pengalaman membangun digital products yang modern, responsif, dan fungsional. Saya suka bikin websites dan web apps yang orang actually enjoy pakai.
            </p>

            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
              Yang bikin saya excited? Building things yang look beautiful dan work smoothly. Saya suka banget create digital experiences yang simple to use dan bikin hidup orang lebih gampang. Whether it&apos;s a high-performance web app, interactive portfolio, e-commerce platform, atau full-stack solution, I&apos;m always learning new ways to make them better.
            </p>

            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
              Throughout my journey, saya udah terbiasa merancang arsitektur web dari nol, mengoptimalkan database relasional, hingga mengintegrasikan API modern dengan UI/UX yang memikat. I believe good communication, clean code, dan attention to detail are the keys to creating something truly great.
            </p>

            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
              I&apos;m good at solving problems, adapting to new challenges, dan selalu give my best effort. Whether I&apos;m leading an independent project atau collaborating inside an agile team, I&apos;m all about getting things done dan bikin something yang bisa kita banggain.
            </p>

            <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Best regards,</p>
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
                Where I Learned
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm mb-6">
                The foundation of my journey
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

          {/* Right Card: Career Timeline */}
          <div className="lg:col-span-7 relative rounded-3xl border-2 border-indigo-300/80 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-[#101426] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)]">
            <div className="flex items-center justify-between gap-4 mb-1">
              <h3 className="text-neutral-900 dark:text-white text-xl md:text-2xl font-brak font-bold">
                Career Timeline
              </h3>
              <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                3+ years
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm mb-6">
              @2022 - Present
            </p>

            {/* Timeline List */}
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-300/50 dark:before:bg-indigo-500/20">
              {displayedCareer.map((career, idx) => (
                <div key={idx} className="relative group">
                  {/* Bullet */}
                  <span className="absolute -left-6 top-4 h-3 w-3 rounded-full border-2 border-white dark:border-[#101426] bg-indigo-500" />

                  <div className="rounded-2xl border border-indigo-200 dark:border-white/10 bg-white/90 dark:bg-white/5 p-4 md:p-5 transition-all duration-200 hover:border-indigo-400/50">
                    <div className="flex items-start gap-3.5">
                      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', career.iconBg)}>
                        <MdOutlineWorkOutline className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <h4 className="text-sm md:text-base font-bold text-neutral-900 dark:text-white">
                            {career.role}
                          </h4>
                          <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                            {career.period}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mt-1">
                          {career.company} <span className="text-neutral-400 font-normal">• {career.legalCompany}</span>
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {career.location} • <span className="text-indigo-600 dark:text-indigo-400">{career.type}</span> • {career.workplace}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show All Toggle */}
            {CAREER_DATA.length > 3 && (
              <button
                onClick={() => setShowAllCareer((v) => !v)}
                className="mt-6 flex items-center justify-center gap-2 w-full rounded-2xl border border-neutral-300 dark:border-white/10 bg-white/80 dark:bg-white/5 py-2.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 transition-all hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
              >
                {showAllCareer ? (
                  <>
                    Show less <FiChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show all ({CAREER_DATA.length - 3} more) <FiChevronDown className="h-4 w-4" />
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
