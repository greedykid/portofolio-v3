import type { MetadataRoute } from 'next';
import { SITE } from '@/common/constant/data';
import { getAllPosts } from '@/common/libs/blog';
import { getAllProjects } from '@/common/libs/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const posts = await getAllPosts();
  const projects = getAllProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/projects/${project.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
