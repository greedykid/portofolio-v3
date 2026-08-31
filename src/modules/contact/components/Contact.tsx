import SectionHeading from '@/common/components/elements/SectionHeading';
import ContactForm from '@/modules/contact/components/ContactForm';

export default function Contact() {
  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading
          title="Get in Touch"
          description="Punya proyek atau peluang kerja? Mari berdiskusi."
        />
        <div className="rounded-3xl border-2 border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900 md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
