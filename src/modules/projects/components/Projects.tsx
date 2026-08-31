import Link from 'next/link';
import SectionHeading from '@/common/components/elements/SectionHeading';
import { PROJECTS, type Project } from '@/common/constant/projects';

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block overflow-hidden rounded-3xl border-2 border-neutral-200 bg-white transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.stacks.slice(0, 4).map((stack) => (
            <span
              key={stack}
              className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {stack}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function Projects() {
  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading
          title="Selected Projects"
          description="Beberapa karya yang telah saya bangun dan deploy."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
