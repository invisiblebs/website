import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Download, GraduationCap } from 'lucide-react';
import SiteNav from '@/components/SiteNav';
import ShinyText from '@/components/ShinyText';
import Footer from '@/components/site/Footer';
import PostCard from '@/components/site/PostCard';
import BitSpray from '@/components/site/BitSpray';
import { sortedPosts } from '@/lib/posts';
import { useEnquiry } from '@/lib/enquiry';
import { submitEnquiry } from '@/lib/firebase';

/**
 * Ambient halo at the top of each below-the-fold section: a centered teal
 * hairline catching the section edge, and a soft radial glow bleeding down —
 * so the hero's light doesn't die at the first scroll.
 */
function SectionHalo() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0">
      <div className="mx-auto h-px w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-[#00F5D4]/60 to-transparent" />
      <div className="mx-auto h-48 w-full max-w-4xl bg-[radial-gradient(60%_100%_at_50%_0%,rgba(0,245,212,0.09),transparent_70%)]" />
    </div>
  );
}

/** Shared card hover treatment — teal edge + glow, matching the hero's light. */
const CARD =
  'rounded-2xl border border-gray-800 bg-black/60 transition-all duration-300 hover:border-[#00F5D4]/35 hover:shadow-[0_0_46px_-18px_rgba(0,245,212,0.45)]';

/**
 * Home — the V3 ("DesignPro") language extended to a full landing page,
 * structured per the sales/SEO/credibility synthesis:
 * hero → proof grid → services (buyer-grouped) → engagement table (evidence
 * before the reveal) → principal → talks → how we work → contact.
 *
 * Claim hygiene is enforced in the copy itself: credentials attribute to the
 * person (earned at Quantstamp/Zircuit/SAP before the firm existed), TVL is a
 * column literally headed "at time of audit", and the disclosure box states
 * what an audit is not.
 */

/** Self-hosted, re-encoded loop (869KB vs the template's 7.4MB third-party asset). */
const VIDEO_SRC = '/hero.mp4';

function BackgroundVideo() {
  return (
    <video
      className="fixed inset-0 z-0 h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      poster="/hero-poster.jpg"
      src={VIDEO_SRC}
    />
  );
}

const EMAIL = 'contact@invisible-bits.com';


