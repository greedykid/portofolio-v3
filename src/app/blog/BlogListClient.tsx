'use client';

import { useState, useMemo } from 'react';
import Container from '@/common/components/elements/Container';
import BlogCard from '@/modules/blog/components/BlogCard';
import type { PostMeta } from '@/common/libs/blog';
import { useLanguage } from '@/common/context/LanguageContext';
import { FiSearch, FiX } from 'react-icons/fi';

interface BlogListClientProps {
  posts: PostMeta[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const q = searchQuery.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(q)))
    );
  }, [posts, searchQuery]);

  return (
    <div className="w-full py-4 md:py-8">
      <Container className="max-w-[1280px]">
        {/* Consistent Top Page Header across all pages */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-neutral-900 dark:text-white text-3xl md:text-5xl font-brak font-bold tracking-tight mb-2">
            {t('blog_title')}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm md:text-base max-w-xl">
            {t('blog_page_desc')}
          </p>
        </div>

        {/* Interactive Search Bar */}
        <div className="mb-8 max-w-xl">
          <div className="relative flex items-center">
            <FiSearch className="absolute left-4 h-5 w-5 text-neutral-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('blog_search_ph')}
              className="w-full rounded-2xl border-2 border-neutral-300/80 dark:border-white/10 bg-white dark:bg-[#121622] py-3.5 pl-12 pr-10 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-500 shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors cursor-pointer"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, idx) => (
              <BlogCard key={post.slug} post={post} index={idx} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-neutral-300 dark:border-white/15 p-12 text-center my-8">
            <p className="text-neutral-500 dark:text-neutral-400 text-base font-medium">
              {t('blog_not_found')}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 rounded-xl bg-primary/10 px-4 py-2 text-xs font-bold text-primary dark:text-indigo-400 hover:bg-primary/20 transition-colors cursor-pointer"
              >
                Reset Pencarian
              </button>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
