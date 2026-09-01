'use client';

import Container from '@/common/components/elements/Container';
import { useLanguage } from '@/common/context/LanguageContext';
import {
  FiCpu,
  FiZap,
  FiLayout,
  FiVolume2,
  FiGlobe,
  FiCheckCircle,
} from 'react-icons/fi';

export default function BehindTheScenesPage() {
  const { locale } = useLanguage();

  const PILLARS = [
    {
      title: locale === 'id' ? 'Arsitektur Next.js 15 & TypeScript' : 'Next.js 15 & TypeScript Architecture',
      description:
        locale === 'id'
          ? 'Dibangun dengan Next.js App Router terkini untuk kompilasi ultra-cepat, strict TypeScript typing, dan arsitektur komponen modular yang scalable.'
          : 'Engineered on the Next.js App Router for blazing-fast builds, strict TypeScript type safety, and scalable modular component architectures.',
      icon: FiCpu,
      tag: 'Core Stack',
    },
    {
      title: locale === 'id' ? 'Web Audio API & Dynamic Physics' : 'Web Audio API & Dynamic Physics',
      description:
        locale === 'id'
          ? 'Badge teknologi di home page ditenagai synthesizer suara real-time berbasis Web Audio API dan algoritma collision physics saat di-drag.'
          : 'Interactive tech badges are backed by a real-time Web Audio API frequency oscillator and collision repulsion physics engine.',
      icon: FiVolume2,
      tag: 'Interactive',
    },
    {
      title: locale === 'id' ? 'Simulasi Kanvas Kembang Api' : 'Custom Canvas Particle Fireworks',
      description:
        locale === 'id'
          ? 'Di balik heatmap kontribusi terdapat render loop HTML5 Canvas dengan simulasi peluncuran roket dan partikel kembang api yang melayang anggun.'
          : 'Behind the GitHub contribution heatmap runs an optimized HTML5 Canvas loop simulating rocket trajectories and lingering particle bursts.',
      icon: FiZap,
      tag: 'Graphics',
    },
    {
      title: locale === 'id' ? 'Mesin Translasi Multibahasa (i18n)' : 'Zero-Dependency i18n Engine',
      description:
        locale === 'id'
          ? 'Sistem multibahasa instan antara Bahasa Indonesia dan English menggunakan custom React Context tanpa reload halaman dan tersimpan di localStorage.'
          : 'Seamless instant localization between Indonesian and English via a custom React Context engine with localStorage persistence.',
      icon: FiGlobe,
      tag: 'Localization',
    },
    {
      title: locale === 'id' ? 'Brutalist Design & Glassmorphism' : 'Brutalist Aesthetics & Dark Mode',
      description:
        locale === 'id'
          ? 'Memadukan estetika brutalist tebal (rounded corners, solid drop-shadows) dengan ambient nebula glow dan skema warna dark mode terkurasi.'
          : 'Blends bold brutalist surfaces (rounded cards, sharp offset shadows) with ambient nebula gradients and curated dark/light palettes.',
      icon: FiLayout,
      tag: 'Design System',
    },
    {
      title: locale === 'id' ? 'Optimasi SEO & Performa Maksimal' : '100/100 Lighthouse & SEO Benchmark',
      description:
        locale === 'id'
          ? 'Struktur HTML semantik, font preloading, dynamic Open Graph images, robots.txt, dan automated sitemap generation untuk visibilitas mesin pencari.'
          : 'Semantic HTML5, font optimization, dynamic Open Graph cards, automated sitemap.ts, and robots.txt for maximum search engine discovery.',
      icon: FiCheckCircle,
      tag: 'SEO & Web Vitals',
    },
  ];

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight mb-2">
            {locale === 'id' ? 'Di Balik Layar' : 'Behind the Scenes'}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-xl">
            {locale === 'id'
              ? 'Kisah teknis, keputusan arsitektur, dan filosofi rekayasa di balik pembuatan website portofolio ini.'
              : 'The technical story, architectural choices, and design philosophy behind building this portfolio.'}
          </p>
        </div>

        {/* Overview Hero Card */}
        <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-6 md:p-10 lg:p-12 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] mb-10 overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <span className="inline-block rounded-xl bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold text-primary dark:text-indigo-400">
              {locale === 'id' ? 'Visi & Rekayasa' : 'Vision & Engineering'}
            </span>
            <h2 className="text-2xl md:text-4xl font-brak font-bold text-neutral-900 dark:text-white tracking-tight">
              {locale === 'id'
                ? 'Membangun Portofolio Modern yang Hidup & Berkinerja Tinggi'
                : 'Crafting a Living, Interactive, and High-Performance Digital Space'}
            </h2>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed">
              {locale === 'id'
                ? 'Website ini bukan sekadar halaman biodata statis, melainkan sebuah showcase kemampuan rekayasa perangkat lunak modern. Dari interaktivitas drag-and-drop dengan feedback audio, simulasi kanvas partikel, sistem lokalisasi multibahasa, hingga optimasi aksesibilitas dan performa Core Web Vitals.'
                : 'This portfolio is crafted as a living testament to modern software engineering craftsmanship. From draggable audio-reactive physics badges to canvas particle simulations and zero-overhead internationalization.'}
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative flex flex-col justify-between rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-6 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/60"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-500/20 text-primary dark:text-indigo-400 shadow-sm transition-transform group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-lg bg-neutral-100 dark:bg-white/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-neutral-600 dark:text-neutral-300">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {pillar.description}
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
