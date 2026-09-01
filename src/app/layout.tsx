import type { Metadata } from 'next';
import { ThemeProvider } from '@/common/context/ThemeContext';
import { LanguageProvider } from '@/common/context/LanguageContext';
import Layout from '@/common/components/layouts';
import { SITE, PROFILE, SOCIAL_MEDIA } from '@/common/constant/data';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.title} — ${PROFILE.name}`,
    template: `%s | ${PROFILE.name}`,
  },
  description: SITE.description,
  keywords: [
    'Rizki Arbiansyah',
    'Rizki Arbi',
    'Web Developer',
    'IT Support',
    'Software Engineer',
    'Laravel',
    'Next.js',
    'MySQL',
    'Tailwind CSS',
    'PHP',
    'Universitas Gunadarma',
    'GEGARES',
    'Berkah Mulia',
    'Portfolio',
    'Jakarta Barat',
  ],
  authors: [{ name: PROFILE.name, url: SITE.url }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    creator: '@rizkiarbi',
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    url: SITE.url,
    jobTitle: PROFILE.role,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Universitas Gunadarma',
    },
    knowsAbout: [
      'Laravel',
      'PHP',
      'MySQL',
      'Tailwind CSS',
      'IT Support',
      'Next.js',
      'Hardware Troubleshooting',
      'Network Administration',
    ],
    sameAs: [
      SOCIAL_MEDIA.github,
      SOCIAL_MEDIA.linkedin,
    ],
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <Layout>{children}</Layout>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
