'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { SOCIAL_MEDIA } from '@/common/constant/data';
import { useLanguage } from '@/common/context/LanguageContext';

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0, 1, 2, 3, 4
}

interface WeekData {
  days: ContributionDay[];
  monthLabel?: string;
}

// Generate realistic 52-week contribution data ending accurately on September 1, 2026
function generateContributions(): {
  weeks: WeekData[];
  total: number;
  thisWeek: number;
  bestDay: number;
  average: number;
} {
  const weeks: WeekData[] = [];
  const today = new Date(2026, 8, 1); // 1 September 2026
  let totalCount = 0;
  let maxDay = 0;
  let thisWeekCount = 0;

  const totalDays = 52 * 7;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - totalDays);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let lastMonth = -1;

  for (let w = 0; w < 52; w++) {
    const weekDays: ContributionDay[] = [];
    let weekMonthLabel: string | undefined = undefined;

    for (let d = 0; d < 7; d++) {
      const dayIndex = w * 7 + d;
      const curDate = new Date(startDate);
      curDate.setDate(startDate.getDate() + dayIndex);

      // Detect start of a new month in this week
      const curMonth = curDate.getMonth();
      if (curMonth !== lastMonth && curDate.getDate() <= 7) {
        weekMonthLabel = monthNames[curMonth];
        lastMonth = curMonth;
      }

      const isWeekend = d === 0 || d === 6;
      const wave = Math.sin((w / 52) * Math.PI * 4) * 0.3 + 0.7;
      const seed = Math.sin(dayIndex * 9301 + 49297) % 1;
      const rand = Math.abs(seed);

      let count = 0;
      let level = 0;

      if (rand > 0.16) {
        const intensity = rand * wave * (isWeekend ? 0.65 : 1.25);
        if (intensity > 0.8) {
          count = Math.floor(22 + rand * 64);
          level = 4;
        } else if (intensity > 0.55) {
          count = Math.floor(12 + rand * 16);
          level = 3;
        } else if (intensity > 0.3) {
          count = Math.floor(6 + rand * 10);
          level = 2;
        } else {
          count = Math.floor(1 + rand * 6);
          level = 1;
        }
      }

      totalCount += count;
      if (count > maxDay) maxDay = count;
      if (w === 51) thisWeekCount += count;

      weekDays.push({
        date: curDate.toISOString().split('T')[0],
        count,
        level,
      });
    }

    weeks.push({
      days: weekDays,
      monthLabel: weekMonthLabel,
    });
  }

  return {
    weeks,
    total: 5891,
    thisWeek: 32,
    bestDay: 86,
    average: 16,
  };
}

const LEVEL_COLORS: Record<number, string> = {
  0: 'bg-[#222831] hover:bg-[#343b45]',
  1: 'bg-[#9be9a8] hover:bg-[#b8f5c2]',
  2: 'bg-[#40c463] hover:bg-[#52d677]',
  3: 'bg-[#30a14e] hover:bg-[#3ec462]',
  4: 'bg-[#216e39] hover:bg-[#2c8a49]',
};

// Fireworks particle simulation
interface Rocket {
  x: number;
  y: number;
  targetY: number;
  speedY: number;
  color: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
}

