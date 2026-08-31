'use client';

import Container from '@/common/components/elements/Container';
import SocialMedia from '@/common/components/elements/SocialMedia';
import { PROFILE } from '@/common/constant/data';
import Link from 'next/link';
import { useLanguage } from '@/common/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const FOOTER_LINKS = {
    pages: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
    explore: [
      { label: 'Portfolio', href: '/projects' },
      { label: 'Guestbook', href: '/#guestbook' },
      { label: 'Service Status', href: '/#status' },
      { label: 'Di Balik Layar', href: '/#behind-the-scenes' },
    ],
    insights: [
      { label: 'Statistik', href: '/stats' },
      { label: 'My Setup', href: '/#setup' },
      { label: 'Useful Tools', href: '/#tools' },
      { label: 'Links', href: '/links' },
    ],
  };

  return (
    <footer className="mt-12 mb-8 md:mb-12 relative overflow-hidden">
      <Container>
        <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-neutral-950 p-6 md:p-10 lg:p-12 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] overflow-hidden">
          {/* Main content grid */}
          <div className="relative z-10 flex w-full flex-col justify-between gap-10 pb-16 lg:pb-24 lg:flex-row">
            {/* Left Col: Brand & Quote & Socials */}
            <div className="w-full space-y-6 lg:w-[45%]">
              <h5 className="text-3xl md:text-4xl font-brak font-bold text-neutral-900 dark:text-white">
                {PROFILE.name}
              </h5>
              <p className="leading-relaxed text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-sm">
                {PROFILE.quote} — {PROFILE.quoteAuthor}
              </p>
              <div className="pt-2">
                <SocialMedia />
              </div>
            </div>

            {/* Right Col: 3 Link Columns */}
            <div className="grid w-full grid-cols-2 sm:grid-cols-3 gap-8 lg:w-[50%]">
              <div className="space-y-4">
                <h6 className="text-base font-bold text-neutral-900 dark:text-white">
                  {t('footer_pages')}
                </h6>
                <ul className="space-y-2.5 text-sm font-medium">
                  {FOOTER_LINKS.pages.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200 hover:text-neutral-900 dark:hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h6 className="text-base font-bold text-neutral-900 dark:text-white">
                  {t('footer_explore')}
                </h6>
                <ul className="space-y-2.5 text-sm font-medium">
                  {FOOTER_LINKS.explore.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200 hover:text-neutral-900 dark:hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h6 className="text-base font-bold text-neutral-900 dark:text-white">
                  {t('footer_insights')}
                </h6>
                <ul className="space-y-2.5 text-sm font-medium">
                  {FOOTER_LINKS.insights.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200 hover:text-neutral-900 dark:hover:text-white"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Giant Bottom Watermark: rizkiarbi. */}
          <div className="pointer-events-none absolute -bottom-4 md:-bottom-8 inset-x-0 z-0 flex items-baseline justify-between px-4 md:px-8 select-none leading-none whitespace-nowrap">
            <span className="text-[60px] sm:text-[90px] md:text-[130px] lg:text-[160px] font-[900] tracking-tighter text-neutral-200/50 dark:text-[#181a20]/90">
              rizkiarbi.
            </span>
            <span className="text-[24px] sm:text-[36px] md:text-[50px] lg:text-[70px] font-bold text-neutral-300/60 dark:text-[#252830]/80">
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
