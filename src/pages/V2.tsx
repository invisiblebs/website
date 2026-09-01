import { useEffect, useRef } from 'react';
import './v2.css';

/**
 * Version 2 — "Xero" template language, rebranded teal for Invisible Bits.
 * Hero card with the radial gradient arc + masked grid, and the animated
 * icon pipeline: layers -> hexagon mark -> shield-check, connected by a
 * travelling light beam (p1 -> splash -> p2 -> idle state machine).
 */

const MAILTO = 'mailto:contact@invisible-bits.com?subject=Protocol%20review';

const BRANDS = [
  { name: 'Solana', file: 'solana.svg' },
  { name: 'Lido', file: 'lido.svg' },
  { name: 'Ondo Finance', file: 'ondo.svg' },
  { name: 'Avalanche', file: 'avax.svg' },
  { name: 'Quantstamp', file: 'quantstamp.svg' },
];

export default function V2() {
  const pipelineRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const corePathRef = useRef<SVGPathElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pipeline = pipelineRef.current;
    const nodeStack = stackRef.current;
    const nodeX = centerRef.current;
    const nodeShield = shieldRef.current;
    const glowPath = glowPathRef.current;
    const corePath = corePathRef.current;
    const gradient = gradientRef.current;
    const splash = splashRef.current;
    if (!pipeline || !nodeStack || !nodeX || !nodeShield || !glowPath || !corePath || !gradient || !splash) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const computePath = () => {
      const pRect = pipeline.getBoundingClientRect();
      const sRect = nodeStack.getBoundingClientRect();
      const xRect = nodeX.getBoundingClientRect();
      const shRect = nodeShield.getBoundingClientRect();
      const startX = sRect.left + sRect.width / 2 - pRect.left;
      const startY = sRect.top + sRect.height / 2 - pRect.top;
      const midX = xRect.left + xRect.width / 2 - pRect.left;
      const midY = xRect.top + xRect.height / 2 - pRect.top;
      const endX = shRect.left + shRect.width / 2 - pRect.left;
      const endY = shRect.top + shRect.height / 2 - pRect.top;
      const d = `M ${startX},${startY} L ${midX},${midY} L ${endX},${endY}`;
      glowPath.setAttribute('d', d);
      corePath.setAttribute('d', d);
      // Gradient travels in path space (userSpaceOnUse), so give it the
      // pipeline's horizontal extent.
      gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
      gradient.setAttribute('y1', String(startY));
      gradient.setAttribute('y2', String(startY));
      return { startX, endX };
    };

    let span = computePath();
    const onResize = () => {
      span = computePath();
    };
    window.addEventListener('resize', onResize);

    if (reduced) {
      // Static beam, no loop.
      gradient.setAttribute('x1', String(span.startX));
      gradient.setAttribute('x2', String(span.endX));
      return () => window.removeEventListener('resize', onResize);
    }

    type Phase = 'p1' | 'splash' | 'p2' | 'idle';
    let state: Phase = 'p1';
    let lastStateChange = performance.now();
    let raf = 0;

    const setWindowAt = (percentage: number) => {
      // Sliding bright window: 5% half-width across the pipeline span.
      const width = span.endX - span.startX;
      const center = span.startX + width * percentage;
      const half = width * 0.05;
      gradient.setAttribute('x1', String(center - half));
      gradient.setAttribute('x2', String(center + half));
    };

    const tick = (now: number) => {
      const elapsed = now - lastStateChange;

      if (state === 'p1') {
        const p = Math.min(elapsed / 800, 1);
        setWindowAt(p * 0.5);
        nodeStack.classList.toggle('active', p < 0.4);
        if (p >= 1) {
          state = 'splash';
          lastStateChange = now;
          glowPath.style.opacity = '0';
          corePath.style.opacity = '0';
          splash.classList.add('animate');
        }
      } else if (state === 'splash') {
        if (elapsed >= 800) {
          state = 'p2';
          lastStateChange = now;
          splash.classList.remove('animate');
          glowPath.style.opacity = '0.6';
          corePath.style.opacity = '1';
        }
      } else if (state === 'p2') {
        const p = Math.min(elapsed / 800, 1);
        setWindowAt(0.5 + p * 0.5);
        nodeShield.classList.toggle('active', p > 0.6);
        if (p >= 1) {
          nodeShield.classList.remove('active');
          state = 'idle';
          lastStateChange = now;
        }
      } else if (elapsed >= 1000) {
        state = 'p1';
        lastStateChange = now;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="v2-page">
      <nav className="v2-nav">
        <a href="/" className="nav-logo">
          Invisible Bits
        </a>
        <ul className="nav-links">
          <li>
            <a href={MAILTO}>Audits</a>
          </li>
          <li>
            <a href={MAILTO}>Zero-Knowledge</a>
          </li>
          <li>
            <a href={MAILTO}>Tokenization</a>
          </li>
        </ul>
        <div className="nav-actions">
          <a href={MAILTO} className="btn-login">
            Contact
          </a>
          <a href={MAILTO} className="btn-signup">
            Book a review
          </a>
        </div>
      </nav>

      <section className="hero-card">
        <div className="hero-grid" aria-hidden="true" />

        <div className="icon-pipeline" ref={pipelineRef}>
          <svg className="beam-svg" aria-hidden="true">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="beam-gradient" ref={gradientRef} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0ABAB5" stopOpacity="0" />
                <stop offset="20%" stopColor="#0ABAB5" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="80%" stopColor="#00F5D4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#00F5D4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              ref={glowPathRef}
              stroke="url(#beam-gradient)"
              strokeWidth="2"
              fill="none"
              filter="url(#glow)"
              style={{ opacity: 0.6 }}
            />
            <path ref={corePathRef} stroke="url(#beam-gradient)" strokeWidth="0.8" fill="none" />
          </svg>

          {/* Left node — layered blocks (the chain) */}
          <div className="icon-node node-light-right" ref={stackRef} title="Protocol">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>

          <div className="pipeline-line" />

          {/* Center node — the Invisible Bits hexagon mark */}
          <div className="center-wrap">
            <div className="splash" ref={splashRef} />
            <div className="icon-node-center" ref={centerRef} title="Invisible Bits">
              <svg viewBox="0 0 64 64" aria-hidden="true">
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
            </div>
          </div>

          <div className="pipeline-line right" />

          {/* Right node — shield-check (the proof) */}
          <div className="icon-node node-light-left" ref={shieldRef} title="Proven">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
        </div>

        <div className="hero-content">
          <h1 className="hero-heading">
            The invisible way
            <strong>to prove your protocol</strong>
          </h1>
          <p className="hero-sub">
            Principal-led security audits and zero-knowledge engineering, from the researcher behind
            40+ protocol reviews and a production zk-rollup.
          </p>
          <a href={MAILTO} className="btn-cta">
            Book a review
          </a>
        </div>
      </section>

      <div className="brands">
        {BRANDS.map((brand) => (
          <img key={brand.name} src={`/logos/${brand.file}`} alt={brand.name} loading="lazy" />
        ))}
      </div>

      <a href="/" className="v2-switch">
        ← back to main site
      </a>
    </div>
  );
}
