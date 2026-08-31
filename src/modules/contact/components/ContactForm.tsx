'use client';

import { useState } from 'react';

export default function ContactForm() {
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

  if (state === 'success') {
    return (
      <p className="text-emerald-500 font-medium">Terima kasih! Pesan Anda telah terkirim.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <input
        type="text"
        name="name"
        placeholder="Nama"
        required
        className="rounded-xl border-2 border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1a1a1a] px-4 py-3 text-neutral-900 dark:text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-primary"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="rounded-xl border-2 border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1a1a1a] px-4 py-3 text-neutral-900 dark:text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-primary"
      />
      <textarea
        name="message"
        placeholder="Pesan Anda"
        rows={5}
        required
        className="rounded-xl border-2 border-neutral-300 dark:border-white/10 bg-white dark:bg-[#1a1a1a] px-4 py-3 text-neutral-900 dark:text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-primary md:col-span-2"
      />
      <button
        type="submit"
        disabled={state === 'sending'}
        className="rounded-xl border-2 border-primary bg-primary px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-primary/90 hover:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.4)] disabled:opacity-50 md:col-span-2 md:w-fit cursor-pointer"
      >
        {state === 'sending' ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
      {state === 'error' && (
        <p className="md:col-span-2 text-sm text-red-500">
          Gagal mengirim pesan. Silakan coba lagi atau email langsung ke rizkiarbi65@gmail.com.
        </p>
      )}
    </form>
  );
}

