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
    title: 'Platform E-Commerce "GEGARES"',
    description:
      'Aplikasi e-commerce fungsional produk kuliner tradisional dengan katalog interaktif, keranjang belanja, checkout, dan manajemen inventaris sebagai luaran Penulisan Ilmiah Universitas Gunadarma.',
    image: '/images/gegares-live.png',
    stacks: ['Laravel 12', 'MySQL', 'Tailwind CSS', 'PHP', 'Blade'],
    isFeatured: true,
    demoUrl: 'https://gegares.shop',
    githubUrl: 'https://github.com/greedykid',
    detail:
      'GEGARES adalah platform e-commerce yang dibangun penuh sebagai implementasi dan luaran resmi proyek Penulisan Ilmiah tingkat sarjana di Universitas Gunadarma.\n\nFitur & Arsitektur:\n- Mengembangkan arsitektur backend MVC menggunakan framework Laravel dan perancangan skema database relasional MySQL.\n- Optimasi query data transaksi dan inventaris produk.\n- Antarmuka modern, interaktif, dan responsif dengan Tailwind CSS.\n- Dokumentasi perancangan sistem komprehensif meliputi Use Case Diagram, Activity Diagram, Sequence Diagram, dan Entity Relationship Diagram (ERD).',
    accentColor: '#6366f1',
  },
  {
    id: 'berkah-mulia',
    title: 'Website Katalog Digital "Berkah Mulia"',
    description:
      'Website katalog digital aktif (bmberkahmulia.com) untuk produk pakaian bayi dan anak berbasis framework Laravel dan database MySQL dengan klasifikasi kategori bertingkat.',
    image: '/images/berkahmulia-live.png',
    stacks: ['Laravel', 'MySQL', 'Tailwind CSS', 'Blade'],
    isFeatured: true,
    demoUrl: 'https://bmberkahmulia.com',
    githubUrl: 'https://github.com/greedykid/berkahmulia',
    detail:
      'Berkah Mulia adalah website katalog digital aktif yang dapat diakses publik pada domain bmberkahmulia.com.\n\nFitur & Arsitektur:\n- Merancang, membangun, dan mendeploy website katalog digital aktif untuk produk pakaian bayi dan anak berbasis framework Laravel dan database MySQL.\n- Menyusun perancangan kebutuhan sistem dan mengimplementasikan arsitektur navigasi katalog dengan klasifikasi kategori produk bertingkat.\n- Mengoptimalkan performa kecepatan loading halaman, efisiensi aset, dan responsivitas tampilan antarmuka (UI/UX) pada berbagai perangkat.\n- Manajemen repositori dan version control di GitHub (github.com/greedykid/berkahmulia).',
    accentColor: '#10b981',
  },
];