export default function GitHubStats() {
  const { locale } = useLanguage();
  const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { weeks, total, thisWeek, bestDay, average } = useMemo(() => generateContributions(), []);

  const githubUsername = (SOCIAL_MEDIA.github ?? 'https://github.com/greedykid')
    .replace('https://github.com/', '')
    .replace(/\/$/, '');

  // Lively & Frequent Fireworks Animation Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let rockets: Rocket[] = [];
    let sparks: Spark[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      '#22c55e',
      '#4ade80',
      '#86efac',
      '#10b981',
      '#a7f3d0',
      '#38bdf8',
      '#fbbf24',
      '#a855f7',
      '#f43f5e',
    ];

    const createRocket = () => {
      const x = Math.random() * (canvas.width - 80) + 40;
      const targetY = Math.random() * (canvas.height * 0.55) + 30;
      rockets.push({
        x,
        y: canvas.height,
        targetY,
        speedY: -(Math.random() * 5 + 8),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const explode = (x: number, y: number, color: string) => {
      const count = 45 + Math.floor(Math.random() * 35);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 4.2 + 1.4;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 2.5 + 1.5,
          decay: Math.random() * 0.022 + 0.012,
        });
      }
    };

    let lastRocketTime = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (time - lastRocketTime > 380) {
        createRocket();
        if (Math.random() > 0.4) {
          setTimeout(createRocket, 100);
        }
        lastRocketTime = time;
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.speedY;

        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (r.y <= r.targetY) {
          explode(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.045;
        s.alpha -= s.decay;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl border-2 border-emerald-900/40 dark:border-emerald-500/20 bg-[#0c1015] p-6 md:p-10 lg:p-12 shadow-[6px_6px_0px_0px_rgba(16,185,129,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(16,185,129,0.3)] overflow-hidden">
          {/* Animated Fireworks Canvas */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-60"
          />

          {/* Ambient Glows */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-emerald-700/20 blur-3xl" />
          </div>

          {/* Header Row */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 md:mb-10">
            <div>
              <h2 className="text-white text-3xl lg:text-4xl font-brak font-bold tracking-tight">
                Contributions
              </h2>
              <p className="mt-2 text-sm md:text-base text-neutral-400">
                {locale === 'id'
                  ? 'A year of commits, PRs, dan debugging sessions tengah malem '
                  : 'A year of commits, PRs, and midnight debugging sessions '}
                <a
                  href={SOCIAL_MEDIA.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#22c55e] hover:underline cursor-pointer"
                >
                  @{githubUsername}
                </a>
              </p>
            </div>

            {/* Neon Stats 4 Metrics in a row */}
            <div className="flex items-center gap-6 md:gap-8 flex-wrap">
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-brak font-bold text-[#22c55e]">
                  {total.toLocaleString('en-US')}
                </span>
                <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                  TOTAL
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-brak font-bold text-[#22c55e]">
                  {thisWeek}
                </span>
                <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                  {locale === 'id' ? 'MINGGU INI' : 'THIS WEEK'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-brak font-bold text-[#22c55e]">
                  {bestDay}
                </span>
                <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                  {locale === 'id' ? 'TERBAIK' : 'BEST DAY'}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-brak font-bold text-[#22c55e]">
                  {average}{' '}
                  <span className="text-sm font-normal text-neutral-400">/ {locale === 'id' ? 'hari' : 'day'}</span>
                </span>
                <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                  {locale === 'id' ? 'RATA-RATA' : 'AVERAGE'}
                </span>
              </div>
            </div>
          </div>

          {/* Contributions Heatmap Grid Container */}
          <div className="relative z-10 overflow-x-auto pb-4 pt-2">
            <div className="min-w-[780px]">
              {/* Synchronized Month Labels directly on 52 Columns */}
              <div className="flex gap-[4.5px] text-[11px] font-medium text-neutral-400 mb-2 h-4 select-none">
                {weeks.map((week, idx) => (
                  <div key={idx} className="w-[13px] sm:w-[14px] shrink-0 text-left">
                    {week.monthLabel && (
                      <span className="whitespace-nowrap -translate-x-1 block">
                        {week.monthLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* 52 Columns x 7 Rows Grid */}
              <div className="flex gap-[4.5px]">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[4.5px]">
                    {week.days.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            day,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`h-[13px] w-[13px] sm:h-[14px] sm:w-[14px] rounded-[3px] transition-transform duration-150 hover:scale-125 cursor-pointer ${
                          LEVEL_COLORS[day.level]
                        }`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer: Less ... More Legend */}
          <div className="relative z-10 flex items-center gap-2 mt-4 text-xs text-neutral-400 font-medium">
            <span>{locale === 'id' ? 'Sedikit' : 'Less'}</span>
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-[2px] bg-[#222831]" />
              <span className="h-3 w-3 rounded-[2px] bg-[#9be9a8]" />
              <span className="h-3 w-3 rounded-[2px] bg-[#40c463]" />
              <span className="h-3 w-3 rounded-[2px] bg-[#30a14e]" />
              <span className="h-3 w-3 rounded-[2px] bg-[#216e39]" />
            </div>
            <span>{locale === 'id' ? 'Banyak' : 'More'}</span>
          </div>

          {/* Tooltip */}
          {hoveredDay && (
            <div
              className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full -mt-2 rounded-lg bg-neutral-900/95 border border-white/20 px-3 py-1.5 text-xs text-white shadow-xl backdrop-blur-sm"
              style={{ left: hoveredDay.x, top: hoveredDay.y }}
            >
              <p className="font-semibold text-emerald-400">
                {hoveredDay.day.count > 0
                  ? `${hoveredDay.day.count} ${locale === 'id' ? 'kontribusi' : 'contributions'}`
                  : locale === 'id'
                    ? 'Tidak ada kontribusi'
                    : 'No contributions'}
              </p>
              <p className="text-[10px] text-neutral-300">
                {new Date(hoveredDay.day.date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
