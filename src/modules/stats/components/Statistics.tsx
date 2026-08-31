import SectionHeading from '@/common/components/elements/SectionHeading';
import Card from '@/common/components/elements/Card';
import { STATS } from '@/common/constant/services';

export default function Statistics() {
  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading title="In Numbers" description="Beberapa angka yang menggambarkan perjalanan saya." />
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ number, label }) => (
            <Card key={label} hover className="text-center">
              <div className="text-3xl font-brak text-white">{number}</div>
              <div className="mt-2 text-sm text-neutral-400">{label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
