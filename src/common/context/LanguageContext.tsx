'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Locale = 'id' | 'en';

export interface Dictionary {
  // Navigation
  nav_home: string;
  nav_about: string;
  nav_portfolio: string;
  nav_blog: string;
  nav_tools: string;
  nav_links: string;
  nav_contact: string;
  nav_more: string;
  nav_stats: string;
  nav_stats_desc: string;
  nav_setup: string;
  nav_setup_desc: string;
  nav_guestbook: string;
  nav_guestbook_desc: string;
  nav_behind: string;
  nav_behind_desc: string;
  nav_menu_title: string;
  nav_more_insights: string;

  // Hero / Intro
  hero_greeting: string;
  hero_im: string;
  hero_headline_1: string;
  hero_headline_badge: string;
  hero_headline_2: string;
  hero_location: string;
  hero_work: string;

  // Tech Stack
  tools_title: string;
  tools_desc: string;

  // About Section
  about_badge: string;
  about_title: string;
  about_desc: string;
  about_p1: string;
  about_p2: string;
  about_p3: string;
  about_more: string;
  about_more_btn: string;

  // Blog Section
  blog_title: string;
  blog_desc: string;
  blog_view_all: string;
  blog_min_read: string;
  blog_empty: string;

  // Statistics
  stats_title: string;
  stats_desc: string;

  // Experience
  exp_title: string;
  exp_desc: string;
  exp_present: string;

  // Education
  edu_title: string;
  edu_desc: string;

  // Services
  services_title: string;
  services_desc: string;

  // Contact
  contact_title: string;
  contact_desc: string;
  contact_form_title: string;
  contact_name: string;
  contact_name_ph: string;
  contact_email: string;
  contact_email_ph: string;
  contact_msg: string;
  contact_msg_ph: string;
  contact_send: string;
  contact_sending: string;

  // Footer
  footer_pages: string;
  footer_explore: string;
  footer_insights: string;
}

