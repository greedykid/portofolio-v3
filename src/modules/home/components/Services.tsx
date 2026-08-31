'use client';

import SectionHeading from '@/common/components/elements/SectionHeading';
import Card from '@/common/components/elements/Card';
import { SERVICES } from '@/common/constant/services';
import { useLanguage } from '@/common/context/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading
          title={t('services_title')}
          description={t('services_desc')}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {SERVICES.map(({ title, description, icon: Icon }) => (
            <Card key={title} hover>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">{title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed">{description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
