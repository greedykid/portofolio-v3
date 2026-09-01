'use client';

import Link from 'next/link';
import Container from '@/common/components/elements/Container';
import type { Project } from '@/common/constant/projects';
import { useLanguage } from '@/common/context/LanguageContext';
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiGithub,
  FiCheckCircle,
  FiLayers,
  FiCalendar,
  FiUser,
  FiTag,
  FiBox,
} from 'react-icons/fi';

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const { locale } = useLanguage();
  const cs = project.caseStudy;

  return (
    <div className="w-full py-6 md:py-10">
      <Container className="max-w-[1280px]">
        {/* Top Back Navigation */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-neutral-300/80 dark:border-white/15 bg-white dark:bg-[#121622] px-4 py-2 text-xs md:text-sm font-bold text-neutral-700 dark:text-neutral-200 shadow-sm transition-all hover:bg-neutral-100 dark:hover:bg-white/10 hover:-translate-x-1 cursor-pointer"
          >
            <FiArrowLeft className="h-4 w-4" />
            <span>{locale === 'id' ? 'Kembali ke Portofolio' : 'Back to Projects'}</span>
          </Link>
        </div>

        {/* Project Page Title Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-neutral-900 dark:text-white text-3xl sm:text-4xl md:text-5xl font-brak font-bold tracking-tight mb-2">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base md:text-lg max-w-3xl">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* 2-Column Split Layout matching Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Sticky Project Metadata Card (approx 33% width on desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#10141f] p-6 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] space-y-6">
              {/* 1. About section */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                  ABOUT
                </h4>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* 2. Tech Stack Pills */}
              <div className="border-t border-neutral-200 dark:border-white/10 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3 flex items-center gap-1.5">
                  <FiLayers className="h-3.5 w-3.5" />
                  <span>TECH STACK</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.stacks.map((stack) => (
                    <span
                      key={stack}
                      className="rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-2.5 py-1 text-xs font-semibold text-neutral-800 dark:text-neutral-200"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Role & Category */}
              <div className="border-t border-neutral-200 dark:border-white/10 pt-5 space-y-3">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1 flex items-center gap-1.5">
                    <FiUser className="h-3.5 w-3.5" />
                    <span>ROLE</span>
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                    {cs.role}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1 flex items-center gap-1.5">
                    <FiTag className="h-3.5 w-3.5" />
                    <span>CATEGORY</span>
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                    {cs.category}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1 flex items-center gap-1.5">
                    <FiCalendar className="h-3.5 w-3.5" />
                    <span>TIMELINE</span>
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                    {cs.timeline}
                  </p>
                </div>
              </div>

              {/* 4. Deliverables */}
              {cs.deliverables && cs.deliverables.length > 0 && (
                <div className="border-t border-neutral-200 dark:border-white/10 pt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2.5 flex items-center gap-1.5">
                    <FiBox className="h-3.5 w-3.5" />
                    <span>DELIVERABLES</span>
                  </h4>
                  <ul className="space-y-1.5">
                    {cs.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400 leading-tight">
                        <FiCheckCircle className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 5. CTA Action Buttons */}
              <div className="border-t border-neutral-200 dark:border-white/10 pt-5 space-y-2.5">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 py-3 text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>{locale === 'id' ? 'Buka Website Live' : 'Visit Live Demo'}</span>
                    <FiArrowUpRight className="h-4 w-4" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full rounded-2xl border-2 border-neutral-300/80 dark:border-white/15 bg-neutral-50 dark:bg-white/5 text-neutral-800 dark:text-neutral-200 py-2.5 text-xs sm:text-sm font-bold transition-all hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer"
                  >
                    <FiGithub className="h-4 w-4" />
                    <span>{locale === 'id' ? 'Repositori GitHub' : 'GitHub Repository'}</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Case Study Narrative (approx 67% width on desktop) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Top Media / Mockup Hero Card */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-[#0b0e14] shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.35)]">
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-10 select-none"
                style={{
                  background: `radial-gradient(circle at 50% 35%, ${project.accentColor || '#6366f1'}44 0%, #06090f 100%)`,
                }}
              >
                {/* Mockup Browser Window Top Bar */}
                <div className="w-full max-w-2xl rounded-t-2xl bg-black/80 border border-white/20 p-3 flex items-center gap-2 shadow-2xl">
                  <span className="h-3 w-3 rounded-full bg-red-500/90" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/90" />
                  <span className="h-3 w-3 rounded-full bg-green-500/90" />
                  <span className="ms-3 text-xs text-neutral-300 font-mono truncate">
                    {project.demoUrl || `https://${project.id}.com`}
                  </span>
                </div>

                {/* Mockup Browser Screen Body with Real Screenshot */}
                <div className="relative w-full max-w-2xl h-52 sm:h-72 rounded-b-2xl overflow-hidden border-x border-b border-white/20 shadow-2xl bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="text-xs sm:text-sm font-bold text-white font-mono drop-shadow">
                      {project.title}
                    </span>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md"
                      style={{ backgroundColor: `${project.accentColor}dd`, color: '#ffffff' }}
                    >
                      Production Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1: Overview */}
            <div className="rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#10141f] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.2)]">
              <h2 className="text-xl sm:text-2xl font-brak font-bold text-neutral-900 dark:text-white mb-3">
                Overview
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {cs.overview}
              </p>
            </div>

            {/* Section 2: Background & Motivation */}
            <div className="rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#10141f] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.2)]">
              <h2 className="text-xl sm:text-2xl font-brak font-bold text-neutral-900 dark:text-white mb-3">
                Background & Motivation
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {cs.background}
              </p>
            </div>

            {/* Section 3: Technical Architecture */}
            {cs.architecture && cs.architecture.length > 0 && (
              <div className="rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#10141f] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.2)] space-y-6">
                <h2 className="text-xl sm:text-2xl font-brak font-bold text-neutral-900 dark:text-white mb-2">
                  Technical Architecture
                </h2>

                {cs.architecture.map((arch, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                      {arch.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {arch.description}
                    </p>
                    <ul className="space-y-2 pl-4">
                      {arch.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 list-disc leading-relaxed">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Section 4: Key Features */}
            {cs.features && cs.features.length > 0 && (
              <div className="rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#10141f] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.2)]">
                <h2 className="text-xl sm:text-2xl font-brak font-bold text-neutral-900 dark:text-white mb-6">
                  Key Features
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  {cs.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-white/5 p-4 sm:p-5"
                    >
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-1.5">
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 5: System Design & Modeling */}
            {cs.systemDesign && cs.systemDesign.length > 0 && (
              <div className="rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#10141f] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.2)]">
                <h2 className="text-xl sm:text-2xl font-brak font-bold text-neutral-900 dark:text-white mb-4">
                  System Design & Modeling
                </h2>
                <ul className="space-y-3">
                  {cs.systemDesign.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      <FiCheckCircle className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Section 6: What I Learned */}
            {cs.learnings && cs.learnings.length > 0 && (
              <div className="rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#10141f] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.2)]">
                <h2 className="text-xl sm:text-2xl font-brak font-bold text-neutral-900 dark:text-white mb-4">
                  What I Learned
                </h2>
                <ul className="space-y-3">
                  {cs.learnings.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
