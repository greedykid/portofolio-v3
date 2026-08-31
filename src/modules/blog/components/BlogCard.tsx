import Link from 'next/link';
import { FiEye, FiClock } from 'react-icons/fi';
import type { PostMeta } from '@/common/libs/blog';

interface BlogCardProps {
  post: PostMeta;
  index?: number;
}

// Generate consistent synthetic view count based on slug
function getViewsCount(slug: string): string {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const count = 800 + Math.abs(hash % 1800);
  return count.toLocaleString('en-US');
}

function formatDate(dateStr: string): string {
  if (!dateStr) return 'Recent';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const views = getViewsCount(post.slug);
  const formattedDate = formatDate(post.date);

  // Pick decorative artwork variant based on post tags / index
  const isStorage = post.tags?.some((t) => /database|mysql|storage|sql/i.test(t)) || index % 4 === 1;
  const isReactTS = post.tags?.some((t) => /react|ts|typescript|frontend/i.test(t)) || index % 4 === 2;
  const isCode = post.tags?.some((t) => /laravel|php|backend|clean/i.test(t)) || index % 4 === 3;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-[#0e131b] p-6 md:p-7 min-w-[280px] sm:min-w-[320px] md:min-w-[340px] max-w-[360px] h-[340px] md:h-[360px] shrink-0 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-400/60 hover:shadow-[0_12px_30px_rgba(99,102,241,0.25)] select-none"
    >
      {/* Decorative Background Graphics */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute -top-10 -right-10 h-48 w-48 rounded-full bg-indigo-600/15 blur-2xl group-hover:bg-indigo-600/25 transition-all duration-500" />

        {isStorage ? (
          /* Cloud Network graphic */
          <div className="absolute inset-0 flex items-center justify-center opacity-25 group-hover:opacity-40 transition-opacity duration-300">
            <svg viewBox="0 0 200 120" className="w-44 h-32 stroke-cyan-400 fill-none" strokeWidth="1.5">
              <path d="M40 80 a25 25 0 0 1 20 -40 a35 35 0 0 1 60 -10 a30 30 0 0 1 45 30 a25 25 0 0 1 -15 45 z" />
              <line x1="60" y1="50" x2="100" y2="70" strokeDasharray="3 3" />
              <line x1="100" y1="70" x2="140" y2="40" strokeDasharray="3 3" />
              <line x1="80" y1="30" x2="120" y2="60" strokeDasharray="3 3" />
              <circle cx="60" cy="50" r="3" className="fill-cyan-400" />
              <circle cx="100" cy="70" r="3.5" className="fill-indigo-400" />
              <circle cx="140" cy="40" r="3" className="fill-purple-400" />
              <circle cx="120" cy="60" r="2.5" className="fill-pink-400" />
            </svg>
          </div>
        ) : isReactTS ? (
          /* React / TS braces graphic */
          <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-35 transition-opacity duration-300">
            <div className="flex items-center gap-2 font-mono text-5xl font-extrabold text-blue-400/80">
              <span>{'{'}</span>
              <span className="text-4xl bg-blue-500/20 px-2 py-1 rounded text-blue-300 font-sans font-bold">TS</span>
              <span>{'}'}</span>
            </div>
          </div>
        ) : isCode ? (
          /* Code brackets / Clean code graphic */
          <div className="absolute inset-0 flex items-center justify-center opacity-15 group-hover:opacity-30 transition-opacity duration-300">
            <div className="font-mono text-7xl font-extrabold text-indigo-400">
              {'{ ; }'}
            </div>
          </div>
        ) : (
          /* Browser Code Window graphic */
          <div className="absolute top-12 left-6 right-6 h-28 rounded-lg border border-white/10 bg-white/5 opacity-25 group-hover:opacity-40 transition-opacity p-2">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="h-2 w-2 rounded-full bg-red-400/70" />
              <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
              <span className="h-2 w-2 rounded-full bg-green-400/70" />
            </div>
            <div className="space-y-1">
              <div className="h-2 w-3/4 rounded bg-white/15" />
              <div className="h-2 w-1/2 rounded bg-white/10" />
              <div className="h-2 w-2/3 rounded bg-white/10" />
            </div>
          </div>
        )}
      </div>

      {/* Top Header: Date badge */}
      <div className="relative z-10">
        <span className="inline-block rounded-lg border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-neutral-300 backdrop-blur-sm">
          {formattedDate}
        </span>
      </div>

      {/* Middle: Title & Description */}
      <div className="relative z-10 my-auto py-4">
        <h3 className="line-clamp-3 text-lg md:text-xl font-bold leading-snug text-white transition-colors duration-200 group-hover:text-primary">
          {post.title}
        </h3>
        {post.description && (
          <p className="mt-2 line-clamp-2 text-xs md:text-sm text-neutral-400">
            {post.description}
          </p>
        )}
      </div>

      {/* Bottom Footer: Views & Reading Time */}
      <div className="relative z-10 flex items-center gap-4 text-xs font-medium text-neutral-400 border-t border-white/10 pt-3">
        <div className="flex items-center gap-1.5">
          <FiEye className="h-4 w-4 text-neutral-400" />
          <span>{views} views</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FiClock className="h-4 w-4 text-neutral-400" />
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </Link>
  );
}

