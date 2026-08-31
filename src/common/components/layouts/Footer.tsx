import Container from '@/common/components/elements/Container';
import SocialMedia from '@/common/components/elements/SocialMedia';
import { PROFILE } from '@/common/constant/data';

const FOOTER_LINKS = {
  pages: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  explore: [
    { label: 'Projects', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-10 relative overflow-hidden">
      <Container>
        <div className="relative rounded-3xl border-2 border-white/10 bg-neutral-950 p-6 md:p-10 lg:p-12">
          <div className="z-10 flex w-full flex-col-reverse justify-between gap-12 pb-10 md:flex-row md:pb-16 lg:pb-10">
            <div className="w-full space-y-8 md:w-[60%]">
              <div className="space-y-3">
                <h5 className="text-5xl font-brak text-white cursor-pointer w-fit">
                  Rizki Arbiansyah
                </h5>
                <p className="leading-relaxed text-neutral-400 md:pe-28">
                  {PROFILE.quote} — {PROFILE.quoteAuthor}
                </p>
              </div>
              <SocialMedia />
            </div>

            <div className="grid w-full gap-10 md:grid-cols-2 lg:grid-cols-2">
              <div className="w-full space-y-5">
                <h5 className="text-xl font-semibold text-white">Pages</h5>
                <ul className="space-y-2.5 font-medium">
                  {FOOTER_LINKS.pages.map(({ label, href }) => (
                    <li key={href} className="text-neutral-400 transition-colors duration-300 hover:text-neutral-200">
                      <a href={href}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full space-y-5">
                <h5 className="text-xl font-semibold text-white">Explore</h5>
                <ul className="space-y-2.5 font-medium">
                  {FOOTER_LINKS.explore.map(({ label, href }) => (
                    <li key={href} className="text-neutral-400 transition-colors duration-300 hover:text-neutral-200">
                      <a href={href}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Giant background name */}
          <div className="pointer-events-none absolute -bottom-7 start-3 z-0 flex items-baseline gap-2 text-[65px] font-[900] tracking-tight text-[#2e2e2ec7] md:-bottom-12 md:text-[120px] lg:-bottom-[106px] lg:gap-5 lg:text-[230px]">
            <span>Rizki</span>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-sm text-neutral-400">
            <span>rizkiarbiansyah.</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
