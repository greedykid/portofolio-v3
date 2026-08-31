import { cn } from '@/lib/utils';

interface BreaklineProps {
  className?: string;
}

export default function Breakline({ className }: BreaklineProps) {
  return <div className={cn('w-full border-t border-neutral-200 dark:border-neutral-800', className)} />;
}
