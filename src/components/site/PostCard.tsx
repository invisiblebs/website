import { Link } from 'react-router-dom';
import { ArrowUpRight, PlayCircle } from 'lucide-react';
import { typeLabel, type Post } from '@/lib/posts';

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
}

export default function PostCard({ post, as: Heading = 'h3' }: { post: Post; as?: 'h2' | 'h3' }) {
  const external = Boolean(post.href) && !post.body;
  const inner = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-gray-700 px-3 py-1 text-[0.7rem] uppercase tracking-wide text-white/60">
          {typeLabel[post.type]}
        </span>
        <span className="text-xs text-white/50">{formatPostDate(post.date)}</span>
      </div>
      <Heading className="mt-4 text-lg font-medium leading-snug tracking-tight text-white md:text-xl">
        {post.title}
      </Heading>
      {post.venue && <p className="mt-1.5 text-sm text-[#00F5D4]/80">{post.venue}</p>}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{post.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-white/80 transition-colors group-hover:text-white">
        {post.youtubeId ? (
          <>
            <PlayCircle className="h-4 w-4 text-[#00F5D4]" aria-hidden="true" />
            Watch the recording
          </>
        ) : external ? (
          <>
            Open
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </>
        ) : (
          <>Read more</>
        )}
      </span>
    </>
  );

  const className =
    'group flex h-full flex-col rounded-2xl border border-gray-800 bg-black p-6 transition-colors hover:border-gray-500';

  if (external) {
    return (
      <a href={post.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={`/blog/${post.slug}`} className={className}>
      {inner}
    </Link>
  );
}
