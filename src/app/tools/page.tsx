'use client';

import { useState, useMemo } from 'react';
import Container from '@/common/components/elements/Container';
import { useLanguage } from '@/common/context/LanguageContext';
import {
  FiSearch,
  FiCode,
  FiDatabase,
  FiHardDrive,
  FiWifi,
  FiTerminal,
  FiLayers,
  FiCheckCircle,
} from 'react-icons/fi';
import {
  SiLaravel,
  SiPhp,
  SiMysql,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiGit,
  SiGithub,
  SiPostman,
  SiCisco,
  SiLinux,
  SiWindows11,
  SiNodedotjs,
} from 'react-icons/si';
import { cn } from '@/lib/utils';

interface ToolItem {
  name: string;
  category: 'webdev' | 'database' | 'itsupport' | 'networking' | 'devtools';
  role: string;
  proficiency: 'Expert' | 'Advanced' | 'Proficient';
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  tags: string[];
}

const TOOLS_DATA: ToolItem[] = [
  // 1. Web Development
  {
    name: 'Laravel Framework',
    category: 'webdev',
    role: 'Backend MVC & RESTful API',
    proficiency: 'Expert',
    icon: SiLaravel,
    description: 'Framework utama untuk platform GEGARES dan katalog digital Berkah Mulia. Menguasai Eloquent ORM, Blade templating, authentication, dan security middleware.',
    tags: ['MVC', 'Backend', 'PHP', 'Security'],
  },
  {
    name: 'PHP',
    category: 'webdev',
    role: 'Server-Side Programming',
    proficiency: 'Expert',
    icon: SiPhp,
    description: 'Bahasa pemrograman server-side fundamental untuk penanganan logika bisnis, konektivitas database relasional, dan arsitektur backend dinamis.',
    tags: ['Server', 'OOP', 'Backend'],
  },
  {
    name: 'MySQL & Relational DB',
    category: 'database',
    role: 'Database Schema & Query Optimization',
    proficiency: 'Expert',
    icon: SiMysql,
    description: 'Perancangan skema database ternormalisasi (3NF), indexing kunci transaksi, relational joins, dan optimasi query data transaksi berskala besar.',
    tags: ['Database', 'SQL', 'Normalization', 'ERD'],
  },
  {
    name: 'Tailwind CSS',
    category: 'webdev',
    role: 'Modern Utility-First Styling',
    proficiency: 'Expert',
    icon: SiTailwindcss,
    description: 'Pembangunan antarmuka responsif (Mobile-First), dark mode interaktif, animasi mikro, dan sistem desain modern yang konsisten.',
    tags: ['Frontend', 'CSS', 'UI/UX', 'Responsive'],
  },
  {
    name: 'Next.js 15 & React',
    category: 'webdev',
    role: 'Modern React Framework',
    proficiency: 'Advanced',
    icon: SiNextdotjs,
    description: 'Arsitektur App Router, Server Components, dynamic OpenGraph image generation, dan optimasi SEO terpadu.',
    tags: ['Frontend', 'Fullstack', 'SSR', 'SEO'],
  },
  {
    name: 'TypeScript & JavaScript',
    category: 'webdev',
    role: 'Type-Safe Logic & Interactivity',
    proficiency: 'Advanced',
    icon: SiTypescript,
    description: 'Pengembangan logika aplikasi yang type-safe, asynchronous data fetching, dan manipulasi DOM modern.',
    tags: ['Programming', 'Frontend', 'TypeScript'],
  },
  {
    name: 'HTML5 & Semantic Web',
    category: 'webdev',
    role: 'Markup & Accessibility',
    proficiency: 'Expert',
    icon: SiHtml5,
    description: 'Penyusunan markup web semantik yang terstandarisasi, aksesibilitas tinggi (a11y), dan kompatibilitas peramban luas.',
    tags: ['Frontend', 'Standard', 'Semantic'],
  },
  {
    name: 'CSS3 & Modern Layouts',
    category: 'webdev',
    role: 'Styling & Grid/Flexbox Systems',
    proficiency: 'Expert',
    icon: SiCss3,
    description: 'Flexbox, CSS Grid, keyframes animation, CSS variables, dan estetika visual modern.',
    tags: ['Styling', 'Flexbox', 'Grid'],
  },

  // 2. IT Support & Hardware
  {
    name: 'Hardware Troubleshooting',
    category: 'itsupport',
    role: 'Diagnostic & Component Repair',
    proficiency: 'Expert',
    icon: FiHardDrive,
    description: 'Diagnosa kerusakan perangkat keras (PC Desktop/Laptop), penggantian komponen RAM/SSD/PSU/Motherboard, dan maintenance rutin.',
    tags: ['Hardware', 'Maintenance', 'Assembly'],
  },
  {
    name: 'Operating System Deployment',
    category: 'itsupport',
    role: 'Windows & Linux Installation',
    proficiency: 'Expert',
    icon: SiWindows11,
    description: 'Instalasi, konfigurasi, partisi drive, dan penyesuaian sistem operasi (Windows 10/11, Ubuntu/Debian Linux) untuk produktivitas optimal.',
    tags: ['OS', 'Windows', 'Linux', 'Setup'],
  },
  {
    name: 'Peripherals & Printer Care',
    category: 'itsupport',
    role: 'Device Maintenance & Drivers',
    proficiency: 'Expert',
    icon: FiLayers,
    description: 'Instalasi driver printer (Epson, Canon, HP), pemeliharaan berkala, konfigurasi network printer sharing, dan penanganan error perangkat.',
    tags: ['Printer', 'Drivers', 'Peripherals'],
  },

  // 3. Networking & Infrastructure
  {
    name: 'Jaringan Komputer (LAN/Wi-Fi)',
    category: 'networking',
    role: 'Network Setup & Crimping',
    proficiency: 'Expert',
    icon: FiWifi,
    description: 'Pemasangan kabel UTP (crimping RJ-45 Straight/Cross T568B), konfigurasi access point/router Wi-Fi, dan pembagian IP Address.',
    tags: ['LAN', 'Cabling', 'Wi-Fi', 'TCP/IP'],
  },
  {
    name: 'Cisco Router Configuration',
    category: 'networking',
    role: 'Routing & Subnetting Basics',
    proficiency: 'Proficient',
    icon: SiCisco,
    description: 'Konfigurasi dasar Cisco Router CLI, subnetting IPv4 (VLSM/CIDR), routing static/default, dan simulasi topologi jaringan Cisco Packet Tracer.',
    tags: ['Cisco', 'Routing', 'Subnetting', 'CLI'],
  },
  {
    name: 'Tailscale & WireGuard VPN',
    category: 'networking',
    role: 'Zero-Config Mesh Networking',
    proficiency: 'Advanced',
    icon: FiWifi,
    description: 'Konfigurasi jaringan mesh VPN aman untuk koneksi remote antar komputer lokal, server staging, dan workstation tanpa port forwarding.',
    tags: ['VPN', 'Remote Access', 'Mesh'],
  },

  // 4. Dev Tools & Terminal
  {
    name: 'Antigravity IDE & AI Pair Programming',
    category: 'devtools',
    role: 'AI Coding Workspace',
    proficiency: 'Expert',
    icon: FiCode,
    description: 'Lingkungan pengembangan cerdas berbantu AI untuk akselerasi coding, refactoring, otomasi pengujian, dan pair programming mutakhir.',
    tags: ['IDE', 'AI', 'Workflow'],
  },
  {
    name: 'Visual Studio Code',
    category: 'devtools',
    role: 'Primary Code Editor',
    proficiency: 'Expert',
    icon: FiCode,
    description: 'Konfigurasi workspace produktif dengan linter ESLint, Prettier, ekstensi Laravel Blade, Tailwind IntelliSense, dan GitLens.',
    tags: ['Editor', 'Extensions', 'Productivity'],
  },
  {
    name: 'Windows Terminal + PowerShell 7',
    category: 'devtools',
    role: 'Modern CLI Shell',
    proficiency: 'Expert',
    icon: FiTerminal,
    description: 'Shell baris perintah modern dengan Starship prompt kustom, Git integration, dan skrip otomasi workflow.',
    tags: ['CLI', 'PowerShell', 'Terminal'],
  },
  {
    name: 'Git & GitHub Version Control',
    category: 'devtools',
    role: 'Repository & Branch Management',
    proficiency: 'Expert',
    icon: SiGithub,
    description: 'Manajemen branch, commit terstandarisasi, pull requests, resolving merge conflicts, dan kolaborasi repositori GitHub (@greedykid).',
    tags: ['VCS', 'Git', 'GitHub', 'Collaboration'],
  },
  {
    name: 'XAMPP Local Server',
    category: 'devtools',
    role: 'Apache, PHP & MariaDB Environment',
    proficiency: 'Expert',
    icon: FiDatabase,
    description: 'Lingkungan server lokal untuk pengembangan web berbasis PHP dan manajemen basis data MySQL via phpMyAdmin.',
    tags: ['Local Server', 'Apache', 'MySQL', 'PHP'],
  },
  {
    name: 'Postman & API Client',
    category: 'devtools',
    role: 'REST API Testing & Validation',
    proficiency: 'Advanced',
    icon: SiPostman,
    description: 'Pengujian endpoint RESTful API, validasi request payload, inspeksi header respon HTTP, dan dokumentasi API schema.',
    tags: ['API', 'Testing', 'JSON', 'REST'],
  },
];

