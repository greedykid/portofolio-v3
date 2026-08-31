'use client';

import Container from '@/common/components/elements/Container';
import ContactForm from '@/modules/contact/components/ContactForm';
import { useLanguage } from '@/common/context/LanguageContext';

export default function ContactPage() {
  const { locale } = useLanguage();

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight mb-2">
            {locale === 'id' ? 'Mari Terhubung' : "Let's Connect"}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-xl">
            {locale === 'id'
              ? 'Punya ide proyek, tawaran kolaborasi, atau peluang kerja? Jangan ragu untuk menghubungi saya.'
              : 'Have a project in mind, collaboration idea, or career opportunity? Feel free to reach out anytime.'}
          </p>
        </div>

        {/* Form Container Card */}
        <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-6 md:p-10 lg:p-12 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)]">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
