import Container from '@/common/components/elements/Container';
import SectionHeading from '@/common/components/elements/SectionHeading';
import Breakline from '@/common/components/elements/Breakline';
import { PROFILE } from '@/common/constant/data';
import { SKILL_CATEGORIES } from '@/common/constant/services';
import { EDUCATION, CERTIFICATES } from '@/common/constant/experience';

export const metadata = {
  title: 'About',
  description: 'Tentang Rizki Arbiansyah — web developer & IT support.',
};

export default function AboutPage() {
  return (
    <Container>
      <div className="flex flex-col gap-16">
        <section>
          <SectionHeading title="About Me" />
          <div className="space-y-4">
            {PROFILE.aboutParagraphs.map((para, i) => (
              <p
                key={i}
                className="max-w-3xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300"
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        <Breakline />

        <section>
          <SectionHeading title="Skills" description="Kemampuan dan keahlian teknis." />
          <div className="grid gap-6 md:grid-cols-2">
            {SKILL_CATEGORIES.map(({ category, icon: Icon, skills }) => (
              <div
                key={category}
                className="rounded-3xl border-2 border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900 md:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-1 text-sm text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Breakline />

        <section>
          <SectionHeading title="Education & Certificates" />
          <div className="space-y-6">
            <div className="rounded-3xl border-2 border-neutral-200 bg-white p-6 md:p-8 dark:border-neutral-700 dark:bg-neutral-900">
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
            <div className="rounded-3xl border-2 border-neutral-200 bg-white p-6 md:p-8 dark:border-neutral-700 dark:bg-neutral-900">
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
        </section>
      </div>
    </Container>
  );
}
