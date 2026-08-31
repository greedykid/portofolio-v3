import Container from '@/common/components/elements/Container';
import ProjectsGrid from '@/modules/projects/components/Projects';

export const metadata = {
  title: 'Portfolio',
  description: "A collection of stuff I've built, collaborated on, and break. Web apps, tools, and experiments.",
};

export default function ProjectsPage() {
  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight mb-2">
            Portfolio
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-2xl">
            A collection of stuff I&apos;ve built, collaborated on, and break. Web apps, tools, and experiments.
          </p>
        </div>

        <ProjectsGrid />
      </Container>
    </div>
  );
}
