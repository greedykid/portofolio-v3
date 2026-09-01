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
import { useLanguage } from '@/common/context/LanguageContext';

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
  shadowColor: string;
  initialRotate: number;
  offsetX?: number;
  offsetY?: number;
}

// Exactly ordered and styled to match reference scattered overlapping badge pile
const TOOLS_DATA: ToolItem[] = [
  // Layer 1
  { id: 'firebase', name: 'Firebase', icon: SiFirebase, iconColor: '#FFA611', borderColor: 'border-amber-300 dark:border-amber-500/30', shadowColor: 'shadow-amber-500/10', initialRotate: -6, offsetX: 0, offsetY: 0 },
  { id: 'zustand', name: 'Zustand', icon: SiRedux, iconColor: '#764ABC', borderColor: 'border-purple-300 dark:border-purple-500/30', shadowColor: 'shadow-purple-500/10', initialRotate: 4, offsetX: -6, offsetY: 2 },
  { id: 'nginx', name: 'Nginx', icon: SiNginx, iconColor: '#009639', borderColor: 'border-emerald-300 dark:border-emerald-500/30', shadowColor: 'shadow-emerald-500/10', initialRotate: -3, offsetX: -4, offsetY: -3 },
  { id: 'postgres', name: 'Postgre', icon: SiPostgresql, iconColor: '#4169E1', borderColor: 'border-blue-300 dark:border-blue-500/30', shadowColor: 'shadow-blue-500/10', initialRotate: 5, offsetX: -8, offsetY: 4 },
  { id: 'reactnative', name: 'React Native', icon: SiReact, iconColor: '#00D8FF', borderColor: 'border-cyan-300 dark:border-cyan-500/30', shadowColor: 'shadow-cyan-500/10', initialRotate: -4, offsetX: -2, offsetY: -2 },
  { id: 'tanstack', name: 'Tanstack', icon: SiReactquery, iconColor: '#FF4154', borderColor: 'border-rose-300 dark:border-rose-500/30', shadowColor: 'shadow-rose-500/10', initialRotate: 6, offsetX: -6, offsetY: 3 },
  { id: 'ai', name: 'AI', icon: AIIcon, iconColor: '#10A37F', borderColor: 'border-teal-300 dark:border-teal-500/30', shadowColor: 'shadow-teal-500/10', initialRotate: -5, offsetX: -4, offsetY: -1 },

  // Layer 2
  { id: 'vue', name: 'Vue.js', icon: SiVuedotjs, iconColor: '#42B883', borderColor: 'border-emerald-300 dark:border-emerald-500/30', shadowColor: 'shadow-emerald-500/10', initialRotate: 3, offsetX: 4, offsetY: -6 },
  { id: 'laravel', name: 'Laravel', icon: SiLaravel, iconColor: '#FF2D20', borderColor: 'border-red-300 dark:border-red-500/30', shadowColor: 'shadow-red-500/10', initialRotate: -7, offsetX: -8, offsetY: 5 },
  { id: 'python', name: 'Python', icon: SiPython, iconColor: '#3776AB', borderColor: 'border-blue-300 dark:border-blue-500/30', shadowColor: 'shadow-blue-500/10', initialRotate: 5, offsetX: -4, offsetY: -4 },
  { id: 'jest', name: 'Jest', icon: SiJest, iconColor: '#C21325', borderColor: 'border-rose-300 dark:border-rose-500/30', shadowColor: 'shadow-rose-500/10', initialRotate: -3, offsetX: -6, offsetY: 2 },
  { id: 'vite', name: 'Vite', icon: SiVite, iconColor: '#646CFF', borderColor: 'border-indigo-300 dark:border-indigo-500/30', shadowColor: 'shadow-indigo-500/10', initialRotate: 7, offsetX: -4, offsetY: -5 },
  { id: 'express', name: 'Express', icon: SiExpress, iconColor: '#6b7280', borderColor: 'border-neutral-300 dark:border-neutral-600', shadowColor: 'shadow-neutral-500/10', initialRotate: -4, offsetX: -6, offsetY: 3 },
  { id: 'nestjs', name: 'NestJS', icon: SiNestjs, iconColor: '#E0234E', borderColor: 'border-red-300 dark:border-red-500/30', shadowColor: 'shadow-red-500/10', initialRotate: 5, offsetX: -8, offsetY: -3 },
  { id: 'prisma', name: 'Prisma', icon: SiPrisma, iconColor: '#2D3748', borderColor: 'border-neutral-300 dark:border-neutral-600', shadowColor: 'shadow-neutral-500/10', initialRotate: -6, offsetX: -4, offsetY: 4 },

  // Layer 3
  { id: 'react', name: 'React', icon: SiReact, iconColor: '#61DAFB', borderColor: 'border-cyan-300 dark:border-cyan-500/30', shadowColor: 'shadow-cyan-500/10', initialRotate: 4, offsetX: 2, offsetY: -4 },
  { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, iconColor: '#000000', borderColor: 'border-neutral-400 dark:border-white/20', shadowColor: 'shadow-neutral-500/10', initialRotate: -5, offsetX: -6, offsetY: 4 },
  { id: 'typescript', name: 'TypeScript', icon: SiTypescript, iconColor: '#3178C6', borderColor: 'border-blue-300 dark:border-blue-500/30', shadowColor: 'shadow-blue-500/10', initialRotate: 6, offsetX: -8, offsetY: -3 },
  { id: 'nodejs', name: 'Node.js', icon: SiNodedotjs, iconColor: '#5FA04E', borderColor: 'border-emerald-300 dark:border-emerald-500/30', shadowColor: 'shadow-emerald-500/10', initialRotate: -6, offsetX: -4, offsetY: 5 },
  { id: 'tailwindcss', name: 'TailwindCSS', icon: SiTailwindcss, iconColor: '#06B6D4', borderColor: 'border-cyan-300 dark:border-cyan-500/30', shadowColor: 'shadow-cyan-500/10', initialRotate: 3, offsetX: -6, offsetY: -2 },
  { id: 'graphql', name: 'GraphQL', icon: SiGraphql, iconColor: '#E10098', borderColor: 'border-pink-300 dark:border-pink-500/30', shadowColor: 'shadow-pink-500/10', initialRotate: -5, offsetX: -4, offsetY: 4 },
  { id: 'docker', name: 'Docker', icon: SiDocker, iconColor: '#2496ED', borderColor: 'border-blue-300 dark:border-blue-500/30', shadowColor: 'shadow-blue-500/10', initialRotate: 4, offsetX: -8, offsetY: -3 },
  { id: 'git', name: 'Git', icon: SiGit, iconColor: '#F05032', borderColor: 'border-orange-300 dark:border-orange-500/30', shadowColor: 'shadow-orange-500/10', initialRotate: 6, offsetX: -4, offsetY: 2 },
];

