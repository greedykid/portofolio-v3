'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/common/components/elements/Container';
import type { Post, PostMeta } from '@/common/libs/blog';
import { useLanguage } from '@/common/context/LanguageContext';
import { FiArrowLeft, FiClock, FiEye, FiCalendar, FiShare2, FiCheck } from 'react-icons/fi';
import BlogCard from '@/modules/blog/components/BlogCard';

interface BlogDetailClientProps {
  post: Post;
  morePosts: PostMeta[];
}

function formatDate(dateStr: string, locale: string): string {
  if (!dateStr) return 'Recent';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

// Generate consistent synthetic view count
function getViewsCount(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const count = 800 + Math.abs(hash % 1800);
  return count.toLocaleString('en-US');
}

export default function BlogDetailClient({ post, morePosts }: BlogDetailClientProps) {
  const { t, locale } = useLanguage();
  const [copied, setCopied] = useState(false);

  const formattedDate = formatDate(post.date, locale);
  const views = getViewsCount(post.slug);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full py-6 md:py-10">
      <Container className="max-w-[960px]">
        {/* Back Button */}
        <div className="mb-6 md:mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-neutral-300/80 dark:border-white/15 bg-white dark:bg-[#121622] px-4 py-2 text-xs md:text-sm font-bold text-neutral-700 dark:text-neutral-200 shadow-sm transition-all hover:bg-neutral-100 dark:hover:bg-white/10 hover:-translate-x-1 cursor-pointer"
          >
            <FiArrowLeft className="h-4 w-4" />
            <span>{locale === 'id' ? 'Kembali ke Semua Artikel' : 'Back to All Articles'}</span>
          </Link>
        </div>

        {/* Article Container Card */}
        <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#0e131d] p-6 sm:p-10 md:p-14 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.35)] overflow-hidden">
          {/* Header Gradient Beam */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/15 blur-3xl" />

          {/* Tags list */}
          {post.tags && post.tags.length > 0 && (
            <div className="relative z-10 flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 text-xs font-bold text-primary dark:text-indigo-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Article Title */}
          <h1 className="relative z-10 text-neutral-900 dark:text-white text-3xl sm:text-4xl md:text-5xl font-brak font-bold tracking-tight leading-[1.15] mb-4">
            {post.title}
          </h1>

          {/* Subtitle / Description */}
          {post.description && (
            <p className="relative z-10 text-neutral-600 dark:text-neutral-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
              {post.description}
            </p>
          )}

          {/* Author & Metadata Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-y border-neutral-200/80 dark:border-white/10 py-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-brak font-bold text-white shadow-sm">
                R
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-900 dark:text-white leading-tight">
                  Rizki Arbiansyah
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Web Developer & IT Support
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <FiCalendar className="h-3.5 w-3.5" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiClock className="h-3.5 w-3.5" />
                <span>{post.readingTime} {t('blog_min_read')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiEye className="h-3.5 w-3.5" />
                <span>{views} {t('blog_views')}</span>
              </div>
              <button
                onClick={handleCopyLink}
                title="Bagikan artikel"
                className="flex items-center gap-1.5 rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-100 dark:bg-white/5 px-2.5 py-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                {copied ? <FiCheck className="h-3.5 w-3.5 text-emerald-400" /> : <FiShare2 className="h-3.5 w-3.5" />}
                <span>{copied ? (locale === 'id' ? 'Disalin!' : 'Copied!') : (locale === 'id' ? 'Bagikan' : 'Share')}</span>
              </button>
            </div>
          </div>

          {/* Article Markdown Prose Content */}
          <div
            className="blog-prose relative z-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Footer Bio Card */}
          <div className="relative z-10 mt-12 rounded-2xl border-2 border-indigo-200/80 dark:border-white/10 bg-indigo-50/50 dark:bg-[#151a28] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 font-brak font-bold text-lg text-white shadow-md">
                R
              </div>
              <div>
                <p className="font-brak font-bold text-base text-neutral-900 dark:text-white">
                  Rizki Arbiansyah
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Lulusan S1 Sistem Informasi Universitas Gunadarma • IT Support & Web Developer
                </p>
              </div>
            </div>
            <Link
              href="/about"
              className="shrink-0 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-indigo-600 transition-colors"
            >
              {locale === 'id' ? 'Tentang Penulis' : 'About Author'}
            </Link>
          </div>
        </div>

        {/* Recommended More Articles Section */}
        {morePosts && morePosts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-brak font-bold text-neutral-900 dark:text-white mb-6">
              {locale === 'id' ? 'Artikel Lainnya' : 'More Articles'}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              {morePosts.slice(0, 2).map((p, idx) => (
                <BlogCard key={p.slug} post={p} index={idx} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
