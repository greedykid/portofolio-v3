'use client';

import { useEffect, useState } from 'react';
import { FiX, FiDownload, FiPrinter, FiExternalLink, FiCheckCircle, FiFileText } from 'react-icons/fi';
import { PROFILE } from '@/common/constant/data';
import { useLanguage } from '@/common/context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);
  const pdfUrl = '/documents/CV_Rizki_Arbiansyah.pdf';

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
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    const iframe = document.getElementById('resume-pdf-iframe') as HTMLIFrameElement | null;
    if (iframe?.contentWindow) {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        return;
      } catch {
        // Fallback if cross-origin or direct print blocked
      }
    }
    window.open(pdfUrl, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex flex-col w-full max-w-4xl h-[84vh] sm:h-[86vh] max-h-[900px] rounded-2xl sm:rounded-3xl border-2 border-neutral-300 dark:border-white/15 bg-white dark:bg-[#121622] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-3.5 border-b border-neutral-200 dark:border-white/10 bg-neutral-50/90 dark:bg-white/5 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
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
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-white/15 bg-white dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:text-primary hover:border-primary text-xs font-semibold transition-all cursor-pointer shadow-sm"
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
              <span className="hidden md:inline">{locale === 'id' ? 'Tab Baru' : 'New Tab'}</span>
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

        {/* Modal Body - PDF Document Preview */}
        <div className="relative flex-1 w-full bg-neutral-100 dark:bg-[#0c0f17] flex flex-col overflow-hidden min-h-0">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-neutral-100 dark:bg-[#0c0f17] z-10 p-4 text-center">
              <div className="h-8 w-8 rounded-full border-3 border-indigo-600 border-t-transparent animate-spin" />
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {locale === 'id' ? 'Memuat Pratinjau Dokumen PDF...' : 'Loading PDF Document Preview...'}
              </p>
            </div>
          )}

          <iframe
            id="resume-pdf-iframe"
            src={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
            title={`Curriculum Vitae — ${PROFILE.name}`}
            className="w-full h-full flex-1 border-0"
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121622] text-xs shrink-0">
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
