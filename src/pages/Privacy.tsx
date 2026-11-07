import { useEffect } from 'react';
import SiteNav from '@/components/SiteNav';
import Footer from '@/components/site/Footer';

// Privacy notice for business outreach. Linked from cold emails to UK and EU recipients (approved 7 Nov 2026).
const SECTIONS: Array<{ title: string; body: string }> = [
  {
    title: 'What we hold',
    body: 'When we write to people at companies about our services, we hold their name, role, company and work email address. We take these only from public sources: the company’s own website, public regulatory registers and professional profiles.',
  },
  {
    title: 'Why, and on what basis',
    body: 'To contact you about services that relate to your professional role: one email and at most one follow-up. The legal basis is legitimate interest (Article 6(1)(f) UK GDPR and GDPR).',
  },
  {
    title: 'How long',
    body: 'At most 12 months, or until you object, whichever comes first.',
  },
  {
    title: 'Where',
    body: 'Data is processed in the UAE. Email runs on Google Workspace. We do not sell or share it with anyone else.',
  },
];

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy notice | Invisible Bits';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[42rem] bg-[radial-gradient(55%_65%_at_50%_-10%,rgba(0,245,212,0.10),transparent_70%)]"
      />
      <SiteNav />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-5 pt-16 md:px-8">
        <main className="flex-1 pb-20 pt-10 md:pt-14">
          <h1 className="text-3xl font-medium leading-[1] tracking-tighter md:text-4xl">Privacy notice</h1>
          <p className="mt-6 text-sm leading-relaxed text-white/75 md:text-base">
            Invisible Bits Consulting FZCO, Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, UAE, is
            responsible for the personal data described here. Contact:{' '}
            <a href="mailto:contact@invisible-bits.com" className="text-primary hover:underline">
              contact@invisible-bits.com
            </a>
            .
          </p>
          {SECTIONS.map((s) => (
            <section key={s.title} className="mt-8">
              <h2 className="text-lg font-medium tracking-tight">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/75 md:text-base">{s.body}</p>
            </section>
          ))}
          <section className="mt-8">
            <h2 className="text-lg font-medium tracking-tight">Your rights</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/75 md:text-base">
              You can object at any time by replying &ldquo;no thanks&rdquo; or writing to{' '}
              <a href="mailto:contact@invisible-bits.com" className="text-primary hover:underline">
                contact@invisible-bits.com
              </a>
              , and we will not write again. You can also ask for access, correction or deletion, and complain to your
              data protection authority (the ICO in the UK, the Autoriteit Persoonsgegevens in the Netherlands).
            </p>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
