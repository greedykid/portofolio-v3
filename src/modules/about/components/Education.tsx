'use client';

import { useState } from 'react';
import SectionHeading from '@/common/components/elements/SectionHeading';
import Card from '@/common/components/elements/Card';
import { EDUCATION, CERTIFICATES, type Certificate } from '@/common/constant/experience';
import { useLanguage } from '@/common/context/LanguageContext';
import { FiEye } from 'react-icons/fi';
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
            <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">{EDUCATION[0].degree}</h3>
            <p className="font-medium text-primary">{EDUCATION[0].institution}</p>
            <p className="mt-1 text-sm font-medium text-neutral-500 dark:text-neutral-400">{EDUCATION[0].score}</p>
            <ul className="mt-4 space-y-2">
              {EDUCATION[0].bullets.map((b) => (
                <li key={b} className="flex gap-3 text-neutral-700 dark:text-neutral-400 text-sm md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </Card>

          <Card hover>
            <h3 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">
              {t('edu_certificates_title')}
            </h3>
            <div className="space-y-3">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.title}
                  className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-neutral-800 dark:text-neutral-200 text-sm leading-snug">
                      {cert.title}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      {cert.issuer} • <span className="font-mono">{cert.credentialId}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="shrink-0 rounded-md border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                      {cert.date}
                    </span>
                    {cert.pdfUrl && (
                      <button
                        onClick={() => setActiveCert(cert)}
                        title={locale === 'id' ? 'Lihat Kredensial PDF' : 'View PDF Credential'}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-500/20 dark:text-teal-300 dark:hover:bg-teal-500/30 text-xs font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                      >
                        <FiEye className="h-3.5 w-3.5" />
                        <span>PDF</span>
                      </button>
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
