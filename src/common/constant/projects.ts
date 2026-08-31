export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  stacks: string[];
  isFeatured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  detail: string;
  accentColor?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'gegares',
    title: 'Platform E-Commerce GEGARES',
    description:
      'Aplikasi e-commerce fungsional produk kuliner tradisional dengan katalog interaktif, keranjang belanja, checkout, dan manajemen inventaris.',
    image: '/images/gegares-live.png',
    stacks: ['Laravel 12', 'MySQL', 'Tailwind CSS', 'PHP', 'Blade'],
    isFeatured: true,
    demoUrl: 'https://gegares.shop',
    githubUrl: 'https://github.com/greedykid',
    detail:
      'GEGARES adalah platform e-commerce yang dibangun penuh sebagai luaran Penulisan Ilmiah tingkat sarjana. Aplikasi ini memungkinkan penjualan produk kuliner tradisional secara online dengan alur belanja lengkap mulai dari katalog, keranjang, hingga checkout.\n\nDibangun menggunakan arsitektur MVC Laravel dengan database relasional MySQL, serta UI modern responsif berbasis Tailwind CSS.',
    accentColor: '#6366f1',
  },
  {
    id: 'berkah-mulia',
    title: 'Katalog Digital Berkah Mulia',
    description:
      'Website katalog digital aktif produk pakaian bayi & anak berbasis Laravel dan MySQL, dengan klasifikasi kategori bertingkat dan UI/UX responsif.',
    image: '/images/berkahmulia-live.png',
    stacks: ['Laravel', 'MySQL', 'Tailwind CSS', 'Blade'],
    isFeatured: true,
    demoUrl: 'https://bmberkahmulia.com',
    githubUrl: 'https://github.com/greedykid/berkahmulia',
    detail:
      'Katalog Digital Berkah Mulia adalah website katalog yang sudah live dan aktif digunakan untuk menampilkan produk pakaian bayi & anak. Dibangun dengan Laravel dan MySQL, dilengkapi klasifikasi kategori bertingkat agar pencarian produk lebih mudah.',
    accentColor: '#10b981',
  },
  {
    id: 'portfolio-v3',
    title: 'Modern Developer Portfolio V3',
    description:
      'Personal portfolio website dengan draggable tech stack badges, interactive GitHub contribution heatmap, auto-sliding blog, dan dark/light mode.',
    image: '/images/portfolio-v3.png',
    stacks: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    isFeatured: true,
    demoUrl: 'https://rizkiarbiansyah.vercel.app',
    githubUrl: 'https://github.com/greedykid/portofolio-v3',
    detail:
      'Portfolio generasi ketiga yang dirancang dengan standar visual terkini. Memiliki fitur interaktif mulai dari kanvas kembang api, pointer drag engine dengan collision physics, hingga carousel artikel horizontal.',
    accentColor: '#8b5cf6',
  },
  {
    id: 'homora-app',
    title: 'Homora - Smart Living Hub',
    description:
      'Dashboard manajemen IoT dan automasi rumah pintar dengan visualisasi konsumsi daya real-time dan remote room controllers.',
    image: '/images/homora.png',
    stacks: ['React Native', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    isFeatured: true,
    demoUrl: 'https://homora.dev',
    githubUrl: 'https://github.com/greedykid',
    detail:
      'Aplikasi mobile dan web hub pintar untuk mengendalikan perangkat IoT rumah tangga secara real-time melalui websocket.',
    accentColor: '#06b6d4',
  },
  {
    id: 'next-starter',
    title: 'NextJS + Tailwind Starter Template',
    description:
      'Template starter Next.js 15 yang siap pakai dengan konfigurasi ESLint, Prettier, Tailwind CSS, TypeScript, SEO meta tags, dan dark mode.',
    image: '/images/starter.png',
    stacks: ['Next.js', 'TypeScript', 'TailwindCSS', 'Jest'],
    isFeatured: false,
    demoUrl: 'https://next-starter.vercel.app',
    githubUrl: 'https://github.com/greedykid',
    detail:
      'Boilerplate modern untuk mempercepat inisiasi proyek web dengan standar arsitektur clean code dan reusable design system.',
    accentColor: '#ec4899',
  },
  {
    id: 'pos-log-dispatcher',
    title: 'POS Log Dispatcher Platform',
    description:
      'Sistem log monitoring dan dispatcher point-of-sale enterprise untuk mengelola ribuan transaksi dan alert anomali otomatis.',
    image: '/images/pos-dispatcher.png',
    stacks: ['React', 'Express', 'PostgreSQL', 'Docker'],
    isFeatured: false,
    demoUrl: 'https://poslog.dev',
    githubUrl: 'https://github.com/greedykid',
    detail:
      'Solusi backend dan visual dashboard untuk memantau integritas data kasir dan sync database relasional multi-cabang.',
    accentColor: '#f59e0b',
  },
];
