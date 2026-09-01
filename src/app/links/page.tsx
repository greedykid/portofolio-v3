'use client';

import { useState, useEffect } from 'react';
import {
  FiSun,
  FiMoon,
  FiGlobe,
  FiCalendar,
  FiCoffee,
  FiMail,
  FiArrowRight,
  FiX,
  FiCopy,
  FiCheck,
  FiDownload,
  FiShare2,
} from 'react-icons/fi';
import { SOCIAL } from '@/common/constant/social';
import { PROFILE } from '@/common/constant/data';
import { useTheme } from '@/common/context/ThemeContext';
import { useLanguage } from '@/common/context/LanguageContext';
import { BsQrCode } from 'react-icons/bs';

export default function LinksPage() {
  const { theme, toggleTheme } = useTheme();
  const { locale } = useLanguage();
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.href);
    }
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowQrModal(false);
      }
    };
    if (showQrModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showQrModal]);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=12&format=png&data=${encodeURIComponent(
    pageUrl || 'https://saweria.co/rizkiarbi'
  )}`;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(pageUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadQr = async () => {
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `rizki-arbiansyah-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(qrImageUrl, '_blank');
    }
  };

  const PERSONAL_LINKS = [
    {
      title: locale === 'id' ? 'Ruang Pribadi Saya' : 'My Personal Space',
      href: '/',
      icon: FiGlobe,
      accentBorder: 'border-b-emerald-400',
      description:
        locale === 'id'
          ? 'Eksplorasi proyek, tulisan, dan profil saya'
          : 'Explore my projects, writings, and background',
    },
    {
      title: locale === 'id' ? 'Mari Berdiskusi!' : "Let's Chat!",
      href: 'mailto:rizkiarbi65@gmail.com',
      icon: FiCalendar,
      accentBorder: 'border-b-rose-400',
      description:
        locale === 'id'
          ? 'Jadwalkan obrolan atau ngopi virtual'
          : 'Schedule a call or quick virtual coffee',
    },
    {
      title: locale === 'id' ? 'Traktir Kopi?' : 'Buy Me Coffee?',
      href: 'https://saweria.co/rizkiarbi',
      icon: FiCoffee,
      accentBorder: 'border-b-amber-400',
      description:
        locale === 'id'
          ? 'Dukung eksplorasi karya open-source saya di Saweria'
          : 'Support my open-source work & explorations on Saweria',
    },
  ];

  return (
    <div className="w-full py-6 md:py-10 flex items-center justify-center px-4">
      <div className="w-full max-w-[480px] rounded-3xl border-2 border-neutral-300/80 dark:border-white/15 bg-white dark:bg-[#0e1117] shadow-[8px_8px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[8px_8px_0px_0px_rgba(99,102,241,0.35)] overflow-hidden">
        {/* Top Banner Gradient & Action Buttons */}
        <div className="relative h-36 md:h-40 w-full bg-gradient-to-br from-teal-800/40 via-indigo-900/60 to-slate-900 p-4 flex items-start justify-between">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-amber-400 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-all cursor-pointer"
          >
            {theme === 'dark' ? (
              <FiSun className="h-4 w-4" />
            ) : (
              <FiMoon className="h-4 w-4 text-neutral-200" />
            )}
          </button>
          <button
            onClick={() => setShowQrModal(true)}
            aria-label="Share QR code"
            title={locale === 'id' ? 'Tampilkan Kode QR' : 'Show QR Code'}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-black/60 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            <BsQrCode className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Info Center */}
        <div className="relative px-6 pb-8 -mt-16 text-center">
          {/* Avatar */}
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white dark:border-[#0e1117] bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-brak font-bold text-white shadow-xl">
            {PROFILE.first.charAt(0)}
          </div>

          <h1 className="text-2xl md:text-3xl font-brak font-bold text-neutral-900 dark:text-white">
            {PROFILE.name}
          </h1>
          <p className="mt-1 text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            {PROFILE.location} • he/him
          </p>

          {/* Social Icons Row */}
          <div className="mt-5 flex items-center justify-center gap-3">
            {SOCIAL.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 transition-all hover:bg-primary hover:text-white hover:scale-110 shadow-sm"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Links Section */}
          <div className="mt-8 text-left">
            <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3 uppercase tracking-wider">
              {locale === 'id' ? 'Tautan' : 'Links'}
            </h2>
            <div className="space-y-3">
              {PERSONAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.title}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className={`group flex items-center justify-between rounded-2xl border-2 border-neutral-200 dark:border-white/10 ${link.accentBorder} bg-neutral-50/80 dark:bg-white/5 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-100 dark:hover:bg-white/10 cursor-pointer shadow-sm`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-neutral-600 dark:text-neutral-300 transition-transform group-hover:scale-110" />
                      <div>
                        <span className="text-sm font-bold text-neutral-900 dark:text-white block">
                          {link.title}
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 block mt-0.5">
                          {link.description}
                        </span>
                      </div>
                    </div>
                    <FiArrowRight className="h-4 w-4 text-neutral-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Get in touch Card */}
          <div className="mt-8 text-left">
            <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mb-3 uppercase tracking-wider">
              {locale === 'id' ? 'Kontak Langsung' : 'Get in touch'}
            </h2>
            <div className="rounded-2xl border border-blue-200 dark:border-blue-500/20 bg-blue-50/80 dark:bg-[#131d2e] p-5 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1.5">
                <FiMail className="h-5 w-5" />
                <span className="text-sm font-bold">
                  {locale === 'id' ? 'Kirimkan Email' : 'Drop Me an Email'}
                </span>
              </div>
              <a
                href="mailto:rizkiarbi65@gmail.com"
                className="text-base font-bold text-neutral-900 dark:text-white hover:underline block mb-2"
              >
                rizkiarbi65@gmail.com
              </a>
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {locale === 'id'
                  ? 'Saya akan merespons pesan Anda secepat mungkin dengan senang hati!'
                  : "Expect my rapid and eager reply — your message won't be kept waiting!"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal Popup */}
      {showQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowQrModal(false);
          }}
        >
          <div className="relative w-full max-w-sm rounded-3xl border-2 border-neutral-300 dark:border-white/15 bg-white dark:bg-[#121622] p-6 shadow-2xl transition-all scale-100 animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setShowQrModal(false)}
              aria-label="Close modal"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <FiX className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-5">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/10 text-primary">
                <BsQrCode className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-brak font-bold text-neutral-900 dark:text-white">
                {locale === 'id' ? 'Kode QR Tautan' : 'Links QR Code'}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {locale === 'id'
                  ? 'Pindai kode untuk membuka halaman tautan ini'
                  : 'Scan this code to easily open this links page'}
              </p>
            </div>

            {/* QR Code Image Container */}
            <div className="mx-auto my-3 flex flex-col items-center justify-center rounded-2xl border-2 border-neutral-200 dark:border-white/10 bg-white p-4 shadow-inner max-w-[240px]">
              <img
                src={qrImageUrl}
                alt="Profile Links QR Code"
                width={200}
                height={200}
                className="rounded-lg h-auto w-full"
                loading="eager"
              />
              <span className="text-[11px] font-bold text-neutral-600 tracking-wide mt-2">
                @{PROFILE.first.toLowerCase()} • Links
              </span>
            </div>

            {/* Modal Actions */}
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-100 dark:bg-white/5 px-3 py-2.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 transition-all hover:bg-neutral-200 dark:hover:bg-white/10 active:scale-95 cursor-pointer"
              >
                {copied ? (
                  <>
                    <FiCheck className="h-3.5 w-3.5 text-emerald-500" />
                    <span className="text-emerald-500">
                      {locale === 'id' ? 'Tersalin!' : 'Copied!'}
                    </span>
                  </>
                ) : (
                  <>
                    <FiCopy className="h-3.5 w-3.5" />
                    <span>{locale === 'id' ? 'Salin URL' : 'Copy Link'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownloadQr}
                className="flex items-center justify-center gap-1.5 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-3 py-2.5 text-xs font-bold transition-all hover:opacity-90 active:scale-95 shadow-md cursor-pointer"
              >
                <FiDownload className="h-3.5 w-3.5" />
                <span>{locale === 'id' ? 'Unduh QR' : 'Download'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
