import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SiteNav from '@/components/SiteNav';
import BitSpray from '@/components/site/BitSpray';
import Footer from '@/components/site/Footer';
import { posts, typeLabel } from '@/lib/posts';

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  useEffect(() => {
    document.title = post ? `${post.title} — Invisible Bits` : 'Not found — Invisible Bits';
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center font-sans text-white">
        <p className="text-white/60">That post doesn't exist.</p>
        <Link to="/blog" className="mt-4 rounded-full border border-gray-700 px-5 py-2 text-sm hover:border-gray-500">
          Back to Talks &amp; Writing
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <BitSpray topOffset={0.5} />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[42rem] bg-[radial-gradient(55%_65%_at_50%_-10%,rgba(0,245,212,0.13),transparent_70%)]"
      />
      <SiteNav />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 pt-16 md:px-8">

        <main className="mx-auto w-full max-w-3xl flex-1 pb-20 pt-10 md:pt-14">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            All talks &amp; writing
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-white/50">
            <span className="rounded-full border border-gray-700 px-3 py-1 uppercase tracking-wide text-white/60">
              {typeLabel[post.type]}
            </span>
            <span>{formatDate(post.date)}</span>
            {post.venue && <span className="text-[#00F5D4]/80">{post.venue}</span>}
          </div>

          <h1 className="mt-5 text-2xl font-medium leading-tight tracking-tighter md:text-4xl">
            {post.title}
          </h1>

          {post.loomId && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-800 lg:-mx-24 xl:-mx-40">
              <iframe
                className="aspect-video w-full"
                src={`https://www.loom.com/embed/${post.loomId}`}
                title={`${post.title} — demo`}
                loading="lazy"
                allowFullScreen
              />
            </div>
          )}

          {post.youtubeId && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-gray-800 lg:-mx-24 xl:-mx-40">
              <iframe
                className="aspect-video w-full"
                src={`https://www.youtube-nocookie.com/embed/${post.youtubeId}${post.youtubeStart ? `?start=${post.youtubeStart}` : ''}`}
                title={post.title}
                loading="lazy"
                allow="accelerometer; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="mt-8 space-y-5">
            <p className="text-base leading-relaxed text-white/80">{post.summary}</p>
            {post.body?.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-white/70">
                {paragraph}
              </p>
            ))}
          </div>

          {post.links && (
            <ul className="mt-8 space-y-2.5 rounded-2xl border border-gray-800 p-6">
              {post.links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-2 text-sm leading-relaxed text-white/75 transition-colors hover:text-white"
                  >
                    <ArrowUpRight
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-[#00F5D4]/70 transition-colors group-hover:text-[#00F5D4]"
                      aria-hidden="true"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {post.href && (
            <a
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-gray-700 px-6 py-3 text-sm text-white/90 transition-colors hover:border-gray-500 hover:text-white"
            >
              {post.youtubeId ? 'Watch on YouTube' : 'View the published record'}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}

          {post.tags && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-gray-800 px-3 py-1 text-xs text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* End-of-content conversion path, tied to what the reader just read */}
          <div className="mt-14 rounded-2xl border border-gray-800 p-6 text-center">
            <p className="text-sm text-white/70">Working on something in this area?</p>
            <a
              href="/#contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
            >
              Start a scoping conversation
            </a>
            <p className="mt-3 select-all text-xs text-white/50">contact@invisible-bits.com</p>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
