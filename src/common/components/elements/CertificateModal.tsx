'use client';

import { useEffect, useState } from 'react';
import { FiX, FiExternalLink, FiDownload, FiAward, FiCheckCircle } from 'react-icons/fi';
import type { Certificate } from '@/common/constant/experience';
import { useLanguage } from '@/common/context/LanguageContext';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (certificate) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setLoading(true);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [certificate, onClose]);

  if (!certificate || !certificate.pdfUrl) return null;

  // Google Docs Viewer allows seamless PDF rendering across all mobile (Android/iOS) and desktop browsers without downloading
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(certificate.pdfUrl)}&embedded=true`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex flex-col w-full max-w-3xl h-[75vh] sm:h-[80vh] max-h-[82vh] rounded-3xl border-2 border-neutral-300 dark:border-white/15 bg-white dark:bg-[#121622] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 my-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-3.5 border-b border-neutral-200 dark:border-white/10 bg-neutral-50/90 dark:bg-white/5 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <FiAward className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm md:text-base font-brak font-bold text-neutral-900 dark:text-white leading-snug truncate">
                {certificate.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {certificate.issuer} • <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{certificate.credentialId}</span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0 ml-1">
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noreferrer"
              title={locale === 'id' ? 'Buka / Unduh File Asli' : 'Open / Download Original PDF'}
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:text-primary hover:border-primary transition-all cursor-pointer shadow-sm"
            >
              <FiExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-neutral-200/80 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-white/20 transition-all cursor-pointer"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body - Cloud PDF Viewer for 100% Mobile & Desktop Compatibility */}
        <div className="relative flex-1 w-full bg-neutral-100 dark:bg-[#0c0f17] flex flex-col overflow-hidden min-h-0">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-neutral-100 dark:bg-[#0c0f17] z-10 p-4 text-center">
              <div className="h-7 w-7 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                {locale === 'id' ? 'Memuat Pratinjau Dokumen PDF...' : 'Loading PDF Document Preview...'}
              </p>
            </div>
          )}

          <iframe
            src={googleViewerUrl}
            title={certificate.title}
            className="w-full h-full flex-1 border-0"
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121622] text-xs shrink-0">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px] sm:text-xs">
            <FiCheckCircle className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{locale === 'id' ? 'Kredensial Terverifikasi' : 'Verified Official Credential'}</span>
          </span>

          <a
            href={certificate.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer text-[10px] sm:text-xs shrink-0"
          >
            <span>{locale === 'id' ? 'Download PDF Asli' : 'Download Original PDF'}</span>
            <FiDownload className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
