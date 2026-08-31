import SectionHeading from '@/common/components/elements/SectionHeading';
import { EXPERIENCES } from '@/common/constant/experience';

function formatDate(date: string | null): string {
  if (!date) return 'Now';
  return new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' });
}

export default function Experiences() {
  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading title="Work Experience" description="Pengalaman kerja dan proyek profesional." />
        <div className="space-y-6">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.company}
              className="rounded-3xl border-2 border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900 md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">{exp.role}</h3>
                  <p className="mt-1 text-primary">{exp.company}</p>
                </div>
                <div className="text-sm text-neutral-400">
                  {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.responsibilities.map((resp) => (
                  <li key={resp} className="flex gap-3 text-neutral-500 dark:text-neutral-400">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
