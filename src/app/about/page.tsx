'use client';

import { useState } from 'react';
import Container from '@/common/components/elements/Container';
import { FiChevronDown, FiChevronUp, FiEye, FiAward, FiFileText } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { FaStore, FaGraduationCap, FaServer, FaCode } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/common/context/LanguageContext';
import { CERTIFICATES, type Certificate } from '@/common/constant/experience';
import CertificateModal from '@/common/components/elements/CertificateModal';

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
    type: 'Practical & Project-based',
    workplace: 'On-site / Hybrid',
    icon: FaServer,
    iconBg: 'bg-[#181d2a] border-cyan-500/30 text-cyan-400',
    iconColor: '#06b6d4',
  },
];

export default function AboutPage() {
  const { locale, t } = useLanguage();
  const [showAllCareer, setShowAllCareer] = useState(false);
  const [showAllCerts, setShowAllCerts] = useState(false);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  const displayedCareer = showAllCareer ? CAREER_DATA : CAREER_DATA.slice(0, 3);
  const displayedCerts = showAllCerts ? CERTIFICATES : CERTIFICATES.slice(0, 5);

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
                  Jakarta, Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Side-by-Side Cards: Edukasi & Sertifikasi (Kiri) vs Karir & Pengalaman (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Card: Pendidikan & Sertifikasi */}
          <div className="lg:col-span-5 relative rounded-3xl border-2 border-teal-300/80 dark:border-teal-500/20 bg-teal-50/50 dark:bg-[#0c1619] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(20,184,166,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(20,184,166,0.3)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-1">
                <h3 className="text-neutral-900 dark:text-white text-xl md:text-2xl font-brak font-bold">
                  {t('edu_title')}
                </h3>
                <span className="rounded-full bg-teal-500/15 border border-teal-500/30 px-3 py-1 text-xs font-bold text-teal-600 dark:text-teal-400">
                  {locale === 'id' ? 'Akademik' : 'Academic'}
                </span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm mb-6">
                {t('edu_desc')}
              </p>

              {/* Education List */}
              <div className="space-y-4 mb-6">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-teal-200/80 dark:border-white/10 bg-white/95 dark:bg-[#121f24] p-4 md:p-5 shadow-sm"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 mt-0.5">
                        <HiOutlineAcademicCap className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <h4 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                            {edu.institution}
                          </h4>
                          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
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
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                    <FiAward className="h-4 w-4 text-teal-500" />
                    <span>{t('edu_certificates_title')}</span>
                  </h4>
                  <span className="text-[11px] font-mono font-semibold text-neutral-500 dark:text-neutral-400">
                    {CERTIFICATES.length} {locale === 'id' ? 'Sertifikat' : 'Credentials'}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {displayedCerts.map((cert) => (
                    <div
                      key={cert.title}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-2xl bg-white/90 dark:bg-white/5 border border-teal-200/60 dark:border-white/5 hover:border-teal-400/50 dark:hover:border-teal-500/30 p-3 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm leading-snug">
                          {cert.title}
                        </p>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                          {cert.issuer} • <span className="font-mono">{cert.credentialId}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        <span className="rounded-md bg-teal-500/10 px-2 py-0.5 font-mono text-[11px] font-bold text-teal-600 dark:text-teal-400">
                          {cert.date}
                        </span>

                        {cert.pdfUrl && (
                          <button
                            onClick={() => setActiveCert(cert)}
                            title={locale === 'id' ? 'Lihat Kredensial PDF' : 'View PDF Credential'}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-500/20 dark:text-teal-300 dark:hover:bg-teal-500/30 border border-teal-500/30 text-[11px] font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                          >
                            <FiEye className="h-3.5 w-3.5" />
                            <span>{locale === 'id' ? 'Lihat PDF' : 'View PDF'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {CERTIFICATES.length > 5 && (
                  <button
                    onClick={() => setShowAllCerts(!showAllCerts)}
                    className="w-full mt-3 py-2 flex items-center justify-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer transition-colors"
                  >
                    <span>
                      {showAllCerts
                        ? locale === 'id'
                          ? 'Tampilkan Lebih Sedikit'
                          : 'Show Less'
                        : locale === 'id'
                        ? `Lihat Semua (${CERTIFICATES.length} Sertifikat)`
                        : `View All (${CERTIFICATES.length} Certificates)`}
                    </span>
                    {showAllCerts ? <FiChevronUp className="h-3.5 w-3.5" /> : <FiChevronDown className="h-3.5 w-3.5" />}
                  </button>
                )}
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

            {CAREER_DATA.length > 3 && (
              <button
                onClick={() => setShowAllCareer(!showAllCareer)}
                className="mt-6 flex items-center gap-2 text-xs font-bold text-primary dark:text-indigo-400 hover:underline cursor-pointer"
              >
                <span>
                  {showAllCareer
                    ? locale === 'id'
                      ? 'Tampilkan Lebih Sedikit'
                      : 'Show Less'
                    : locale === 'id'
                    ? 'Lihat Semua Pengalaman'
                    : 'View All Experiences'}
                </span>
                {showAllCareer ? (
                  <FiChevronUp className="h-4 w-4" />
                ) : (
                  <FiChevronDown className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </Container>

      {/* Interactive Certificate PDF Modal */}
      <CertificateModal
        certificate={activeCert}
        onClose={() => setActiveCert(null)}
      />
    </div>
  );
}
