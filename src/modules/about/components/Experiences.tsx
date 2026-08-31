'use client';

import SectionHeading from '@/common/components/elements/SectionHeading';
import { EXPERIENCES } from '@/common/constant/experience';
import { useLanguage } from '@/common/context/LanguageContext';
import { FaGraduationCap, FaStore } from 'react-icons/fa';

function formatDate(date: string | null, locale: string, presentText: string): string {
  if (!date) return presentText;
  return new Date(date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'short' });
}

export default function Experiences() {
  const { t, locale } = useLanguage();

  const ICONS = [FaGraduationCap, FaStore];

  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading title={t('exp_title')} description={t('exp_desc')} />

        <div className="relative rounded-3xl border-2 border-indigo-300/80 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-[#0f1322] p-6 md:p-8 lg:p-10 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)]">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-neutral-900 dark:text-white text-xl md:text-2xl font-brak font-bold">
                {t('exp_timeline_title')}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-xs md:text-sm mt-0.5">
                {t('exp_period_label')}
              </p>
            </div>
            <span className="rounded-full bg-indigo-500/15 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {t('exp_years_badge')}
            </span>
          </div>

          {/* Connected timeline list */}
          <div className="relative space-y-4 before:absolute before:left-[22px] before:top-6 before:bottom-6 before:w-[2px] before:bg-indigo-500/30 dark:before:bg-indigo-500/25">
            {EXPERIENCES.map((exp, idx) => {
              const Icon = ICONS[idx % ICONS.length];
              return (
                <div key={exp.company} className="relative flex items-start gap-4 group">
                  {/* Centered Node Avatar Badge */}
                  <div className="relative z-10 flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-500/30 bg-[#181d2a] text-indigo-400 shadow-sm transition-transform duration-200 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Timeline Content Card */}
                  <div className="flex-1 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white/95 dark:bg-[#161b2a] p-4 md:p-5 shadow-sm transition-all duration-200 hover:border-indigo-400/50 hover:shadow-md">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                      <h4 className="text-sm md:text-base font-bold text-neutral-900 dark:text-white leading-tight">
                        {exp.role}
                      </h4>
                      <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 shrink-0">
                        {formatDate(exp.startDate, locale, t('exp_present'))} — {formatDate(exp.endDate, locale, t('exp_present'))}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400 mt-1">
                      {exp.company} <span className="text-neutral-400 dark:text-neutral-500">•</span> {exp.companyLegalName} <span className="text-neutral-400 dark:text-neutral-500">•</span> {exp.location}
                    </p>

                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {exp.type} <span className="text-neutral-400 dark:text-neutral-500">•</span> {exp.locationType}
                    </p>

                    <ul className="mt-3 space-y-1.5 border-t border-neutral-100 dark:border-white/5 pt-2.5">
                      {exp.responsibilities.map((resp) => (
                        <li key={resp} className="flex gap-2 text-xs md:text-sm text-neutral-600 dark:text-neutral-400">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
