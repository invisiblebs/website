import type { CSSProperties, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Animated gradient-shine text: brand teal base with a white highlight
 * sweeping left-to-right on a loop. Falls back to a static gradient when the
 * OS asks for reduced motion.
 */
export default function ShinyText({
  children,
  speed = 3,
  base = '#00F5D4',
  shine = '#ffffff',
}: {
  children: ReactNode;
  speed?: number;
  base?: string;
  shine?: string;
}) {
  const reduced = useReducedMotion();

  const style: CSSProperties = {
    backgroundImage: `linear-gradient(100deg, ${base} 40%, ${shine} 50%, ${base} 60%)`,
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
  };

  if (reduced) {
    // A frozen gradient band leaves pale artifacts mid-word in stills and for
    // reduced-motion users — render the clean base colour instead.
    return <span style={{ color: base }}>{children}</span>;
  }

  return (
    <motion.span
      style={style}
      animate={{ backgroundPosition: ['200% center', '-200% center'] }}
      transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.span>
  );
}
