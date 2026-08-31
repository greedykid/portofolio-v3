import { FiMapPin, FiBriefcase } from 'react-icons/fi';
import { PROFILE } from '@/common/constant/data';

export default function Introduction() {
  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl p-6 md:p-14 overflow-hidden border-2 border-white/10 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] rtl:shadow-[-6px_6px_0px_0px_rgba(99,102,241,0.3)] bg-[#101010]">
          {/* Gradient glow top-right */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl"
              style={{ background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
            />
          </div>

          <div className="relative z-50 w-full">
            <h1 className="text-white text-2xl md:text-3xl lg:text-5xl font-brak leading-tight mb-4 md:mb-8">
              <span className="inline-block">Hey</span>
              <span className="inline-flex items-baseline ms-2 md:ms-3 me-2 md:me-4">
                <span className="text-4xl md:text-5xl lg:text-6xl inline-block origin-[70%_70%] animate-wave">👋</span>
              </span>
              I&apos;m {PROFILE.first}.
            </h1>

            <p className="text-white text-xl md:text-3xl lg:text-4xl font-bold leading-tight mb-8 md:mb-12">
              Saya membangun{' '}
              <span className="bg-white text-black px-2 rounded">digital experiences</span>{' '}
              yang berfungsi dan dirancang dengan baik. Turning ideas into reality, at the speed of thought.
            </p>

            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <div className="group text-white flex items-center gap-2 text-base md:text-lg font-medium cursor-default">
                <FiMapPin className="transition-transform duration-300 group-hover:scale-110" />
                <span className="relative">
                  Based in {PROFILE.location}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-white/70 transition-all duration-300 group-hover:w-full" />
                </span>
              </div>
              <div className="group text-white flex items-center gap-2 text-base md:text-lg font-medium cursor-default">
                <FiBriefcase className="transition-transform duration-300 group-hover:scale-110" />
                <span className="relative">
                  {PROFILE.workType}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-white/70 transition-all duration-300 group-hover:w-full" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
