import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '');
      const fullPath = path.join(BLOG_DIR, file);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(raw);
      const readingTime = countWords(raw) / 200;

      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? '',
        date: data.date ?? '',
        tags: data.tags ?? [],
        cover: data.cover,
        readingTime: Math.max(1, Math.round(readingTime)),
      };
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    cover: data.cover,
    readingTime: Math.max(1, Math.round(countWords(raw) / 200)),
    content: processed.toString(),
  };
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}
