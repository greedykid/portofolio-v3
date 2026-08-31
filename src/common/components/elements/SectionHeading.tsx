'use client';

import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-8 md:mb-12', className)}>
      <h2 className="section-heading">{title}</h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-base text-neutral-500 dark:text-neutral-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
