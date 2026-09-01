import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';

/**
 * Fixed site navigation. Transparent over the hero; gains a frosted black
 * ground once scrolled. On the home page a scrollspy highlights the section
 * currently in view; on blog routes "Talks & Writing" is highlighted.
 */

type NavItem = { label: string; href: string; spy: string; external?: boolean };

const LINKS: NavItem[] = [
  { label: 'Services', href: '/#services', spy: 'services' },
  { label: 'Track Record', href: '/#track-record', spy: 'track-record' },
  { label: 'Talks & Writing', href: '/blog', spy: 'blog', external: true },
  { label: 'Team', href: '/#team', spy: 'team' },
  { label: 'Contact', href: '/#contact', spy: 'contact' },
];

const SPY_SECTIONS = ['services', 'track-record', 'team', 'talks', 'contact'];

// Sections that should light up a nav item they don't own outright.
const SPY_ALIAS: Record<string, string> = { talks: 'blog' };

function NavLink({
  href,
  label,
  active,
  onClick,
  variant,
  external,
}: {
  href: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  variant: 'desktop' | 'mobile';
  external?: boolean;
}) {
  const content = external ? (
    <span className="inline-flex items-center gap-1">
      {label}
      <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden="true" />
    </span>
  ) : (
    label
  );
  // Color classes are exclusive per state — never stacked — so the active
  // highlight can't lose a specificity fight with the resting color.
  const className =
    variant === 'desktop'
      ? `rounded-full px-4 py-1.5 text-sm transition-colors ${
          active
            ? 'bg-[#00F5D4]/15 font-medium text-[#00F5D4] shadow-[0_0_16px_-6px_rgba(0,245,212,0.6)]'
            : 'text-white/80 hover:text-white'
        }`
      : `border-b border-gray-800 py-4 text-lg transition-colors ${
          active ? 'font-medium text-[#00F5D4]' : 'text-white/80 hover:text-white'
        }`;

  if (href.startsWith('/#')) {
    const hash = href.slice(1); // "#section"
    return (
      <Link
        to={href}
        onClick={() => {
          onClick?.();
          // If the target is already rendered (we're on the home page),
          // scroll immediately — covers repeat clicks on the same hash too.
          document.querySelector(hash)?.scrollIntoView({ block: 'start' });
        }}
        className={className}
        aria-current={active ? 'true' : undefined}
      >
        {content}
      </Link>
    );
  }
  return (
    <Link to={href} onClick={onClick} className={className} aria-current={active ? 'true' : undefined}>
      {content}
    </Link>
  );
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSpy, setActiveSpy] = useState<string | null>(null);
  const location = useLocation();
  const onBlog = location.pathname.startsWith('/blog');
  const close = () => setOpen(false);

  // One handler drives both the frosted background and the section spy —
  // position-based, so it cannot miss events the way an observer can.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (!onBlog) {
        let current: string | null = null;
        for (const id of SPY_SECTIONS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 128) {
            current = SPY_ALIAS[id] ?? id;
          }
        }
        setActiveSpy(current);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onBlog, location.pathname]);

  const isActive = (spy: string) => (onBlog ? spy === 'blog' : activeSpy === spy);

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ' +
        (scrolled || open
          ? 'border-b border-white/10 bg-black/75 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent')
      }
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8" aria-label="Main">
        <Link
        to="/"
        className="flex items-center gap-2.5"
        onClick={() => {
          close();
          window.scrollTo({ top: 0 });
        }}
        aria-label="Invisible Bits — home"
      >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#161b30]">
            <img
              src="/invisible-bits.png"
              alt=""
              width={26}
              height={26}
              className="h-[26px] w-[26px] object-contain"
              style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 3px rgba(255,255,255,0.28))' }}
            />
          </span>
          <span className="text-sm font-medium text-white">Invisible Bits</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-gray-700/80 bg-black/65 px-2 py-1.5 backdrop-blur-md lg:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              label={link.label}
              active={isActive(link.spy)}
              variant="desktop"
              external={link.external}
            />
          ))}
        </div>

        <button
          type="button"
          className="text-white lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-black px-6 pb-10 pt-24 lg:hidden">
          <button
            type="button"
            className="absolute right-5 top-7 text-white"
            aria-label="Close menu"
            onClick={close}
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          {LINKS.filter((l) => l.spy !== 'contact').map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              label={link.label}
              active={isActive(link.spy)}
              onClick={close}
              variant="mobile"
              external={link.external}
            />
          ))}
          <a
            href="/#contact"
            onClick={close}
            className="mt-8 flex items-center justify-center gap-2 rounded-full bg-white py-3.5 text-base font-medium text-black"
          >
            Contact
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      )}
    </header>
  );
}
