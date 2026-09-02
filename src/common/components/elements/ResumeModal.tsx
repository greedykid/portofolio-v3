'use client';

import { useEffect, useState } from 'react';
import {
  FiX,
  FiDownload,
  FiPrinter,
  FiExternalLink,
  FiCheckCircle,
  FiFileText,
  FiZoomIn,
  FiZoomOut,
  FiMaximize2,
} from 'react-icons/fi';
import { PROFILE } from '@/common/constant/data';
import { useLanguage } from '@/common/context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(100);
  const pdfUrl = '/documents/CV_Rizki_Arbiansyah.pdf';
  const previewWebp = '/documents/cv-preview.webp';
  const previewPng = '/documents/cv-preview.png';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setLoading(true);
      setZoom(100);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.open(pdfUrl, '_blank');
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 20, 60));
  const handleResetZoom = () => setZoom(100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-2.5 sm:p-5 md:p-6 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex flex-col w-full max-w-4xl h-[88vh] sm:h-[86vh] max-h-[920px] rounded-2xl sm:rounded-3xl border-2 border-neutral-300 dark:border-white/15 bg-white dark:bg-[#121622] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2.5 px-3.5 sm:px-6 py-3 sm:py-3.5 border-b border-neutral-200 dark:border-white/10 bg-neutral-50/90 dark:bg-white/5 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <FiFileText className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-brak font-bold text-xs sm:text-sm md:text-base text-neutral-900 dark:text-white truncate">
                  Curriculum Vitae — {PROFILE.name}
                </h3>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Verified ATS
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {PROFILE.role} • {PROFILE.location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={handlePrint}
              title={locale === 'id' ? 'Cetak / Simpan PDF' : 'Print / Save PDF'}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:text-primary hover:border-primary text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <FiPrinter className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{locale === 'id' ? 'Cetak' : 'Print'}</span>
            </button>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={locale === 'id' ? 'Buka di Tab Baru' : 'Open in New Tab'}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:text-primary hover:border-primary text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <FiExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{locale === 'id' ? 'Tab Baru' : 'New Tab'}</span>
            </a>

            <a
              href={pdfUrl}
              download="CV_Rizki_Arbiansyah.pdf"
              title={locale === 'id' ? 'Unduh Dokumen PDF' : 'Download PDF Document'}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <FiDownload className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download</span>
              <span className="sm:hidden">PDF</span>
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

        {/* Modal Body - High Resolution Document Preview */}
        <div className="relative flex-1 w-full bg-neutral-100/90 dark:bg-[#0c0f17] overflow-y-auto overflow-x-auto flex flex-col items-center min-h-0 p-2 sm:p-5">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-neutral-100 dark:bg-[#0c0f17] z-10 p-4 text-center">
              <div className="h-8 w-8 rounded-full border-3 border-indigo-600 border-t-transparent animate-spin" />
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {locale === 'id' ? 'Memuat Pratinjau Dokumen CV...' : 'Loading CV Document Preview...'}
              </p>
            </div>
          )}

          {/* Document Sheet Display */}
          <div
            className="transition-all duration-150 ease-out origin-top mx-auto my-auto flex items-center justify-center w-full"
            style={{ maxWidth: zoom <= 100 ? `${zoom * 7.5}px` : `${zoom * 8.5}px` }}
          >
            <picture className="w-full block">
              <source srcSet={previewWebp} type="image/webp" />
              <img
                src={previewPng}
                alt={`Curriculum Vitae — ${PROFILE.name}`}
                width={1836}
                height={2376}
                className="w-full h-auto rounded-lg sm:rounded-xl shadow-2xl border border-neutral-300/80 dark:border-white/10 bg-white select-none pointer-events-auto"
                onLoad={() => setLoading(false)}
                loading="eager"
              />
            </picture>
          </div>

          {/* Floating Zoom Bar for Mobile & Desktop */}
          <div className="sticky bottom-2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 dark:bg-neutral-800/90 text-white backdrop-blur-md shadow-xl border border-white/15 text-xs font-mono select-none">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 60}
              aria-label="Zoom out"
              className="p-1 rounded-full hover:bg-white/20 disabled:opacity-30 transition-colors cursor-pointer"
            >
              <FiZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="w-9 text-center text-[11px] font-bold">{zoom}%</span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 200}
              aria-label="Zoom in"
              className="p-1 rounded-full hover:bg-white/20 disabled:opacity-30 transition-colors cursor-pointer"
            >
              <FiZoomIn className="h-3.5 w-3.5" />
            </button>
            <div className="w-px h-3 bg-white/20 mx-0.5" />
            <button
              onClick={handleResetZoom}
              title={locale === 'id' ? 'Sesuaikan Ukuran' : 'Fit to Screen'}
              className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            >
              <FiMaximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between gap-3 px-3.5 sm:px-6 py-2.5 sm:py-3 border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121622] text-xs shrink-0">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px] sm:text-xs truncate">
            <FiCheckCircle className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {locale === 'id' ? 'Dokumen CV Resmi Terverifikasi (PDF)' : 'Official Verified CV Document (PDF)'}
            </span>
          </span>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 font-semibold text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <span>{locale === 'id' ? 'Buka Tab Baru' : 'Open in New Tab'}</span>
              <FiExternalLink className="h-3 w-3" />
            </a>

            <a
              href={pdfUrl}
              download="CV_Rizki_Arbiansyah.pdf"
              className="inline-flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              <span>{locale === 'id' ? 'Unduh PDF Asli' : 'Download Original PDF'}</span>
              <FiDownload className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
