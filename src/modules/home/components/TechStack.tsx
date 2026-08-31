import SectionHeading from '@/common/components/elements/SectionHeading';
import { TECH_STACK } from '@/common/constant/services';

export default function TechStack() {
  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading
          title="Tools of the Trade"
          description="Ini tools dan teknologi yang saya pakai buat build things."
        />
        <div className="flex flex-wrap gap-3">
          {TECH_STACK.map(({ name }) => (
            <span
              key={name}
              className="inline-flex items-center rounded-xl border-2 border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.4)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 cursor-grab dark:hover:border-primary"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
