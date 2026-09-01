import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Makes hash anchors reliable in an SPA. On any location change carrying a
 * hash, scroll to the target — retrying across frames until React has
 * actually rendered it (a fresh navigation from another route races the
 * browser's native hash jump against the first render, which is how
 * "/#principal" could land at the top of home).
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // Route change without a hash target — land at the top, like any site.
      window.scrollTo(0, 0);
      return;
    }
    let tries = 0;
    let raf = 0;
    const attempt = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ block: 'start' });
      } else if (tries++ < 60) {
        raf = requestAnimationFrame(attempt);
      }
    };
    attempt();
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}
