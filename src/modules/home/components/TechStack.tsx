'use client';

import { useState, useRef } from 'react';
import type { IconType } from 'react-icons';
import {
  SiFirebase,
  SiNginx,
  SiPostgresql,
  SiReact,
  SiVuedotjs,
  SiLaravel,
  SiPython,
  SiJest,
  SiVite,
  SiExpress,
  SiNestjs,
  SiPrisma,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiGraphql,
  SiDocker,
  SiGit,
  SiReactquery,
  SiRedux,
} from 'react-icons/si';
import { cn } from '@/lib/utils';

const AIIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zM8.307 13.664l-2.02-1.163a.08.08 0 0 1-.038-.057V6.861a4.5 4.5 0 0 1 7.376-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
  </svg>
);

interface ToolItem {
  id: string;
  name: string;
  icon: IconType | React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  iconColor: string;
  borderColor: string;
  initialRotate: number;
}

const TOOLS_DATA: ToolItem[] = [
  { id: 'firebase', name: 'Firebase', icon: SiFirebase, iconColor: '#FFA611', borderColor: 'hover:border-amber-400', initialRotate: -4 },
  { id: 'zustand', name: 'Zustand', icon: SiRedux, iconColor: '#764ABC', borderColor: 'hover:border-purple-400', initialRotate: 3 },
  { id: 'nginx', name: 'Nginx', icon: SiNginx, iconColor: '#009639', borderColor: 'hover:border-emerald-400', initialRotate: -2 },
  { id: 'postgres', name: 'Postgre', icon: SiPostgresql, iconColor: '#4169E1', borderColor: 'hover:border-blue-400', initialRotate: 5 },
  { id: 'reactnative', name: 'React Native', icon: SiReact, iconColor: '#00D8FF', borderColor: 'hover:border-cyan-400', initialRotate: -3 },
  { id: 'tanstack', name: 'Tanstack', icon: SiReactquery, iconColor: '#FF4154', borderColor: 'hover:border-rose-400', initialRotate: 4 },
  { id: 'ai', name: 'AI', icon: AIIcon, iconColor: '#10A37F', borderColor: 'hover:border-emerald-400', initialRotate: -5 },
  { id: 'vue', name: 'Vue.js', icon: SiVuedotjs, iconColor: '#42B883', borderColor: 'hover:border-emerald-400', initialRotate: 2 },
  { id: 'laravel', name: 'Laravel', icon: SiLaravel, iconColor: '#FF2D20', borderColor: 'hover:border-red-400', initialRotate: -6 },
  { id: 'python', name: 'Python', icon: SiPython, iconColor: '#3776AB', borderColor: 'hover:border-blue-400', initialRotate: 3 },
  { id: 'jest', name: 'Jest', icon: SiJest, iconColor: '#C21325', borderColor: 'hover:border-rose-400', initialRotate: -2 },
  { id: 'vite', name: 'Vite', icon: SiVite, iconColor: '#646CFF', borderColor: 'hover:border-indigo-400', initialRotate: 5 },
  { id: 'express', name: 'Express', icon: SiExpress, iconColor: '#6b7280', borderColor: 'hover:border-neutral-400', initialRotate: -4 },
  { id: 'nestjs', name: 'NestJS', icon: SiNestjs, iconColor: '#E0234E', borderColor: 'hover:border-red-400', initialRotate: 3 },
  { id: 'prisma', name: 'Prisma', icon: SiPrisma, iconColor: '#2D3748', borderColor: 'hover:border-neutral-400', initialRotate: -3 },
  { id: 'react', name: 'React', icon: SiReact, iconColor: '#61DAFB', borderColor: 'hover:border-cyan-400', initialRotate: 4 },
  { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, iconColor: '#000000', borderColor: 'hover:border-neutral-500', initialRotate: -2 },
  { id: 'typescript', name: 'TypeScript', icon: SiTypescript, iconColor: '#3178C6', borderColor: 'hover:border-blue-400', initialRotate: 6 },
  { id: 'nodejs', name: 'Node.js', icon: SiNodedotjs, iconColor: '#5FA04E', borderColor: 'hover:border-emerald-400', initialRotate: -5 },
  { id: 'tailwindcss', name: 'TailwindCSS', icon: SiTailwindcss, iconColor: '#06B6D4', borderColor: 'hover:border-cyan-400', initialRotate: 2 },
  { id: 'graphql', name: 'GraphQL', icon: SiGraphql, iconColor: '#E10098', borderColor: 'hover:border-pink-400', initialRotate: -4 },
  { id: 'docker', name: 'Docker', icon: SiDocker, iconColor: '#2496ED', borderColor: 'hover:border-blue-400', initialRotate: 3 },
  { id: 'git', name: 'Git', icon: SiGit, iconColor: '#F05032', borderColor: 'hover:border-orange-400', initialRotate: 5 },
];

export default function TechStack() {
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const dragStartRef = useRef<{ id: string; startX: number; startY: number; initX: number; initY: number } | null>(null);

  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const currentOffset = offsets[id] || { x: 0, y: 0 };
    dragStartRef.current = {
      id,
      startX: e.clientX,
      startY: e.clientY,
      initX: currentOffset.x,
      initY: currentOffset.y,
    };
    setActiveId(id);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStartRef.current) return;
    const { id, startX, startY, initX, initY } = dragStartRef.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    setOffsets((prev) => ({
      ...prev,
      [id]: { x: initX + dx, y: initY + dy },
    }));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current) {
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore if already released
      }
      dragStartRef.current = null;
      setActiveId(null);
    }
  };

  const handleReset = () => {
    setOffsets({});
  };

  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl border-2 border-indigo-200/80 dark:border-indigo-900/40 bg-[#edf2fe] dark:bg-[#0f1422] p-6 md:p-10 lg:p-12 shadow-[6px_6px_0px_0px_rgba(79,70,229,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(79,70,229,0.4)] overflow-hidden select-none">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 md:mb-12">
            <div>
              <h2 className="text-neutral-900 dark:text-white tracking-tight text-3xl lg:text-4xl font-brak font-bold">
                Tools of the Trade
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-lg leading-relaxed">
                Ini tools dan teknologi yang saya pakai buat build things. Feel free to drag them around!
              </p>
              {Object.keys(offsets).length > 0 && (
                <button
                  onClick={handleReset}
                  className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-sm border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Interactive Badges Cloud */}
          <div
            className="relative flex flex-wrap items-center justify-center gap-3 md:gap-4 py-4 min-h-[220px]"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {TOOLS_DATA.map((tool) => {
              const Icon = tool.icon;
              const offset = offsets[tool.id] || { x: 0, y: 0 };
              const isDragging = activeId === tool.id;

              return (
                <div
                  key={tool.id}
                  onPointerDown={(e) => handlePointerDown(tool.id, e)}
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) rotate(${isDragging ? 0 : tool.initialRotate}deg) scale(${isDragging ? 1.08 : 1})`,
                    zIndex: isDragging ? 50 : 1,
                    touchAction: 'none',
                  }}
                  className={cn(
                    'group flex items-center gap-2.5 rounded-full border border-neutral-200/80 dark:border-white/10 bg-white dark:bg-neutral-900/90 px-4 md:px-5 py-2 md:py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-shadow duration-200 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-0.5',
                    tool.borderColor,
                    isDragging && 'shadow-2xl ring-2 ring-indigo-500/30'
                  )}
                >
                  <Icon
                    className="h-4 w-4 md:h-5 md:w-5 shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ color: tool.iconColor }}
                  />
                  <span className="text-xs md:text-sm font-semibold text-neutral-800 dark:text-neutral-100 whitespace-nowrap">
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

