import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Menu } from 'lucide-react';

/**
 * Version 3 — "DesignPro" template language.
 * Fullscreen video hero, circular-logo pill nav, two-column intro paragraphs,
 * giant centered two-line heading where line two carries an animated shiny
 * gradient sweep. Rebranded: education copy replaced with blockchain-only
 * positioning; shine recolored from light blue to brand teal.
 *
 * NOTE: background video is the template's hosted asset — replace with a
 * self-hosted loop before production.
 */

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4';

const MAILTO = 'mailto:contact@invisible-bits.com?subject=Protocol%20review';

const NAV_LINKS = ['Audits', 'Zero-Knowledge', 'Tokenization', 'Track Record', 'Principal'];

/** Continuous left-to-right gradient sweep across the text (3s loop). */
function ShinyText({ children }: { children: string }) {
  const reduced = useReducedMotion();

  const style: React.CSSProperties = {
    backgroundImage:
      'linear-gradient(100deg, #00F5D4 40%, #ffffff 50%, #00F5D4 60%)',
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
  };

  if (reduced) {
    // Static gradient, no sweep, when the OS asks for less motion.
    return <span style={style}>{children}</span>;
  }

  return (
    <motion.span
      style={style}
      animate={{ backgroundPosition: ['200% center', '-200% center'] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.span>
  );
}

export default function V3() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-sans text-white">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src={VIDEO_SRC}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-5 md:px-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between pt-6">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white">
              <span className="h-3 w-3 rounded-full bg-white" />
            </span>
            <span className="text-sm font-medium">Invisible Bits</span>
          </a>

          <div className="hidden items-center gap-1 rounded-full border border-gray-700 px-2 py-1.5 lg:flex">
            {NAV_LINKS.map((label) => (
              <a
                key={label}
                href={MAILTO}
                className="px-4 py-1.5 text-sm text-white/80 transition-colors hover:text-white"
              >
                {label}
              </a>
            ))}
            <a
              href={MAILTO}
              className="flex items-center gap-1 px-4 py-1.5 text-sm text-white/80 transition-colors hover:text-white"
            >
              Contact us
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <button type="button" className="lg:hidden" aria-label="Open menu">
            <Menu className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </nav>

        {/* Top two-column intro */}
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-md text-sm text-white/80 md:text-base">
            We secure the protocols and zero-knowledge systems that move real value — reviewed
            personally by the researcher behind 40+ protocol audits.
          </p>
          <p className="text-sm text-white/80 md:text-base lg:text-right">
            $50B+ TVL Secured at Audit !
          </p>
        </div>

        {/* Hero center */}
        <div className="flex flex-1 flex-col items-center justify-center pb-24 text-center">
          <p className="mb-4 text-xs uppercase tracking-tight text-white/80 md:text-sm">
            Now accepting protocol reviews for Q4
          </p>

          <h1 className="text-5xl font-medium leading-[0.85] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            <span className="block text-white">Prove</span>
            <span className="block">
              <ShinyText>Everything.</ShinyText>
            </span>
          </h1>

          <a
            href={MAILTO}
            className="group mt-10 flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-900 md:px-8 md:py-4 md:text-base"
          >
            Book a Protocol Review
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      {/* Version switcher */}
      <a
        href="/"
        className="absolute bottom-5 right-6 z-20 rounded-full border border-gray-700 bg-black/60 px-4 py-2 text-xs text-white/80 backdrop-blur transition-colors hover:text-white"
      >
        ← back to version 1
      </a>
    </section>
  );
}
