export interface Experience {
  role: string;
  company: string;
  companyLegalName: string;
  location: string;
  startDate: string;
  endDate: string | null;
  type: string;
  locationType: string;
  responsibilities: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    role: 'Pengembang Web & Peneliti',
    company: 'Platform E-Commerce "GEGARES"',
    companyLegalName: 'Universitas Gunadarma (Proyek Penulisan Ilmiah)',
    location: 'Jakarta, Indonesia',
    startDate: '2025-09-01',
    endDate: '2026-02-01',
    type: 'Academic Project',
    locationType: 'On-site',
    responsibilities: [
      'Merancang dan membangun aplikasi e-commerce fungsional khusus produk kuliner tradisional sebagai implementasi dan luaran resmi proyek Penulisan Ilmiah tingkat sarjana.',
      'Mengembangkan arsitektur backend MVC menggunakan Laravel, merancang skema database relasional MySQL, serta mengoptimalkan query data transaksi dan inventaris produk.',
      'Membangun antarmuka modern, interaktif, dan responsif dengan Tailwind CSS guna memberikan kemudahan navigasi serta alur transaksi yang efisien.',
      'Menyusun dokumentasi perancangan sistem secara komprehensif meliputi Use Case Diagram, Activity Diagram, Sequence Diagram, dan Entity Relationship Diagram (ERD).',
    ],
  },
  {
    role: 'Pengembang Web',
    company: 'Website Katalog Digital "Berkah Mulia"',
    companyLegalName: 'bmberkahmulia.com',
    location: 'Jakarta, Indonesia',
    startDate: '2026-06-01',
    endDate: null,
    type: 'Freelance',
    locationType: 'Remote',
    responsibilities: [
      'Merancang, membangun, dan mendeploy website katalog digital aktif (bmberkahmulia.com) untuk produk pakaian bayi dan anak berbasis framework Laravel dan database MySQL.',
      'Menyusun perancangan kebutuhan sistem dan mengimplementasikan arsitektur navigasi katalog dengan klasifikasi kategori produk bertingkat.',
      'Mengoptimalkan performa kecepatan loading halaman, efisiensi aset, dan responsivitas tampilan antarmuka (UI/UX) pada berbagai perangkat.',
      'Mengelola version control dan kolaborasi kode pada repositori GitHub (github.com/greedykid/berkahmulia).',
    ],
  },
];

export interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  score: string;
  bullets: string[];
}

export const EDUCATION: Education[] = [
  {
    degree: 'Sarjana (S1) Sistem Informasi',
    institution: 'Universitas Gunadarma',
    startDate: '2022-09-01',
    endDate: '2026-02-01',
    score: 'IPK 3.58 / 4.00 (Lulus)',
    bullets: [
      'Mata Kuliah Utama: Pemrograman Web, Basis Data Relasional, Rekayasa Perangkat Lunak, Analisis & Perancangan Sistem Informasi, Jaringan Komputer, Keamanan Sistem Informasi.',
      'Menyelesaikan Proyek Penulisan Ilmiah E-Commerce "GEGARES" berbasis Laravel 12, MySQL, dan Tailwind CSS.',
    ],
  },
];

export interface Certificate {
  title: string;
  issuer: string;
  credentialId: string;
  date: string;
  pdfUrl?: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    title: 'Application Implementation and Development',
    issuer: 'Universitas Gunadarma',
    credentialId: 'ID: 5627',
    date: '2026',
    pdfUrl: 'https://e-sert.gunadarma.ac.id/cert/5627/signed_9d7aff2c168960b129795b2127d35b73.pdf.pdf',
  },
  {
    title: 'Application Development Design',
    issuer: 'Universitas Gunadarma',
    credentialId: 'ID: 5164',
    date: '2025',
    pdfUrl: 'https://e-sert.gunadarma.ac.id/cert/5164/signed_feca943e723ee58fa7bf52b35fb9981e.pdf.pdf',
  },
  {
    title: 'JavaScript Programming Language Fundamental',
    issuer: 'Universitas Gunadarma',
    credentialId: 'ID: 4370',
    date: '2025',
    pdfUrl: 'https://e-sert.gunadarma.ac.id/cert/4370/8e98130168e399b62676ebf440250364.pdf',
  },
  {
    title: 'Go-Lang for Beginner',
    issuer: 'Universitas Gunadarma',
    credentialId: 'ID: 2678',
    date: '2024',
    pdfUrl: 'https://e-sert.gunadarma.ac.id/cert/2678/signed_7edd14ee56f7a31b55a615c8bebf6bfd.pdf.pdf',
  },
  {
    title: 'Fundamental Web Programming',
    issuer: 'Universitas Gunadarma',
    credentialId: 'ID: 2404',
    date: '2023',
    pdfUrl: 'https://e-sert.gunadarma.ac.id/cert/2404/signed_038d1befe2e1b1b5d7c9a53da9ad3074.pdf.pdf',
  },
  {
    title: 'Wide Area Network (WAN) Using Cisco Router for Intermediate',
    issuer: 'Universitas Gunadarma',
    credentialId: 'Nomor: 949696',
    date: '2025',
  },
  {
    title: 'Local Area Network (LAN) Using Cisco Router',
    issuer: 'Universitas Gunadarma',
    credentialId: 'Nomor: 519006',
    date: '2024',
  },
  {
    title: 'Fundamental Networking',
    issuer: 'Universitas Gunadarma',
    credentialId: 'Nomor: 661257',
    date: '2023',
  },
];
