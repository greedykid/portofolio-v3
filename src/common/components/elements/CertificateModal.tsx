'use client';

import { useEffect, useState } from 'react';
import { FiX, FiExternalLink, FiDownload, FiFileText, FiAward, FiCheckCircle } from 'react-icons/fi';
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex flex-col w-full max-w-4xl max-h-[92vh] rounded-3xl border-2 border-neutral-300 dark:border-white/15 bg-white dark:bg-[#121622] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-neutral-200 dark:border-white/10 bg-neutral-50/80 dark:bg-white/5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <FiAward className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-brak font-bold text-neutral-900 dark:text-white truncate">
                {certificate.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                {certificate.issuer} • <span className="font-mono text-teal-600 dark:text-teal-400 font-semibold">{certificate.credentialId}</span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={certificate.pdfUrl}
              target="_blank"
              rel="noreferrer"
              title={locale === 'id' ? 'Buka di Tab Baru' : 'Open in New Tab'}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-300 dark:border-white/10 bg-white dark:bg-white/10 text-neutral-700 dark:text-neutral-200 hover:text-primary hover:border-primary transition-all cursor-pointer shadow-sm"
            >
              <FiExternalLink className="h-4 w-4" />
            </a>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-200/80 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-white/20 transition-all cursor-pointer"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body - PDF Iframe Viewer */}
        <div className="relative flex-1 w-full bg-neutral-100 dark:bg-[#0c0f17] min-h-[55vh] md:min-h-[70vh] flex flex-col items-center justify-center">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-100 dark:bg-[#0c0f17] z-10">
              <div className="h-8 w-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
              <p className="text-xs text-neutral-500 font-medium">
                {locale === 'id' ? 'Memuat Sertifikat PDF...' : 'Loading PDF Certificate...'}
              </p>
            </div>
          )}

          <iframe
            src={`${certificate.pdfUrl}#toolbar=0&navpanes=0`}
            title={certificate.title}
            className="w-full h-full flex-1 border-0"
            onLoad={() => setLoading(false)}
          />
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-neutral-200 dark:border-white/10 bg-neutral-50 dark:bg-[#121622] text-xs text-neutral-500">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <FiCheckCircle className="h-3.5 w-3.5" />
            <span>{locale === 'id' ? 'Kredensial Resmi Terverifikasi' : 'Verified Official Credential'}</span>
          </span>

          <a
            href={certificate.pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
          >
            <span>{locale === 'id' ? 'Buka / Unduh File Asli' : 'Open / Download Original PDF'}</span>
            <FiExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
