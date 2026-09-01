'use client';

import { useState } from 'react';
import Container from '@/common/components/elements/Container';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { FaStore, FaGraduationCap, FaServer, FaCode } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/common/context/LanguageContext';
import { CERTIFICATES } from '@/common/constant/experience';

interface EducationItem {
  institution: string;
  degree: string;
  major: string;
  period: string;
  score: string;
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
    degree: 'Sarjana (S1) Sistem Informasi',
    major: 'Mata Kuliah Utama: Pemrograman Web, Basis Data Relasional, Rekayasa Perangkat Lunak, Jaringan Komputer, Keamanan Sistem Informasi',
    period: '2022 - 2026 (Lulus)',
    score: 'IPK: 3.58 / 4.00',
    iconBg: 'bg-amber-500/20 text-amber-400',
  },
];

const CAREER_DATA: CareerItem[] = [
  {
    role: 'Pengembang Web & Peneliti',
    company: 'Platform E-Commerce "GEGARES"',
    legalCompany: 'Universitas Gunadarma (Penulisan Ilmiah)',
    location: 'Jakarta, Indonesia',
    period: 'Sep 2025 - Feb 2026',
    type: 'Academic Project',
    workplace: 'On-site',
    icon: FaGraduationCap,
    iconBg: 'bg-[#181d2a] border-indigo-500/30 text-indigo-400',
    iconColor: '#6366f1',
  },
  {
    role: 'Pengembang Web',
    company: 'Website Katalog Digital "Berkah Mulia"',
    legalCompany: 'bmberkahmulia.com',
    location: 'Jakarta, Indonesia',
    period: 'Jun 2026 - Sekarang',
    type: 'Freelance',
    workplace: 'Remote',
    icon: FaStore,
    iconBg: 'bg-[#181d2a] border-emerald-500/30 text-emerald-400',
    iconColor: '#10b981',
  },
  {
    role: 'IT Support & Jaringan Komputer',
    company: 'Troubleshooting & Konfigurasi Jaringan',
    legalCompany: 'Universitas Gunadarma & Layanan Mandiri',
    location: 'Jakarta, Indonesia',
    period: '2023 - 2025',
    type: 'Practical & Hands-on',
    workplace: 'On-site / Hybrid',
    icon: FaServer,
    iconBg: 'bg-[#181d2a] border-cyan-500/30 text-cyan-400',
    iconColor: '#06b6d4',
  },
];

export default function AboutPage() {
  const { locale, t } = useLanguage();
  const [showAllCareer, setShowAllCareer] = useState(false);

  const displayedCareer = showAllCareer ? CAREER_DATA : CAREER_DATA.slice(0, 3);

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight mb-2">
            {t('about_badge')}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
            {t('about_desc')}
          </p>
        </div>

        {/* 1. Main Top Card: Nice to meet you! / Profil Profesional */}
        <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-6 md:p-10 lg:p-12 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] mb-8 md:mb-10 overflow-hidden">
          <div className="relative z-10 w-full space-y-5">
            <h2 className="text-neutral-900 dark:text-white text-2xl md:text-3xl font-brak font-bold">
              {t('about_title')}
            </h2>

            <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
              <p>{t('about_p1')}</p>
              <p>{t('about_p2')}</p>
              <p>{t('about_p3')}</p>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
                  {locale === 'id' ? 'Kontak & Email:' : 'Direct Contact:'}
                </p>
                <p className="font-mono text-sm sm:text-base font-bold text-primary dark:text-indigo-400 mt-0.5">
                  rizkiarbi65@gmail.com
                </p>
              </div>

              <div className="text-right">
                <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm">
                  {locale === 'id' ? 'Lokasi Domisili:' : 'Location:'}
                </p>
                <p className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white mt-0.5">
                  Jakarta Barat, DKI Jakarta
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Bottom Grid: Where I Learned & Career Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Card: Pendidikan & Sertifikasi */}
          <div className="lg:col-span-5 relative rounded-3xl border-2 border-teal-300/80 dark:border-teal-500/20 bg-teal-50/60 dark:bg-[#0d1e22] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(20,184,166,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(20,184,166,0.25)] flex flex-col justify-between">
            <div>
              <h3 className="text-neutral-900 dark:text-white text-xl md:text-2xl font-brak font-bold mb-1">
                {t('edu_title')}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm mb-6">
                {t('edu_desc')}
              </p>

              {/* Education Card */}
              <div className="space-y-4 mb-6">
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
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                            {edu.degree}
                          </p>
                          <span className="text-neutral-400 dark:text-neutral-500">•</span>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            {edu.score}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                          {edu.major}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Certificates List */}
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-3">
                  {t('edu_certificates_title')}
                </h4>
                <div className="space-y-2">
                  {CERTIFICATES.slice(0, 4).map((cert) => (
                    <div
                      key={cert.title}
                      className="flex items-center justify-between gap-2 rounded-xl bg-white/80 dark:bg-white/5 border border-teal-200/60 dark:border-white/5 p-2.5 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                          {cert.title}
                        </p>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                          {cert.issuer} • {cert.credentialId}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-md bg-teal-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-teal-600 dark:text-teal-400">
                        {cert.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Pengalaman Proyek & Karir */}
          <div className="lg:col-span-7 relative rounded-3xl border-2 border-indigo-300/80 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-[#0f1322] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)]">
            <div className="flex items-center justify-between gap-4 mb-1">
              <h3 className="text-neutral-900 dark:text-white text-xl md:text-2xl font-brak font-bold">
                {t('exp_timeline_title')}
              </h3>
              <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {t('exp_years_badge')}
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm mb-6">
              {t('exp_period_label')}
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
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <h4 className="text-sm md:text-base font-bold text-neutral-900 dark:text-white leading-tight">
                          {career.role}
                        </h4>
                        <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 shrink-0">
                          {career.period}
                        </span>
                      </div>

                      <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                        {career.company}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                        <span>{career.legalCompany}</span>
                        <span>•</span>
                        <span>{career.type}</span>
                        <span>•</span>
                        <span>{career.workplace}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
