'use client';

import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <div
      className={cn(
        'reset-transition opacity-0 translate-y-6 transition-all duration-700 ease-out',
        className,
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      ref={(el) => {
        if (!el) return;
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              el.classList.remove('opacity-0');
              el.classList.remove('translate-y-6');
              observer.disconnect();
            }
          },
          { threshold: 0.1 },
        );
        observer.observe(el);
      }}
    >
      {children}
    </div>
  );
}
