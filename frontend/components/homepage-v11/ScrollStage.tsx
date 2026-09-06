'use client';

/* ScrollStage — the ONE client island of homepage v11 "the walk".

   It renders nothing and never touches React state. On mount it adds up to
   two classes to the `.hv11` root and one class to each `[data-enter]`
   element, then gets out of the way:

     hv11-js       the once-sequences (Room III's alcoves, Room V's send)
                   are ARMED: their keyframes sit paused at the start pose
                   until `.is-in` runs them. Without this class the page
                   shows every composed END pose — what a crawler, a no-JS
                   visitor and prefers-reduced-motion all see.
     hv11-noscrub  the browser has no CSS scroll-driven animations (Firefox
                   stable still holds them behind a flag), so the scrub acts
                   (threshold, easel, wall, studio) fall back to a transition
                   on entry instead of a scrub under the wheel.
     is-in         set once per [data-enter] element by an IntersectionObserver,
                   then the element is unobserved. Zero work after entry.

   No scroll listener, no rAF loop, no state, no re-render. Reduced motion:
   nothing is armed and nothing is observed — the stylesheet's base layer is
   already the finished picture. */

import { useEffect } from 'react';

export default function ScrollStage() {
  useEffect(() => {
    const root = document.querySelector('.hv11');
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scrub =
      typeof CSS !== 'undefined' && typeof CSS.supports === 'function' && CSS.supports('animation-timeline: view()');
    root.classList.add('hv11-js');
    if (!scrub) root.classList.add('hv11-noscrub');

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-enter]'));
    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.2 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return null;
}
