'use client';

import { useState } from 'react';
import Container from '@/common/components/elements/Container';
import { useLanguage } from '@/common/context/LanguageContext';
import {
  FiMonitor,
  FiCpu,
  FiHardDrive,
  FiCode,
  FiTerminal,
  FiDatabase,
  FiHeadphones,
  FiLayers,
  FiCamera,
  FiVolume2,
  FiShield,
  FiGitBranch,
} from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface SetupItem {
  category: 'hardware' | 'software' | 'peripherals';
  name: string;
  role: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  badgeColor?: string;
}

const SETUP_ITEMS: SetupItem[] = [
  // 1. Hardware
  {
    category: 'hardware',
    name: 'Custom Desktop PC (DESKTOP-IT0EF0A)',
    role: 'Primary Workstation',
    description:
      'Intel Core i5-3470 @ 3.20GHz (Up to 3.60 GHz), 16.0 GB RAM, NVIDIA GeForce GTX 750 Ti (2 GB VRAM), Triple SSD: ADATA SU650 (112 GB) + SSD (238 GB) + Msft Virtual Disk.',
    icon: FiCpu,
    tag: 'Desktop PC',
    badgeColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-500/20',
  },
  {
    category: 'hardware',
    name: 'Lenovo ThinkPad T430',
    role: 'Secondary & Mobile Machine',
    description:
      'Laptop tangguh seri ThinkPad dengan keyboard legendaris dan durabilitas tinggi untuk pengujian sistem operasi Linux, mobile development, dan remote debugging.',
    icon: FiCpu,
    tag: 'Laptop',
    badgeColor: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-500/20',
  },
  {
    category: 'hardware',
    name: 'AOC 24V2H (24" IPS FHD)',
    role: 'Primary Display Monitor',
    description:
      'Monitor frameless 23.8 inci panel IPS Full HD (1920x1080) dengan refresh rate 75Hz dan sudut pandang 178° untuk visual tajam dan multitasking yang nyaman.',
    icon: FiMonitor,
    tag: 'Monitor',
    badgeColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-500/20',
  },
  {
    category: 'hardware',
    name: 'Hikvision Web Camera',
    role: 'Video Conference & Meetings',
    description:
      'Kamera video HD jernih untuk meeting daring, presentasi proyek, technical discussions, dan video call profesional.',
    icon: FiCamera,
    tag: 'Webcam',
    badgeColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-500/20',
  },

  // 2. Peripherals
  {
    category: 'peripherals',
    name: 'Royal Kludge RK71',
    role: 'Mechanical Keyboard (71-Keys)',
    description:
      'Keyboard mekanikal layout ringkas 71-keys dengan konektivitas ganda dan tactile switches untuk kenyamanan mengetik kode berjam-jam.',
    icon: FiLayers,
    tag: 'Keyboard',
    badgeColor: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-500/20',
  },
  {
    category: 'peripherals',
    name: 'RYUNIX Zero MX0',
    role: 'Ergonomic Precision Mouse',
    description:
      'Mouse nirkabel responsif dan ergonomis dengan bobot ringan untuk navigasi workspace dan code editor yang presisi.',
    icon: FiLayers,
    tag: 'Mouse',
    badgeColor: 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-500/20',
  },
  {
    category: 'peripherals',
    name: 'Logitech Z120 Stereo Speakers',
    role: 'Desk Audio System',
    description:
      'Speaker stereo ringkas bertenaga USB dengan audio output jernih untuk kebutuhan multimedia dan audio setup harian.',
    icon: FiVolume2,
    tag: 'Speaker',
    badgeColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-500/20',
  },
  {
    category: 'peripherals',
    name: 'QCY ArcBuds Lite',
    role: 'Wireless TWS Earbuds',
    description:
      'TWS nirkabel dengan low latency dan isolasi suara optimal untuk sesi deep work dan fokus mendengarkan musik saat ngoding.',
    icon: FiHeadphones,
    tag: 'TWS Earbuds',
    badgeColor: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-500/20',
  },

  // 3. Software & Dev Tools
  {
    category: 'software',
    name: 'Windows 10 Pro (Atlas Tweak)',
    role: 'Optimized Operating System',
    description:
      'Sistem operasi 64-bit yang dioptimasi khusus dengan AtlasOS tweak untuk latensi rendah, efisiensi konsumsi CPU & RAM, serta performa komputasi maksimal.',
    icon: FiHardDrive,
    tag: 'Operating System',
    badgeColor: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-500/20',
  },
  {
    category: 'software',
    name: 'Antigravity IDE',
    role: 'Next-Gen Agentic AI Workspace',
    description:
      'IDE modern dengan integrasi AI mutakhir untuk pair-programming, otomasi workflow, dan akselerasi pengembangan software tingkat lanjut.',
    icon: FiCode,
    tag: 'AI IDE',
    badgeColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-500/20',
  },
  {
    category: 'software',
    name: 'Visual Studio Code',
    role: 'Primary Code Editor',
    description:
      'Editor utama untuk ekosistem React, Next.js, TypeScript, Tailwind CSS, dan PHP dengan konfigurasi ekstensi produktivitas lengkap.',
    icon: FiCode,
    tag: 'Editor',
    badgeColor: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-500/20',
  },
  {
    category: 'software',
    name: 'XAMPP Server Stack',
    role: 'Local Web & MySQL Database',
    description:
      'Paket server lokal (Apache, MySQL/MariaDB, PHP) untuk mengelola basis data relasional dan mengembangkan proyek Laravel (GEGARES & Berkah Mulia).',
    icon: FiDatabase,
    tag: 'Server & DB',
    badgeColor: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-500/20',
  },
  {
    category: 'software',
    name: 'Windows Terminal + PowerShell 7',
    role: 'CLI & Shell Environment',
    description:
      'Terminal modern multi-tab dengan PowerShell 7, Starship prompt, dan integrasi perintah CLI untuk produktivitas baris perintah.',
    icon: FiTerminal,
    tag: 'Terminal',
    badgeColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-500/20',
  },
  {
    category: 'software',
    name: 'Tailscale',
    role: 'Mesh VPN & Secure Remote Bridge',
    description:
      'Jaringan mesh VPN zero-config berbasis WireGuard untuk koneksi remote aman antar perangkat (PC, Laptop, dan staging environment).',
    icon: FiShield,
    tag: 'Networking',
    badgeColor: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-500/20',
  },
  {
    category: 'software',
    name: 'Git Bash',
    role: 'Version Control Environment',
    description:
      'CLI berbasis Unix untuk version control Git, manajemen branching, commit, dan kolaborasi repositori GitHub.',
    icon: FiGitBranch,
    tag: 'VCS Tool',
    badgeColor: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-500/20',
  },
];

