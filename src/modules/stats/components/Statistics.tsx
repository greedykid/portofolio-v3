import SectionHeading from '@/common/components/elements/SectionHeading';
import { STATS } from '@/common/constant/services';

export default function Statistics() {
  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading title="In Numbers" description="Beberapa angka yang menggambarkan perjalanan saya." />
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ number, label }) => (
            <div
              key={label}
              className="rounded-3xl border-2 border-neutral-200 bg-white p-6 text-center transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900"
            >
              <div className="text-3xl font-brak text-primary">{number}</div>
              <div className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
