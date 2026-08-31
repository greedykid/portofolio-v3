'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Locale = 'id' | 'en';

export const TRANSLATIONS: Record<Locale, Record<string, string>> = {
  id: {
    // Navigation
    nav_portfolio: 'Portfolio',
    nav_blog: 'Blog',
    nav_about: 'About',
    nav_tools: 'Tools',
    nav_links: 'Links',
    nav_contact: 'Contact',
    nav_more: 'More',
    nav_more_insights: 'More Insights',
    nav_menu_title: 'Navigasi Menu',
    nav_stats: 'Statistik Situs',
    nav_stats_desc: 'Statistik pengunjung & GitHub metrics',
    nav_setup: 'My Setup',
    nav_setup_desc: 'Hardware, gears & workflow',
    nav_guestbook: 'Guestbook',
    nav_guestbook_desc: 'Tinggalkan pesan Anda',
    nav_behind: 'Di Balik Layar',
    nav_behind_desc: 'Proses kreatif & eksplorasi',

    // Hero / Intro
    hero_greeting: "Hey 👋 I'm Rizki.",
    hero_headline_1: 'Saya membangun ',
    hero_headline_badge: 'digital experiences',
    hero_headline_2: ' yang berfungsi dan dirancang dengan baik. Mengubah ide menjadi nyata, secepat pikiran.',
    hero_location: 'Berbasis di Jakarta, Indonesia',
    hero_work: 'Terbuka untuk Bekerja',

    // Tech Stack
    tools_title: 'Tools of the Trade',
    tools_desc: 'Ini tools dan teknologi yang saya pakai buat build things. Feel free to drag them around!',

    // About Section
    about_title: 'About Me',
    about_p1: 'Halo! Saya Rizki Arbiansyah, seorang Frontend / Fullstack Developer dan IT Support yang berdedikasi membangun aplikasi web modern, cepat, dan intuitif.',
    about_p2: 'Dengan pengalaman dalam ekosistem JavaScript/TypeScript modern, Next.js, React, Node.js, serta infrastruktur IT, saya fokus menciptakan solusi perangkat lunak yang andal dan berdampak nyata.',
    about_more: 'Selengkapnya tentang saya',

    // Projects
    projects_view: 'View Project',

    // Blog
    blog_title: 'Latest Articles',
    blog_view_all: 'View All',
    blog_empty: 'Belum ada artikel.',

    // Stats
    stats_title: 'In Numbers',
    stats_desc: 'Beberapa angka yang menggambarkan perjalanan saya.',

    // Experience
    exp_title: 'Work Experience',
    exp_desc: 'Pengalaman kerja dan proyek profesional.',

    // Education
    edu_title: 'Education & Certificates',
    edu_desc: 'Latar belakang pendidikan dan sertifikasi kompetensi.',

    // Services
    services_title: 'What I Do',
    services_desc: 'Layanan yang saya tawarkan sebagai pengembang web dan IT support.',

    // Contact
    contact_title: 'Get in Touch',
    contact_desc: 'Punya proyek atau peluang kerja? Mari berdiskusi.',
    contact_form_title: 'Drop Me a Message',
    contact_form_desc: 'Punya pertanyaan atau ingin berkolaborasi? Kirimkan pesan di bawah ini.',
    contact_name: 'Nama',
    contact_name_ph: 'Nama lengkap Anda',
    contact_email: 'Email',
    contact_email_ph: 'nama@example.com',
    contact_msg: 'Pesan',
    contact_msg_ph: 'Tulis pesan Anda di sini...',
    contact_send: 'Kirim Pesan',
    contact_sending: 'Mengirim...',

    // Footer
    footer_pages: 'Pages',
    footer_explore: 'Explore',
    footer_insights: 'Insights',
    footer_rights: 'Hak Cipta Dilindungi.',
  },
  en: {
    // Navigation
    nav_portfolio: 'Portfolio',
    nav_blog: 'Blog',
    nav_about: 'About',
    nav_tools: 'Tools',
    nav_links: 'Links',
    nav_contact: 'Contact',
    nav_more: 'More',
    nav_more_insights: 'More Insights',
    nav_menu_title: 'Navigation Menu',
    nav_stats: 'Site Statistics',
    nav_stats_desc: 'Visitor stats & GitHub metrics',
    nav_setup: 'My Setup',
    nav_setup_desc: 'Hardware, gears & workflow',
    nav_guestbook: 'Guestbook',
    nav_guestbook_desc: 'Leave your message',
    nav_behind: 'Behind the Scenes',
    nav_behind_desc: 'Creative process & exploration',

    // Hero / Intro
    hero_greeting: "Hey 👋 I'm Rizki.",
    hero_headline_1: 'I build ',
    hero_headline_badge: 'digital experiences',
    hero_headline_2: ' that function and look exceptional. Turning ideas into reality, at the speed of thought.',
    hero_location: 'Based in Jakarta, Indonesia',
    hero_work: 'Open to Work',

    // Tech Stack
    tools_title: 'Tools of the Trade',
    tools_desc: 'These are the tools and technologies I use to build things. Feel free to drag them around!',

    // About Section
    about_title: 'About Me',
    about_p1: "Hello! I'm Rizki Arbiansyah, a dedicated Frontend / Fullstack Developer and IT Support specialist passionate about creating modern, blazing-fast, and intuitive web applications.",
    about_p2: 'With hands-on experience in modern JavaScript/TypeScript ecosystems, Next.js, React, Node.js, and IT systems, I focus on engineering robust software solutions with real-world impact.',
    about_more: 'More about me',

    // Projects
    projects_view: 'View Project',

    // Blog
    blog_title: 'Latest Articles',
    blog_view_all: 'View All',
    blog_empty: 'No articles found.',

    // Stats
    stats_title: 'In Numbers',
    stats_desc: 'Key numbers highlighting my professional journey.',

    // Experience
    exp_title: 'Work Experience',
    exp_desc: 'Professional work experience and roles.',

    // Education
    edu_title: 'Education & Certificates',
    edu_desc: 'Educational qualifications and earned certifications.',

    // Services
    services_title: 'What I Do',
    services_desc: 'Services I offer as a web engineer and IT support specialist.',

    // Contact
    contact_title: 'Get in Touch',
    contact_desc: 'Have a project or work opportunity? Let us connect.',
    contact_form_title: 'Drop Me a Message',
    contact_form_desc: 'Have a question or want to collaborate? Send a message below.',
    contact_name: 'Name',
    contact_name_ph: 'Your full name',
    contact_email: 'Email',
    contact_email_ph: 'name@example.com',
    contact_msg: 'Message',
    contact_msg_ph: 'Write your message here...',
    contact_send: 'Send Message',
    contact_sending: 'Sending...',

    // Footer
    footer_pages: 'Pages',
    footer_explore: 'Explore',
    footer_insights: 'Insights',
    footer_rights: 'All Rights Reserved.',
  },
};

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('preferred_locale') as Locale | null;
    if (stored === 'en' || stored === 'id') {
      setLocaleState(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('preferred_locale', l);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l;
    }
  };

  const toggleLocale = () => {
    const next: Locale = locale === 'id' ? 'en' : 'id';
    setLocale(next);
  };

  const t = (key: string): string => {
    const currentDict = TRANSLATIONS[mounted ? locale : 'id'];
    return currentDict[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale: mounted ? locale : 'id', setLocale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
