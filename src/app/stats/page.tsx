'use client';

import { useState } from 'react';
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
} from 'react-icons/fi';
import { cn } from '@/lib/utils';

type TimeRange = '7d' | '30d' | '90d' | 'all';

interface BreakdownItem {
  label: string;
  count: string;
  percentage: string;
  icon?: string;
}

const STATS_DATA: Record<
  TimeRange,
  {
    pageviews: string;
    visitors: string;
    visits: string;
    bounceRate: string;
    avgTime: string;
    activeNow: string;
  }
> = {
  '7d': {
    pageviews: '2.4K',
    visitors: '620',
    visits: '890',
    bounceRate: '58.2%',
    avgTime: '2m 12s',
    activeNow: '1',
  },
  '30d': {
    pageviews: '7.8K',
    visitors: '1.9K',
    visits: '2.4K',
    bounceRate: '61.4%',
    avgTime: '2m 30s',
    activeNow: '2',
  },
  '90d': {
    pageviews: '12.6K',
    visitors: '2.8K',
    visits: '3.6K',
    bounceRate: '62.1%',
    avgTime: '2m 38s',
    activeNow: '0',
  },
  all: {
    pageviews: '17.5K',
    visitors: '3.6K',
    visits: '4.5K',
    bounceRate: '63.0%',
    avgTime: '2m 44s',
    activeNow: '0',
  },
};

const TOP_PAGES: BreakdownItem[] = [
  { label: '/', count: '5.0K', percentage: '40.7%' },
  { label: '/portfolio', count: '1.7K', percentage: '14.2%' },
  { label: '/tools', count: '1.0K', percentage: '8.2%' },
  { label: '/about', count: '849', percentage: '6.9%' },
  { label: '/blog', count: '804', percentage: '6.6%' },
  { label: '/links', count: '800', percentage: '6.5%' },
  { label: '/guestbook', count: '685', percentage: '5.6%' },
  { label: '/portal', count: '628', percentage: '5.1%' },
];

const TOP_REFERRERS: BreakdownItem[] = [
  { label: 'l.threads.com', count: '197', percentage: '23.0%' },
  { label: 'google.com', count: '188', percentage: '21.9%' },
  { label: 'l.instagram.com', count: '168', percentage: '19.6%' },
  { label: 'github.com', count: '156', percentage: '18.2%' },
  { label: 'facebook.com', count: '43', percentage: '5.0%' },
  { label: 'accounts.google.com', count: '32', percentage: '3.7%' },
  { label: 'bing.com', count: '22', percentage: '2.6%' },
  { label: 'm.facebook.com', count: '22', percentage: '2.6%' },
];

const TOP_COUNTRIES: BreakdownItem[] = [
  { label: 'Indonesia', count: '1.3K', percentage: '41.4%', icon: '🇮🇩' },
  { label: 'Singapore', count: '631', percentage: '20.7%', icon: '🇸🇬' },
  { label: 'United States', count: '586', percentage: '19.2%', icon: '🇺🇸' },
  { label: 'China', count: '199', percentage: '6.5%', icon: '🇨🇳' },
  { label: 'Philippines', count: '123', percentage: '4.0%', icon: '🇵🇭' },
  { label: 'India', count: '88', percentage: '2.9%', icon: '🇮🇳' },
  { label: 'Hong Kong', count: '55', percentage: '1.8%', icon: '🇭🇰' },
  { label: 'Australia', count: '39', percentage: '1.3%', icon: '🇦🇺' },
];

const TOP_BROWSERS: BreakdownItem[] = [
  { label: 'chrome', count: '2.7K', percentage: '76.6%' },
  { label: 'chromium-webview', count: '203', percentage: '5.8%' },
  { label: 'ios', count: '169', percentage: '4.9%' },
  { label: 'firefox', count: '121', percentage: '3.5%' },
  { label: 'edge-chromium', count: '104', percentage: '3.0%' },
  { label: 'instagram', count: '72', percentage: '2.1%' },
  { label: 'ios-webview', count: '65', percentage: '1.9%' },
  { label: 'samsung', count: '34', percentage: '1.0%' },
];

const TOP_OS: BreakdownItem[] = [
  { label: 'Windows 10', count: '1.6K', percentage: '45.5%' },
  { label: 'Mac OS', count: '814', percentage: '23.2%' },
  { label: 'Android OS', count: '529', percentage: '15.1%' },
  { label: 'iOS', count: '335', percentage: '9.5%' },
  { label: 'Linux', count: '213', percentage: '6.1%' },
  { label: 'Windows 7', count: '11', percentage: '0.3%' },
  { label: '(direct)', count: '6', percentage: '0.2%' },
  { label: 'BlackBerry OS', count: '1', percentage: '0.0%' },
];

