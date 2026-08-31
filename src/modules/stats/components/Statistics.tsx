'use client';

import SectionHeading from '@/common/components/elements/SectionHeading';
import Card from '@/common/components/elements/Card';
import { STATS } from '@/common/constant/services';
import { useLanguage } from '@/common/context/LanguageContext';

export default function Statistics() {
  const { t } = useLanguage();

  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading title={t('stats_title')} description={t('stats_desc')} />
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ number, label }) => (
            <Card key={label} hover className="text-center">
              <div className="text-3xl font-brak font-bold text-neutral-900 dark:text-white">{number}</div>
              <div className="mt-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">{label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
