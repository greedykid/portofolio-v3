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
        'rounded-3xl border-2 border-white/10 bg-[#141414] p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.4)] rtl:shadow-[-6px_6px_0px_0px_rgba(99,102,241,0.4)]',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,0.4)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
