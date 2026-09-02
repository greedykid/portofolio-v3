'use client';

import { useEffect } from 'react';
import { FiX, FiDownload, FiPrinter, FiMail, FiMapPin, FiExternalLink, FiAward, FiCheckCircle } from 'react-icons/fi';
import { FaGraduationCap, FaBriefcase, FaCode, FaServer, FaLinkedin, FaGithub } from 'react-icons/fa';
import { PROFILE, SOCIAL_MEDIA } from '@/common/constant/data';
import { CERTIFICATES } from '@/common/constant/experience';
import { useLanguage } from '@/common/context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { locale } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex flex-col w-full max-w-3xl h-[88vh] max-h-[88vh] rounded-3xl border-2 border-neutral-300 dark:border-white/15 bg-white dark:bg-[#121622] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3.5 border-b border-neutral-200 dark:border-white/10 bg-neutral-50/90 dark:bg-white/5 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-brak font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
              Curriculum Vitae — {PROFILE.name}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              title={locale === 'id' ? 'Cetak / Simpan PDF' : 'Print / Save PDF'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:text-primary hover:border-primary text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <FiPrinter className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{locale === 'id' ? 'Cetak' : 'Print'}</span>
            </button>

            <a
              href="/documents/CV_Rizki_Arbiansyah.pdf"
              download="CV_Rizki_Arbiansyah.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <FiDownload className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-200/80 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-white/20 transition-all cursor-pointer ml-1"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-neutral-800 dark:text-neutral-200">
          {/* Header Info */}
          <div className="border-b border-neutral-200 dark:border-white/10 pb-6">
            <h1 className="text-2xl sm:text-3xl font-brak font-bold text-neutral-900 dark:text-white">
              {PROFILE.name}
            </h1>
            <p className="text-base font-semibold text-primary dark:text-indigo-400 mt-1">
              {PROFILE.role}
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed max-w-2xl">
              {PROFILE.biography}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              <span className="inline-flex items-center gap-1.5">
                <FiMapPin className="h-3.5 w-3.5 text-indigo-500" />
                {PROFILE.location}
              </span>
              <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-1.5 hover:underline text-neutral-800 dark:text-neutral-200 font-mono">
                <FiMail className="h-3.5 w-3.5 text-indigo-500" />
                {PROFILE.email}
              </a>
              <a href={SOCIAL_MEDIA.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
                <FaLinkedin className="h-3.5 w-3.5 text-[#0077b5]" />
                LinkedIn Profile
              </a>
              <a href={SOCIAL_MEDIA.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
                <FaGithub className="h-3.5 w-3.5" />
                GitHub Portfolio
              </a>
            </div>
          </div>

          {/* Pendidikan */}
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 flex items-center gap-2 mb-3">
              <FaGraduationCap className="h-4 w-4 text-teal-500" />
              <span>{locale === 'id' ? 'Pendidikan Formal' : 'Formal Education'}</span>
            </h2>
            <div className="rounded-2xl border border-neutral-200 dark:border-white/10 p-4 bg-neutral-50/50 dark:bg-white/5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base">
                  Sarjana (S1) Sistem Informasi — Universitas Gunadarma
                </h3>
                <span className="text-xs font-mono font-semibold text-neutral-500 dark:text-neutral-400 shrink-0">
                  2022 - 2026 (Lulus)
                </span>
              </div>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                IPK: 3.58 / 4.00
              </p>
              <ul className="mt-2.5 space-y-1 text-xs text-neutral-600 dark:text-neutral-400">
                <li>• Fokus Keilmuan: Pemrograman Web, Basis Data Relasional, Rekayasa Perangkat Lunak, Jaringan Komputer, Keamanan Sistem Informasi.</li>
                <li>• Menyelesaikan Penulisan Ilmiah bertajuk E-Commerce Platform "GEGARES" berbasis Laravel 12 & MySQL.</li>
              </ul>
            </div>
          </div>

          {/* Pengalaman Proyek & Karir */}
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 flex items-center gap-2 mb-3">
              <FaBriefcase className="h-4 w-4 text-indigo-500" />
              <span>{locale === 'id' ? 'Pengalaman Proyek & Karir' : 'Project & Professional Experience'}</span>
            </h2>
            <div className="space-y-3">
              <div className="rounded-2xl border border-neutral-200 dark:border-white/10 p-4 bg-neutral-50/50 dark:bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                    Pengembang Web — Website Katalog Digital "Berkah Mulia" (bmberkahmulia.com)
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 shrink-0">Jun 2026 – Sekarang</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                  Merancang, membangun, dan mendeploy website katalog digital aktif berbasis framework Laravel dan MySQL dengan struktur kategori produk bertingkat, optimasi gambar lazy-loading, dan antarmuka responsif Tailwind CSS.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 dark:border-white/10 p-4 bg-neutral-50/50 dark:bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                    Pengembang Web & Peneliti — Platform E-Commerce "GEGARES"
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 shrink-0">Sep 2025 – Feb 2026</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                  Mengembangkan aplikasi e-commerce fungsional lengkap dengan katalog interaktif, alur checkout, optimasi query transaksi MySQL, dan dokumentasi sistem (ERD, UML, Use Case) untuk luaran Penulisan Ilmiah Universitas Gunadarma.
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 dark:border-white/10 p-4 bg-neutral-50/50 dark:bg-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-bold text-neutral-900 dark:text-white text-sm">
                    IT Support & Jaringan Komputer — Layanan Mandiri & Praktik Akademik
                  </h3>
                  <span className="text-xs font-mono text-neutral-500 shrink-0">2023 – 2025</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                  Melakukan troubleshooting hardware & software PC/laptop, instalasi & konfigurasi OS (Windows/Linux), pemeliharaan printer, serta konfigurasi router dan jaringan lokal (LAN & Wi-Fi).
                </p>
              </div>
            </div>
          </div>

          {/* Keahlian Teknis */}
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 flex items-center gap-2 mb-3">
              <FaCode className="h-4 w-4 text-purple-500" />
              <span>{locale === 'id' ? 'Kompetensi & Keahlian Teknis' : 'Technical Competencies'}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-2xl border border-neutral-200 dark:border-white/10 p-3.5 bg-neutral-50/50 dark:bg-white/5">
                <p className="font-bold text-neutral-900 dark:text-white mb-1.5">Web Development:</p>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Laravel 12, PHP, MySQL (Relational Modeling & Query Optimization), Tailwind CSS, Next.js, HTML5/CSS3, JavaScript, Git/GitHub.
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-200 dark:border-white/10 p-3.5 bg-neutral-50/50 dark:bg-white/5">
                <p className="font-bold text-neutral-900 dark:text-white mb-1.5">IT Support & Jaringan:</p>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Hardware Troubleshooting, OS Installation (Windows 11/Linux), Printer Maintenance, LAN/Wi-Fi Setup, Cisco Router Configuration.
                </p>
              </div>
            </div>
          </div>

          {/* Sertifikasi Resmi */}
          <div>
            <h2 className="text-sm font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 flex items-center gap-2 mb-3">
              <FiAward className="h-4 w-4 text-amber-500" />
              <span>{locale === 'id' ? 'Sertifikasi Resmi Universitas Gunadarma' : 'Verified Official Certifications'}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {CERTIFICATES.map((cert) => (
                <div key={cert.title} className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-neutral-50/50 dark:bg-white/5">
                  <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate mr-2">{cert.title}</span>
                  <span className="text-[11px] font-mono font-bold text-teal-600 dark:text-teal-400 shrink-0">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-3 border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121622] text-xs text-neutral-500 shrink-0">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] sm:text-xs">
            <FiCheckCircle className="h-3.5 w-3.5 shrink-0" />
            <span>Dokumen CV Resmi Terverifikasi</span>
          </span>

          <a
            href={`mailto:${PROFILE.email}?subject=Tawaran%20Kerja%20untuk%20Rizki%20Arbiansyah`}
            className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Hubungi untuk Peluang Kerja →
          </a>
        </div>
      </div>
    </div>
  );
}
