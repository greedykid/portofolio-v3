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
}

export const PROJECTS: Project[] = [
  {
    id: 'gegares',
    title: 'Platform E-Commerce GEGARES',
    description:
      'Aplikasi e-commerce fungsional produk kuliner tradisional sebagai luaran Penulisan Ilmiah. Backend MVC Laravel, database MySQL, dan dokumentasi UML/ERD.',
    image: '/images/gegares-live.png',
    stacks: ['Laravel 12', 'MySQL', 'Tailwind CSS', 'PHP', 'Blade'],
    isFeatured: true,
    demoUrl: 'https://gegares.shop',
    githubUrl: 'https://github.com/greedykid',
    detail:
      'GEGARES adalah platform e-commerce yang dibangun penuh sebagai luaran Penulisan Ilmiah tingkat sarjana. Aplikasi ini memungkinkan penjualan produk kuliner tradisional secara online dengan alur belanja lengkap mulai dari katalog, keranjang, hingga checkout.\n\nDibangun menggunakan arsitektur MVC Laravel dengan database relasional MySQL, serta UI modern responsif berbasis Tailwind CSS. Seluruh perancangan sistem didokumentasikan lengkap melalui Use Case, Activity, Sequence Diagram, dan ERD.',
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
      'Katalog Digital Berkah Mulia adalah website katalog yang sudah live dan aktif digunakan untuk menampilkan produk pakaian bayi & anak. Dibangun dengan Laravel dan MySQL, dilengkapi klasifikasi kategori bertingkat agar pencarian produk lebih mudah.\n\nFokus pada performa loading yang cepat, efisiensi aset, serta UI/UX yang responsif di berbagai perangkat. Kode dikelola dengan version control di GitHub.',
  },
];
