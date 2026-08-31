'use client';

import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { PROJECTS, type Project } from '@/common/constant/projects';

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#10141f] p-5 md:p-6 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,0.35)] hover:border-indigo-400/60">
      {/* Top Media / Thumbnail Preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-200 dark:border-white/10 mb-5">
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-4 select-none"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${project.accentColor || '#6366f1'}33 0%, #090d16 100%)`,
          }}
        >
          {/* Mockup browser top bar */}
          <div className="w-full max-w-[240px] rounded-t-lg bg-black/60 border border-white/15 p-2 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/80" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
            <span className="h-2 w-2 rounded-full bg-green-400/80" />
            <span className="ms-2 text-[9px] text-neutral-400 truncate max-w-[120px] font-mono">
              {project.demoUrl ? new URL(project.demoUrl).hostname : project.id}
            </span>
          </div>
          {/* Mockup content preview */}
          <div className="w-full max-w-[240px] h-24 rounded-b-lg bg-[#141a29]/90 border-x border-b border-white/15 p-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="h-2.5 w-3/4 rounded bg-white/20" />
              <div className="h-2 w-1/2 rounded bg-white/10" />
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: project.accentColor || '#6366f1' }}
              />
              <span className="text-[10px] font-bold text-neutral-300 truncate">
                {project.title.split(' ')[0]} Live Preview
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body: Title, Description, Stacks */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white transition-colors group-hover:text-primary mb-2 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        <div>
          {/* Stacks tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stacks.map((stack) => (
              <span
                key={stack}
                className="rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300"
              >
                {stack}
              </span>
            ))}
          </div>

          {/* View Project Button */}
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center justify-center gap-1.5 w-full rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 py-2.5 text-xs md:text-sm font-bold shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>View Project</span>
            <FiArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ limit }: { limit?: number }) {
  const displayedProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
