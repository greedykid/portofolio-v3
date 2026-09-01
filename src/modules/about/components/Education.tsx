'use client';

import { useState } from 'react';
import SectionHeading from '@/common/components/elements/SectionHeading';
import Card from '@/common/components/elements/Card';
import { EDUCATION, CERTIFICATES, type Certificate } from '@/common/constant/experience';
import { useLanguage } from '@/common/context/LanguageContext';
import { FiEye, FiAward } from 'react-icons/fi';
import CertificateModal from '@/common/components/elements/CertificateModal';

export default function Education() {
  const { t, locale } = useLanguage();
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading title={t('edu_title')} description={t('edu_desc')} />
        <div className="grid gap-6 lg:grid-cols-2">
          <Card hover>
            <h3 className="mb-2 text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white">{EDUCATION[0].degree}</h3>
            <p className="font-medium text-primary text-sm sm:text-base">{EDUCATION[0].institution}</p>
            <p className="mt-1 text-xs sm:text-sm font-medium text-neutral-500 dark:text-neutral-400">{EDUCATION[0].score}</p>
            <ul className="mt-4 space-y-2">
              {EDUCATION[0].bullets.map((b) => (
                <li key={b} className="flex gap-3 text-neutral-700 dark:text-neutral-400 text-xs sm:text-sm md:text-base leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </Card>

          <Card hover>
            <div className="flex items-center justify-between gap-2 mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <FiAward className="h-5 w-5 text-teal-500" />
                <span>{t('edu_certificates_title')}</span>
              </h3>
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                {CERTIFICATES.length} {locale === 'id' ? 'Sertifikat' : 'Credentials'}
              </span>
            </div>

            <div className="space-y-3">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.title}
                  className="flex flex-col gap-2 p-3 rounded-2xl bg-neutral-50/80 dark:bg-white/5 border border-neutral-200/80 dark:border-white/5 hover:border-teal-400/50 dark:hover:border-teal-500/30 transition-all shadow-sm"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm leading-snug break-words">
                      {cert.title}
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                      {cert.issuer} • <span className="font-mono">{cert.credentialId}</span>
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
