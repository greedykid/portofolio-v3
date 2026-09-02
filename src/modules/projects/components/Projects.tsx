'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiArrowUpRight, FiExternalLink, FiGithub, FiCheckCircle } from 'react-icons/fi';
import { PROJECTS, type Project } from '@/common/constant/projects';
import { useLanguage } from '@/common/context/LanguageContext';
import { cn } from '@/lib/utils';

function ProjectCard({ project }: { project: Project }) {
  const { locale } = useLanguage();
  const cs = project.caseStudy;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#10141f] p-5 sm:p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,0.35)] hover:border-indigo-400/60">
      <div>
        {/* Project Thumbnail Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900 mb-5 sm:mb-6 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Category & Status Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-md bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/20 px-2.5 py-0.5 text-[11px] font-bold text-primary dark:text-indigo-400">
            {cs.category}
          </span>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
            {cs.timeline.split('(')[0]}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-brak font-bold text-neutral-900 dark:text-white transition-colors group-hover:text-primary mb-2 leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Key Impact Highlights Pills */}
        {project.impactHighlights && project.impactHighlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.impactHighlights.map((highlight) => (
              <span
                key={highlight}
                className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400"
              >
                <FiCheckCircle className="h-3 w-3 shrink-0" />
                <span>{highlight}</span>
              </span>
            ))}
          </div>
        )}

        {/* Stacks tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stacks.map((stack) => (
            <span
              key={stack}
              className="rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300"
            >
              {stack}
            </span>
          ))}
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="border-t border-neutral-200 dark:border-white/10 pt-4 sm:pt-5 flex items-center gap-2.5">
        <Link
          href={`/projects/${project.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 py-2.5 text-xs sm:text-sm font-bold shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span>{locale === 'id' ? 'Lihat Studi Kasus' : 'View Case Study'}</span>
          <FiArrowUpRight className="h-4 w-4" />
        </Link>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            title="Buka Website Langsung"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-2 border-neutral-300/80 dark:border-white/15 bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <FiExternalLink className="h-4 w-4" />
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            title="Lihat Repositori GitHub"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-2 border-neutral-300/80 dark:border-white/15 bg-neutral-100 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <FiGithub className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects({ limit }: { limit?: number }) {
  const { locale } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'web' | 'it-support'>('all');

  const displayedProjects = limit ? PROJECTS.slice(0, limit) : PROJECTS;

  const filtered = activeFilter === 'all'
    ? displayedProjects
    : activeFilter === 'web'
    ? displayedProjects.filter((p) => p.categoryType === 'web' || p.categoryType === 'ecommerce')
    : displayedProjects.filter((p) => p.categoryType === 'it-support');

  const webCount = displayedProjects.filter((p) => p.categoryType === 'web' || p.categoryType === 'ecommerce').length;
  const itCount = displayedProjects.filter((p) => p.categoryType === 'it-support').length;

  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {/* Category Filters */}
        {!limit && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {[
              {
                id: 'all',
                label: locale === 'id' ? `Semua Proyek (${displayedProjects.length})` : `All Projects (${displayedProjects.length})`,
              },
              {
                id: 'web',
                label: locale === 'id' ? `Web Application (${webCount})` : `Web Applications (${webCount})`,
              },
              ...(itCount > 0
                ? [
                    {
                      id: 'it-support',
                      label: locale === 'id' ? `IT Support & Networking (${itCount})` : `IT Support & Networks (${itCount})`,
                    },
                  ]
                : []),
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={cn(
                  'rounded-2xl px-4 py-2 text-xs md:text-sm font-bold transition-all shadow-sm cursor-pointer',
                  activeFilter === tab.id
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 scale-105 shadow-md'
                    : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300/80 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* 2-Column Responsive Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
