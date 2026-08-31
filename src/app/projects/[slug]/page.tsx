import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/common/components/elements/Container';
import Breakline from '@/common/components/elements/Breakline';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { getAllProjects, getProjectBySlug } from '@/common/libs/projects';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <Container>
      <article className="max-w-4xl">
        <Link href="/projects" className="mb-6 inline-block text-sm text-neutral-400 hover:text-primary">
          ← Back to Projects
        </Link>

        <div className="rounded-3xl border-2 border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900 md:p-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </div>

          <h1 className="mt-8 mb-4 text-3xl font-brak text-neutral-900 dark:text-white md:text-4xl">
            {project.title}
          </h1>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.stacks.map((stack) => (
              <span
                key={stack}
                className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {stack}
              </span>
            ))}
          </div>

          <div className="mb-8 flex gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-primary bg-primary px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.4)]"
              >
                <FiExternalLink /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-600 transition-all duration-300 hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-300"
              >
                <FiGithub /> Source Code
              </a>
            )}
          </div>

          <Breakline className="my-8" />

          <div className="space-y-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            {project.detail.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>
    </Container>
  );
}
