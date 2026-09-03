'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Container from '@/common/components/elements/Container';
import type { Post, PostMeta } from '@/common/libs/blog';
import { useLanguage } from '@/common/context/LanguageContext';
import {
  FiArrowLeft,
  FiClock,
  FiEye,
  FiCalendar,
  FiCheck,
  FiLink,
  FiCoffee,
  FiTerminal,
  FiLayers,
  FiDatabase,
  FiServer,
  FiCpu,
  FiShare2,
} from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
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

function getViewsCount(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const count = 800 + Math.abs(hash % 1800);
  return count.toLocaleString('en-US');
}

// Visual Featured Banner Component (matching Ryan Aulia's blog post banner)
function ArticleFeaturedBanner({ post }: { post: Post }) {
  if (post.cover) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 shadow-lg bg-neutral-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Generate dynamic themed banner based on topic
  const isLaravel = /laravel|php|mvc/i.test(post.slug + (post.tags?.join(' ') || ''));
  const isMySQL = /mysql|query|database|sql/i.test(post.slug + (post.tags?.join(' ') || ''));
  const isNetwork = /jaringan|network|lan|wan|wi-fi/i.test(post.slug + (post.tags?.join(' ') || ''));

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] bg-[#0c1018] flex flex-col justify-between p-6 sm:p-8 md:p-10 select-none">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {isLaravel && (
          <>
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-rose-600/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
          </>
        )}
        {isMySQL && (
          <>
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          </>
        )}
        {isNetwork && (
          <>
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-600/20 blur-3xl" />
          </>
        )}
        {!isLaravel && !isMySQL && !isNetwork && (
          <>
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-purple-600/20 blur-3xl" />
          </>
        )}
      </div>

      {/* Top Banner Row */}
      <div className="relative z-10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-3 w-3 rounded-full bg-red-500/80" />
          <span className="flex h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="flex h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-mono font-semibold text-neutral-300">
          <FiTerminal className="h-3 w-3" />
          <span>tech-editorial.rizkiarbi</span>
        </div>
      </div>

      {/* Center Visual Content */}
      <div className="relative z-10 my-auto py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white shadow-xl">
            {isLaravel && <FiLayers className="h-6 w-6 sm:h-7 sm:w-7 text-rose-400" />}
            {isMySQL && <FiDatabase className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-400" />}
            {isNetwork && <FiServer className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400" />}
            {!isLaravel && !isMySQL && !isNetwork && <FiCpu className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-400" />}
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/10 text-[11px] font-mono font-bold text-neutral-300 uppercase tracking-wider">
              {post.tags?.[0] || 'Tutorial'}
            </span>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-0.5">
              Technical Documentation & Insight
            </p>
          </div>
        </div>

        <h2 className="text-lg sm:text-2xl md:text-3xl font-brak font-bold text-white leading-tight max-w-xl line-clamp-2">
          {post.title}
        </h2>
      </div>

      {/* Bottom Row Tags */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
        {post.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-[10px] sm:text-xs font-mono text-neutral-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function BlogDetailClient({ post, morePosts }: BlogDetailClientProps) {
  const { t, locale } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.href);
    }
  }, []);

  // Interactive Copy Code button listener for every code window
  useEffect(() => {
    const handleContainerClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const copyBtn = target.closest('.copy-code-btn') as HTMLButtonElement | null;
      if (!copyBtn) return;

      const codeWindow = copyBtn.closest('.code-window');
      if (!codeWindow) return;

      const pre = codeWindow.querySelector('pre');
      if (!pre) return;

      const codeText = pre.textContent || (pre as HTMLElement).innerText || '';

      try {
        await navigator.clipboard.writeText(codeText.trim());

        const label = copyBtn.querySelector('.copy-label');
        const icon = copyBtn.querySelector('.copy-icon');

        if (label) label.textContent = locale === 'id' ? 'Tersalin!' : 'Copied!';
        copyBtn.classList.add('text-emerald-400', 'border-emerald-500/50', 'bg-emerald-500/15');
        if (icon) {
          icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />`;
        }

        setTimeout(() => {
          if (label) label.textContent = 'Copy';
          copyBtn.classList.remove('text-emerald-400', 'border-emerald-500/50', 'bg-emerald-500/15');
          if (icon) {
            icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />`;
          }
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code: ', err);
      }
    };

    document.addEventListener('click', handleContainerClick);
    return () => {
      document.removeEventListener('click', handleContainerClick);
    };
  }, [locale]);

  const formattedDate = formatDate(post.date, locale);
  const views = getViewsCount(post.slug);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareText = `${post.title} — oleh Rizki Arbiansyah`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`;

  return (
    <div className="w-full py-6 md:py-10">
      <Container className="max-w-[1180px]">
        {/* 1. Back to Blog Navigation */}
        <div className="mb-5 md:mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-neutral-500 dark:text-neutral-400 hover:text-primary dark:hover:text-indigo-400 transition-colors group cursor-pointer"
          >
            <FiArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>{locale === 'id' ? 'Kembali ke Blog' : 'Back to Blog'}</span>
          </Link>
        </div>

        {/* 2. Article Title (Heading at the top above the hero banner, like Ryan Aulia's layout) */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-brak font-bold text-neutral-900 dark:text-white leading-[1.2] tracking-tight mb-6 md:mb-8">
          {post.title}
        </h1>

        {/* 3. Main 2-Column Split: Content (Left) vs Sticky Details Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column (8 cols): Banner + Markdown Prose + Author Bio */}
          <main className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* Featured Hero Banner */}
            <ArticleFeaturedBanner post={post} />

            {/* Subtitle / Excerpt Lead */}
            {post.description && (
              <p className="text-sm sm:text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium italic border-l-4 border-indigo-500 pl-4 py-1">
                {post.description}
              </p>
            )}

            {/* Article Markdown Prose Content */}
            <div
              className="blog-prose w-full"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Author Footer Bio Card */}
            <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] p-5 sm:p-7 shadow-[4px_4px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[4px_4px_0px_0px_rgba(99,102,241,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-10">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 font-brak font-bold text-lg text-white shadow-md">
                  R
                </div>
                <div>
                  <p className="font-brak font-bold text-base text-neutral-900 dark:text-white">
                    Rizki Arbiansyah
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                    Lulusan S1 Sistem Informasi Universitas Gunadarma • IT Support & Web Developer
                  </p>
                </div>
              </div>
              <Link
                href="/about"
                className="shrink-0 rounded-2xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                {locale === 'id' ? 'Tentang Penulis' : 'About Author'}
              </Link>
            </div>
          </main>

          {/* Right Column (4 cols): Sticky Details Sidebar Widget */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-white/95 dark:bg-[#10141f] p-5 sm:p-6 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] space-y-5 backdrop-blur-md">
              {/* Section 1: Article Details */}
              <div>
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3.5">
                  {locale === 'id' ? 'Informasi Artikel' : 'Article Details'}
                </h3>
                <div className="space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                  <div className="flex items-center gap-2.5">
                    <FiCalendar className="h-4 w-4 text-indigo-500 shrink-0" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FiClock className="h-4 w-4 text-indigo-500 shrink-0" />
                    <span>{post.readingTime} {locale === 'id' ? 'menit baca' : 'min read'}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FiEye className="h-4 w-4 text-indigo-500 shrink-0" />
                    <span>{views} {locale === 'id' ? 'kali dibaca' : 'views'}</span>
                  </div>
                </div>
              </div>

              {/* Section 2: Share Buttons */}
              <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10">
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3.5">
                  {locale === 'id' ? 'Bagikan Artikel' : 'Share Article'}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  <a
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Share to X (Twitter)"
                    className="flex h-10 items-center justify-center rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-50 dark:bg-white/5 hover:bg-black hover:text-white transition-all shadow-sm cursor-pointer"
                  >
                    <FaTwitter className="h-4 w-4 text-sky-400" />
                  </a>
                  <a
                    href={linkedinShareUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Share to LinkedIn"
                    className="flex h-10 items-center justify-center rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-50 dark:bg-white/5 hover:bg-[#0077b5] hover:text-white transition-all shadow-sm cursor-pointer"
                  >
                    <FaLinkedin className="h-4 w-4 text-[#0077b5]" />
                  </a>
                  <a
                    href={whatsappShareUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Share to WhatsApp"
                    className="flex h-10 items-center justify-center rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-50 dark:bg-white/5 hover:bg-emerald-600 hover:text-white transition-all shadow-sm cursor-pointer"
                  >
                    <FaWhatsapp className="h-4 w-4 text-emerald-500" />
                  </a>
                  <button
                    onClick={handleCopyLink}
                    title={locale === 'id' ? 'Salin tautan artikel' : 'Copy article link'}
                    className="flex h-10 items-center justify-center rounded-xl border border-neutral-300 dark:border-white/15 bg-neutral-50 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/20 transition-all shadow-sm cursor-pointer"
                  >
                    {copied ? (
                      <FiCheck className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <FiLink className="h-4 w-4 text-neutral-500" />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-[11px] font-semibold text-emerald-500 mt-2 text-center animate-in fade-in">
                    {locale === 'id' ? 'Tautan berhasil disalin!' : 'Link copied to clipboard!'}
                  </p>
                )}
              </div>

              {/* Section 3: Topic Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10">
                  <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
                    {locale === 'id' ? 'Topik Terkait' : 'Related Tags'}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/70 dark:bg-indigo-950/40 px-2.5 py-1 text-[11px] font-mono font-semibold text-primary dark:text-indigo-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 4: Support / Tip CTA Button (Exact Saweria button like in Ryan Aulia's layout) */}
              <div className="pt-4 border-t border-neutral-200/80 dark:border-white/10">
                <a
                  href="https://saweria.co/rizkiarbi"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(99,102,241,0.4)] transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FiCoffee className="h-4 w-4" />
                  <span>{locale === 'id' ? 'Tip via Saweria' : 'Tip via Saweria'}</span>
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* 4. Recommended More Articles Section */}
        {morePosts && morePosts.length > 0 && (
          <div className="mt-14 pt-10 border-t border-neutral-200/80 dark:border-white/10">
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