const TOP_DEVICES: BreakdownItem[] = [
  { label: 'laptop', count: '1.9K', percentage: '54.3%' },
  { label: 'desktop', count: '735', percentage: '20.9%' },
  { label: 'mobile', count: '735', percentage: '20.9%' },
  { label: 'tablet', count: '133', percentage: '3.8%' },
];

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('all');
  const [hoveredPoint, setHoveredPoint] = useState<{
    month: string;
    views: number;
    sessions: number;
    x: number;
    y: number;
  } | null>(null);

  const currentStats = STATS_DATA[timeRange];

  // Chart data points
  const chartPoints = [
    { month: 'Dec 1', views: 3700, sessions: 380, xPercent: 5 },
    { month: 'Jan 1', views: 1800, sessions: 420, xPercent: 15 },
    { month: 'Feb 1', views: 1450, sessions: 440, xPercent: 25 },
    { month: 'Mar 1', views: 1500, sessions: 430, xPercent: 35 },
    { month: 'Apr 1', views: 1850, sessions: 520, xPercent: 47 },
    { month: 'May 1', views: 1950, sessions: 500, xPercent: 58 },
    { month: 'Jun 1', views: 1350, sessions: 340, xPercent: 68 },
    { month: 'Jul 1', views: 1380, sessions: 350, xPercent: 78 },
    { month: 'Aug 1', views: 1650, sessions: 420, xPercent: 88 },
    { month: 'Sep 1', views: 240, sessions: 90, xPercent: 96 },
  ];

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Header with Title and Range Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-10">
          <div>
            <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight mb-2">
              Statistik Situs
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
              Analitik dan insight traffic untuk rizkiarbiansyah.com.
            </p>
          </div>

          {/* Time range pill tabs */}
          <div className="flex items-center rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/5 p-1.5 self-start md:self-auto shadow-sm">
            {(
              [
                { id: '7d', label: '7d' },
                { id: '30d', label: '30d' },
                { id: '90d', label: '90d' },
                { id: 'all', label: 'Sepanjang Waktu' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTimeRange(tab.id)}
                className={cn(
                  'rounded-xl px-3.5 py-1.5 text-xs md:text-sm font-semibold transition-all cursor-pointer',
                  timeRange === tab.id
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-md'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. 6 Top Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 md:gap-4 mb-6 md:mb-8">
          {[
            { label: 'Tayangan Halaman', val: currentStats.pageviews, icon: FiEye },
            { label: 'Pengunjung', val: currentStats.visitors, icon: FiUsers },
            { label: 'Kunjungan', val: currentStats.visits, icon: FiCompass },
            { label: 'Rasio Pantul', val: currentStats.bounceRate, icon: FiPercent },
            { label: 'Waktu Rata-rata', val: currentStats.avgTime, icon: FiClock },
            { label: 'Aktif Sekarang', val: currentStats.activeNow, icon: FiZap, isLive: true },
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
          <div className="mb-4">
            <h2 className="text-base md:text-lg font-bold text-neutral-900 dark:text-white">
              Tayangan Halaman
            </h2>
          </div>

          {/* SVG Canvas Spline Chart */}
          <div className="relative w-full h-[260px] md:h-[320px]">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-neutral-400 font-mono">
              {[3800, 2850, 1900, 950, 0].map((val) => (
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
                d="M 50 15 Q 150 140, 250 170 T 470 140 T 680 190 T 880 160 L 960 280 L 960 295 L 50 295 Z"
                fill="url(#viewsGrad)"
              />
              <path
                d="M 50 15 Q 150 140, 250 170 T 470 140 T 680 190 T 880 160 L 960 280"
                fill="none"
                stroke="#6366f1"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Orange Sessions Area Fill & Path */}
              <path
                d="M 50 255 Q 150 250, 250 248 T 470 240 T 680 260 T 880 250 L 960 290 L 960 295 L 50 295 Z"
                fill="url(#sessionsGrad)"
              />
              <path
                d="M 50 255 Q 150 250, 250 248 T 470 240 T 680 260 T 880 250 L 960 290"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            {/* Interactive Points on Chart */}
            <div className="absolute inset-0 pl-10 pb-6 pointer-events-auto">
              {chartPoints.map((pt) => (
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
              {chartPoints.map((pt) => (
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
                <span>Tayangan Halaman:</span>
                <span>{hoveredPoint.views.toLocaleString('en-US')}</span>
              </p>
              <p className="flex items-center justify-between gap-4 font-semibold text-amber-400">
                <span>Sesi:</span>
                <span>{hoveredPoint.sessions.toLocaleString('en-US')}</span>
              </p>
            </div>
          )}

          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span>Sesi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
              <span>Tayangan Halaman</span>
            </div>
          </div>
        </div>

        {/* 3. Breakdown Insights Grid (2 Rows of 3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1: Halaman Teratas */}
          <BreakdownCard
            title="Halaman Teratas"
            icon={FiFileText}
            items={TOP_PAGES}
            barColor="bg-indigo-500/20"
            accentBadgeColor="bg-indigo-500/10 text-indigo-400"
          />

          {/* Card 2: Referensi Teratas */}
          <BreakdownCard
            title="Referensi Teratas"
            icon={FiShare2}
            items={TOP_REFERRERS}
            barColor="bg-blue-500/20"
            accentBadgeColor="bg-blue-500/10 text-blue-400"
          />

          {/* Card 3: Negara Teratas */}
          <BreakdownCard
            title="Negara Teratas"
            icon={FiGlobe}
            items={TOP_COUNTRIES}
            barColor="bg-emerald-500/20"
            accentBadgeColor="bg-emerald-500/10 text-emerald-400"
          />

          {/* Card 4: Browser */}
          <BreakdownCard
            title="Browser"
            icon={FiChrome}
            items={TOP_BROWSERS}
            barColor="bg-cyan-500/20"
            accentBadgeColor="bg-cyan-500/10 text-cyan-400"
          />

          {/* Card 5: Sistem Operasi */}
          <BreakdownCard
            title="Sistem Operasi"
            icon={FiHardDrive}
            items={TOP_OS}
            barColor="bg-purple-500/20"
            accentBadgeColor="bg-purple-500/10 text-purple-400"
          />

          {/* Card 6: Perangkat */}
          <BreakdownCard
            title="Perangkat"
            icon={FiSmartphone}
            items={TOP_DEVICES}
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
                  className={cn('absolute inset-0 rounded-xl transition-all', barColor)}
                  style={{ width: `${Math.min(100, Math.max(5, pctVal))}%` }}
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
                      {item.count}
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
