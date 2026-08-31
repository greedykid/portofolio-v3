import { TECH_STACK } from '@/common/constant/services';

export default function TechStack() {
  return (
    <section className="w-full h-auto md:h-[380px]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-full">
        <div className="backdrop-blur-lg border-white/5 dark:border-white/5 relative rounded-3xl h-full bg-indigo-50 border-2 !border-indigo-400 shadow-[6px_6px_0px_0px_rgba(79,70,229,1)] rtl:shadow-[-6px_6px_0px_0px_rgba(79,70,229,1)] overflow-hidden">
          <div className="absolute top-10 left-10 right-10 z-20 flex flex-col md:flex-row md:items-start justify-between gap-6 pointer-events-none">
            <h2 className="text-black tracking-tight text-3xl lg:text-4xl font-brak">Tools of the Trade</h2>
            <p className="text-black/80 text-base lg:text-lg max-w-xl">
              Ini tools dan teknologi yang saya pakai buat build things. Feel free to drag them around!
            </p>
          </div>

          {/* Tool chips grid */}
          <div className="absolute inset-x-0 bottom-6 top-32 flex flex-wrap items-center justify-center gap-3 p-6">
            {TECH_STACK.map(({ name }) => (
              <div
                key={name}
                className="cursor-grab rounded-2xl border-2 border-black bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:cursor-grabbing"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