/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full">
      {/* Contrast scrim: the video is dark in the template but bright here —
          darken where text sits, keep the centre luminous for the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/90 via-black/25 to-black/70"
      />
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pt-16 md:px-8">
        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-sm text-sm font-medium leading-relaxed text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.9)] md:text-base">
            Blockchain &amp; privacy consulting — zero-knowledge engineering, tokenization
            infrastructure and <span className="whitespace-nowrap">post-quantum</span> readiness.
          </p>
          <div className="lg:text-right [text-shadow:0_1px_14px_rgba(0,0,0,0.9)]">
            <p className="text-sm font-medium text-white md:text-base">
              ZK proof systems in production · 10× prover gains
            </p>
            <p className="mt-1 text-sm text-white/70">
              40+ security reviews · $50B+ value secured
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-1 flex-col items-center justify-center py-14 text-center md:py-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.9)] md:text-sm">
            Zero-Knowledge & Privacy · Asset Tokenization · Post-Quantum
          </p>

          <h1 className="text-4xl font-medium leading-[0.9] tracking-tighter [text-shadow:0_2px_40px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="block text-white">Invisible threats.</span>
            <span className="block">
              <ShinyText>Made visible.</ShinyText>
            </span>
          </h1>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90 md:px-8 md:py-4 md:text-base"
            >
              Request a scoping call
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
            <a
              href="#track-record"
              className="rounded-full border border-gray-600 px-6 py-3 text-sm text-white/90 transition-colors hover:border-gray-400 hover:text-white md:px-8 md:py-4 md:text-base"
            >
              See the track record
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Proof grid — selected engagements & prior roles                     */
/* ------------------------------------------------------------------ */

type ProofItem = { name: string; line: string; short: string; href: string; file?: string; mono?: boolean; mark?: string };

const PROOF: ProofItem[] = [
  { name: 'Solana', href: 'https://solana.com', file: 'solana.svg', short: 'Core protocol audits \u00d73', line: 'Three core protocol audits led at Quantstamp' },
  { name: 'Lido', href: 'https://lido.fi', file: 'lido.svg', short: 'stETH integration audit', line: 'stETH integration audit led at Quantstamp' },
  { name: 'Ondo Finance', href: 'https://ondo.finance', file: 'ondo.svg', mono: true, short: 'Institutional audits \u00d73', line: 'Three institutional audits led at Quantstamp' },
  { name: 'Avalanche', href: 'https://www.avax.network', file: 'avax.svg', short: 'L1 protocol audit', line: 'L1 protocol audit led at Quantstamp' },
  { name: 'Zircuit', href: 'https://www.youtube.com/watch?v=k_Vks7ywVHs', file: 'zircuit.svg', short: 'Lead ZK engineer, zk-rollup', line: 'Lead ZK cryptography engineer \u2014 production zk-rollup' },
  { name: 'Quantstamp', href: 'https://certificate.quantstamp.com/full/ichi.pdf', file: 'quantstamp.svg', mono: true, short: 'Senior research engineer', line: 'Senior research engineer, 40+ audits' },
  { name: 'SAP', href: 'https://www.sap.com', file: 'sap.svg', short: 'Head of Cloud Security', line: 'Head of Cloud Security' },
  { name: 'Google', href: 'https://doi.org/10.1145/3029806.3029835', file: 'google.svg', short: 'Chromium security research', line: 'Chromium security research collaboration \u2014 published at CODASPY' },
  { name: 'Ginlo', href: 'https://www.ginlo.net', file: 'ginlo.png', short: 'Blockchain PKI in production', line: 'Blockchain PKI with end-to-end encryption, in production' },
  { name: 'Brainloop', href: 'https://www.brainloop.com', file: 'brainloop.svg', short: 'Crypto protocols & pentesting', line: 'Cryptographic protocols & penetration testing' },
  { name: 'KeeperDAO', href: 'https://certificate.quantstamp.com/full/keeper-dao-liquidity-pool-and-hiding-vault.pdf', file: 'keeper.svg', mono: true, short: 'MEV protection audit', line: 'MEV protection audit led at Quantstamp' },
  { name: 'Saudi Real Estate Registry', href: '/blog/policy-driven-real-estate-tokenization', mark: 'RER', short: 'Saudi Real Estate Registry \u2014 tokenization PoC', line: 'Saudi Real Estate Registry \u2014 tokenization & market architecture (working PoC)' },
];

function ProofGrid() {
  return (
    <section className="relative border-y border-gray-800">
      <SectionHalo />
      <div className="relative mx-auto max-w-7xl px-5 py-10 md:px-8">
        <p className="text-center text-[0.7rem] uppercase tracking-[0.2em] text-white/50">
          Selected engagements &amp; prior roles
        </p>
        <div className="mt-8 flex flex-wrap items-start justify-center gap-x-10 gap-y-8 md:gap-x-12">
          {PROOF.map((item) => (
            <a
              key={item.name}
              href={item.href}
              title={item.line}
              target={item.href.startsWith('/') ? undefined : '_blank'}
              rel={item.href.startsWith('/') ? undefined : 'noopener noreferrer'}
              className="group flex w-[130px] flex-col items-center gap-2.5"
            >
              {item.file ? (
                <img
                  src={`/logos/${item.file}`}
                  alt={item.name}
                  loading="lazy"
                  className="h-7 w-auto max-w-[120px] object-contain opacity-85 transition-opacity group-hover:opacity-100 md:h-8"
                  style={item.mono ? { filter: 'brightness(0) invert(1)' } : undefined}
                />
              ) : (
                <span
                  className="flex h-7 items-center font-mono text-lg font-bold tracking-widest text-[#00F5D4]/90 md:h-8"
                  aria-label={item.name}
                >
                  {item.mark}
                </span>
              )}
              <p className="text-center text-[11px] leading-snug text-white/55 transition-colors group-hover:text-white/85">
                {item.short}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services — six clickable offerings, grouped by buyer               */
/* ------------------------------------------------------------------ */

const SERVICES = [
  {
    id: 'zk-engineering',
    aud: 'For protocol teams',
    title: 'Zero-Knowledge Engineering',
    text: 'Circuit design and optimisation, zkVM integration, proving-cost and latency reduction, and distributed prover orchestration — from the engineer who took a zk-rollup to mainnet.',
    tags: ['Zircuit: shipped to mainnet', '10× prover gains', 'Halo2 · SP1 · RISC0 · ZISK · PICO'],
  },
  {
    id: 'rwa',
    aud: 'For issuers, funds & registries',
    title: 'Real-World Asset Tokenization',
    text: 'ERC-3643 tokens enforcing eligibility, caps and lock-ups at transfer — with a policy-gated trading venue, stablecoin settlement, lien and escrow automation.',
    tags: ['Working PoC: Saudi Real Estate Registry', 'GCC regulatory regimes'],
  },
  {
    id: 'pqc',
    aud: 'For enterprises & software vendors',
    title: 'Post-Quantum Readiness',
    text: "When customers' security questionnaires start asking: a cryptographic bill of materials, exposure scored by data lifetime, a costed migration to the NIST standards, and crypto-agility so the next transition isn't another programme.",
    tags: ['FIPS 203 / 204 / 205', 'Vendor-neutral'],
  },
  {
    id: 'protocol-reviews',
    aud: 'For protocol teams',
    title: 'Protocol Security Review',
    text: 'Taken on selectively: design and consensus review, scrutiny of bespoke cryptographic constructions, and formal verification of the invariants that matter — severity-ranked, with a re-test.',
    tags: ['Solana core ×3', '40+ reviews led'],
  },
  {
    id: 'privacy',
    aud: 'For regulated data holders',
    title: 'Privacy Engineering',
    text: 'Secure multi-party computation, selective disclosure, confidential transactions, reusable decentralised identity and data-residency architecture — counterparties verify what matters without seeing the records.',
    tags: ['MPC health-data platform', '15 publications'],
  },
  {
    id: 'architecture-review',
    aud: 'For enterprises & mid-market',
    title: 'Architecture Review',
    text: 'What your platform is genuinely good for, where a database is the honest answer, evidence-retention and non-repudiation design, and a staged roadmap. We resell nothing.',
    tags: ['Independent, no resell', 'GCC regulatory fluency'],
  },
];

function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60 md:text-sm">What we do</p>
      <h2 className="mt-3 text-3xl font-medium leading-[1] tracking-tighter md:text-4xl">
        <ShinyText>Services</ShinyText>
      </h2>

      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
        Six practices, from protocol teams to mid-market vendors — every card opens a scoping call.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <a
            key={service.id}
            id={service.id}
            href="#contact"
            onClick={() => useEnquiry.getState().setTopic(service.title)}
            aria-label={`${service.title} — request a scoping call`}
            className={`group flex cursor-pointer flex-col p-6 ${CARD}`}
          >
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#00F5D4]/70">{service.aud}</span>
            <h3 className="mt-3 text-lg font-medium tracking-tight text-white md:text-xl">
              {service.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{service.text}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-gray-800 px-3 py-1 text-xs text-white/50">
                  {tag}
                </span>
              ))}
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#00F5D4]/60 transition-colors group-hover:text-[#00F5D4]">
              Request a scoping call
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Track record — evidence table, Zircuit case study, disclosure       */
/* ------------------------------------------------------------------ */

const HEADLINE_STATS = [
  { v: '10×', l: 'Prover performance gains' },
  { v: '40+', l: 'Security reviews led' },
  { v: '200+', l: 'Vulnerabilities found' },
  { v: '$50B+', l: 'Value secured at review' },
];

type Flagship = {
  name: string;
  title: string;
  stats: string;
  text: string;
  logo?: string;
  mono?: boolean;
  mark?: string;
  href?: string;
  linkLabel?: string;
};

const FLAGSHIPS: Flagship[] = [
  {
    name: 'Zircuit',
    logo: 'zircuit.svg',
    title: 'Production zk-rollup, shipped to mainnet',
    stats: '14 months to mainnet · $600M max TVL · 0 security incidents',
    text: 'Led five Rust engineers and three cryptographers across three generations of SNARK provers, multi-zkVM support (SP1, RISC0, ZISK, PICO) and a GPU proof-orchestration scheduler, with 10× prover gains. Cleared Trail of Bits and Quantstamp reviews with no critical findings.',
    href: 'https://www.youtube.com/watch?v=k_Vks7ywVHs',
    linkLabel: 'Watch the EthCC talk',
  },
  {
    name: 'Saudi Real Estate Registry',
    mark: 'RER',
    title: 'National tokenization architecture',
    stats: 'ERC-3643 · compliant exchange · stablecoin settlement',
    text: 'Full market architecture with a working proof of concept for compliant fractional property markets — with the registry, not the market, as policy owner.',
    href: '/blog/policy-driven-real-estate-tokenization',
    linkLabel: 'Architecture & PoC demo',
  },
  {
    name: 'Solana',
    logo: 'solana.svg',
    mono: true,
    title: 'Core protocol security, three engagements',
    stats: '$15B+ TVL at time of audit',
    text: 'Vulnerability research on the Solana core runtime and consensus layers — three separate core-protocol audits.',
  },
];

function TrackRecord() {
  return (
    <section id="track-record" className="relative border-t border-gray-800">
      <SectionHalo />
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60 md:text-sm">Proof of work</p>
        <h2 className="mt-3 text-3xl font-medium leading-[1] tracking-tighter md:text-4xl">
          Track <ShinyText>Record</ShinyText>
        </h2>

        {/* Numbers first — a segmented band, one stat per cell */}
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gray-800 bg-gray-800 md:grid-cols-4">
          {HEADLINE_STATS.map((stat) => (
            <div key={stat.l} className="bg-black/80 p-6 backdrop-blur-sm md:p-7">
              <dd className="text-3xl font-medium tracking-tighter text-white md:text-4xl">
                {stat.v}
              </dd>
              <dt className="mt-2 text-sm text-white/60">{stat.l}</dt>
            </div>
          ))}
        </dl>

        {/* Three flagship engagements */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {FLAGSHIPS.map((f) => (
            <div key={f.name} className={`flex flex-col p-6 ${CARD}`}>
              <div className="flex h-8 items-center">
                {f.logo ? (
                  <img
                    src={`/logos/${f.logo}`}
                    alt={f.name}
                    loading="lazy"
                    className="h-8 w-auto max-w-[130px] object-contain opacity-90"
                    style={f.mono ? { filter: 'brightness(0) invert(1)' } : undefined}
                  />
                ) : (
                  <span className="font-mono text-lg font-bold tracking-widest text-[#00F5D4]">
                    {f.mark}
                  </span>
                )}
              </div>
              <h3 className="mt-4 md:min-h-[3.5rem] text-lg font-medium tracking-tight text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm text-[#00F5D4]/90">
                {f.stats.split(' · ').map((seg, i) => (
                  <span key={seg}>
                    {i > 0 && ' · '}
                    <span className="whitespace-nowrap">{seg}</span>
                  </span>
                ))}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{f.text}</p>
              {f.href &&
                (f.href.startsWith('http') ? (
                  <a
                    href={f.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#00F5D4]/90 hover:text-[#00F5D4]"
                  >
                    {f.linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    to={f.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#00F5D4]/90 hover:text-[#00F5D4]"
                  >
                    {f.linkLabel}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                ))}
            </div>
          ))}
        </div>

        {/* Everything else, in two lines — receipts on request */}
        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <p className="max-w-3xl text-sm leading-relaxed text-white/60">
            Also audited: Lido stETH, Ondo Finance ×3, Avalanche, Badger, Tokemak, KeeperDAO,
            Reflexer, Mythical Games, SuperRare, Merit Circle, APWine and Kresko. Reports were issued under Quantstamp's name; where a report is public, we link it directly. Published reports naming our principal:{' '}
            {[
              ['Ichi', 'https://certificate.quantstamp.com/full/ichi.pdf'],
              ['Badger ibBTC', 'https://certificate.quantstamp.com/full/badger-ib-btc.pdf'],
              ['Tokemak', 'https://certificate.quantstamp.com/full/tokemak.pdf'],
              ['Reflexer', 'https://certificate.quantstamp.com/full/reflexer-staking-and-auction-house.pdf'],
              ['SuperRare', 'https://certificate.quantstamp.com/full/super-rare-token.pdf'],
              ['PlaySwoops', 'https://certificate.quantstamp.com/full/play-swoops.pdf'],
            ].map(([label, url], i) => (
              <span key={label}>
                {i > 0 && ' · '}
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00F5D4]/80 underline-offset-4 hover:underline"
                >
                  {label}
                </a>
              </span>
            ))}
            .
          </p>
          <a
            href="/capability-statement.pdf"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-700 px-6 py-3.5 text-sm text-white/90 transition-colors hover:border-gray-500 hover:text-white"
          >
            <Download className="h-4 w-4 text-[#00F5D4]" aria-hidden="true" />
            Capability statement (PDF)
          </a>
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Principal                                                           */
/* ------------------------------------------------------------------ */

const EXPERTISE = [
  'Zero-knowledge proofs & zkVMs',
  'Protocol & smart contract security',
  'Post-quantum migration',
  'Secure multi-party computation',
  'Trusted computing',
  'Compiler-based protection (LLVM)',
];

function Principal() {
  return (
    <section id="team" className="relative border-t border-gray-800">
      <SectionHalo />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        <div>
          <img
            src="/mason.jpg"
            alt="Portrait of Dr. M. Ahmadvand"
            loading="lazy"
            width={320}
            height={400}
            className="w-56 rounded-2xl border border-gray-800 object-cover sm:w-64 lg:w-full"
          />
          <p className="mt-5 flex items-center gap-2 text-sm text-white/60">
            <GraduationCap className="h-4 w-4 text-[#00F5D4]" aria-hidden="true" />
            Ph.D., TU Munich — summa cum laude
          </p>
          <a
            href="https://scholar.google.com/citations?user=8rWVCAIAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm text-white/80 transition-colors hover:text-white"
          >
            Publications on Google Scholar
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60 md:text-sm">
            Team
          </p>
          <h2 className="mt-3 text-3xl font-medium leading-[1.05] tracking-tighter md:text-4xl">
            Dr. M. Ahmadvand
          </h2>
          <p className="mt-2 text-base text-[#00F5D4]">
            Director &amp; Principal Security Researcher
          </p>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
            Former Head of Cloud Security at SAP, senior research engineer at Quantstamp, and lead
            ZK cryptography engineer at Zircuit; during his TU Munich research he built
            anti-tampering defenses for the Chromium browser in collaboration with Google. He has
            led security audits for 40+ Web3 protocols —
            including Solana's core protocol, Lido and Ondo Finance — and published fifteen
            research works on software security, compiler-based protection and zero-knowledge
            systems.
          </p>

          <blockquote className="mt-6 max-w-2xl border-l-2 border-[#00F5D4]/50 pl-5 text-sm leading-relaxed text-white/80 md:text-base">
            Engagement teams are assembled per scope from a vetted network of cryptographers,
            protocol engineers and infrastructure architects.
          </blockquote>

          <div className="mt-7 flex flex-wrap gap-2">
            {EXPERTISE.map((item) => (
              <span key={item} className="rounded-full border border-gray-700 px-4 py-1.5 text-xs text-white/70">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Talks preview                                                       */
/* ------------------------------------------------------------------ */

function TalksPreview() {
  const latest = sortedPosts.filter((p) => p.slug !== 'ethproofs-call-8').slice(0, 3);

  return (
    <section id="talks" className="relative border-t border-gray-800">
      <SectionHalo />
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60 md:text-sm">
              From the stage
            </p>
            <h2 className="mt-3 text-3xl font-medium leading-[1] tracking-tighter md:text-4xl">
              Talks &amp; <ShinyText>Writing</ShinyText>
            </h2>
          </div>
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 rounded-full border border-gray-700 px-6 py-3 text-sm text-white/90 transition-colors hover:border-gray-500 hover:text-white"
          >
            All talks &amp; posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {latest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How we work                                                         */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

const TOPICS = [
  'Protocol & ZK engineering',
  'Asset tokenization & regulated infrastructure',
  'Enterprise & post-quantum',
  'RFP / tender',
];

type SendState = 'idle' | 'sending' | 'sent' | 'error';

function Contact() {
  const incoming = useEnquiry((st) => st.topic);
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  useEffect(() => {
    if (incoming) setTopic(incoming);
  }, [incoming]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<SendState>('idle');
  const formRef = useRef<HTMLDivElement>(null);

  const pickTopic = (t: string) => {
    setTopic(t);
    formRef.current?.scrollIntoView({ block: 'center' });
    (formRef.current?.querySelector('input[name="name"]') as HTMLInputElement | null)?.focus();
  };

  const mailtoFallback = `mailto:${EMAIL}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(message)}`;

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || message.trim().length < 8) return;
    setState('sending');
    try {
      await submitEnquiry({ name, email, topic, message });
      setState('sent');
      setName(''); setEmail(''); setMessage('');
    } catch {
      setState('error');
    }
  }

  return (
    <section id="contact" className="relative border-t border-gray-800">
      <SectionHalo />
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-start lg:gap-14">
        <div className="lg:pt-2">
          <h2 className="text-3xl font-medium leading-[1] tracking-tighter md:text-4xl">
            <ShinyText>Contact</ShinyText>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70 md:text-base">
            Tell us what you are building. We respond to every enquiry.
          </p>
          <p className="mt-6 text-sm text-white/50">
            Prefer email? <span className="select-all text-white/80">{EMAIL}</span>
          </p>
        </div>

        <div ref={formRef} className="rounded-2xl border border-gray-800 bg-black/70 p-5 text-left backdrop-blur-sm md:p-6">
          {state === 'sent' ? (
            <div className="py-8 text-center">
              <p className="text-lg font-medium text-[#00F5D4]">Received.</p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/70">
                Your enquiry is in our inbox — we reply quickly, either way.
              </p>
              <button
                type="button"
                onClick={() => setState('idle')}
                className="mt-6 rounded-full border border-gray-700 px-5 py-2 text-sm text-white/80 hover:border-gray-500 hover:text-white"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Topic">
                {!TOPICS.includes(topic) && (
                  <span className="rounded-full bg-[#00F5D4]/15 px-4 py-1.5 text-xs font-medium text-[#00F5D4]">
                    {topic}
                  </span>
                )}
                {TOPICS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                    className={
                      topic === t
                        ? 'rounded-full bg-[#00F5D4]/15 px-4 py-1.5 text-xs font-medium text-[#00F5D4]'
                        : 'rounded-full border border-gray-700 px-4 py-1.5 text-xs text-white/70 transition-colors hover:border-gray-500 hover:text-white'
                    }
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="text-xs font-medium uppercase tracking-wide text-white/60">
                    Name
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-lg border border-gray-700 bg-black/60 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#00F5D4]/60"
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="text-xs font-medium uppercase tracking-wide text-white/60">
                    Work email
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1.5 w-full rounded-lg border border-gray-700 bg-black/60 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#00F5D4]/60"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="c-msg" className="text-xs font-medium uppercase tracking-wide text-white/60">
                  What are you working on?
                </label>
                <textarea
                  id="c-msg"
                  name="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="mt-1.5 w-full resize-y rounded-lg border border-gray-700 bg-black/60 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#00F5D4]/60"
                />
              </div>

              {state === 'error' && (
                <p role="alert" className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-white/80">
                  Sending from the site failed.{' '}
                  <a href={mailtoFallback} className="font-medium text-[#00F5D4] hover:underline">
                    Send it by email instead
                  </a>{' '}
                  — or write to <span className="select-all text-white">{EMAIL}</span>.
                </p>
              )}

              <button
                type="submit"
                disabled={state === 'sending'}
                className="group mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {state === 'sending' ? 'Sending…' : 'Request a scoping call'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

export default function Home() {
  useEffect(() => {
    document.title = 'Invisible Bits — Blockchain & Privacy Consulting';
  }, []);

  return (
    <div className="relative min-h-screen bg-black font-sans text-white">
      {/* One video for the whole page: full glory in the hero, then dimmed to
          a living shimmer behind every section — the theme never cuts out. */}
      <BackgroundVideo />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-full">
        {/* Fade band across the hero's last stretch, then a steady dim veil */}
        <div className="absolute inset-x-0 top-[calc(100svh-11rem)] h-44 bg-gradient-to-b from-transparent to-black/[0.87]" />
        <div className="absolute inset-x-0 bottom-0 top-[100svh] bg-black/[0.87]" />
      </div>
      <BitSpray />
      <SiteNav />
      <div className="relative z-10">
        <Hero />
      </div>
      <main className="relative z-10">
      <ProofGrid />
      <Services />
      <TrackRecord />
      <Principal />
      <TalksPreview />
      <Contact />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Footer />
      </div>
      </main>
    </div>
  );
}
