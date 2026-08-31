import SectionHeading from '@/common/components/elements/SectionHeading';
import { PROFILE } from '@/common/constant/data';
import { FiArrowUpRight } from 'react-icons/fi';

export default function AboutSection() {
  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="flex flex-col-reverse lg:flex-row gap-6">
          {/* About card */}
          <div className="w-full lg:w-[70%] bg-[#141414] rounded-3xl p-6 md:p-10 lg:p-12 relative group border-2 border-white/10 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.4)] rtl:shadow-[-6px_6px_0px_0px_rgba(99,102,241,0.4)] overflow-hidden">
            {/* gradient beam */}
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute h-[200px] w-[200px] rounded-full opacity-40 blur-3xl mix-blend-screen"
                style={{ background: 'linear-gradient(to left, #6366f1, #a855f7, transparent)' }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-neutral-100 text-2xl md:text-3xl lg:text-4xl tracking-tight font-brak mb-4 md:mb-6">
                About Me
              </h2>
              <div className="space-y-4 md:space-y-6">
                {PROFILE.aboutParagraphs.map((para, i) => (
                  <p key={i} className="text-neutral-100 text-base md:text-lg leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              <a
                href="/about"
                className="mt-6 md:mt-8 inline-flex items-center gap-2 text-white hover:text-neutral-200 transition-colors group/link"
              >
                <span className="font-semibold text-base md:text-lg">More about me</span>
                <FiArrowUpRight className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
              </a>
            </div>
          </div>

          {/* 3D avatar */}
          <div className="flex items-center justify-center w-full lg:w-[30%]" style={{ perspective: '1000px' }}>
            <div className="[transform-style:preserve-3d] w-full h-full">
              <div className="transition duration-200 ease-linear w-full h-full">
                <div className="flex h-full min-h-[200px] w-full items-center justify-center rounded-3xl border-2 border-black bg-gradient-to-br from-slate-100 to-slate-200 text-8xl font-brak text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  {PROFILE.first.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
