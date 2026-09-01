import type { MetadataRoute } from 'next';
import { SITE } from '@/common/constant/data';
import { getAllPosts } from '@/common/libs/blog';
import { getAllProjects } from '@/common/libs/projects';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const posts = await getAllPosts();
  const projects = getAllProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/setup`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/stats`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/guestbook`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/behind-the-scenes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/links`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date || new Date()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/projects/${project.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes];
}