export default function SetupPage() {
  const { locale } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'hardware' | 'software' | 'peripherals'>('all');

  const filteredItems = filter === 'all' ? SETUP_ITEMS : SETUP_ITEMS.filter((i) => i.category === filter);

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight mb-2">
            {locale === 'id' ? 'Setup Kerja' : 'My Workstation Setup'}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-xl">
            {locale === 'id'
              ? 'Spesifikasi perangkat keras (hardware), peripherals, dan software yang saya gunakan sehari-hari untuk rekayasa perangkat lunak & IT Support.'
              : 'The exact hardware specifications, peripherals, and software tools I rely on daily for software engineering & IT Support.'}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { key: 'all', label: locale === 'id' ? 'Semua Setup' : 'All Setup' },
            { key: 'hardware', label: 'Hardware' },
            { key: 'peripherals', label: 'Peripherals' },
            { key: 'software', label: 'Software & Dev Tools' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              className={cn(
                'rounded-2xl px-4 py-2 text-xs md:text-sm font-bold transition-all shadow-sm cursor-pointer',
                filter === key
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 scale-105 shadow-md'
                  : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300/80 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid of Setup Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="group relative flex flex-col justify-between rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-6 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-500/20 text-primary dark:text-indigo-400 shadow-sm transition-transform group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={cn(
                        'rounded-lg border px-2.5 py-0.5 font-mono text-[11px] font-bold',
                        item.badgeColor || 'bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-white/10'
                      )}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                    {item.role}
                  </p>
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
