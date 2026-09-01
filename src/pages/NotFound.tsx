import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <div className="glass glass-edge relative max-w-lg rounded-3xl p-10">
        <p className="font-mono text-6xl font-bold text-gradient-teal">404</p>
        <h1 className="mt-5 font-display text-2xl font-bold">This page does not exist</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The link is broken or the page has moved. Everything we publish lives on the home page —
          or write to{' '}
          <a href='mailto:contact@invisible-bits.com' className="text-primary hover:underline">
            contact@invisible-bits.com
          </a>{' '}
          and we will point you at it.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="h-11 bg-primary font-semibold text-primary-foreground">
            <a href="/">
              <Home className="mr-2 h-4 w-4" aria-hidden="true" />
              Return home
            </a>
          </Button>
          <Button
            variant="outline"
            className="h-11 border-white/15 bg-white/[0.04]"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Go back
          </Button>
        </div>
      </div>
    </main>
  );
}
