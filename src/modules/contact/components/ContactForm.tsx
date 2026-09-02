'use client';

import { useState } from 'react';
import { FiChevronRight, FiCheckCircle, FiMail, FiSend, FiRefreshCw } from 'react-icons/fi';
import { useLanguage } from '@/common/context/LanguageContext';
import { PROFILE } from '@/common/constant/data';

export default function ContactForm() {
  const { t, locale } = useLanguage();
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    data.append('_subject', `[Portofolio v3] Pesan Baru dari ${data.get('name')}`);
    data.append('_template', 'table');
    data.append('_captcha', 'false');

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
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
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-brak font-bold text-neutral-900 dark:text-white">
          {t('contact_form_title')}
        </h2>
        <a
          href={`mailto:${PROFILE.email}`}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary dark:text-indigo-400 hover:underline"
        >
          <FiMail className="h-3.5 w-3.5" />
          <span>{PROFILE.email}</span>
        </a>
      </div>

      {state === 'success' ? (
        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
          <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-500">
            <FiCheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {t('contact_success_msg')}
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-md mx-auto">
              {t('contact_success_sub')}
            </p>
          </div>
          <button
            onClick={() => setState('idle')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-white/10 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/10 transition-all cursor-pointer shadow-sm"
          >
            <FiRefreshCw className="h-3.5 w-3.5" />
            <span>{locale === 'id' ? 'Kirim Pesan Lain' : 'Send Another Message'}</span>
          </button>
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
              <FiSend className="h-4 w-4" />
              <span>{state === 'sending' ? t('contact_sending') : t('contact_send')}</span>
              <FiChevronRight className="h-4 w-4" />
            </button>
          </div>

          {state === 'error' && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 text-center">
              <p>{t('contact_error_msg')}</p>
              <a href={`mailto:${PROFILE.email}`} className="underline font-bold mt-1 inline-block">
                Kirim langsung melalui email ke {PROFILE.email}
              </a>
            </div>
          )}

          <p className="text-center text-xs text-neutral-500 pt-1">
            {t('contact_privacy_note')}
          </p>
        </form>
      )}
    </div>
  );
}
