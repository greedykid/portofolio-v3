import SectionHeading from '@/common/components/elements/SectionHeading';
import { SERVICES } from '@/common/constant/services';

export default function Services() {
  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading
          title="What I Do"
          description="Layanan yang saya tawarkan sebagai pengembang web dan IT support."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {SERVICES.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="group rounded-3xl border-2 border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900 md:p-8"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">{title}</h3>
              <p className="text-neutral-500 dark:text-neutral-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
