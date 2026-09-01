'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import BlogCard from '@/modules/blog/components/BlogCard';
import type { PostMeta } from '@/common/libs/blog';
import { useLanguage } from '@/common/context/LanguageContext';

interface BlogSectionProps {
  posts: PostMeta[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const { t } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const firstCard = container.querySelector('.snap-start') as HTMLElement | null;
    const step = firstCard ? firstCard.offsetWidth + 24 : 360;
    
    container.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="relative rounded-3xl border-2 border-neutral-300/80 dark:border-white/10 bg-[#0c0f14] p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.4)] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-4 md:mb-6">
            <h2 className="text-white text-3xl lg:text-4xl font-brak font-bold tracking-tight">
              {t('blog_title')}
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 md:px-5 py-2 text-xs md:text-sm font-bold text-neutral-950 shadow-md transition-all duration-200 hover:bg-neutral-100 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {t('blog_view_all')} <FiChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Empty State */}
          {posts.length === 0 ? (
            <p className="text-neutral-400 py-8 text-center">{t('blog_empty')}</p>
          ) : (
            <>
              {/* Carousel Container with Smooth Snapping */}
              <div
                ref={sliderRef}
                className="flex items-stretch gap-6 overflow-x-auto pt-4 pb-6 px-1 scrollbar-none snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {posts.map((post, idx) => (
                  <div key={post.slug} className="snap-start shrink-0">
                    <BlogCard post={post} index={idx} />
                  </div>
                ))}
              </div>

              {/* Bottom Nav Arrows */}
              <div className="flex items-center justify-end gap-3 mt-2 md:mt-4">
                <button
                  onClick={() => scroll('left')}
                  aria-label="Previous article"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-all duration-200 hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  aria-label="Next article"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-all duration-200 hover:bg-white/20 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
