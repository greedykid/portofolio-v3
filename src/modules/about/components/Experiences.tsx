'use client';

import SectionHeading from '@/common/components/elements/SectionHeading';
import Card from '@/common/components/elements/Card';
import { EXPERIENCES } from '@/common/constant/experience';
import { useLanguage } from '@/common/context/LanguageContext';

function formatDate(date: string | null, locale: string): string {
  if (!date) return locale === 'id' ? 'Sekarang' : 'Present';
  return new Date(date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'short' });
}

export default function Experiences() {
  const { t, locale } = useLanguage();

  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading title={t('exp_title')} description={t('exp_desc')} />
        <div className="space-y-6">
          {EXPERIENCES.map((exp) => (
            <Card key={exp.company} hover>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{exp.role}</h3>
                  <p className="mt-1 font-medium text-primary">{exp.company}</p>
                </div>
                <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {formatDate(exp.startDate, locale)} — {formatDate(exp.endDate, locale)}
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.responsibilities.map((resp) => (
                  <li key={resp} className="flex gap-3 text-neutral-700 dark:text-neutral-400 text-sm md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {resp}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
