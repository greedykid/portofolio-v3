import { PROFILE } from '@/common/constant/data';
import { FiArrowUpRight } from 'react-icons/fi';

export default function AboutSection() {
  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-stretch gap-6">
          {/* About card */}
          <div className="w-full lg:w-[70%] flex flex-col justify-between bg-white dark:bg-[#141414] rounded-3xl p-6 md:p-10 lg:p-12 relative group border-2 border-neutral-300/80 dark:border-white/10 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.4)] overflow-hidden">
            {/* gradient beam */}
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute h-[200px] w-[200px] rounded-full opacity-30 blur-3xl mix-blend-screen"
                style={{ background: 'linear-gradient(to left, #6366f1, #a855f7, transparent)' }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-neutral-900 dark:text-neutral-100 text-2xl md:text-3xl lg:text-4xl tracking-tight font-brak font-bold mb-4 md:mb-6">
                About Me
              </h2>
              <div className="space-y-4 md:space-y-5">
                {PROFILE.aboutParagraphs.map((para, i) => (
                  <p key={i} className="text-neutral-700 dark:text-neutral-200 text-sm md:text-base leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-6">
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-primary dark:text-white hover:underline transition-colors group/link"
              >
                <span className="font-semibold text-sm md:text-base">More about me</span>
                <FiArrowUpRight className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
              </a>
            </div>
          </div>

          {/* 3D avatar */}
          <div className="flex w-full lg:w-[30%] min-h-[240px] lg:min-h-full" style={{ perspective: '1000px' }}>
            <div className="[transform-style:preserve-3d] w-full h-full">
              <div className="flex h-full w-full items-center justify-center rounded-3xl border-2 border-neutral-900 dark:border-white/10 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-neutral-900 dark:to-neutral-950 text-8xl font-brak font-bold text-neutral-900 dark:text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.4)]">
                {PROFILE.first.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

