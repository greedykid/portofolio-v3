import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Container from '@/common/components/elements/Container';
import { getAllPosts, getPostBySlug } from '@/common/libs/blog';

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Container>
      <article className="max-w-3xl">
        <Link href="/blog" className="mb-6 inline-block text-sm text-neutral-400 hover:text-primary">
          ← Back to Blog
        </Link>
        <h1 className="mb-4 text-3xl font-brak text-neutral-900 dark:text-white md:text-4xl">
          {post.title}
        </h1>
        <div className="mb-8 flex items-center gap-2 text-sm text-neutral-400">
          <span>{new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Container>
  );
}
