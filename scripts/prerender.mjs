/**
 * Build-time meta prerendering + sitemap generation for GitHub Pages.
 *
 * The app is a client-rendered SPA, so without this every URL serves the
 * homepage <head> to crawlers and social scrapers. This script stamps a real
 * HTML file per route (dist/blog/index.html, dist/blog/<slug>/index.html)
 * with route-specific title/description/OG/canonical and JSON-LD
 * (VideoObject for talks with recordings, BlogPosting otherwise), and writes
 * dist/sitemap.xml from the same posts data so the two can never drift.
 *
 * URL shape: directory routes use trailing slashes (GH Pages 301s the
 * slash-less form to the slash form, so canonicals must match).
 */
import { build } from 'esbuild';
import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const DIST = 'dist';
const ORIGIN = 'https://invisible-bits.com';
const DEFAULT_IMAGE = `${ORIGIN}/og-card.png`;
const BUILD_DATE = new Date().toISOString().slice(0, 10);

// posts.ts is TypeScript — bundle it to a temp ESM file and import it.
const tmp = path.join(DIST, '.posts-data.mjs');
await build({
  entryPoints: ['src/lib/posts.ts'],
  bundle: true,
  format: 'esm',
  outfile: tmp,
  logLevel: 'silent',
});
const { posts } = await import(pathToFileURL(path.resolve(tmp)).href);

const template = await readFile(path.join(DIST, 'index.html'), 'utf8');

const esc = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function stampHead(html, { title, description, url, jsonLd, image, imageAlt, ogType }) {
  // All patterns tolerate arbitrary whitespace between attribute and content.
  let out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title"\s+content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta name="twitter:title"\s+content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:type"\s+content=")[^"]*(")/, `$1${ogType ?? 'website'}$2`);

  if (image) {
    out = out
      .replace(/(<meta property="og:image"\s+content=")[^"]*(")/, `$1${image}$2`)
      .replace(/(<meta name="twitter:image"\s+content=")[^"]*(")/, `$1${image}$2`);
  }
  if (imageAlt) {
    out = out.replace(/(<meta property="og:image:alt"\s+content=")[^"]*(")/, `$1${esc(imageAlt)}$2`);
  }
  if (jsonLd) {
    out = out.replace(
      '</head>',
      `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n</head>`,
    );
  }
  return out;
}

const person = {
  '@type': 'Person',
  name: 'Dr. M. Ahmadvand',
  alternateName: 'Mohsen Ahmadvand',
  url: `${ORIGIN}/#team`,
};

async function emit(route, html) {
  const dir = path.join(DIST, route);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}

// /blog listing
await emit(
  'blog',
  stampHead(template, {
    title: 'Talks & Writing — Invisible Bits',
    description:
      'Conference talks, research papers and writing on protocol security, zero-knowledge proving infrastructure and real-world-asset tokenization.',
    url: `${ORIGIN}/blog/`,
    image: DEFAULT_IMAGE,
    imageAlt: 'Invisible Bits — Blockchain Security & Zero-Knowledge Consulting',
  }),
);

// Each post
for (const post of posts) {
  const url = `${ORIGIN}/blog/${post.slug}/`;
  const isTalkVideo = Boolean(post.youtubeId);
  const image = isTalkVideo
    ? `https://i.ytimg.com/vi/${post.youtubeId}/hqdefault.jpg`
    : DEFAULT_IMAGE;

  const jsonLd = isTalkVideo
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: post.title,
        description: post.summary,
        uploadDate: post.date,
        thumbnailUrl: image,
        embedUrl: `https://www.youtube-nocookie.com/embed/${post.youtubeId}`,
        url,
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.summary,
        image: [image],
        datePublished: post.date,
        dateModified: post.date,
        author: person,
        publisher: { '@type': 'Organization', name: 'Invisible Bits Consulting FZCO', url: ORIGIN },
        mainEntityOfPage: url,
        ...(post.loomId
          ? {
              video: {
                '@type': 'VideoObject',
                name: `${post.title} — demo`,
                description: post.summary,
                embedUrl: `https://www.loom.com/embed/${post.loomId}`,
                thumbnailUrl: `https://cdn.loom.com/sessions/thumbnails/${post.loomId}-4df538e242c8a851.gif`,
                uploadDate: post.date,
              },
            }
          : {}),
      };

  await emit(
    `blog/${post.slug}`,
    stampHead(template, {
      title: `${post.title} — Invisible Bits`,
      description: post.summary,
      url,
      jsonLd,
      image,
      imageAlt: isTalkVideo
        ? `Talk thumbnail: ${post.title}`
        : 'Invisible Bits — Blockchain Security & Zero-Knowledge Consulting',
      ogType: isTalkVideo ? 'video.other' : 'article',
    }),
  );
}

// sitemap.xml — generated from the same posts array so it can never drift
const urls = [
  { loc: `${ORIGIN}/`, lastmod: BUILD_DATE },
  { loc: `${ORIGIN}/blog/`, lastmod: BUILD_DATE },
  ...posts.map((p) => ({ loc: `${ORIGIN}/blog/${p.slug}/`, lastmod: p.date })),
];
await writeFile(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);

// SPA fallback for unknown paths
await cp(path.join(DIST, 'index.html'), path.join(DIST, '404.html'));

await rm(tmp);
console.log(`prerendered ${posts.length + 1} routes + sitemap (${urls.length} urls) + 404.html`);
