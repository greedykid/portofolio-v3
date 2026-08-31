import Container from '@/common/components/elements/Container';
import SectionHeading from '@/common/components/elements/SectionHeading';
import ContactForm from '@/modules/contact/components/ContactForm';
import SocialMedia from '@/common/components/elements/SocialMedia';
import { PROFILE, SOCIAL_MEDIA } from '@/common/constant/data';

export const metadata = {
  title: 'Contact',
  description: 'Hubungi Rizki Arbiansyah untuk peluang kerja atau kolaborasi.',
};

export default function ContactPage() {
  return (
    <Container>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading title="Contact" description="Mari terhubung." />
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
              Saya selalu terbuka untuk peluang kerja, kolaborasi proyek, atau sekadar berdiskusi
              tentang web development dan teknologi. Jangan ragu untuk menghubungi saya.
            </p>
            <div className="space-y-3">
              <a href={SOCIAL_MEDIA.email} className="block text-primary hover:underline">
                {SOCIAL_MEDIA.email.replace('mailto:', '')}
              </a>
            </div>
            <SocialMedia />
          </div>
        </div>
        <div className="rounded-3xl border-2 border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900 md:p-8">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
