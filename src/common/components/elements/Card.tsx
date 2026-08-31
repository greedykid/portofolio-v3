import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#141414] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.4)] rtl:shadow-[-6px_6px_0px_0px_rgba(99,102,241,0.4)] text-neutral-900 dark:text-white',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,0.35)] dark:hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,0.4)]',
        className,
      )}
    >
      {children}
    </div>
  );
}

