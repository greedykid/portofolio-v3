import Link from 'next/link';
import type { PostMeta } from '@/common/libs/blog';

interface BlogCardProps {
  post: PostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-3xl border-2 border-neutral-200 bg-white transition-all duration-300 hover:border-primary hover:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] dark:border-neutral-700 dark:bg-neutral-900"
    >
      <div className="p-6">
        <div className="mb-3 flex items-center gap-2 text-xs text-neutral-400">
          <span>{new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-white group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-neutral-500 dark:text-neutral-400">
          {post.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
