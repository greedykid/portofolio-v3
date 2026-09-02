import type { IconType } from 'react-icons';
import {
  FiLayout,
  FiCode,
  FiCpu,
  FiServer,
  FiCloud,
  FiUsers,
} from 'react-icons/fi';

type ServiceItem = {
  title: string;
  description: string;
  icon: IconType;
};

export const SERVICES: ServiceItem[] = [
  {
    title: 'Pengembangan Web (Front-End)',
    description:
      'Membangun antarmuka modern, responsif, dan cepat dengan Tailwind CSS, Bootstrap, dan JavaScript ES6+ — fokus pada pengalaman pengguna yang mulus.',
    icon: FiLayout,
  },
  {
    title: 'Pengembangan Back-End',
    description:
      'Arsitektur backend MVC dengan Laravel, RESTful API, dan pengelolaan database relasional MySQL yang terstruktur dan aman.',
    icon: FiCode,
  },
  {
    title: 'Analisis & Perancangan Sistem',
    description:
      'Pemodelan UML, ERD, Use Case, Activity, hingga Sequence Diagram untuk memastikan sistem dirancang dengan benar sejak awal.',
    icon: FiCpu,
  },
  {
    title: 'IT Support & Troubleshooting',
    description:
      'Perawatan hardware/software PC, instalasi OS (Windows/Linux), pemeliharaan printer, serta dukungan konektivitas dasar jaringan lokal (LAN & Wi-Fi).',
    icon: FiServer,
  },
];

export const TECH_STACK = [
  { name: 'PHP', level: 85, category: 'Web' },
  { name: 'Laravel', level: 90, category: 'Web' },
  { name: 'MySQL', level: 88, category: 'Web' },
  { name: 'Tailwind CSS', level: 92, category: 'Web' },
  { name: 'Bootstrap', level: 80, category: 'Web' },
  { name: 'JavaScript', level: 80, category: 'Web' },
  { name: 'Git & GitHub', level: 86, category: 'Tools' },
  { name: 'Hardware PC', level: 86, category: 'IT' },
  { name: 'Linux', level: 78, category: 'IT' },
  { name: 'Basic Network', level: 60, category: 'IT' },
  { name: 'Figma', level: 72, category: 'Tools' },
  { name: 'Docker', level: 65, category: 'Tools' },
] as const;

export const STATS = [
  { number: '3.58', label: 'IPK Kelulusan S1 Sistem Informasi' },
  { number: '7', label: 'Sertifikasi Kompetensi & Jaringan' },
  { number: '2', label: 'Proyek Live (E-Commerce & Katalog)' },
  { number: '2026', label: 'Tahun Kelulusan Sarjana' },
] as const;

export const SKILL_CATEGORIES = [
  {
    category: 'Pengembangan Web & Database',
    icon: FiCode,
    skills: [
      'PHP',
      'Laravel',
      'MySQL',
      'Tailwind CSS',
      'Bootstrap',
      'Blade Engine',
      'HTML5 & CSS3',
      'JavaScript',
    ],
  },
  {
    category: 'Analisis & Perancangan Sistem',
    icon: FiCpu,
    skills: [
      'Pemodelan UML',
      'Entity Relationship Diagram',
      'Use Case Diagram',
      'Activity Diagram',
      'Sequence Diagram',
      'UI/UX Design (Figma)',
    ],
  },
  {
    category: 'IT Support & Troubleshooting',
    icon: FiServer,
    skills: [
      'Hardware & Software Troubleshooting',
      'Instalasi OS (Windows/Linux)',
      'Perawatan PC & Printer',
      'IT Helpdesk & User Support',
      'Konektivitas Dasar LAN & Wi-Fi',
    ],
  },
  {
    category: 'Tools & Produktivitas',
    icon: FiCloud,
    skills: [
      'Git & GitHub',
      'Postman',
      'Dasar Jaringan Komputer',
      'Docker (Dasar)',
      'Microsoft Office',
      'Figma (UI/UX)',
    ],
  },
] as const;
