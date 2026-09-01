import { useEffect, useState } from 'react';
import SiteNav from '@/components/SiteNav';
import BitSpray from '@/components/site/BitSpray';
import ShinyText from '@/components/ShinyText';
import Footer from '@/components/site/Footer';
import PostCard from '@/components/site/PostCard';
import { sortedPosts, type PostType } from '@/lib/posts';

const FILTERS: Array<{ key: PostType | 'all'; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'talk', label: 'Talks' },
  { key: 'writing', label: 'Writing' },
];

export default function Blog() {
  const [filter, setFilter] = useState<PostType | 'all'>('all');
  const visible = sortedPosts.filter((p) => filter === 'all' || p.type === filter);

  useEffect(() => {
    document.title = 'Talks & Writing — Invisible Bits';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <BitSpray topOffset={0.5} />
      {/* Ambient glow so sub pages carry the hero's light */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[42rem] bg-[radial-gradient(55%_65%_at_50%_-10%,rgba(0,245,212,0.13),transparent_70%)]"
      />
      <SiteNav />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 pt-16 md:px-8">

        <header className="pt-10 md:pt-14">
          <p className="text-xs uppercase tracking-tight text-white/60 md:text-sm">
            Research, recordings and announcements
          </p>
          <h1 className="mt-3 text-3xl font-medium leading-[1] tracking-tighter md:text-4xl">
            Talks &<br />
            <ShinyText>Writing</ShinyText>
          </h1>
        </header>

        <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Filter posts">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={
                filter === f.key
                  ? 'rounded-full bg-white px-5 py-2 text-sm font-medium text-black'
                  : 'rounded-full border border-gray-700 px-5 py-2 text-sm text-white/70 transition-colors hover:border-gray-500 hover:text-white'
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        <main className="mt-7 grid gap-4 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} as="h2" />
          ))}
        </main>

        <div className="mb-16 rounded-2xl border border-gray-800 p-6 text-center">
          <p className="text-sm text-white/70">Working on something in these areas?</p>
          <a
            href="/#contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Start a scoping conversation
          </a>
          <p className="mt-3 select-all text-xs text-white/50">contact@invisible-bits.com</p>
        </div>

        <Footer />
      </div>
    </div>
  );
}
