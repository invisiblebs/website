/**
 * Talks, news and writing — the site's only content store (no CMS).
 * To publish: add an entry here and rebuild. Newest first is handled by
 * sorting on `date`, so order in this file doesn't matter.
 *
 * `href` links out (talk recordings, agendas). `youtubeId` embeds the
 * recording on the post's own page. `body` renders an internal article page
 * at /blog/<slug>. An entry needs at least one of href | youtubeId | body.
 */

export type PostType = 'talk' | 'news' | 'writing';

export type Post = {
  slug: string;
  type: PostType;
  title: string;
  venue?: string;
  date: string; // ISO yyyy-mm-dd (day may be approximate for venue-only dates)
  summary: string;
  href?: string;
  youtubeId?: string;
  /** Seconds into the video where this speaker's segment starts. */
  youtubeStart?: number;
  /** Loom recording id — embedded on the post page. */
  loomId?: string;
  body?: string[];
  /** Reference list rendered as links on the post page (papers, resources). */
  links?: { label: string; url: string }[];
  tags?: string[];
};

export const posts: Post[] = [
  // --- Talks (links verified against public sources at build time) ---
  {
    slug: 'ethcc-2026-validity-proofs',
    type: 'talk',
    title: 'Proving Less, Verifying More: 3.5× Faster L2 Validity Proofs',
    venue: 'EthCC[9], Cannes',
    date: '2026-04-01',
    summary:
      'Deriving L2 state inside a zkVM is expensive — these pipelines were never designed for proving. Sparse techniques cut derivation costs by up to 6.5× (up to 3.5× overall), shown on Optimism.',
    tags: ['ZK', 'Validity proofs', 'EthCC'],
    href: 'https://www.youtube.com/watch?v=k_Vks7ywVHs',
    youtubeId: 'k_Vks7ywVHs',
    body: [
      'Recorded at EthCC[9] in Cannes (March 30 – April 2, 2026). The talk shows how restructuring what gets proven versus what gets verified yields up to a 3.5× speedup on L2 validity proofs.',
    ],
    links: [
      { label: 'The paper: Optimizing Optimism — Up to 3.5× Faster zkVM Validity Proofs via Sparse Derivation (arXiv, 2025)', url: 'https://arxiv.org/abs/2510.23172' },
    ],
  },
  {
    slug: 'ethproofs-day-argentina-2025',
    type: 'talk',
    title: 'Proof Orchestration in Rust: Scaling Proof Workflows',
    venue: 'Ethproofs Day · Devconnect Buenos Aires',
    date: '2025-11-22',
    summary:
      'A lightning talk from the Ethproofs community day at Devconnect Argentina: orchestrating fleets of provers in Rust, and what it takes to scale proof workflows in production.',
    tags: ['Ethproofs', 'Provers', 'Rust', 'Devconnect'],
    href: 'https://www.youtube.com/watch?v=EMABU2kSV4Y',
    youtubeId: 'EMABU2kSV4Y',
    body: [
      'Delivered at Ethproofs Day, La Rural, Buenos Aires, during Devconnect ARG on November 22 2025, and published on the Ethereum Foundation YouTube channel.',
    ],
  },
  {
    slug: 'ethproofs-call-8',
    type: 'talk',
    title: 'push0 — Quick Update on Ethproofs Call #8 (Poseidon)',
    venue: 'Ethproofs Community Call',
    date: '2026-03-20',
    summary:
      'A quick update on push0, the proof-orchestration work, delivered on Ethproofs community call #8 — agenda and slides archived in the Ethereum PM repository.',
    tags: ['Ethproofs', 'push0', 'Provers'],
    href: 'https://www.youtube.com/watch?v=7Jxq3YU8GUY&t=670s',
    youtubeId: '7Jxq3YU8GUY',
    youtubeStart: 670,
    body: [
      'Ethproofs community call #8 ("Poseidon"), March 20 2026, recorded on the Ethereum Foundation YouTube channel — the player starts at the push0 segment (11:10). The agenda and slides are archived in the Ethereum PM repository (github.com/ethereum/pm, issue #1979).',
    ],
  },
  {
    slug: 'ethcc-2025-zk-rollups',
    type: 'talk',
    title: 'Optimizing ZK-Rollups: Unlocking Cost-Effective Proving Infrastructure',
    venue: 'EthCC[8], Cannes — Grant Stage',
    date: '2025-06-30',
    summary:
      'How to make a zk-rollup economically viable: prover selection, proof orchestration, and the cost levers that actually matter in production.',
    tags: ['ZK', 'Rollups', 'EthCC'],
    href: 'https://www.youtube.com/watch?v=ClrgV6WLiis',
    youtubeId: 'ClrgV6WLiis',
    body: [
      'Recorded on the EthCC[8] Grant Stage in Cannes, June 30 2025. The talk walks through the proving-cost structure of a production zk-rollup — where the money actually goes, how prover selection and orchestration change the economics, and what "cost-effective" means once you are proving every block.',
    ],
    links: [
      { label: 'Talk page in the EthCC archive', url: 'https://ethcc.io/archives/optimizing-zk-rollups-unlocking-cost-effective-proving-infrastructure' },
    ],
  },
  {
    slug: 'encryption-day-2025-zkvms',
    type: 'talk',
    title: 'Under the Hood: ZKVMs',
    venue: "Encryption Day (Fhenix), Cannes — EthCC week",
    date: '2025-07-03',
    summary:
      'Panel discussion on zkVM internals with Justin Drake, Brevis and Zircuit — what proving a whole program actually takes, and where the frontier is.',
    tags: ['zkVM', 'Panel'],
    href: 'https://www.youtube.com/watch?v=aXgediaT4vk',
    youtubeId: 'aXgediaT4vk',
    body: [
      "Recorded at Fhenix's Encryption Day in Cannes on July 3, 2025, during EthCC week. Dr. Ahmadvand joined the panel as Zircuit's ZK lead, alongside Justin Drake (Ethereum Foundation) and a panelist from Brevis.",
    ],
  },
  {
    slug: 'invisible-garden-2024-proof-orchestration',
    type: 'talk',
    title: 'push0: Robust, Distributed, and Prover-Agnostic Proof Orchestration',
    venue: 'Invisible Garden · Antalpha Hacker House, Chiang Mai',
    date: '2024-12-19',
    summary:
      'Designing push0 — a supervisor that coordinates a fleet of untrusted provers producing independently verifiable output.',
    tags: ['push0', 'Provers', 'Infrastructure'],
    href: 'https://www.youtube.com/watch?v=a2IhlrB-v2U',
    youtubeId: 'a2IhlrB-v2U',
    body: [
      'A 28-minute deep dive recorded at the Invisible Garden / Antalpha Hacker House in Chiang Mai (published December 2024 on the Coset channel). push0 is the proof-orchestration design later presented to the Ethproofs community.',
    ],
  },

  // --- Writing ---
  {
    slug: 'policy-driven-real-estate-tokenization',
    type: 'writing',
    title: 'Policy-Driven Real-Estate Tokenization: An ERC\u20113643 Architecture for National Land Registries',
    venue: 'Architecture whitepaper',
    date: '2025-11-12',
    summary:
      'How a national land registry can run compliant fractional property markets — ERC-3643 policy tokens, a regulated order-book exchange, and stablecoin settlement, with the state as policy owner. Includes a working proof of concept.',
    tags: ['RWA', 'ERC-3643', 'GCC', 'Tokenization'],
    loomId: '29acab73d7534baeaa510687519bd211',
    body: [
      "Governments across the Gulf have already digitised their land registries — millions of deeds now live in transactional databases, and fractional ownership of property is legally possible today. What is missing is the market infrastructure around it: a compliant venue where fractional shares can actually be bought and sold, a way for foreign investors to participate without weeks of banking friction, and guarantees that every transfer respects national rules on eligibility, foreign ownership, and holding periods. Invisible Bits designed a tokenization architecture, and built a working proof of concept, to close exactly that gap for the Saudi Real Estate Registry.",
      "The foundation of the architecture is the ERC-3643 permissioned security-token standard. Each property is issued as a policy-driven token whose transfer logic is governed by the registry itself: KYC and investor-eligibility checks, foreign-ownership caps, minimum holding periods, and regional whitelists are encoded as configurable on-chain policies rather than off-chain manual reviews. Policy hooks such as canTransfer run on every transfer, so tokens are compliant by default, rules can evolve as regulation evolves, and every rule evaluation leaves a regulator-ready audit trail. Crucially, the registry and its regulator remain the approving authority — the standard gives them the levers, not the market.",
      "On top of the token layer sits a regulated exchange for fractional shares: an order-book venue where buyers and sellers post bids and asks, prices are market-determined, and a match executes only when the token-level compliance checks and the registry's approval gates all pass. Orders are escrowed with expiry, matching is automatic when prices cross, and best-bid/ask and spread are tracked per property. The result is transparent price discovery and secondary-market liquidity for an asset class that has historically settled in months — without ever taking compliance out of the sovereign's hands.",
      "Settlement is designed for cross-border capital. The architecture accepts regulated stablecoins (USDC/USDT) for instant on-chain settlement, with optional acceptance of BTC/ETH that is immediately swapped to stablecoins to eliminate volatility at the point of sale. Every payment path is linked to the same KYC/AML identity registry that governs the tokens, so an international investor can participate in minutes with full traceability — instead of first opening a local bank account and moving funds through correspondent banking rails.",
      "The architecture also extends beyond trading into the registry's own operations: rights-and-restrictions attestations, lien and encumbrance flags that automatically constrain transfers, and release workflows that mirror the jurisdiction's regulatory processes — plus a staged, low-risk path toward immutable evidence anchoring for deed documentation where non-repudiation matters. Because the whole stack is EVM/Solidity-based, the registry can expose a sandboxed testnet with reference contracts and SDKs, letting prop-tech companies and marketplaces innovate on top of regulated tokens while the registry keeps core share issuance and assignment in-house.",
      "The 12-minute demo above walks through the working system end to end. To make the proposal concrete, we built a full reference implementation: ERC-3643 contracts built on an audited framework (security token, identity registry, and modular compliance with foreign-ownership caps and holding periods), a multi-property order-book exchange settling in USDC, and a web application with dashboards for compliance monitoring, fractional holdings, trading, and payments. It is a proof of concept rather than a production system — production would add contract audits, price oracles, and governance — but it demonstrates end-to-end that policy-enforced issuance, compliant secondary trading, and stablecoin settlement can run together on standard, interoperable rails. If you are a registry, regulator, or protocol team looking at real-world-asset tokenization with the state as policy owner, this is the architecture conversation we would like to have with you.",
    ],
  },
  {
    slug: 'push0-paper',
    type: 'writing',
    title: 'push0: Scalable and Fault-Tolerant Orchestration for Zero-Knowledge Proof Generation',
    venue: 'arXiv preprint',
    date: '2026-02-16',
    summary:
      'The paper behind the push0 talks: a scalable, fault-tolerant orchestrator for zero-knowledge proof generation, from production experience at Zircuit.',
    tags: ['push0', 'Provers', 'Paper'],
    href: 'https://arxiv.org/abs/2602.16338',
    body: [
      'With Rok Pajnič and Ching-Lun Chiu. arXiv:2602.16338.',
      'push0 is the proof-orchestration system presented at Invisible Garden 2024, Ethproofs Day at Devconnect Buenos Aires, and Ethproofs community call #8.',
    ],
  },
  {
    slug: 'cost-effective-zk-rollups-paper',
    type: 'writing',
    title: 'Towards Cost-Effective ZK-Rollups: Modeling and Optimization of Proving Infrastructure',
    venue: 'arXiv preprint',
    date: '2025-09-20',
    summary:
      'A constraints-based model of zk-rollup proving infrastructure and its cost levers — the research behind the EthCC[8] talk.',
    tags: ['ZK', 'Rollups', 'Paper'],
    href: 'https://arxiv.org/abs/2509.16581',
    body: [
      'With Pedro Souto. arXiv:2509.16581.',
      'Companion research to the EthCC[8] talk "Optimizing ZK-Rollups: Unlocking Cost-Effective Proving Infrastructure".',
    ],
  },
  {
    slug: 'selected-publications',
    type: 'writing',
    title: 'Publications',
    venue: 'dblp · 15 works',
    date: '2026-02-20',
    summary:
      'The complete research record — software integrity protection, program analysis, zero-knowledge systems and proving infrastructure — from peer-reviewed venues like ACSAC and CODASPY to the latest arXiv preprints.',
    tags: ['Research', 'Papers'],
    href: 'https://dblp.org/pid/62/10422.html',
    body: [
      'Fifteen works across software security and zero-knowledge systems. Every entry below links to the publisher, dblp or arXiv record.',
    ],
    links: [
      { label: 'push0: Scalable and Fault-Tolerant Orchestration for Zero-Knowledge Proof Generation — arXiv, 2026', url: 'https://arxiv.org/abs/2602.16338' },
      { label: 'Optimizing Optimism: Up to 3.5× Faster zkVM Validity Proofs via Sparse Derivation — arXiv, 2025', url: 'https://arxiv.org/abs/2510.23172' },
      { label: 'Towards Cost-Effective ZK-Rollups: Modeling and Optimization of Proving Infrastructure — arXiv, 2025', url: 'https://arxiv.org/abs/2509.16581' },
      { label: 'Automated Analysis of Halo2 Circuits — SMT Workshop, 2023', url: 'https://dblp.org/rec/conf/smt/SoureshjaniHJKG23' },
      { label: 'Dynamic Taint Analysis versus Obfuscated Self-Checking — ACSAC, 2021', url: 'https://doi.org/10.1145/3485832.3485926' },
      { label: 'Strengthened, Composable, and Quantifiable Software Integrity Protection — PhD dissertation, TU Munich, 2021', url: 'https://dblp.org/rec/phd/dnb/Ahmadvand21' },
      { label: 'SIP Shaker: Software Integrity Protection Composition — ACSAC, 2019', url: 'https://doi.org/10.1145/3359789.3359848' },
      { label: 'VirtSC: Combining Virtualization Obfuscation with Self-Checksumming — SPRO@CCS, 2019', url: 'https://doi.org/10.1145/3338503.3357723' },
      { label: 'A Taxonomy of Software Integrity Protection Techniques — Advances in Computers vol. 112, 2019', url: 'https://doi.org/10.1016/bs.adcom.2017.12.007' },
      { label: 'Taxonomy-as-a-Service: How To Structure Your Related Work — arXiv, 2019', url: 'https://arxiv.org/abs/1906.11217' },
      { label: 'Practical Integrity Protection with Oblivious Hashing — ACSAC, 2018', url: 'https://doi.org/10.1145/3274694.3274732' },
      { label: 'Integrity Protection Against Insiders in Microservice-Based Infrastructures — MSE@STAF, 2018', url: 'https://doi.org/10.1007/978-3-030-04771-9_43' },
      { label: 'Detecting Patching of Executables without System Calls — CODASPY, 2017', url: 'https://doi.org/10.1145/3029806.3029835' },
      { label: 'Requirements Reconciliation for Scalable and Secure Microservice (De)composition — IEEE RE Workshops, 2016', url: 'https://doi.org/10.1109/REW.2016.026' },
      { label: 'Enhancing Operation Security using Secret Sharing — SECRYPT, 2016', url: 'https://doi.org/10.5220/0005992104460451' },
    ],
  },
];

export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export const typeLabel: Record<PostType, string> = {
  talk: 'Talk',
  news: 'News',
  writing: 'Writing',
};
