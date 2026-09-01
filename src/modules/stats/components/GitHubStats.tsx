'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { SOCIAL_MEDIA } from '@/common/constant/data';
import { useLanguage } from '@/common/context/LanguageContext';

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0, 1, 2, 3, 4
  isFuture?: boolean;
}

interface WeekData {
  days: ContributionDay[];
  monthLabel?: string;
}

function formatLocalDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Generate realistic 53-week contribution data ending accurately on current date (real-time)
function generateContributions(liveContributions?: Array<{ date: string; count: number; level: number }>): {
  weeks: WeekData[];
  total: number;
  thisWeek: number;
  bestDay: number;
  average: number;
} {
  const weeks: WeekData[] = [];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayDayOfWeek = today.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  const currentWeekSunday = new Date(today);
  currentWeekSunday.setDate(today.getDate() - todayDayOfWeek);

  const startDate = new Date(currentWeekSunday);
  startDate.setDate(currentWeekSunday.getDate() - 52 * 7);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let lastMonth = -1;

  const liveMap = new Map<string, { count: number; level: number }>();
  if (liveContributions && liveContributions.length > 0) {
    for (const item of liveContributions) {
      liveMap.set(item.date, { count: item.count, level: item.level });
    }
  }

  let totalCount = 0;
  let thisWeekCount = 0;
  let bestDay = 0;

  for (let w = 0; w < 53; w++) {
    const weekDays: ContributionDay[] = [];
    let weekMonthLabel: string | undefined = undefined;

    for (let d = 0; d < 7; d++) {
      const curDate = new Date(startDate);
      curDate.setDate(startDate.getDate() + w * 7 + d);

      const isFuture = curDate > today;
      const dateStr = formatLocalDate(curDate);

      const curMonth = curDate.getMonth();
      if (curMonth !== lastMonth && curDate.getDate() <= 7 && !isFuture) {
        weekMonthLabel = monthNames[curMonth];
        lastMonth = curMonth;
      }

      let count = 0;
      let level = 0;

      if (!isFuture) {
        if (liveMap.has(dateStr)) {
          const liveItem = liveMap.get(dateStr)!;
          count = liveItem.count;
          level = liveItem.level;
        } else if (liveContributions && liveContributions.length > 0) {
          count = 0;
          level = 0;
        } else {
          // Synthetic fallback if live API is still loading or offline
          const dayIndex = w * 7 + d;
          const isToday = curDate.getTime() === today.getTime();
          if (isToday) {
            count = 18;
            level = 4;
          } else {
            const noise = Math.sin(dayIndex * 12.9898 + w * 78.233) * 43758.5453;
            const rand = Math.abs(noise - Math.floor(noise));
            const isTopRow = d === 0;

            if (isTopRow && (w < 4 || (w > 18 && w < 24))) {
              level = 0;
              count = 0;
            } else if (rand > 0.15) {
              if (rand > 0.82) {
                level = 4;
                count = Math.floor(24 + rand * 62);
              } else if (rand > 0.58) {
                level = 3;
                count = Math.floor(14 + rand * 14);
              } else if (rand > 0.32) {
                level = 2;
                count = Math.floor(6 + rand * 8);
              } else {
                level = 1;
                count = Math.floor(1 + rand * 5);
              }
            } else {
              level = 0;
              count = 0;
            }
          }
        }

        totalCount += count;
        if (count > bestDay) bestDay = count;
        if (curDate >= currentWeekSunday && curDate <= today) {
          thisWeekCount += count;
        }
      }

      weekDays.push({
        date: dateStr,
        count,
        level,
        isFuture,
      });
    }

    weeks.push({
      days: weekDays,
      monthLabel: weekMonthLabel,
    });
  }

  const pastDaysCount = 52 * 7 + (todayDayOfWeek + 1);
  const average = totalCount > 0 ? Math.max(1, Math.round(totalCount / pastDaysCount)) : 16;

  return {
    weeks,
    total: totalCount || (liveContributions ? 0 : 5891),
    thisWeek: thisWeekCount,
    bestDay: bestDay || (liveContributions ? 0 : 86),
    average: average,
  };
}

const LEVEL_COLORS: Record<number, string> = {
  0: 'bg-[#222831] hover:bg-[#343b45]',
  1: 'bg-[#9be9a8] hover:bg-[#b8f5c2]',
  2: 'bg-[#40c463] hover:bg-[#52d677]',
  3: 'bg-[#30a14e] hover:bg-[#3ec462]',
  4: 'bg-[#216e39] hover:bg-[#2c8a49]',
};

