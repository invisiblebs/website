import { useEffect, useRef } from 'react';

/**
 * The "invisible bits" reveal — the brand motif as a scroll effect.
 *
 * A field of near-invisible bits (tiny squares) is scattered through the
 * document below the hero. As the visitor scrolls, a spray front sweeps down
 * the page: each bit it lands on flashes and becomes distinguishable — most
 * settle brand-teal, but a few are revealed as *evil bits*, glowing red. The
 * audit, as a page effect: everything looks the same until you look.
 *
 * Implementation: one viewport-sized fixed canvas (never a document-sized
 * one — memory), bits stored in document space and drawn translated by
 * scrollY. Deterministic PRNG so the field is stable across renders.
 * prefers-reduced-motion: bits render in their final state, no flashes.
 */

type Bit = {
  x: number; // fraction of viewport width
  docY: number; // document-space Y in px
  size: number;
  jitter: number; // per-bit reveal offset in px
  evil: boolean;
  drift: number; // horizontal shimmer phase
  revealedAt: number | null; // timestamp of reveal, for the flash
};

const TEAL = [0, 245, 212] as const;
const EVIL = [255, 77, 106] as const;
const DIM = [148, 163, 184] as const; // slate-400-ish, barely there

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function BitSpray({ topOffset = 1 }: { topOffset?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let bits: Bit[] = [];
    let raf = 0;
    let needsDraw = true;
    let running = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const layout = () => {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const docHeight = document.documentElement.scrollHeight;
      // Where the field begins, in viewport heights (1 = below a full hero).
      const heroBottom = window.innerHeight * topOffset;
      const span = Math.max(docHeight - heroBottom, 1);
      // Density scales with page length; capped for cheap frames.
      const count = Math.min(Math.round(span / 28), 420);

      const rand = mulberry32(0x1badb175); // "bad bits"
      bits = Array.from({ length: count }, () => ({
        x: rand(),
        docY: heroBottom + rand() * span,
        size: 1.5 + rand() * 2.5,
        jitter: rand() * 220,
        evil: rand() < 0.055,
        drift: rand() * Math.PI * 2,
        revealedAt: null,
      }));
      needsDraw = true;
    };

    const draw = (now: number) => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // The spray front: sweeps at 72% of the viewport as you scroll.
      const front = scrollY + vh * 0.72;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      let anyFlashing = false;
      const vw = window.innerWidth;

      for (const bit of bits) {
        const screenY = bit.docY - scrollY;
        if (screenY < -60 || screenY > vh + 60) continue;

        const revealed = bit.docY < front - bit.jitter;
        if (revealed && bit.revealedAt === null) bit.revealedAt = now;
        if (!revealed) bit.revealedAt = null; // scrolling back up re-hides

        const x = bit.x * vw + (reduced ? 0 : Math.sin(now / 2400 + bit.drift) * 4);

        if (!revealed) {
          // Indistinguishable: a barely-there gray speck.
          ctx.fillStyle = `rgba(${DIM[0]},${DIM[1]},${DIM[2]},0.10)`;
          ctx.fillRect(x, screenY, bit.size, bit.size);
          continue;
        }

        const sinceReveal = reduced ? 1e4 : now - (bit.revealedAt ?? now);
        const flash = Math.max(0, 1 - sinceReveal / 450); // 450ms landing flash
        if (flash > 0) anyFlashing = true;

        const [r, g, b] = bit.evil ? EVIL : TEAL;
        const baseAlpha = bit.evil ? 0.5 : 0.22;
        const alpha = baseAlpha + flash * 0.6;
        const size = bit.size + flash * 3 + (bit.evil ? 0.8 : 0);

        if (bit.evil || flash > 0) {
          ctx.shadowColor = `rgba(${r},${g},${b},${bit.evil ? 0.8 : 0.6})`;
          ctx.shadowBlur = bit.evil ? 8 + Math.sin(now / 500 + bit.drift) * 3 : 10 * flash;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fillRect(x - (size - bit.size) / 2, screenY - (size - bit.size) / 2, size, size);
        ctx.shadowBlur = 0;
      }

      return anyFlashing;
    };

    let lastScroll = -1;
    const tick = (now: number) => {
      if (!running) return;
      const scrolled = window.scrollY !== lastScroll;
      if (scrolled || needsDraw || !reduced) {
        lastScroll = window.scrollY;
        needsDraw = draw(now) || false;
      }
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => layout();
    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    };

    layout();
    // Content (images, fonts) shifts the document height after load.
    const settle = window.setTimeout(layout, 1500);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [topOffset]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2]"
    />
  );
}
