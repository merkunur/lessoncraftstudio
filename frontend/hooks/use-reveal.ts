'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight IntersectionObserver hook that adds 'revealed' class
 * when an element scrolls into view. Replaces Framer Motion whileInView.
 */
export function useReveal(margin = '-100px') {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { rootMargin: margin, threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return ref;
}
