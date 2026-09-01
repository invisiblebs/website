import { ArrowUpRight } from 'lucide-react';

const MAILTO = 'mailto:contact@invisible-bits.com';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="flex items-center gap-2.5 text-sm font-medium text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#161b30]"><img src="/invisible-bits.png" alt="" width={20} height={20} className="h-5 w-5 object-contain" style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 2px rgba(255,255,255,0.25))' }} /></span>
            Invisible Bits Consulting FZCO
          </p>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/50">
            Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, UAE · License 57216 (IFZA)
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm md:items-end">
          <a href={MAILTO} className="inline-flex items-center gap-1 text-white/80 transition-colors hover:text-white">
            contact@invisible-bits.com
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href="https://scholar.google.com/citations?user=8rWVCAIAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white/60 transition-colors hover:text-white"
          >
            Google Scholar
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <p className="mt-8 max-w-3xl text-[0.7rem] leading-relaxed text-white/40">
        © {year} Invisible Bits Consulting — FZCO. Audit and engineering credentials cited on this
        site are those of Dr. M. Ahmadvand, earned at Quantstamp, Zircuit and SAP prior to the founding of the firm. TVL figures are stated as of the time of each audit. An audit is not an endorsement.
      </p>
    </footer>
  );
}
