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
    role: 'Pengembang Web & Peneliti (Proyek Penulisan Ilmiah)',
    company: 'Universitas Gunadarma',
    companyLegalName: 'GEGARES',
    location: 'Jakarta',
    startDate: '2025-09-01',
    endDate: '2026-02-01',
    type: 'Academic Project',
    locationType: 'On-site',
    responsibilities: [
      'Merancang dan membangun aplikasi e-commerce fungsional GEGARES sebagai luaran Penulisan Ilmiah tingkat sarjana.',
      'Mengembangkan arsitektur backend MVC menggunakan Laravel dan skema database relasional MySQL.',
      'Membangun antarmuka modern dan responsif dengan Tailwind CSS.',
      'Menyusun dokumentasi perancangan sistem (Use Case, Activity, Sequence Diagram, dan ERD).',
    ],
  },
  {
    role: 'Pengembang Web (Katalog Digital Aktif)',
    company: 'Berkah Mulia',
    companyLegalName: 'bmberkahmulia.com',
    location: 'Jakarta',
    startDate: '2026-06-01',
    endDate: null,
    type: 'Freelance',
    locationType: 'Remote',
    responsibilities: [
      'Merancang, membangun, dan mendeploy website katalog digital aktif (bmberkahmulia.com).',
      'Menyusun perancangan kebutuhan sistem dan arsitektur navigasi katalog kategori bertingkat.',
      'Mengoptimalkan performa loading, efisiensi aset, dan responsivitas UI/UX.',
      'Mengelola repositori kode dan version control di GitHub.',
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
    score: 'IPK 3.58 / 4.00',
    bullets: [
      'IPK 3.58 / 4.00 dengan mata kuliah utama Pemrograman Web, Basis Data Relasional, dan Rekayasa Perangkat Lunak.',
      'Menyelesaikan proyek Penulisan Ilmiah berupa aplikasi E-Commerce fungsional (GEGARES) berbasis Laravel & MySQL.',
    ],
  },
];

export interface Certificate {
  title: string;
  issuer: string;
  credentialId: string;
  date: string;
}

export const CERTIFICATES: Certificate[] = [
  { title: 'Application Development Design', issuer: 'Universitas Gunadarma', credentialId: '359981', date: '2025' },
  { title: 'JavaScript Programming Language Fundamental', issuer: 'Universitas Gunadarma', credentialId: '250364', date: '2025' },
  { title: 'Wide Area Network (WAN) Using Cisco Router', issuer: 'Universitas Gunadarma', credentialId: '949696', date: '2025' },
  { title: 'Go-Lang for Beginner', issuer: 'Universitas Gunadarma', credentialId: '561586', date: '2024' },
  { title: 'Local Area Network (LAN) Using Cisco Router', issuer: 'Universitas Gunadarma', credentialId: '519006', date: '2024' },
  { title: 'Fundamental Web Programming', issuer: 'Universitas Gunadarma', credentialId: '393074', date: '2023' },
  { title: 'Fundamental Networking', issuer: 'Universitas Gunadarma', credentialId: '661257', date: '2023' },
];
