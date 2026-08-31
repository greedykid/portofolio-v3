import Container from '@/common/components/elements/Container';
import SectionHeading from '@/common/components/elements/SectionHeading';
import BlogCard from '@/modules/blog/components/BlogCard';
import { getAllPosts } from '@/common/libs/blog';

export const metadata = {
  title: 'Blog',
  description: 'Artikel dan catatan teknis seputar web development, IT support, dan networking.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <Container>
      <SectionHeading title="Blog" description="Artikel dan catatan teknis." />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </Container>
  );
}
