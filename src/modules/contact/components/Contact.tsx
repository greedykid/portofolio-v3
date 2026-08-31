import SectionHeading from '@/common/components/elements/SectionHeading';
import Card from '@/common/components/elements/Card';
import ContactForm from '@/modules/contact/components/ContactForm';

export default function Contact() {
  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading
          title="Get in Touch"
          description="Punya proyek atau peluang kerja? Mari berdiskusi."
        />
        <Card>
          <ContactForm />
        </Card>
      </div>
    </section>
  );
}