// Calmer & Slower Fireworks Particle Simulation
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
  const { t, locale } = useLanguage();
  const [hoveredDay, setHoveredDay] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);
  const [liveContributions, setLiveContributions] = useState<Array<{ date: string; count: number; level: number }> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const githubUsername = (SOCIAL_MEDIA.github ?? 'https://github.com/greedykid')
    .replace('https://github.com/', '')
    .replace(/\/$/, '');

  // Fetch live contributions from GitHub API
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveContributions() {
      try {
        const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`);
        if (res.ok && isMounted) {
          const data = await res.json();
          if (Array.isArray(data?.contributions)) {
            setLiveContributions(data.contributions);
          }
        }
      } catch (err) {
        console.warn('Could not fetch live GitHub contributions:', err);
      }
    }
    fetchLiveContributions();
    return () => {
      isMounted = false;
    };
  }, [githubUsername]);

  const { weeks, total, thisWeek, bestDay, average } = useMemo(
    () => generateContributions(liveContributions || undefined),
    [liveContributions]
  );

  // Slower, graceful fireworks animation
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
      const targetY = Math.random() * (canvas.height * 0.5) + 35;
      rockets.push({
        x,
        y: canvas.height,
        targetY,
        speedY: -(Math.random() * 1.4 + 2.2), // Slow, smooth ascent
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const explode = (x: number, y: number, color: string) => {
      const count = 35 + Math.floor(Math.random() * 25);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 1.5 + 0.6; // Gentle drifting sparks
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: Math.random() * 2.2 + 1.2,
          decay: Math.random() * 0.007 + 0.004, // Lingering glow
        });
      }
    };

    let lastRocketTime = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Relaxed interval (1.6s between launches)
      if (time - lastRocketTime > 1600) {
        createRocket();
        lastRocketTime = time;
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.speedY;

        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 10;
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
        s.vy += 0.016; // Soft gravity
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
        ctx.shadowBlur = 6;
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
                {t('contrib_title')}
              </h2>
              <p className="mt-2 text-sm md:text-base text-neutral-400">
                {t('contrib_desc')}{' '}
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
                  {t('contrib_total')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-brak font-bold text-[#22c55e]">
                  {thisWeek}
                </span>
                <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                  {t('contrib_this_week')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-brak font-bold text-[#22c55e]">
                  {bestDay}
                </span>
                <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                  {t('contrib_best_day')}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-brak font-bold text-[#22c55e]">
                  {average}{' '}
                  <span className="text-sm font-normal text-neutral-400">/ {t('contrib_day_unit')}</span>
                </span>
                <span className="text-[11px] font-bold tracking-wider text-neutral-400 uppercase">
                  {t('contrib_average')}
                </span>
              </div>
            </div>
          </div>

          {/* Contributions Heatmap Grid Container with safe padding to prevent hover scale clipping and scrollbars */}
          <div className="relative z-10 overflow-x-auto pb-3 pt-2">
            <div className="w-full min-w-[760px] p-2">
              {/* Synchronized Month Labels across 53 full width columns */}
              <div className="flex w-full justify-between text-[11px] font-medium text-neutral-400 mb-2 h-4 select-none">
                {weeks.map((week, idx) => (
                  <div key={idx} className="flex-1 text-left min-w-0">
                    {week.monthLabel && (
                      <span className="whitespace-nowrap -translate-x-1 block font-mono text-[10px] sm:text-[11px]">
                        {week.monthLabel}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* 53 Columns x 7 Rows Grid spanning 100% of card */}
              <div className="flex w-full justify-between items-center gap-[2px] sm:gap-[3px] md:gap-[4px]">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex-1 flex flex-col gap-[2px] sm:gap-[3px] md:gap-[4px] min-w-0">
                    {week.days.map((day, dIdx) => {
                      if (day.isFuture) {
                        return (
                          <div
                            key={dIdx}
                            className="w-full aspect-square rounded-[2px] sm:rounded-[3px] invisible"
                          />
                        );
                      }

                      return (
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
                          className={`w-full aspect-square rounded-[2px] sm:rounded-[3px] transition-transform duration-150 origin-center hover:scale-125 relative hover:z-20 cursor-pointer ${
                            LEVEL_COLORS[day.level]
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer: Less ... More Legend */}
          <div className="relative z-10 flex items-center gap-2 mt-4 text-xs text-neutral-400 font-medium">
            <span>{t('contrib_less')}</span>
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-[2px] bg-[#222831]" />
              <span className="h-3 w-3 rounded-[2px] bg-[#9be9a8]" />
              <span className="h-3 w-3 rounded-[2px] bg-[#40c463]" />
              <span className="h-3 w-3 rounded-[2px] bg-[#30a14e]" />
              <span className="h-3 w-3 rounded-[2px] bg-[#216e39]" />
            </div>
            <span>{t('contrib_more')}</span>
          </div>

          {/* Tooltip */}
          {hoveredDay && (
            <div
              className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full -mt-2 rounded-lg bg-neutral-900/95 border border-white/20 px-3 py-1.5 text-xs text-white shadow-xl backdrop-blur-sm"
              style={{ left: hoveredDay.x, top: hoveredDay.y }}
            >
              <p className="font-semibold text-emerald-400">
                {hoveredDay.day.count > 0
                  ? `${hoveredDay.day.count} ${t('contrib_count_label')}`
                  : t('contrib_no_contributions')}
              </p>
              <p className="text-[10px] text-neutral-300">
                {new Date(hoveredDay.day.date + 'T00:00:00').toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
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
