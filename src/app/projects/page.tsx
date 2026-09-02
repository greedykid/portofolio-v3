'use client';

import Container from '@/common/components/elements/Container';
import ProjectsGrid from '@/modules/projects/components/Projects';
import { useLanguage } from '@/common/context/LanguageContext';
import { PROJECTS } from '@/common/constant/projects';

export default function ProjectsPage() {
  const { locale } = useLanguage();

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight">
              {locale === 'id' ? 'Portofolio & Studi Kasus' : 'Portfolio & Case Studies'}
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-primary dark:text-indigo-400">
              {PROJECTS.length} {locale === 'id' ? 'Karya Resmi' : 'Works'}
            </span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-2xl">
            {locale === 'id'
              ? 'Koleksi studi kasus aplikasi web berbasis Laravel dan implementasi infrastruktur IT Support & Jaringan yang saya kembangkan.'
              : 'Curated case studies of web applications and IT infrastructure & support implementations.'}
          </p>
        </div>

        <ProjectsGrid />
      </Container>
    </div>
  );
}