// Interactive Web Audio Sound Synthesizer
let audioCtx: AudioContext | null = null;
function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playGrabSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // Audio Context safe catch
  }
}

function playCollisionSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.06);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Safe catch
  }
}

function playDropSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(560, now);
    osc.frequency.exponentialRampToValueAtTime(360, now + 0.07);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  } catch {
    // Safe catch
  }
}

export default function TechStack() {
  const { t } = useLanguage();
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragStartRef = useRef<{ id: string; startX: number; startY: number; initX: number; initY: number } | null>(null);
  const lastSoundTime = useRef(0);

  const handlePointerDown = (id: string, e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    playGrabSound();
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
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    const newOffsetX = initX + deltaX;
    const newOffsetY = initY + deltaY;

    setOffsets((prev) => {
      const nextOffsets = {
        ...prev,
        [id]: { x: newOffsetX, y: newOffsetY },
      };

      const activeEl = itemRefs.current[id];
      if (activeEl) {
        const activeRect = activeEl.getBoundingClientRect();
        const activeCenter = {
          x: activeRect.left + activeRect.width / 2,
          y: activeRect.top + activeRect.height / 2,
        };

        let hadCollision = false;

        TOOLS_DATA.forEach((otherTool) => {
          if (otherTool.id === id) return;
          const otherEl = itemRefs.current[otherTool.id];
          if (!otherEl) return;

          const otherRect = otherEl.getBoundingClientRect();
          const otherCenter = {
            x: otherRect.left + otherRect.width / 2,
            y: otherRect.top + otherRect.height / 2,
          };

          const dx = otherCenter.x - activeCenter.x;
          const dy = otherCenter.y - activeCenter.y;
          const dist = Math.hypot(dx, dy);

          const minDist = (activeRect.width + otherRect.width) / 2.6;

          if (dist < minDist && dist > 0) {
            hadCollision = true;
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            const currentOtherOffset = nextOffsets[otherTool.id] || { x: 0, y: 0 };
            nextOffsets[otherTool.id] = {
              x: currentOtherOffset.x + nx * overlap * 0.35,
              y: currentOtherOffset.y + ny * overlap * 0.35,
            };
          }
        });

        const now = Date.now();
        if (hadCollision && now - lastSoundTime.current > 120) {
          playCollisionSound();
          lastSoundTime.current = now;
        }
      }

      return nextOffsets;
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      playDropSound();
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
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h2 className="text-neutral-900 dark:text-white tracking-tight text-3xl lg:text-4xl font-brak font-bold">
                {t('tools_title')}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-lg leading-relaxed">
                {t('tools_desc')}
              </p>
              {Object.keys(offsets).length > 0 && (
                <button
                  onClick={handleReset}
                  className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 shadow-sm border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                >
                  {t('tools_reset')}
                </button>
              )}
            </div>
          </div>

          {/* Organic Scattered Overlapping Badges Pile (Matching Screenshot 3) */}
          <div
            className="relative flex flex-wrap items-center justify-center -space-x-2 sm:-space-x-3 -space-y-1.5 sm:-space-y-2 py-6 min-h-[260px] md:min-h-[290px] px-2"
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
                  ref={(el) => {
                    itemRefs.current[tool.id] = el;
                  }}
                  onPointerDown={(e) => handlePointerDown(tool.id, e)}
                  style={{
                    transform: `translate(${offset.x + (tool.offsetX || 0)}px, ${offset.y + (tool.offsetY || 0)}px) rotate(${isDragging ? 0 : tool.initialRotate}deg) scale(${isDragging ? 1.12 : 1})`,
                    zIndex: isDragging ? 60 : 10,
                    touchAction: 'none',
                    transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s',
                  }}
                  className={cn(
                    'group relative inline-flex items-center gap-2 rounded-full border-2 bg-white dark:bg-[#151a28] px-4 md:px-5 py-2 md:py-2.5 shadow-[0_6px_16px_rgba(0,0,0,0.08)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.4)] cursor-grab active:cursor-grabbing hover:scale-105 hover:z-40 transition-all select-none',
                    tool.borderColor,
                    tool.shadowColor,
                    isDragging && 'shadow-2xl ring-2 ring-indigo-500/50 scale-110 z-50'
                  )}
                >
                  <Icon
                    className="h-4 w-4 md:h-5 md:w-5 shrink-0 transition-transform duration-200 group-hover:scale-115"
                    style={{ color: tool.iconColor }}
                  />
                  <span className="text-xs md:text-sm font-bold text-neutral-800 dark:text-neutral-100 whitespace-nowrap">
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
