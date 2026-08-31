import Link from 'next/link';
import SectionHeading from '@/common/components/elements/SectionHeading';
import BlogCard from '@/modules/blog/components/BlogCard';
import type { PostMeta } from '@/common/libs/blog';

interface BlogSectionProps {
  posts: PostMeta[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section>
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <SectionHeading
          title="Latest Posts"
          description="Artikel dan catatan teknis seputar web development, IT support, dan networking."
        />
        {posts.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400">Belum ada artikel.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {posts.slice(0, 4).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
