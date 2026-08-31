'use client';

import SectionHeading from '@/common/components/elements/SectionHeading';
import Card from '@/common/components/elements/Card';
import { EDUCATION, CERTIFICATES } from '@/common/constant/experience';
import { useLanguage } from '@/common/context/LanguageContext';

export default function Education() {
  const { t } = useLanguage();

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
                <div key={cert.credentialId} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-neutral-800 dark:text-neutral-200">{cert.title}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{cert.issuer}</p>
                  </div>
                  <span className="shrink-0 rounded-md border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
