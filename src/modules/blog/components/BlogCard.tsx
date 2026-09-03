'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiEye, FiClock } from 'react-icons/fi';
import type { PostMeta } from '@/common/libs/blog';
import { useLanguage } from '@/common/context/LanguageContext';

interface BlogCardProps {
  post: PostMeta;
  index?: number;
}

function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return 'Recent';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { t, locale } = useLanguage();
  const baseHash = Math.abs(
    post.slug.split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  );
  const initialViews = 280 + (baseHash % 340);
  const [views, setViews] = useState<number>(initialViews);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const localStored = parseInt(localStorage.getItem(`blog_views_${post.slug}`) || '0', 10);
    if (localStored > 0) {
      setViews(initialViews + localStored);
    }
  }, [post.slug, initialViews]);

  const formattedDate = formatDate(post.date, locale);

  const isStorage = post.tags?.some((t) => /database|mysql|storage|sql/i.test(t)) || index % 4 === 1;
  const isReactTS = post.tags?.some((t) => /react|ts|typescript|frontend/i.test(t)) || index % 4 === 2;
  const isCode = post.tags?.some((t) => /laravel|php|backend|clean/i.test(t)) || index % 4 === 3;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#0e131b] p-5 md:p-6 min-h-[220px] w-full shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/60 hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,0.35)] select-none cursor-pointer"
    >
      {/* Decorative Background Graphics */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-indigo-600/10 blur-2xl group-hover:bg-indigo-600/20 transition-all duration-500" />

        {isStorage ? (
          <div className="absolute inset-0 flex items-center justify-end pe-4 opacity-15 dark:opacity-25 group-hover:opacity-35 transition-opacity duration-300">
            <svg viewBox="0 0 200 120" className="w-36 h-28 stroke-cyan-500 fill-none" strokeWidth="1.5">
              <path d="M40 80 a25 25 0 0 1 20 -40 a35 35 0 0 1 60 -10 a30 30 0 0 1 45 30 a25 25 0 0 1 -15 45 z" />
              <line x1="60" y1="50" x2="100" y2="70" strokeDasharray="3 3" />
              <line x1="100" y1="70" x2="140" y2="40" strokeDasharray="3 3" />
              <circle cx="60" cy="50" r="3" className="fill-cyan-400" />
              <circle cx="100" cy="70" r="3.5" className="fill-indigo-400" />
              <circle cx="140" cy="40" r="3" className="fill-purple-400" />
            </svg>
          </div>
        ) : isReactTS ? (
          <div className="absolute inset-0 flex items-center justify-end pe-6 opacity-15 dark:opacity-20 group-hover:opacity-30 transition-opacity duration-300">
            <div className="flex items-center gap-1 font-mono text-4xl font-extrabold text-blue-400/70">
              <span>{'{'}</span>
              <span className="text-2xl bg-blue-500/20 px-2 py-0.5 rounded text-blue-400 font-sans font-bold">TS</span>
              <span>{'}'}</span>
            </div>
          </div>
        ) : isCode ? (
          <div className="absolute inset-0 flex items-center justify-end pe-6 opacity-10 dark:opacity-20 group-hover:opacity-25 transition-opacity duration-300">
            <div className="font-mono text-5xl font-extrabold text-indigo-400">
              {'{ ; }'}
            </div>
          </div>
        ) : (
          <div className="absolute top-8 right-6 w-28 h-20 rounded-lg border border-neutral-300/40 dark:border-white/10 bg-neutral-100/40 dark:bg-white/5 opacity-20 group-hover:opacity-30 transition-opacity p-2">
            <div className="flex items-center gap-1 mb-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/70" />
              <span className="h-1.5 w-1.5 rounded-full bg-green-400/70" />
            </div>
            <div className="space-y-1">
              <div className="h-1.5 w-3/4 rounded bg-neutral-400/30 dark:bg-white/20" />
              <div className="h-1.5 w-1/2 rounded bg-neutral-400/20 dark:bg-white/10" />
            </div>
          </div>
        )}
      </div>

      {/* Top Header: Date badge */}
      <div className="relative z-10 mb-3">
        <span className="inline-block rounded-lg border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 backdrop-blur-sm">
          {formattedDate}
        </span>
      </div>

      {/* Middle: Title & Description */}
      <div className="relative z-10 flex-1 flex flex-col justify-start mb-4">
        <h3 className="line-clamp-2 text-base md:text-lg font-bold leading-snug text-neutral-900 dark:text-white transition-colors duration-200 group-hover:text-primary mb-2">
          {post.title}
        </h3>
        {post.description && (
          <p className="line-clamp-2 text-xs md:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {post.description}
          </p>
        )}
      </div>

      {/* Bottom Footer: Views & Reading Time */}
      <div className="relative z-10 flex items-center gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400 border-t border-neutral-200/80 dark:border-white/10 pt-3 mt-auto">
        <div className="flex items-center gap-1.5">
          <FiEye className="h-3.5 w-3.5" />
          <span>{views} {t('blog_views')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FiClock className="h-3.5 w-3.5" />
          <span>{post.readingTime} {t('blog_min_read')}</span>
        </div>
      </div>
    </Link>
  );
}
