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
} from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface SetupItem {
  category: 'hardware' | 'software' | 'peripherals';
  name: string;
  role: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

const SETUP_ITEMS: SetupItem[] = [
  // Hardware
  {
    category: 'hardware',
    name: 'Workstation Laptop',
    role: 'Primary Dev Machine',
    description: 'Intel Core i5, 16GB Dual-Channel RAM, 512GB NVMe M.2 SSD untuk multitasking dan kompilasi Next.js & Laravel yang cepat.',
    icon: FiCpu,
    tag: 'Hardware',
  },
  {
    category: 'hardware',
    name: 'Secondary Monitor 24" IPS FHD',
    role: 'Display & Multitasking',
    description: 'Monitor IPS 75Hz dengan color calibration akurat untuk preview UI/UX, database inspection, dan split terminal.',
    icon: FiMonitor,
    tag: 'Hardware',
  },
  {
    category: 'hardware',
    name: 'External Storage & Backup',
    role: 'Data Redundancy',
    description: '1TB External SSD & High-Speed MicroSD untuk backup database lokal, environment docker, dan dokumen proyek.',
    icon: FiHardDrive,
    tag: 'Hardware',
  },

  // Peripherals
  {
    category: 'peripherals',
    name: 'Mechanical Keyboard 75%',
    role: 'Typing Comfort',
    description: 'Custom lubed linear switches (Gateron Yellow) dengan PBT keycaps untuk pengalaman mengetik kode yang presisi dan empuk.',
    icon: FiLayers,
    tag: 'Peripherals',
  },
  {
    category: 'peripherals',
    name: 'Wireless Ergonomic Mouse',
    role: 'Navigation',
    description: 'Mouse nirkabel presisi tinggi dengan thumb rest dan tombol makro untuk efisiensi navigasi window.',
    icon: FiLayers,
    tag: 'Peripherals',
  },
  {
    category: 'peripherals',
    name: 'ANC Wireless Headset & TWS',
    role: 'Focus & Meetings',
    description: 'Active Noise Cancellation untuk menjaga fokus saat sesi deep work dan meeting kolaborasi online.',
    icon: FiHeadphones,
    tag: 'Peripherals',
  },

  // Software & Tools
  {
    category: 'software',
    name: 'Visual Studio Code',
    role: 'Primary Code Editor',
    description: 'Tema Catppuccin Mocha / One Dark Pro, font JetBrains Mono with Ligatures, ESLint, Tailwind CSS IntelliSense, Prettier.',
    icon: FiCode,
    tag: 'Editor',
  },
  {
    category: 'software',
    name: 'Windows Terminal + PowerShell 7',
    role: 'CLI & Shell Environment',
    description: 'Dikonfigurasi dengan Starship prompt, git integration, zoxide, dan WSL2 Ubuntu environment.',
    icon: FiTerminal,
    tag: 'Terminal',
  },
  {
    category: 'software',
    name: 'MySQL Workbench & DBeaver',
    role: 'Database Management',
    description: 'Tools visual untuk manajemen query relasional, visualisasi ERD schema, dan benchmarking performa database.',
    icon: FiDatabase,
    tag: 'Database',
  },
  {
    category: 'software',
    name: 'Postman & Insomnia',
    role: 'API Development & Testing',
    description: 'Pengujian endpoint RESTful API, validasi request payload, dan dokumentasi API schema.',
    icon: FiCode,
    tag: 'API Tool',
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
              ? 'Daftar perangkat keras (hardware), software, dan tools harian yang saya andalkan untuk produktivitas.'
              : 'The hardware, software, and development tools I use daily for engineering and productivity.'}
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
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 scale-105'
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
                    <span className="rounded-lg bg-neutral-100 dark:bg-white/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">
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