export default function ToolsPage() {
  const { locale } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const CATEGORIES = [
    { id: 'all', label: locale === 'id' ? 'Semua Tools' : 'All Tools', count: TOOLS_DATA.length },
    { id: 'webdev', label: 'Web Development', count: TOOLS_DATA.filter((t) => t.category === 'webdev').length },
    { id: 'database', label: 'Database & Data', count: TOOLS_DATA.filter((t) => t.category === 'database').length },
    { id: 'itsupport', label: 'IT Support & Hardware', count: TOOLS_DATA.filter((t) => t.category === 'itsupport').length },
    { id: 'networking', label: 'Jaringan & Network', count: TOOLS_DATA.filter((t) => t.category === 'networking').length },
    { id: 'devtools', label: 'Dev Tools & Terminal', count: TOOLS_DATA.filter((t) => t.category === 'devtools').length },
  ];

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight">
              {locale === 'id' ? 'Tools & Keahlian Teknis' : 'Tools & Technical Skills'}
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 text-xs font-bold text-primary dark:text-indigo-400">
              {TOOLS_DATA.length} Kompetensi
            </span>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-2xl">
            {locale === 'id'
              ? 'Daftar teknologi pengembangan web (Laravel, PHP, MySQL, Tailwind CSS) dan perangkat kerja IT Support, Troubleshooting, serta Jaringan yang saya andalkan.'
              : 'Web development stacks (Laravel, PHP, MySQL, Tailwind CSS) alongside IT Support, Hardware Troubleshooting & Networking competencies.'}
          </p>
        </div>

        {/* Search & Category Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'rounded-2xl px-3.5 py-1.5 text-xs md:text-sm font-bold transition-all shadow-sm cursor-pointer',
                  selectedCategory === cat.id
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 scale-105 shadow-md'
                    : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300/80 dark:border-white/10 hover:bg-neutral-100 dark:hover:bg-white/10'
                )}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" />
            <input
              type="text"
              placeholder={locale === 'id' ? 'Cari tools, skill, stack...' : 'Search tools or skills...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] pl-10 pr-4 py-2 text-xs md:text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Tools Cards Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.name}
                  className="group relative flex flex-col justify-between rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-6 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/60"
                >
                  <div>
                    {/* Header: Icon & Proficiency Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-500/20 text-primary dark:text-indigo-400 shadow-sm transition-transform group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>

                      <span
                        className={cn(
                          'rounded-lg border px-2.5 py-0.5 font-mono text-[11px] font-bold',
                          tool.proficiency === 'Expert'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : tool.proficiency === 'Advanced'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                            : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                        )}
                      >
                        {tool.proficiency}
                      </span>
                    </div>

                    {/* Title & Role */}
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                      {tool.role}
                    </p>

                    {/* Description */}
                    <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                      {tool.description}
                    </p>
                  </div>

                  {/* Tags Bottom */}
                  <div className="border-t border-neutral-200 dark:border-white/10 pt-4 flex flex-wrap gap-1.5">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 px-2 py-0.5 text-[11px] font-medium text-neutral-600 dark:text-neutral-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-neutral-300 dark:border-white/10 p-12 text-center">
            <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
              {locale === 'id' ? 'Tidak ada tools atau keahlian yang cocok dengan pencarian Anda.' : 'No tools or skills found matching your search.'}
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
