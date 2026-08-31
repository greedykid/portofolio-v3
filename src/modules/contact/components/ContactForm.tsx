'use client';

import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useLanguage } from '@/common/context/LanguageContext';

export default function ContactForm() {
  const { t } = useLanguage();
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formsubmit.co/ajax/rizkiarbi65@gmail.com', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setState('success');
        form.reset();
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-brak font-bold text-neutral-900 dark:text-white">
          {t('contact_form_title')}
        </h2>
      </div>

      {state === 'success' ? (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
          <p className="text-base font-bold text-emerald-500">
            Terima kasih! Pesan Anda telah terkirim.
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            Saya akan membalas pesan Anda sesegera mungkin.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                {t('contact_name')}
              </label>
              <input
                type="text"
                name="name"
                placeholder={t('contact_name_ph')}
                required
                className="w-full rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-[#1a202c] px-4 py-3.5 text-sm text-neutral-900 dark:text-white outline-none transition-all placeholder:text-neutral-500 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                {t('contact_email')}
              </label>
              <input
                type="email"
                name="email"
                placeholder={t('contact_email_ph')}
                required
                className="w-full rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-[#1a202c] px-4 py-3.5 text-sm text-neutral-900 dark:text-white outline-none transition-all placeholder:text-neutral-500 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Row 2: Message */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
              {t('contact_msg')}
            </label>
            <textarea
              name="message"
              placeholder={t('contact_msg_ph')}
              rows={5}
              required
              className="w-full rounded-2xl border border-neutral-300 dark:border-white/10 bg-neutral-50 dark:bg-[#1a202c] p-4 text-sm text-neutral-900 dark:text-white outline-none transition-all placeholder:text-neutral-500 focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* Row 3: Send Message Button */}
          <div>
            <button
              type="submit"
              disabled={state === 'sending'}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 py-3.5 text-sm font-bold shadow-lg transition-all duration-200 hover:bg-neutral-800 dark:hover:bg-neutral-100 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              <span>{state === 'sending' ? t('contact_sending') : t('contact_send')}</span>
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>

          {state === 'error' && (
            <p className="text-xs text-red-500 text-center">
              Gagal mengirim pesan. Silakan hubungi langsung ke rizkiarbi65@gmail.com.
            </p>
          )}

          <p className="text-center text-xs text-neutral-500 pt-1">
            By submitting this form, you agree to be contacted via email.
          </p>
        </form>
      )}
    </div>
  );
}
