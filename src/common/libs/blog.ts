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

function highlightSyntax(code: string, lang: string): string {
  if (lang === 'sql') {
    return code
      .replace(/(--.*$)/gm, '<span class="text-neutral-500 italic">$1</span>')
      .replace(/(&#39;[^']*&#39;|'[^']*'|&quot;[^"]*&quot;|"[^"]*")/g, '<span class="text-amber-300 font-medium">$1</span>')
      .replace(
        /\b(CREATE\s+INDEX|CREATE\s+TABLE|DROP\s+TABLE|ALTER\s+TABLE|INSERT\s+INTO|LEFT\s+JOIN|RIGHT\s+JOIN|INNER\s+JOIN|ORDER\s+BY|GROUP\s+BY|PRIMARY\s+KEY|FOREIGN\s+KEY|SELECT|FROM|WHERE|JOIN|EXPLAIN|CREATE|INDEX|ON|INSERT|UPDATE|SET|DELETE|TABLE|ALTER|DROP|LIMIT|OFFSET|AND|OR|NOT|IN|AS|DESC|ASC|SHOW|STATUS)\b/gi,
        '<span class="text-indigo-400 dark:text-indigo-300 font-bold">$1</span>'
      )
      .replace(/\b(\d+)\b/g, '<span class="text-emerald-400 font-semibold">$1</span>');
  }

  if (lang === 'php') {
    return code
      .replace(/(\/\/.*$)/gm, '<span class="text-neutral-500 italic">$1</span>')
      .replace(/(&#39;[^']*&#39;|'[^']*'|&quot;[^"]*&quot;|"[^"]*")/g, '<span class="text-amber-300 font-medium">$1</span>')
      .replace(
        /\b(class|function|public|protected|private|return|use|namespace|extends|implements|new|static|if|else|foreach|for|while|try|catch|throw)\b/g,
        '<span class="text-purple-400 font-bold">$1</span>'
      )
      .replace(/\b(Route|ProductController|Product|Auth|View)\b/g, '<span class="text-sky-300 font-semibold">$1</span>')
      .replace(/(\$[a-zA-Z0-9_]+)/g, '<span class="text-emerald-300">$1</span>');
  }

  if (lang === 'bash' || lang === 'sh' || lang === 'shell') {
    return code
      .replace(/(Router(?:&gt;|#|\(config(?:-[a-z]+)?\)#))/g, '<span class="text-neutral-500 font-bold">$1</span>')
      .replace(
        /\b(enable|configure\s+terminal|interface|ip\s+address|no\s+shutdown|php\s+artisan|composer|npm|git|npx|cd|mkdir|rm|systemctl)\b/g,
        '<span class="text-emerald-400 font-bold">$1</span>'
      )
      .replace(/(\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b)/g, '<span class="text-cyan-300 font-mono">$1</span>')
      .replace(/(\s-[a-zA-Z0-9\-]+)/g, '<span class="text-amber-300">$1</span>');
  }

  return code;
}

function formatCodeBlocks(html: string): string {
  return html.replace(
    /<pre><code(?:\s+class="(?:language-)?([a-zA-Z0-9_\-]+)")?>([\s\S]*?)<\/code><\/pre>/g,
    (match, rawLang, rawCode) => {
      const lang = (rawLang || 'code').toLowerCase();
      let displayLang = lang.toUpperCase();
      if (lang === 'bash' || lang === 'sh' || lang === 'shell') displayLang = 'BASH / TERMINAL';
      if (lang === 'sql') displayLang = 'SQL';
      if (lang === 'php') displayLang = 'PHP';
      if (lang === 'js' || lang === 'javascript') displayLang = 'JAVASCRIPT';
      if (lang === 'ts' || lang === 'typescript') displayLang = 'TYPESCRIPT';

      const highlighted = highlightSyntax(rawCode.trim(), lang);

      return `<div class="code-window my-7 rounded-2xl overflow-hidden border-2 border-neutral-300/80 dark:border-white/15 bg-[#090d16] shadow-[6px_6px_0px_0px_rgba(99,102,241,0.2)] dark:shadow-[6px_6px_0px_0px_rgba(99,102,241,0.25)]">
  <div class="code-window-header flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-white/10 select-none">
    <div class="flex items-center gap-2">
      <span class="h-2.5 w-2.5 rounded-full bg-[#ff5f56] inline-block shadow-sm"></span>
      <span class="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-sm"></span>
      <span class="h-2.5 w-2.5 rounded-full bg-[#27c93f] inline-block shadow-sm"></span>
      <span class="ms-2 font-mono text-[11px] font-bold text-neutral-400 tracking-wider">${displayLang}</span>
    </div>
    <button type="button" class="copy-code-btn flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-neutral-300 hover:text-white text-xs font-mono font-medium border border-white/15 transition-all cursor-pointer">
      <svg class="h-3.5 w-3.5 copy-icon shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <span class="copy-label">Copy</span>
    </button>
  </div>
  <pre class="overflow-x-auto p-4 sm:p-5 font-mono text-xs sm:text-sm text-neutral-200 leading-relaxed m-0 border-0 bg-transparent rounded-none"><code>${highlighted}</code></pre>
</div>`;
    }
  );
}

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
    content: formatCodeBlocks(processed.toString()),
  };
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}
