import SectionHeading from '@/common/components/elements/SectionHeading';
import { EDUCATION, CERTIFICATES } from '@/common/constant/experience';

export default function Education() {
  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading title="Education & Certificates" description="Latar belakang pendidikan dan sertifikasi kompetensi." />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border-2 border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900 md:p-8">
            <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white">{EDUCATION[0].degree}</h3>
            <p className="text-primary">{EDUCATION[0].institution}</p>
            <p className="mt-1 text-sm text-neutral-400">{EDUCATION[0].score}</p>
            <ul className="mt-4 space-y-2">
              {EDUCATION[0].bullets.map((b) => (
                <li key={b} className="flex gap-3 text-neutral-500 dark:text-neutral-400">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border-2 border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900 md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-white">Certificates</h3>
            <div className="space-y-3">
              {CERTIFICATES.map((cert) => (
                <div key={cert.credentialId} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-neutral-700 dark:text-neutral-300">{cert.title}</p>
                    <p className="text-sm text-neutral-400">{cert.issuer}</p>
                  </div>
                  <span className="shrink-0 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
