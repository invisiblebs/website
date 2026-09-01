/**
 * Version 1 — "securify" template language.
 * Full-screen video hero, floating pill navbar, giant staggered lowercase
 * typography, corner-anchored stat blocks. Pure black / white / neutral.
 *
 * Content is blockchain-only and claim-hygienic: audits and the zk-rollup
 * build are attributed to the principal, TVL is stated at time of audit.
 *
 * NOTE: the background video is the template's own hosted asset (CloudFront).
 * Replace with a self-hosted loop before production.
 */

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4';

const MAILTO = 'mailto:contact@invisible-bits.com?subject=Protocol%20review';

function HexLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M32 6 L54 19 L54 45 L32 58 L10 45 L10 19 Z"
        fill="none"
        stroke="#fff"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <rect x="27" y="20" width="10" height="10" fill="#fff" />
      <rect x="27" y="34" width="10" height="10" fill="#fff" opacity="0.5" />
    </svg>
  );
}

export default function V1() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black text-white"
      style={{ fontFamily: "'Readex Pro', system-ui, -apple-system, sans-serif" }}
    >
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src={VIDEO_SRC}
      />

      {/* Navbar */}
      <nav className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between gap-4 px-6 pt-6 md:px-10">
        <a href="/" className="flex items-center gap-2 rounded-full bg-neutral-900/90 py-3 pl-4 pr-6 backdrop-blur">
          <HexLogo className="h-5 w-5" />
          <span className="text-sm font-normal tracking-tight text-white">invisible bits</span>
        </a>

        <div className="hidden items-center gap-1 rounded-full bg-neutral-900/90 px-3 py-2 backdrop-blur md:flex">
          {['audits', 'zero-knowledge', 'tokenization', 'principal'].map((label) => (
            <a
              key={label}
              href={MAILTO}
              className="rounded-full px-5 py-2 text-sm text-neutral-300 transition-colors hover:text-white"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href={MAILTO}
          className="rounded-full bg-white px-6 py-3 text-sm font-normal text-black transition-colors hover:bg-neutral-200"
        >
          book a review
        </a>
      </nav>

      {/* Foreground content */}
      <div className="relative h-full w-full">
        {/* Giant staggered headline */}
        <h1 className="absolute left-4 top-[18%] text-[14vw] font-medium leading-[0.95] tracking-[-0.04em] text-white md:left-10 md:text-[13vw]">
          prove
        </h1>
        <h1 className="absolute right-4 top-[38%] text-[14vw] font-medium leading-[0.95] tracking-[-0.04em] text-white md:right-10 md:text-[13vw]">
          your
        </h1>
        <h1 className="absolute left-[18%] top-[58%] text-[14vw] font-medium leading-[0.95] tracking-[-0.04em] text-white md:left-[28%] md:text-[13vw]">
          protocol
        </h1>

        {/* Description */}
        <p className="absolute left-6 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90 md:left-10">
          independent security research for zero-knowledge systems and the protocols that hold real
          value
        </p>

        {/* Stat — top right */}
        <div className="absolute right-6 top-[14%] md:right-24">
          <div className="flex items-center justify-end gap-3">
            <span className="hidden h-px w-24 rotate-[20deg] bg-white/40 md:block" />
            <span className="text-4xl font-medium tracking-tight md:text-5xl">+40</span>
          </div>
          <p className="mt-1 text-right text-xs text-white/70 md:text-sm">
            protocol audits led by our principal
          </p>
        </div>

        {/* Stat — bottom left */}
        <div className="absolute bottom-20 left-6 md:bottom-24 md:left-20">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-medium tracking-tight md:text-5xl">$50b+</span>
            <span className="hidden h-px w-24 rotate-[-20deg] bg-white/40 md:block" />
          </div>
          <p className="mt-1 text-xs text-white/70 md:text-sm">tvl secured at time of audit</p>
        </div>

        {/* Stat — bottom right */}
        <div className="absolute bottom-16 right-6 md:bottom-20 md:right-20">
          <div className="flex items-center justify-end gap-3">
            <span className="hidden h-px w-24 rotate-[-20deg] bg-white/40 md:block" />
            <span className="text-4xl font-medium tracking-tight md:text-5xl">0</span>
          </div>
          <p className="mt-1 text-right text-xs text-white/70 md:text-sm">
            critical findings, zircuit mainnet reviews
          </p>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />

      {/* Version switcher */}
      <a
        href="/v2"
        className="absolute bottom-5 right-6 z-30 rounded-full bg-neutral-900/90 px-4 py-2 text-xs text-neutral-300 backdrop-blur transition-colors hover:text-white"
      >
        see version 2 →
      </a>
    </section>
  );
}
