'use client';

import { useState } from 'react';
import SectionHeading from '@/common/components/elements/SectionHeading';
import Card from '@/common/components/elements/Card';
import { EDUCATION, CERTIFICATES, type Certificate } from '@/common/constant/experience';
import { useLanguage } from '@/common/context/LanguageContext';
import { FiEye, FiAward, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import CertificateModal from '@/common/components/elements/CertificateModal';

export default function Education() {
  const { t, locale } = useLanguage();
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [showAllCerts, setShowAllCerts] = useState(false);

  const displayedCerts = showAllCerts ? CERTIFICATES : CERTIFICATES.slice(0, 4);

  const ACADEMIC_TAGS = [
    'Pemrograman Web',
    'Basis Data Relasional',
    'Arsitektur MVC (Laravel)',
    'Rekayasa Perangkat Lunak',
    'Jaringan Komputer',
    'Keamanan Sistem Informasi',
  ];

  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading title={t('edu_title')} description={t('edu_desc')} />
        <div className="grid gap-6 lg:grid-cols-2 items-start">
          {/* Left Card: Pendidikan Formal Sarjana (S1) */}
          <Card hover className="p-5 sm:p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
                    <HiOutlineAcademicCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-brak font-bold text-neutral-900 dark:text-white leading-tight">
                      {EDUCATION[0].degree}
                    </h3>
                    <p className="font-semibold text-primary dark:text-indigo-400 text-sm mt-0.5">
                      {EDUCATION[0].institution}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {EDUCATION[0].score}
                </span>
              </div>

              <div className="space-y-3 text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed mb-6">
                {EDUCATION[0].bullets.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">{b}</p>
                  </div>
                ))}
              </div>

              {/* Core Competencies / Academic Focus Tags */}
              <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2.5">
                  {locale === 'id' ? 'Fokus Keilmuan & Kompetensi' : 'Core Academic Competencies'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ACADEMIC_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-teal-500/20 bg-teal-500/10 px-2.5 py-1 text-[11px] font-medium text-teal-700 dark:text-teal-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Right Card: Sertifikasi & Lisensi */}
          <Card hover className="p-5 sm:p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-600 dark:text-teal-400">
                    <FiAward className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-brak font-bold text-neutral-900 dark:text-white leading-tight">
                      {t('edu_certificates_title')}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {CERTIFICATES.length} {locale === 'id' ? 'Sertifikat Terverifikasi' : 'Verified Credentials'}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-full bg-teal-500/15 border border-teal-500/30 px-3 py-1 text-xs font-bold text-teal-600 dark:text-teal-400">
                  Gunadarma
                </span>
              </div>

              <div className="space-y-2.5">
                {displayedCerts.map((cert) => (
                  <div
                    key={cert.title}
                    className="flex flex-col gap-2 p-3 rounded-2xl bg-neutral-50/90 dark:bg-white/5 border border-neutral-200/80 dark:border-white/5 hover:border-teal-400/50 dark:hover:border-teal-500/30 transition-all shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm leading-snug break-words">
                        {cert.title}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                        {cert.issuer} • <span className="font-mono font-medium">{cert.credentialId}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-200/60 dark:border-white/5">
                      <span className="rounded-md border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-2 py-0.5 text-[11px] font-mono font-medium text-neutral-600 dark:text-neutral-400">
                        {cert.date}
                      </span>
                      {cert.pdfUrl ? (
                        <button
                          onClick={() => setActiveCert(cert)}
                          title={locale === 'id' ? 'Lihat Kredensial PDF' : 'View PDF Credential'}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-500/20 dark:text-teal-300 dark:hover:bg-teal-500/30 border border-teal-500/30 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                        >
                          <FiEye className="h-3.5 w-3.5" />
                          <span>{locale === 'id' ? 'Lihat PDF' : 'View PDF'}</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-neutral-400 italic">
                          {locale === 'id' ? 'Terverifikasi' : 'Verified'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {CERTIFICATES.length > 4 && (
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
          </Card>
        </div>
      </div>

      <CertificateModal
        certificate={activeCert}
        onClose={() => setActiveCert(null)}
      />
    </section>
  );
}
