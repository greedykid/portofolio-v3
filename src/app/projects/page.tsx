'use client';

import Container from '@/common/components/elements/Container';
import ProjectsGrid from '@/modules/projects/components/Projects';
import { useLanguage } from '@/common/context/LanguageContext';

export default function ProjectsPage() {
  const { locale } = useLanguage();

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight mb-2">
            Portfolio
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-2xl">
            {locale === 'id'
              ? 'Koleksi proyek, aplikasi web, dan eksplorasi teknologi yang pernah saya rancang dan kembangkan.'
              : "A showcase of web applications, client solutions, and technical experiments I've designed and built."}
          </p>
        </div>

        <ProjectsGrid />
      </Container>
    </div>
  );
}
