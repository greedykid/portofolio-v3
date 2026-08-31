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
  tools_reset: string;

  // About Section
  about_badge: string;
  about_title: string;
  about_desc: string;
  about_p1: string;
  about_p2: string;
  about_p3: string;
  about_more: string;
  about_more_btn: string;

  // Projects
  projects_title: string;
  projects_desc: string;
  projects_view_btn: string;
  projects_live_preview: string;

  // Blog Section & Page
  blog_title: string;
  blog_desc: string;
  blog_page_desc: string;
  blog_search_ph: string;
  blog_not_found: string;
  blog_views: string;
  blog_view_all: string;
  blog_min_read: string;
  blog_empty: string;

  // Statistics
  stats_title: string;
  stats_desc: string;

  // GitHub / Contributions
  contrib_title: string;
  contrib_desc: string;
  contrib_total: string;
  contrib_this_week: string;
  contrib_best_day: string;
  contrib_average: string;
  contrib_day_unit: string;
  contrib_less: string;
  contrib_more: string;
  contrib_count_label: string;
  contrib_no_contributions: string;

  // Experience
  exp_title: string;
  exp_desc: string;
  exp_timeline_title: string;
  exp_years_badge: string;
  exp_period_label: string;
  exp_present: string;

  // Education
  edu_title: string;
  edu_desc: string;
  edu_certificates_title: string;

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
  contact_success_msg: string;
  contact_success_sub: string;
  contact_error_msg: string;
  contact_privacy_note: string;

  // Footer
  footer_pages: string;
  footer_explore: string;
  footer_insights: string;
  footer_link_portfolio: string;
  footer_link_guestbook: string;
  footer_link_status: string;
  footer_link_behind: string;
  footer_link_stats: string;
  footer_link_setup: string;
  footer_link_tools: string;
  footer_link_links: string;
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
    nav_more_insights: 'Wawasan & Eksplorasi',

    hero_greeting: 'Halo',
    hero_im: 'Saya Rizki.',
    hero_headline_1: 'Saya merancang & membangun ',
    hero_headline_badge: 'aplikasi web modern',
    hero_headline_2: ' yang berkinerja tinggi, terstruktur, dan berorientasi pengguna. Menghubungkan arsitektur sistem yang tangguh dengan antarmuka yang presisi.',
    hero_location: 'Jakarta, Indonesia',
    hero_work: 'Terbuka untuk Peluang Kerja',

    tools_title: 'Tools of the Trade',
    tools_desc: 'Teknologi modern dan ekosistem tools yang saya andalkan untuk membangun solusi digital yang tangguh, cepat, dan mudah diskalakan.',
    tools_reset: 'Reset Posisi',

    about_badge: 'Tentang Saya',
    about_title: 'Membangun Produk Digital dengan Presisi & Dedikasi',
    about_desc: 'Mengenal lebih dekat visi rekayasa perangkat lunak dan keahlian teknis saya.',
    about_p1: 'Halo! Saya Rizki Arbiansyah, lulusan Sistem Informasi Universitas Gunadarma dan Software Engineer yang berfokus pada arsitektur web modern, integrasi API, dan rekayasa frontend interaktif.',
    about_p2: 'Saya terbiasa mengembangkan aplikasi berbasis Next.js, React, TypeScript, hingga arsitektur backend Laravel & basis data relasional. Menggabungkan kode yang terstruktur bersih (clean code) dengan performa tinggi.',
    about_p3: 'Saya berdedikasi memecahkan tantangan teknis kompleks, mengoptimalkan alur interaksi pengguna, dan membangun software yang memberi dampak nyata.',
    about_more: 'Pelajari Lebih Lanjut',
    about_more_btn: 'Pelajari Lebih Lanjut',

    projects_title: 'Portofolio Proyek',
    projects_desc: 'Koleksi aplikasi web, sistem katalog digital, dan eksperimen teknologi yang pernah saya kembangkan.',
    projects_view_btn: 'Lihat Detail Proyek',
    projects_live_preview: 'Pratinjau Langsung',

    blog_title: 'Blog & Artikel',
    blog_desc: 'Catatan perjalanan, eksplorasi teknologi web modern, dan praktik terbaik rekayasa software.',
    blog_page_desc: 'Kumpulan tulisan, tutorial teknis, dan wawasan seputar dunia pengembangan web.',
    blog_search_ph: 'Cari artikel berdasarkan judul, topik, atau kata kunci...',
    blog_not_found: 'Tidak ditemukan artikel yang sesuai dengan pencarian Anda.',
    blog_views: 'tayangan',
    blog_view_all: 'Lihat Semua Artikel',
    blog_min_read: 'menit baca',
    blog_empty: 'Belum ada artikel yang dipublikasikan.',

    stats_title: 'Pencapaian & Angka',
    stats_desc: 'Metrik pertumbuhan dan komitmen berkelanjutan dalam membangun karya digital.',

    contrib_title: 'Kontribusi GitHub',
    contrib_desc: 'Aktivitas commit, pull request, dan eksplorasi kode harian @greedykid',
    contrib_total: 'TOTAL',
    contrib_this_week: 'MINGGU INI',
    contrib_best_day: 'TERBAIK',
    contrib_average: 'RATA-RATA',
    contrib_day_unit: 'hari',
    contrib_less: 'Sedikit',
    contrib_more: 'Banyak',
    contrib_count_label: 'kontribusi',
    contrib_no_contributions: 'Tidak ada kontribusi',

    exp_title: 'Pengalaman Profesional',
    exp_desc: 'Perjalanan karir dan kontribusi saya dalam berbagai proyek teknologi.',
    exp_timeline_title: 'Linimasa Karir',
    exp_years_badge: '3+ tahun',
    exp_period_label: '@2022 - Sekarang',
    exp_present: 'Sekarang',

    edu_title: 'Pendidikan & Sertifikasi',
    edu_desc: 'Pondasi akademik formal dan sertifikasi kompetensi profesional.',
    edu_certificates_title: 'Sertifikasi & Lisensi',

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
    contact_success_msg: 'Terima kasih! Pesan Anda telah terkirim.',
    contact_success_sub: 'Saya akan membalas pesan Anda sesegera mungkin.',
    contact_error_msg: 'Gagal mengirim pesan. Silakan hubungi langsung ke rizkiarbi65@gmail.com.',
    contact_privacy_note: 'Dengan mengirim formulir ini, Anda setuju untuk dihubungi melalui email.',

    footer_pages: 'Halaman',
    footer_explore: 'Eksplorasi',
    footer_insights: 'Wawasan',
    footer_link_portfolio: 'Portofolio',
    footer_link_guestbook: 'Buku Tamu',
    footer_link_status: 'Status Layanan',
    footer_link_behind: 'Di Balik Layar',
    footer_link_stats: 'Statistik Situs',
    footer_link_setup: 'Setup Kerja',
    footer_link_tools: 'Tools Pilihan',
    footer_link_links: 'Tautan',
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
    hero_headline_1: 'I architect & build ',
    hero_headline_badge: 'modern web applications',
    hero_headline_2: ' that are high-performance, robust, and user-centric. Bridging powerful system architecture with polished user interfaces.',
    hero_location: 'Jakarta, Indonesia',
    hero_work: 'Available for Work',

    tools_title: 'Tools of the Trade',
    tools_desc: 'The modern tech stack and development ecosystem I leverage to build scalable, robust, and lightning-fast digital solutions.',
    tools_reset: 'Reset Layout',

    about_badge: 'About Me',
    about_title: 'Engineering Digital Products with Precision & Passion',
    about_desc: 'A closer look into my engineering philosophy and technical craftsmanship.',
    about_p1: "Hi! I'm Rizki Arbiansyah, an Information Systems graduate from Universitas Gunadarma and Software Engineer focused on modern web architectures, API integrations, and interactive frontend engineering.",
    about_p2: 'I specialize in developing scalable applications with Next.js, React, TypeScript, paired with Laravel backend structures and relational databases. Combining clean code architecture with seamless web performance.',
    about_p3: 'I am passionate about tackling complex technical challenges, streamlining intuitive user experiences, and delivering high-value digital solutions.',
    about_more: 'Discover More About Me',
    about_more_btn: 'Discover More About Me',

    projects_title: 'Project Portfolio',
    projects_desc: 'A showcase of web applications, digital catalogs, and technical solutions I have built.',
    projects_view_btn: 'View Project Details',
    projects_live_preview: 'Live Preview',

    blog_title: 'Blog & Articles',
    blog_desc: 'Documented explorations in modern web engineering, architecture patterns, and best practices.',
    blog_page_desc: 'A collection of technical write-ups, engineering notes, and web development insights.',
    blog_search_ph: 'Search articles by title, topic, or keyword...',
    blog_not_found: 'No articles found matching your search.',
    blog_views: 'views',
    blog_view_all: 'View All Articles',
    blog_min_read: 'min read',
    blog_empty: 'No articles published yet.',

    stats_title: 'In Numbers & Impact',
    stats_desc: 'Key growth metrics and continuous commitment to engineering excellence.',

    contrib_title: 'Contributions',
    contrib_desc: 'A year of commits, PRs, and midnight debugging sessions @greedykid',
    contrib_total: 'TOTAL',
    contrib_this_week: 'THIS WEEK',
    contrib_best_day: 'BEST DAY',
    contrib_average: 'AVERAGE',
    contrib_day_unit: 'day',
    contrib_less: 'Less',
    contrib_more: 'More',
    contrib_count_label: 'contributions',
    contrib_no_contributions: 'No contributions',

    exp_title: 'Work Experience',
    exp_desc: 'My career trajectory and contributions across diverse technology projects.',
    exp_timeline_title: 'Career Timeline',
    exp_years_badge: '3+ years',
    exp_period_label: '@2022 - Present',
    exp_present: 'Present',

    edu_title: 'Education & Certificates',
    edu_desc: 'Academic foundations and professional industry credentials.',
    edu_certificates_title: 'Certificates & Credentials',

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
    contact_success_msg: 'Thank you! Your message has been sent successfully.',
    contact_success_sub: 'I will get back to you as soon as possible.',
    contact_error_msg: 'Failed to send message. Please reach out directly to rizkiarbi65@gmail.com.',
    contact_privacy_note: 'By submitting this form, you agree to be contacted via email.',

    footer_pages: 'Pages',
    footer_explore: 'Explore',
    footer_insights: 'Insights',
    footer_link_portfolio: 'Portfolio',
    footer_link_guestbook: 'Guestbook',
    footer_link_status: 'Service Status',
    footer_link_behind: 'Behind the Scenes',
    footer_link_stats: 'Site Statistics',
    footer_link_setup: 'My Setup',
    footer_link_tools: 'Useful Tools',
    footer_link_links: 'Links',
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
