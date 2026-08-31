import BlogListClient from '@/app/blog/BlogListClient';
import { getAllPosts } from '@/common/libs/blog';

export const metadata = {
  title: 'Blog',
  description: 'Artikel dan catatan teknis seputar web development, IT support, dan networking.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return <BlogListClient posts={posts} />;
}