const DICTIONARY: Record<Locale, Dictionary> = {
  id: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_portfolio: 'Portfolio',
    nav_blog: 'Blog',
    nav_tools: 'Tools',
    nav_links: 'Links',
    nav_contact: 'Contact',
    nav_more: 'More',
    nav_stats: 'Statistik Situs',
    nav_stats_desc: 'Analitik traffic & performa rizkiarbi.com',
    nav_setup: 'Setup Kerja',
    nav_setup_desc: 'Hardware & tools harian saya',
    nav_guestbook: 'Buku Tamu',
    nav_guestbook_desc: 'Tinggalkan pesan Anda di sini',
    nav_behind: 'Di Balik Layar',
    nav_behind_desc: 'Cerita di balik website ini',
    nav_menu_title: 'Navigasi Menu',
    nav_more_insights: 'Wawasan & Ekplorasi',

    hero_greeting: 'Hey',
    hero_im: "I'm Rizki.",
    hero_headline_1: 'Saya membangun ',
    hero_headline_badge: 'digital experiences',
    hero_headline_2: ' yang berfungsi optimal dan dirancang dengan indah. Mengubah ide menjadi kenyataan, secepat pikiran.',
    hero_location: 'Jakarta, Indonesia',
    hero_work: 'Terbuka untuk Bekerja',

    tools_title: 'Tools of the Trade',
    tools_desc: 'Teknologi modern dan ekosistem tools yang saya andalkan untuk membangun solusi digital yang tangguh, cepat, dan mudah diskalakan.',

    about_badge: 'Tentang Saya',
    about_title: 'Membangun Produk Digital dengan Presisi & Dedikasi',
    about_desc: 'Mengenal lebih dekat visi rekayasa perangkat lunak dan keahlian teknis saya.',
    about_p1: 'Halo! Saya Rizki Arbiansyah, seorang Software Engineer & Web Developer yang berfokus pada arsitektur frontend modern, performa web tingkat lanjut, dan antarmuka pengguna yang intuitif.',
    about_p2: 'Dengan pengalaman mendalam dalam ekosistem Next.js, React, TypeScript, dan full-stack development, saya memadukan estetika desain visual dengan kode yang bersih dan scalable.',
    about_p3: 'Saya senang memecahkan masalah kompleks, mengoptimalkan pengalaman pengguna, serta mewujudkan produk digital yang memberi nilai tambah nyata.',
    about_more: 'Pelajari Lebih Lanjut',
    about_more_btn: 'Pelajari Lebih Lanjut',

    blog_title: 'Artikel & Wawasan',
    blog_desc: 'Catatan perjalanan, eksplorasi teknologi web modern, dan praktik terbaik rekayasa software.',
    blog_view_all: 'Lihat Semua Artikel',
    blog_min_read: 'menit baca',
    blog_empty: 'Belum ada artikel yang dipublikasikan.',

    stats_title: 'Pencapaian & Angka',
    stats_desc: 'Metrik pertumbuhan dan komitmen berkelanjutan dalam membangun karya digital.',

    exp_title: 'Pengalaman Profesional',
    exp_desc: 'Perjalanan karir dan kontribusi saya dalam berbagai proyek teknologi.',
    exp_present: 'Sekarang',

    edu_title: 'Pendidikan & Sertifikasi',
    edu_desc: 'Pondasi akademik formal dan sertifikasi kompetensi profesional.',

    services_title: 'Layanan & Keahlian',
    services_desc: 'Solusi rekayasa perangkat lunak menyeluruh yang disesuaikan dengan kebutuhan Anda.',

    contact_title: 'Mari Terhubung',
    contact_desc: 'Punya ide proyek menarik, tawaran kolaborasi, atau peluang kerja? Pintu saya selalu terbuka.',
    contact_form_title: 'Kirimkan Pesan Anda',
    contact_name: 'Nama / Perusahaan',
    contact_name_ph: 'Nama Anda atau Perusahaan',
    contact_email: 'Alamat Email',
    contact_email_ph: 'email@example.com',
    contact_msg: 'Pesan / Deskripsi Proyek',
    contact_msg_ph: 'Ceritakan detail ide proyek atau sekadar menyapa...',
    contact_send: 'Kirim Pesan',
    contact_sending: 'Mengirimkan Pesan...',

    footer_pages: 'Halaman',
    footer_explore: 'Eksplorasi',
    footer_insights: 'Wawasan',
  },
  en: {
    nav_home: 'Home',
    nav_about: 'About',
    nav_portfolio: 'Portfolio',
    nav_blog: 'Blog',
    nav_tools: 'Tools',
    nav_links: 'Links',
    nav_contact: 'Contact',
    nav_more: 'More',
    nav_stats: 'Site Statistics',
    nav_stats_desc: 'Real-time traffic & performance insights',
    nav_setup: 'My Setup',
    nav_setup_desc: 'My daily workstation hardware & software',
    nav_guestbook: 'Guestbook',
    nav_guestbook_desc: 'Leave a note for the community',
    nav_behind: 'Behind the Scenes',
    nav_behind_desc: 'The technical story behind this portfolio',
    nav_menu_title: 'Navigation Menu',
    nav_more_insights: 'Insights & Explore',

    hero_greeting: 'Hey',
    hero_im: "I'm Rizki.",
    hero_headline_1: 'I craft ',
    hero_headline_badge: 'digital experiences',
    hero_headline_2: ' that work seamlessly and look stunning. Turning creative ideas into reality at the speed of thought.',
    hero_location: 'Jakarta, Indonesia',
    hero_work: 'Available for Work',

    tools_title: 'Tools of the Trade',
    tools_desc: 'The modern tech stack and development ecosystem I leverage to build scalable, robust, and lightning-fast digital solutions.',

    about_badge: 'About Me',
    about_title: 'Engineering Digital Products with Precision & Passion',
    about_desc: 'A closer look into my engineering philosophy and technical craftsmanship.',
    about_p1: "Hi! I'm Rizki Arbiansyah, a Software Engineer & Web Developer specialized in modern frontend architectures, cutting-edge web performance, and intuitive user experiences.",
    about_p2: 'With deep expertise across Next.js, React, TypeScript, and full-stack solutions, I blend striking visual design with clean, maintainable, and scalable code.',
    about_p3: 'I thrive on solving complex technical challenges, elevating user experiences, and delivering software that drives measurable real-world impact.',
    about_more: 'Discover More About Me',
    about_more_btn: 'Discover More About Me',

    blog_title: 'Articles & Insights',
    blog_desc: 'Documented explorations in modern web engineering, architecture patterns, and best practices.',
    blog_view_all: 'View All Articles',
    blog_min_read: 'min read',
    blog_empty: 'No articles published yet.',

    stats_title: 'In Numbers & Impact',
    stats_desc: 'Key growth metrics and continuous commitment to engineering excellence.',

    exp_title: 'Work Experience',
    exp_desc: 'My career trajectory and contributions across diverse technology projects.',
    exp_present: 'Present',

    edu_title: 'Education & Certificates',
    edu_desc: 'Academic foundations and professional industry credentials.',

    services_title: 'Services & Capabilities',
    services_desc: 'Comprehensive end-to-end software engineering solutions tailored to your vision.',

    contact_title: "Let's Connect",
    contact_desc: 'Have an exciting project, collaboration opportunity, or role in mind? My inbox is always open.',
    contact_form_title: 'Drop Me a Message',
    contact_name: 'Name / Company',
    contact_name_ph: 'Your Name or Company Name',
    contact_email: 'Email Address',
    contact_email_ph: 'email@example.com',
    contact_msg: 'Message / Project Details',
    contact_msg_ph: 'Tell me about your project goals or just say hi...',
    contact_send: 'Send Message',
    contact_sending: 'Sending Message...',

    footer_pages: 'Pages',
    footer_explore: 'Explore',
    footer_insights: 'Insights',
  },
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: keyof Dictionary) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('id');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('portfolio_locale') as Locale | null;
      if (saved === 'id' || saved === 'en') {
        setLocaleState(saved);
      }
    } catch {
      // localStorage may not be accessible
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('portfolio_locale', newLocale);
    } catch {
      // ignore
    }
  };

  const toggleLocale = () => {
    setLocale(locale === 'id' ? 'en' : 'id');
  };

  const t = (key: keyof Dictionary): string => {
    return DICTIONARY[locale]?.[key] ?? DICTIONARY.id[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
