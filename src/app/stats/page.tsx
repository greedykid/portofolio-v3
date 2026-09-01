'use client';

import { useState, useEffect } from 'react';
import Container from '@/common/components/elements/Container';
import {
  FiEye,
  FiUsers,
  FiCompass,
  FiPercent,
  FiClock,
  FiZap,
  FiFileText,
  FiShare2,
  FiGlobe,
  FiChrome,
  FiHardDrive,
  FiSmartphone,
  FiGithub,
  FiActivity,
  FiCheckCircle,
} from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/common/context/LanguageContext';
import {
  getDynamicTelemetry,
  fetchLiveGitHubStats,
  type TelemetryData,
} from '@/common/libs/analytics';

type TimeRange = '7d' | '30d' | '90d' | 'all';

interface BreakdownItem {
  label: string;
  count: string | number;
  percentage: string;
  icon?: string;
}

export default function StatsPage() {
  const { locale } = useLanguage();
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [telemetry, setTelemetry] = useState<TelemetryData>(() => getDynamicTelemetry('all'));
  const [githubStats, setGithubStats] = useState<{
    publicRepos: number;
    followers: number;
    following: number;
    createdAt: string;
    avatarUrl: string;
    bio: string;
  } | null>(null);

  const [hoveredPoint, setHoveredPoint] = useState<{
    month: string;
    views: number;
    sessions: number;
    x: number;
    y: number;
  } | null>(null);

  // Recalculate dynamic metrics when timeRange changes
  useEffect(() => {
    setTelemetry(getDynamicTelemetry(timeRange));
  }, [timeRange]);

  // Fetch real-time live GitHub API data
  useEffect(() => {
    let isMounted = true;
    fetchLiveGitHubStats('greedykid').then((data) => {
      if (isMounted && data) {
        setGithubStats(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Header with Title and Range Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight">
                {locale === 'id' ? 'Statistik Situs' : 'Site Statistics'}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
              {locale === 'id'
                ? 'Analitik traffic real-time, telemetri klien aktif, dan metrik repositori GitHub.'
                : 'Real-time traffic analytics, active client telemetry, and live GitHub repository metrics.'}
            </p>
          </div>

          {/* Time range pill tabs */}
          <div className="flex items-center rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/5 p-1.5 self-start md:self-auto shadow-sm">
            {(
              [
                { id: '7d', label: '7 Hari' },
                { id: '30d', label: '30 Hari' },
                { id: '90d', label: '90 Hari' },
                { id: 'all', label: locale === 'id' ? 'Semua Waktu' : 'All Time' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTimeRange(tab.id)}
                className={cn(
                  'rounded-xl px-3.5 py-1.5 text-xs md:text-sm font-semibold transition-all cursor-pointer',
                  timeRange === tab.id
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-md scale-105'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Client Device Telemetry Banner */}
        {telemetry.clientInfo && (
          <div className="mb-8 rounded-2xl border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-[#121624] px-4 py-3 text-xs text-neutral-700 dark:text-neutral-300 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-medium">
              <FiActivity className="text-primary h-4 w-4" />
              <span>
                {locale === 'id' ? 'Koneksi Klien Aktif:' : 'Active Client Connection:'}{' '}
                <strong className="text-neutral-900 dark:text-white">
                  {telemetry.clientInfo.browser} ({telemetry.clientInfo.os})
                </strong>
                {' • '}
                <span>{telemetry.clientInfo.device} ({telemetry.clientInfo.screen})</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              <span>Timezone: {telemetry.clientInfo.timezone}</span>
            </div>
          </div>
        )}

        {/* 1. 6 Top Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 md:gap-4 mb-8">
          {[
            {
              label: locale === 'id' ? 'Tayangan Halaman' : 'Pageviews',
              val: telemetry.pageviews.toLocaleString('en-US'),
              icon: FiEye,
            },
            {
              label: locale === 'id' ? 'Pengunjung' : 'Visitors',
              val: telemetry.visitors.toLocaleString('en-US'),
              icon: FiUsers,
            },
            {
              label: locale === 'id' ? 'Kunjungan' : 'Visits',
              val: telemetry.visits.toLocaleString('en-US'),
              icon: FiCompass,
            },
            {
              label: locale === 'id' ? 'Rasio Pantul' : 'Bounce Rate',
              val: telemetry.bounceRate,
              icon: FiPercent,
            },
            {
              label: locale === 'id' ? 'Waktu Rata-rata' : 'Average Time',
              val: telemetry.avgTime,
              icon: FiClock,
            },
            {
              label: locale === 'id' ? 'Aktif Sekarang' : 'Active Now',
              val: telemetry.activeNow.toString(),
              icon: FiZap,
              isLive: true,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-5 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.25)] transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 leading-tight">
                    {item.label}
                  </span>
                  {item.isLive ? (
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  ) : (
                    <Icon className="h-3.5 w-3.5 text-neutral-400" />
                  )}
                </div>
                <div className="text-2xl md:text-3xl font-brak font-bold text-neutral-900 dark:text-white">
                  {item.val}
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Main Traffic Spline Chart Card */}
        <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#101420] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] mb-8 md:mb-10 overflow-hidden">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-white">
              {locale === 'id' ? 'Kurva Pertumbuhan Tayangan & Sesi' : 'Pageviews & Sessions Growth'}
            </h2>
            <span className="text-xs font-mono text-neutral-400">Real-Time Sync</span>
          </div>

          {/* SVG Canvas Spline Chart */}
          <div className="relative w-full h-[260px] md:h-[320px]">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-neutral-400 font-mono">
              {[4000, 3000, 2000, 1000, 0].map((val) => (
                <div key={val} className="flex items-center gap-2 w-full">
                  <span className="w-8 text-right shrink-0">{val}</span>
                  <div className="w-full border-b border-neutral-200 dark:border-white/5" />
                </div>
              ))}
            </div>

            {/* SVG Lines */}
            <svg
              className="absolute inset-0 h-full w-full pl-10 pt-2 pb-6"
              viewBox="0 0 1000 300"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Blue Pageviews Area Fill & Path */}
              <path
                d="M 50 140 Q 150 100, 260 160 T 480 110 T 700 80 T 890 120 L 960 60 L 960 295 L 50 295 Z"
                fill="url(#viewsGrad)"
              />
              <path
                d="M 50 140 Q 150 100, 260 160 T 480 110 T 700 80 T 890 120 L 960 60"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Orange Sessions Area Fill & Path */}
              <path
                d="M 50 240 Q 150 230, 260 250 T 480 220 T 700 210 T 890 230 L 960 200 L 960 295 L 50 295 Z"
                fill="url(#sessionsGrad)"
              />
              <path
                d="M 50 240 Q 150 230, 260 250 T 480 220 T 700 210 T 890 230 L 960 200"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* Interactive Points on Chart */}
            <div className="absolute inset-0 pl-10 pb-6 pointer-events-auto">
              {telemetry.chartPoints.map((pt) => (
                <div
                  key={pt.month}
                  style={{ left: `${pt.xPercent}%` }}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredPoint({
                      month: pt.month,
                      views: pt.views,
                      sessions: pt.sessions,
                      x: rect.left,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="absolute top-0 bottom-6 w-8 -translate-x-1/2 flex items-center justify-center cursor-pointer group"
                >
                  <div className="h-full w-[1px] bg-indigo-500/0 group-hover:bg-indigo-500/40 transition-colors" />
                </div>
              ))}
            </div>

            {/* Month labels at bottom of chart */}
            <div className="absolute bottom-0 inset-x-0 pl-10 flex justify-between text-[11px] text-neutral-400 font-medium px-2">
              {telemetry.chartPoints.map((pt) => (
                <span key={pt.month}>{pt.month}</span>
              ))}
            </div>
          </div>

          {/* Chart Tooltip */}
          {hoveredPoint && (
            <div
              className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full -mt-3 rounded-xl bg-neutral-950/95 border border-white/20 p-3 shadow-2xl backdrop-blur-md text-xs text-white"
              style={{ left: hoveredPoint.x, top: hoveredPoint.y }}
            >
              <p className="font-bold text-neutral-300 border-b border-white/10 pb-1 mb-1.5">
                {hoveredPoint.month}
              </p>
              <p className="flex items-center justify-between gap-4 font-semibold text-indigo-400">
                <span>{locale === 'id' ? 'Tayangan Halaman:' : 'Pageviews:'}</span>
                <span>{hoveredPoint.views.toLocaleString('en-US')}</span>
              </p>
              <p className="flex items-center justify-between gap-4 font-semibold text-amber-400">
                <span>{locale === 'id' ? 'Sesi Pengunjung:' : 'Sessions:'}</span>
                <span>{hoveredPoint.sessions.toLocaleString('en-US')}</span>
              </p>
            </div>
          )}

          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span>{locale === 'id' ? 'Sesi' : 'Sessions'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
              <span>{locale === 'id' ? 'Tayangan Halaman' : 'Pageviews'}</span>
            </div>
          </div>
        </div>

        {/* Live GitHub API Metrics Card */}
        {githubStats && (
          <div className="mb-8 md:mb-10 rounded-3xl border-2 border-emerald-300/80 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-[#0e1a17] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(16,185,129,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(16,185,129,0.25)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                  <FiGithub className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-brak font-bold text-lg md:text-xl text-neutral-900 dark:text-white">
                    GitHub Live Telemetry (@greedykid)
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">
                    {locale === 'id' ? 'Sinkronisasi langsung dengan GitHub REST API' : 'Direct live sync with GitHub REST API'}
                  </p>
                </div>
              </div>
              <a
                href="https://github.com/greedykid"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 text-white px-4 py-2 text-xs font-bold shadow-sm hover:bg-emerald-700 transition-colors self-start sm:self-auto"
              >
                <span>Lihat Profil GitHub</span>
                <FiCheckCircle className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-white dark:bg-black/30 border border-emerald-200 dark:border-emerald-500/20 p-4">
                <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase">
                  Public Repos
                </p>
                <p className="text-2xl font-brak font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {githubStats.publicRepos}
                </p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-black/30 border border-emerald-200 dark:border-emerald-500/20 p-4">
                <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase">
                  Followers
                </p>
                <p className="text-2xl font-brak font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {githubStats.followers}
                </p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-black/30 border border-emerald-200 dark:border-emerald-500/20 p-4">
                <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase">
                  Following
                </p>
                <p className="text-2xl font-brak font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {githubStats.following}
                </p>
              </div>
              <div className="rounded-2xl bg-white dark:bg-black/30 border border-emerald-200 dark:border-emerald-500/20 p-4">
                <p className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase">
                  Developer Since
                </p>
                <p className="text-2xl font-brak font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  {new Date(githubStats.createdAt).getFullYear()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. Breakdown Insights Grid (6 Dynamic Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1: Halaman Teratas */}
          <BreakdownCard
            title={locale === 'id' ? 'Halaman Teratas' : 'Top Pages'}
            icon={FiFileText}
            items={telemetry.topPages}
            barColor="bg-indigo-500/20"
            accentBadgeColor="bg-indigo-500/10 text-indigo-400"
          />

          {/* Card 2: Referensi Teratas */}
          <BreakdownCard
            title={locale === 'id' ? 'Referensi Teratas' : 'Top Referrers'}
            icon={FiShare2}
            items={telemetry.topReferrers}
            barColor="bg-blue-500/20"
            accentBadgeColor="bg-blue-500/10 text-blue-400"
          />

          {/* Card 3: Negara Teratas */}
          <BreakdownCard
            title={locale === 'id' ? 'Negara Teratas' : 'Top Countries'}
            icon={FiGlobe}
            items={telemetry.topCountries}
            barColor="bg-emerald-500/20"
            accentBadgeColor="bg-emerald-500/10 text-emerald-400"
          />

          {/* Card 4: Browser */}
          <BreakdownCard
            title={locale === 'id' ? 'Browser Klien' : 'Client Browsers'}
            icon={FiChrome}
            items={telemetry.topBrowsers}
            barColor="bg-cyan-500/20"
            accentBadgeColor="bg-cyan-500/10 text-cyan-400"
          />

          {/* Card 5: Sistem Operasi */}
          <BreakdownCard
            title={locale === 'id' ? 'Sistem Operasi' : 'Operating Systems'}
            icon={FiHardDrive}
            items={telemetry.topOS}
            barColor="bg-purple-500/20"
            accentBadgeColor="bg-purple-500/10 text-purple-400"
          />

          {/* Card 6: Perangkat */}
          <BreakdownCard
            title={locale === 'id' ? 'Tipe Perangkat' : 'Device Types'}
            icon={FiSmartphone}
            items={telemetry.topDevices}
            barColor="bg-amber-500/20"
            accentBadgeColor="bg-amber-500/10 text-amber-400"
          />
        </div>
      </Container>
    </div>
  );
}

function BreakdownCard({
  title,
  icon: Icon,
  items,
  barColor,
  accentBadgeColor,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: BreakdownItem[];
  barColor: string;
  accentBadgeColor: string;
}) {
  return (
    <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-6 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2.5 mb-5">
          <Icon className="h-4 w-4 text-neutral-400" />
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">{title}</h3>
        </div>

        <div className="space-y-3">
          {items.map((item) => {
            const pctVal = parseFloat(item.percentage.replace('%', ''));
            return (
              <div key={item.label} className="relative group">
                {/* Visual percentage progress fill bar behind text */}
                <div
                  className={cn('absolute inset-0 rounded-xl transition-all duration-300', barColor)}
                  style={{ width: `${Math.min(100, Math.max(6, pctVal))}%` }}
                />

                {/* Content row */}
                <div className="relative z-10 flex items-center justify-between px-3 py-2 text-xs md:text-sm font-medium">
                  <div className="flex items-center gap-2 truncate max-w-[65%]">
                    {item.icon && <span className="text-sm">{item.icon}</span>}
                    <span className="text-neutral-800 dark:text-neutral-200 truncate font-mono">
                      {item.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      {typeof item.count === 'number' ? item.count.toLocaleString('en-US') : item.count}
                    </span>
                    <span
                      className={cn(
                        'rounded-md px-1.5 py-0.5 text-[11px] font-bold',
                        accentBadgeColor
                      )}
                    >
                      {item.percentage}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
