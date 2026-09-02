'use client';

import { useEffect, useState, useRef } from 'react';
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
  FiMinimize2,
  FiRotateCcw,
} from 'react-icons/fi';
import { PROFILE } from '@/common/constant/data';
import { useLanguage } from '@/common/context/LanguageContext';
import { cn } from '@/lib/utils';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { locale } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const pdfUrl = '/documents/CV_Rizki_Arbiansyah.pdf';
  const previewWebp = '/documents/cv-preview.webp';
  const previewPng = '/documents/cv-preview.png';

  // Track container width to calculate responsive zoom on both mobile and desktop
  useEffect(() => {
    if (!isOpen) return;

    const measureWidth = () => {
      if (scrollContainerRef.current) {
        setContainerWidth(scrollContainerRef.current.clientWidth);
      }
    };

    measureWidth();
    const timer = setTimeout(measureWidth, 100);
    window.addEventListener('resize', measureWidth);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureWidth);
    };
  }, [isOpen, isFullscreen]);

  // Sync fullscreen state with document.fullscreenElement
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle ESC and keyboard shortcuts for zoom / fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === '+' || e.key === '=') {
        setZoom((prev) => Math.min(prev + 25, 200));
      } else if (e.key === '-' || e.key === '_') {
        setZoom((prev) => Math.max(prev - 25, 50));
      } else if (e.key === '0') {
        setZoom(100);
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

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoom(100);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen && !document.fullscreenElement) {
        if (modalRef.current?.requestFullscreen) {
          await modalRef.current.requestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch {
      // Graceful fallback for mobile browsers where Fullscreen API might be restricted
      setIsFullscreen((prev) => !prev);
    }
  };

  // Base readable sheet width (capped at 740px on desktop, or viewport width - padding on mobile)
  const availableWidth = containerWidth > 40 ? containerWidth - 24 : 340;
  const baseWidth = Math.min(availableWidth, 740);
  const calculatedWidth = Math.round((baseWidth * zoom) / 100);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        'fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-200 animate-in fade-in',
        isFullscreen ? 'p-0' : 'p-2 sm:p-4 md:p-6'
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isFullscreen) onClose();
      }}
    >
      <div
        ref={modalRef}
        className={cn(
          'relative flex flex-col w-full bg-white dark:bg-[#121622] shadow-2xl overflow-hidden transition-all duration-200 animate-in zoom-in-95',
          isFullscreen
            ? 'fixed inset-0 h-full w-full max-w-none max-h-none rounded-none border-0'
            : 'max-w-4xl h-[88vh] sm:h-[86vh] max-h-[920px] rounded-2xl sm:rounded-3xl border-2 border-neutral-300 dark:border-white/15 my-auto'
        )}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-2.5 sm:py-3.5 border-b border-neutral-200 dark:border-white/10 bg-neutral-50/95 dark:bg-white/5 shrink-0">
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
            {/* Fullscreen button in header */}
            <button
              onClick={toggleFullscreen}
              title={
                isFullscreen
                  ? locale === 'id'
                    ? 'Keluar Layar Penuh (Esc)'
                    : 'Exit Fullscreen (Esc)'
                  : locale === 'id'
                  ? 'Layar Penuh'
                  : 'Fullscreen'
              }
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:text-primary hover:border-primary text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              {isFullscreen ? (
                <FiMinimize2 className="h-3.5 w-3.5" />
              ) : (
                <FiMaximize2 className="h-3.5 w-3.5" />
              )}
              <span className="hidden md:inline">
                {isFullscreen
                  ? locale === 'id'
                    ? 'Kecilkan'
                    : 'Exit'
                  : locale === 'id'
                  ? 'Layar Penuh'
                  : 'Fullscreen'}
              </span>
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              title={locale === 'id' ? 'Cetak / Simpan PDF' : 'Print / Save PDF'}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:text-primary hover:border-primary text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              <FiPrinter className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{locale === 'id' ? 'Cetak' : 'Print'}</span>
            </button>

            {/* Open in New Tab */}
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

            {/* Download button */}
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

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-200/80 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-white/20 transition-all cursor-pointer ml-1"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body - High Resolution Document Preview with Responsive Scaling */}
        <div
          ref={scrollContainerRef}
          className="relative flex-1 w-full bg-neutral-200/80 dark:bg-[#0c0f17] overflow-auto min-h-0 touch-pan-x touch-pan-y flex flex-col justify-between"
        >
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-neutral-100 dark:bg-[#0c0f17] z-10 p-4 text-center">
              <div className="h-8 w-8 rounded-full border-3 border-indigo-600 border-t-transparent animate-spin" />
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {locale === 'id' ? 'Memuat Pratinjau Dokumen CV...' : 'Loading CV Document Preview...'}
              </p>
            </div>
          )}

          {/* Document Sheet Display Container */}
          <div className="min-w-full w-max flex justify-center py-4 px-2 sm:px-6 my-auto">
            <div
              className="transition-all duration-200 ease-out origin-top shrink-0 shadow-2xl rounded-lg sm:rounded-xl overflow-hidden border border-neutral-300/80 dark:border-white/15 bg-white"
              style={{
                width: calculatedWidth ? `${calculatedWidth}px` : '100%',
                maxWidth: calculatedWidth ? undefined : '740px',
              }}
            >
              <picture className="w-full block">
                <source srcSet={previewWebp} type="image/webp" />
                <img
                  src={previewPng}
                  alt={`Curriculum Vitae — ${PROFILE.name}`}
                  width={1836}
                  height={2376}
                  className="w-full h-auto block select-none pointer-events-auto"
                  onLoad={() => setLoading(false)}
                  loading="eager"
                />
              </picture>
            </div>
          </div>

          {/* Floating Zoom & Controls Bar */}
          <div className="sticky bottom-3 z-20 flex items-center justify-center pb-1 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 dark:bg-neutral-800/95 text-white backdrop-blur-md shadow-2xl border border-white/20 text-xs font-mono select-none">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 50}
                title={locale === 'id' ? 'Perkecil (-)' : 'Zoom Out (-)'}
                aria-label="Zoom out"
                className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 transition-colors cursor-pointer"
              >
                <FiZoomOut className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={handleResetZoom}
                title={locale === 'id' ? 'Klik untuk reset 100%' : 'Click to reset to 100%'}
                className="px-2 py-0.5 rounded-md hover:bg-white/10 text-[11px] font-bold tracking-wider cursor-pointer"
              >
                {zoom}%
              </button>

              <button
                onClick={handleZoomIn}
                disabled={zoom >= 200}
                title={locale === 'id' ? 'Perbesar (+)' : 'Zoom In (+)'}
                aria-label="Zoom in"
                className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30 transition-colors cursor-pointer"
              >
                <FiZoomIn className="h-3.5 w-3.5" />
              </button>

              <div className="w-px h-3.5 bg-white/20 mx-0.5" />

              <button
                onClick={handleResetZoom}
                title={locale === 'id' ? 'Reset Ukuran (100%)' : 'Reset Zoom (100%)'}
                aria-label="Reset zoom"
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              >
                <FiRotateCcw className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={toggleFullscreen}
                title={
                  isFullscreen
                    ? locale === 'id'
                      ? 'Keluar Layar Penuh'
                      : 'Exit Fullscreen'
                    : locale === 'id'
                    ? 'Layar Penuh'
                    : 'Fullscreen'
                }
                aria-label="Toggle fullscreen"
                className="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              >
                {isFullscreen ? (
                  <FiMinimize2 className="h-3.5 w-3.5" />
                ) : (
                  <FiMaximize2 className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
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
